package estudos.enums;

public enum PersistencesEnum {
	POSTGRES_ESTUDOS("conexao_posgres");
	private String nome;
	
	private PersistencesEnum(String nome){
		this.nome = nome;
	}
	public String getNome(){
		return this.nome;
	}
}
