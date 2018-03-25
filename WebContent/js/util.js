var tempoTransicao = 500;
var msgAguardeGeral= "<div style='margin:0 auto;text-align: center; width: 20em;'><button class='btn btn-default  btn-carregando noLoading'></button></div>";
var modalAguarde = [];
//mensagens
var MSG_DATA_INVALIDA = "Data informada é inválida!";
var MSG_HORA_INVALIDA = "Horas informada é inválida!";
var MSG_APENAS_NUMERO_CPF = "A campo de CPF suporta apenas números!";
var MSG_NUMERO_CPF_INVALIDO = "Número de CPF inválido!";
var MSG_TITULO_ERRRO = "Número de CPF inválido!";
var MSG_SELECIONE_ITEM = "Selecione um item";
//Botões Genéricos
var botaoOK = criarbotaoDialog("OK", "glyphicon glyphicon-ok", "btn btn-primary", function(tela){
	fecharModais();
	tela.close();
});
var botaoCancel = criarbotaoDialog("Cancelar", "glyphicon glyphicon-remove", "btn btn-danger", function(tela){
	fecharModais();
	tela.close();
});
 

$(document).ready(function() {
	
});

function fecharModais(){
	for(var i = 0; i < modalAguarde.length; i++){
		modalAguarde[i].close();
	}
	modalAguarde = [];
}

function ajaxJsonAguarde(idDIV, tipoMetodo, URL, tipoDados, dados, msgAguarde, antesDeEnviar, sucesso){
	if(!msgAguarde){msgAguarde = msgAguardeGeral;}
	if(!antesDeEnviar){antesDeEnviar = function(){}}
	if(!sucesso){sucesso = function(retorno){}}
	if(idDIV){
		setConteudo(idDIV, msgAguarde)
	}else{
		modalAguarde[modalAguarde.length] = showModal(msgAguarde,  "Aguarde...", null, null, null, null, false);
	}
	if(!tipoDados){tipoDados = 'html';};
	$.ajax({
	    type: tipoMetodo,
	    url: URL,
	    dataType:tipoDados,
	    contentType: "application/json",
 		data: dados,
	    beforeSend:antesDeEnviar,
	    success: sucesso,
	    error: function(error){
	    	console.log(error);
	    	if(error){
	    		if(error.status){
	    			verificarMsgStatus(error.status);
	    		}
	    	}
	    }
	}).done(function(){
		fecharModais();
	});
}

function setPaginacao(divPaginacao, pagina, numTotal, qtdRegistros, totalRegistros, funcao){
	if(!pagina){pagina = 0};
	if(!numTotal){numTotal = 0};
	if(!qtdRegistros){qtdRegistros = 0};
	if(!totalRegistros){totalRegistrosfuncao = 0};
	if(!funcao){pagina = function(event, num){}};
	
	$(divPaginacao).bootpag({
	    total: numTotal,
	    page: pagina,
	    registros: qtdRegistros,
	    totalRegistros: totalRegistros,
	    maxVisible: 5,
	    leaps: true,
	    firstLastUse: true,
	    first: 'Primeira',
	    last: 'Última',
	    next: 'Próximo',
	    prev: 'Anterior',
	    wrapClass: 'pagination',
	    activeClass: 'active',
	    disabledClass: 'disabled',
	    nextClass: 'next',
	    prevClass: 'prev',
	    lastClass: 'last',
	    firstClass: 'first'
	}).on("page", funcao); 
}

function verificarMsgStatus(status){
	var msg = "Erro ao tentar conectar com servidor.";
	switch (status) {
		case 302: msg = "O recurso foi movido temporariamente para outra URI."; break;
		case 304: msg = "O recurso não foi alterado."; break;
		case 400: msg = "Os dados da requisição não são válidos."; break;
		case 401: msg = "A URI especificada exige autenticação do cliente. O cliente pode tentar fazer novas requisições."; break;
		case 403: msg = "O servidor entende a requisição, mas se recusa em atendê-la. O cliente não deve tentar fazer uma nova requisição."; break;
		case 404: msg = "O servidor não encontrou nenhuma URI correspondente."; break;
		case 405: msg = "O método especificado na requisição não é válido na URI. A resposta deve incluir um cabeçalho Allow com uma lista dos métodos aceitos."; break;
		case 410: msg = "O recurso solicitado está indisponível mas seu endereço atual não é conhecido."; break;
		case 500: msg = "O servidor não foi capaz de concluir a requisição devido a um erro inesperado."; break;
		case 502: msg = "O servidor, enquanto agindo como proxy ou gateway, recebeu uma resposta inválida do servidor upstream a que fez uma requisição."; break;
		case 503: msg = "O servidor, enquanto agindo como proxy ou gateway, recebeu uma resposta inválida do servidor upstream a que fez uma requisição."; break;
		default: 	break;
	}
	fecharModais();
	showMsg(msg, "Error!", "error", null);
}

function verificarMsgRetorno(retorno){
	var msg = null;
	var tipo = "";
	if(retorno.msgError){tipo = "error";msg = retorno.msgError;}
	else if(retorno.msgInformacao){tipo = "error";msg = retorno.msgInformacao;}
	else if(retorno.msgSucesso){tipo = "sucesso";msg = retorno.msgSucesso;}
	else if(retorno.msgAtencao){tipo = "atencao";msg = retorno.msgAtencao;}
	fecharModais();
	if(msg){showMsg(msg, null, tipo);}
}

function setConteudo(idElemento, conteudo, funcao){
	if(!funcao){funcao = function(){}};
	$(idElemento).fadeOut(tempoTransicao, function(){
		$(this).html(conteudo);
		$(this).fadeIn(tempoTransicao, funcao);
	});
}

function parseFormToJSON(idForm, isString){
	var obj = {};
	var a = $(idForm).serializeArray();
	$.each(a, function() {
		if (obj[this.name] !== undefined) {
			if (!obj[this.name].push) {
				obj[this.name] = [obj[this.name]];
			}
			obj[this.name].push(this.value || '');
		} else {
			obj[this.name] = this.value || '';
		}
	});
	if(isString){obj = JSON.stringify(obj);};
	return obj;
}

function setSelect(idSelect, funcao, dados, pleace){
	var f = function (data){};
	if(!funcao){funcao = function(){}};
	if(!dados){dados = [];};
	if(!pleace){pleace = MSG_SELECIONE_ITEM};
	$(idSelect).select2({
		placeholder: pleace,
		data:dados,
	}).on("change", funcao);
}

function setMascaraMoeda(idInput, mostrarSimbolo, permitirNegativo){
	if(!mostrarSimbolo){mostrarSimbolo = false;};
	if(!permitirNegativo){permitirNegativoj = false;}
	$(idInput).maskMoney({
		symbol:'R$ ', 
		showSymbol:mostrarSimbolo, thousands:'.', decimal:',', symbolStay: false, allowNegative: permitirNegativo, affixesStay: false
	});
}

function setValidacaoHora(idInput){
	$(idInput).change(
			function (event) {
				var obj = event.target;
				var hora = obj.value;
				if (hora != '') {
					var isHorasValida = true;
					var horas = hora.substring(0, 2);
					var minutos = hora.substring(3, 5);
					// Criando um objeto Date usando os valores ano, mes e dia.
					if(horas != ''){
						horas =  parseInt(horas);
						if(horas > 23){
							isHorasValida = false;
						}
					}
					if(minutos != ''){
						minutos =  parseInt(minutos);
						if(minutos > 59){
							isHorasValida = false;
						}
						
					}
					if (!isHorasValida) {
						showMsg(MSG_HORA_INVALIDA, null,"error");
						obj.value = "";
						obj.focus();
						return isHorasValida;
					}
					return isHorasValida;
				}
			}
	);
}

function setClockPicker(idInput){
	$(idInput).clockpicker({
	    placement: 'top',
	    align: 'left',
	    donetext: 'button',
	    autoclose: 'true',
	    vibrate: 'true'
	});
}

function setMascaraHora(idInput){
	$(idInput).mask("99:99");
}

function setDatePicker(idInput){
	$(idInput).datepicker({
		format: "dd/mm/yyyy",
		autoclose: true,
		todayHighlight: true,
		forceParse: false,
	});
}

function setValidacaoData(idInput){
	$(idInput).change(
			function (event) {
				var obj = event.target;
				var data = obj.value;
				if (data != '') {
					var dia = data.substring(0, 2);
					var mes = data.substring(3, 5);
					var ano = data.substring(6, 10);
					// Criando um objeto Date usando os valores ano, mes e dia.
					var novaData = new Date(ano, (mes - 1), dia);
					var mesmoDia = parseInt(dia, 10) == parseInt(novaData.getDate());
					var mesmoMes = parseInt(mes, 10) == parseInt(novaData.getMonth()) + 1;
					var mesmoAno = parseInt(ano) == parseInt(novaData.getFullYear());

					if (!((mesmoDia) && (mesmoMes) && (mesmoAno))) {
						showMsg(MSG_DATA_INVALIDA, null, "primario");
						obj.value = "";
						obj.focus();
						return false;
					}
					return true;
				}
			}

	);
}

function setMascaraData(idInput){
	$(idInput).mask("99/99/9999");
}

function setMascaraCPF(idInput){
	$(idInput).mask("999.999.999-99");
}

function setValidacaoCPF(idInput){
	$(idInput).change(
			function(event) {
				CPF = $(this).val();
				if(!CPF){ return false;}
				error  = new String;
				cpfv  = CPF;
				if(cpfv.length == 14 || cpfv.length == 11){
					cpfv = cpfv.replace('.', '');
					cpfv = cpfv.replace('.', '');
					cpfv = cpfv.replace('-', '');
					
					var nonNumbers = /\D/;
					
					if(nonNumbers.test(cpfv)){
						error = MSG_APENAS_NUMERO_CPF;
					}else{
						if (cpfv == "00000000000" ||
								cpfv == "11111111111" ||
								cpfv == "22222222222" ||
								cpfv == "33333333333" ||
								cpfv == "44444444444" ||
								cpfv == "55555555555" ||
								cpfv == "66666666666" ||
								cpfv == "77777777777" ||
								cpfv == "88888888888" ||
								cpfv == "99999999999") {
							
							error = MSG_NUMERO_CPF_INVALIDO;
						}
						var a = [];
						var b = new Number;
						var c = 11;
						
						for(i=0; i<11; i++){
							a[i] = cpfv.charAt(i);
							if (i < 9) b += (a[i] * --c);
						}
						if((x = b % 11) < 2){
							a[9] = 0
						}else{
							a[9] = 11-x
						}
						b = 0;
						c = 11;
						for (y=0; y<10; y++) b += (a[y] * c--);
						
						if((x = b % 11) < 2){
							a[10] = 0;
						}else{
							a[10] = 11-x;
						}
						if((cpfv.charAt(9) != a[9]) || (cpfv.charAt(10) != a[10])){
							erro = MSG_NUMERO_CPF_INVALIDO;
						}
					}
				}else{
					if(cpfv.length == 0){
						return false;
					}else{
						erro = MSG_NUMERO_CPF_INVALIDO;
					}
				}
				if (error.length > 0){
					$(this).val('');
					showMsg(error, null, "error");
					setTimeout(function(){$(this).focus();},100);
					return false;
				}
				return $(this);
			});
}

function setSwitch(idCheckBox, state, funcao, textTrue, textFalse, corTrue, corFalse, tamanho){
	var t = function onchange(event, status){};
	console.log(state);
	if(!state){state = false;}
	if(funcao){	t = funcao;}
	if(!textTrue){textTrue = "ON"};
	if(!textFalse){textFalse = "OFF"};
	if(!tamanho){tamanho = "sm"};
	if(!corTrue){corTrue = "primary"};
	if(!corFalse){corFalse = "default"};
	switch (tamanho) {
		case "xs": tamanho = "mini"; break;
		case "sm": tamanho = "small"; break;
		case "md": tamanho = "normal"; break;
		case "lg": tamanho = "large"; break;
		default: tamanho = "small";	break;
	}
	function getColor(cor){
		switch(cor){
			case "padrao": cor = 'default';break;
			case "informacao": cor = 'info';break;
			case "primario": cor = 'primary';break;
			case "sucesso": cor = 'success';break;
			case "atencao": cor = 'warning';break;
			case "error": cor = 'danger';break;
		}
		return cor;
	}
	$(idCheckBox).bootstrapSwitch({
		"state" : state,
		"onSwitchChange":t,
		onText: textTrue,
		offText: textFalse,
		onColor: getColor(corTrue),
		offColor: getColor(corFalse),
		size: tamanho
	});
	
}

function cleanErros(){
	$('.alert-error').remove();
}

function removerEspacos(texto){
	return texto.replace(/\s*/g,"");
}

function getTipoDialog(tipo){
		switch(tipo){
		case "padrao": tipo = 'type-default';
		break;
		case "informacao": tipo = 'type-info';
		break;
		case "primario": tipo = 'type-primary';
		break;
		case "sucesso": tipo = 'type-success';
		break;
		case "atencao": tipo = 'type-warning';
		break;
		case "error": tipo = 'type-danger';
		break;
		default: tipo = 'type-default';
	}
	return tipo;
}

function showMsg(msg, titulo, tipo, largura){
	if(!titulo){
		titulo = "Mensagem";
	}
	if(!tipo){
		tipo = 'type-default';
	}else{
		tipo = getTipoDialog(tipo);
	}
	if(!largura){
		largura = '';
	}
	BootstrapDialog.show({
		title: titulo,
		message: msg,
		type: tipo,
		width: largura,
	    draggable: true,
	    buttons: [{
	        icon: 'glyphicon glyphicon-check',       
	        label: 'OK',
	        cssClass: 'btn-primary', 
	        autospin: false,
	        action: function(dialogRef){    
	            dialogRef.close();
	        }
	    }]
	});
}

function showModal(msg , titulo, botoes, largura, funcaoMostrar, funcaoEsconder, podeFechar, isPaginaHTML, tipo){
	if(!msg){	msg = msgAguardeGeral;}
	if(!titulo){titulo = "Aguarde...";}
	if(!botoes){botoes = [];}
	if(!largura){largura = '';}
	if(!funcaoMostrar){funcaoMostrar = function(){};}
	if(!funcaoEsconder){funcaoEsconder = function(){};}
	if(isPaginaHTML){
		msg = function(dialog) {
            var $message = $('<div></div>');
            var pageToLoad = dialog.getData("pageToLoad");
            $message.load(pageToLoad);
            return $message;
        }
	}
	if(!tipo){
		tipo = 'type-default';
	}else{
		tipo = getTipoDialog(tipo);
	}
	var modal = new  BootstrapDialog({
		title: titulo,
		message: msg,
		width: largura,
		buttons: botoes,
		width: largura,
		onshow: funcaoMostrar,
		onhide: funcaoEsconder,
		draggable: true,
		closable:podeFechar,
		tirarBR: true,
		data: {
            "pageToLoad":isPaginaHTML
        }
	 });
	modal.realize();
	modal.open();
	return modal;
}
//Parâmetros: Texto exibido no botão, icone ao lado do texto, classe da cor do botão, funcao ao clicar no botão
function criarbotaoDialog(texto, icone, classe, funcao){
	if(!texto){texto ="Botão"};
	if(!icone){icone =""};
	if(!classe){classe =""};
	if(!funcao){funcao = function(dialog){}};
	
	var botao = {
        icon: icone,
        label: texto,
        cssClass: classe,
        action:funcao
    }
	return botao;
}

function showConfirme(msg, titulo,  tipo, funcao, okLabel, cancelLabel){
	BootstrapDialog.confirm(msg, titulo, tipo, funcao, cancelLabel, okLabel);
}

function alterClassAnimate(elemento, classeAtual, novaClasse, botaoAserAlterado){
	$(elemento).animate({"opacity":"0.3"}, 50, function(){
		$(elemento).removeClass(classeAtual);
		$(elemento).addClass(novaClasse);
		$(elemento).animate({"opacity":"1"},650,function(){
			
		});
	});
	if(botaoAserAlterado != undefined && botaoAserAlterado != null && botaoAserAlterado != ""){
		$(botaoAserAlterado).animate({"opacity":"0.5"}, 450, function(){
			$(botaoAserAlterado).removeClass(novaClasse);
			$(botaoAserAlterado).addClass(classeAtual);
			$(botaoAserAlterado).animate({"opacity":"1"}, 50);
		});
	}
}

function getNomeMes(numero){
	var mes = "Não Encontrado";
    switch (numeroMes){
        case "1":  mes = "Janeiro"; break;
        case "01":  mes = "Janeiro"; break;
        case "2":  mes = "Fevereiro"; break;
        case "02":  mes = "Fevereiro"; break;
        case "3":  mes = "Março"; break;
        case "03":  mes = "Março"; break;
        case "4":  mes = "Abril"; break;
        case "04":  mes = "Abril"; break;
        case "5":  mes = "Maio"; break;
        case "05":  mes = "Maio"; break;
        case "6":  mes = "Junho"; break;
        case "06":  mes = "Junho"; break;
        case "7":  mes = "Julho"; break;
        case "07":  mes = "Julho"; break;
        case "8":  mes = "Agosto"; break;
        case "08":  mes = "Agosto"; break;
        case "9":  mes = "Setembro"; break;
        case "09":  mes = "Setembro"; break;
        case "10": mes = "Outubro"; break;
        case "11": mes = "Novembro"; break;
        case "12": mes = "Desembro"; break;
    }
    return mes;
}


//-------------------------------------------------------------- fun??esde cookies  ------
function setCookie(nome, cookie) {  
	var data = new Date();  
	data.setTime(data.getTime() + (1000 * 60 * 60 * 24 * 30));  
	document.cookie = nome + "=" + cookie + ";expires=" + data.toGMTString();  
}    
	
function deleteCookie(nome){
	var data = new Date();  
	data.setTime(data.getTime() -1);  
	document.cookie = nome + "=" + ";expires=" + data.toGMTString();
}

function getCookie(nome) {  
	if (document.cookie.length > 0)  {  
		inicio = document.cookie.indexOf(nome + "=");  
		if (inicio != -1) {   
			inicio = inicio + nome.length + 1;   
			fim = document.cookie.indexOf(";" , inicio);  
			if (fim == -1) fim = document.cookie.length;  
			return unescape(document.cookie.substring(inicio, fim));  
		}
	}  
		return null;  
}
//-------------------------------------------------------------------------------------------------------------
