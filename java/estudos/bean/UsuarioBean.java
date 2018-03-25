package estudos.bean;

import java.io.Serializable;
import java.util.Date;

import javax.xml.bind.annotation.XmlRootElement;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
@XmlRootElement(name="usuario")
@JsonIgnoreProperties(ignoreUnknown=true)
public class UsuarioBean extends BaseBean implements Serializable{
//	Atributos
	private static final long serialVersionUID = 1L;
	private Long id;
	private String nome;
	private String sobreNome;
	private String email;
	private String senha;
	private String login;
	private Date dataNascimento;
	private boolean ativo;
	private Date dataFiltroInicio;
	private Date dataFiltroFim;
	
//	Métodos
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getSobreNome() {
		return sobreNome;
	}
	public void setSobreNome(String sobreNome) {
		this.sobreNome = sobreNome;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getSenha() {
		return senha;
	}
	public void setSenha(String senha) {
		this.senha = senha;
	}
	public String getLogin() {
		return login;
	}
	public void setLogin(String login) {
		this.login = login;
	}
	public Date getDataNascimento() {
		return dataNascimento;
	}
	@JsonFormat(pattern="dd/MM/yyyy", locale = "pt-BR", timezone = "Brazil/East")
	public void setDataNascimento(Date dataNascimento) {
		this.dataNascimento = dataNascimento;
	}
	public boolean isAtivo() {
		return ativo;
	}
	public void setAtivo(boolean ativo) {
		this.ativo = ativo;
	}
	
	public Date getDataFiltroInicio() {
		return dataFiltroInicio;
	}
	@JsonFormat(pattern="dd/MM/yyyy", locale = "pt-BR", timezone = "Brazil/East")
	public void setDataFiltroInicio(Date dataFiltroInicio) {
		this.dataFiltroInicio = dataFiltroInicio;
	}
	public Date getDataFiltroFim() {
		return dataFiltroFim;
	}
	@JsonFormat(pattern="dd/MM/yyyy", locale = "pt-BR", timezone = "Brazil/East")
	public void setDataFiltroFim(Date dataFiltroFim) {
		this.dataFiltroFim = dataFiltroFim;
	}
	
	
	
	
}
