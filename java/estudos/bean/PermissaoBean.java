package estudos.bean;

public class PermissaoBean extends BaseBean {
	private static final long serialVersionUID = 1L;
	private Long id;
	private String nome;
	
	@Override
	public Long getId() {
		return this.id;
	}

	@Override
	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}
}
