TRUNCATE users, habits RESTART IDENTITY;

INSERT INTO users (usename, password_digest)
VALUES 
    ('User1', 'hihuyyftcg5r5456576'),
    ('User2', 'uihihuhihid545457f6');

INSERT INTO habits (habit_desc, frequency, streak_track, streak_start, streak_end, user_id)
VALUES
    ('Bla Bla Habit', 'daily', 4, 'unknown', 'unknown', 1 ),
    ('Hey Hey Habit', 'weekly', 5, 'unknown', 'unknown', 2),
    ('La La Habit', 'weekly', 1, 'unknown', 'unknown', 1);