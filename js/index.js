const taskInput = document.getElementById('task-input');
const dateInput = document.getElementById('task-date');
const addButton = document.getElementById('add-button');
const alertMsg = document.getElementById('alert-msg');
const allButton = document.getElementById('all-btn');
const pendingButton = document.getElementById('pending-btn');
const completedButton = document.getElementById('completed-btn');
const deleteAllButton = document.getElementById('delete-all-btn');

const generateId = () => {
    return Math.round(Math.random() * Math.random() * Math.pow(10, 15)).toString();
}
generateId()




const todos = JSON.parse(localStorage.getItem('todos')) || [];
console.log(todos);


const showAlert = (message, type) => {
    alertMsg.innerHTML = ''
    const alert = document.createElement('p');
    alert.innerText = message;
    if (type === 'error') {
        alert.classList.add('bg-danger')
        alert.classList.add('rounded-2')
    } else {
        alert.classList.add('bg-success')
        alert.classList.add('rounded-2')
    }
    alertMsg.append(alert)
    setTimeout(() => {
        alert.style.display = 'none';
    }, 2000)

}

const saveToLocalStorage = () => {
localStorage.setItem('todos', JSON.stringify(todos));

};

const addHandler = () => {
    const task = taskInput.value;
    const date = dateInput.value;
    const todo = {
        id: generateId(),
        completed: false,
        task: task,
        data: date,

    };
    if (task) {
        todos.push(todo);
        saveToLocalStorage();   
        taskInput.value = '';
        dateInput.value = '';
        console.log(todos);
        showAlert('Todo added successfully!', 'succes')
    } else {
        showAlert('Please enter todo', 'error')
    }

}
addButton.addEventListener('click', addHandler);


