<?php

class MateriaControlador{
	private $modeloMateria;

	public function __construct($pdo){
		require_once '../src/model/Materia.php';
		$this->modeloMateria = new Materia($pdo);
	}

	public function getAll(){
		$materias = $this->modeloMateria->getAll();
		echo json_encode($materias);
	}

	public function getMateria($id){
		$materia = $this->modeloMateria->getById($id);
		echo json_encode($materia);
	}

	public function createMateria(){
		$nombre = $_POST['nombre'];
		$id_profesor = $_POST['id_profesor'];
		$id_voluntario = $_POST['id_voluntario'];
		$descripcion = $_POST['descripcion'];
		$fecha = $_POST['fecha'];
		$hora = $_POST['hora'];
		$res = $this->modeloMateria->create($nombre, $id_profesor, $id_voluntario, $descripcion, $fecha, $hora);
		echo json_encode($res);
	}

	public function editMateria($id){
		$input = file_get_contents('php://input');
		$data = json_decode($input, true);
		$nombre = $data['nombre'];
		$id_profesor = $data['id_profesor'];
		$id_voluntario = $data['id_voluntario'];
		$descripcion = $data['descripcion'];
		$fecha = $data['fecha'];
		$hora = $data['hora'];
		$res = $this->modeloMateria->update($id, $nombre, $id_profesor, $id_voluntario, $descripcion, $fecha, $hora);
		echo json_encode($res);
	}

	public function deleteMateria($id){
		$res = $this->modeloMateria->delete($id);
		echo json_encode($res);
	}
}

?>
