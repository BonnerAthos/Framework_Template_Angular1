package estudos.util;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.EmailAttachment;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.HtmlEmail;

import estudos.bean.EmailBean;

//Thread.currentThread().getContextClassLoader().getResourceAsStream
public class Util {
//	Constantes
	public static final String EXTENSAO_PROPERTIES = ".properties";
	public static final String VALIDATION_MESSAGE_PT_BR = "ValidationMessage-pt-br.properties";
	public static final String VALIDATION_MESSAGE_EN = "ValidationMessage-EN.properties";
	public static final String ERRO_CARREGAR_ARQUIVO = "Erro ao tentar carregar o arquivo: %s";
	
	public static String cortarDaStringAte(String texto, String corte) throws RegraException{
		if(isNotVazio(texto) && isNotVazio(corte) && texto.length() > corte.length()){
			texto = texto.substring(0, texto.indexOf(corte));
		}else{
			lancarError("Error ao cortar da estring!");
		}
		return texto;
	}
	
	
	public static boolean isNotVazio(String texto){
		if(texto != null && texto != ""){
			return true;
		}else{
			return false;
		}
	}
	
	public static void lancarError(String mensagem) throws RegraException{
		throw new RegraException(mensagem);
	}
	
	public static String getValueProperties(String chave, String nomeArquivo) throws RegraException {
		String msg = "";
		try {
			Properties arquivo = new Properties();
			if(!nomeArquivo.endsWith(EXTENSAO_PROPERTIES)){
				nomeArquivo += EXTENSAO_PROPERTIES;
			}
			InputStream in = Thread.currentThread().getContextClassLoader().getResourceAsStream("/" + nomeArquivo);
			arquivo.load(in);
			msg = arquivo.getProperty(chave);
		} catch (IOException e) {
			e.printStackTrace();
			throw new RegraException(String.format(ERRO_CARREGAR_ARQUIVO, nomeArquivo));
		}
		return msg;
	}
	
	/**
	 * Validação de extesão de arquivo passando apenas o caminho do mesmo
	 * @param arquivo
	 * @return se o arquivo é uma imagem ou não.
	 */
	public static String validarExtensao(String arquivo) {
		String retorno = "";
			
			if (arquivo.endsWith(".png") || arquivo.endsWith(".jpeg") || arquivo.endsWith(".jpg")) {
				retorno = "img";
			}else{
				retorno = "file";
			}
		return retorno;
	}
	
	/**
	 * Metódo para enviar e-mail.
	 * @param em EmailBean
	 */
	public static void enviarEmail(EmailBean em) {
		
	    StringBuilder msgEmbutida = new StringBuilder();
		
		HtmlEmail email = new HtmlEmail();
		email.setSSLOnConnect(em.isSsl());
		email.setHostName(em.getSmtp());
		email.setSslSmtpPort(em.getPorta());
		email.setAuthenticator(new DefaultAuthenticator(em.getLogin(), em.getSenha()));
		email.setStartTLSRequired(em.isStarTLS());

		try {
			email.setFrom(em.getEmailRemetente());
			email.setDebug(em.isDebug());
			email.setSubject(em.getAssunto());
			
			em.getAnexos().forEach(item->{
				try {
					
					if (!em.getImgEmbutida().equals("") && Util.validarExtensao(item.getCaminhoArquivo()).equals("img")) {
						//Anexando imagem ao corpo da mensagem.
						String img = email.embed(new File(item.getCaminhoArquivo()));
						msgEmbutida.append("<img src=\"cid:"+img+"\">");
					}else {
						EmailAttachment anexo = new EmailAttachment();
						anexo.setPath(item.getCaminhoArquivo());
						anexo.setDisposition(EmailAttachment.ATTACHMENT);
						anexo.setName(item.getNome());
						
						//Adiciona o anexo ao email à ser enviado.
						email.attach(anexo);
					}
					
					} catch (Exception e) {
						System.out.println("Error : " + e.getMessage());
						e.printStackTrace();
					}
			});
			
			email.setHtmlMsg(em.getMensagem().toString()+ msgEmbutida);
			email.addTo(em.getDestinatario());
			System.out.println("enviando mensagem.......");
			email.send();
			
		} catch (EmailException e) {
			e.printStackTrace();
		}
		
	}
	
}	
