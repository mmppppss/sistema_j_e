<?php

class ProfesorControlador
{
    private $modeloProfesor;

    public function __construct($pdo)
    {
        require_once '../src/model/Profesor.php';
        $this->modeloProfesor = new Profesor($pdo);
    }

    public function getAll()
    {
        $profesores = $this->modeloProfesor->getAll();
        echo json_encode($profesores);
    }

    public function getProfesor($id)
    {
        $profesor = $this->modeloProfesor->getById($id);
        echo json_encode($profesor);
    }

    public function createProfesor()
    {
		$id_usuario = $_POST['id_usuario'];

/*
        $nombre = $_POST['nombre'];
        $apellido_pat = $_POST['apellido_pat'];
        $apellido_mat = $_POST['apellido_mat'];
        $ci = $_POST['ci'];
        $telefono = $_POST['telefono'];
        $correo = $_POST['correo'];
        $sexo = $_POST['sexo'];
		$direccion = $_POST['direccion'];
*/
        $especialidad = $_POST['especialidad'];

		$res = $this->modeloProfesor->create($id_usuario, /*$nombre, $apellido_pat, $apellido_mat, $ci, $telefono, $correo, $sexo, $direccion,*/ $especialidad);

        echo json_encode(['message' => 'Profesor creado con éxito', 'result' => $res]);
    }

    public function editProfesor($id)
    {
/* esta mal hacer con put no con post
		$id_usuario = $_POST['id_usuario'];

        $nombre = $_POST['nombre'];
        $apellido_pat = $_POST['apellido_pat'];
        $apellido_mat = $_POST['apellido_mat'];
        $ci = $_POST['ci'];
        $telefono = $_POST['telefono'];
        $correo = $_POST['correo'];
        $sexo = $_POST['sexo'];
        $direccion = $_POST['direccion'];
*/ 
		$input = file_get_contents('php://input');
		$data = json_decode($input, true);
		$especialidad = $data['especialidad'];

		$res = $this->modeloProfesor->update($id, /*$id_usuario, $nombre, $apellido_pat, $apellido_mat, $ci, $telefono, $correo, $sexo, $direccion,*/ $especialidad);

        echo json_encode(['message' => 'Profesor actualizado con éxito', 'result' => $res]);
    }

    public function deleteProfesor($id)
    {
        $res = $this->modeloProfesor->delete($id);

        echo json_encode(['message' => 'Profesor eliminado con éxito', 'result' => $res]);
    }
}
