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
        test('it returns users with a 200 status code', async () => {
            jest.spyOn(Habit, 'all', 'get')
                 .mockResolvedValue(['habit1', 'habit2']);
            await habitsController.index(null, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(['habit1', 'habit2']);
        })
    });

    describe('showUserHabits', () => {
        test('it returns the habits for a user with a 200 status code', async () => {
            let testHabit = {
                name: 'habit', 
                desc: 'description',
                frequency: 'daily',
                userId: 1,
            }
            jest.spyOn(Habit, 'findByUserId')
                .mockResolvedValue(new Habit(testHabit));
               
            const mockReq = { params: { id: 1 } }
            await habitsController.showUser(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(new Habit(testHabit));
        })
    });

    describe('createHabit', () => {
        test('it returns a new habit with a 201 status code', async () => {
            let testHabit = {
                id: 1, 
                name: 'Exercise', 
                desc: 'Exercise once a day',
                frequency: 'Daily', 
                user_id: '1',
            }
            jest.spyOn(Habit, 'create')
                .mockResolvedValue(new Habit(testHabit));
                
            const mockReq = { body: testHabit }
            await habitsController.createHabit(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(new Habit(testHabit));
        })
    });

    // describe('destroy', () => {
    //     test('it returns a 204 status code on successful deletion', async () => {
    //         jest.spyOn(Habit.prototype, 'destroy')
    //             .mockResolvedValue('Deleted');
    //         const mockReq = { params: { id: 1 } }
    //         await habitsController.destroyHabit(mockReq, mockRes);
    //         expect(mockStatus).toHaveBeenCalledWith(204);
    //     })
    // });
})