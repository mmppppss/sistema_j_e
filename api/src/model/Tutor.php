<?php

class Tutor{
	private $pdo;

	public function __construct($pdo){
		$this->pdo = $pdo;
	}

	public function getAll(){
		$tutors = $this->pdo->query("SELECT * FROM tutor");
		return $tutors->fetchAll();
	}

	public function getById($id){
		$tutor = $this->pdo->prepare("SELECT * FROM tutor WHERE id = :id");
		$tutor->execute(['id' => $id]);
		return $tutor->fetch();
	}
	
	public function create($ci, $nombre, $apellido_pat, $apellido_mat, $sexo, $telefono, $direccion, $correo){
		$query=$this->pdo->prepare("INSERT INTO tutor (ci, nombre, apellido_pat, apellido_mat, sexo, telefono, direccion, correo) VALUES (:ci, :nombre, :apellido_pat, :apellido_mat, :sexo, :telefono, :direccion, :correo)");
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
		$query = $this->pdo->prepare("UPDATE tutor SET ci = :ci, nombre = :nombre, apellido_pat = :apellido_pat, apellido_mat = :apellido_mat, sexo = :sexo, telefono = :telefono, correo = :correo ,direccion = :direccion WHERE id = :id");
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
		$query = $this->pdo->prepare("DELETE FROM tutor WHERE id = :id");
		$query->execute(['id' => $id]);
		return $query;
	}
}
?>
