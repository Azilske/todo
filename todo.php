<?php
header('Content-Type: application/json'); // Setzt den Content-Type Header auf JSON

$file = 'todo.json'; // Definiert den Dateinamen für die Speicherung der TODOs

// Überprüft, ob die Datei existiert und liest den Inhalt aus
if (file_exists($file)) {
    $json_data = file_get_contents($file); // Holt die gespeicherten TODOs
    $todos = json_decode($json_data, true); // Dekodiert die JSON-Daten in ein PHP-Array
} else {
    $todos = []; // Falls die Datei nicht existiert, wird ein leeres Array erstellt
}

// Prüft, ob eine POST-Anfrage gesendet wurde, um neue TODOs hinzuzufügen
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true); // Liest die gesendeten JSON-Daten
    $todos[] = $input['todo']; // Fügt den neuen TODO-Eintrag zum Array hinzu
    file_put_contents($file, json_encode($todos)); // Speichert das aktualisierte Array in die Datei
    echo json_encode(['status' => 'success']); // Sendet eine Erfolgsantwort zurück
    exit; // Beendet die Skriptausführung
}

// Gibt die gespeicherten TODOs als JSON zurück
echo json_encode($todos);
?>
