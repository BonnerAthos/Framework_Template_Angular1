package estudos.rest;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletOutputStream;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;


import estudos.bean.UsuarioBean;
import estudos.entity.UsuarioEntity;
import estudos.enums.PersistencesEnum;
import estudos.enums.RelatorioEnum;
import estudos.report.UsuarioReport;
import estudos.servico.UsuarioService;
import estudos.util.RegraException;
@Path("/usuario")
public class UsuarioRest extends BaseRest<UsuarioBean, UsuarioEntity> {
	private static final long serialVersionUID = 1L;
	private UsuarioService usuarioService;
	
	
	public UsuarioRest() {
		setPastLocal("usuario/");
	}
	
	@Override
	public UsuarioService getService() {
		if(usuarioService == null){
			usuarioService = new UsuarioService(PersistencesEnum.POSTGRES_ESTUDOS.getNome());
		}
		return usuarioService;
	}
	
	
	@GET
	@Path("/relatorioGeral/{docType}")
	@Produces("application/*")
	public Response gerarRelatorioUsuarioGeral(@PathParam("docType") String docType){
		List<UsuarioBean> listaUsuarios = new ArrayList<>();
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		try {
			listaUsuarios = getService().listarTudo();
			UsuarioReport usuarioReport = new UsuarioReport();
			baos = usuarioReport.criarRelatorio(getCaminhoPastaWeb() + "relatorio", RelatorioEnum.USUARIO_GERAL.getNome(), listaUsuarios, docType.toUpperCase());
			response.setHeader("Content-Disposition",  "filename=" + RelatorioEnum.USUARIO_GERAL.getNome()+ "." + docType.toLowerCase());
			ServletOutputStream ouputStream = response.getOutputStream();
	        ouputStream.write(baos.toByteArray());
	        ouputStream.flush();
	        ouputStream.close();
		} catch (RegraException | IOException e) {
			getMap().put("msgError", e.getMessage());
			return Response.status(Response.Status.NO_CONTENT).entity(getMap()).build();
		}
		return Response.ok(baos.toByteArray()).header("Content-Disposition", "filename=" + RelatorioEnum.USUARIO_GERAL.getNome()+ "." + docType.toLowerCase()).build();
	}
	
	
	@Override
	public void setPastLocal(String pasta) {
		this.pastaLocal = PASTA_HOME + pasta;
	}
}
