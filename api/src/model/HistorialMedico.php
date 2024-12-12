<?php

class Historial{
	private $pdo;

	public function __construct($pdo){
		$this->pdo = $pdo;
	}

	public function getAll(){
		$historials = $this->pdo->query("SELECT * FROM analisis_medico");
		return $historials->fetchAll();
	}

	public function getById($id){
		$historial = $this->pdo->prepare("SELECT * FROM analisis_medico WHERE id_niño = :id");
		$historial->execute(['id' => $id]);
		return $historial->fetchAll();
	}
	
	public function create($id_niño, $id_medico, $temperatura, $pulso, $presion, $observacion){
    	$query = $this->pdo->prepare('INSERT INTO analisis_medico (id_niño, id_medico, temperatura, pulso, presion, observacion) VALUES (?,?,?,?,?,?)');
		$query->execute([
			$id_niño, 
			$id_medico, 
			$temperatura, 
			$pulso, 
			$presion, 
			$observacion
		]);

	return $query;
}	
	public function update($id_niño, $id_medico, $temperatura, $pulso, $presion, $observacion){
		$query=$this->pdo->prepare('UPDATE analisis_medico SET id_niño = :id_niño, id_medico = :id_medico, temperatura = :temperatura, pulso = :pulso, presion = :presion, observacion = :observacion, fecha = now(), hora = DATE_FORMAT(NOW( ), "%H:%i" ) WHERE id = :id');
		return $query;
	}

	
}
?>
