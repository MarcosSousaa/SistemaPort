<?php

    header('Content-Type: application/json', true);    
    
    $json = json_decode($_POST['item']);
    
    
    if($json->{'acao'} == 0){                
        require_once 'dados.php';
        $dados = new dados();
        $result = $dados->seleciona($json);
        echo json_encode($result);
    }       
    else if($json->{'acao'} == 1){        
        require_once 'dados.php';
        $dados = new dados();
        echo $dados->insere_dados($json);     
    }
     else if($json->{'acao'} == 2){        
        require_once 'dados.php';
        $dados = new dados();        
        $result = $dados->seleciona_id($json);                               
    }
    else if($json->{'acao'} == 3){
        require_once 'dados.php';
        $dados = new dados();
        echo $dados->altera_dados($json);
    }
    else if($json->{'acao'} == 4){
        require_once 'dados.php';
        $dados = new dados();
        echo $dados->deleta_dados($json);
    }
    
    
    
    
 

