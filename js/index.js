const taskInput = document.getElementById('task-input');
const dateInput = document.getElementById('task-date');
const addButton = document.getElementById('add-button');
const editButton = document.getElementById('edit-btn');
const alertMsg = document.getElementById('alert-msg');
const todosBody = document.querySelector('tbody');
const deleteAllButton = document.getElementById('delete-all-btn');
const filterTodos = document.querySelectorAll('.filter-todos');

const generateId = () => {
    return Math.round(Math.random() * Math.random() * Math.pow(10, 15)).toString();
}
generateId();




let todos = JSON.parse(localStorage.getItem('todos')) || [];
console.log(todos);

const saveToLocalStorage = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
};


const showAlert = (message, type) => {
    alertMsg.innerHTML = '';
    const alert = document.createElement('p');
    alert.innerText = message;
    if (type === 'error') {
        alert.classList.add('bg-danger');
        alert.classList.add('rounded-2');
    } else {
        alert.classList.add('bg-success');
        alert.classList.add('rounded-2');
    }
    alertMsg.append(alert);
    setTimeout(() => {
        alert.style.display = 'none';
        alertMsg.removeChild(alert);
    }, 2000);
};

const displayTodos = (data) => {
    const todoList = data ? data : todos;
    todosBody.innerHTML = '';

    if (!todoList.length) {
        todosBody.innerHTML = '<tr><td colspan="4">No task found!</td></tr>';
        return;
    }
    todoList.forEach((todo) => {
        todosBody.innerHTML += `
        <tr>
        <td>${todo.task}</td>
        <td>${todo.date || 'No date'}</td>
        <td>${todo.completed ? 'Completed' : 'Pending'}</td>
        <td>
        <button onclick = 'toggleHandler("${todo.id}")' class = 'btn btn-success mx-1'>${todo.completed ? 'undo' : 'do'}</button>
        <button onclick ='deleteHandler("${todo.id}")' class = 'btn btn-danger mx-1'>delete</button>
        </td>
        </tr>
        `
    })
};


const addHandler = () => {
    const task = taskInput.value;
    const date = dateInput.value;
    const todo = {
        id: generateId(),
        completed: false,
        task: task,
        date: date,

    };
    if (task) {
        todos.push(todo);
        saveToLocalStorage();
        displayTodos();
        taskInput.value = '';
        dateInput.value = '';
        showAlert('Todo added successfully!', 'succes')
    } else {
        showAlert('Please enter todo', 'error')
    };

};

const deleteAllHandler = () => {
    if (todos.length) {
        todos = [];
        saveToLocalStorage();
        displayTodos();
        showAlert('All todos has been deleted successfully', 'success');

    } else {
        showAlert('No todos to clear!', 'error')
    };

};

const deleteHandler = (id) => {
    const newTodos = todos.filter((todo) => {
        return todo.id !== id
    });
    todos = newTodos;
    saveToLocalStorage();
    displayTodos();
    showAlert('Todo has been deleted', 'success')
};


const toggleHandler = (id) => {
    const newTodos = todos.map(todo => {
        if (todo.id === id) {
            return {
                ...todo,
                completed: !todo.completed,
            };
        } else {
            return todo;
        };
    })
    todos = newTodos;

    saveToLocalStorage();
    displayTodos();
    showAlert('Status has been changed!', 'Success');
};

const filterHandler = (event) => {
    let filteredTodos = null;
    const filter = event.target.dataset.filter;
    switch (filter) {
        case 'pending':
            filteredTodos = todos.filter((todo) =>
                todo.completed === false);
            break;
        case 'completed':
            filteredTodos = todos.filter((todo) =>
                todo.completed === true);
            break;

        default:
            filteredTodos = todos;
            break;

    };
    displayTodos(filteredTodos);
}

filterTodos.forEach((button) => {
    button.addEventListener('click', filterHandler);
});
addButton.addEventListener('click', addHandler);
window.addEventListener('load', () => displayTodos());
deleteAllButton.addEventListener('click', deleteAllHandler);
