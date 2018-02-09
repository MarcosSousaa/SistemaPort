<?php

class datb{
    // INFO DO BD HOMOLOGACAO
    private $host = "localhost";
    private $usr = "root";
    private $pass = "admin";
    private $dbase = "portaria";

    // INFO DO BD PRODUCAO    
    //private $host = "192.168.1.15";
    //private $usr = "root";
    //private $pass = "B@nd@)!@";
    //private $dbase = "portaria";
    
    // ATRIBUTOS USADOS
    private $query;
    private $link;
    private $resultado;
    
    
    function MySql(){
        
    }
    // FUNÇÃO CONECTAR
    function  conecta(){
        $this->link = @mysqli_connect($this->host,$this->usr,  $this->pass);
        if(!$this->link){
            // Caso ocorra um erro, exibe uma mensagem com o erro
            print "Ocorreu um Erro na conexão MySQL:";
            print "<b>".  mysqli_error()."</b>";
            die();
        }elseif(!mysqli_select_db($this->link, $this->dbase)){
            // Seleciona o banco após a conexão
            // Caso ocorra um erro, exibe uma mensagem com o erro
            print "Ocorreu um Erro em selecionar o Banco:";
            print "<b>".mysqli_error()."</b>";
            die();
        }
    }
    
    //METODO DESCONECTAR
    function desconecta(){
        mysqli_close($this->link);
    }
    
    // METODO SELECIONAR DADOS
    function sql_query($query){
        $this->conecta();
        $this->query = mysqli_query($this->link,$query);                       
        while($this->resultado = mysqli_fetch_array($this->query)){
            if($this->resultado['tipo'] == '01'){
                // Escreve na pagina o retorno para cada registro trazido pela query
                $return[] = array(
                    'cc_id'=>$this->resultado['cc_id'],
                    'cc_data'=>$this->resultado['cc_data'],
                    'cc_colab_ret'=>$this->resultado['cc_colab_ret'],
                    'cc_chave'=>$this->resultado['cc_chave'],
                    'cc_hr_ret'=>$this->resultado['cc_hr_ret'],
                    'cc_porteiro'=>$this->resultado['cc_porteiro'],
                    'nome_porteiro'=>$this->resultado['porteiro1'],
                    'cc_data_dev'=>$this->resultado['cc_data_dev'],
                    'cc_porteiro_dev'=>$this->resultado['cc_porteiro_dev'],
                    'nome_porteiro_dev'=>$this->resultado['porteiro2'],
                    'cc_colab_dev'=>$this->resultado['cc_colab_dev'],
                    'cc_hr_dev'=>$this->resultado['cc_hr_dev'],                    
                    'tipo'=>$this->resultado['tipo'],
                );
            }        
            else if($this->resultado['tipo'] == '02'){                
                // Escreve na pagina o retorno para cada registro trazido pela query
                $return[] = array(
                    'rs_id'=>$this->resultado['rs_id'],
                    'rs_data'=>$this->resultado['rs_data'],
                    'rs_hr_ent'=>$this->resultado['rs_hr_ent'],
                    'rs_hr_sai'=>$this->resultado['rs_hr_sai'],
                    'rs_emp'=>$this->resultado['rs_emp'],
                    'rs_mot'=>$this->resultado['rs_mot'],
                    'rs_rg'=>$this->resultado['rs_rg'],
                    'rs_pl'=>$this->resultado['rs_pl'],
                    'rs_flc'=>$this->resultado['rs_flc'],
                    'rs_porteiro'=>$this->resultado['rs_porteiro'],
                    'nome_porteiro'=>$this->resultado['porteiro1'],
                    'rs_obs'=>$this->resultado['rs_obs'],
                    'rs_anot_sil'=>$this->resultado['rs_anot_sil'],
                    'tipo'=>$this->resultado['tipo'],
                );                
            }
            else if($this->resultado{'tipo'} == '03'){            
                // Escreve na pagina o retorno para cada registro trazido pela query
                $return[] = array(
                    'rs_id'=>$this->resultado['rs_id'],
                    'rs_data'=>$this->resultado['rs_data'],
                    'rs_hr_ent'=>$this->resultado['rs_hr_ent'],
                    'rs_hr_sai'=>$this->resultado['rs_hr_sai'],
                    'rs_emp'=>$this->resultado['rs_emp'],
                    'rs_mot'=>$this->resultado['rs_mot'],
                    'rs_rg'=>$this->resultado['rs_rg'],
                    'rs_pl'=>$this->resultado['rs_pl'],
                    'rs_flc'=>$this->resultado['rs_flc'],
                    'rs_porteiro'=>$this->resultado['rs_porteiro'], 
                    'nome_porteiro'=>$this->resultado['porteiro1'],
                    'rs_obs'=>$this->resultado['rs_flc'],
                    'tipo'=>$this->resultado['tipo'],                    
                );        
            }
            else {
                $return [] = array(
                    'po_id'=>$this->resultado['po_id'],
                    'po_nome'=>$this->resultado['po_nome'],
                );
            }
        }
       $this->desconecta();
       return $return;       
    }   
    // INSERIR DADOS
    public function sql_insert($query){
        $this->conecta();
        $this->query = $query;
        if($this->resultado = mysqli_query($this->link,$this->query)){                    
            $this->desconecta();            
            return true;            
        }
        else {           
            $this->desconecta();
            return false;
        }
    }
}

