package estudos.bean;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;

public class EmailBean extends BaseBean implements Serializable{
	
	private int idEmail;
	private String smtp;
	private String porta;
	private boolean ssl;
	private boolean starTLS;
	private String login;
	private String senha;
	private String emailRemetente;
	private boolean debug = false;
	private String assunto;
	private StringBuilder mensagem;
	private String destinatario;
	private String caminhoAnexo;
	private Collection<AnexoBean> anexos = null; 
	private String imgEmbutida = "";
	
	public String getSmtp() {
		return smtp;
	}

	public void setSmtp(String smtp) {
		this.smtp = smtp;
	}

	public String getPorta() {
		return porta;
	}

	public void setPorta(String porta) {
		this.porta = porta;
	}

	public boolean isSsl() {
		return ssl;
	}

	public void setSsl(boolean ssl) {
		this.ssl = ssl;
	}

	public boolean isStarTLS() {
		return starTLS;
	}

	public void setStarTLS(boolean starTLS) {
		this.starTLS = starTLS;
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public String getEmailRemetente() {
		return emailRemetente;
	}

	public void setEmailRemetente(String emailRemetente) {
		this.emailRemetente = emailRemetente;
	}

	public boolean isDebug() {
		return debug;
	}

	public void setDebug(boolean debug) {
		this.debug = debug;
	}

	public String getAssunto() {
		return assunto;
	}

	public void setAssunto(String assunto) {
		this.assunto = assunto;
	}

	public StringBuilder getMensagem() {
		return mensagem;
	}

	public void setMensagem(StringBuilder mensagem) {
		this.mensagem = mensagem;
	}

	public String getDestinatario() {
		return destinatario;
	}

	public void setDestinatario(String destinatario) {
		this.destinatario = destinatario;
	}

	public String getCaminhoAnexo() {
		return caminhoAnexo;
	}

	public void setCaminhoAnexo(String caminhoAnexo) {
		this.caminhoAnexo = caminhoAnexo;
	}

	public Collection<AnexoBean> getAnexos() {
		if(anexos == null){
			anexos = new ArrayList<AnexoBean>();
		}
		return anexos;
	}

	public void setAnexos(Collection<AnexoBean> anexos) {
		this.anexos = anexos;
	}

	public String getImgEmbutida() {
		return imgEmbutida;
	}

	public void setImgEmbutida(String imgEmbutida) {
		this.imgEmbutida = imgEmbutida;
	}

	public int getIdEmail() {
		return idEmail;
	}

	public void setIdEmail(int idEmail) {
		this.idEmail = idEmail;
	}

	@Override
	public Long getId() {
		return null;
	}

	@Override
	public void setId(Long id) {
	}
}
