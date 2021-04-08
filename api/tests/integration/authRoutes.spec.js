describe('auth endpoints', () => {
    let api;
    let token;
    beforeEach(async () => {
        await resetTestDB()
    })

    beforeAll(async (done) => {
        api = app.listen(5000, () => console.log('Test server running on port 5000'));
        request(api)
           .post('/login')
           .send({
               username: 'User1',
               password_digest: 'hihuyyftcg5r5456576'
           })
           .end((err, res) => {
               token = res.body.token;
               done();
           });
    });

    afterAll(async () => {
        console.log('Gracefully stopping test server')
        await api.close()
    })

    it('registers new user successfully', async () => {
        const res = await request(api)
            .post('/register')
            .send({
                username: 'Funky',
                password: 'setthegroove'
            })
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("id");

        const authRes = await request(api).get('/users/3')
        .set('Authorization', `Bearer ${token}`)
        .then((res) => {
           expect(authRes.body).toHaveProperty("password_digest"); 
        });
    })

    it('logs in user successfully', async () => {
        const res = await request(api)
            .post('/login')
            .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toEqual(200);
        expect(res.body.username).toEqual('User1')
        expect(res.body.authed).toBeTruthy()
    })

    it('should require authorization', () => {
        return request(api)
          .get('/')
          .then((res) => {
              expect(res.statusCode).toBe(401);
          });
    });

    it('responds with JSON', () => {
        return request(api)
           .get('/')
           .set('Authorisation', `Bearer ${token}`)
           .then((res) => {
               expect(res.statusCode).toBe(200);
               expect(res.type).toBe('application/json');
           });
    });
})