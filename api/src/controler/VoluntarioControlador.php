<?php

class VoluntarioControlador
{
    private $modeloVoluntario;

    public function __construct($pdo)
    {
        require_once '../src/model/Voluntario.php';
        $this->modeloVoluntario = new Voluntario($pdo);
    }


    public function getAll()
    {
        $voluntarios = $this->modeloVoluntario->getAll();
        echo json_encode($voluntarios);
    }


    public function getVoluntario($id)
    {
        $voluntario = $this->modeloVoluntario->getById($id);
        echo json_encode($voluntario);
    }


    public function createVoluntario()
    {
		$id_usuario = $_POST['id'];
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
		$ocupacion = $_POST['ocupacion'];

		$res = $this->modeloVoluntario->create($id_usuario, /*$nombre, $apellido_pat, $apellido_mat, $ci, $telefono, $correo, $sexo, $direccion, */$ocupacion);

        echo json_encode(['message' => 'Voluntario creado con éxito', 'result' => $res]);
    }


    public function editVoluntario($id)
	{
		/*
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
		$ocupacion = $data['ocupacion'];

		$res = $this->modeloVoluntario->update($id, /* $id_usuario, $nombre, $apellido_pat, $apellido_mat, $ci, $telefono, $correo, $sexo, $direccion,*/ $ocupacion);

        echo json_encode(['message' => 'Voluntario actualizado con éxito', 'result' => $res]);
    }


    public function deleteVoluntario($id)
    {
        $res = $this->modeloVoluntario->delete($id);

        echo json_encode(['message' => 'Voluntario eliminado con éxito', 'result' => $res]);
    }
}
