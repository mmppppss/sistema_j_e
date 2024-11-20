<?php
/**
* Router
*/
header('Content-Type: application/json');
require_once '../src/config/Database2.php';
require_once 'controler/StudentsController.php';
require_once 'controler/Niño.php';
require_once 'controler/Tutor.php';
require_once 'controler/Materia.php';
class Router
{
	
	/**
	 * 
	 */
	public $estcontrol;
	public $niño;
	public $tutor;
	public $materia;
	public function __construct(){
		global $pdo;
		$this->estcontrol = new StudentController($pdo);
		$this->niño = new NiñoControlador($pdo);
		$this->tutor = new TutorControlador($pdo);
		$this->materia = new MateriaControlador($pdo);
		self::Route();
	}
	public function Route(){
		$url = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
		$method = $_SERVER['REQUEST_METHOD'];
		self::enrute($url, $method);
	}
	public function enrute($url, $method){
		$url = trim($url, '/');
		$url = explode('/', $url);
		if($url[0] == 'students'){
			if($method == 'POST'){
				$this->estcontrol->createStudent();
			}
			if(isset($url[1]) && is_numeric($url[1])){
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
						# code...
						break;
				}
			}else{
				$this->estcontrol->getAll();
			}
		}
		switch ($url[0]) {
			case 'ninos':
				switch ($method) {
					case 'GET':
						if(isset($url[1]) && is_numeric($url[1])){
							$this->niño->getNiño($url[1]);
						}else{
							$this->niño->getAll();
						}
						break;
					case 'POST':
						$this->niño->createNiño();
						break;
					case 'PUT':
						if(isset($url[1]) && is_numeric($url[1]))
							$this->niño->editNino($url[1]);
						break;
					case 'DELETE':
						if(isset($url[1]) && is_numeric($url[1]))
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
						if(isset($url[1]) && is_numeric($url[1])){
							$this->tutor->getTutor($url[1]);
						}else{
							$this->tutor->getAll();
						}
						break;
					case 'POST':
						$this->tutor->createTutor();
						break;
					case 'PUT':
						if(isset($url[1]) && is_numeric($url[1]))
							$this->tutor->editTutor($url[1]);
						break;
					case 'DELETE':
						if(isset($url[1]) && is_numeric($url[1]))
							$this->	tutor->deleteTutor($url[1]);
						break;
					default:
						echo json_encode(['error' => 'method not found']);
						break;
				}
				break;
			case 'materia':
				switch ($method) {
					case 'GET':
						if(isset($url[1]) && is_numeric($url[1])){
							$this->materia->getMateria($url[1]);
						}else{
							$this->materia->getAll();
						}
						break;
					case 'POST':
						$this->materia->createMateria();
						break;
					case 'PUT':
						if(isset($url[1]) && is_numeric($url[1]))
							$this->materia->editMateria($url[1]);
						break;
					case 'DELETE':
						if(isset($url[1]) && is_numeric($url[1]))
							$this->materia->deleteMateria($url[1]);
						break;
					default:
						echo json_encode(['error' => 'method not found']);
						break;
				}
				break;

			default:
				# code...
				break;
		}
		
	}
}

//only for testing
//new Router();
?>
