<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');
session_start();
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("HTTP/1.1 204 No Content");
}

/*if(!isset($_SESSION['token'])){
	echo json_encode([
		"session" => false,
		"message" => "Por favor inicia sesion",
		"error" => 100
	]);
	#exit();
}
$tokenSession = $_SESSION['token'];*/
require_once '../src/router.php';
new Router();
?>
