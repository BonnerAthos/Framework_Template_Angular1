//Módulo de serviços
angular.module("utilService",[]);
// Util funções de requisições HTTP -----------------------------------------------------------------------------------------------
angular.module("utilService").factory("utilHttp", function($http, utilFunc){
	var _addTimestamp = function(url){
		var timestamp = new Date().getTime();
		if(url.indexOf("?") > 0){
			url = url + "&timestamp=" + timestamp;
		}else{
			url = url + "?timestamp=" + timestamp;			
		}
		console.log(url);
		return url;
	}
	
	var _ajax = function(type, url, obj, funcSuccess, funcError){
		url = _addTimestamp(url);
		if(!funcSuccess){
			funcSuccess = function(result){
				utilFunc.getMsgResult(result.data)
			}
		}
		if(!funcError){
			funcError = function(result){
				utilFunc.getMsgStatusError(result.status);
			}
		}
		$http({
		  method: type,
		  url: url,
		  data: obj
		}).then(funcSuccess, funcError);
	};
	
	return {
		ajax: _ajax
	};
});

// Util funções de Diálogos na tela -----------------------------------------------------------------------------------------------
angular.module("utilService").factory("utilDialog", function($compile, $window){
	var _setDatePicker = function(scope, element){
		var input = element.find("input");
		input.val(scope.value);
		input.datepicker({
			format: "dd/mm/yyyy",
			autoclose: true,
			todayHighlight: true,
			forceParse: false,
		});
	};
	
	var _setClockPicker = function(scope, element){
		var input = element.find("input");
		input.val(scope.value);
		input.clockpicker({
		    placement: "top",
		    align: 'left',
		    donetext: 'button',
		    autoclose: 'true',
		    vibrate: 'true',
		    todayBtn: 'true'
		});
	};
	
	var _getTypeDialog = function(tipo){
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
	
	var _showMsg = function(msg, titulo, tipo, largura){
		if(!titulo){titulo = "Mensagem";}
		if(!tipo){
			tipo = 'type-default';
		}else{
			tipo = _getTypeDialog(tipo);
		}
		if(!largura){largura = '';}
		var modal = new BootstrapDialog({
			title: titulo,
			message: msg,
			type: tipo,
			width: largura,
		    draggable: true,
		    autodestroy: true,
		    buttons: [{
		        icon: 'check',       
		        label: 'OK',
		        cssClass: 'btn-primary', 
		        autospin: false,
		        action: function(dialog){    
		            dialog.close();
		        }
		    }]
		});
		modal.realize();
		modal.open();
		return modal;
	};
	/**
	 * 
	 */
	var _showModal = function(scope,msg , titulo, botoes, largura, funcaoMostrar, funcaoEsconder, podeFechar, paginaHTML, tipo){
		if(!msg){msg = "Aguarde...";}
		if(!titulo){titulo = "Aguarde...";}
		if(!botoes){botoes = [];}
		if(!largura){largura = '';}
		if(!funcaoMostrar){funcaoMostrar = function(){};}
		if(!funcaoEsconder){funcaoEsconder = function(){};}
		if(paginaHTML){
			msg = function(dialog) {
	            var $message = $('<div></div>');
	            var pageToLoad = dialog.getData("pageToLoad");
	            $message.load(pageToLoad,null, function(){
	            	$message = $compile($message)(scope);
	            });
	            return $message;
	        }
		}
		if(!tipo){
			tipo = 'type-default';
		}else{
			tipo = _getTypeDialog(tipo);
		}
		var modal = new  BootstrapDialog({
			title: titulo,
			message: msg,
			type: tipo,
			width: largura,
			buttons: botoes,
			width: largura,
			onshow: funcaoMostrar,
			onhide: funcaoEsconder,
			draggable: true,
			closable:podeFechar,
			tirarBR: true,
			data: {
	            "pageToLoad":paginaHTML
	        }
		 });
		modal.realize();
		modal.open();
		return modal;
	}
	
	var _showConfirm = function(msg, titulo, tipo, funcao, cancelLabel, okLabel){
		BootstrapDialog.confirm(msg, titulo, tipo, funcao, cancelLabel, okLabel);
	}
	
	var _openLoading = function(scope, msg, size){
		if(!angular.element(document.querySelectorAll(".loading-screen-black")).html()){
			if(!msg){msg = "Aguarde..."}
			if(!size){size = ""}
			var html = '<div class="loading-screen-black animate">'
							+'<ui-loading-cicle label="' + msg + '" size="' + size + '"> </ui-loading-cicle>'
					  + '</div>';
			 var html = $compile(html)(scope);
			 $(document.body).toggleClass('modal-open', true);
			 $("body").append(html);
		}
	}
	
	var _closeLoading = function(){
		angular.element(document.querySelectorAll(".loading-screen-black")).fadeOut(300,function(){
			this.remove();
			if($.isEmptyObject(BootstrapDialog.dialogs)){
        		$(document.body).toggleClass('modal-open', false);
			}
		});
	}
	
	var _setMsgLoading = function(msg){
		 var screenLoading = angular.element(document.querySelectorAll(".loading-screen-black")).find(".spinner-label");
		 screenLoading.fadeOut(300, function(){
			 screenLoading.html(msg).delay(100).fadeIn(300);
		 });
	}
	
	var _createButton = function(button){
		var dialog = new BootstrapDialog();
		return  dialog.createButton(button); 
	}
	
	var _createButtonDialog = function(texto, icone, classe, funcao){
		if(!texto){texto =""};
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
	
	
	return {
		setDatePicker: _setDatePicker,
		setClockPicker: _setClockPicker,
		showMsg: _showMsg,
		showModal: _showModal,
		showConfirm: _showConfirm,
		openLoading: _openLoading,
		closeLoading: _closeLoading,
		setMsgLoading:_setMsgLoading,
		createButton: _createButton,
		createButtonDialog: _createButtonDialog
	}
});

// Util funções de mascaras -------------------------------------------------------------------------------------------------------
angular.module("utilService").factory("utilMask", function(utilFunc){
	var _maskNumber = function(scope){
		scope.value = utilFunc.getOnlyNumbers( scope.value);
	}
	
	var _maskMax = function(scope){
		if(scope.value && scope.value.length > scope.maskMax){
			scope.value = scope.value.substring(0, scope.maskMax);
		}
	}
	
	var _maskDate = function(scope){
		if(scope.value){
			var data = utilFunc.getOnlyNumbers( scope.value);
			if(data.length > 2){
				data = data.substring(0, 2) + "/" + data.substring(2);
			}
			if(data.length > 5){
				data = data.substring(0, 5) + "/" + data.substring(5, 9);
			}
			scope.value = data;
		}
	};
	
	var _maskClock = function(scope){
		if(scope.value){
			var hora = utilFunc.getOnlyNumbers( scope.value);
			if(hora.length > 2){
				hora = hora.substring(0, 2) + ":" + hora.substring(2,4);
			}
			scope.value = hora;
		}
	};

	var _maskCpf = function(scope){
		if(scope.value){
			var cpf = utilFunc.getOnlyNumbers( scope.value);
			if(cpf.length > 3){
				cpf = cpf.substring(0, 3) + "." + cpf.substring(3);
			}
			if(cpf.length > 7){
				cpf = cpf.substring(0, 7) + "." + cpf.substring(7);
			}
			if(cpf.length > 11){
				cpf = cpf.substring(0,11) + "-" + cpf.substring(11, 13);
			}
			scope.value = cpf;
		}
	};
	
	var _maskCnpj = function(scope){
		if(scope.value){
			var cnpj = utilFunc.getOnlyNumbers( scope.value);
			if(cnpj.length > 2){
				cnpj = cnpj.substring(0, 2) + "." + cnpj.substring(2);
			}
			if(cnpj.length > 6){
				cnpj = cnpj.substring(0, 6) + "." + cnpj.substring(6);
			}
			if(cnpj.length > 10){
				cnpj = cnpj.substring(0, 10) + "/" + cnpj.substring(10);
			}
			if(cnpj.length > 15){
				cnpj = cnpj.substring(0, 15) + "-" + cnpj.substring(15, 17);
			}
			scope.value = cnpj;
		}
	};
	
	var _maskCep = function(scope){
		if(scope.value){
			var cnpj = utilFunc.getOnlyNumbers( scope.value);
			if(cnpj.length > 5){
				cnpj = cnpj.substring(0, 5) + "-" + cnpj.substring(5, 8);
			}
			
			scope.value = cnpj;
		} 
	};
	
	return {
		maskNumber: _maskNumber,
		maskDate: _maskDate,
		maskClock: _maskClock,
		maskCpf: _maskCpf,
		maskCnpj: _maskCnpj,
		maskCep: _maskCep,
		maskMax: _maskMax
	};
});

// Util funções Gerais -------------------------------------------------------------------------------------------------------
angular.module("utilService").factory("utilFunc", function(utilDialog, vStatus, vMsg, $window){
	var _getOnlyNumbers = function(value){
		if(value){
			try {
				return value.replace(/[^0-9]+/g, "");
			} catch (e) {console.log(e);}
		}
	};
	
	var _getMsgStatusError = function (status){
		var msg = vStatus.statusDefault;
		switch (status) {
			case 302: msg = vStatus.S302; break;
			case 304: msg = vStatus.S304; break;
			case 400: msg = vStatus.S400; break;
			case 401: msg = vStatus.S401; break;
			case 403: msg = vStatus.S403; break;
			case 404: msg = vStatus.S404; break;
			case 405: msg = vStatus.S405; break;
			case 410: msg = vStatus.S410; break;
			case 500: msg = vStatus.S500; break;
			case 502: msg = vStatus.S302; break;
			case 503: msg = vStatus.S302; break;
			default: break;
		}
		utilDialog.closeLoading();
		utilDialog.showMsg(msg, "Erro!", "error")
	}
	
	var _getMsgResult = function(result){
		var msg = null;
		var tipo = "";
		if(result.msgError){tipo = "error";msg = result.msgError;}
		else if(result.msgInformacao){tipo = "error";msg = result.msgInformacao;}
		else if(result.msgSucesso){tipo = "sucesso";msg = result.msgSucesso;}
		else if(result.msgAtencao){tipo = "atencao";msg = result.msgAtencao;}
		if(msg){utilDialog.closeLoading();utilDialog.showMsg(msg, null, tipo);}
	}
	
	
	var _getItemList = function(id, lista){
		var item = null;
		if(id && !$.isEmptyObject(lista)){
			for(var index = 0; index < lista.length; index++){
				if(lista[index].id == id){
					item = lista[index];
					break;
				}
			}
		}
		return item;
	}
	
	var _removeItemList = function(id, lista){
		var item = null;
		if(id && !$.isEmptyObject(lista)){
			
			for(var index = 0; index < lista.length; index++){
				if(lista[index].id == id){
					lista.splice(index, 1);
					break;
				}
			}
		}
	}
	
	var _setPositionSelect = function(element){
		var heightfiltro = parseInt(element.find(".lista-select").css("height").replace("px", ""));
		var height = parseInt(element.find(".resultado-lista-select").css("height").replace("px", ""));
		var w = angular.element($window);
		var offSet = element.offset().top;
		var scrollTop = w.scrollTop();
		var height = element.find(".lista-select").css("height").replace("px", "");
		var heightInput = parseInt(element.find(".form-control:first").css("height").replace("px", ""));
        var center = (w.height()/2);
        var valor =  (heightInput -  (heightInput/2)) * -1;
        if(((offSet + heightInput) - scrollTop) >= center && offSet > height){
        	valor = ((heightfiltro - height)/3) * -1;
        	element.find(".lista-select").css("top", "auto");
        	element.find(".lista-select").css("bottom", valor);
        }else{
        	element.find(".lista-select").css("bottom", "auto");
        	element.find(".lista-select").css("top", valor);
        }
	}
	
	return {
		getOnlyNumbers: _getOnlyNumbers,
		getMsgStatusError: _getMsgStatusError,
		getMsgResult: _getMsgResult,
		getItemList: _getItemList,
		removeItemList: _removeItemList,
		setPositionSelect: _setPositionSelect
	}
});

// Util para validações -------------------------------------------------------------------------------------------------------
angular.module("utilService").factory("utilValid", function(vMsg, utilMask, utilFunc, utilDialog, $timeout){
	
	var _validScopes = function(scopes){
		var msg = "";
		var quebraLinha = "\n";
		scopes.forEach(function(scope) {
			var campo = "";
			if(scope.label){
				campo = scope.label;
			}else if(scope.placeholder && !scope.notPlaceholder){
				campo = scope.placeholder;
			}else if(scope.name){
				campo = scope.name;
			}
			if(scope.isSelect){
				if(scope.notEmpty && $.isEmptyObject(scope.value) && $.isEmptyObject(scope.multValue)){
					msg += vMsg.O_CAMPO + campo + " " + vMsg.E_OBRIGATORIO + quebraLinha;
				}
			}else if(scope.notEmpty && !scope.value){
				msg += vMsg.O_CAMPO + campo + " " + vMsg.E_OBRIGATORIO + quebraLinha;
			}else if(scope.validMin && scope.showErro){
				msg += vMsg.O_CAMPO + campo + " " + vMsg.TEM_TER_NO_MINIMO + " "  + scope.validMin + " " + vMsg.CARACTERES  +quebraLinha;
			}else if(scope.validDate && scope.showErro){
				msg += vMsg.A_DATA + " " + vMsg.INFORMADA_CAMPO + campo + " " + vMsg.E_INVALIDA + quebraLinha;
			}else if(scope.validClock && scope.showErro){
				msg += vMsg.A_HORA + " " + vMsg.INFORMADA_CAMPO +  " " + campo + " " + vMsg.E_INVALIDA +  quebraLinha;
			}else if(scope.validCpf && scope.showErro){
				msg += vMsg.O_CPF + " " + vMsg.INFORMADO_CAMPO +  " " + campo + " " + vMsg.E_INVALIDO +  quebraLinha;
			}else if(scope.validCnpj && scope.showErro){
				msg += vMsg.O_CNPJ + " " + vMsg.INFORMADO_CAMPO +  " " + campo + " " + vMsg.E_INVALIDO +  quebraLinha;
			}else if(scope.validCep && scope.showErro){
				msg += vMsg.O_CEP + " " + vMsg.INFORMADO_CAMPO +  " " + campo + " " + vMsg.E_INVALIDO +  quebraLinha;
			}else if(scope.validEmail && scope.showErro){
				msg += vMsg.O_EMAIL + " " + vMsg.INFORMADO_CAMPO +  " " + campo + " " + vMsg.E_INVALIDO +  quebraLinha;
			}else if(scope.validNumber && scope.showErro){
				msg += vMsg.NO_CAMPO + " " + campo + " " + vMsg.APENAS_NUMERO.toLowerCase() + quebraLinha;
			}else if(scope.compare && scope.showErro){
				msg += vMsg.O_CAMPO + " " + campo + " " + vMsg.DEVE_SER_IGUAL.toLowerCase() + scope.compareLabel + quebraLinha;
			}
		});
		utilDialog.showMsg(msg, vMsg.VALIDACAO, "error");
	}
	
	var _validNumber = function(scope){
		if(scope.value.length >= 1){
			var notNumber = /[^0-9]+/g;
			notValid = notNumber.test(scope.value);
			scope.msgInput = vMsg.APENAS_NUMERO;
			scope.showErro = notValid;
		}
	};
	
	var _validMin = function(scope){
		if(scope.value && scope.value.length < scope.validMin){
			scope.msgInput = vMsg.MINIMO + scope.validMin;
			scope.showErro = true;
		}else{
			scope.showErro = false;
		}
	}
	
	var _validCep = function(scope){
		if(scope.value){
			var cep = /^\d{5}\-?\d{3}$/;
			notValid = !cep.test(scope.value);
			scope.msgInput = vMsg.CEP_INVALIDO;
			scope.showErro = notValid;
		}
	};
	
	var _validNumber = function(scope){
		if(scope.value.length >= 1){
			var notNumber = /[^0-9]+/g;
			notValid = notNumber.test(scope.value);
			scope.msgInput = vMsg.APENAS_NUMERO;
			scope.showErro = notValid;
		}
	};
	
	var _validEmptyInputFloatMD = function(scope){
		if (!scope.value) {
			scope.empty = "is-empty";
		}else {
			scope.empty = "";
		}
	};
	
	var _validValueEmptyInputFloat = function(scope, element, focus){
		var focus = element.find(".is-focused").html();
		if(focus && !scope.value){
			scope.msgInput = vMsg.CAMPO_OBRIGATORIO;
			scope.showErro = true;
		}else{
			scope.showErro = false;
		}
	};
	
	var _validDate = function(scope){
		var data = scope.value;
		var notValid = false;
		if (data && data.length == 10) {
			var dia = data.substring(0, 2);
			var mes = data.substring(3, 5);
			var ano = data.substring(6, 10);
			// Criando um objeto Date usando os valores ano, mes e dia.
			var novaData = new Date(ano, (mes - 1), dia);
			var mesmoDia = parseInt(dia, 10) == parseInt(novaData.getDate());
			var mesmoMes = parseInt(mes, 10) == parseInt(novaData.getMonth()) + 1;
			var mesmoAno = parseInt(ano) == parseInt(novaData.getFullYear());

			if (!((mesmoDia) && (mesmoMes) && (mesmoAno))) {
				notValid = true;
			}
		}else{
			notValid = true;
		}
		scope.msgInput = vMsg.DATA_INVALIDA;
		scope.showErro = notValid;
	};
	
	var _validClock = function(scope){
		var hora = scope.value;
		var notValid = false;
		if (hora && hora.length == 5) {
			var horas = hora.substring(0, 2);
			var minutos = hora.substring(3, 5);
			// Criando um objeto Date usando os valores ano, mes e dia.
			if(horas){
				horas =  parseInt(horas);
				if(horas > 23){
					notValid = true;
				}
			}
			if(minutos){
				minutos =  parseInt(minutos);
				if(minutos > 59){
					notValid = true;
				}
			}
		}else{
			notValid = true;
		}
		scope.msgInput = vMsg.HORA_INVALIDA;
		scope.showErro = notValid;
	}
	
	var _validCpf = function(scope){
		var notValid = false;
		CPF = scope.value;
		error  = new String;
		cpfv  = CPF;
		if(cpfv.length == 14 || cpfv.length == 11){
			cpfv = cpfv.replace('.', '');
			cpfv = cpfv.replace('.', '');
			cpfv = cpfv.replace('-', '');
			
			var nonNumbers = /\D/;
			
			if(nonNumbers.test(cpfv)){
				error = vMsg.APENAS_NUMERO;
				notValid = true;
				
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
					
					error = vMsg.CPF_INVALIDO;
					notValid = true;
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
					error = vMsg.CPF_INVALIDO;
					notValid = true;
				}else{
					notValid = false;
				}
			}
		}else {
			error = vMsg.CPF_INVALIDO;
			notValid = true;
		}
		scope.msgInput = error;
		scope.showErro = notValid;
	}
	

	
	var _validCnpj = function(scope, element){
		var notValid = false;
        cnpj = utilFunc.getOnlyNumbers( scope.value);
        if (cnpj.length != 14){
        	notValid = true;
		}else if (cnpj == "00000000000000" ||//Elimina CNPJs invalidos conhecidos 
            cnpj == "11111111111111" || 
            cnpj == "22222222222222" || 
            cnpj == "33333333333333" || 
            cnpj == "44444444444444" || 
            cnpj == "55555555555555" || 
            cnpj == "66666666666666" || 
            cnpj == "77777777777777" || 
            cnpj == "88888888888888" || 
            cnpj == "99999999999999"){
			notValid = true; 
		}else{
			tamanho = cnpj.length - 2
			numeros = cnpj.substring(0,tamanho);
			digitos = cnpj.substring(tamanho);
			soma = 0;
			pos = tamanho - 7;
			for (i = tamanho; i >= 1; i--) {
				soma += numeros.charAt(tamanho - i) * pos--;
				if (pos < 2)
					pos = 9;
			}
			resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
			if (resultado != digitos.charAt(0)){
				notValid = true;
			}else{
				tamanho = tamanho + 1;
				numeros = cnpj.substring(0,tamanho);
				soma = 0;
				pos = tamanho - 7;
				for (i = tamanho; i >= 1; i--) {
					soma += numeros.charAt(tamanho - i) * pos--;
					if (pos < 2)
						pos = 9;
				}
				resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
				if (resultado != digitos.charAt(1)){
					notValid = true;				
				}
			}
		}
        scope.msgInput = vMsg.CNPJ_INVALIDO;
		scope.showErro = notValid;
	}
	
	var _validEmail = function(scope){
		var email = scope.value;
        var validador = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var notValid = !validador.test(email);
        scope.msgInput = vMsg.EMAIL_INVALIDO;
		scope.showErro = notValid;
	}
	
	var _validCompare = function(scope){
		var notValid = false;
		if(scope.value && scope.value != scope.compare){
			notValid = true;
		}
		scope.msgInput = vMsg.DEVE_SER_IGUAL+ scope.compareLabel;
		scope.showErro = notValid;
	}
	
	var _validSnackBar = function(scope){
		if (scope != null) {
			scope.uiMensagem = "pardon-me, check out your email";
			
//			scope.tipoValue = scope.tipoSnack;
		}
	}
	
	var _validSelect = function(scope, element){
		scope.msgInput = vMsg.CAMPO_OBRIGATORIO;
		if(scope.notEmpty){
			if($.isEmptyObject(scope.value) && $.isEmptyObject(scope.multValue)){
				scope.showErro = true;
			}else{
				scope.showErro = false;
			}
		}
		
	}
	var _validClickSelect = function(scope, element, item){
		if(scope.multValue){
			var itemLista = utilFunc.getItemList(item.id, scope.multValue);
			if(itemLista){
				utilFunc.removeItemList(item.id, scope.multValue);
			}else{
				scope.multValue.push(item);
			}
		}else if(scope.value){
			if(item && scope.value.id != item.id){
				if(!$.isEmptyObject(scope.value)){
					scope.idBefore = scope.value.id;
					scope.value = {};
					_validSetSelect(scope, element);
				}
				scope.idBefore = item.id;
				scope.value = item;
			}else if(!scope.notDiselected){
				scope.idBefore = item.id;
				scope.value = {};
				_validSetSelect(scope, element);
			}else{
				_validSetSelect(scope, element);
			}
		}
	}
	
	var _validSetSelect = function(scope, element, notValid){
		if(scope.multValue){
			var text = "";
			var lista = scope.multValue;
			element.find(".resultado-lista-select li").css("font-weight", "normal");
			element.find(".resultado-lista-select li i").css("display", "none");
			lista.forEach(function(item){
				element.find("#liSelect" + item.id).css("font-weight", "600");
				element.find("#liSelect" + item.id + " i").css("display", "block");
				if(text){
					text += ", ";
				}
				text += item[scope.field];
			});
			element.find(".form-control:first").val(text);
		}else{
			if($.isEmptyObject(scope.value)){
				element.find("#liSelect" + scope.idBefore).css("font-weight", "normal");
				element.find("#liSelect" + scope.idBefore + " i").css("display", "none");
				element.find(".form-control:first").val("");
			}else{
				if(scope.idBefore){
					element.find("#liSelect" + scope.idBefore).css("font-weight", "normal");
					element.find("#liSelect" + scope.idBefore + " i").css("display", "none");
					element.find(".form-control:first").val("");
				}
				element.find("#liSelect" + scope.value["id"]).css("font-weight", "600");
				element.find("#liSelect" + scope.value["id"] + " i").css("display", "block");
				element.find(".form-control:first").val(scope.value[scope.field]);
			}
			if(!notValid){
				element.find("#select" + scope.$id).prop("checked" , false);
			}
		}
		if(!notValid){
			_validSelect(scope, element);
		}
	}
	
	
	return {
		validScopes: _validScopes,
		validEmptyInputFloatMD: _validEmptyInputFloatMD,
		validValueEmptyInputFloat: _validValueEmptyInputFloat,
		validNumber: _validNumber,
		validDate: _validDate,
		validClock: _validClock,
		validCpf: _validCpf,
		validCnpj: _validCnpj,
		validEmail: _validEmail,
		validCep: _validCep,
		validMin: _validMin,
		validSnackBar: _validSnackBar,
		validCompare: _validCompare,
		validSelect: _validSelect,
		validClickSelect: _validClickSelect,
		validSetSelect: _validSetSelect
	}
	
});
// Util funções de ouvintes --------------------------------------------------------------------------------------------------
angular.module("utilService").factory("utilListener", function(utilMask, utilValid, utilDialog, utilFunc, $timeout){
	
	var _setListenerInputFloat = function(scope, element){
		if(scope.datePicker){
			utilDialog.setDatePicker(scope, element);
		}else if(scope.clockPicker){
			utilDialog.setClockPicker(scope, element);
		}
		scope.$watch('value', function() {
			utilValid.validEmptyInputFloatMD(scope);
			if(scope.notEmpty){
				utilValid.validValueEmptyInputFloat(scope, element);
			}
			//Macaras
			if(scope.maskDate){
				utilMask.maskDate(scope);
			}else if(scope.maskClock){
				utilMask.maskClock(scope);
			}else if(scope.maskCpf){
				utilMask.maskCpf(scope);
			}else if(scope.maskCnpj){
				utilMask.maskCnpj(scope);
			}else if(scope.maskCep){
				utilMask.maskCep(scope);
			}else if(scope.maskNumber){
				utilMask.maskNumber(scope);
			}else if(scope.maskMax){
				utilMask.maskMax(scope);
			}
			//Validações
			if(scope.value && scope.value.length == 10 && scope.validDate){
				utilValid.validDate(scope);
			}else if(scope.value && scope.value.length == 5 && scope.validClock){
				utilValid.validClock(scope);
			}else if(scope.value && scope.value.length == 14 && scope.validCpf){
				utilValid.validCpf(scope);
			}else if(scope.value && scope.value.length == 18 && scope.validCnpj){
				utilValid.validCnpj(scope);
			}else if(scope.value && scope.validNumber){
				utilValid.validNumber(scope);
			}else if(scope.compare){
				utilValid.validCompare(scope);
			}
			
		});
	}
	
	var _setListenerToggle = function(scope, element){
		scope.$watch('value', function() {
			if(scope.value){				
				scope.label = scope.labelTrue;
			}else{
				scope.label = scope.labelFalse;
			}
		});
	}
	
	var _setListenerCheckbox = function(scope, element){
		scope.$watch('value', function() {
			if (scope.list) {
				scope.multiple = true;
				scope.single = false;
			} else {
				scope.multiple = false;
				scope.single = true;
			}
		});
	}
	
	var _setListenerSelect = function(scope,element){
		if(scope.value){
			scope.$watch('value', function() {
				if($.isEmptyObject(scope.value)){
					scope.empty = "is-empty";
				}else{
					scope.empty = "";
					utilValid.validSetSelect(scope, element);
				}
			});
		}
		if(scope.multValue){
			scope.$watch('multValue', function() {
				if($.isEmptyObject(scope.multValue) || !scope.multValue){
					scope.empty = "is-empty";
				}else{
					scope.empty = "";
				}
				if(!scope.isFirstLoad){
					utilValid.validSetSelect(scope, element);
				}
				scope.isFirstLoad = false;
			}, true);
		}
//		}
	}
	
	
	return {
		setListenerInputFloat: _setListenerInputFloat,
		setListenerToggle: _setListenerToggle,
		setListenerCheckbox: _setListenerCheckbox,
		setListenerSelect:  _setListenerSelect
	}
});
// Util funções de eventos dos elementos --------------------------------------------------------------------------------------------
angular.module("utilService").factory("utilEvent", function(utilValid, utilDialog){
	var _onBlurInputFloat = function(scope, element){
		if(scope.value){
			if(scope.validDate){
				utilValid.validDate(scope);
			}else if(scope.validClock){
				utilValid.validClock(scope);
			}else if(scope.validCpf){
				utilValid.validCpf(scope);
			}else if(scope.validCnpj){
				utilValid.validCnpj(scope);
			}else if(scope.validEmail){
				utilValid.validEmail(scope);
			}else if(scope.validNumber){
				utilValid.validNumber(scope);
			}else if(scope.validCep){
				utilValid.validCep(scope);				
			}else if(scope.validMin){
				utilValid.validMin(scope);
			}
		}
	}
	
	var _onFocusInputFloat = function(scope, element){
//		if(scope.clockPicker){
//			utilDialog.setClockPicker(scope, element);
//		}
	}
	
	return {
		onBlurInputFloat: _onBlurInputFloat,
		onFocusInputFloat: _onFocusInputFloat
	}
});
