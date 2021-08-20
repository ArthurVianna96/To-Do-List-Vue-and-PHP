<?php 
    require_once("connection.php");
    
    $connection = newConnection();

    $sql = 'CREATE TABLE IF NOT EXISTS tasks (
            id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            task_name VARCHAR(100) NOT NULL,
            finish_date DATE
        )';

    $result = $connection->query($sql);

    if($result){
        echo 'Tabela criada com sucesso';
    } else {
        echo 'Erro: '.$connection->error;
    }

    $connection->close();
?>