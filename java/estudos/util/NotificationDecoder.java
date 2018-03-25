package estudos.util;

import java.io.StringReader;

import javax.json.Json;
import javax.json.JsonObject;
import javax.websocket.DecodeException;
import javax.websocket.Decoder;
import javax.websocket.EndpointConfig;

public class NotificationDecoder implements Decoder.Text<Notification>{

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void init(EndpointConfig arg0) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Notification decode(String jsonNotification) throws DecodeException {
		JsonObject jsonObject = Json.createReader(new StringReader(jsonNotification)).readObject();
		Notification notification = new Notification();
		notification.setTipo(jsonObject.getString("tipo"));
		notification.setIdUsuario(Long.parseLong(jsonObject.getString("idUsuario")));
		notification.setLabel(jsonObject.getString("label"));
		notification.setText(jsonObject.getString("text"));
		return notification;
	}

	@Override
	public boolean willDecode(String jsonNotification) {
		try {
	      // Check if incoming message is valid JSON
	      Json.createReader(new StringReader(jsonNotification)).readObject();
	      return true;
	    } catch (Exception e) {
	      return false;
	    }
	}
	
}