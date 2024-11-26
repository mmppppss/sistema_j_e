<?php

class Personal
{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }


    public function getAll()
    {
        $query = $this->pdo->query("
            SELECT personal.*, usuario.username 
            FROM personal
            INNER JOIN usuario ON personal.id = usuario.id
        ");
        return $query->fetchAll();
    }


    public function getById($id)
    {
        $query = $this->pdo->prepare("
            SELECT personal.*, usuario.username 
            FROM personal
            INNER JOIN usuario ON personal.id = usuario.id
            WHERE personal.id = :id
        ");
        $query->execute(['id' => $id]);
        return $query->fetch();
    }


    public function create($id_usuario, $nombre, $apellido_pat, $apellido_mat, $ci, $telefono, $correo, $sexo, $direccion)
    {
        $query = $this->pdo->prepare("
            INSERT INTO personal (id, nombre, apellido_pat, apellido_mat, ci, telefono, correo, sexo, direccion)
            VALUES (:id, :nombre, :apellido_pat, :apellido_mat, :ci, :telefono, :correo, :sexo, :direccion)
        ");
        $query->execute([
            'id' => $id_usuario,  // La clave foránea que referencia a usuario
            'nombre' => $nombre,
            'apellido_pat' => $apellido_pat,
            'apellido_mat' => $apellido_mat,
            'ci' => $ci,
            'telefono' => $telefono,
            'correo' => $correo,
            'sexo' => $sexo,
            'direccion' => $direccion
        ]);
        return $query;
    }


    public function update($id, $nombre, $apellido_pat, $apellido_mat, $ci, $telefono, $correo, $sexo, $direccion)
    {
        $query = $this->pdo->prepare("
            UPDATE personal
            SET nombre = :nombre, apellido_pat = :apellido_pat, apellido_mat = :apellido_mat,
                ci = :ci, telefono = :telefono, correo = :correo, sexo = :sexo, direccion = :direccion
            WHERE id = :id
        ");
        $query->execute([
            'id' => $id,
            'nombre' => $nombre,
            'apellido_pat' => $apellido_pat,
            'apellido_mat' => $apellido_mat,
            'ci' => $ci,
            'telefono' => $telefono,
            'correo' => $correo,
            'sexo' => $sexo,
            'direccion' => $direccion
        ]);
        return $query;
    }


    public function delete($id)
    {
        $query = $this->pdo->prepare("DELETE FROM personal WHERE id = :id");
        $query->execute(['id' => $id]);
        return $query;
    }

    public function buscar($nombre)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM personal WHERE nombre like :nombre");
        $stmt->execute(['nombre' => "%$nombre%"]);
        return $stmt->fetch();
    }

    public function buscarAct($nombre)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM actividad WHERE nombre like :nombre");
        $stmt->execute(['nombre' => "%$nombre%"]);
        return $stmt->fetch();
    }

    public function buscarNi($nombre)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM nino WHERE nombre like :nombre");
        $stmt->execute(['nombre' => "%$nombre%"]);
        return $stmt->fetch();
    }

    public function buscarTu($nombre)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM tutor WHERE nombre like :nombre");
        $stmt->execute(['nombre' => "%$nombre%"]);
        return $stmt->fetch();
    }

    public function buscarProfe($nombre)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM profesor WHERE nombre like :nombre");
        $stmt->execute(['nombre' => "%$nombre%"]);
        return $stmt->fetch();
    }

    public function buscarMate($nombre)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM materia WHERE nombre like :nombre");
        $stmt->execute(['nombre' => "%$nombre"]);
        return $stmt->fetch();
    }
}
