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

    // describe('index', () => {
    //     test('it returns habits with a 200 status code', async () => {
    //         let testHabits = [//insert examples of habits]]
    //         jest.spyOn(Habit, 'all', 'get')
    //              .mockResolvedValue(testHabits);
    //         await habitsController.index(null, mockRes);
    //         expect(mockStatus).toHaveBeenCalledWith(200);
    //         expect(mockJson).toHaveBeenCalledWith(testHabits);
    //     })
    // });

    describe('showUserHabits', () => {
        test('it returns the habits for a user with a 200 status code', async () => {
            let testHabit = {
                name: 'habit', 
                desc: 'description',
                frequency: 'daily',
                userId: 1,
            }
            jest.spyOn(Habit, 'findHabitsByUserId')
                .mockResolvedValue(new Habit(testHabit));
               
            const mockReq = { params: { id: 1 } }
            await habitsController.showUserHabits(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(new Habit(testHabit));
        })
    });

})