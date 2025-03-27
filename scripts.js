function loadTodos() {
    fetch('todo.php') // Sendet eine GET-Anfrage an todo.php
        .then(response => response.json()) // Wandelt die Antwort in JSON um
        .then(todos => {
            console.log(todos); // Gibt die TODOs zur Überprüfung in der Konsole aus
            const todoList = document.getElementById('todoList'); // Holt das Listen-Element
            todoList.innerHTML = ''; // Leert die Liste vor dem erneuten Befüllen
            
            todos.forEach(todo => { // Iteriert über die empfangenen TODOs
                const li = document.createElement('li'); // Erstellt ein neues Listenelement
                li.textContent = todo; // Setzt den Text des Elements auf den TODO-Wert
                todoList.appendChild(li); // Fügt das Element zur Liste hinzu
            });
        });
}

// Lädt die TODOs beim Laden der Seite
window.addEventListener("load", (event) => {
    loadTodos();
});

// Fügt einen Event-Listener für das Absenden des Formulars hinzu
document.getElementById('todoForm').addEventListener(
    'submit', function (e) {
        e.preventDefault(); // Verhindert das Neuladen der Seite

        const todoInput = document.getElementById('todoInput').value; // Holt den eingegebenen Text
        
        fetch('todo.php', {
            method: 'POST', // Sendet eine POST-Anfrage
            headers: {
                'Content-Type': 'application/json', // Setzt den Content-Type Header
            },
            body: JSON.stringify({ todo: todoInput }), // Wandelt den Text in JSON um und sendet ihn
        })
        .then(response => response.json()) // Wandelt die Antwort in JSON um
        .then((result) => {
            loadTodos(); // Aktualisiert die Liste nach dem Speichern
            document.getElementById('todoInput').value = ''; // Leert das Eingabefeld
        })
        .catch(error => console.error(`Fehler beim Senden des Todos: ${error}`)) // Fehlerbehandlung
    }
);
