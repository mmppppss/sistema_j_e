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
		$id_niño= $_POST ['id_niño'];
		$id_medico= $_POST ['id_medico'];
		$temperatura= $_POST ['temperatura'];
		$pulso= $_POST ['pulso'];
		$presion= $_POST ['presion'];
		$observacion= $_POST ['observacion'];
		
		$res = $this->modeloHistorial->create($id_niño, $id_medico, $temperatura, $pulso, $presion, $observacion);
		echo json_encode($res);
		
	}

	public function editHistorial($id){
		$input = file_get_contents('php://input');
		$data = json_decode($input, true);
		$id_niño= $data ['id_niño'];
		$id_medico= $data ['id_medico'];
		$temperatura= $data ['temperatura'];
		$pulso= $data['pulso'];
		$presion= $data ['presion'];
		$observacion= $data ['observacion'];
		
		$res = $this->modeloHistorial->update($id_niño, $id_medico, $temperatura, $pulso, $presion, $observacion);
		echo json_encode($res);
	}

	
}

?>
