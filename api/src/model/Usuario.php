<?php

class Usuario{
	private $pdo;

	public function __construct($pdo){
		$this->pdo = $pdo;
	}

	public function getAll(){
		$usuarios = $this->pdo->query("SELECT * FROM usuario");
		return $usuarios->fetchAll();
	}

	public function getById($id){
		$usuario = $this->pdo->prepare("SELECT * FROM usuario WHERE id = :id");
		$usuario->execute(['id' => $id]);
		return $usuario->fetch();
	}
	
	public function create($nombre, $contraseña){
		$query=$this->pdo->prepare("INSERT INTO usuario (username, hash_password) VALUES (:nombre, :contra)");
		$query->execute([
			'nombre' => $nombre,
			'contra' => $contraseña
			]);
		return $query;
	}
	
	public function update($id, $nombre, $contraseña){
	$query = $this->pdo->prepare("UPDATE usuario SET username = :nombre, hash_password = :contra  WHERE id = :id");
		$query->execute([
			'id' => $id,
			'nombre' => $nombre,
			'contra' => $contraseña
		]);
		return $query;
	}

	public function delete($id){
		$query = $this->pdo->prepare("DELETE FROM usuario WHERE id = :id");
		$query->execute(['id' => $id]);
		return $query;
	}
}
?>
