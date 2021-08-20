<?php 

    function convertDateSQLtoHuman($date){
        $result = explode('-',$date);
        return "{$result[2]}/{$result[1]}/{$result[0]}";
    }
    function convertDateHumantoSQL($date){
        $result = explode('/',$date);
        return "{$result[2]}-{$result[1]}-{$result[0]}";
    }
    require_once("connection.php");
    
    $action ='';

    if(isset($_GET['action'])){
       $action = $_GET['action'];
       $connection = newConnection();
    }

    // GET ROUTE
    if($action == 'read'){
        $sql = "SELECT * FROM tasks";
        $result = $connection->query($sql);
        $tasks = [];
        $r = 0;
        while($row = $result->fetch_assoc()){
            $tasks[] = $row;
            $tasks[$r]['finish_date'] = convertDateSQLtoHuman($tasks[$r]['finish_date']);
            $r++;
        }

        $query_result['tasks'] = $tasks;
    }

    // CREATE ROUTE
    if($action == 'create'){
        $task = $_POST['task_name'];
        $finish_date = convertDateHumantoSQL($_POST['finish_date']);
        $sql = "INSERT INTO tasks (task_name, finish_date) VALUES ('$task', '$finish_date')";
        $result = $connection->query($sql);
        
        if($result){
            $query_result['message'] = 'Tarefa adicionada com sucesso.';
        }
        else {
            $query_result['error'] = true;
            $query_result['message'] = 'Falha ao adicionar tarefa, tente novamente.';
        }
    }

    //DELETE ROUTE
    if($action == 'delete'){
        $id = $_POST['id'];

        $sql = "DELETE FROM tasks WHERE id = '$id'";
        $result = $connection->query($sql);
        
        if($result){
            $query_result['message'] = 'Tarefa excluida com sucesso.';
        }
        else {
            $query_result['error'] = true;
            $query_result['message'] = 'Falha ao excluir tarefa, tente novamente.';
        }
    }

    // UPDATE ROUTE
    if($action == 'update'){
        $id = $_POST['id'];
        $task = $_POST['task_name'];
        $finish_date = convertDateHumantoSQL($_POST['finish_date']);
        $sql = "UPDATE tasks SET task_name = '$task', finish_date = '$finish_date' WHERE id = '$id'";
        $result = $connection->query($sql);
        
        if($result){
            $query_result['message'] = 'Tarefa atualizada com sucesso.';
        }
        else {
            $query_result['error'] = true;
            $query_result['message'] = 'Falha ao atualizar tarefa, tente novamente.';
        }
    }

    echo json_encode($query_result);
?>