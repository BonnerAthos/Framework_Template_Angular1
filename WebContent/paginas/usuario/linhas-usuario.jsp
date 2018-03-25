<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<c:if test="${model.listaBeans != null}">
	<c:forEach var="usuario" items="${model.listaBeans}" varStatus="index">
		<tr class=>
			<td>${not empty usuario.nome ? usuario.nome : ""}</td>
			<td>${not empty usuario.sobreNome ? usuario.sobreNome : ""}</td>
			<td>${not empty usuario.login ? usuario.login : ""}</td>
			<td>${not empty usuario.email ? usuario.email : ""}</td>
			<td class="text-center"><fmt:formatDate value="${usuario.dataNascimento}" pattern="dd/MM/yyyy"  /></td>
			<td class="text-center">
				<button type="button" title="Editar Usuário" onclick="iniciarEdicaoUsuario(${not empty usuario.id ? usuario.id : '0'});" class="btn btn-sm btn-default">
					<i class="glyphicon glyphicon-edit"></i>
				</button>&nbsp;
				<button type="button" title="Excluir Usuário" onclick="excluirUsuario(${not empty usuario.id ? usuario.id : '0'});" class="btn btn-sm btn-default">
					<i class="glyphicon glyphicon-remove"></i>
				 </button>
			</td>
		</tr>
	</c:forEach>
	<c:if test="${model.listaBeans.size() == 0}">
		<tr class="text-center">
			<th  class="text-center"  colspan="6"> Nenhum usuário encontrado. </th>
		</tr>
	</c:if>
</c:if>
<input  id="qtdPaginas" type="hidden" name="qtdPaginas" value="${not empty model.qtdPaginas ? model.qtdPaginas : '1'}" /> 
<input  id="quantidadeRegistros" type="hidden"  value="${not empty model.qtdRegistros ? model.qtdRegistros : '1'}" /> 
<input  id="totalRegistros" type="hidden"  value="${not empty model.totalRegistros ? model.totalRegistros : '1'}" /> 

<!-- Após carregar a página -->
<script type="text/javascript">
	$(document).ready(function(){
		setPaginacao("#div-paginacao", parseInt($("#pagina").val()), parseInt($("#qtdPaginas").val()),
				parseInt($("#quantidadeRegistros").val()), parseInt($("#totalRegistros").val()),function(event, pagina){
			$("#pagina").val(pagina);
			pesquisar();
		});
	});
</script>
