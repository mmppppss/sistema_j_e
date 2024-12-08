<?php

class Usuario
{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }


    public function getAll()
    {
        $usuarios = $this->pdo->query("SELECT * FROM usuario");
        return $usuarios->fetchAll();
    }


    public function getById($id)
    {
        $query = $this->pdo->prepare("SELECT * FROM usuario WHERE id = :id");
        $query->execute(['id' => $id]);
        return $query->fetch();
    }

    public function getbyUsername($username)
    {
        $query = $this->pdo->prepare('SELECT * FROM usuario WHERE username = :username');
        $query->execute(['username' => $username]);
        return $query->fetch();
    }

    // Obtener usuarios por permiso (0 = admin, 1 = profesor, 2 = voluntario, 3 = médico)
    public function getByPermission($permission)
    {
        $query = $this->pdo->prepare("SELECT * FROM usuario WHERE permission = :permission");
        $query->execute(['permission' => $permission]);
        return $query->fetchAll();
    }


    public function create($username, $password, $permission)
    {
        $query = $this->pdo->prepare("
            INSERT INTO usuario (username, hash_password, permission)
            VALUES (:username, md5( :password ), :permission)
        ");
        $query->execute([
            'username' => $username,
            'password' => $password,
            'permission' => $permission
        ]);
        return $query;
    }


    public function update($id, $username, $hashpassword, $permission)
    {
        $query = $this->pdo->prepare("
            UPDATE usuario
            SET username = :username, hash_password = :hashpassword, permission = :permission
            WHERE id = :id
        ");
        $query->execute([
            'id' => $id,
            'username' => $username,
            'hashpassword' => $hashpassword,
            'permission' => $permission
        ]);
        return $query;
    }


    public function delete($id)
    {
        $query = $this->pdo->prepare("DELETE FROM usuario WHERE id = :id");
        $query->execute(['id' => $id]);
        return $query;
    }
}
