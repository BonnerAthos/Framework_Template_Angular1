package estudos.controller;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.logging.Logger;

import javax.inject.Singleton;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import estudos.util.Notification;
import estudos.util.NotificationDecoder;
import estudos.util.NotificationEncoder;

@ServerEndpoint(value = "/notificationController",
		encoders = {NotificationEncoder.class},
		decoders = {NotificationDecoder.class})
public class NotificationController{
	private static final Logger LOGGER = Logger.getLogger(NotificationController.class.getName());
	//Tipos de mensagens
//	private static final String msg_
	
	
	private static Set<Session> userSessions = Collections.synchronizedSet(new HashSet<Session>());

	
	@OnMessage
	public void receberMensagem(Notification notification, Session session){
		for(Session s : userSessions){
			s.getAsyncRemote().sendObject(notification);
		}
		System.out.println("------------------------------------");
		System.out.println(notification.getTipo());
		System.out.println(notification.getIdUsuario());
		System.out.println(notification.getLabel());
		System.out.println(notification.getText());
		System.out.println(session);
	}
	
	@OnOpen
	public void abrirConexao(Session session){
		System.out.println("Abriu conexao");
		System.out.println(session);
		userSessions.add(session);
		System.out.println("Tamanho: " + userSessions.size());
	}
	
	@OnClose
	public void fechaConexao(Session session){
		System.out.println("Fechou conexao!");
		userSessions.remove(session);
		System.out.println("Tamanho: " + userSessions.size());
	}
	
}
