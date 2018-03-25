package estudos.enums;

public enum MSGSocket {
	QTD_USUARIOS("qtdUsuarios");
	private String nome;
	
	private MSGSocket(String nome){
		this.nome = nome;
	}
	public String getNome(){
		return this.nome;
	}
}
