package estudos.servico;

import estudos.bean.UsuarioBean;
import estudos.dao.UsuarioDAO;
import estudos.entity.UsuarioEntity;
import estudos.util.RegraException;
import estudos.util.Util;

public class UsuarioService extends BaseService<UsuarioBean, UsuarioEntity> {
	UsuarioDAO usuarioDAO;
	
	public UsuarioService(String persistenceUnitName) {
		super(persistenceUnitName);
	}

	@Override
	public UsuarioDAO getDAO() {
		if(usuarioDAO == null){
			usuarioDAO  = new UsuarioDAO(persistenceUnitName);
		}
		return usuarioDAO;
	}

	@Override
	public UsuarioBean parseBean(UsuarioEntity usuarioEntity, UsuarioBean usuarioTO) {
		if(usuarioEntity != null){
			if(usuarioTO == null){
				usuarioTO = new UsuarioBean();
			}
			usuarioTO.setId(usuarioEntity.getId());
			usuarioTO.setNome(usuarioEntity.getNome());
			usuarioTO.setSobreNome(usuarioEntity.getSobreNome());
			usuarioTO.setEmail(usuarioEntity.getEmail());
			usuarioTO.setLogin(usuarioEntity.getLogin());
			usuarioTO.setSenha(usuarioEntity.getSenha());
			usuarioTO.setDataNascimento(usuarioEntity.getDataNascimento());
			usuarioTO.setAtivo(usuarioEntity.isAtivo());
			usuarioTO.setDataFiltroInicio(usuarioEntity.getDataFiltroInicio());
			usuarioTO.setDataFiltroFim(usuarioEntity.getDataFiltroFim());
		}
		return usuarioTO;
	}

	@Override
	public UsuarioEntity parseEntity(UsuarioBean usuarioTO, UsuarioEntity usuarioEntity) {
		if(usuarioTO != null){
			if(usuarioEntity == null){
				usuarioEntity = new UsuarioEntity();
			}
			usuarioEntity.setId(usuarioTO.getId());
			usuarioEntity.setNome(usuarioTO.getNome());
			usuarioEntity.setSobreNome(usuarioTO.getSobreNome());
			usuarioEntity.setEmail(usuarioTO.getEmail());
			usuarioEntity.setLogin(usuarioTO.getLogin());
			usuarioEntity.setSenha(usuarioTO.getSenha());
			usuarioEntity.setDataNascimento(usuarioTO.getDataNascimento());
			usuarioEntity.setAtivo(usuarioTO.isAtivo());
			usuarioEntity.setDataFiltroInicio(usuarioTO.getDataFiltroInicio());
			usuarioEntity.setDataFiltroFim(usuarioTO.getDataFiltroFim());
		}
		return usuarioEntity;
	}

	@Override
	public void validarBean(UsuarioBean bean) throws RegraException {
		if(bean == null){
			getMensagens().add(Util.getValueProperties("Usuario.obrigatorio", Util.VALIDATION_MESSAGE_PT_BR));
		}
		if(!Util.isNotVazio(bean.getSobreNome())){
			getMensagens().add(Util.getValueProperties("Usuario.nomeObrigatorio", Util.VALIDATION_MESSAGE_PT_BR));
		}
		if(!Util.isNotVazio(bean.getEmail())){
			getMensagens().add(Util.getValueProperties("Usuario.emailObrigatorio", Util.VALIDATION_MESSAGE_PT_BR));
		}
		if(!Util.isNotVazio(bean.getLogin())){
			getMensagens().add(Util.getValueProperties("Usuario.loginObrigatorio", Util.VALIDATION_MESSAGE_PT_BR));
		}
		if(!Util.isNotVazio(bean.getSenha())){
			getMensagens().add(Util.getValueProperties("Usuario.senhaObrigatorio", Util.VALIDATION_MESSAGE_PT_BR));
		}
		lancarErrorExistentesNasMensagens();
	}
}
