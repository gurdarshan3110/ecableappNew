<?php
    ob_start();
    $dirPath    = dirname(__FILE__);
    $dir        = explode('/',$dirPath);
    array_pop($dir);
    $newDirPath = implode('/',$dir);

    if($_REQUEST['term_id']=='B'){
        if($_REQUEST['class']==3300 || $_REQUEST['class']==3301){
            include($dirPath.'/vsis-report-card-for-annual-1-2-pdf-print.php');
        }else if($_REQUEST['class']==3302 || $_REQUEST['class']==3303 || $_REQUEST['class']==3304){
            include($dirPath.'/vsis-report-card-for-annual-3-4-5-pdf-print.php');
        }else if($_REQUEST['class']==3305 || $_REQUEST['class']==3306 || $_REQUEST['class']==3307){
            include($dirPath.'/vsis-report-card-for-annual-6-7-8-pdf-print.php');
        }else if($_REQUEST['class']==3308 || $_REQUEST['class']==3319 || $_REQUEST['class']==3320){
            include($dirPath.'/vsis-report-card-for-term-9-11-12-pdf-print-annual.php');
        }else if($_REQUEST['class']==3310 || $_REQUEST['class']==3316 || $_REQUEST['class']==3317){
            include($dirPath.'/vsis-report-card-for-term-11-pdf-print-annual.php');
        }else if($_REQUEST['class']==3309 || $_REQUEST['class']==3311){
            include($dirPath.'/vsis-report-card-for-term-10-pdf-print-annual.php');
        }
        $content = ob_get_clean();
        // convert in PDF
        require_once($newDirPath.'/html2pdf.class.php');
        try
        {
            $html2pdf = new HTML2PDF('A4', array('210','297'), 'en', true, 'UTF-8', array(0, 0, 0, 0));
            $html2pdf->writeHTML($content, isset($_GET['vuehtml']));
            $html2pdf->Output('primary-report-card.pdf');
        }
        catch(HTML2PDF_exception $e) {
            echo $e;
            exit;
        }
    }else if($_REQUEST['term_id']=='PT1' || $_REQUEST['term_id']=='PT2'){
        include($dirPath.'/vsis-report-card-for-pt-1-pdf-print.php');
        $content = ob_get_clean();
        require_once($newDirPath.'/html2pdf.class.php');
        try
        {
            $html2pdf = new HTML2PDF('A4', array('210','297'), 'en', true, 'UTF-8', array(0, 0, 0, 0));
            $html2pdf->writeHTML($content, isset($_GET['vuehtml']));
            $html2pdf->Output('primary-report-card.pdf');
        }
        catch(HTML2PDF_exception $e) {
            echo $e;
            exit;
        }
    }else{
        if($_REQUEST['class']==3300 || $_REQUEST['class']==3301){
            include($dirPath.'/vsis-report-card-for-term-1-2-pdf-print.php');
        }else if($_REQUEST['class']==3302 || $_REQUEST['class']==3303 || $_REQUEST['class']==3304){
            include($dirPath.'/vsis-report-card-for-term-3-4-5-pdf-print.php');
        }else if($_REQUEST['class']==3305 || $_REQUEST['class']==3306 || $_REQUEST['class']==3307){
            include($dirPath.'/vsis-report-card-for-term-6-7-8-pdf-print.php');
        }else if($_REQUEST['class']==3308 || $_REQUEST['class']==3310 || $_REQUEST['class']==3316 || $_REQUEST['class']==3317){
            include($dirPath.'/vsis-report-card-for-term-9-11-12-pdf-print.php');
        }else if($_REQUEST['class']==3309 || $_REQUEST['class']==3311 || $_REQUEST['class']==3319 || $_REQUEST['class']==3320){
            include($dirPath.'/vsis-report-card-for-term-10-pdf-print.php');
        }
        ///vardhman-report-card-for-lower-secondary-pdf-print.php
        $content = ob_get_clean();
        // convert in PDF
        require_once($newDirPath.'/html2pdf.class.php');
        try
        {
            $html2pdf = new HTML2PDF('A4', array('210','297'), 'en', true, 'UTF-8', array(0, 0, 0, 0));
            $html2pdf->writeHTML($content, isset($_GET['vuehtml']));
            $html2pdf->Output('primary-report-card.pdf');
        }
        catch(HTML2PDF_exception $e) {
            echo $e;
            exit;
        }
    }


