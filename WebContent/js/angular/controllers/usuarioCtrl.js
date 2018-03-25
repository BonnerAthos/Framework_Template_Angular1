angular.module("projetoEstudos").controller("usuarioCtrl",  function($scope, utilHttp, vUrlsRest, vPath, utilDialog, vMsg, utilFunc){
	$scope.titulo = "";
	$scope.estilo = "form-danger";
	$scope.teste1 = "Nome do Usuário";
	$scope.largura = "3";
	$scope.msgRetorno = "Erro!";
	$scope.usuario = {};
	$scope.usuario.data = "15/04/2016";
	$scope.usuario.setor = "almoxerifado";
	$scope.usuario.curso = "Java Programmer";
	$scope.usuario.filial = "LO";
	$scope.notificacoes = "369";
	$scope.notificacoesUsuario = 1;
	$scope.loading = false;
	$scope.loadingCicle = false;
	$scope.msgLoadings = "MSG Global!";
	$scope.filiais = [{id:1,nome:"Pernambuco"}, {id:2,nome:"Alogoas"}, {id:3,nome:"Rio de Janeiro"}, {id:4,nome:"São Paulo"},
	                  {id:5,nome:"Ceará"},{id:6,nome:"Acre"}, {id:7,nome:"Minas Gerais"}];
	$scope.selecionados = [];//[{id:5,nome:"Ceará"},{id:6,nome:"Acre"}];
	$scope.selecionado = {};//{id:3,nome:"Rio de Janeiro"};
	
	$scope.usuarioEdit = {};
	$scope.telaCadUsuario;
	
	$scope.setSelecionado = function(){
		$scope.selecionado = {id:3,nome:"Rio de Janeiro"};
	}
	$scope.setSelecionados = function(){
		$scope.selecionados = [{id:6,nome:"Acre"}, {id:7,nome:"Minas Gerais"}];
	}
	
	$scope.clicou = function(){
		utilDialog.showMsg("Testando o UI-BUTTON!");
	}
	
	$scope.mostrarLoading = function(){
		$scope.loading = !$scope.loading;
	}
	
	$scope.mostrarLoadingCicle = function(){
		$scope.loadingCicle = !$scope.loadingCicle;
	}
	
	$scope.openLoading = function(){
		utilDialog.openLoading($scope);
	}
	
	$scope.usuarioPesq = {};
	$scope.usuarios = [];
	$scope.retornoTabelaUsuario = {};
	
	
	$scope.limparFiltrosUsuario = function(){
		$scope.usuarioPesq = {};
	};
	
	$scope.limparFormUsuario = function(dialog){
		var id = null;
		$scope.senhaConfirme = "";
		if($scope.usuarioEdit.id){
			id = $scope.usuarioEdit.id;
		}
		$scope.usuarioEdit = {};
		$scope.usuarioEdit.id = id;
	};
	
	$scope.fecharTelaCadUsuario = function(){
		if($scope.telaCadUsuario){
			$scope.telaCadUsuario.close();
		}
	}
	
	$scope.confirmarExcluirUsuario= function(usuario){
		utilDialog.showConfirm(vMsg.DESEJA_EXCLUIR + ": <b>" + usuario.nome + "</b>?", null, "atencao", function(result){
			if(result){
				$scope.excluirUsuario(usuario.id);
			}
		});
	};
	
//	Funções do CRUD ----------------------------------
	$scope.carregarUsuario = function(){
		$scope.loadTable = true;
		utilHttp.ajax("POST", vUrlsRest.USUARIO_FILTRO, $scope.usuarioPesq, function(result) {
			$scope.retornoTabelaUsuario = result.data;
			$scope.loadTable = false;
		});
	};
	
	$scope.excluirUsuario = function(id){
		utilDialog.openLoading($scope, vMsg.AGUARDE_SALVANDO_ALTERACOES);
		utilHttp.ajax("DELETE", vUrlsRest.USUARIO + "/" + id, null, $scope.posSalvar);
	}
	
	$scope.posSalvar = function(retorno){
		$scope.fecharTelaCadUsuario();
		utilFunc.getMsgResult(retorno.data)
		$scope.carregarUsuario();
	}
	
	$scope.iniciarEditarUsuario = function(usuario){
		$scope.telaCadUsuario = utilDialog.showModal($scope, null, vMsg.CADASTRO_USUARIO, null, null, null , null, false, vPath.PAGINAS + "/usuario/cadastro-usuario.html")
		$scope.usuarioEdit = usuario;
		$scope.usuarioEdit.senhaConfirme = usuario.senha;
	}
	
	$scope.novoUsuario = function(){
		$scope.telaCadUsuario = utilDialog.showModal($scope, null, vMsg.CADASTRO_USUARIO, null, null, null , null, false, vPath.PAGINAS + "/usuario/cadastro-usuario.html")
		$scope.usuarioEdit = {};
	}
	
	$scope.salvarUsuario = function(dialog){
		var TYPE = "POST", msg; 
		if($scope.usuarioEdit.id){TYPE = "PUT";}
		utilDialog.openLoading($scope, vMsg.AGUARDE_SALVANDO_ALTERACOES);
		utilHttp.ajax(TYPE, vUrlsRest.USUARIO, $scope.usuarioEdit, $scope.posSalvar);
	};
	
	$scope.alterarUsuario = function(dialog){
		utilDialog.openLoading($scope, "Alterando usuário");
		utilHttp.ajax("PUT", vUrlsRest.USUARIO, $scope.usuarioEdit, function(result) {
			dialog.close();
			utilDialog.closeLoading();
			$scope.apply();
			$scope.carregarUsuario();
		});
	};
	var chatClient = null;
	$scope.enviarMsg = function(){
		console.log("Enviar Msg");
		var path = window.location.pathname;
		var contextoWeb = path.substring(0, path.indexOf('/', 1));
        var endPointURL = "ws://" + window.location.host + contextoWeb + "/notificationController";
		if(!chatClient){
			console.log("Chamou a conexao!");
			chatClient = new WebSocket(endPointURL);
			 chatClient.onmessage = function (event) {
                 console.log(event);
             };
		}
		if(chatClient.readyState == 1){
			var obj = {tipo: "novoUsuario",idUsuario: "1", label:"Mensagem teste!", text: "Texto da mensagem"};
			obj = JSON.stringify(obj);
			chatClient.send(obj);
		}
		if($scope.notificacoesUsuario == 0){
			$scope.notificacoesUsuario = 1;
		}else if($scope.notificacoesUsuario == 1){
			$scope.notificacoesUsuario = 0;
		}
		
		
	}
	
	
	$scope.items = [{id:1,name:"Java"},{id:2,name:"Python"},{id:3,name:"JQuery"},{id:4,name:"E-Mail"}];
    $scope.selected = [];
	
});