<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<%@ include file="/layout/include.jsp" %>
	<%@ include file="/layout/cabecalho.jsp" %>
	<title>Cadastro de Usuário</title>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/pagina/usuario.js" ></script>
</head>
<body>
	<nav class="navbar navbar-inverse">
		<div class="container-fluid">
			<!-- Brand and toggle get grouped for better mobile display -->
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed"
					data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
					aria-expanded="false">
					<span class="sr-only">Menu</span> <span
						class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
				<a class="navbar-brand texto-ativo" href="/projetoEstudo/"><i class="texto-ativo">Estudos AR Sorftwares</i></a>
			</div>
			<!-- Collect the nav links, forms, and other content for toggling -->
			<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
				<ul class="nav navbar-nav">
					<li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
						aria-expanded="false">Cadastros <span class="caret"></span></a>
						<ul class="dropdown-menu">
							<li role="separator" class="divider"></li>
							<li><a href="#">Mais Informações</a></li>
						</ul>
					</li>
				</ul>
				<form class="navbar-form navbar-left" role="search">
				</form>
				<ul class="nav navbar-nav navbar-right">
					<li><a href="javascript:history.back();">Voltar</a></li>
				</ul>
			</div><!-- /.navbar-collapse -->
		</div><!-- /.container-fluid --> 
	</nav><!-- Fim do Menu -->
	
	<div class="container-fluid">
		<div class="panel panel-primary">
			<div class="panel-heading"><b>Lista de Usuários</b></div>
			<div class="panel-body">
				<form id="form-usuario-pesquisar" method="post" >
					<input  id="pagina" type="hidden" name="pagina" value="${not empty model.pagina ? model.pagina : '1'}" /> 
						<div class="col-sm-12 form-group">
							<div class="col-sm-3">
								Nome
								<input class="form-control input-sm " type="text" name="nome" id="nome-pesquisa" />
							</div>
							<div class="col-sm-3">
								Login
								<input class="form-control input-sm " type="text" name="login" />
							</div>
							<div class="col-sm-2">
								&nbsp;
								<button type="button" class="btn btn-default btn-sm btn-block" onclick="pesquisar();">
									<i class="glyphicon glyphicon-search"></i> Pesquisar
								</button>
							</div>
							<div class="col-sm-2">
								&nbsp;
								<button id="btn-filtro" title="Filtro Usuário" type="button" class="btn btn-default btn-sm btn-block">
									<i class="glyphicon glyphicon-filter"></i> <span>Filtro</span> 
								</button>
							</div>
							<div class="col-sm-2">
								&nbsp;
								<button type="button" class="btn btn-primary btn-sm btn-block" onclick="novoUsuario();">
									<i class="glyphicon glyphicon-plus"></i> Novo 
								</button>
							</div>
						</div>
						
						<div class="col-sm-12 form-group campos-pesquisa" style="display:none;">
							<div class="col-sm-3">
								Sobre nome
								<input class="form-control input-sm " type="text" name="sobreNome" />
							</div>
							<div class="col-sm-3">
								E-mail
								<input class="form-control input-sm " type="text" name="email" />
							</div>
							<div class="col-sm-2">
								Data Inicio
								<input class="form-control input-sm data" type="text" name="dataFiltroInicio" />
							</div>
							<div class="col-sm-2">
								Data Fim
								<input class="form-control input-sm data" type="text" name="dataFiltroFim" />
							</div>
							<div class="col-sm-2">
								Ordernar Por
								<select id="sel-order-by" name="orderBy" class="col-sm-2 form-control input-sm">
									<option value="nome">Nome</option>
									<option value="sobreNome">Sobre Nome</option>
									<option value="login">Login</option>
									<option value="email">E-mail</option>
									<option value="dataNascimento">Data Nascimento</option>
								</select>
							</div>
						</div>
									
					
					<div class="col-sm-12 form-group text-right">
					</div>
					<div class="col-sm-12 form-group">
						
						<div class=" col-sm-12">
		<!-- 					<br> -->
							<table class="table table-striped table-bordered  table-hover">
								<thead>
									<tr class="bg-black">
										<th class="col20 th-info">Nome</th>
										<th class="col20 th-info">Sobre Nome</th>
										<th class="col15 th-info">Login</th>
										<th class="col25 th-info">E-mail</th>
										<th class="col10th-info">Data Nasc.</th>
										<th class="col10 text-center ">Ações</th>
									</tr>
								</thead>
								<tbody id="body-usuario">
								</tbody>
							</table>
							<div class="text-center" id="div-paginacao"></div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
	<%@ include file="/layout/rodape.jsp" %>
</body>
</html>