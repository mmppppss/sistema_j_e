<?php

class PersonalControlador
{
    private $modeloPersonal;

    public function __construct($pdo)
    {
        require_once '../src/model/Personal.php';
        $this->modeloPersonal = new Personal($pdo);
    }


    public function getAll()
    {
        $personal = $this->modeloPersonal->getAll();
        echo json_encode($personal);
    }


    public function getPersonal($id)
    {
        $personal = $this->modeloPersonal->getById($id);
        echo json_encode($personal);
    }


    public function createPersonal()
    {

        $nombre = $_POST['nombre'];
        $apellido_pat = $_POST['apellido_pat'];
        $apellido_mat = $_POST['apellido_mat'];
        $ci = $_POST['ci'];
        $telefono = $_POST['telefono'];
        $correo = $_POST['correo'];
        $sexo = $_POST['sexo'];
        $direccion = $_POST['direccion'];
        $id_usuario = $_POST['id_usuario'];

        $res = $this->modeloPersonal->create($id_usuario, $nombre, $apellido_pat, $apellido_mat, $ci, $telefono, $correo, $sexo, $direccion);

        echo json_encode(['message' => 'Personal creado con éxito', 'result' => $res]);
    }


    public function editPersonal($id)
    {
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);

        $nombre = $data['nombre'];
        $apellido_pat = $data['apellido_pat'];
        $apellido_mat = $data['apellido_mat'];
        $ci = $data['ci'];
        $telefono = $data['telefono'];
        $correo = $data['correo'];
        $sexo = $data['sexo'];
        $direccion = $data['direccion'];

        $res = $this->modeloPersonal->update($id, $nombre, $apellido_pat, $apellido_mat, $ci, $telefono, $correo, $sexo, $direccion);

        echo json_encode(['message' => 'Personal actualizado con éxito', 'result' => $res]);
    }


    public function deletePersonal($id)
    {
        $res = $this->modeloPersonal->delete($id);

        echo json_encode(['message' => 'Personal eliminado con éxito', 'result' => $res]);
    }

    public function buscarPersonal($nombre)
    {
        $res = $this->modeloPersonal->buscar($nombre);

        echo json_encode($res);
    }

    public function buscarActividad($nombre)
    {
        $res = $this->modeloPersonal->buscarAct($nombre);

        echo json_encode($res);
    }

    public function buscarniño($nombre)
    {
        $res = $this->modeloPersonal->buscarNi($nombre);

        echo json_encode($res);
    }

    public function buscarTutor($nombre)
    {
        $res = $this->modeloPersonal->buscarTu($nombre);

        echo json_encode($res);
    }

    public function buscarProfesor($nombre)
    {
        $res = $this->modeloPersonal->buscarProfe($nombre);

        echo json_encode($res);
    }

    public function buscarMateria($nombre)
    {
        $res = $this->modeloPersonal->buscarMate($nombre);

        echo json_encode($res);
    }
}
