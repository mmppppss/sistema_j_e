<?php
session_start();
if(!isset($_SESSION['token'])){
	echo json_encode([
		"session" => false,
		"message" => "Por favor inicia sesion"
	]);
}
$tokenSession = $_SESSION['token'];
echo $tokenSession;
