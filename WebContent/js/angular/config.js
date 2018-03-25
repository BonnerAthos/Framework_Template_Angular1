var paginas = "/projetoEstudo/paginas/"
angular.module("projetoEstudos").config(function($routeProvider){
	$routeProvider.when("/cadastroUsuario", {
		templateUrl: paginas + "usuario/cadastro-usuario.html",
		controller: "usuarioCtrl"
		
	});
});