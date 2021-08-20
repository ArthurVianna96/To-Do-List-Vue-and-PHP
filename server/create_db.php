<?php 
    require_once("connection.php");
    
    $sql = 'CREATE DATABASE IF NOT EXISTS crud_application';

    $connection = newConnection(null);
    $result = $connection->query($sql);

    if($result){
        echo 'db criado!';
    } else {
        echo "Erro: $connection->error";
    }

    $connection->close(); 
?>