<?php

class UsuarioControlador{
	private $modeloUsuario;

	public function __construct($pdo){
		require_once '../src/model/Usuario.php';
		$this->modeloUsuario = new Usuario($pdo);
	}

	public function getAll(){
		$usuarios = $this->modeloUsuario->getAll();
		echo json_encode($usuarios);
	}

	public function getUsuario($id){
		$usuario = $this->modeloUsuario->getById($id);
		echo json_encode($usuario);
	}

	public function createUsuario(){
		$nombre = $_POST['username'];
		$contra = $_POST['hash_password'];
		$res = $this->modeloUsuario->create($nombre, $contra);
		echo json_encode($res);
	}

	public function editUsuario($id){
		$input = file_get_contents('php://input');
		$data = json_decode($input, true);
		$nombre = $data['username'];
		$contra = $data['hash_password'];
		$res = $this->modeloUsuario->update($id, $nombre, $contra);
		echo json_encode($res);
	}

	public function deleteUsuario($id){
		$res = $this->modeloUsuario->delete($id);
		echo json_encode($res);
	}
}

?>
