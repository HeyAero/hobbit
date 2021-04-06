const User = require('../../../models/User');
const pg = require('pg');
jest.mock('pg');

const db = require('../../../dbConfig/init');

describe('User', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    // describe('users', () => {
    //     test('it resolves with users on successful db query', async () => {
    //         jest.spyOn(db, 'query')
    //             .mockResolvedValueOnce({ 
    //                 rows: [{id: 1, name: 'user1'}, {id: 2, name: 'user2'}]
    //             });
    //         let testUser = new User({ id: 1, name: 'Test Owner'})
    //         const dogs = await testOwner.dogs;
    //         expect(dogs).toHaveLength(2)
    //     })
    // });

    describe('findById', () => {
        test('it resolves with user on successful db query', async () => {
            let userData = { id: 1, name: 'Test user' }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [userData] });
            const result = await User.findById(1);
            expect(result).toBeInstanceOf(User)
        })
    });
    
})