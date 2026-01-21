<?php
	echo $url="http://alerts.prioritysms.com/api/web2sms.php?workingkey=A70d42c237b1c3c40a7c4a2780ff176ec&to=9023279634&sender=MSJPIS&message=".urlencode("Boys Boarding House");
	$ch = curl_init($url);
    $output = curl_exec($ch);
    echo $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    exit;
?>
