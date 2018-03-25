package estudos.entity;

import java.io.Serializable;

public abstract class BaseEntity implements Serializable{
//	Atributos
	private static final long serialVersionUID = 1L;
	
	public abstract Long getId();
	
	public abstract void setId(Long id);
	
	public abstract void setAtualizadoPor(UsuarioEntity usuarioEntity);
	public abstract void setCriadoPor(UsuarioEntity usuarioEntity);
}
