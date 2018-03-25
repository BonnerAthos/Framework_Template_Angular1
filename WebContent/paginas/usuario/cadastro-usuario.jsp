<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<%@ include file="/layout/include.jsp" %>
	<%@ include file="/layout/cabecalho.jsp" %>
	<script type="text/javascript">
		$(document).ready(function(){
			var state = true;
			if($("#is-ativo-name").val() == 'false'){
				state = false;
			}
			setSwitch("#is-ativo", state, function(event, status){
				if(status){
					$("#is-ativo-name").val(true);
				}else{
					$("#is-ativo-name").val(false);
				}
			}, "Ativo", "Desativado", "sucesso", "error", "sm");
			setMascaraData("#data-nascimento");
			setValidacaoData("#data-nascimento");
			setDatePicker("#data-nascimento");
			if($("#senha").val()){
				$("#confirmarSenha").val($("#senha").val())
			}
			$("input").blur();
			$("#nome").focus();
		});
	</script>
<title>Cadastro Usuário</title>
</head>
<body>
	<div class="container-fluid">
		<form id="form-cad-usuario" method="post" >
			<input  type="hidden"  name="id" value="${not empty model.objBean.id ? model.objBean.id : ''  }"/> 
			<input  id="is-ativo-name" type="hidden" name="ativo"  value="${not empty model.objBean.ativo ? model.objBean.ativo : 'false'  }"/> 
			<div class="col-sm-12 form-group">
				<div class="col-sm-3">
					Nome
					<input id="nome" class="form-control input-sm " type="text" name="nome"  value="${not empty model.objBean.nome? model.objBean.nome : ''  }"/>
				</div>
				<div class="col-sm-4">
					Sobre nome
					<input class="form-control input-sm " type="text" name="sobreNome" value="${not empty model.objBean.sobreNome ? model.objBean.sobreNome : ''  }"/>
				</div>
				<div class="col-sm-5">
					Email
					<input class="form-control input-sm " type="text" name="email" value="${not empty model.objBean.email ? model.objBean.email : ''  }"/>
				</div>
			</div>
<!-- 			Segunda linha -->
			<div class="col-sm-12 form-group">
				<div class="col-sm-3">
					Login
					<input class="form-control input-sm " type="text" name="login" value="${not empty model.objBean.login ? model.objBean.login : ''  }"/>
				</div>
				<div class="col-sm-2">
					senha
					<input class="form-control input-sm " id="senha" type="password" name="senha" value="${not empty model.objBean.senha ? model.objBean.senha : ''  }"/>
				</div>
				<div class="col-sm-2">
					Confirmar Senha
					<input class="form-control input-sm " id="confirmarSenha" type="password" name="confirmarSenha" />
				</div>
				
				<div class="col-sm-2">
					Data Nascimento
					<input id="data-nascimento" class="form-control input-sm " type="text" name="dataNascimento"  value="<fmt:formatDate value='${model.objBean.dataNascimento}' pattern='dd/MM/yyyy' />" />
				</div>
				<div class="col-sm-3" style="padding-top: 20px;">
					&nbsp;
					<input id="is-ativo" type="checkbox"><br><br>
				</div>
			</div>
		</form>
	</div>
</body>
</html>