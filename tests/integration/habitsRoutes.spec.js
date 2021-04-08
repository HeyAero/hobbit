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
        expect(res.body).toHaveLength(3)
    });

    it('should receive a habit based on user id', async () => {
        const res = await request(api).get('/habits/:user_id')
        expect(r)
    } )


})