<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<div class="col-sm-12">
	<c:if test="${erros.size() > 0}">
		<c:forEach items="${erros}" var="erro">
			<c:set var="erroTrim" value="${fn:trim(erro)}" />
			<c:if test="${erroTrim != ''}">
				<div class="alert alert-danger alert-dismissible fade in" role="alert">
 					<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
 					<strong>${erro}</strong> 
			</div>
			</c:if>
		</c:forEach>
	</c:if>
	<c:if test="${mensagens.size() > 0}">
		<c:forEach items="${mensagens}" var="msg">
			<c:set var="msgTrim" value="${fn:trim(msg)}" />
			<c:if test="${msgTrim != ''}">
				<div class="alert alert-success alert-dismissible fade in" role="alert">
	 					<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
	 					<strong>${msg}</strong> 
				</div>
			</c:if>
		</c:forEach>
	</c:if>
</div>