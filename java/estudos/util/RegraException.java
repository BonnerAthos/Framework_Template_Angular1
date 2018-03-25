package estudos.util;

public class RegraException extends Exception {
	private static final long serialVersionUID = 1L;
	public RegraException() {
		super("Error inesperado!");
	}
	public RegraException(String mensagem) {
		super(mensagem);
	}
}
