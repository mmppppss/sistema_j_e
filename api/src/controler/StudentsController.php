<?php

class StudentController {
    private $studentModel;
	public function __construct($pdo) {

		require_once '../src/model/Student.php'; //porque es el path asi ?
        $this->studentModel = new Student($pdo);
    }

    public function getAll() {
		$students = $this->studentModel->getAll();
		echo json_encode($students);
    }

	public function getStudent($id) {
		$student = $this->studentModel->getById($id);
		echo json_encode($student);
	}

    public function createStudent() {
    	if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $name = $_POST['name'];
            $pass = $_POST['pass'];
			$this->studentModel->create($name, $pass);
		}
        header('Location: /');
    }

    public function editStudent($id) {
		if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
			$data = json_decode(file_get_contents("php://input"), true);
            $name = $data['name'];
            $email = $data['email'];
            $this->studentModel->update($id, $name, $email);
            header('Location: /');
        } else {
            $student = $this->studentModel->getById($id);
        }
    }

    public function deleteStudent($id) {
        $this->studentModel->delete($id);
        header('Location: /');
    }
}

