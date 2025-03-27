function loadTodos() {
    fetch('todo.php')
        .then(response => response.json())
        .then(todos => {
            console.log(todos);
            const todoList = document.getElementById('todoList');
            todoList.innerHTML = '';
            todos.forEach(todo => {
                const li = document.createElement('li');
                li.textContent = todo;
                todoList.appendChild(li);
            });
        });
}

window.addEventListener("load", (event) => {
    loadTodos();
});

document.getElementById('todoForm').addEventListener(
    'submit', function (e) {

    e.preventDefault();

    const todoInput = document.getElementById('todoInput').value;
    // console.log(JSON.stringify({ todo: todoInput }));

    fetch('todo.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ todo: todoInput }),
    })
    .then(response => response.json())
    .then((result) => {
        // console.log(result)
        loadTodos();
        document.getElementById('todoInput').value = '';
    })
    .catch(error => console.error(`Fehler beim Senden des Todos: ${error}`))
});
