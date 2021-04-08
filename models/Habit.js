const db = require("../dbConfig/init");
const SQL = require("sql-template-strings");

class Habit {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.desc = data.habit_desc;
        this.frequency = data.frequency;
        this.streak_track = data.streak_track;
        this.streak_end = data.streak_end;
        this.streak_complete = data.streak_complete;
        this.userId = data.user_id;
    }

    static get all() {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await db.query(SQL`SELECT * FROM habits`);
                const habits = result.rows.map((h) => new Habit(h));
                resolve(habits);
            } catch (error) {
                reject("Could not retrieve habits");
            }
        });
    }

    static findByHabitId(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await db.query(
                    SQL`SELECT * FROM habits WHERE id = ${id};`
                );
                const habit = new Habit(result.rows[0]);
                console.log(habit);
                resolve(habit);
            } catch (error) {
                reject("Could not find habit");
            }
        });
    }

    static findByUserId(user_id) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await db.query(
                    SQL`SELECT * FROM habits WHERE user_id = ${user_id};`
                );
                if(!result.rows[0]) throw new Error("No result found")
                let habits = result.rows.map(r => new Habit(r));
                resolve(habits);
            } catch (error) {
                reject("Could not find user " + error);
            }
        });
    }

    static create({name, desc, freq, id}) {
        return new Promise(async (resolve, reject) => {
            try {
                const current_date = new Date();
                let correct_date = new Date(current_date);
                let increment = freq === 'daily' ? 1 : 7;
                correct_date.setDate(correct_date.getDate() + increment);
                const result = await db.query(
                    SQL`INSERT INTO habits (name, habit_desc, frequency, streak_track, streak_end, user_id) VALUES (${name}, ${desc}, ${freq}, 0, ${correct_date}, ${id}) RETURNING *;`
                );
                const habit = new Habit(result.rows[0]);
                console.log(habit);
                resolve(habit);
            } catch (error) {
                reject("Could not create habit");
            }
        });
    }

    update() {
        return new Promise(async (resolve, reject) => {
            try {
                const new_streak = this.streak_track + 1;
                const new_complete = this.streak_end;
                let new_end = new Date(this.streak_end);
                let increment = this.freq === 'daily' ? 1 : 7;
                new_end.setDate(new_end.getDate() + increment);
                const result = await db.query(
                    SQL`UPDATE habits SET streak_track=${new_streak}, streak_end=${new_end}, streak_complete=${new_complete} WHERE id = ${this.id} RETURNING id, streak_track`
                );
                resolve(result.rows[0]);
            } catch (error) {
                reject("Could not update habit");
            }
        });
    }

    destroy() {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await db.query(
                    SQL`DELETE FROM habits where id = ${this.id}`
                );
                resolve("Habit was deleted");
            } catch (error) {
                reject("Could not delete habit");
            }
        });
    }
}

module.exports = Habit
