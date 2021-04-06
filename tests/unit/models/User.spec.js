const User = require('../../../models/User');
const pg = require('pg');
jest.mock('pg');

const db = require('../../../dbConfig/init');

describe('User', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe('all', () => {
        test('it resolves with users on successful db query', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [{}, {}, {}]});
            const all = await User.all;
            expect(all).toHaveLength(3)
        })
    });

    describe('create', () => {
        test('it resolves with user on successful db query', async () => {
            let userData = {username: 'testUser', passwordDigest: 'password'};
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ [userData] });
            const result = await User.create(userData);
            expect(result).toHaveProperty('id')
        })
    });

    describe('findByUsername', () => {
        test('it resolves with user on successful db query', async () => {
            let userData = {username: 'testUser', passwordDigest: 'password'};
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [userData] });
            const result = await User.findByUsername(testUser);
            expect(result).toBeInstanceOf(User)
        })

        test('it rejects with an error message on unsuccessful db query', async () => {
            let username = "username1";
            jest.spyOn(db, 'query').mockResolvedValueOnce(undefined);
            await User.findByUsername(username).catch(e => {
                expect(e).toEqual("User not found");
            });
        });
    })
});