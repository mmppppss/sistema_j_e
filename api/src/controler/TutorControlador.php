<?php

class TutorControlador{
	private $modeloTutor;

	public function __construct($pdo){
		require_once '../src/model/Tutor.php';
		$this->modeloTutor = new Tutor($pdo);
	}

	public function getAll(){
		$tutors = $this->modeloTutor->getAll();
		echo json_encode($tutors);
	}

	public function getTutor($id){
		$tutor = $this->modeloTutor->getById($id);
		echo json_encode($tutor);
	}

	public function createTutor(){
		$ci = $_POST['ci'];
		$nombre = $_POST['nombre'];
		$apellido_pat = $_POST['apellido_pat'];
		$apellido_mat = $_POST['apellido_mat'];
		$sexo = $_POST['sexo'];
		$telefono = $_POST['telefono'];
		$direccion = $_POST['direccion'];
		$correo = $_POST['correo'];
		$res = $this->modeloTutor->create($ci, $nombre, $apellido_pat, $apellido_mat, $sexo, $telefono, $direccion, $correo);
		echo json_encode($res);
	}

	public function editTutor($id){
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
		$res = $this->modeloTutor->update($id, $ci, $nombre, $apellido_pat, $apellido_mat, $sexo, $telefono, $direccion, $correo);
		echo json_encode($res);
	}

	public function deleteTutor($id){
		$res = $this->modeloTutor->delete($id);
		echo json_encode($res);
	}
}

?>
