const db = require("../dbConfig/init");
const SQL = require("sql-template-strings");

class Habit {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.desc = data.habit_desc;
        this.frequency = data.frequency;
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
                let habits = result.row.map(r => new Habit(r));
                resolve(habits);
            } catch (error) {
                reject("Could not find user");
            }
        });
    }

    static create(name, habit_desc, frequency) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await db.query(
                    SQL`INSERT INTO habits (name, habit_desc, frequency, streak_track, streak_start, streak_end, user_id) VALUES (${name}, ${habit_desc}, ${frequency}, 0, 0, 0, ${user_id}) RETURNING *;`
                );
                const habit = new Habit(result.rows[0]);
                resolve(habit);
            } catch (error) {
                reject("Could not create habit");
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

module.exports = { Habit }
