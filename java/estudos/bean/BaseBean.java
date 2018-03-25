package estudos.bean;

import java.io.Serializable;
import java.util.Date;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

import estudos.entity.UsuarioEntity;

@XmlRootElement
public abstract class BaseBean implements Serializable {
	private static final long serialVersionUID = 1L;
	private UsuarioEntity criadoPor;
	private Date criadoEm;
	private UsuarioEntity atualizadoPor; 
	private Date atualizadoEm;
	private int pagina;
	private int qtdRegistros;
	private String ordem;
	private boolean crescente;

	public abstract Long getId();

	public abstract void setId(Long id);

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

	public int getPagina() {
		return pagina;
	}

	public void setPagina(int pagina) {
		this.pagina = pagina;
	}

	public int getQtdRegistros() {
		return qtdRegistros;
	}

	public void setQtdRegistros(int qtdRegistros) {
		this.qtdRegistros = qtdRegistros;
	}

	public String getOrdem() {
		return ordem;
	}

	public void setOrdem(String ordem) {
		this.ordem = ordem;
	}

	public boolean isCrescente() {
		return crescente;
	}

	public void setCrescente(boolean crescente) {
		this.crescente = crescente;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
		
}
