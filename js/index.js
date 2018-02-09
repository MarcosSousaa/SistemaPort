/* global Materialize */

$(document).ready(function(){
    // CRIA CALENDARIO
    $('.datepicker').pickadate({
        monthsFull: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        weekdaysFull: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
        weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        today: 'Hoje',
        clear: 'Limpar',
        close: 'Pronto',
        labelMonthNext: 'Proximo mes',
        labelMonthPrev: 'Mes anterior',
        labelMonthSelect: 'Selecione um mes',
        labelYearSelect: 'Selecione um ano',
        selectMonths: true, 
        selectYears: 15, 
        // Formato da data que aparece no input
        format: 'dd/mm/yyyy'
    });   
    
    
    //ESCONDENDO AS DIV 
    $('#produto').hide();
    $('#alter-produto').hide();   
    $('#container').hide();
    $('.foto-voltar').hide();
    $('#geral-table').hide();
    $('#atualizar').hide();    
    $('#dashboard').hide();   
    $('#cad_porteiro').hide();
   
 // =========================================================================================
// 
// MASCARAS
    // MASCARAS
    $('#data').mask('99/99/9999');
    $('#data1').mask('99/99/9999');
    $('#data2').mask('99/99/9999');
    $('#cc_data_ret').mask('99/99/9999');   
    $('#cc_hr_ret').mask('99:99');
    $('#cc_data_dev').mask('99/99/9999');
    $('#cc_hr_dev').mask('99:99');
    $('#rc_hr_ent').mask('99:99');
    $('#rc_hr_sai').mask('99:99');
    $('#rc_pl').mask('aaa-9999');
    $('#rc_rg').mask('99.999.999-9');
    $('#se_hr_ent').mask('99:99');
    $('#se_hr_sai').mask('99:99');
    $('#se_pl').mask('aaa-9999');
    $('#se_rg').mask('99.999.999-9');
    // INICIALIZANDO SELECT
    $('select').material_select(); 
    
    // ======================================================================================   
    
// =================================================================================================    
// 
// 
// FUNÇÕES CLICK
    
    // ABRE A DIV PRODUTO(TELA PARA INSERIR DADOS E ESCONDE TUDO)
    $(".produt").click(function(){        
        $('#produto').show("slide");
        $('.foto-voltar').show();
        $('#estatisticas').hide("slide");
        $('.estatic').hide("slide");
        $('.alter-produt').hide("slide");
        $('#alter-produto').hide("slide");
        $('#container').hide("slide");
        $('#controle-chave').hide();
        $('#recebimento').hide();
        $('#servico').hide();
        $('#cad_porteiro').hide();
        var data = new Date();
        var dataFormatada = ("0" + data.getDate()).substr(-2) + "/" + ("0" + (data.getMonth() + 1)).substr(-2) + "/" + data.getFullYear();     
        $('#data').val(dataFormatada);
        $('#data').select();                               
    });    
    
    // ESCOLHE O TIPO A SER CADASTRADO E ABRE A DETERMINADA ABA
    $('#tipo').change(function(){
       var x = $('#tipo').val() ;
        if(x == '01'){
            $('#controle-chave').show();
            $('#recebimento').hide();
            $('#servico').hide();           
            $('#cc_porteiro').prop('selectedIndex', 0);
            $('#cc_porteiro').material_select();            
            $('#cc_atualizar').hide();
            $('#cc_inserir').hide();
            $('.cc_name').hide();
            var obj = new Object();
            obj.acao = 0;
            obj.tipo = 0;
            obj.filtro = 0;
            var obj = JSON.stringify(obj);            
            seleciona_porteiro(obj);
        }
        else if(x == '02'){
            $('#recebimento').show();
            $('#controle-chave').hide();
            $('#servico').hide();
            $('#rc_porteiro').prop('selectedIndex', 0);
            $('#rc_porteiro').material_select();            
            $('#rc_atualizar').hide();
            $('#rc_inserir').hide();
            $('.rc_name').hide();
            var obj = new Object();
            obj.acao = 0;
            obj.tipo = 0;
            obj.filtro = 0;
            var obj = JSON.stringify(obj);            
            seleciona_porteiro(obj);                                         
        }
        else if(x == '03'){
            $('#servico').show();
            $('#controle-chave').hide();
            $('#recebimento').hide();
            $('#se_porteiro').prop('selectedIndex', 0);
            $('#se_porteiro').material_select();            
            $('#se_atualizar').hide();
            $('#se_inserir').hide();
            $('.se_name').hide();
            var obj = new Object();
            obj.acao = 0;
            obj.tipo = 0;
            obj.filtro = 0;
            var obj = JSON.stringify(obj);            
            seleciona_porteiro(obj);                 
           
           
        }
    });
    
    $('#cc_porteiro').change(function(){
        var x = $('#cc_porteiro').val();
        if(x == '00'){
            $("#produto").fadeOut(function(){                
                $("#cad_porteiro").fadeIn();
                $("#cad_atualizar").hide();
            });
        }
        else {
            $('.cc_name').show();
            $('.dev').hide();
            $('#cc_colab_ret').val("");
            $('#cc_chave').val("");
            $('#cc_hr_ret').val("");
            $('#cc_inserir').show();
            
           
        }
    });
    
    $('#rc_porteiro').change(function(){
        var x = $('#rc_porteiro').val();
        if(x == '00'){
            $("#produto").fadeOut(function(){                
                $("#cad_porteiro").fadeIn();
                $("#cad_atualizar").hide();
            });
        }
        else {
            $('.rc_name').show();
            $('#rc_inserir').show();
            $('#rc_hr_ent').val("");
            $('#rc_hr_sai').val("");
            $('#rc_emp').val("");
            $('#rc_mot').val("");
            $('#rc_rg').val("");
            $('#rc_pl').val("");
            $('#rc_flc').val("");            
            $('#rc_obs').val("");
            $('#rc_anot_sil').val("");            
        }
    });
    
     $('#se_porteiro').change(function(){
        var x = $('#se_porteiro').val();
        if(x == '00'){
            $("#produto").fadeOut(function(){                
                $("#cad_porteiro").fadeIn();
                $("#cad_atualizar").hide();
            });
        }
        else {
            $('.se_name').show();
            $('#se_inserir').show();
            $('#se_hr_ent').val("");
            $('#se_hr_sai').val("");
            $('#se_emp').val("");
            $('#se_mot').val("");
            $('#se_rg').val("");
            $('#se_pl').val("");
            $('#se_flc').val("");                
            $('#se_obs').val("");
            $('#se_atualizar').hide();           
        }
    });
 
    // CHAMANDO A DIV CONTAINER (ALTER-PRODUT)COM A IMG SAIR E ESCONDENDO A PRODUTOS E ESTATISTICAS
    $(".alter-produt").click(function(){
        $('#container').show("slide");
        $('.foto-voltar').show();
        $('#alter-produto').show();
        $('#estatisticas').hide("slide");
        $('.estatic').hide("slide");
        $('#produto').hide("slide");
        $('.produt').hide("slide");
        $('#tabela').empty();
        $('#p_controle-chave').hide();
        $('#p_recebimento').hide();
        $('#p_servico').hide();
        $('#p_botao-alterar').hide();
        $('#p_porteiro').hide();
        $('#p_filtro').hide();
        $('.alter-date').hide();
        
    });
    
        
    // ESCOLHE O TIPO A SER PESQUISADO E ABRE A DETERMINADA ABA
    $('#p_tipo').change(function(){
       var x = $('#p_tipo').val() ;
        if(x == '01'){                                    
            $('#p_controle-chave').show();
            $('#p_recebimento').hide();
            $('#p_porteiro').hide();
            $('#p_servico').hide();            
            var data1 = new Date();
            var dataFormatada1 = ("0" + data1.getDate()).substr(-2) + "/" + ("0" + (data1.getMonth() + 1)).substr(-2) + "/" + data1.getFullYear();     
            var newdata1 = dataFormatada1.split("/").reverse().join("-");
            var data2 = new Date();
            var dataFormatada2 = ("0" + data2.getDate()).substr(-2) + "/" + ("0" + (data2.getMonth() + 1)).substr(-2) + "/" + data2.getFullYear();     
            var newdata2 = dataFormatada2.split("/").reverse().join("-");
            var obj = new Object();        
            obj.acao = 0;        
            obj.tipo = $('#p_tipo').val();        
            obj.data1 = newdata1;
            obj.data2 = newdata2;
            obj = JSON.stringify(obj);            
            seleciona(obj);         
        }
        else if(x == '02'){
            $('#p_recebimento').show();
            $('#p_controle-chave').hide();
            $('#p_porteiro').hide();
            $('#p_servico').hide();
            var data1 = new Date();
            var dataFormatada1 = ("0" + data1.getDate()).substr(-2) + "/" + ("0" + (data1.getMonth() + 1)).substr(-2) + "/" + data1.getFullYear();     
            var newdata1 = dataFormatada1.split("/").reverse().join("-");
            var data2 = new Date();
            var dataFormatada2 = ("0" + data2.getDate()).substr(-2) + "/" + ("0" + (data2.getMonth() + 1)).substr(-2) + "/" + data2.getFullYear();     
            var newdata2 = dataFormatada2.split("/").reverse().join("-");
            var obj = new Object();        
            obj.acao = 0;        
            obj.tipo = $('#p_tipo').val();        
            obj.data1 = newdata1;
            obj.data2 = newdata2;
            obj = JSON.stringify(obj);            
            seleciona(obj);         
        }
        else if(x == '03'){
           $('#p_servico').show();
           $('#p_controle-chave').hide();
           $('#p_recebimento').hide();
           $('#p_porteiro').hide();
            var data1 = new Date();
            var dataFormatada1 = ("0" + data1.getDate()).substr(-2) + "/" + ("0" + (data1.getMonth() + 1)).substr(-2) + "/" + data1.getFullYear();     
            var newdata1 = dataFormatada1.split("/").reverse().join("-");
            var data2 = new Date();
            var dataFormatada2 = ("0" + data2.getDate()).substr(-2) + "/" + ("0" + (data2.getMonth() + 1)).substr(-2) + "/" + data2.getFullYear();     
            var newdata2 = dataFormatada2.split("/").reverse().join("-");
            var obj = new Object();        
            obj.acao = 0;        
            obj.tipo = $('#p_tipo').val();        
            obj.data1 = newdata1;
            obj.data2 = newdata2;
            obj = JSON.stringify(obj);            
            seleciona(obj);         
        }
        else if(x == '04') {
            $('#p_porteiro').show();
            $('#p_controle-chave').hide();
            $('#p_recebimento').hide();
            $('#p_servico').hide();
            var obj = new Object();        
            obj.acao = 0;        
            obj.tipo = $('#p_tipo').val();
            obj.filtro = 2;            
            obj = JSON.stringify(obj);            
            seleciona(obj);         
        }
    });   
    // FUNÇÃO VOLTANDO PARA A SECTION LIMPA E ESCONDENDO AS IMG SAIR    
    $('.foto-voltar').click(function(){
        $('#right-conteudo').show("slide");
        $('#produto').hide("slide");
        $('.foto-voltar').hide();
        location.reload();
    });   
    

//
//    
// FUNCOES BD(AJAX)
    
    // INSERIR DADOS 1 ( CONTROLE DE CHAVES
    $("#cc_inserir").click(function() {
        // VALIDAÇÃO
        var valid = true;        
        if($("#data").val().length <= 2){
            $("#data").focus();
            Materialize.toast('Você Precisa Informar a Data', 4000);
            valid = false;
        }
        
        if($("#cc_colab_ret").val().length <= 2){
            $("#cc_colab_ret").focus();
            Materialize.toast('Você precisa informar o Nome do Colaborador', 4000);
            valid = false;
        }
        if($("#cc_chave").val().length <= 2){
            $("#cc_chave").focus();
            Materialize.toast('Você precisa informar a chave retirada', 4000);
            valid = false;
        }
                
        if($("#cc_hr_ret").val().length <= 2){
            $("#cc_colab_ret").focus();
            Materialize.toast('Você precisa informar a hora retirada', 4000);
            valid = false;
        }                
        var data = $('#data').val();
        var data2 = $('#cc_data_dev').val();
        var newdata2 = data2.split("/").reverse().join("-");                
        var newdata = data.split("/").reverse().join("-");                        
        if(valid){            
            var obj = new Object();
            obj.acao = 1;
            obj.tipo = $("#tipo").val();
            obj.data = newdata;           
            obj.cc_colab_ret = $("#cc_colab_ret").val().toUpperCase();            
            obj.cc_chave = $("#cc_chave").val().toUpperCase();            
            obj.cc_hr_ret = $("#cc_hr_ret").val();            
            obj.cc_porteiro = $("#cc_porteiro").val();            
            obj.cc_data_dev = newdata2;  
            obj.cc_porteiro_dev = $("#cc_porteiro_dev").val();
            obj.cc_colab_dev = $("#cc_colab_dev").val().toUpperCase();            
            obj.cc_hr_dev = $("#cc_hr_dev").val();                  
            var obj = JSON.stringify(obj);            
            cadastra(obj);
            
        }
    });
    // INSERIR DADOS 2 (RECEBIMENTO-COLETA)    
    $("#rc_inserir").click(function() {
        // VALIDAÇÃO
        var valid = true;        
        if($("#data").val().length <= 2){
            $("#data").focus();
            Materialize.toast('Você Precisa Informar a Data', 4000);
            valid = false;
        }
        
        if($("#rc_hr_ent").val().length <= 2){
            $("#rc_hr_ent").focus();
            Materialize.toast('Você precisa informar o horario de entrada', 4000);
            valid = false;
        }
        if($("#rc_emp").val().length <= 2){
            $("#rc_emp").focus();
            Materialize.toast('Você precisa informar o nome da empresa', 4000);
            valid = false;
        }
             if($("#rc_mot").val().length <= 2){
            $("#rc_mot").focus();
            Materialize.toast('Você precisa informar o nome do motorista', 4000);
            valid = false;
        }
        if($("#rc_rg").val().length <= 2){
            $("#rc_rg").focus();
            Materialize.toast('Você precisa informar o RG do motorista', 4000);
            valid = false;
        }
        if($("#rc_flc").val().length <= 2){
            $("#rc_flc").focus();
            Materialize.toast('Informe com quem ele irá falar', 4000);
            valid = false;
        }
        
        var data = $('#data').val();
        var newdata = data.split("/").reverse().join("-");        
        if(valid){            
            var obj = new Object();
            obj.acao = 1;
            obj.tipo = $("#tipo").val();            
            obj.data = newdata;           
            obj.rc_hr_ent = $("#rc_hr_ent").val();            
            obj.rc_hr_sai = $("#rc_hr_sai").val();            
            obj.rc_emp = $("#rc_emp").val().toUpperCase();            
            obj.rc_mot = $("#rc_mot").val().toUpperCase();            
            obj.rc_rg = $("#rc_rg").val();            
            obj.rc_pl = $("#rc_pl").val();            
            obj.rc_flc = $("#rc_flc").val();
            obj.rc_porteiro = $("#rc_porteiro").val();
            obj.rc_obs = $("#rc_obs").val().toUpperCase();            
            obj.rc_anot_sil = $("#rc_anot_sil").val().toUpperCase();            
            var obj = JSON.stringify(obj);
            cadastra(obj);
            
        }
    });
    // INSERIR DADOS 3 (SERVICO)
    $("#se_inserir").click(function() {
        // VALIDAÇÃO
        var valid = true;        
        if($("#data").val().length <= 2){
            $("#data").focus();
            Materialize.toast('Você Precisa Informar a Data', 4000);
            valid = false;
        }
        
        if($("#se_hr_ent").val().length <= 2){
            $("#se_hr_ent").focus();
            Materialize.toast('Você precisa informar o horario de entrada', 4000);
            valid = false;
        }
        if($("#se_emp").val().length <= 2){
            $("#se_emp").focus();
            Materialize.toast('Você precisa informar o nome da empresa', 4000);
            valid = false;
        }
             if($("#se_mot").val().length <= 2){
            $("#se_mot").focus();
            Materialize.toast('Você precisa informar o nome do motorista', 4000);
            valid = false;
        }
        if(!$("#se_porteiro").val()){
            $("#se_porteiro").focus();
            Materialize.toast('Você precisa informar o Porteiro', 4000);
            valid = false;
        }
        var data = $('#data').val();
        var newdata = data.split("/").reverse().join("-");        
        if(valid){            
            var obj = new Object();
            obj.acao = 1;
            obj.tipo = $("#tipo").val();            
            obj.data = newdata;           
            obj.se_hr_ent = $("#se_hr_ent").val();            
            obj.se_hr_sai = $("#se_hr_sai").val();            
            obj.se_emp = $("#se_emp").val().toUpperCase();            
            obj.se_mot = $("#se_mot").val().toUpperCase();            
            obj.se_rg = $("#se_rg").val();            
            obj.se_pl = $("#se_pl").val();            
            obj.se_flc = $("#se_flc").val().toUpperCase();
            obj.se_porteiro = $("#se_porteiro").val();
            obj.se_obs = $("#se_obs").val().toUpperCase();                        
            var obj = JSON.stringify(obj);
            cadastra(obj);
            
        
        }
    });
    
    $('#cad_inserir').click(function(){        
        var valid = true;
        if($("#porteiroName").val().length <= 2){
            $("#porteiroName").focus();
            Materialize.toast('Você Precisa Informar o nome do porteiro', 4000);
            valid = false;
        }
        if(valid){
            var obj = new Object();
            obj.acao = 1;           
            obj.tipo = "00";
            obj.nome = $("#porteiroName").val().toUpperCase();            
            var obj = JSON.stringify(obj);
            cadastra(obj);
        }
    });
    
    $('#cc_atualizar').click(function(){
        // VALIDAÇÃO
        var valid = true;        
        if($("#data").val().length <= 2){
            $("#data").focus();
            Materialize.toast('Você Precisa Informar a Data', 4000);
            valid = false;
        }
        
        if($("#cc_colab_ret").val().length <= 2){
            $("#cc_colab_ret").focus();
            Materialize.toast('Você precisa informar o Nome do Colaborador', 4000);
            valid = false;
        }
        if($("#cc_chave").val().length <= 2){
            $("#cc_chave").focus();
            Materialize.toast('Você precisa informar a chave retirada', 4000);
            valid = false;
        }
                
        if($("#cc_hr_ret").val().length <= 2){
            $("#cc_colab_ret").focus();
            Materialize.toast('Você precisa informar a hora retirada', 4000);
            valid = false;
        }                        
        var data = $('#data').val();
        var data2 = $('#cc_data_dev').val();
        var newdata2 = data2.split("/").reverse().join("-");                
        var newdata = data.split("/").reverse().join("-");                        
        if(valid){            
            var obj = new Object();
            obj.acao = 3;           
            obj.id = $("#cc_id").val();
            obj.tipo = $("#tipo").val();
            obj.data = newdata;           
            obj.cc_colab_ret = $("#cc_colab_ret").val().toUpperCase();            
            obj.cc_chave = $("#cc_chave").val().toUpperCase();            
            obj.cc_hr_ret = $("#cc_hr_ret").val();            
            obj.cc_porteiro = $("#cc_porteiro").val();            
            obj.cc_data_dev = newdata2;     
            obj.cc_porteiro_dev = $("#cc_porteiro_dev").val();
            obj.cc_colab_dev = $("#cc_colab_dev").val().toUpperCase();            
            obj.cc_hr_dev = $("#cc_hr_dev").val();            
            obj.cc_porteiro_dev = $("#cc_porteiro_dev").val();                 
            var obj = JSON.stringify(obj);            
            edita(obj);
            
        }
   });
   
       $('#rc_atualizar').click(function(){
         // VALIDAÇÃO
        var valid = true;        
        if($("#data").val().length <= 2){
            $("#data").focus();
            Materialize.toast('Você Precisa Informar a Data', 4000);
            valid = false;
        }
        
        if($("#rc_hr_ent").val().length <= 2){
            $("#rc_hr_ent").focus();
            Materialize.toast('Você precisa informar o horario de entrada', 4000);
            valid = false;
        }
        if($("#rc_emp").val().length <= 2){
            $("#rc_emp").focus();
            Materialize.toast('Você precisa informar o nome da empresa', 4000);
            valid = false;
        }
             if($("#rc_mot").val().length <= 2){
            $("#rc_mot").focus();
            Materialize.toast('Você precisa informar o nome do motorista', 4000);
            valid = false;
        }
        if($("#rc_rg").val().length <= 2){
            $("#rc_rg").focus();
            Materialize.toast('Você precisa informar o RG do motorista', 4000);
            valid = false;
        }
        if(!$("#rc_porteiro").val()){
            $("#rc_porteiro").focus();
            Materialize.toast('Você precisa informar o Porteiro', 4000);
            valid = false;
        }
        if($("#rc_flc").val().length <= 2){
            $("#rc_flc").focus();
            Materialize.toast('Informe com quem ele irá falar', 4000);
            valid = false;
        }
        if($("#rc_obs").val().length <= 2){
            $("#rc_obs").focus();
            Materialize.toast('Você precisa informar a observacao', 4000);
            valid = false;
        }
        
        var data = $('#data').val();
        var newdata = data.split("/").reverse().join("-");        
        if(valid){            
            var obj = new Object();
            obj.acao = 3;
            obj.id = $("#rc_id").val();
            obj.tipo = $("#tipo").val();            
            obj.data = newdata;           
            obj.rc_hr_ent = $("#rc_hr_ent").val();            
            obj.rc_hr_sai = $("#rc_hr_sai").val();            
            obj.rc_emp = $("#rc_emp").val().toUpperCase();            
            obj.rc_mot = $("#rc_mot").val().toUpperCase();            
            obj.rc_rg = $("#rc_rg").val();            
            obj.rc_pl = $("#rc_pl").val();            
            obj.rc_flc = $("#rc_flc").val().toUpperCase();
            obj.rc_porteiro = $("#rc_porteiro").val();
            obj.rc_obs = $("#rc_obs").val().toUpperCase();            
            obj.rc_anot_sil = $("#rc_anot_sil").val().toUpperCase();            
            var obj = JSON.stringify(obj);
            edita(obj);
            
        }
   });
   
       $('#se_atualizar').click(function(){
                // VALIDAÇÃO
        // VALIDAÇÃO
        var valid = true;        
        if($("#data").val().length <= 2){
            $("#data").focus();
            Materialize.toast('Você Precisa Informar a Data', 4000);
            valid = false;
        }
        
        if($("#se_hr_ent").val().length <= 2){
            $("#se_hr_ent").focus();
            Materialize.toast('Você precisa informar o horario de entrada', 4000);
            valid = false;
        }
        if($("#se_emp").val().length <= 2){
            $("#se_emp").focus();
            Materialize.toast('Você precisa informar o nome da empresa', 4000);
            valid = false;
        }
             if($("#se_mot").val().length <= 2){
            $("#se_mot").focus();
            Materialize.toast('Você precisa informar o nome do motorista', 4000);
            valid = false;
        }  
        if(!$("#se_porteiro").val()){
            $("#se_porteiro").focus();
            Materialize.toast('Você precisa informar o Porteiro', 4000);
            valid = false;
        }
        
        var data = $('#data').val();
        var newdata = data.split("/").reverse().join("-");        
        if(valid){            
            var obj = new Object();
            obj.acao = 3;
            obj.id = $("#se_id").val();
            obj.tipo = $("#tipo").val();            
            obj.data = newdata;           
            obj.se_hr_ent = $("#se_hr_ent").val();            
            obj.se_hr_sai = $("#se_hr_sai").val();            
            obj.se_emp = $("#se_emp").val().toUpperCase();            
            obj.se_mot = $("#se_mot").val().toUpperCase();            
            obj.se_rg = $("#se_rg").val();            
            obj.se_pl = $("#se_pl").val();            
            obj.se_flc = $("#se_flc").val().toUpperCase();
            obj.se_porteiro = $("#se_porteiro").val();
            obj.se_obs = $("#se_obs").val().toUpperCase();                        
            var obj = JSON.stringify(obj);
            edita(obj);
            
        
        }
   });
   
    $('#cad_atualizar').click(function(){        
        // VALIDAÇÃO
        var valid = true;        
        if($("#porteiroName").val().length <= 2){
            $("#data").focus();
            Materialize.toast('Você Precisa Informar o nome do porteiro',4000);
            valid = false;
        }                
        if(valid){            
            var obj = new Object();
            obj.acao = 3;
            obj.tipo = 4;
            obj.id = $("#po_id").val();            
            obj.nome = $("#porteiroName").val().toUpperCase();                                    
            var obj = JSON.stringify(obj);
            edita(obj);
            
        
        }
   });
    
    // FUNÇÃO PARA CADASTRAR    
    function cadastra(item){
        $.ajax({
            method: "POST",
            data: {item: item},
            url: "php/control/controller.php",
            dataType: 'json'                        
        }).done(function (result) {            
            if(result){                                
                $(".foto-voltar").trigger("click");            
                Materialize.toast("Registro Inserido com Sucesso", 40000);
            }else{
                Materialize.toast("Erro ao inserir registro", 4000);
            }
            
        }).fail(function (msg){                        
            $("html").html(msg.responseText);
        });
    }
    // FUNCAO SELECIONAR DADOS
    function seleciona(item){        
        $('#cc_tabela').empty();        
        $('#rc_tablea').empty();
        $('#se_tabela').empty();
        $('#po_tabela').empty();
        $.ajax({
            type: 'POST',          
            data: {item: item},                      
            url: "php/control/controller.php",
            dataType: 'json'
                        
        }).done(function(response){           
            $("#table tbody").html(response);
            $('#p_filtro').show();
            $('#p_botao-alterar').hide();
            $('.alter-date').hide();
                                    
            
        }).fail(function (msg){             
            Materialize.toast("Nao contem dados na data, REVER FILTRO", 4000);
            $('#p_botao-alterar').show();
            $('#data1').val("");
            $('#data2').val("");
            $('.alter-date').show();
            $('#p_filtro').hide();
        });
    }
    
    function seleciona_porteiro(item){             
        $.ajax({
            type: 'POST',          
            data: {item: item},                      
            url: "php/control/controller.php",
            dataType: 'json'
                        
        }).done(function(response){             
                if(response[2] == 1){                    
                    $("#cc_porteiro").html(response);                                                   
                    $('#cc_porteiro').material_select();
                    $("#cc_porteiro").val(response[0]);
                    $('#cc_porteiro').material_select();
                    $("#cc_porteiro_dev").html(response);            
                    $('#cc_porteiro_dev').material_select();
                    $("#cc_porteiro_dev").val(response[1]);            
                    $('#cc_porteiro_dev').material_select();
                    $("#rc_porteiro").html(response);            
                    $('#rc_porteiro').material_select();  
                    $("#rc_porteiro").val(response[0]); 
                    $('#rc_porteiro').material_select();
                    $("#se_porteiro").html(response);            
                    $('#se_porteiro').material_select();
                    $("#se_porteiro").val(response[0]);
                    $('#se_porteiro').material_select();
                }
                else {
                $("#cc_porteiro").html(response);                                                   
                $('#cc_porteiro').material_select();                                
                $("#cc_porteiro_dev").html(response);            
                $('#cc_porteiro_dev').material_select();                                
                $("#rc_porteiro").html(response);            
                $('#rc_porteiro').material_select();  
                $("#se_porteiro").html(response);            
                $('#se_porteiro').material_select();                                                      
                }
                
        }).fail(function (msg){
            $("html").html(msg.responseText);
        });
    }
    
    
    // FUNCAO SELECIONA DADOS COM ID 
    function seleciona_dados(item){                
        $.ajax({
            type: 'POST',          
            data: {item: item},                      
            url: "php/control/controller.php",
            dataType: 'json'                        
        }).done(function(response){
            if(response.tipo == '01'){                  
                $('#alter-produto').hide();                     
                $('#cc_inserir').hide();            
                $('#produto').show();
                $('#recebimento').hide();
                $('#servico').hide();
                $('#cc_atualizar').show();
                $('#data').val(response.cc_data);
                $('#data').select();
                $('#tipo').val(response.tipo).material_select();
                $('#controle-chave').show();
                $('#cc_id').val(response.cc_id);
                $('#cc_colab_ret').val(response.cc_colab_ret);
                $('#cc_colab_ret').select();
                $('#cc_chave').val(response.cc_chave);
                $('#cc_chave').select();
                $('#cc_hr_ret').val(response.cc_hr_ret);
                $('#cc_hr_ret').select();
                $('#cc_porteiro').val(response.cc_porteiro).material_select();
                
                if(response.cc_data_dev == ""){
                    $('#cc_data_dev').val("");
                    $('#cc_data_dev').select();
                }
                else {
                    $('#cc_data_dev').val(response.cc_data_dev);
                    $('#cc_data_dev').select();
                }
                
                $('#cc_porteiro_dev').val(response.cc_porteiro_dev).material_select();
                $('#cc_colab_dev').val(response.cc_colab_dev);
                $('#cc_colab_dev').select();
                $('#cc_hr_dev').val(response.cc_hr_dev);
                $('#cc_hr_dev').select();                
                var obj = new Object();
                obj.acao = 0;
                obj.tipo = 0;
                obj.filtro = 1;                
                obj.porteiro1 = response.cc_porteiro;
                obj.porteiro2 = response.cc_porteiro_dev;
                var obj = JSON.stringify(obj);            
                seleciona_porteiro(obj);                              
            }
            else if(response.tipo == '02'){                
                $('#alter-produto').hide();                     
                $('#rc_inserir').hide();            
                $('#produto').show();
                $('#recebimento').show();
                $('#servico').hide();
                $('#controle-chave').hide();
                $('#rc_atualizar').show();
                $('#data').val(response.rs_data);
                $('#data').select();                
                $('#tipo').val(response.tipo).material_select();
                $('#rc_id').val(response.rs_id);
                $('#rc_hr_ent').val(response.rs_hr_ent);
                $('#rc_hr_ent').select();
                $('#rc_hr_sai').val(response.rs_hr_sai);
                $('#rc_hr_sai').select();
                $('#rc_emp').val(response.rs_emp);
                $('#rc_emp').select();
                $('#rc_mot').val(response.rs_mot);
                $('#rc_mot').select();
                $('#rc_rg').val(response.rs_rg);
                $('#rc_rg').select();
                $('#rc_pl').val(response.rs_pl);
                $('#rc_pl').select();
                $('#rc_flc').val(response.rs_flc);
                $('#rc_flc').select();
                $('#rc_porteiro').val(response.rs_porteiro).material_select();
                $('#rc_obs').val(response.rs_obs);
                $('#rc_obs').select();
                $('#rc_anot_sil').val(response.rs_anot_sil);
                $('#rc_anot_sil').select();      
                var obj = new Object();
                obj.acao = 0;
                obj.tipo = 0;
                obj.filtro = 1;                
                obj.porteiro1 = response.rs_porteiro; 
                obj.porteiro2 = null;
                var obj = JSON.stringify(obj);            
                seleciona_porteiro(obj);                     
            }
            else if(response.tipo == '03'){                
                $('#alter-produto').hide();                     
                $('#se_inserir').hide();            
                $('#produto').show();
                $('#recebimento').hide();
                $('#servico').show();
                $('#controle-chave').hide();
                $('#se_atualizar').show();
                $('#data').val(response.rs_data);
                $('#data').select();
                $('#tipo').val(response.tipo).material_select();
                $('#se_id').val(response.rs_id);
                $('#se_hr_ent').val(response.rs_hr_ent);
                $('#se_hr_ent').select();
                $('#se_hr_sai').val(response.rs_hr_sai);
                $('#se_hr_sai').select();
                $('#se_emp').val(response.rs_emp);
                $('#se_emp').select();
                $('#se_mot').val(response.rs_mot);
                $('#se_mot').select();
                $('#se_rg').val(response.rs_rg);
                $('#se_rg').select();
                $('#se_pl').val(response.rs_pl);
                $('#se_pl').select();
                $('#se_flc').val(response.rs_flc);
                $('#se_flc').select();
                $('#se_porteiro').val(response.rs_porteiro).material_select();
                $('#se_obs').val(response.rs_obs);
                $('#se_obs').select();
                var obj = new Object();
                obj.acao = 0;
                obj.tipo = 0;
                obj.filtro = 1;                
                obj.porteiro1 = response.rs_porteiro;
                obj.porteiro2 = null;
                var obj = JSON.stringify(obj);            
                seleciona_porteiro(obj);             
            }
            else{
                $('#alter-produto').hide();                     
                $('#se_inserir').hide();            
                $('#produto').show();
                $('#recebimento').hide();
                $('#servico').hide();
                $('.geral').hide();
                $('#controle-chave').hide();
                $('#cad_porteiro').show();
                $('#se_atualizar').hide();                
                $('#cad_inserir').hide();
                $('#cad_atualizar').show();
                $('#po_id').val(response.po_id);
                $('#porteiroName').val(response.po_nome);
                $('#porteiroName').select();                
            }
        }).fail(function (msg){
            $("html").html(msg.responseText);
        });
       
    }
    
    function deleta_dados(item){
        $.ajax({
        type: 'POST',          
        data: {item: item},                      
        url: "php/control/controller.php",
        dataType: 'json'
        }).done(function (result) {            
            if(result){                                
                $(".foto-voltar").trigger("click");            
                Materialize.toast("Registro Deletado com Sucesso", 40000);
            }else{
                Materialize.toast("Erro ao Deletar registro", 4000);
            }
            
        }).fail(function (msg){                        
            $("html").html(msg.responseText);
        });
    }
    
    
    
    function edita(item){
        $.ajax({
            method: "POST",
            data: {item: item},
            url: "php/control/controller.php",
            dataType: 'json'                        
        }).done(function (result) {            
            if(result){                                                
                Materialize.toast("Registro alterado com Sucesso", 40000);
                $('#container').show("slide");
                $('.foto-voltar').show();
                $('#alter-produto').show();                
                $('.estatic').hide("slide");
                $('#produto').hide("slide");
                $('.produt').hide("slide");
                $('#tabela').empty();                
                $('#p_filtro').hide();
                $('.alter-date').hide();                                
                var x = $('#p_tipo').val();                
                if(x == '01'){                    
                    $('#p_controle-chave').show();
                    $('#p_recebimento').hide();
                    $('#p_porteiro').hide();
                    $('#p_servico').hide();                                
                    if($('#data1').val() == "" || $('#data2').val() == ""){
                        var data1 = new Date();
                        var dataFormatada1 = ("0" + data1.getDate()).substr(-2) + "/" + ("0" + (data1.getMonth() + 1)).substr(-2) + "/" + data1.getFullYear();     
                        var newdata1 = dataFormatada1.split("/").reverse().join("-");
                        var data2 = new Date();
                        var dataFormatada2 = ("0" + data2.getDate()).substr(-2) + "/" + ("0" + (data2.getMonth() + 1)).substr(-2) + "/" + data2.getFullYear();     
                        var newdata2 = dataFormatada2.split("/").reverse().join("-");
                        var obj = new Object();        
                        obj.acao = 0;        
                        obj.tipo = $('#p_tipo').val();        
                        obj.data1 = newdata1;
                        obj.data2 = newdata2;
                        obj = JSON.stringify(obj);            
                        seleciona(obj);         
                    }
                    else{
                        var data1 = $('#data1').val();                    
                        var newdata1 = data1.split("/").reverse().join("-");
                        var data2 = new $('#data2').val();                    
                        var newdata2 = data2.split("/").reverse().join("-");
                        var obj = new Object();        
                        obj.acao = 0;        
                        obj.tipo = $('#p_tipo').val();        
                        obj.data1 = newdata1;
                        obj.data2 = newdata2;
                        obj = JSON.stringify(obj);            
                        seleciona(obj);         
                    }                   
                }
                else if(x == '02'){
                    $('#p_recebimento').show();
                    $('#p_controle-chave').hide();
                    $('#p_porteiro').hide();
                    $('#p_servico').hide();
                      if($('#data1').val() == "" || $('#data2').val() == ""){
                        var data1 = new Date();
                        var dataFormatada1 = ("0" + data1.getDate()).substr(-2) + "/" + ("0" + (data1.getMonth() + 1)).substr(-2) + "/" + data1.getFullYear();     
                        var newdata1 = dataFormatada1.split("/").reverse().join("-");
                        var data2 = new Date();
                        var dataFormatada2 = ("0" + data2.getDate()).substr(-2) + "/" + ("0" + (data2.getMonth() + 1)).substr(-2) + "/" + data2.getFullYear();     
                        var newdata2 = dataFormatada2.split("/").reverse().join("-");
                        var obj = new Object();        
                        obj.acao = 0;        
                        obj.tipo = $('#p_tipo').val();        
                        obj.data1 = newdata1;
                        obj.data2 = newdata2;
                        obj = JSON.stringify(obj);            
                        seleciona(obj);         
                    }
                    else{
                        var data1 = $('#data1').val();                    
                        var newdata1 = data1.split("/").reverse().join("-");
                        var data2 = new $('#data2').val();                    
                        var newdata2 = data2.split("/").reverse().join("-");
                        var obj = new Object();        
                        obj.acao = 0;        
                        obj.tipo = $('#p_tipo').val();        
                        obj.data1 = newdata1;
                        obj.data2 = newdata2;
                        obj = JSON.stringify(obj);            
                        seleciona(obj);         
                    }                   
                }
                else if(x == '03'){
                   $('#p_servico').show();
                   $('#p_controle-chave').hide();
                   $('#p_recebimento').hide();
                   $('#p_porteiro').hide();
                      if($('#data1').val() == "" || $('#data2').val() == ""){
                        var data1 = new Date();
                        var dataFormatada1 = ("0" + data1.getDate()).substr(-2) + "/" + ("0" + (data1.getMonth() + 1)).substr(-2) + "/" + data1.getFullYear();     
                        var newdata1 = dataFormatada1.split("/").reverse().join("-");
                        var data2 = new Date();
                        var dataFormatada2 = ("0" + data2.getDate()).substr(-2) + "/" + ("0" + (data2.getMonth() + 1)).substr(-2) + "/" + data2.getFullYear();     
                        var newdata2 = dataFormatada2.split("/").reverse().join("-");
                        var obj = new Object();        
                        obj.acao = 0;        
                        obj.tipo = $('#p_tipo').val();        
                        obj.data1 = newdata1;
                        obj.data2 = newdata2;
                        obj = JSON.stringify(obj);            
                        seleciona(obj);         
                    }
                    else{
                        var data1 = $('#data1').val();                    
                        var newdata1 = data1.split("/").reverse().join("-");
                        var data2 = new $('#data2').val();                    
                        var newdata2 = data2.split("/").reverse().join("-");
                        var obj = new Object();        
                        obj.acao = 0;        
                        obj.tipo = $('#p_tipo').val();        
                        obj.data1 = newdata1;
                        obj.data2 = newdata2;
                        obj = JSON.stringify(obj);            
                        seleciona(obj);         
                    }                   
                }
                else if(x == '04') {
                    $('#p_porteiro').show();
                    $('#p_controle-chave').hide();
                    $('#p_recebimento').hide();
                    $('#p_servico').hide();
                    var obj = new Object();        
                    obj.acao = 0;        
                    obj.tipo = $('#p_tipo').val();
                    obj.filtro = 2;            
                    obj = JSON.stringify(obj);            
                    seleciona(obj);         
                }
            
            }else{
                Materialize.toast("Erro ao alterar o registro", 4000);
            }
            
        }).fail(function (msg){                                    
            $("html").html(msg.responseText);
        });
    }
          
   /* 
    * 
    * ======================== BOTAO CARREGA TABELA
    * 
    * */
    $('#p_botao-alterar').click(function(){
        var data1 = $('#data1').val();
        var newdata1 = data1.split("/").reverse().join("-");
        var data2 = $('#data2').val();
        var newdata2 = data2.split("/").reverse().join("-");
        var obj = new Object();        
        obj.acao = 0;        
        obj.tipo = $('#p_tipo').val();        
        obj.data1 = newdata1;
        obj.data2 = newdata2;
        obj = JSON.stringify(obj);            
        seleciona(obj);        
    });  
    
        $('#p_filtro').click(function(){
            $('#p_botao-alterar').show();
            $('#data1').val("");
            $('#data2').val("");
            $('.alter-date').show();
            $('#p_filtro').hide();
    });  
    
    /* 
     * 
     * ======================= BOTÃO LINHA SELECIONADA Q NA TABELA
     * 
     * */
     $('table').delegate(".cc_btn-edit","click",function(){     
        var id = $('td:first', $(this).parents('tr')).text();        
        var obj = new Object();        
        obj.acao = 2;                
        obj.id = id;
        obj.tipo = '01';        
        obj = JSON.stringify(obj);            
        seleciona_dados(obj);        
   });
   
   $('table').delegate(".rc_btn-edit","click",function(){     
        var id = $('td:first', $(this).parents('tr')).text();        
        var obj = new Object();        
        obj.acao = 2;                
        obj.id = id;
        obj.tipo = '02';        
        obj = JSON.stringify(obj);            
        seleciona_dados(obj);        
   });
   
   $('table').delegate(".se_btn-edit","click",function(){     
        var id = $('td:first', $(this).parents('tr')).text();        
        var obj = new Object();        
        obj.acao = 2;                
        obj.id = id;
        obj.tipo = '03';        
        obj = JSON.stringify(obj);            
        seleciona_dados(obj);        
   });
   
      $('table').delegate(".po_btn-edit","click",function(){     
        var id = $('td:first', $(this).parents('tr')).text();        
        var obj = new Object();        
        obj.acao = 2;                
        obj.id = id;
        obj.tipo = '04';        
        obj = JSON.stringify(obj);            
        seleciona_dados(obj);        
   });
   
   
   $('table').delegate(".cc_btn-del","click",function(){               
        var id = $('td:first', $(this).parents('tr')).text();        
        var obj = new Object();        
        obj.acao = 4;                
        obj.id = id;
        obj.tipo = '01';        
        obj = JSON.stringify(obj);                    
        deleta_dados(obj);        
           
   });
   
     $('table').delegate(".rc_btn-del","click",function(){               
        var id = $('td:first', $(this).parents('tr')).text();        
        var obj = new Object();        
        obj.acao = 4;                
        obj.id = id;
        obj.tipo = '02';        
        obj = JSON.stringify(obj);                    
        deleta_dados(obj);        
           
   });
   
     $('table').delegate(".se_btn-del","click",function(){               
        var id = $('td:first', $(this).parents('tr')).text();        
        var obj = new Object();        
        obj.acao = 4;                
        obj.id = id;
        obj.tipo = '03';   
        obj = JSON.stringify(obj);                    
        deleta_dados(obj);        
           
   });
});   

