<?php

class MedicoControlador
{
    private $modeloMedico;

    public function __construct($pdo)
    {
        require_once '../src/model/Medico.php';
        $this->modeloMedico = new Medico($pdo);
    }


    public function getAll()
    {
        $medicos = $this->modeloMedico->getAll();
        echo json_encode($medicos);
    }


    public function getMedico($id)
    {
        $medico = $this->modeloMedico->getById($id);
        echo json_encode($medico);
    }


    public function createMedico()
	{
		$id = $_POST['id'];
        $especialidad = $_POST['especialidad'];

        if (!isset($id, $especialidad)) {
            echo json_encode(['error' => 'Faltan datos requeridos']);
            return;
        }

        $res = $this->modeloMedico->create($id, $especialidad);
        echo json_encode(['message' => 'Médico creado con éxito', 'result' => $res]);
    }


    public function editMedico($id)
	{
		$input = file_get_contents('php://input');
		$data = json_decode($input, true);
        $especialidad = $data['especialidad'];

        if (!isset($especialidad)) {
            echo json_encode(['error' => 'Faltan datos requeridos']);
            return;
        }

        $res = $this->modeloMedico->update($id, $especialidad);
        echo json_encode(['message' => 'Médico actualizado con éxito', 'result' => $res]);
    }


    public function deleteMedico($id)
    {
        $res = $this->modeloMedico->delete($id);
        echo json_encode(['message' => 'Médico eliminado con éxito', 'result' => $res]);
    }
}
