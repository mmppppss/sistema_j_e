<?php

class AdministradorControlador
{
    private $modeloAdministrador;

    public function __construct($pdo)
    {
        require_once '../src/model/Administrador.php';
        $this->modeloAdministrador = new Administrador($pdo);
    }


    public function getAll()
    {
        $administradores = $this->modeloAdministrador->getAll();
        echo json_encode($administradores);
    }


    public function getAdministrador($id)
    {
        $administrador = $this->modeloAdministrador->getById($id);
        echo json_encode($administrador);
    }


    public function createAdministrador()
    {
        $id = $_POST['id'];

        if (!isset($id)) {
            echo json_encode(['error' => 'Faltan datos requeridos']);
            return;
        }

        $res = $this->modeloAdministrador->create($id);

        echo json_encode(['message' => 'Administrador creado con éxito', 'result' => $res]);
    }


    public function editAdministrador($id)
    {
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);

        if (!isset($data['id'])) {
            echo json_encode(['error' => 'Faltan datos requeridos']);
            return;
        }
        $idNuevo = $data['id'];

        $res = $this->modeloAdministrador->update($id, $idNuevo);

        echo json_encode(['message' => 'Administrador actualizado con éxito', 'result' => $res]);
    }


    public function deleteAdministrador($id)
    {
        $res = $this->modeloAdministrador->delete($id);

        echo json_encode(['message' => 'Administrador eliminado con éxito', 'result' => $res]);
    }
}
