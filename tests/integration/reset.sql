TRUNCATE users, habits RESTART IDENTITY;

INSERT INTO users (username, password_digest)
VALUES 
    ('User1', 'hihuyyftcg5r5456576'),
    ('User2', 'uihihuhihid545457f6');

INSERT INTO habits (name, habit_desc, frequency, streak_track, streak_end, streak_complete, user_id)
VALUES
    ('Bla', 'Bla Bla Habit', 'daily', 4, 'unknown', 'unknown', 1),
    ('Hey', 'Hey Hey Habit', 'weekly', 5, 'unknown', 'unknown', 2),
    ('La', 'La La Habit', 'weekly', 1, 'unknown', 'unknown', 1);
