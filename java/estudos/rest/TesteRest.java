package estudos.rest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import estudos.bean.UsuarioBean;

@Path("/principal")
public class TesteRest{
	
	@GET
	@Path("/nomes")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response getNomes(){
		List<UsuarioBean> lista = new ArrayList<>();
		UsuarioBean usu = new UsuarioBean();
		usu.setId(1L);
		lista.add(usu);
		Map<Object, Object> map = new HashMap<>();
		map.put("nomes", lista);
		return Response.ok().entity(map).build();
	}
	
	
	
	
}
