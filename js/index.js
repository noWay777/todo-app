const taskInput = document.getElementById('task-input');
const dateInput = document.getElementById('task-date');
const addbutton = document.getElementById('add-button');
const alertMsg = document.getElementById('alert-msg');

const todos = [];

const showAlert = (message, type) => {
    alertMsg.innerHTML =''
    const alert = document.createElement('p');
    alert.innerText = message;
if(type === 'error'){
    alert.classList.add('bg-danger')
    alert.classList.add('rounded-2')
} else{
    alert.classList.add('bg-success')
    alert.classList.add('rounded-2')
}   
    alertMsg.append(alert)
    setTimeout(() => {
        alert.style.display = 'none';
    }, 2000)

}

const addHandler = () => {
    const task = taskInput.value;
    const date = dateInput.value;
    const todo = {
        task: task,
        data: date,
        completed: false
    };
    if (task) {
        todos.push(todo)
        taskInput.value = '';
        dateInput.value = '';
        console.log(todos);
        showAlert('Todo added successfully!', 'succes')
    } else {
        showAlert('Please enter todo', 'error')
    }

}

addbutton.addEventListener('click', addHandler);
showAlert('')