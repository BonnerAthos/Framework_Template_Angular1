package estudos.rest;

import java.io.IOException;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.websocket.server.ServerEndpoint;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.glassfish.jersey.server.mvc.Viewable;

import estudos.bean.BaseBean;
import estudos.entity.BaseEntity;
import estudos.entity.UsuarioEntity;
import estudos.servico.BaseService;
import estudos.util.RegraException;
import estudos.util.Util;

@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@ServerEndpoint(value = "/websocket")
public abstract class BaseRest<B extends BaseBean, E extends BaseEntity> implements Serializable {
	private static final long serialVersionUID = 1L;
	//Mensagem padrão.
	protected final String MSG_ERROR = "msgError";
	protected final String MSG_SUCESSO = "msgSucesso";
	protected final String MSG_INFORMACAO = "msgInformacao";
	protected final String MSG_ATENCAO = "msgAtencao";
	//Usuario logado.
	public static final String USUARIO_LOGADO = "usuarioLogadoSistema";
//	Pastas home
	protected final String PASTA_HOME = "/paginas/";
	protected String pastaLocal;
	
	@Context
	protected HttpServletRequest request;
	
	@Context
	protected HttpServletResponse response;
	
	public abstract void setPastLocal(String pasta);
	
	public abstract BaseService<B,E> getService();
	
	private HashMap<Object, Object> map;
	
	public HashMap<Object, Object> getMap(){
		if(map == null){
			map = new HashMap<>();
		}
		return map;
	}
	
	@GET
	@Path("/{pagina}/{quantidadeRegistros}/{ordem}/crescente")
	public Response listar(@PathParam("pagina") int pagina, @PathParam("quantidadeRegistros") int quantidadeRegistros, 
			@PathParam("ordem") String orderBy, @PathParam("crescente") boolean crescente){
		List<B> listaBeans = new ArrayList<>();
		int qtdPaginas = 0;
		int totalRegistros = 0;
		try {
			listaBeans = getService().listar(pagina, quantidadeRegistros, orderBy, crescente);
			totalRegistros = getService().contar();
			qtdPaginas = (int) Math.ceil(((double)totalRegistros / quantidadeRegistros));
		} catch (RegraException e) {
			getMap().put(MSG_ERROR, e.getMessage());
		}catch (Exception e) {
			getMap().put(MSG_ERROR, "Error de regra de negócio!");
		}
		getMap().put("qtdRegistros", quantidadeRegistros);
		getMap().put("totalRegistros", totalRegistros);
		getMap().put("pagina", pagina);
		getMap().put("qtdPaginas", qtdPaginas);
		getMap().put("listaBeans", listaBeans);
		return Response.ok().entity(getMap()).build();
	}
	
	@GET
	@Path("/{pagina}/{quantidadeRegistros}/{ordem}")
	public Response listar(@PathParam("pagina") int pagina, @PathParam("quantidadeRegistros") int quantidadeRegistros, 
			@PathParam("ordem") String orderBy){
		List<B> listaBeans = new ArrayList<>();
		int qtdPaginas = 0;
		int totalRegistros = 0;
		try {
			listaBeans = getService().listar(pagina, quantidadeRegistros, orderBy, true);
			totalRegistros = getService().contar();
			qtdPaginas = (int) Math.ceil(((double)totalRegistros / quantidadeRegistros));
		} catch (RegraException e) {
			getMap().put(MSG_ERROR, e.getMessage());
		}catch (Exception e) {
			getMap().put(MSG_ERROR, "Error de regra de negócio!");
		}
		getMap().put("qtdRegistros", quantidadeRegistros);
		getMap().put("totalRegistros", totalRegistros);
		getMap().put("pagina", pagina);
		getMap().put("qtdPaginas", qtdPaginas);
		getMap().put("listaBeans", listaBeans);
		return Response.ok().entity(getMap()).build();
	}
	
	@GET
	@Path("/{pagina}/{quantidadeRegistros}")
	public Response listar(@PathParam("pagina") int pagina, @PathParam("quantidadeRegistros") int quantidadeRegistros){
		List<B> listaBeans = new ArrayList<>();
		int qtdPaginas = 0;
		int totalRegistros = 0;
		try {
			listaBeans = getService().listar(pagina, quantidadeRegistros);
			getMap().put("listaBeans", listaBeans);
			totalRegistros = getService().contar();
			qtdPaginas = (int) Math.ceil(((double)totalRegistros / quantidadeRegistros));
		} catch (RegraException e) {
			getMap().put(MSG_ERROR, e.getMessage());
		}catch (Exception e) {
			getMap().put(MSG_ERROR, "Error de regra de negócio!");
		}
		getMap().put("qtdRegistros", quantidadeRegistros);
		getMap().put("totalRegistros", totalRegistros);
		getMap().put("pagina", pagina);
		getMap().put("qtdPaginas", qtdPaginas);
		getMap().put("listaBeans", listaBeans);
		return Response.ok().entity(getMap()).build();
	}
	
	@GET
	public Response listarTudo(){
		List<B> listaBeans = new ArrayList<>();
		try {
			listaBeans = getService().listarTudo();
			getMap().put("listaBeans", listaBeans);
		} catch (RegraException e) {
			getMap().put(MSG_ERROR, e.getMessage());
		}catch (Exception e) {
			getMap().put(MSG_ERROR, "Error de regra de negócio!");
		}
		getMap().put("listaBeans", listaBeans);
		getMap().put("totalRegistros", listaBeans.size());
		return Response.ok().entity(getMap()).build();
	}

	@GET
	@Path("/ordenacao/{ordem}/crescente")
	public Response listarTudo(@PathParam("ordem") String ordem, @PathParam("crescente") boolean crescente){
		List<B> listaBeans = new ArrayList<>();
		try {
			listaBeans = getService().listarTudo(ordem, crescente);
			getMap().put("listaBeans", listaBeans);
		} catch (RegraException e) {
			getMap().put(MSG_ERROR, e.getMessage());
		}catch (Exception e) {
			getMap().put(MSG_ERROR, "Error de regra de negócio!");
		}
		getMap().put("listaBeans", listaBeans);
		return Response.ok().entity(getMap()).build();
	}
	
	@GET
	@Path("/ordenacao/{ordem}")
	public Response listarTudo(@PathParam("ordem") String ordem){
		List<B> listaBeans = new ArrayList<>();
		try {
			listaBeans = getService().listarTudo(ordem, true);
			getMap().put("listaBeans", listaBeans);
		} catch (RegraException e) {
			getMap().put(MSG_ERROR, e.getMessage());
		}catch (Exception e) {
			getMap().put(MSG_ERROR, "Error de regra de negócio!");
		}
		getMap().put("listaBeans", listaBeans);
		return Response.ok().entity(getMap()).build();
	}
	
	/**
	 * Método que lista filtrando pelos campos que são preenchidos.
	 * 
	 * @param objBean - Deve ser passado a quantidade de página por página("qtdRegistros") e a página atual("pagina"). 
	 * @return - "qtdRegistros" - Quantidade de registros por página
	 *			 "totalRegistros" - Total geral de registros
	 *			 "pagina" - Página atual que será mostrada
	 *			 "qtdPaginas"  - Quantidade de páginas dependendo da quantidade de registros
	 *			 "listaBeans" - Array lista com os objetos
	 */
	@POST
	@Path("/filtro")
	public Response listarPorFiltro(B objBean){
		List<B> listaBeans = new ArrayList<>();
		try {
		
			System.out.println("passou no listarFiltro");
		
			objBean.setPagina(0);
			objBean.setQtdRegistros(0);
			listaBeans = getService().listar(objBean);
		} catch (RegraException e) {
			getMap().put(MSG_ERROR, e.getMessage());
		}catch (Exception e) {
			getMap().put(MSG_ERROR, "Error de regra de negócio!");
		}
		getMap().put("totalRegistros", listaBeans.size());
		getMap().put("listaBeans", listaBeans);
		return Response.ok().entity(getMap()).build();
	}
	
	/**
	 * Método que lista filtrando pelos campos que são preenchidos.
	 * 
	 * @param objBean - Deve ser passado a quantidade de página por página("qtdRegistros") e a página atual("pagina"). 
	 * @return - "qtdRegistros" - Quantidade de registros por página
	 *			 "totalRegistros" - Total geral de registros
	 *			 "pagina" - Página atual que será mostrada
	 *			 "qtdPaginas"  - Quantidade de páginas dependendo da quantidade de registros
	 *			 "listaBeans" - Array lista com os objetos
	 */
	@POST
	@Path("/paginacao")
	public Response listarPagination(B objBean){
		List<B> listaBeans = new ArrayList<>();
		int qtdPaginas = 1, totalRegistros = 0, pagina = 1, qtdRegistros = 5;
		
		try {
			if(objBean.getPagina() > 1){
				pagina = objBean.getPagina();
			}else{
				objBean.setPagina(pagina);
			}
			if(objBean.getQtdRegistros() > 1){
				qtdRegistros = objBean.getQtdRegistros();
			}else{
				objBean.setQtdRegistros(qtdRegistros);
			}
			listaBeans = getService().listar(objBean);
			totalRegistros = getService().contarPorfiltro(objBean);
			qtdPaginas = getService().calcPaginas(totalRegistros, objBean.getQtdRegistros());
			if(pagina > qtdPaginas){
				pagina = qtdPaginas;
				objBean.setPagina(pagina);
				listaBeans = getService().listar(objBean);
				totalRegistros = getService().contarPorfiltro(objBean);
				qtdPaginas = getService().calcPaginas(totalRegistros, objBean.getQtdRegistros());
			}
		} catch (RegraException e) {
			getMap().put(MSG_ERROR, e.getMessage());
		}catch (Exception e) {
			getMap().put(MSG_ERROR, "Error de regra de negócio!");
		}
		getMap().put("qtdRegistros", qtdRegistros);
		getMap().put("totalRegistros", totalRegistros);
		getMap().put("pagina", pagina);
		getMap().put("qtdPaginas", qtdPaginas);
		getMap().put("listaBeans", listaBeans);
		return Response.ok().entity(getMap()).build();
	}
	
	
	@POST
	@Path("/contarFiltro")
	public Response contar(B objBean){
		int qtdBean = 0;
		try {
			qtdBean = getService().contarPorfiltro(objBean);
		} catch (RegraException e) {
			getMap().put(MSG_ERROR, e.getMessage());
		}catch (Exception e) {
			getMap().put(MSG_ERROR, "Error de regra de negócio!");
		}
		getMap().put("qtdBean", qtdBean);
		return Response.ok().entity(getMap()).build();
	}
	
	@GET
	@Path("/contar")
	public Response contar(){
		int qtdBean = 0;
		try {
			qtdBean = getService().contar();
		} catch (RegraException e) {
			getMap().put(MSG_ERROR, e.getMessage());
		}catch (Exception e) {
			getMap().put(MSG_ERROR, "Error de regra de negócio!");
		}
		getMap().put("qtdBean", qtdBean);
		return Response.ok().entity(getMap()).build();
	}
//	
	@GET
	@Path("/{id}")
	public Response localizar(@PathParam("id") Long id){
		B objBean = null;
		E objModel = null;
		try {
			objModel = getService().localizar(id);
			objBean = getService().parseBean(objModel, null);
		} catch (RegraException e) {
			getMap().put(MSG_ERROR, e.getMessage());
		}catch (Exception e) {
			getMap().put(MSG_ERROR, "Error de regra de negócio!");
		}
		getMap().put("objBean", objBean);
		return Response.ok().entity(getMap()).build();
	}
	
	@DELETE
	@Path("/{id}")
	public Response excluir(@PathParam("id") Long id){
		try {
			getService().excluir(id);
			getMap().put(MSG_SUCESSO, "Removido(a) com sucesso!");
		} catch (RegraException e) {
			getMap().put(MSG_ERROR, e.getMessage());
		}catch (Exception e) {
			getMap().put(MSG_ERROR, "Error de regra de negócio!");
		}
		return Response.ok().entity(getMap()).build();
	}

	@POST
	public Response salvar(B objBean){
		try {
			
			System.out.println("Salvar Cliente...........");
			
			objBean.setCriadoPor(getUsuarioLogado());
			getService().salvar(objBean);
			getMap().put(MSG_SUCESSO, "Salvo(a) com sucesso!");
		} catch (RegraException e) {
			getMap().put(MSG_ERROR, e.getMessage());
		}catch (Exception e) {
			getMap().put(MSG_ERROR, "Error de regra de neg�cio!");
		}
		return Response.ok().entity(getMap()).build();
	}
	
	@PUT
	public Response alterar(B objBean){
		try {
			getService().alterar(objBean);
			getMap().put(MSG_SUCESSO, "Alterado(a) com sucesso!");
			objBean.setAtualizadoPor(getUsuarioLogado());
		} catch (RegraException e) {
			getMap().put(MSG_ERROR, e.getMessage());
		}catch (Exception e) {
			getMap().put(MSG_ERROR, "Error de regra de negócio!");
		}
		return Response.ok().entity(getMap()).build();
	}
	
	@GET
	@Path("/pagina/{pagina}")
	@Produces(MediaType.TEXT_HTML)
	public Viewable pagina(@PathParam("pagina") String destino){
		Viewable view = null;
		try {
			System.out.println("Chegou no REst");
			destino = setHTML(destino);
			destino = pastaLocal + destino;
			view = new Viewable(destino);
		}catch (Exception e) {
			getMap().put(MSG_ERROR, "Error ao carregar a pagina" + destino + " !");
		}
		
		return view;
	}
	
	@GET
	@Path("/pagina/{pagina}/{id}")
	@Produces(MediaType.TEXT_HTML)
	public Viewable paginaEditar(@PathParam("pagina") String destino,  @PathParam("id") Long id){
		try {
			destino = setHTML(destino);
			destino = pastaLocal + destino;
			B objBean = null;
			objBean = getService().localizarBean(id);
			getMap().put("objBean", objBean);
		} catch (RegraException e) {
			getMap().put(MSG_ERROR,e.getMessage());
		}catch (Exception e) {
			getMap().put(MSG_ERROR, "Error ao carregar a pagina" + destino + " !");
		}
		return  new Viewable(destino, getMap());
	}
	
	@POST
	@Path("/paginaPaginacao/{pagina}")
	@Produces(MediaType.TEXT_HTML)
	public Viewable paginaPaginacao(@PathParam("pagina") String destino, B objBean){
		List<B> listaBeans = new ArrayList<>();
		int qtdPaginas = 1, totalRegistros = 0, pagina = 1, qtdRegistros = 5;
		
		try {
			destino = setHTML(destino);
			destino = pastaLocal + destino;
			
			if(objBean.getPagina() > 1){
				pagina = objBean.getPagina();
			}else{
				objBean.setPagina(pagina);
			}
			if(objBean.getQtdRegistros() > 1){
				qtdRegistros = objBean.getQtdRegistros();
			}else{
				objBean.setQtdRegistros(qtdRegistros);
			}
			listaBeans = getService().listar(objBean);
			totalRegistros = getService().contarPorfiltro(objBean);
			qtdPaginas = getService().calcPaginas(totalRegistros, objBean.getQtdRegistros());
		} catch (RegraException e) {
			getMap().put(MSG_ERROR, e.getMessage());
		}catch (Exception e) {
			getMap().put(MSG_ERROR, "Error de regra de negócio!");
		}
		getMap().put("qtdRegistros", qtdRegistros);
		getMap().put("totalRegistros", totalRegistros);
		getMap().put("pagina", pagina);
		getMap().put("qtdPaginas", qtdPaginas);
		getMap().put("listaBeans", listaBeans);
		return  new Viewable(destino, getMap());
	}
	
	@POST
	@Path("/paginaFiltro/{pagina}")
	@Produces(MediaType.TEXT_HTML)
	public Viewable paginaFiltro(@PathParam("pagina") String destino, B objBean){
		List<B> listaBeans = new ArrayList<>();
		try {
			destino = setHTML(destino);
			destino = pastaLocal + destino;
			objBean.setPagina(0);
			objBean.setQtdRegistros(0);
			listaBeans = getService().listar(objBean);
		} catch (RegraException e) {
			getMap().put(MSG_ERROR, e.getMessage());
		}catch (Exception e) {
			getMap().put(MSG_ERROR, "Error de regra de negócio!");
		}
		getMap().put("totalRegistros", listaBeans.size());
		getMap().put("listaBeans", listaBeans);
		return  new Viewable(destino, getMap());
	}
	
	public String setHTML(String pagina){
		if(Util.isNotVazio(pagina)){
			if(!pagina.endsWith(".jsp")){
				pagina += ".jsp";
			}
		}
		return pagina;
	}
	
	public String getCaminhoPastaWeb(){
		if(request != null){
			return request.getServletContext().getRealPath("");
		}
		return null;
	}
	
	protected UsuarioEntity getUsuarioLogado(){
		UsuarioEntity usuarioLogado = null;
		if(request != null){
			usuarioLogado = (UsuarioEntity) request.getSession().getAttribute(USUARIO_LOGADO); 
		}
		return usuarioLogado;
	}
	
	protected void setUsuarioLogado(Object usuarioLogado){
		if(request != null){
			request.getSession().setAttribute(USUARIO_LOGADO, usuarioLogado); 
		}
	}
	
	protected void dispachar(String destino) throws RegraException{
		if(request != null){
			RequestDispatcher dispache  = request.getRequestDispatcher(destino);
			try {
				dispache.forward(request, response);
			} catch (ServletException | IOException e) {
				throw new RegraException("Erro ao dispachar a página!");
			}
		}
	}
	
	protected void redirecionar(String destino) throws RegraException{
		if(response != null){
			try {
				response.sendRedirect(destino);
			} catch (IOException e) {
				throw new RegraException("Erro ao redirecionar a página!");
			}
			
		}
	}
}
