$(document).ready(function(){
// 			Dosaboard ***********************************************************************
	setSwitch("#teste",true, function(event, state){
		if(state){
			showMsg("Estamos em Construção!", "Atenção!", "primario", "sm");
		}else{
			showMsg("Estamos em Construção!", "Atenção!", "error", "sm");
		}
	}, "Ligado", "Desligado", "primario","error", "xs");	
	setValidacaoCPF("#cpf");
	setMascaraCPF("#cpf");
	setValidacaoHora("#hora");
	setClockPicker("#hora");
	setMascaraData("#data");
	setMascaraHora("#hora");
	setValidacaoData("#data");
	setDatePicker("#data");
	setSelect("#selecao", function(data){
		showMsg("Você selecionou: " + $(this).find(":selected").text(), null, "atencao");
	},[{id:1,text:"Rogerio"},{id:2,text:"Athos"}, {id:1,text:"Rafaele"},{id:2,text:"Claudiana"}],
	"Selecione um dos");''
	setMascaraMoeda("#moeda", true, true);
	setSelect("#sel-relatorio");
	setPaginacao("#paginacao", 1, 30, 5, function(event, pagina){
		showMsg("Pagina: " + pagina, "Paginação!", "", largura)
	});
});
function gerarRelatorio(){
	window.open("/projetoEstudo/rest/usuario/relatorioGeral/" + $("#sel-relatorio").find(":selected").val());
}