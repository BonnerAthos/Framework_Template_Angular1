package estudos.util;

import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

import org.glassfish.jersey.server.mvc.jsp.JspMvcFeature;

import estudos.enums.PersistencesEnum;
import estudos.rest.ClienteRest;
import estudos.rest.TesteRest;
//import estudos.rest.UploadFile;
import estudos.rest.UsuarioRest;

@ApplicationPath("/rest")
public class ConfigRest extends Application{
	public ConfigRest(){
		try {
			FactoryJPA.getEntityManager(PersistencesEnum.POSTGRES_ESTUDOS.getNome());
		} catch (RegraException e) {
			e.printStackTrace();
		}
	}
	
	@Override
	public Set<Class<?>> getClasses() {
		final Set<Class<?>> classes = new HashSet<Class<?>>( );
		classes.add(TesteRest.class);
		classes.add(UsuarioRest.class);
		classes.add(ClienteRest.class);
		classes.add(JspMvcFeature.class);
		return classes;
	}
	
	
	
}
