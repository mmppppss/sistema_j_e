<?php

class Materia{
	private $pdo;

	public function __construct($pdo){
		$this->pdo = $pdo;
	}

	public function getAll(){
		$materias = $this->pdo->query("SELECT * FROM materia");
		return $materias->fetchAll();
	}

	public function getById($id){
		$materia = $this->pdo->prepare("SELECT * FROM materia WHERE id = :id");
		$materia->execute(['id' => $id]);
		return $materia->fetch();
	}
	
	public function create($nombre, $id_profesor, $id_voluntario, $descripcion, $fecha, $hora){
		$query=$this->pdo->prepare("INSERT INTO materia (nombre, id_profesor, id_voluntario, descripcion, fecha, hora) VALUES (:nombre, :id_profesor, :id_voluntario, :descripcion, :fecha, :hora)");
		echo "hola";
		$query->execute([
			'nombre' => $nombre,
			'id_profesor' => $id_profesor,
			'id_voluntario' => $id_voluntario,
			'descripcion' => $descripcion,
			'fecha' => $fecha,
			'hora' => $hora
		]);
		return $query;
	}
	
	public function update($id, $nombre, $id_profesor, $id_voluntario, $descripcion, $fecha, $hora){
		$query = $this->pdo->prepare("UPDATE materia SET nombre = :nombre, id_profesor = :id_profesor, id_voluntario = :id_voluntario, descripcion = :descripcion, fecha = :fecha, hora = :hora WHERE id = :id");
		$query->execute([
			'id' => $id,
			'nombre' => $nombre,
			'id_profesor' => $id_profesor,
			'id_voluntario' => $id_voluntario,
			'descripcion' => $descripcion,
			'fecha' => $fecha,
			'hora' => $hora
		]);
		return $query;
	}

	public function delete($id){
		$query = $this->pdo->prepare("DELETE FROM materia WHERE id = :id");
		$query->execute(['id' => $id]);
		return $query;
	}
}
?>
