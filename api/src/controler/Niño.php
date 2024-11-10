<?php

class NiñoControlador{
	private $modeloNiño;

	public function __construct($pdo){
		require_once '../src/model/Niño.php';
		$this->modeloNiño = new Niño($pdo);
	}

	public function getAll(){
		$niños = $this->modeloNiño->getAll();
		echo json_encode($niños);
	}

	public function getNiño($id){
		$nino = $this->modeloNiño->getById($id);
		echo json_encode($nino);
	}

	public function createNiño(){
		$ci = $_POST['ci'];
		$nombre = $_POST['nombre'];
		$apellido_pat = $_POST['apellido_pat'];
		$apellido_mat = $_POST['apellido_mat'];
		$sexo = $_POST['sexo'];
		$telefono = $_POST['telefono'];
		$fecha_nacimiento = $_POST['fecha_nacimiento'];
		$res = $this->modeloNiño->create($ci, $nombre, $apellido_pat, $apellido_mat, $sexo, $telefono, $fecha_nacimiento);
		echo json_encode($res);
	}

	public function editNino($id){
		$ci = $_POST['ci'];
		$nombre = $_POST['nombre'];
		$apellido_pat = $_POST['apellido_pat'];
		$apellido_mat = $_POST['apellido_mat'];
		$sexo = $_POST['sexo'];
		$telefono = $_POST['telefono'];
		$fecha_nacimiento = $_POST['fecha_nacimiento'];
		$res = $this->modeloNiño->update($id, $ci, $nombre, $apellido_pat, $apellido_mat, $sexo, $telefono, $fecha_nacimiento);
		echo json_encode($res);
	}

	public function deleteNino($id){
		$res = $this->modeloNiño->delete($id);
		echo json_encode($res);
	}
}

?>
