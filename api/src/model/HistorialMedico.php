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
		$historial = $this->pdo->prepare("SELECT * FROM analisis_medico WHERE id = :id");
		$historial->execute(['id' => $id]);
		return $historial->fetch();
	}
	
	public function create($ci, $nombre, $apellido_pat, $apellido_mat, $sexo, $telefono, $direccion, $correo){
		$query=$this->pdo->prepare("INSERT INTO analisis_medico (ci, nombre, apellido_pat, apellido_mat, sexo, telefono, direccion, correo) VALUES (:ci, :nombre, :apellido_pat, :apellido_mat, :sexo, :telefono, :direccion, :correo)");
		echo "hola";
		$query->execute([
			'ci' => $ci,
			'nombre' => $nombre,
			'apellido_pat' => $apellido_pat,
			'apellido_mat' => $apellido_mat,
			'sexo' => $sexo,
			'telefono' => $telefono,
			'direccion' => $direccion,
			'correo' => $correo
		]);
		return $query;
	}
	
	public function update($id, $ci, $nombre, $apellido_pat, $apellido_mat, $sexo, $telefono, $direccion, $correo){
		$query = $this->pdo->prepare("UPDATE analisis_medico SET ci = :ci, nombre = :nombre, apellido_pat = :apellido_pat, apellido_mat = :apellido_mat, sexo = :sexo, telefono = :telefono, correo = :correo ,direccion = :direccion WHERE id = :id");
		$query->execute([
			'id' => $id,
			'ci' => $ci,
			'nombre' => $nombre,
			'apellido_pat' => $apellido_pat,
			'apellido_mat' => $apellido_mat,
			'sexo' => $sexo,
			'telefono' => $telefono,
			'direccion' => $direccion,
			'correo' => $correo
		]);
		return $query;
	}

	public function delete($id){
		$query = $this->pdo->prepare("DELETE FROM analisis_medico WHERE id = :id");
		$query->execute(['id' => $id]);
		return $query;
	}
}
?>
