<?php
header('Access-Control-Allow-Origin: *');
session_start();
if(!isset($_SESSION['token'])){
	echo json_encode([
		"session" => false,
		"message" => "Por favor inicia sesion",
		"error" => 100
	]);
	exit();
}
$tokenSession = $_SESSION['token'];
require_once '../src/router.php';
new Router();
?>
