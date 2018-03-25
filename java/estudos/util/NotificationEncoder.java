package estudos.util;

import javax.json.Json;
import javax.json.JsonObject;
import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

public class NotificationEncoder implements Encoder.Text<Notification>{

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void init(EndpointConfig arg0) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String encode(Notification notification) throws EncodeException {
		JsonObject jsonObject = Json.createObjectBuilder()
				.add("tipo", notification.getTipo())
				.add("idUsuario", notification.getIdUsuario())
				.add("label", notification.getLabel())
				.add("text", notification.getText()).build();
		return  jsonObject.toString();
	}
	
}
