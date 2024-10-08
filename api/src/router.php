<?php
/**
* Router
*/
header('Content-Type: application/json');
require_once '../src/config/Database2.php';
require_once 'controler/StudentsController.php';
class Router
{
	
	/**
	 * 
	 */
	public $estcontrol;
	public function __construct(){
		global $pdo;
		$this->estcontrol = new StudentController($pdo);
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
	}
}

//only for testing
//new Router();
?>
