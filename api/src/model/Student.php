<?php
class Student {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function getAll() {
        $stmt = $this->pdo->query("SELECT * FROM personal");
        return $stmt->fetchAll();
    }

    public function getById($id) {
        $stmt = $this->pdo->prepare("SELECT * FROM personal WHERE id_personal = :id");
        $stmt->execute(['id' => $id]);
        return $stmt->fetch();
    }

    public function create($name, $pass) {
		$stmt = $this->pdo->prepare("INSERT INTO usuario (username, hashpass) VALUES (:username, :hashpass)");
        $stmt->execute(['username' => $name, 'hashpass' => md5($pass)]);
    }

    public function update($id, $name, $email) {
        $stmt = $this->pdo->prepare("UPDATE students SET name = :name, email = :email WHERE id = :id");
        $stmt->execute(['id' => $id, 'name' => $name, 'email' => $email]);
    }

    public function delete($id) {
        $stmt = $this->pdo->prepare("DELETE FROM usuario WHERE id = :id");
        $stmt->execute(['id' => $id]);
    }
}

?>
