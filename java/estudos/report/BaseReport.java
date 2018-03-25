package estudos.report;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.stream.IntStream;

import javax.imageio.ImageIO;

import estudos.bean.BaseBean;
import estudos.util.RegraException;
import estudos.util.Util;
import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRExporterParameter;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.ReportContext;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.export.JRGraphics2DExporter;
import net.sf.jasperreports.engine.export.JRGraphics2DExporterParameter;
import net.sf.jasperreports.engine.export.JRHtmlExporter;
import net.sf.jasperreports.engine.export.JRHtmlExporterParameter;
import net.sf.jasperreports.engine.export.JRRtfExporter;
import net.sf.jasperreports.engine.export.JRXlsExporter;
import net.sf.jasperreports.engine.export.JRXlsExporterParameter;
import net.sf.jasperreports.engine.export.oasis.JROdtExporter;
import net.sf.jasperreports.engine.export.ooxml.JRDocxExporter;
import net.sf.jasperreports.engine.export.ooxml.JRPptxExporter;
import net.sf.jasperreports.engine.export.ooxml.JRXlsxExporter;

public abstract class BaseReport<B extends BaseBean> implements Serializable {
	private static final long serialVersionUID = 1L;
	private List<String> mensagens;
	protected int totalPaginas;
	protected  Locale reportLocaleBR = new Locale("pt", "BR");
	
	protected void lancarErrorExistentesNasMensagens() throws RegraException{
		if(getMensagens().size() > 0){
			StringBuilder concateMsg = new StringBuilder();
			IntStream.range(0, getMensagens().size()).forEach(index ->{
				if(index > 0){
					concateMsg.append("\n");
				}
				concateMsg.append(getMensagens().get(index));
			});
			Util.lancarError(concateMsg.toString());
		}
	}
	
	protected List<String> getMensagens(){
		if(mensagens == null){
			mensagens = new ArrayList<>();
		}
		return mensagens;
	}
	
	
	/**
	 * Prepara as Streams para relatórios e subRelatorios.
	 * @param diretorio
	 * @param nomesRelatorios
	 * @return
	 * @throws RegraException 
	 */
	
	protected InputStream getImputStream(String diretorio, String nomeRelatorio) throws RegraException{
		InputStream input = null;
		try {
			String caminhoCompleto = diretorio + File.separator + nomeRelatorio;
			input = new FileInputStream(caminhoCompleto);
		} catch (Exception e) {
			Util.lancarError("Erro ao localizar o relatório " + nomeRelatorio);
		}
		return input;
	}
	
	protected JasperPrint gerarJasper(InputStream stream, HashMap<String, Object> parametros, List<B> listaBeans) throws RegraException{
		JasperPrint jasper = null;
		JRDataSource dataSource = new JRBeanCollectionDataSource(listaBeans);
		try {
			jasper = JasperFillManager.fillReport(stream, parametros, dataSource);
		} catch (JRException e) {
			throw new RegraException("Erro ao gerar o relatório: " + stream.toString()+ "!");
		}
		return jasper;
	}
	
	protected ByteArrayOutputStream exportar(JasperPrint jasperPrint, String docType) throws RegraException{
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		Float zoom = new Float(1.5);
		try {
			
		} catch (Exception e) {
			// TODO: handle exception
		}
		try {
		switch(docType){
			case "PDF":
				JasperExportManager.exportReportToPdfStream(jasperPrint, baos);
				break;
			case "RTF":
				JRRtfExporter rtfExporter = new JRRtfExporter();
				rtfExporter.setParameter(JRExporterParameter.JASPER_PRINT, jasperPrint);
				rtfExporter.setParameter(JRExporterParameter.OUTPUT_STREAM, baos);
				rtfExporter.setParameter(JRExporterParameter.CHARACTER_ENCODING, "UTF-8");
				rtfExporter.exportReport();
				break;
			case "XLS":
				JRXlsExporter xlsExporter = new JRXlsExporter();
				xlsExporter.setParameter(JRXlsExporterParameter.JASPER_PRINT, jasperPrint);
				xlsExporter.setParameter(JRXlsExporterParameter.IS_DETECT_CELL_TYPE, Boolean.TRUE);
				xlsExporter.setParameter(JRXlsExporterParameter.IS_WHITE_PAGE_BACKGROUND, Boolean.FALSE);
				xlsExporter.setParameter(JRXlsExporterParameter.IS_REMOVE_EMPTY_SPACE_BETWEEN_ROWS, Boolean.TRUE );
				xlsExporter.setParameter(JRXlsExporterParameter.IS_REMOVE_EMPTY_SPACE_BETWEEN_COLUMNS, Boolean.TRUE );
				xlsExporter.setParameter(JRXlsExporterParameter.IS_COLLAPSE_ROW_SPAN, Boolean.TRUE);
				xlsExporter.setParameter(JRXlsExporterParameter.IS_IGNORE_GRAPHICS, Boolean.FALSE);
				xlsExporter.setParameter(JRXlsExporterParameter.IS_IGNORE_CELL_BORDER, Boolean.FALSE);
				xlsExporter.setParameter(JRXlsExporterParameter.OUTPUT_STREAM, baos);
				xlsExporter.exportReport();
				break;
			case "XLSX": 
				JRXlsxExporter xlsxExporter = new JRXlsxExporter();
				xlsxExporter.setParameter(JRXlsExporterParameter.JASPER_PRINT, jasperPrint);
				xlsxExporter.setParameter(JRXlsExporterParameter.IS_ONE_PAGE_PER_SHEET, Boolean.TRUE);
				xlsxExporter.setParameter(JRXlsExporterParameter.IS_WHITE_PAGE_BACKGROUND, Boolean.FALSE);
				xlsxExporter.setParameter(JRXlsExporterParameter.IS_REMOVE_EMPTY_SPACE_BETWEEN_ROWS, Boolean.TRUE);
				xlsxExporter.setParameter(JRXlsExporterParameter.IGNORE_PAGE_MARGINS, Boolean.TRUE);
				xlsxExporter.setParameter(JRXlsExporterParameter.IS_IGNORE_CELL_BORDER, Boolean.FALSE);
				xlsxExporter.setParameter(JRXlsExporterParameter.OUTPUT_STREAM, baos);
				xlsxExporter.exportReport();
				break;
			case "ODT": 
				JROdtExporter odtExporter = new JROdtExporter();
				odtExporter.setParameter(JRExporterParameter.JASPER_PRINT, jasperPrint);
				odtExporter.setParameter(JRExporterParameter.OUTPUT_STREAM, baos);
				odtExporter.exportReport();
				break;
			case "PNG":
				BufferedImage pageImage = new BufferedImage((int) (jasperPrint.getPageWidth() * zoom + 1),
						(int) (jasperPrint.getPageHeight() * zoom + 1), BufferedImage.TYPE_INT_RGB);
				JRGraphics2DExporter exporter = new JRGraphics2DExporter();
				exporter.setParameter(JRExporterParameter.JASPER_PRINT, jasperPrint);
				exporter.setParameter(JRGraphics2DExporterParameter.GRAPHICS_2D, pageImage.getGraphics());
				exporter.setParameter(JRGraphics2DExporterParameter.ZOOM_RATIO, zoom);
				exporter.setParameter(JRExporterParameter.PAGE_INDEX, Integer.valueOf(0));
				exporter.exportReport();
				ImageIO.write(pageImage, "png", baos);
			
				break;
			case "HTML":
				JRHtmlExporter htmlExporter = new JRHtmlExporter();
				htmlExporter.setParameter(JRHtmlExporterParameter.JASPER_PRINT, jasperPrint);
				htmlExporter.setParameter(JRHtmlExporterParameter.OUTPUT_STREAM, baos);
				htmlExporter.setParameter(JRHtmlExporterParameter.IMAGES_URI, "img/");
				htmlExporter.setParameter(JRHtmlExporterParameter.IMAGES_DIR, new java.io.File("img"));
				htmlExporter.setParameter(JRHtmlExporterParameter.IS_OUTPUT_IMAGES_TO_DIR, Boolean.TRUE);
				htmlExporter.setParameter(JRHtmlExporterParameter.ZOOM_RATIO, zoom);
				htmlExporter.exportReport();
				break;
			case "DOCX":
				JRDocxExporter docxExporter = new JRDocxExporter();
				docxExporter.setParameter(JRExporterParameter.JASPER_PRINT, jasperPrint);
				docxExporter.setParameter(JRExporterParameter.OUTPUT_STREAM, baos);
				docxExporter.exportReport();
				break;
			case "PPTX":
				JRPptxExporter pptxExporter = new JRPptxExporter();
				pptxExporter.setParameter(JRExporterParameter.JASPER_PRINT, jasperPrint);
				pptxExporter.setParameter(JRExporterParameter.OUTPUT_STREAM, baos);
				pptxExporter.exportReport();
				break;
			default:
				break;
			}
		} catch (JRException | IOException e2) {
			Util.lancarError("Erro ao exportar o relatório!");
		}
		return baos;
	}
	
	public ByteArrayOutputStream criarRelatorio(String diretorio, String nomeRelatorio, List<B> listaBeans, String docType) throws RegraException{
		InputStream stream = getImputStream(diretorio, nomeRelatorio);
		JasperPrint jasperPrint = gerarJasper(stream, null, listaBeans);
		ByteArrayOutputStream baos = exportar(jasperPrint, docType);
		return baos;
	}

	
}
