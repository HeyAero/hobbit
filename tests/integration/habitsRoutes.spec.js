const { request } = require("express");

describe('habits endpoints', () => {
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
    });

    afterAll(async () => {
        console.log('Gracefully stopping test server')
        await api.close()
    })

    it('should return a list of all habits in database', async () => {
        const res = await request(api).get('/habits')
        .set('Authorization', `Bearer ${token}`)
        .then((res) => {
          expect(res.statusCode).toEqual(200);
          expect(res.body).toHaveLength(3);  
        });
    });

    it('should receive a habit based on user id', async () => {
        const res = await request(api).get('/habits/1')
        .set('Authorization', `Bearer ${token}`)
        .then((res) => { 
          expect(res.statusCode).toEqual(200);
          expect(res.body.habits.user_id).toEqual(1);
        });
    });

    it('should create a new habit successfully', async () => {
        const res = await request(api)
            .post('/habits')
             .set('Authorization', `Bearer ${token}`)
             .send({
                name: 'Hey New Habit',
                habit_desc: 'Brand new resolution',
                frequency: 'daily'
            })
             .then((res) => {
              expect(res.statusCode).toEqual(200);
              expect(res.body).toHaveProperty("id");
            });
    });

    it('should delete a habit', async () => {
        const res = await request(api)
            .delete('/habits/1')
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
              expect(res.statusCode).toEqual(204);
            });
        

        const habitRes = await request(api).get('/habits/1')
        .set('Authorization', `Bearer ${token}`)
        .then((res) => {
          expect(habitRes.statusCode).toEqual(404);
          expect(habitRes.body).toHaveProperty('err');
        });
    });

})