<?php

class UsuarioControlador
{
    private $modeloUsuario;

    public function __construct($pdo)
    {
        require_once '../src/model/Usuario.php';
        $this->modeloUsuario = new Usuario($pdo);
    }


    public function getAll()
    {
        $usuarios = $this->modeloUsuario->getAll();
        echo json_encode($usuarios);
    }


    public function getUsuario($id)
    {
        $usuario = $this->modeloUsuario->getById($id);
        echo json_encode($usuario);
    }


    public function getUsuariosByPermission($permission)
    {
        $usuarios = $this->modeloUsuario->getByPermission($permission);
        echo json_encode($usuarios);
    }


    public function createUsuario()
    {
        $username = $_POST['username'];
        $hashpassword = md5($_POST['password']);
        $permission = $_POST['permission']; // 0 = admin, 1 = profesor, 2 = voluntario, 3 = médico

        if ($permission < 0 || $permission > 3) {
            echo json_encode(['message' => 'Invalid permission value']);
            return;
        }

        $existing = $this->modeloUsuario->getByUsername($username);
        if ($existing) {
            echo json_encode(['message' => 'Username already exists']);
            return;
        }

        $res = $this->modeloUsuario->create($username, $hashpassword, $permission);
        echo json_encode(['result'=> 'success', 'message'=> 'Usuario creado exitosamente']);
    }


    public function editUsuario($id)
    {
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);
        $username = $data['username'];
        $hashpassword = md5($data['password']);
        $permission = $data['permission'];

        if ($permission < 0 || $permission > 3) {
            echo json_encode(['error' => 'Invalid permission value']);
            return;
        }

        $res = $this->modeloUsuario->update($id, $username, $hashpassword, $permission);
        echo json_encode($res);
    }


    public function deleteUsuario($id)
    {
        $res = $this->modeloUsuario->delete($id);
        echo json_encode($res);
    }


    public function validateAccess($currentUserPermission, $requiredPermission)
    {
        if ($currentUserPermission !== $requiredPermission) {
            echo json_encode(['error' => 'Access denied']);
            exit;
        }
    }
}
