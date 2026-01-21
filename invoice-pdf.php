<?php
    ob_start();
	require_once('helper.php');
	include(dirname(__FILE__).'/invoice-pdf-print.php');	
	$content = ob_get_clean();
	// convert in PDF
	require_once(dirname(__FILE__).'/html2pdf.class.php');
		try
		{
			$html2pdf = new HTML2PDF('P', 'A4', 'fr');
			$html2pdf->writeHTML($content, isset($_GET['vuehtml']));
			$html2pdf->Output('student-cards.pdf');
			$html2pdf->Output($path,'F');
		}
		catch(HTML2PDF_exception $e) {
			echo $e;
			exit;
		}  
?>
