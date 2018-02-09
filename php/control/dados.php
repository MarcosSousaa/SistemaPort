<?php
    require_once '../model/datb.php';
    
    class dados {
        public $id;
        public $data;
        public $extrusora;
        public $turno;
        public $operador;
        public $producao;
        public $apara;
        public $refile;
        public $borra;
        public $acabamento;
        public $qtd_parada;
        public $tempo_parada;
        public $oc;
        
        
        public function seleciona($json){            
            $banco = new datb();            
            if($json->{'tipo'} == '01'){
                $query = "SELECT cc_id,cc_data,cc_colab_ret,cc_chave,cc_hr_ret,cc_porteiro,porteiro.po_nome as porteiro1,cc_data_dev,cc_porteiro_dev,p.po_nome as porteiro2,cc_colab_dev,cc_hr_dev,controle_chave.tipo FROM controle_chave INNER JOIN porteiro on (controle_chave.cc_porteiro = porteiro.po_id) LEFT OUTER JOIN porteiro as p  on (controle_chave.cc_porteiro_dev = p.po_id) WHERE cc_data BETWEEN'".$json->{'data1'}."' AND '".$json->{'data2'}."' ORDER BY cc_data,cc_hr_ret;";
                $result = $banco ->sql_query($query);
                $table = "";
                foreach ($result as $row){
                    if($row['cc_data_dev'] == ""){
                        $row['cc_data'] = str_replace("-", "/", $row['cc_data']);
                        $row['cc_data'] = date('d/m/Y', strtotime($row['cc_data'])); 
                        $table .= "<tr><td style='display:none;'>".$row['cc_id']."</td><td>".$row['cc_data']."</td><td>".$row['nome_porteiro']."</td><td>".$row['cc_colab_ret']."</td><td>".$row['cc_chave']."</td><td>".$row['cc_hr_ret']."</td><td>".$row['cc_data_dev']."</td><td>".$row['nome_porteiro_dev']."</td><td>".$row['cc_colab_dev']."</td><td>".$row['cc_hr_dev']."</td>;";
                        $table .= "<td><a class='waves-effect waves-light btn cc_btn-edit'><i class='material-icons center'>edit</i></a></td>";                   
                    }
                    else {
                        $row['cc_data'] = str_replace("-", "/", $row['cc_data']);
                        $row['cc_data'] = date('d/m/Y', strtotime($row['cc_data'])); 
                        $row['cc_data_dev'] = str_replace("-", "/", $row['cc_data_dev']);
                        $row['cc_data_dev'] = date('d/m/Y', strtotime($row['cc_data_dev']));     
                        $table .= "<tr><td style='display:none;'>".$row['cc_id']."</td><td>".$row['cc_data']."</td><td>".$row['nome_porteiro']."</td><td>".$row['cc_colab_ret']."</td><td>".$row['cc_chave']."</td><td>".$row['cc_hr_ret']."</td><td>".$row['cc_data_dev']."</td><td>".$row['nome_porteiro_dev']."</td><td>".$row['cc_colab_dev']."</td><td>".$row['cc_hr_dev']."</td>;";
                        $table .= "<td><a class='waves-effect waves-light btn cc_btn-edit'><i class='material-icons center'>edit</i></a></td>";                   
                    }
                }        
            }
            else if($json->{'tipo'} == '02'){
                $query = "SELECT rs_id,rs_data,rs_hr_ent,rs_hr_sai,rs_emp,rs_mot,rs_rg,rs_pl,rs_flc,rs_porteiro,porteiro.po_nome as porteiro1,rs_obs,rs_anot_sil,recebimento_servico.tipo FROM recebimento_servico INNER JOIN porteiro on rs_porteiro = po_id WHERE rs_data BETWEEN '".$json->{'data1'}."' AND '".$json->{'data2'}."' AND recebimento_servico.tipo = '".$json->{'tipo'}."' order by rs_data,rs_hr_ent;";
                $result = $banco ->sql_query($query);
                $table = "";
                foreach ($result as $row){            
                    $row['rs_data'] = str_replace("-", "/", $row['rs_data']);
                    $row['rs_data'] = date('d/m/Y', strtotime($row['rs_data'])); 
                    $table .= "<tr><td style='display:none;'>".$row['rs_id']."</td><td>".$row['rs_data']."</td><td>".$row['nome_porteiro']."</td><td>".$row['rs_hr_ent']."</td><td>".$row['rs_hr_sai']."</td><td>".$row['rs_emp']."</td><td>".$row['rs_mot']."</td><td>".$row['rs_rg']."</td><td>".$row['rs_pl']."</td><td>".$row['rs_flc']."</td><td>".$row['rs_obs']."</td><td>".$row['rs_anot_sil']."</td>";
                    $table .= "<td><a class='waves-effect waves-light btn rc_btn-edit'><i class='material-icons center'>edit</i></a></td>";                    
                }        
            }
            else if($json->{'tipo'} == '03'){
                $query = "SELECT rs_id,rs_data,rs_hr_ent,rs_hr_sai,rs_emp,rs_mot,rs_rg,rs_pl,rs_flc,rs_porteiro,porteiro.po_nome porteiro1,rs_obs,rs_anot_sil,recebimento_servico.tipo FROM recebimento_servico INNER JOIN porteiro on rs_porteiro = po_id WHERE rs_data BETWEEN '".$json->{'data1'}."' AND '".$json->{'data2'}."' AND recebimento_servico.tipo = '".$json->{'tipo'}."' order by rs_data,rs_hr_ent;";
                $result = $banco ->sql_query($query);
                $table = "";
                foreach ($result as $row){            
                    $row['rs_data'] = str_replace("-", "/", $row['rs_data']);
                    $row['rs_data'] = date('d/m/Y', strtotime($row['rs_data'])); 
                    $table .= "<tr><td style='display:none;'>".$row['rs_id']."</td><td>".$row['rs_data']."</td><td>".$row['nome_porteiro']."</td><td>".$row['rs_hr_ent']."</td><td>".$row['rs_hr_sai']."</td><td>".$row['rs_emp']."</td><td>".$row['rs_mot']."</td><td>".$row['rs_rg']."</td><td>".$row['rs_pl']."</td><td>".$row['rs_flc']."</td><td>".$row['rs_obs']."</td>";
                    $table .= "<td><a class='waves-effect waves-light btn se_btn-edit'><i class='material-icons center'>edit</i></a></td>";                    
                }        
            }
            else {
                $query = "SELECT * FROM porteiro order by po_nome";
                $result = $banco->sql_query($query);
                if($json->{'filtro'} == 1){                    
                    $table = "<option disabled selected>SELECIONE UM PORTEIRO</option><br /><option value='00'>NAO LISTADO</option>";
                    foreach ($result as $row){                    
                        $table .= '<option value="'.$row['po_id'].'">'.$row['po_nome'].'</option>';
                        
                    }
                    $table[0] = $json->{'porteiro1'};
                    $table[1] = $json->{'porteiro2'};
                    $table[2] = $json->{'filtro'};
                }
                else if($json->{'filtro'} == 2){
                    $table = "";
                    foreach($result as $row){
                        $table .= "<tr><td style='display:none;'>".$row['po_id']."</td><td>".$row['po_nome']."</td>";
                        $table .= "<td><a class='waves-effect waves-light btn po_btn-edit'><i class='material-icons center'>edit</i></a></td></tr>";                    
                    }
                }
                else {
                    $table = "<option disabled selected>SELECIONE UM PORTEIRO</option><br /><option value='00'>NAO LISTADO</option>";
                    foreach ($result as $row){                    
                        $table .= '<option value="'.$row['po_id'].'">'.$row['po_nome'].'</option>';
                    }
                }                                
            }
            
            return $table;      
        }      
        public function insere_dados($json){          
            try{
                $banco = new datb();
                date_default_timezone_set('America/Sao_Paulo');
                $date = date('Y-m-d H:i');
                if($json->{'tipo'} == "01"){
                    if(!empty($json->{'cc_porteiro_dev'})){
                        echo $query = "INSERT INTO controle_chave(cc_data,cc_colab_ret,cc_chave,cc_hr_ret,cc_porteiro,cc_data_dev,cc_porteiro_dev,cc_colab_dev,cc_hr_dev,tipo,cc_data_att) VALUES ('".$json->{'data'}."','".$json->{'cc_colab_ret'}."','".$json->{'cc_chave'}."','".$json->{'cc_hr_ret'}."','".$json->{'cc_porteiro'}."','".$json->{'cc_data_dev'}."','".$json->{'cc_porteiro_dev'}."','".$json->{'cc_hr_dev'}."','".$json->{'cc_hr_dev'}."','".$json->{'tipo'}."','".$date."');";                
                    }
                    else {                        
                         $query = "INSERT INTO controle_chave(cc_data,cc_colab_ret,cc_chave,cc_hr_ret,cc_porteiro,cc_colab_dev,cc_hr_dev,tipo,cc_data_att) VALUES ('".$json->{'data'}."','".$json->{'cc_colab_ret'}."','".$json->{'cc_chave'}."','".$json->{'cc_hr_ret'}."','".$json->{'cc_porteiro'}."','".$json->{'cc_colab_dev'}."','".$json->{'cc_hr_dev'}."','".$json->{'tipo'}."','".$date."');";                
                    }                        
                }
                else if(($json->{'tipo'} == "02") || ($json->{'tipo'} == "03")){
                    if($json->{'tipo'} == "02"){
                         $query = "INSERT INTO recebimento_servico(rs_data,rs_hr_ent,rs_hr_sai,rs_emp,rs_mot,rs_rg,rs_pl,rs_flc,rs_porteiro,rs_obs,rs_anot_sil,tipo,rs_data_att) VALUES ('".$json->{'data'}."','".$json->{'rc_hr_ent'}."','".$json->{'rc_hr_sai'}."','".$json->{'rc_emp'}."','".$json->{'rc_mot'}."','".$json->{'rc_rg'}."','".$json->{'rc_pl'}."','".$json->{'rc_flc'}."','".$json->{'rc_porteiro'}."','".$json->{'rc_obs'}."','".$json->{'rc_anot_sil'}."','".$json->{'tipo'}."','".$date."');";
                    }
                    else if($json->{'tipo'} == "03"){
                         $query = "INSERT INTO recebimento_servico(rs_data,rs_hr_ent,rs_hr_sai,rs_emp,rs_mot,rs_rg,rs_pl,rs_flc,rs_porteiro,rs_obs,tipo,rs_data_att) VALUES ('".$json->{'data'}."','".$json->{'se_hr_ent'}."','".$json->{'se_hr_sai'}."','".$json->{'se_emp'}."','".$json->{'se_mot'}."','".$json->{'se_rg'}."','".$json->{'se_pl'}."','".$json->{'se_flc'}."','".$json->{'se_porteiro'}."','".$json->{'se_obs'}."','".$json->{'tipo'}."','".$date."');";
                    }
                }
                else {
                    $query = "INSERT INTO porteiro(po_nome) VALUES('".$json->{'nome'}."');";
                }
            }catch(PDOException $e){
                echo 'ERRO AO CADASTRAR '.$e->getMessage();
            }
            return $banco ->sql_insert($query);            
        }    
        public function seleciona_id($json){
            $banco = new datb();
            if($json->{'tipo'} == '01'){
                $query = "SELECT cc_id,cc_data,cc_colab_ret,cc_chave,cc_hr_ret,cc_porteiro,porteiro.po_nome as porteiro1,cc_data_dev,cc_porteiro_dev,p.po_nome as porteiro2,cc_colab_dev,cc_hr_dev,controle_chave.tipo FROM controle_chave INNER JOIN porteiro on (controle_chave.cc_porteiro = porteiro.po_id) LEFT OUTER JOIN porteiro as p  on (controle_chave.cc_porteiro_dev = p.po_id) where cc_id =".$json->{'id'}.";";
                $result = $banco->sql_query($query);            
                foreach($result as $row){
                    if($row['cc_data_dev'] == ""){
                        $row['cc_data'] = str_replace("-", "/", $row['cc_data']);
                        $row['cc_data'] = date('d/m/Y', strtotime($row['cc_data']));                         
                        echo json_encode($row);
                    }
                    else {
                        $row['cc_data'] = str_replace("-", "/", $row['cc_data']);
                        $row['cc_data'] = date('d/m/Y', strtotime($row['cc_data']));                
                        $row['cc_data_dev'] = str_replace("-", "/", $row['cc_data_dev']);
                        $row['cc_data_dev'] = date('d/m/Y', strtotime($row['cc_data_dev']));                 
                        echo json_encode($row);
                    }                
                }      
            }
            else if($json->{'tipo'} == '02'){
                $query = "SELECT rs_id,rs_data,rs_hr_ent,rs_hr_sai,rs_emp,rs_mot,rs_rg,rs_pl,rs_flc,rs_porteiro,porteiro.po_nome as porteiro1,rs_obs,rs_anot_sil,recebimento_servico.tipo FROM recebimento_servico INNER JOIN porteiro on recebimento_servico.rs_porteiro = porteiro.po_id WHERE rs_id =".$json->{'id'}.";";
                $result = $banco->sql_query($query);            
                foreach($result as $row){
                    $row['rs_data'] = str_replace("-", "/", $row['rs_data']);
                    $row['rs_data'] = date('d/m/Y', strtotime($row['rs_data']));                 
                    echo json_encode($row);
                }
            }
            else if($json->{'tipo'} == '03'){
                $query = "SELECT rs_id,rs_data,rs_hr_ent,rs_hr_sai,rs_emp,rs_mot,rs_rg,rs_pl,rs_flc,rs_porteiro,porteiro.po_nome as porteiro1,rs_obs,recebimento_servico.tipo FROM recebimento_servico INNER JOIN porteiro on recebimento_servico.rs_porteiro = porteiro.po_id WHERE rs_id =".$json->{'id'}.";";
                $result = $banco->sql_query($query);            
                foreach($result as $row){
                    $row['rs_data'] = str_replace("-", "/", $row['rs_data']);
                    $row['rs_data'] = date('d/m/Y', strtotime($row['rs_data']));                 
                    echo json_encode($row);
                }
            
            }
            else{
                $query = "SELECT * FROM porteiro WHERE po_id=".$json->{'id'}.";";
                $result = $banco->sql_query($query);
                foreach($result as $row){
                    echo json_encode($row);
                }
            }
        }    
        
        public function altera_dados($json){
            $banco = new datb();
            date_default_timezone_set('America/Sao_Paulo');
            $date = date('Y-m-d H:i');
              if($json->{'tipo'} == "01"){
                if(!empty($json->{'cc_data_dev'})){
                    $query = "UPDATE controle_chave SET cc_data='".$json->{'data'}."',cc_colab_ret='".$json->{'cc_colab_ret'}."',cc_chave='".$json->{'cc_chave'}."',cc_hr_ret='".$json->{'cc_hr_ret'}."',cc_porteiro='".$json->{'cc_porteiro'}."',cc_data_dev='".$json->{'cc_data_dev'}."',cc_porteiro_dev='".$json->{'cc_porteiro_dev'}."',cc_colab_dev='".$json->{'cc_colab_dev'}."',cc_hr_dev='".$json->{'cc_hr_dev'}."',cc_porteiro_dev='".$json->{'cc_porteiro_dev'}."',tipo='".$json->{'tipo'}."',cc_data_att='".$date."' WHERE cc_id =".$json->{'id'}.";";
                }
                else {                    
                    $query = "UPDATE controle_chave SET cc_data='".$json->{'data'}."',cc_colab_ret='".$json->{'cc_colab_ret'}."',cc_chave='".$json->{'cc_chave'}."',cc_hr_ret='".$json->{'cc_hr_ret'}."',cc_porteiro='".$json->{'cc_porteiro'}."',cc_colab_dev='".$json->{'cc_colab_dev'}."',cc_hr_dev='".$json->{'cc_hr_dev'}."',cc_porteiro_dev='".$json->{'cc_porteiro_dev'}."',tipo='".$json->{'tipo'}."',cc_data_att='".$date."' WHERE cc_id =".$json->{'id'}.";";
                }
            }
            else if(($json->{'tipo'} == "02") || ($json->{'tipo'} == "03")){
                if($json->{'tipo'} == "02"){
                    $query = "UPDATE recebimento_servico SET rs_data='".$json->{'data'}."',rs_hr_ent='".$json->{'rc_hr_ent'}."',rs_hr_sai='".$json->{'rc_hr_sai'}."',rs_emp='".$json->{'rc_emp'}."',rs_mot='".$json->{'rc_mot'}."',rs_rg='".$json->{'rc_rg'}."',rs_pl='".$json->{'rc_pl'}."',rs_flc='".$json->{'rc_flc'}."',rs_porteiro='".$json->{'rc_porteiro'}."',rs_obs='".$json->{'rc_obs'}."',rs_anot_sil='".$json->{'rc_anot_sil'}."',rs_data_att='".$date."' WHERE rs_id =".$json->{'id'}.";";
                }
                else if($json->{'tipo'} == "03"){
                    $query = "UPDATE recebimento_servico SET rs_data='".$json->{'data'}."',rs_hr_ent='".$json->{'se_hr_ent'}."',rs_hr_sai='".$json->{'se_hr_sai'}."',rs_emp='".$json->{'se_emp'}."',rs_mot='".$json->{'se_mot'}."',rs_rg='".$json->{'se_rg'}."',rs_pl='".$json->{'se_pl'}."',rs_flc='".$json->{'se_flc'}."',rs_porteiro='".$json->{'se_porteiro'}."',rs_obs='".$json->{'se_obs'}."',rs_data_att='".$date."' WHERE rs_id =".$json->{'id'}.";";
                }
            }
            else {
                $query = "UPDATE porteiro SET po_nome='".$json->{'nome'}."' where po_id=".$json->{'id'}.";";
            }
            return $banco->sql_insert($query);
        }
        
        public function deleta_dados($json){
            $banco = new datb();
            if($json->{'tipo'} == "01"){
                $query = "DELETE FROM controle_chave WHERE cc_id=".$json->{'id'}.";";
            }else {
                $query = "DELETE FROM recebimento_servico WHERE rs_id=".$json->{'id'}.";";
            }
            return $banco->sql_insert($query);            
        } 
                                 
      
    }


