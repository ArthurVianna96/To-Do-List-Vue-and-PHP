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

    // GET MARKED TASKS ROUTE
    if($action == 'getmarked'){
        $sql = "SELECT * FROM tasks WHERE finished = true";
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

    // GET UNMARKED TASKS ROUTE
    if($action == 'getunmarked'){
        $sql = "SELECT * FROM tasks WHERE finished = false";
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
        $finished = 0;
        $sql = "INSERT INTO tasks (task_name, finish_date, finished) VALUES ('$task', '$finish_date', $finished)";
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

    // MARK TASK ROUTE
    if($action == 'mark'){
        $id = $_POST['id'];
        $finished = 1;
        $sql = "UPDATE tasks SET finished = $finished WHERE id = '$id'";
        $result = $connection->query($sql);
        
        if($result){
            $query_result['message'] = 'Tarefa marcada como finalizada.';
        }
        else {
            $query_result['error'] = true;
            $query_result['message'] = 'Falha ao marcar tarefa, tente novamente.';
        }
    }

    // UNMARK TASK ROUTE
    if($action == 'unmark'){
        $id = $_POST['id'];
        $finished = 0;
        $sql = "UPDATE tasks SET finished = $finished WHERE id = '$id'";
        $result = $connection->query($sql);
        
        if($result){
            $query_result['message'] = 'Tarefa desmarcada com sucesso.';
        }
        else {
            $query_result['error'] = true;
            $query_result['message'] = 'Falha ao desmarcar tarefa, tente novamente.';
        }
    }

    echo json_encode($query_result);
?>