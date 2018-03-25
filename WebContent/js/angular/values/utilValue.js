var pathBase = "/projetoEstudo/";

angular.module("utilValue",[]);

angular.module("utilValue").value("vBase",{
	
});

angular.module("utilValue").value("vUrlsRest",{
	USUARIO: pathBase + "rest/usuario",
	USUARIO_FILTRO: pathBase + "rest/usuario/filtro",
	USUARIO_PAGINATION: pathBase + "rest/usuario/paginacao",
	CLIENTE_FILTRO: pathBase + "rest/cliente/filtro",
	CLIENTE: pathBase + "rest/cliente"
});

angular.module("utilValue").value("vPath",{
	ANGULAR: pathBase + "js/angular/",
	VIEWS: pathBase + "js/angular/views/",
	SERVICES: pathBase + "js/angular/services/",
	VALUES: pathBase + "js/angular/values/",
	CONTROLLES: pathBase + "js/angular/controllers/",
	DIRECTIVES: pathBase + "js/angular/directives/",
	PAGINAS: pathBase + "paginas/"
});

angular.module("utilValue").value("vMsg",{
	DATA_INVALIDA: "Data inválida!" ,
	HORA_INVALIDA: "Hora inválida!",
	APENAS_NUMERO: "Informe apenas números!",
	CPF_INVALIDO: "CPF inválido!",
	CNPJ_INVALIDO: "CNPJ inválido!",
	EMAIL_INVALIDO: "Email inválido!",
	CEP_INVALIDO: "CEP inválido!",
	SELECIONE_ITEM: "Selecione um item",
	CAMPO_OBRIGATORIO: "Campo obrigatório!",
	MINIMO: "Mínimo: ",
	O_CAMPO: "O campo: ",
	NO_CAMPO: "No campo: ",
	E_OBRIGATORIO: "é obrigatório!",
	E_OBRIGATORIA: "é obrigatória!",
	E_INVALIDA: "é inválida!",
	E_INVALIDO: "é inválido!",
	O_EMAIL: "O E-mail",
	O_CNPJ: "O CNPJ",
	O_CPF: "O CPF",
	O_CEP: "O CEP",
	A_DATA: "A data",
	A_HORA: "A hora",
	INFORMADA_CAMPO: "informada no campo: ",
	INFORMADO_CAMPO: "informada no campo: ",
	CARACTERES: "caractere(s)!",
	TEM_TER_NO_MINIMO: "tem que ter no mínimo",
	VALIDACAO: "Validação!",
	REGISTROS_PAGINA: "Registros por página: ",
	DE: " de ",
	SEM_REGISTROS: "Sem registros.",
	DELETE: "Excluir",
	EDITAR: "Editar",
	AGUARDE_CARREGANDO: "Aguarde... Carregando: ",
	AGUARDE_SALVANDO_ALTERACOES: "Aguarde... Salvando as alterações.",
	CADASTRO_USUARIO: "Cadastro de Usuário",
	DESEJA_EXCLUIR: "Deseja excluir",
	DEVE_SER_IGUAL: "Deve ser igual a: ",
	FILTRAR: "Filtrar"
});

angular.module("utilValue").value("vStatus",{
	statusDefault: "Erro ao tentar conectar com servidor.",
	S302: "O recurso foi movido temporariamente para outra URI.",
	S304: "O recurso não foi alterado.",
	S400: "Os dados da requisição não são válidos.",
	S401: "A URI especificada exige autenticação do cliente. O cliente pode tentar fazer novas requisições.",
	S403: "O servidor entende a requisição, mas se recusa em atendê-la. O cliente não deve tentar fazer uma nova requisição.",
	S404: "O servidor não encontrou nenhuma URI correspondente.",
	S405: "O método especificado na requisição não é válido na URI. A resposta deve incluir um cabeçalho Allow com uma lista dos métodos aceitos.",
	S410: "O recurso solicitado está indisponível mas seu endereço atual não é conhecido.",
	S500: "O servidor não foi capaz de concluir a requisição devido a um erro inesperado.",
	S502: "O servidor, enquanto agindo como proxy ou gateway, recebeu uma resposta inválida do servidor upstream a que fez uma requisição.",
	S503: "O servidor, enquanto agindo como proxy ou gateway, recebeu uma resposta inválida do servidor upstream a que fez uma requisição.",
});

