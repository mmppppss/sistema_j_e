<?php
require_once 'Usuario.php';
class Personal
{
	private $pdo;
	private $usuario;

    public function __construct($pdo)
	{
		$this->pdo = $pdo;
		$this->usuario = new Usuario($pdo);
    }


    public function getAll()
    {
        $query = $this->pdo->query("
            SELECT personal.*, usuario.username, usuario.permission 
            FROM personal
            INNER JOIN usuario ON personal.id = usuario.id
        ");
        return $query->fetchAll();
    }


    public function getById($id)
    {
        $query = $this->pdo->prepare("
            SELECT personal.*, usuario.username, usuario.permission
            FROM personal
            INNER JOIN usuario ON personal.id = usuario.id
            WHERE personal.id = :id
        ");
        $query->execute(['id' => $id]);
        return $query->fetch();
    }


	public function create($nombre, $apellido_pat, $apellido_mat, $ci, $telefono, $correo, $sexo, $direccion, $username, $permission, $password)
    {
        $query = $this->pdo->prepare("
            INSERT INTO personal (id, nombre, apellido_pat, apellido_mat, ci, telefono, correo, sexo, direccion)
            VALUES (:id, :nombre, :apellido_pat, :apellido_mat, :ci, :telefono, :correo, :sexo, :direccion)
		");
		$queryUsuario = $this->usuario->create($username, $password, $permission);
		$id = $this->pdo->lastInsertId();
        $query->execute([
            'id' => $id,  // La clave foránea que referencia a usuario
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


    public function update($id, $nombre, $apellido_pat, $apellido_mat, $ci, $telefono, $correo, $sexo, $direccion, $username, $password, $permission)
    {
        $query = $this->pdo->prepare("
            UPDATE personal
            SET nombre = :nombre, apellido_pat = :apellido_pat, apellido_mat = :apellido_mat,
                ci = :ci, telefono = :telefono, correo = :correo, sexo = :sexo, direccion = :direccion
            WHERE id = :id
		");
		$userup = $this->usuario->update($id, $username, $password, $permission);
        $query->execute([
            'id' => $id,
            'nombre' => $nombre,
            'apellido_pat' => $apellido_pat,
            'apellido_mat' => $apellido_mat,
            'ci' => $ci,
            'telefono' => $telefono,
            'correo' => $correo,
            'sexo' => $sexo,
			'direccion' => $direccion,
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
