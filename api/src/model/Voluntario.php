<?php

class Voluntario
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
			WHERE usuario.permission = 2
        ");
        return $query->fetchAll();
    }


    public function getById($id)
    {
        $query = $this->pdo->prepare("
            SELECT voluntario.*, personal.*, usuario.username 
            FROM voluntario
            INNER JOIN personal ON voluntario.id = personal.id
            INNER JOIN usuario ON personal.id = usuario.id
            WHERE voluntario.id = :id
        ");
        $query->execute(['id' => $id]);
        return $query->fetch();
    }


	public function create($id_usuario, /*$nombre, $apellido_pat, $apellido_mat, $ci, $telefono, $correo, $sexo, $direccion, */ $ocupacion)
    {
/*
		$id_personal = (new Personal($this->pdo))->create($id_usuario, $nombre, $apellido_pat, $apellido_mat, $ci, $telefono, $correo, $sexo, $direccion);
*/
        $query = $this->pdo->prepare("
            INSERT INTO voluntario (id, ocupacion)
            VALUES (:id, :ocupacion)
        ");
        $query->execute([
            'id' => $id_usuario,
            'ocupacion' => $ocupacion
        ]);

        return true;
    }


	public function update($id,/* $id_usuario, $nombre, $apellido_pat, $apellido_mat, $ci, $telefono, $correo, $sexo, $direccion,*/ $ocupacion)
    {
        #(new Personal($this->pdo))->update($id, $id_usuario, $nombre, $apellido_pat, $apellido_mat, $ci, $telefono, $correo, $sexo, $direccion);

        $query = $this->pdo->prepare("
            UPDATE voluntario 
            SET ocupacion = :ocupacion
            WHERE id = :id
        ");
        $query->execute([
            'id' => $id,
            'ocupacion' => $ocupacion
        ]);

        return true;
    }


    public function delete($id)
    {
        $query = $this->pdo->prepare("DELETE FROM voluntario WHERE id = :id");
        $query->execute(['id' => $id]);

        $query = $this->pdo->prepare("DELETE FROM personal WHERE id = :id");
        $query->execute(['id' => $id]);

        return true;
    }
}
