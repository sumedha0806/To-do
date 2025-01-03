const monthTasks = {
    January: [],
    February: [],
    March: [],
    April: [],
    May: [],
    June: [],
    July: [],
    August: [],
    September: [],
    October: [],
    November: [],
    December: []
};

let currentMonth = 'January';

function switchMonth() {
    const monthSelector = document.getElementById('monthSelector');
    currentMonth = monthSelector.value;
    updateBackground();
    renderTasks();
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    if (taskInput.value.trim() === '') {
        alert('Please enter a task.');
        return;
    }

    monthTasks[currentMonth].push(taskInput.value);
    taskInput.value = '';
    renderTasks();
}

function deleteTask(index) {
    monthTasks[currentMonth].splice(index, 1);
    renderTasks();
}

function renderTasks() {
    const taskContainer = document.getElementById('taskContainer');
    taskContainer.innerHTML = ''; // Clear the current task list

    monthTasks[currentMonth].forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';

        const taskText = document.createElement('span');
        taskText.textContent = task;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTask(index);

        taskItem.appendChild(taskText);
        taskItem.appendChild(deleteButton);
        taskContainer.appendChild(taskItem);
    });
}

function updateBackground() {
    const body = document.body;
    body.className = getSeason(currentMonth);
}

function getSeason(month) {
    const spring = ['March', 'April', 'May'];
    const summer = ['June', 'July', 'August'];
    const autumn = ['September', 'October', 'November'];
    const winter = ['December', 'January', 'February'];


    if (spring.includes(month)) return 'spring';
    if (summer.includes(month)) return 'summer';
    if (autumn.includes(month)) return 'autumn';
    if (winter.includes(month)) return 'winter';
}

// Initialize with tasks for the default month
updateBackground();
renderTasks();

