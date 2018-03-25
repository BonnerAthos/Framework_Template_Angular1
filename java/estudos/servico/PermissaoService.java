package estudos.servico;

import estudos.bean.PermissaoBean;
import estudos.dao.BaseDAO;
import estudos.dao.PermissaoDAO;
import estudos.entity.PermissaoEntity;
import estudos.util.RegraException;

public class PermissaoService extends BaseService<PermissaoBean, PermissaoEntity> {
	
	PermissaoDAO permissaoDAO;
	
	public PermissaoService(String persistenceUnitName) {
		super(persistenceUnitName);
	}

	@Override
	public BaseDAO<PermissaoEntity> getDAO() {
		if(permissaoDAO == null){
			permissaoDAO = new PermissaoDAO(persistenceUnitName);
		}
		return permissaoDAO;
	}

	@Override
	public PermissaoBean parseBean(PermissaoEntity entity, PermissaoBean bean) {
		if(bean == null){
			bean = new PermissaoBean();
		}
		bean.setId(entity.getId());
		bean.setNome(entity.getNome());
		return bean;
	}

	@Override
	public PermissaoEntity parseEntity(PermissaoBean bean, PermissaoEntity entity) {
		if(entity == null){
			entity = new PermissaoEntity();
		}
		entity.setId(bean.getId());
		entity.setNome(bean.getNome());
		return entity;
	}

	@Override
	public void validarBean(PermissaoBean bean) throws RegraException {
		
		
	}


}
