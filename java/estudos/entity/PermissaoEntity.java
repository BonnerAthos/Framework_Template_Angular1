package estudos.entity;

import estudos.entity.BaseEntity;
import java.io.Serializable;
import javax.persistence.*;

/**
 * Entity implementation class for Entity: PermissaoEntity
 *
 */
@Entity
@Table(name="Permissao")
public class PermissaoEntity extends BaseEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
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

	@Override
	public void setAtualizadoPor(UsuarioEntity usuarioEntity) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void setCriadoPor(UsuarioEntity usuarioEntity) {
		// TODO Auto-generated method stub
		
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}
	
}
