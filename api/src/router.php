<?php

/**
 * Router
 */
header('Content-Type: application/json');
require_once '../src/config/Database2.php';
require_once 'controler/StudentsController.php';
require_once 'controler/NiñoControlador.php';
require_once 'controler/TutorControlador.php';
require_once 'controler/MateriaControlador.php';
require_once 'controler/UsuarioControlador.php';
require_once 'controler/PersonalControlador.php';
require_once 'controler/MedicoControlador.php';
require_once 'controler/VoluntarioControlador.php';
require_once 'controler/ProfesorControlador.php';
require_once 'controler/AdministradorControlador.php';

class Router
{
    public $estcontrol;
    public $niño;
    public $tutor;
    public $materia;
    public $usuario;
    public $personal;
    public $medico;
    public $voluntario;
    public $profesor;
    public $administrador;

    public function __construct()
    {
        global $pdo;
        $this->estcontrol = new StudentController($pdo);
        $this->niño = new NiñoControlador($pdo);
        $this->tutor = new TutorControlador($pdo);
        $this->materia = new MateriaControlador($pdo);
        $this->usuario = new UsuarioControlador($pdo);
        $this->personal = new PersonalControlador($pdo);
        $this->medico = new MedicoControlador($pdo);
        $this->voluntario = new VoluntarioControlador($pdo);
        $this->profesor = new ProfesorControlador($pdo);
        $this->administrador = new AdministradorControlador($pdo);

        self::Route();
    }

    public function Route()
    {
        $url = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $method = $_SERVER['REQUEST_METHOD'];
        self::enrutar($url, $method);
    }

    public function enrutar($url, $method)
    {
        $url = trim($url, '/');
        $url = explode('/', $url);


        if ($url[0] == 'students') {
            if ($method == 'POST') {
                $this->estcontrol->createStudent();
            }
            if (isset($url[1]) && is_numeric($url[1])) {
                switch ($method) {
                    case 'GET':
                        $this->estcontrol->getStudent($url[1]);
                        break;
                    case 'PUT':
                        $this->estcontrol->editStudent($url[1]);
                        break;
                    case 'DELETE':
                        $this->estcontrol->deleteStudent($url[1]);
                        break;
                    default:
                        break;
                }
            } else {
                $this->estcontrol->getAll();
            }
        }


        switch ($url[0]) {
            case 'ninos':
                switch ($method) {
                    case 'GET':
                        if (isset($url[1]) && is_numeric($url[1])) {
                            $this->niño->getNiño($url[1]);
                        } else {
                            $this->niño->getAll();
                        }
                        break;
                    case 'POST':
                        $this->niño->createNiño();
                        break;
                    case 'PUT':
                        if (isset($url[1]) && is_numeric($url[1]))
                            $this->niño->editNino($url[1]);
                        break;
                    case 'DELETE':
                        if (isset($url[1]) && is_numeric($url[1]))
                            $this->niño->deleteNino($url[1]);
                        break;
                    default:
                        echo json_encode(['error' => 'method not found']);
                        break;
                }
                break;


            case 'tutor':
                switch ($method) {
                    case 'GET':
                        if (isset($url[1]) && is_numeric($url[1])) {
                            $this->tutor->getTutor($url[1]);
                        } else {
                            $this->tutor->getAll();
                        }
                        break;
                    case 'POST':
                        $this->tutor->createTutor();
                        break;
                    case 'PUT':
                        if (isset($url[1]) && is_numeric($url[1]))
                            $this->tutor->editTutor($url[1]);
                        break;
                    case 'DELETE':
                        if (isset($url[1]) && is_numeric($url[1]))
                            $this->tutor->deleteTutor($url[1]);
                        break;
                    default:
                        echo json_encode(['error' => 'method not found']);
                        break;
                }
                break;


            case 'materia':
                switch ($method) {
                    case 'GET':
                        if (isset($url[1]) && is_numeric($url[1])) {
                            $this->materia->getMateria($url[1]);
                        } else {
                            $this->materia->getAll();
                        }
                        break;
                    case 'POST':
                        $this->materia->createMateria();
                        break;
                    case 'PUT':
                        if (isset($url[1]) && is_numeric($url[1]))
                            $this->materia->editMateria($url[1]);
                        break;
                    case 'DELETE':
                        if (isset($url[1]) && is_numeric($url[1]))
                            $this->materia->deleteMateria($url[1]);
                        break;
                    default:
                        echo json_encode(['error' => 'method not found']);
                        break;
                }
                break;


            case 'usuario':
                switch ($method) {
                    case 'GET':
                        if (isset($url[1]) && is_numeric($url[1])) {
                            $this->usuario->getUsuario($url[1]);
                        } else {
                            $this->usuario->getAll();
                        }
                        break;
                    case 'POST':
                        $this->usuario->createUsuario();
                        break;
                    case 'PUT':
                        if (isset($url[1]) && is_numeric($url[1]))
                            $this->usuario->editUsuario($url[1]);
                        break;
                    case 'DELETE':
                        if (isset($url[1]) && is_numeric($url[1]))
                            $this->usuario->deleteUsuario($url[1]);
                        break;
                    default:
                        echo json_encode(['error' => 'method not found']);
                        break;
                }
                break;


            case 'personal':
                switch ($method) {
                    case 'GET':
                        if (isset($url[1]) && is_numeric($url[1])) {
                            $this->personal->getPersonal($url[1]);
                        } else {
                            $this->personal->getAll();
                        }
                        break;
                    case 'POST':
                        $this->personal->createPersonal();
                        break;
                    case 'PUT':
                        if (isset($url[1]) && is_numeric($url[1]))
                            $this->personal->editPersonal($url[1]);
                        break;
                    case 'DELETE':
                        if (isset($url[1]) && is_numeric($url[1]))
                            $this->personal->deletePersonal($url[1]);
                        break;
                    default:
                        echo json_encode(['error' => 'method not found']);
                        break;
                }
                break;


            case 'medico':
                switch ($method) {
                    case 'GET':
                        if (isset($url[1]) && is_numeric($url[1])) {
                            $this->medico->getMedico($url[1]);
                        } else {
                            $this->medico->getAll();
                        }
                        break;
                    case 'POST':
                        $this->medico->createMedico();
                        break;
                    case 'PUT':
                        if (isset($url[1]) && is_numeric($url[1]))
                            $this->medico->editMedico($url[1]);
                        break;
                    case 'DELETE':
                        if (isset($url[1]) && is_numeric($url[1]))
                            $this->medico->deleteMedico($url[1]);
                        break;
                    default:
                        echo json_encode(['error' => 'method not found']);
                        break;
                }
                break;


            case 'voluntario':
                switch ($method) {
                    case 'GET':
                        if (isset($url[1]) && is_numeric($url[1])) {
                            $this->voluntario->getVoluntario($url[1]);
                        } else {
                            $this->voluntario->getAll();
                        }
                        break;
                    case 'POST':
                        $this->voluntario->createVoluntario();
                        break;
                    case 'PUT':
                        if (isset($url[1]) && is_numeric($url[1]))
                            $this->voluntario->editVoluntario($url[1]);
                        break;
                    case 'DELETE':
                        if (isset($url[1]) && is_numeric($url[1]))
                            $this->voluntario->deleteVoluntario($url[1]);
                        break;
                    default:
                        echo json_encode(['error' => 'method not found']);
                        break;
                }
                break;


            case 'profesor':
                switch ($method) {
                    case 'GET':
                        if (isset($url[1]) && is_numeric($url[1])) {
                            $this->profesor->getProfesor($url[1]);
                        } else {
                            $this->profesor->getAll();
                        }
                        break;
                    case 'POST':
                        $this->profesor->createProfesor();
                        break;
                    case 'PUT':
                        if (isset($url[1]) && is_numeric($url[1]))
                            $this->profesor->editProfesor($url[1]);
                        break;
                    case 'DELETE':
                        if (isset($url[1]) && is_numeric($url[1]))
                            $this->profesor->deleteProfesor($url[1]);
                        break;
                    default:
                        echo json_encode(['error' => 'method not found']);
                        break;
                }
                break;


            case 'administrador':
                switch ($method) {
                    case 'GET':
                        if (isset($url[1]) && is_numeric($url[1])) {
                            $this->administrador->getAdministrador($url[1]);
                        } else {
                            $this->administrador->getAll();
                        }
                        break;
                    case 'POST':
                        $this->administrador->createAdministrador();
                        break;
                    case 'PUT':
                        if (isset($url[1]) && is_numeric($url[1]))
                            $this->administrador->editAdministrador($url[1]);
                        break;
                    case 'DELETE':
                        if (isset($url[1]) && is_numeric($url[1]))
                            $this->administrador->deleteAdministrador($url[1]);
                        break;
                    default:
                        echo json_encode(['error' => 'method not found']);
                        break;
                }
                break;

            default:
                echo json_encode(['error' => 'Recurso no encontrado']);
                break;
        }
    }
}

// Solo para pruebas
// new Router();
