<?php
$host = '127.0.0.1';
$port = '3307';      // Puerto de MariaDB en Wampserver
$db   = 'companydb'; // El nombre que veo en tu captura de phpMyAdmin
$user = 'root';
$pass = ''; 

try {
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Error de conexión: " . $e->getMessage();
    exit;
}
?>