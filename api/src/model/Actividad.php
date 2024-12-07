<?php
class Actividad
{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function getAll()
    {
        $actividades = $this->pdo->query("SELECT * FROM actividad");
        return $actividades->fetchAll();
    }

    public function getById($id)
    {
        $actividad = $this->pdo->prepare("SELECT * FROM actividad WHERE id = :id");
        $actividad->execute(['id' => $id]);
        return $actividad->fetch();
    }

    public function create($nombre, $descripcion, $fecha, $hora)
    {
        $query = $this->pdo->prepare("INSERT INTO actividad (nombre, descripcion, fecha, hora) VALUES (:nombre, :descripcion, :fecha, :hora)");
        $query->execute([
            'nombre' => $nombre,
            'descripcion' => $descripcion,
            'fecha' => $fecha,
            'hora' => $hora
        ]);
        return $query;
    }

    public function update($id, $nombre, $descripcion, $fecha, $hora)
    {
        $query = $this->pdo->prepare("UPDATE actividad SET nombre = :nombre, descripcion = :descripcion, fecha = :fecha, hora = :hora WHERE id = :id");
        $query->execute([
            'id' => $id,
            'nombre' => $nombre,
            'descripcion' => $descripcion,
            'fecha' => $fecha,
            'hora' => $hora
        ]);
        return $query;
    }

    public function delete($id)
    {
        $query = $this->pdo->prepare("DELETE FROM actividad WHERE id = :id");
        $query->execute(['id' => $id]);
        return $query;
    }

}
?>