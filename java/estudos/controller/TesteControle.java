package estudos.controller;

import java.io.File;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.eclipse.persistence.jpa.jpql.tools.ResultQuery;
@WebServlet("/TesteControle")
public class TesteControle extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		System.out.println(req.getContextPath());
		System.out.println(req.getServletContext().getRealPath(""));
		System.out.println(req.getRealPath("") + "relatorio"); 
		super.doGet(req, resp);
	}
}
