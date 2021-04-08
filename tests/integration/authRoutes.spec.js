const { request } = require("express");

describe('auth endpoints', () => {
    let api;
    let token;
    beforeEach(async () => {
        await resetTestDB()
    })

    beforeAll(async () => {
        api = api.listen(5000, () => console.log('Test server running on port 5000'));
        request(api)
           .post('/login')
           .send({
               username: 'User1',
               password: 'hihuyyftcg5r5456576'
           })
           .end((err, response) => {
               token = response.body.token;
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

        const authRes = await request(api).get('/authors/3');
        expect(authRes.body).toHaveProperty("password_digest");
    })
    it('logs in user successfully', async () => {
        const res = await request(api)
            .post('/login')
            .send({
                username: 'User1',
                password: 'hihuyyftcg5r5456576'
            })
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