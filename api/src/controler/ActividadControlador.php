<?php
class ActividadControlador{
    private $modeloActividad;

    public function __construct($pdo){
        require_once '../src/model/Actividad.php';
        $this->modeloActividad = new Actividad($pdo);
    }

    public function getAll(){
        $actividades = $this->modeloActividad->getAll();
        echo json_encode($actividades);
    }

    public function getActividad($id){
        $actividad = $this->modeloActividad->getById($id);
        echo json_encode($actividad);
    }

    public function createActividad(){
        $nombre = $_POST['nombre'];
        $descripcion = $_POST['descripcion'];
        $fecha = $_POST['fecha'];
        $hora = $_POST['hora'];

        $res = $this->modeloActividad->create($nombre, $descripcion, $fecha, $hora);
        echo json_encode($res);
    }

    public function editActividad($id){
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);
        $nombre = $data['nombre'];
        $descripcion = $data['descripcion'];
        $fecha = $data['fecha'];
        $hora = $data['hora'];
        $res = $this->modeloActividad->update($id, $nombre, $descripcion, $fecha, $hora);
        echo json_encode($res);
    }

    public function deleteActividad($id){
        $res = $this->modeloActividad->delete($id);
        echo json_encode($res);
    }
}