<?php

class HistorialMedicoControlador{
	private $modeloHistorial;

	public function __construct($pdo){
		require_once '../src/model/HistorialMedico.php';
		$this->modeloHistorial = new Historial($pdo);
	}

	public function getAll(){
		$historials = $this->modeloHistorial->getAll();
		echo json_encode($historials);
	}

	public function getHistorial($id){
		$historial = $this->modeloHistorial->getById($id);
		echo json_encode($historial);
	}

	public function createHistorial(){
		$ci = $_POST['ci'];
		$nombre = $_POST['nombre'];
		$apellido_pat = $_POST['apellido_pat'];
		$apellido_mat = $_POST['apellido_mat'];
		$sexo = $_POST['sexo'];
		$telefono = $_POST['telefono'];
		$direccion = $_POST['direccion'];
		$correo = $_POST['correo'];
		$res = $this->modeloHistorial->create($ci, $nombre, $apellido_pat, $apellido_mat, $sexo, $telefono, $direccion, $correo);
		echo json_encode($res);
	}

	public function editHistorial($id){
		$input = file_get_contents('php://input');
		$data = json_decode($input, true);
		$ci = $data['ci'];
		$nombre = $data['nombre'];
		$apellido_pat = $data['apellido_pat'];
		$apellido_mat = $data['apellido_mat'];
		$sexo = $data['sexo'];
		$telefono = $data['telefono'];
		$direccion = $data['direccion'];
		$correo = $data['correo'];
		$res = $this->modeloHistorial->update($id, $ci, $nombre, $apellido_pat, $apellido_mat, $sexo, $telefono, $direccion, $correo);
		echo json_encode($res);
	}

	public function deleteHistorial($id){
		$res = $this->modeloHistorial->delete($id);
		echo json_encode($res);
	}
}

?>
