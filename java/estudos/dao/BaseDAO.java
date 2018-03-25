package estudos.dao;

import java.lang.reflect.ParameterizedType;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import estudos.entity.BaseEntity;
import estudos.util.RegraException;
import estudos.util.FactoryJPA;
import estudos.util.Util;


public abstract class BaseDAO<E extends BaseEntity> {
//	Atributos
	private Class<E> modelClasse;
	private EntityManager  entityManager = null;
	private String persistenceUnitName;
	protected String sql;
	
	public BaseDAO(String persistenceUnitName) {
		this.persistenceUnitName = persistenceUnitName;
		ParameterizedType paramType = (ParameterizedType) this.getClass().getGenericSuperclass();
		this.modelClasse = (Class<E>) paramType.getActualTypeArguments()[0];//Recuperando a clase filha.
	}
	
	/**
	 * Caso o o EntityManager seja null ou esteja fechado. 
	 * @return
	 * @throws RegraException
	 */
	public EntityManager getManager() throws RegraException{
		if(entityManager == null){
			entityManager = FactoryJPA.getEntityManager(this.persistenceUnitName);
		}else if(!entityManager.isOpen()){
			entityManager = FactoryJPA.getEntityManager(this.persistenceUnitName);
		}
//		entityManager.getEntityManagerFactory().getCache().evictAll();
		return entityManager;
	}
	
	/**
	 * Lista os modelos de um determinado período.
	 * @param model - Modelo responsável pelo filtro.
	 * @param inicio - Informa de onde deve começar o filtro.
	 * @param quantidadeRegistros - Informa a quantidade registro a ser retornado. obs: se  for informado '0' retorna todos os registros.
	 * @param nomeCamposOdernacao - Informa o nomes dos atributos que a lista será ordernada.
	 * @return - Um Lista de modelos.
	 * @throws RegraException
	 */
	public abstract List<E> listarPorFiltro(E model, int inicio, int quantidadeRegistros, String ordem, boolean crescente) throws RegraException ;
	
	/**
	 * Retorna a quantidade de registro do modelo filtrado.
	 * @param model - Fitro para a contagem.
	 * @return
	 */
	public abstract int contarPorFiltro(E model) throws RegraException;
	
	/**
	 * Salva um modelo passando ele por parâmetro.
	 * @param model
	 * @return - O id o modelo que foi salva no banco.
	 * @throws RegraException
	 */
	public Long salvar(E model) throws RegraException{
		try{
			begin();
			getManager().persist(model);
		}catch(Exception e){
			Util.lancarError("Erro ao salvar " + Util.cortarDaStringAte(modelClasse.getClass().getSimpleName(), "Model").toLowerCase() + "!");
		}
		return model.getId();
	}

	/**
	 * Altera o modelo que seja passado por parâmetro.
	 * @param model
	 * @return - Retorna o id do modelo alterado.
	 * @throws RegraException
	 */
	public Long alterar(E model) throws RegraException{
		try{
			begin();
			getManager().merge(model);
		}catch(Exception e){
			Util.lancarError("Erro ao alterar " + Util.cortarDaStringAte(modelClasse.getClass().getSimpleName(), "Model").toLowerCase() + "!");
		}
		return model.getId();
	}
	
	/**
	 * Excluir um modelo que é passado por parâmetro
	 * @param model
	 * @return - Retorno tru se o objeto for realmente excluido. 
	 * @throws RegraException
	 */
	public boolean excluir(E model) throws RegraException{
		try{
			begin();
			getManager().remove(model);
			return true;
		}catch(Exception e){
			Util.lancarError("Erro ao excluir " + Util.cortarDaStringAte(modelClasse.getClass().getSimpleName(), "Model").toLowerCase() + "!");
		}
		return  false;
	}
	/**
	 * Localizar o modelo pelo seu ID.
	 * @param id
	 * @return - Retorna o Modelo encontrado.
	 * @throws RegraException
	 */
	public E localizar(Long id) throws RegraException{
		E model = null;
		try{
			begin();
			model = getManager().find(modelClasse, id);
		}catch(Exception e){
			Util.lancarError("Erro ao localizar " + Util.cortarDaStringAte(modelClasse.getClass().getSimpleName(), "Model").toLowerCase() + "!");
		}
		return model;
	}
	/**
	 * Lista os modelos de um determinado período.
	 * @param inicio - Informa de onde deve começar o filtro.
	 * @param quantidadeRegistros - Informa a quantidade registro a ser retornado. obs: se  for informado '0' retorna todos os registros.
	 * @param nomeCamposOdernacao - Informa o nomes dos atributos que a lista será ordernada.
	 * @return - Um Lista de modelos.
	 * @throws RegraException
	 */
	public List<E> listar(int inicio, int quantidadeRegistros, String ordem, boolean crescente) throws RegraException{
		List<E> listaRetorno = null;
		try {
			begin();
			CriteriaBuilder criterioB = getManager().getCriteriaBuilder();
			CriteriaQuery<E> cQuery = criterioB.createQuery(modelClasse);
			Root<E> root = cQuery.from(modelClasse);
//			Inserindo as ordenações
			if(Util.isNotVazio(ordem)){
				if(crescente){
					cQuery.orderBy(criterioB.asc(root.get(ordem)));
				}else{
					cQuery.orderBy(criterioB.desc(root.get(ordem)));
				}
			}
			cQuery.select(root);
			TypedQuery<E> query = getManager().createQuery(cQuery);
			query.setFirstResult(inicio);
//			Verificando se ir� limitar a quantidade de registros.
			if(quantidadeRegistros > 0){
				query.setMaxResults(quantidadeRegistros);
			}
			listaRetorno = query.getResultList();
		} catch (Exception e) {
			Util.lancarError("Erro ao listar " + this.modelClasse.getSimpleName().toLowerCase() + "(s)!");
		}
		return listaRetorno;
	}
	
	/**
	 * Lista os modelos de um determinado período.
	 * @param nomeCamposOdernacao - Informa o nomes dos atributos que a lista será ordernada.
	 * @return - Um Lista de modelos.
	 * @throws RegraException
	 */
	public List<E> listarTudo(String ordem, boolean crescente) throws RegraException{
		List<E> listaRetorno = null;
		try {
			begin();
			CriteriaBuilder criterioB = getManager().getCriteriaBuilder();
			CriteriaQuery<E> cQuery = criterioB.createQuery(modelClasse);
			Root<E> root = cQuery.from(modelClasse);
//			Inserindo as ordenações
			if(Util.isNotVazio(ordem)){
				if(crescente){
					cQuery.orderBy(criterioB.asc(root.get(ordem)));
				}else{
					cQuery.orderBy(criterioB.desc(root.get(ordem)));
				}
			}
			cQuery.select(root);
			TypedQuery<E> query = getManager().createQuery(cQuery);
			listaRetorno = query.getResultList();
		} catch (Exception e) {
			Util.lancarError("Erro ao listar " + Util.cortarDaStringAte(modelClasse.getClass().getSimpleName(), "Model").toLowerCase() + "s!");
		}
		return listaRetorno;
	}
	/**
	 * Lista os modelos de um determinado período.
	 * @return - Um Lista de modelos.
	 * @throws RegraException
	 */
	public List<E> listarTudo() throws RegraException{
		List<E> listaRetorno = null;
		sql = "select e from " + modelClasse.getSimpleName() + " e";
		try {
			begin();
			Query query = getManager().createQuery(sql);
			listaRetorno =  query.getResultList();
		} catch (Exception e) {
			Util.lancarError("Erro ao listar " + Util.cortarDaStringAte(modelClasse.getClass().getSimpleName(), "Model").toLowerCase() + "s!");
		}
		return listaRetorno;
	}
	/**
	 * Lista a quantidade de registros do modelo.
	 * @return - int com o valor.
	 * @throws RegraException
	 */
	public int contar() throws RegraException{
		int total = 0;
		sql = "select count(e) from " + modelClasse.getSimpleName() + " e";
		try {
			begin();
//			Query query = getManager().createQuery(sql);
			TypedQuery<Long> tQuery = getManager().createQuery(sql, Long.class);
			Long totalLong = tQuery.getSingleResult();
			total =  totalLong.intValue();
		} catch (Exception e) {
			Util.lancarError("Erro ao contar " + Util.cortarDaStringAte(modelClasse.getClass().getSimpleName(), "Model").toLowerCase() + "s!");
		}
		return total;
	}
	
	
	/**
	 * Fechar o EntityManager
	 * @throws RegraException
	 */
	public void fecharManager() throws RegraException{
		try{
			getManager().close();
		}catch(Exception e){
			throw new RegraException("Erro ao fechar Manager Entity!");
		}
	}
	
	/**
	 * Libera todas as transações que ainda não foram comitadas.
	 * @throws RegraException
	 */
	public void flush() throws RegraException{
		try{
			getManager().flush();
		}catch(Exception e){
			throw new RegraException("Erro ao escarregar Manager Entity!");
		}
	}
	
	/**
	 * Refaz a ultima transação feita.
	 * @throws RegraException
	 */
	public void rollback() throws RegraException{
		try{
			getManager().getTransaction().rollback();
		}catch(Exception e){
			throw new RegraException("Erro fazer roolback na transa��o!");
		}
	}
	
	/**
	 * Finaliza todas as transações em memória.
	 * @throws RegraException
	 */
	public void commit() throws RegraException{
		try{
			getManager().getTransaction().commit();
		}catch(Exception e){
			throw new RegraException("Erro fazer commit na transa��o!");
		}
	}
	
	/**
	 * Inicia a transação do EntityManager caso ela não esteja já iniciada.
	 * @throws RegraException
	 */
	public void begin() throws RegraException{
		try{
			if(!getManager().getTransaction().isActive()){
				getManager().getTransaction().begin();
			}
		}catch(Exception e){
			throw new RegraException("Erro iniciar a transa��o!!");
		}
	}
	
	/**
	 * Libera todos os modelos que estão na memória do EntityManager.
	 * @throws RegraException
	 */
	public void clear() throws RegraException{
		try{
			getManager().clear();
		}catch(Exception e){
			throw new RegraException("Erro limpar o Entity Manager!");
		}
	}
	
	
}
