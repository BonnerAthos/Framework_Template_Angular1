var URL_BASE = "/projetoEstudo/rest/usuario";
var URL_PASTA_BASE = "/projetoEstudo/paginas/usuario/";
var opcoes = {pagina: 1, qtdPaginas:1,qtdVisivel: 10};
$(document).ready(function(){
//	setSelect("#sel-qtd-registros");
	//Pesquisa pela primeira vez.
	pesquisar({nome: "",qtdRegistros: 5, pagina: 1});
	
	$("#btn-filtro").click(function(){
		if($(".campos-pesquisa:visible").html()){
			$(".campos-pesquisa").slideUp(500, function(){
				$("#btn-filtro").removeClass("active");
			});
		}else{
			$(".campos-pesquisa").slideDown(500, function(){
				$("#btn-filtro").addClass("active");
			});
		}
		this.blur();
	});
	$("input").blur();
	$("#nome-pesquisa").focus();
	setMascaraDataUsuario();
});

function setMascaraDataUsuario(){
	setMascaraData(".data");
	setValidacaoData(".data");
	setDatePicker(".data");
}
		
function pesquisar(usuario){
	if(!usuario){
		usuario = parseFormToJSON("#form-usuario-pesquisar", true);
	}else{
		usuario = JSON.stringify(usuario);
	}
	ajaxJsonAguarde("#body-usuario", "POST", URL_BASE + "/paginaPaginacao/linhas-usuario", null,  usuario,
			null, null, function(retorno){
		if(retorno){
//			Seta o html retornado na div.
			setConteudo("#body-usuario", retorno, function(){
				verificarMsgRetorno(retorno);//
			});
		}
	});
}

function novoUsuario(){
	var botaoSalvar = criarbotaoDialog("Salvar", "glyphicon glyphicon-floppy-disk", "btn btn-primary", function(tela){
		salvarUsuario(tela);
	});
	ajaxJsonAguarde(null, "GET", URL_BASE + "/pagina/cadastro-usuario", null, null, null, null, function(retorno){
		showModal(retorno, "Cadastrar Usuário", [botaoCancel, botaoSalvar], "modal-lg", null, null, false);
	})
}

function salvarUsuario(tela){
	var usuario = parseFormToJSON("#form-cad-usuario");
	if(validarUsuario(usuario)){
		usuario = JSON.stringify(usuario);
		ajaxJsonAguarde(null, "POST", URL_BASE, "json", usuario, null, null, function(retorno){
			tela.close();
			verificarMsgRetorno(retorno);
			pesquisar();
			
		})
	}
}

function alterar(tela){
	var usuario = parseFormToJSON("#form-cad-usuario");
	if(validarUsuario(usuario)){
		usuario = JSON.stringify(usuario);
		ajaxJsonAguarde(null, "PUT", URL_BASE, "json", usuario, null, null, function(retorno){
			tela.close();
			verificarMsgRetorno(retorno);
			pesquisar();
		})
	}
}

function excluirUsuario(id){
	showConfirme("Deseja excluir o usuário?", "Confirmação!", "atencao", function(result){
		if(result){
			ajaxJsonAguarde(null, "DELETE", URL_BASE+"/" + id, "json", null, null, null, function(retorno){
				verificarMsgRetorno(retorno);
				pesquisar();
			})
		}
	},"Excluir", "Cancelar");
}

function iniciarEdicaoUsuario(id){
	var botaoSalvar = criarbotaoDialog("Alterar", "glyphicon glyphicon-floppy-disk", "btn btn-primary", function(tela){
		alterar(tela);
	});
	ajaxJsonAguarde(null, "GET", URL_BASE + "/pagina/cadastro-usuario/" + id, null, null, null, null, function(retorno){
		showModal(retorno, "Cadastrar Usuário", [botaoCancel, botaoSalvar], "modal-lg", null, null, false);
	})
}

function validarUsuario(usuario){
	var msg = "", numMsg = 0;
	if(!usuario.nome){
		numMsg++;
		msg += "O nome do Usuário deve ser informado!";
		msg += numMsg > 0 ? "\n" : "";
	}
	if(!usuario.email){
		numMsg++;
		msg += "O email do Usuário deve ser informado!";
		msg += numMsg > 0 ? "\n" : "";
	}
	if(!usuario.login){
		numMsg++;
		msg += "O login do Usuário deve ser informado!";
		msg += numMsg > 0 ? "\n" : "";
	}
	if(!usuario.senha){
		numMsg++;
		msg += "A senha do Usuário deve ser informada!";
		msg += numMsg > 0 ? "\n" : "";
	}else if(!usuario.confirmarSenha){
		numMsg++;
		msg += "A senha deve ser confirmada!";
		msg += numMsg > 0 ? "\n" : "";
	}else if(usuario.confirmarSenha != usuario.senha){
		numMsg++;
		msg += "A senha e a senha confirmada não conferem!";
		msg += numMsg > 0 ? "\n" : "";
	}
	
	if(numMsg > 0){
		showMsg(msg, "Validação Usuário", "error");
		return false;
	}
	return true;
}

function getCadUsuario(usuario){
	var id = "0";
	var nome = "";
	var sobreNome = "";
	if(usuario){
		if(usuario.id){id = usuario.id};
		if(usuario.nome){nome = usuario.nome};
		if(usuario.sobreNome){sobreNome = usuario.sobreNome};
	}
	var cadUsuario =	
		'<div class="container-fluid ">'
			+'<form id="form-cad-usuario">'
				+'<input type="hidden" name="id"  value="' + id + '"/>'
				+'<div class="col-sm-12 form-group">'
					+'Nome'
					+'<input class="form-control input-sm " type="text" name="nome" value="' + nome + '"/>'
				+'</div>'
				+'<div class="col-sm-12">'
					+'Sobre nome'
					+'<input class="form-control input-sm " type="text" name="sobreNome" value="' +  sobreNome +'"/>'
				+'</div>'
			+'</form>'
		+'</div>';
	return cadUsuario;
}

