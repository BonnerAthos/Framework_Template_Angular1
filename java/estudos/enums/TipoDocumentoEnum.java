package estudos.enums;

public enum TipoDocumentoEnum {
	
	RTF("RTF"), PNG("PNG"), PDF("PDF"), PPTX("PPTX"), DOCX("DOCX"), HTML("HTML"), ODT("ODT"), XLSX("XLSX"), XLS("XLS");
	public String tipo;
	private TipoDocumentoEnum(String tipo) {
		this.tipo = tipo;
	}
	public String getTipo(){
		return this.tipo;
	}
}
