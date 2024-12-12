<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');
class Niño{
	private $pdo;

	public function __construct($pdo){
		$this->pdo = $pdo;
	}

	public function getAll(){
		$niños = $this->pdo->query("SELECT * FROM niño");
		return $niños->fetchAll();
	}

	public function getById($id){
		$niño = $this->pdo->prepare("SELECT * FROM niño WHERE id = :id");
		$niño->execute(['id' => $id]);
		return $niño->fetch();
	}
	
	public function create($ci, $nombre, $apellido_pat, $apellido_mat, $sexo, $telefono, $fecha_nacimiento, $id_tutor){
		$query=$this->pdo->prepare("INSERT INTO niño (ci, nombre, apellido_pat, apellido_mat, sexo, telefono, fecha_nacimiento, id_tutor) VALUES (:ci, :nombre, :apellido_pat, :apellido_mat, :sexo, :telefono, :fecha_nacimiento, :id_tutor)");
		$query->execute([
			'ci' => $ci,
			'nombre' => $nombre,
			'apellido_pat' => $apellido_pat,
			'apellido_mat' => $apellido_mat,
			'sexo' => $sexo,
			'telefono' => $telefono,
			'fecha_nacimiento' => $fecha_nacimiento,
			'id_tutor' => $id_tutor
		]);
		return $query;
	}
	
	public function update($id, $ci, $nombre, $apellido_pat, $apellido_mat, $sexo, $telefono, $fecha_nacimiento, $id_tutor){
		$query = $this->pdo->prepare("UPDATE niño SET ci = :ci, nombre = :nombre, apellido_pat = :apellido_pat, apellido_mat = :apellido_mat, sexo = :sexo, telefono = :telefono, fecha_nacimiento = :fecha_nacimiento, id_tutor = :id_tutor WHERE id = :id");
		$query->execute([
			'id' => $id,
			'ci' => $ci,
			'nombre' => $nombre,
			'apellido_pat' => $apellido_pat,
			'apellido_mat' => $apellido_mat,
			'sexo' => $sexo,
			'telefono' => $telefono,
			'fecha_nacimiento' => $fecha_nacimiento,
			'id_tutor' => $id_tutor
		]);
		return $query;
	}

	public function delete($id){
		$query = $this->pdo->prepare("DELETE FROM niño WHERE id = :id");
		$query->execute(['id' => $id]);
		return $query;
	}
}
?>
