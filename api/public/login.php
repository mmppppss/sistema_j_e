<?php
function login(){
	$database = new Database();
	$db = $database->getConnection();
	$USERNAME = $_GET['username'];
	$PASSWORD = $_GET['password'];
	$query = "SELECT hash_password FROM usuario WHERE username = :username";
	$stmt = $db->prepare($query);
	$stmt->execute(['username' => $USERNAME]);
	$hash = $stmt->fetchColumn();
	if($hash == hashMD5($PASSWORD)){
		$_SESSION['token'] = generateToken();
		return json_encode([
			"session" => true,
			"token" => $_SESSION['token'],
			"username" => $USERNAME
		]);
	}else{
		return json_encode([
			"session" => false,
			"token" => "null",
			"username" => $USERNAME
		]);
	};
}
function hashMD5($text){
	return hash('md5',$text);
}
function generateToken(){
	return bin2hex(random_bytes(32));
}
session_start();
require_once '../src/config/Database.php';

echo login();
?>
