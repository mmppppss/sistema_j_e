<?php

class Profesor
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
			WHERE usuario.permission = 1;
        ");
        return $query->fetchAll();
    }


    public function getById($id)
    {
        $query = $this->pdo->prepare("
            SELECT profesor.*, personal.*, usuario.username 
            FROM profesor
            INNER JOIN usuario ON personal.id = usuario.id
            WHERE usuario.id = :id
        ");
        $query->execute(['id' => $id]);
        return $query->fetch();
    }


    public function create(
        $id_usuario,
/*        $nombre,
        $apellido_pat,
        $apellido_mat,
        $ci,
        $telefono,
        $correo,
        $sexo,
		$direccion,*/
        $especialidad
    ) {
/* buen intento 
        $id_personal = (new Personal($this->pdo))->create(
            $id_usuario,
            $nombre,
            $apellido_pat,
            $apellido_mat,
            $ci,
            $telefono,
            $correo,
            $sexo,
            $direccion
        );
*/
        $query = $this->pdo->prepare("
            INSERT INTO profesor (id, especialidad)
            VALUES (:id, :especialidad)
        ");
        $query->execute([
            'id' => $id_usuario,
            'especialidad' => $especialidad
        ]);

        return true;
    }


    public function update(
		$id,
/*
        $id_usuario,
        $nombre,
        $apellido_pat,
        $apellido_mat,
        $ci,
        $telefono,
        $correo,
        $sexo,
		$direccion,
*/
        $especialidad
    ) {
/*
        (new Personal($this->pdo))->update(
            $id,
            $id_usuario,
            $nombre,
            $apellido_pat,
            $apellido_mat,
            $ci,
            $telefono,
            $correo,
            $sexo,
            $direccion
        );
*/
        $query = $this->pdo->prepare("
            UPDATE profesor 
            SET especialidad = :especialidad
            WHERE id = :id
        ");
        $query->execute([
            'id' => $id,
            'especialidad' => $especialidad
        ]);

        return true;
    }


    public function delete($id)
    {
        $query = $this->pdo->prepare("DELETE FROM profesor WHERE id = :id");
        $query->execute(['id' => $id]);

        $query = $this->pdo->prepare("DELETE FROM personal WHERE id = :id");
        $query->execute(['id' => $id]);

        return true;
    }
}
