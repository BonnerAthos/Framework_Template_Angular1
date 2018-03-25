package estudos.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import estudos.entity.UsuarioEntity;
import estudos.util.RegraException;
import estudos.util.Util;

public class UsuarioDAO extends BaseDAO<UsuarioEntity> {
	
	public UsuarioDAO(String persistenceUnitName) {
		super(persistenceUnitName);
	}

	@Override
	public List<UsuarioEntity> listarPorFiltro(UsuarioEntity usuarioEntity, int inicio, int quantidadeRegistros,
			String ordem, boolean crescente) throws RegraException {
		try {
			begin();
			CriteriaBuilder criterioB = getManager().getCriteriaBuilder();
			CriteriaQuery<UsuarioEntity> cQuery = criterioB.createQuery(UsuarioEntity.class);
			Root<UsuarioEntity> root = cQuery.from(UsuarioEntity.class);
//			Filtros objeto
			if(usuarioEntity != null){
				List<Predicate> predicates = setFiltros(usuarioEntity, criterioB, root);
				cQuery.where(predicates.toArray(new Predicate[]{}));
			}
//			Inserindo as ordernações
			if(Util.isNotVazio(ordem)){
				if(crescente){
					cQuery.orderBy(criterioB.asc(root.get(ordem)));
				}else{
					cQuery.orderBy(criterioB.desc(root.get(ordem)));
				}
			}
			cQuery.select(root);
			TypedQuery<UsuarioEntity> query = getManager().createQuery(cQuery);
			query.setFirstResult(inicio);
//			Verificando que foi determinado o limite de registros.
			if(quantidadeRegistros > 0){
				query.setMaxResults(quantidadeRegistros);
			}
			return query.getResultList();
		} catch (Exception e) {
			Util.lancarError("Erro ao listar usuário!");
		}
		return null;
	}

	@Override
	public int contarPorFiltro(UsuarioEntity usuarioEntity) throws RegraException {
		try {
			begin();
			CriteriaBuilder criterioB = getManager().getCriteriaBuilder();
			CriteriaQuery<Long> cQuery = criterioB.createQuery(Long.class);
			//Criando o from da Sql
			Root<UsuarioEntity> root = cQuery.from(UsuarioEntity.class);
//			Filtros objeto
			if(usuarioEntity != null){
				List<Predicate> predicates = setFiltros(usuarioEntity, criterioB, root);
				cQuery.where(predicates.toArray(new Predicate[]{}));
			}
			cQuery.select(criterioB.count(root.get("id")));
			TypedQuery<Long> query = getManager().createQuery(cQuery);
			Long totalLong = query.getSingleResult(); 
			return totalLong.intValue();
		} catch (Exception e) {
			Util.lancarError("Erro ao listar usuário!");
		}
		return 0;
	}
	
	private List<Predicate> setFiltros(UsuarioEntity usuarioEntity, CriteriaBuilder criterioB, Root<UsuarioEntity> root){
		List<Predicate> predicates = new ArrayList<Predicate>();
		if(Util.isNotVazio(usuarioEntity.getNome())){
			predicates.add(criterioB.like(criterioB.lower(root.get("nome")), "%"+ usuarioEntity.getNome().toLowerCase() + "%"));
		}
		if(Util.isNotVazio(usuarioEntity.getSobreNome())){
			predicates.add(criterioB.like(criterioB.lower(root.get("sobreNome")), "%"+ usuarioEntity.getSobreNome().toLowerCase() + "%"));
		}
		if(Util.isNotVazio(usuarioEntity.getLogin())){
			predicates.add(criterioB.like(criterioB.lower(root.get("login")), "%"+ usuarioEntity.getLogin().toLowerCase() + "%"));
		}
		if(Util.isNotVazio(usuarioEntity.getEmail())){
			predicates.add(criterioB.like(criterioB.lower(root.get("email")), "%"+ usuarioEntity.getEmail().toLowerCase() + "%"));
		}
		if(usuarioEntity.getDataNascimento() != null){
			predicates.add(criterioB.equal(root.get("dataNascimento"), usuarioEntity.getDataNascimento()));
		}
		if(usuarioEntity.getDataFiltroInicio() != null){
			predicates.add(criterioB.greaterThanOrEqualTo(root.get("dataNascimento"), usuarioEntity.getDataFiltroInicio()));
		}
		if(usuarioEntity.getDataFiltroFim() != null){
			predicates.add(criterioB.lessThanOrEqualTo(root.get("dataNascimento"), usuarioEntity.getDataFiltroFim()));
		}
		return predicates;
	}
}
