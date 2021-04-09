describe('users endpoints', () => {
    let api;
    beforeEach(async () => {
        await resetTestDB()
    })

    beforeAll(async (done) => {
        api = app.listen(5000, () => console.log('Test server running on port 5000'));
        request(api)
           .post('/login')
           .send({
               username: 'User1',
               password_digest: 'hihuyyftcg5r5456576',
           })
           .end((err, res) => {
            token = res.body.token;
            done();
        });
    })

    afterAll(async () => {
        console.log('Gracefully stopping test server')
        await api.close()
    })

    // also add test for index route 
    it('should retrieve all users', async () => {
        const res = await request(api).get('/users')
        .set('Authorization', `Bearer ${token}`)
        .then((res) => {
          expect(res.statusCode).toEqual(200)
          expect(res.body).toHaveLength(2)
        })
    });

    it('should retrieve a user based on id', async () => {
        const res = await request(api).get('/users/1')
        .set('Authorization', `Bearer ${token}`)
        .then((res) => {
          expect(res.statusCode).toEqual(200)
          expect(res.body.name).toEqual('User1')    
        });
    });

})