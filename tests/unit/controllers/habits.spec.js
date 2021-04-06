const habitsController = require('../../../controllers/habits')
const Habit = require('../../../models/Habit');
const User = require('../../../models/User');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }))
const mockRes = { status: mockStatus }

describe('habits controller', () => {
    beforeEach(() => jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('index', () => {
        test('it returns habits with a 200 status code', async () => {
            let testHabits = [//insert examples of habits]
            jest.spyOn(Habit, 'all', 'get')
                 .mockResolvedValue(testHabits);
            await habitsController.index(null, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(testHabits);
        })
    });

    describe('showUser', () => {
        test('it returns a user with a 200 status code', async () => {
            jest.spyOn(User, 'findById')
                .mockResolvedValue(new User( { id: 1, username: 'Test User'} ));

            const mockReq = { params: { id: 1 } }
            await habitsController.showUser(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
        })
    });

})