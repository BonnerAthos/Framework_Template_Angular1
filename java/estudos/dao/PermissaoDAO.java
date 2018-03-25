package estudos.dao;

import java.util.List;

import estudos.entity.PermissaoEntity;
import estudos.util.RegraException;

public class PermissaoDAO extends BaseDAO<PermissaoEntity> {

	public PermissaoDAO(String persistenceUnitName) {
		super(persistenceUnitName);
	}

	@Override
	public List<PermissaoEntity> listarPorFiltro(PermissaoEntity model, int inicio, int quantidadeRegistros,
			String ordem, boolean crescente) throws RegraException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int contarPorFiltro(PermissaoEntity model) throws RegraException {
		// TODO Auto-generated method stub
		return 0;
	}

}
