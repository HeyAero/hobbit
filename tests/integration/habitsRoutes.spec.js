describe('habits endpoints', () => {
    let api;
    beforeEach(async () => {
        await resetTestDB()
    })

    beforeAll(async () => {
        api = api.listen(5000, () => console.log('Test server running on port 5000'))
    });

    afterAll(async () => {
        console.log('Gracefully stopping test server')
        await api.close()
    })

    it('should return a list of all habits in database', async () => {
        const res = await request(api).get('/habits')
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveLength(3);
    });

    it('should receive a habit based on user id', async () => {
        const res = await request(api).get('/habits/1')
        expect(res.statusCode).toEqual(200);
        expect(res.body.habits.user_id).toEqual(1);
    } )

    it('should create a new habit successfully', async () => {
        const res = await request(api)
            .post('/habits')
            .send({
                name: 'Hey New Habit',
                habit_desc: 'Brand new resolution',
                frequency: 'daily'
            })
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("id");
    })


})