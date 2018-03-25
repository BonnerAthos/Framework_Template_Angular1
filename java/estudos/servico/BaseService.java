package estudos.servico;

import java.lang.reflect.ParameterizedType;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

import estudos.bean.BaseBean;
import estudos.dao.BaseDAO;
import estudos.entity.BaseEntity;
import estudos.util.RegraException;
import estudos.util.Util;

public abstract class BaseService<B extends BaseBean, E extends BaseEntity> {
	protected String persistenceUnitName;
//	Mensagem para ser usada no método lancarErrorExistentesNasMensagens e para retorna várias mensagens.
	private List<String> mensagens;
//	Método que será implementado na classe filha
	public abstract BaseDAO<E> getDAO();
	
	private Class<B> classeTO;
	/**
	 * Método que passa um objeto Entity para TO.
	 * @param Entity - Objeto de pesistencia.
	 * @param TO - Objeto Transferência(usado em Views).
	 * @return T
	 */
	public abstract B parseBean(E entity, B bean);
	/**
	 * Método que passa um objeto TO para Entity
	 * @param to - Objeto de Tranferência 
	 * @param Entity - Objeto de tranferencia.
	 * @return E 
	 */
	public abstract E parseEntity(B bean, E entity);
	/**
	 * Objebean responsavel pela validação do bean.
	 * @param bean
	 */
	public abstract void validarBean(B bean) throws RegraException;
	
	
	
	public BaseService(String persistenceUnitName) {
		this.persistenceUnitName = persistenceUnitName;
		this.classeTO = (Class<B>) ((ParameterizedType) this.getClass().getGenericSuperclass()).getActualTypeArguments()[0];
	}
	
	
	public List<B> listar(int pagina, int quantidadeRegistros) throws RegraException{
		List<E> listaEntity = null;
		List<B> listaBean = new ArrayList<>();
		B to;
		int inicio = (pagina - 1) * quantidadeRegistros;
		listaEntity = getDAO().listar(inicio, quantidadeRegistros, "id", true);
		if(listaEntity != null){
			for(E Entity : listaEntity){
				to = parseBean(Entity, null);
				listaBean.add(to);
			}
		}
		return listaBean;
	}

	public List<B> listar(int pagina, int quantidadeRegistros, String ordem, boolean crescente) throws RegraException{
		List<E> listaEntity = null;
		List<B> listaBean = new ArrayList<>();
		B to;
		if(quantidadeRegistros == 0){
			Util.lancarError("A quantidade de registros deve ser infomada!");
		}
		int inicio = (pagina - 1) * quantidadeRegistros;
		listaEntity = getDAO().listar(inicio, quantidadeRegistros, ordem, crescente);
		if(listaEntity != null){
			for(E Entity : listaEntity){
				to = parseBean(Entity, null);
				listaBean.add(to);
			}
		}
		return listaBean;
	}
	
	public List<B> listar(B objBean) throws RegraException{
		System.out.println("passou no listar BaseService");
		List<E> listaEntity = null;
		List<B> listaTO = new ArrayList<>();
		B to;
		E Entity = null;
		if(objBean != null){
			Entity = parseEntity(objBean, null);
		}
		
		int inicio = 0;
		if(objBean.getPagina() > 0){
			inicio = (objBean.getPagina() - 1) * objBean.getQtdRegistros();
		}
		System.out.println("antes do listar do DAO");
		listaEntity = getDAO().listarPorFiltro(Entity, inicio, objBean.getQtdRegistros(), objBean.getOrdem(), objBean.isCrescente());
		if(listaEntity != null){
			for(E m : listaEntity){
				to = parseBean(m, null);
				listaTO.add(to);
			}
		}
		return listaTO;
	}

	public List<B> listarTudo(String ordem, boolean crescente) throws RegraException{
		List<E> listaEntity = null;
		List<B> listaTO = new ArrayList<>();
		B to;
		listaEntity = getDAO().listarTudo(ordem, crescente);
		if(listaEntity != null){
			for(E Entity : listaEntity){
				to = parseBean(Entity, null);
				listaTO.add(to);
			}
		}
		return listaTO;
	}
	
	public List<B> listarTudo() throws RegraException{
		List<E> listaEntity = null;
		List<B> listaTO = new ArrayList<>();
		B to;
		listaEntity = getDAO().listarTudo();
		if(listaEntity != null){
			for(E Entity : listaEntity){
				to = parseBean(Entity, null);
				listaTO.add(to);
			}
		}
		return listaTO;
	}
	
	public int contarPorfiltro(B to) throws RegraException{
		E Entity = null;
		if(to != null){
			Entity = parseEntity(to, Entity);
		}
		return getDAO().contarPorFiltro(Entity);
	}
	
	public int contar() throws RegraException{
		return getDAO().contar();
	}
	
	public Long salvar(B bean) throws RegraException{
		Long id;
		validarBean(bean);
		E entity = parseEntity(bean, null); 
		entity.setCriadoPor(bean.getCriadoPor());
		id = getDAO().salvar(entity);
		getDAO().commit();
		return id;
	}
	
	public Long alterar(B bean) throws RegraException{
		Long id = 0L;
		validarBean(bean);
		E entityFind = localizar(bean.getId());
		if(entityFind == null){
			Util.lancarError(Util.cortarDaStringAte(bean.getClass().getSimpleName(), "Entity") + " n�o existe!");
		}
		E Entity = parseEntity(bean, null);
		entityFind = Entity;
		entityFind.setAtualizadoPor(bean.getAtualizadoPor());
		id = getDAO().alterar(entityFind);
		getDAO().commit();
		return id;
	}
	
	public void excluir(Long id) throws RegraException{
		E entityFind = localizar(id);
		if(entityFind == null){
			Util.lancarError(Util.cortarDaStringAte(classeTO.getClass().getSimpleName(), "TO") + " informada n�o existe!");
		}
		getDAO().excluir(entityFind);
		getDAO().commit();
	}
	
	public E localizar(Long id) throws RegraException{
		E entity = null;
		if(id == null || id == 0L){
			Util.lancarError(entity.getClass().getSimpleName() + " informada n�o existe!");
		}
		entity = getDAO().localizar(id);
		return entity;
	}
	
	public B localizarBean(Long id) throws RegraException{
		E entity = null;
		if(id == null || id == 0L){
			Util.lancarError("Objeto informado n�o existe!");
		}
		entity = getDAO().localizar(id);
		B objBean = parseBean(entity, null);
		return objBean;
	}
	
	public void fecharManaer() throws RegraException{
		getDAO().fecharManager();
	}

		
	protected void lancarErrorExistentesNasMensagens() throws RegraException{
		if(getMensagens().size() > 0){
			StringBuilder concateMsg = new StringBuilder();
			IntStream.range(0, getMensagens().size()).forEach(index ->{
				if(index > 0){
					concateMsg.append("\n");
				}
				concateMsg.append(getMensagens().get(index));
			});
			Util.lancarError(concateMsg.toString());
		}
	}
	
	protected List<String> getMensagens(){
		if(mensagens == null){
			mensagens = new ArrayList<>();
		}
		return mensagens;
	}
	
	public int calcPaginas(int totalRegistros, int qtdRegistros){
		int qtdPaginas = 1;
		if(totalRegistros > 1 && qtdRegistros > 1 && (totalRegistros > qtdRegistros)){
			qtdPaginas = (int) Math.ceil(((double)totalRegistros / qtdRegistros));
		}
		return qtdPaginas;
	}
}
