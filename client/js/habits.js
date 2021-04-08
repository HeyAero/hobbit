const { getAllHabbits, updateHabitClient } = require("./requests");

async function renderHabits(data) {
  const feed = document.getElementById('habbit-list');
  const habits = document.createElement('div');
  const testData = [{
    id: 1,
    name: "Water Break",
    habit_desc: "Take a water break",
    frequency: "daily",
    streak_track: 4,
    streak_start: "test",
    streak_end: "test",
    user_id: 1
  }]

  const allHabits = (habitData) => {
    const habit = document.createElement('div');
    habit.id = habitData.id;
    habit.className = "single-habit";
    const name = document.createElement('h3');
    name.textContent = habitData.name;
    const desc = document.createElement('p');
    desc.textContent = habitData.desc;
    const freq = document.createElement('p');
    freq.textContent = `Frequency: ${habitData.frequency}`;
    const track = document.createElement('p');
    track.id = `count-${habitData.id}`
    track.textContent = habitData.streak_track;
    const startDate = document.createElement('p');
    startDate.textContent = habitData.streak_start;
    const endDate = document.createElement('p');
    endDate.textContent = habitData.streak_end;
    const checkBoxLabel = document.createElement('label');
    checkBoxLabel.for=`complete-${habitData.id}`;
    const checkBox = document.createElement('input');

    const current_date = new Date();
    const old_date = new Date(habitData.streak_complete)
    checkBox.type = "checkbox";
    checkBox.id = `complete-${habitData.id}`;
    checkBox.name = `complete-${habitData.id}`;
    if(old_date && old_date > current_date) {
      checkBox.disabled = true;
    } else {
      checkBox.disabled = false;
    }

    checkBox.addEventListener('change', updateHabitClient)

    habit.appendChild(name);
    habit.appendChild(desc);
    habit.appendChild(freq);
    habit.appendChild(track);
    habit.appendChild(startDate);
    habit.appendChild(endDate);
    habit.appendChild(checkBox);

    habits.appendChild(habit);
  }

  data.forEach(allHabits);
  feed.appendChild(habits);
}


async function updateStreak(data) {
  console.log(data);
  let id = localStorage.getItem('id')
  let count = data.streak_track;
  console.log('Test')
  console.log(data.streak_track);
  console.log(data.id);
  let checkedBox = document.getElementById(`complete-${data.id}`);
  checkedBox.disabled = true;
  let theCounter = document.getElementById(`count-${data.id}`)
  theCounter.textContent = count;
}

module.exports = {renderHabits, updateStreak};