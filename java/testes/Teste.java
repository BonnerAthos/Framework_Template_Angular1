package testes;

import java.io.File;
import java.text.MessageFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.EmailAttachment;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.HtmlEmail;
import org.apache.commons.mail.SimpleEmail;
import org.apache.tomcat.util.codec.binary.StringUtils;

import estudos.bean.AnexoBean;
import estudos.bean.EmailBean;
import estudos.util.Util;

public class Teste {

	private static final String  HOME_PATH = "C:" + File.separatorChar + "Users" + File.separatorChar 
	+ "Usuário" + File.separatorChar
	+ "Downloads" + File.separatorChar;
	
	public static void main(String[] args) {
		
		EmailBean em = new EmailBean();
		
		em.setSsl(true);
		em.setSmtp("SMTP do e-mail, exemplo Gmail");
		em.setPorta("465");
		em.setLogin("Coloque seu e-mail aqui ");
		em.setSenha("");
		em.setEmailRemetente("Coloque o e-mail do remetente aqui ");
		em.setDebug(true);
		em.setAssunto("Email Bean Teste");
		em.setDestinatario("Coloque o e-mail do destinatário aqui");
		
		Collection<AnexoBean> arquivos = new ArrayList<AnexoBean>();
		
		AnexoBean an = new AnexoBean();
		an.setCaminhoArquivo(HOME_PATH + "boleto.pdf");
		an.setNome("Boneca 1");
		arquivos.add(an);
		
		AnexoBean an2 = new AnexoBean();
		an2.setCaminhoArquivo(HOME_PATH + "boleto.pdf");
		an2.setNome("Boneca 2");
		arquivos.add(an2);
		
		em.setAnexos(arquivos);
		
		
		StringBuilder builder = new StringBuilder();
	    builder.append("<h1>Um titulo</h1>");
	    builder.append("<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. Duis nec aliquam tortor. Sed dignissim dolor ac est consequat egestas. Praesent adipiscing dolor in consectetur fringilla.</p>");
	    builder.append("<a href=\"http://wwww.botecodigital.info\">Boteco Digital</a> <br> ");
	    builder.append("<img src=\"http://www.botecodigital.info/wp-content/themes/boteco/img/logo.png\">");
	    
	    em.setMensagem(builder);
		
	    Util.enviarEmail(em);
//		HtmlEmail email = new HtmlEmail();
//		email.setSSLOnConnect(em.isSsl());
//		email.setHostName(em.getSmtp());
//		email.setSslSmtpPort(em.getPorta());
//		email.setAuthenticator(new DefaultAuthenticator(em.getLogin(), em.getSenha()));
//		try {
//		
//			email.setFrom(em.getEmailRemetente());
//			email.setDebug(em.isDebug());
//			email.setSubject(em.getAssunto());
//			
//			em.getAnexos().forEach(item->{
//				try {
//				
//				EmailAttachment anexo = new EmailAttachment();
//					anexo.setPath(item.getCaminhoArquivo());
//					anexo.setDisposition(EmailAttachment.ATTACHMENT);
//					anexo.setName(item.getNome());
//					
//					//Adiciona o anexo ao email � ser enviado.
//					email.attach(anexo);
//					
//					} catch (Exception e) {
//						System.out.println("Error : " + e.getMessage());
//						e.printStackTrace();
//					}
//			});
//			
//
//			//Anexando imagem ao corpo da mensagem.
//			String img = email.embed(new File(HOME_PATH + "imagemTeste.JPEG"));
//			String mensagemImg = "<img src=\"cid:"+img+"\"> Depois da imagem";
//			
//			email.setHtmlMsg("Ol� email de teste." + builder.toString() + mensagemImg);
//			email.addTo(em.getDestinatario());
//			
//			email.send();
//			
//		} catch (EmailException e) {
//			e.printStackTrace();
//		}
		
	}
	
	private static List<Object>  create(Date periodoInicio, Date periodoFim){
		List<Object> lista = new ArrayList<>();
		Calendar calendar = Calendar.getInstance();
//		DateTime dInicio = new DateTime(periodoInicio);
//		DateTime dFim = new DateTime(periodoFim);
//		Duration duracao = Duration.between(dInicio, dFim);
//	
//		if(periodoInicio.getTime() > periodoFim.getTime()){
//			System.out.println("O In�cio � maior!");
//		}else{
//			System.out.println("O In�cio � menor!");
//			
//		}
		
		LocalDateTime inicio = LocalDateTime.of(periodoInicio.getYear(), periodoInicio.getMonth(), periodoInicio.getDay(), 0, 0);
		LocalDateTime fim = LocalDateTime.of(periodoFim.getYear(), periodoFim.getMonth(), periodoFim.getDay(), 0, 0);
		
		Duration duracao = Duration.between(inicio, fim);
		System.out.println(duracao.toDays());
		
//		System.out.println("Duracao: " + duracao.toDays());
		
		
		
		return lista; 
	}
}
