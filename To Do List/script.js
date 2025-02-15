const taskInput = document.getElementById('task-input');
const taskContainer = document.getElementById('list-container');

function addTask() {
  if (taskInput.value === '') {
    alert('Please type your task first!');
  } else {
    let taskList = document.createElement('li');
    taskList.innerHTML = taskInput.value;
    taskContainer.appendChild(taskList);
    let closeBtn = document.createElement('span');
    closeBtn.innerHTML = '\u00d7';
    taskList.appendChild(closeBtn);
  }
  taskInput.value = '';
  saveData();
}

taskContainer.addEventListener(
  'click',
  (e) => {
    if (e.target.tagName === 'LI') {
      e.target.classList.toggle('checked');
      saveData();
    } else if (e.target.tagName === 'SPAN') {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

function saveData() {
  localStorage.setItem('data', taskContainer.innerHTML);
}

function showTask() {
  taskContainer.innerHTML = localStorage.getItem('data');
}

showTask();
