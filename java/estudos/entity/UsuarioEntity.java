package estudos.entity;

import java.util.Calendar;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

/**
 * Entity implementation class for Entity: UsuarioEntity
 *
 */
@Entity
@Table(name="Usuario")
public class UsuarioEntity extends BaseEntity {
//	Atributos
	private static final long serialVersionUID = 1L;
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nome;
	@Column(name="sobre_nome", nullable=false, length=100)
	private String sobreNome;
	@Column(nullable=false, unique= true,length=150)
	private String email;
	@Column(nullable=false, length=50)
	private String senha;
	@Column(nullable=false, length=150, unique=true)
	private String login;
	@Column(name="data_nascimento")
	@Temporal(TemporalType.DATE)
	private Date dataNascimento;
	@Column(name="is_ativo")
	private boolean isAtivo;
	@Transient
	private Date dataFiltroInicio;
	@Transient
	private Date dataFiltroFim;
	
	//Auditoria
	@JoinColumn(name = "criado_por", referencedColumnName = "ID")
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	public UsuarioEntity criadoPor;
	@Column(name="criado_em")
	@Temporal(TemporalType.TIMESTAMP)
	private Date criadoEm;
	@JoinColumn(name = "atualizado_por", referencedColumnName = "ID")
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private UsuarioEntity atualizadoPor; 
	@Column(name="atualizado_em")
	@Temporal(TemporalType.TIMESTAMP)
	private Date atualizadoEm;
	
//	Métodos
	@PrePersist
	public void antesDeInserir(){
		this.criadoEm = Calendar.getInstance().getTime();
	}
	
	@PreUpdate
	public void antesDeAtualizar(){
		this.atualizadoEm = Calendar.getInstance().getTime();
	}

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

	public void setDataNascimento(Date dataNascimento) {
		this.dataNascimento = dataNascimento;
	}

	public boolean isAtivo() {
		return isAtivo;
	}

	public void setAtivo(boolean isAtivo) {
		this.isAtivo = isAtivo;
	}

	public UsuarioEntity getCriadoPor() {
		return criadoPor;
	}

	public void setCriadoPor(UsuarioEntity criadoPor) {
		this.criadoPor = criadoPor;
	}

	public Date getCriadoEm() {
		return criadoEm;
	}

	public void setCriadoEm(Date criadoEm) {
		this.criadoEm = criadoEm;
	}

	public UsuarioEntity getAtualizadoPor() {
		return atualizadoPor;
	}

	public void setAtualizadoPor(UsuarioEntity atualizadoPor) {
		this.atualizadoPor = atualizadoPor;
	}

	public Date getAtualizadoEm() {
		return atualizadoEm;
	}

	public void setAtualizadoEm(Date atualizadoEm) {
		this.atualizadoEm = atualizadoEm;
	}

	public Date getDataFiltroInicio() {
		return dataFiltroInicio;
	}

	public void setDataFiltroInicio(Date dataFiltroInicio) {
		this.dataFiltroInicio = dataFiltroInicio;
	}

	public Date getDataFiltroFim() {
		return dataFiltroFim;
	}

	public void setDataFiltroFim(Date dataFiltroFim) {
		this.dataFiltroFim = dataFiltroFim;
	}
	
	
	
}
