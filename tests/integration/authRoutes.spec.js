describe('auth endpoints', () => {
    let api;
    let token;
    beforeEach(async () => {
        await resetTestDB()
    })

    beforeAll(async () => {
        api = app.listen(5000, () =>
          console.log("Test server running on port 5000")
        );
      });

    afterAll(async () => {
        console.log('Gracefully stopping test server')
        await api.close()
    })

    it('registers new user successfully', async () => {
            const res = await request(api)
              .post("/auth/register")
              .send({ username: "user3", password: "ufahfish89343rhr" });
            expect(res.statusCode).toEqual(201);
    })

    it('logs in user successfully', async () => {
        let token;
        const resAuthed = await request(api)
            .post('/auth/login')
            .send({ username: "User1", password: "hihuyyftcg5r5456576" });
            token = resAuthed.body.token;
        const res = await request(api)
            .get("/users/User1")
            .set("Authorization", `Bearer ${token}`);
          expect(res.statusCode).toEqual(200);

    })

    it('does not log in user if the user exists and their password is incorrect', async () => {
        const res = await request(api)
            .post('/auth/login')
            .send({ username: "user1", password: "wrongpassword" });
        expect(res.statusCode).toEqual(401);
    })

    it('does not log in user if user does not exist', async () => {
        const res = await request(api)
            .post('/auth/login')
            .send({ username: "user5", password: "afhuiahfhd432" });
        expect(res.statusCode).toEqual(401);
    })

    it('should require authorization to access users route', () => {
        return request(api)
          .get('/users/1')
          .then((res) => {
              expect(res.statusCode).toBe(403);
          });
    });
    
    it('should require authorization to access habits route', () => {
        return request(api)
          .get('/habits/1')
          .then((res) => {
              expect(res.statusCode).toBe(403);
          });
    });

    it('responds with JSON', () => {
        return request(api)
           .get('/')
           .then((res) => {
               expect(res.statusCode).toBe(200);
               expect(res.type).toBe('application/json');
           });
    });
})
