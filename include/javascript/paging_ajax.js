var set_div;
function GetXmlHttpObject(handler)
{
   var objXMLHttp=null
   if (window.XMLHttpRequest)
   {
       objXMLHttp=new XMLHttpRequest()
   }
   else if (window.ActiveXObject)
   {
       objXMLHttp=new ActiveXObject("Microsoft.XMLHTTP")
   }
   return objXMLHttp
}

function stateChanged()
{

   if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete")
   {
		document.getElementById(set_div).innerHTML=xmlHttp.responseText
		//alert(xmlHttp.responseText);
		//$(set_div).appendChild(document.createTextNode(xmlHttp.responseText))
   }
   else {
		//alert(xmlHttp.status);
   }
}

function sk_ajax_request(url,qStr,id_to_update)
{
	set_div = id_to_update;
   //$('msg').innerHTML = "&nbsp";

   if (url.length==0)
   {
       document.getElementById(id_to_update).innerHTML="";
       return;
   }


	if(url.indexOf('?',0)==-1)
		url=url+"?sk=1"+qStr;
	else
		url=ulr+qStr;
   //alert(id_to_update);
   //alert(url);
   //new Ajax.Updater(set_div, url, {Asynchronous: true, });


   xmlHttp=GetXmlHttpObject()
   if (xmlHttp==null)
   {
       alert ("Browser does not support HTTP Request");
       return;
   }

   //url=url+"?"+qStr;
   //url=url+"&sid="+Math.random();
   xmlHttp.onreadystatechange=stateChanged;
   xmlHttp.open("GET",url,true) ;
   xmlHttp.send(null);

}