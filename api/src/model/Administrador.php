<?php

class Administrador
{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function getAll()
    {
        $stmt = $this->pdo->query("SELECT * FROM administrador");
        return $stmt->fetchAll();
    }

    public function getById($id)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM administrador WHERE id = :id");
        $stmt->execute(['id' => $id]);
        return $stmt->fetch();
    }

    public function create($id)
    {
        $stmt = $this->pdo->prepare("INSERT INTO administrador (id) VALUES (:id)");
        $stmt->execute(['id' => $id]);
        return $stmt;
    }

    public function update($id, $idNuevo)
    {
        $stmt = $this->pdo->prepare("UPDATE administrador SET id = :idnuevo WHERE id = :id");
        $stmt->execute(['idnuevo' => $idNuevo, 'id' => $id]);
        return $stmt;
    }

    public function delete($id)
    {
        $stmt = $this->pdo->prepare("DELETE FROM administrador WHERE id = :id");
        $stmt->execute(['id' => $id]);
        return $stmt;
    }
}
