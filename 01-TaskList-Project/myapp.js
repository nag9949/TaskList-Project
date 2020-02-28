const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load all events listeners
loadEventListeners();

//load all events listeners
function loadEventListeners() {
  // DOM load Event
  document.addEventListener('DOMContentLoaded', getTasks);
  // add task event
  form.addEventListener('submit', addTask);
  // remove task event
  taskList.addEventListener('click', removeTask);
  // Clear tasks event
  clearBtn.addEventListener('click', clearTasks);
  // Filter task event
  filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from LocalStorage
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') == null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task) => {

    // create a li element
    const li = document.createElement('li');
    // add a class
    li.className = 'collection-item';
    //create a  textnode and append to  li
    li.appendChild(document.createTextNode(task));

    //create a link
    const link = document.createElement('a');
    //add a class
    link.className = 'delete-item secondary-content';
    //add icon to html
    link.innerHTML = '<i class="fa fa-remove"></i>';

    //add this LINK to LI
    li.appendChild(link);

    // append LI element to UL
    taskList.appendChild(li);

  });

}



// Add Task
function addTask(e) {
  e.preventDefault();

  if (taskInput.value === '') {
    alert('Add a Task')
  }

  // create a li element
  const li = document.createElement('li');
  // add a class
  li.className = 'collection-item';
  //create a  textnode and append to  li
  li.appendChild(document.createTextNode(taskInput.value));

  //create a link
  const link = document.createElement('a');
  //add a class
  link.className = 'delete-item secondary-content';
  //add icon to html
  link.innerHTML = '<i class="fa fa-remove"></i>';

  //add this LINK to LI
  li.appendChild(link);

  // append LI element to UL
  taskList.appendChild(li);

  // SotreTasks in LocalStorage
  storeTasksInLocalStorage(taskInput.value);


  // Clear Input
  taskInput.value = '';

  // console.log(li);
}


// Store Tasks In Local Storage
function storeTasksInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') == null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));

}


//....
// Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();

      // Remove tasks from local Storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from Local Storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') == null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task, index) => {
    if (taskItem.textContent == task)
      tasks.splice(index, 1);
  })

  localStorage.setItem('tasks', JSON.stringify(tasks));

}




// Clear Tasks
function clearTasks(e) {
  // taskList.innerHTML = '';

  // Faster way
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Clear all Tasks from localStorage
  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){
  localStorage.clear();
}




// Filter TAsks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  // console.log(task);

  document.querySelectorAll('.collection-item').forEach((task) => {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }

  });

}