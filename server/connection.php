<?php 
    function newConnection($db = 'crud_application', $port= 3307, $user = 'root', $password = 'root'){
        $server = '127.0.0.1:'. $port;

        $connection = new mysqli($server, $user, $password, $db);

        if($connection->connect_error){
            die('Erro: '. $connection->connect_error);
        }

        return $connection;

    }
?>