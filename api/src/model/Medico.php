<?php

class Medico
{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }


    public function getAll()
    {
        $stmt = $this->pdo->query("SELECT * FROM medico");
        return $stmt->fetchAll();
    }


    public function getById($id)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM medico WHERE id = :id");
        $stmt->execute(['id' => $id]);
        return $stmt->fetch();
    }


    public function create($id, $especialidad)
    {
        $stmt = $this->pdo->prepare("INSERT INTO medico (id, especialidad) VALUES (:id, :especialidad)");
		$stmt->execute([
			'id' => $id,
            'especialidad' => $especialidad
        ]);
        return $stmt;
    }


    public function update($id, $especialidad)
    {
        $stmt = $this->pdo->prepare("UPDATE medico SET especialidad = :especialidad WHERE id = :id");
		$stmt->execute([
			'id' => $id,
            'especialidad' => $especialidad
        ]);
        return $stmt;
    }


    public function delete($id)
    {
        $stmt = $this->pdo->prepare("DELETE FROM medico WHERE id= :id");
        $stmt->execute(['id' => $id]);
        return $stmt;
    }
}
