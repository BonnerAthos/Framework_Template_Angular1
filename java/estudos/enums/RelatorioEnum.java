package estudos.enums;

public enum RelatorioEnum {
	USUARIO_GERAL("usuarioRelatorioGeral.jasper");
	
	private String nome;
	RelatorioEnum(String nome){
		this.nome = nome;
	}
	public String getNome(){
		return nome;
	}
}
