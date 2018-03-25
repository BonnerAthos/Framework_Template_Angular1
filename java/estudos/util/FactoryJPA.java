package estudos.util;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class FactoryJPA {
	private static EntityManagerFactory entityManagerFactory;
	
	public static EntityManager getEntityManager(String persistenceUnitName) throws RegraException{
		EntityManager entityManager = null;
		entityManager = getEntityManagerFactory(persistenceUnitName).createEntityManager();
		return entityManager;
	}
	
	private static EntityManagerFactory getEntityManagerFactory(String persistenceUnitName) throws RegraException{
		try{
			if(entityManagerFactory == null){
				entityManagerFactory = Persistence.createEntityManagerFactory(persistenceUnitName);
			}else if(!entityManagerFactory.isOpen()){
				entityManagerFactory = Persistence.createEntityManagerFactory(persistenceUnitName);
			}
		}catch(Exception e){
			throw new RegraException("Erro ao tentar conectar ao banco de dados!");
		}
		return entityManagerFactory;
	}
}
