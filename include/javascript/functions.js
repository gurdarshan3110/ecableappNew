/**
  * Javascript: Fetch the part of the string from right side of the Input string
  * str: Input String
  * n: No. to chracters to fetch from right.
  archana
  */
function myRight(str, n){
    if (n <= 0)
       return "";
    else if (n > String(str).length)
       return str;
    else {
       var iLen = String(str).length;
       return String(str).substring(iLen, iLen - n);
    }
}

// Common XAJAX routine to Activate / Deactivate.

function myChangeStatus(theForm, id)
{
	
//
	var stat=document.getElementById('enumStatus'+id).value;
	//alert(stat);
	
	if (stat=='A')
	{
		rtn = confirm("Are you sure you want to deactivate this record?");
	}	
	
	else if (stat=='D')
	{
		rtn = confirm("Are you sure you want to activate this record?");
	}
		
	if (rtn)
	{
		var status = eval('theForm.enumStatus'+id).value;
		
		xajax_update_status(id,status);
	}
	return false;
}
function myChangeStatusD(theForm, id)
{
	
//
	var stat=document.getElementById('vchdepositstatus'+id).value;
	//alert(stat);
	
	if (stat=='Deposit')
	{
		rtn = confirm("Are you sure you want to Refund the received deposit amount?");
	}	
	
	else if (stat=='Refund')
	{
		rtn = confirm("Are you sure you want to Deposit?");
	}
		
	if (rtn)
	{
		var status = eval('theForm.vchdepositstatus'+id).value;
		
		xajax_update_status_d(id,status);
	}
	return false;
}

function myChangeStatusForMore(theForm,id)
{
	var stat=document.getElementById('enumStatusFor'+id).value;
	if (stat=='A')
	{
		rtn = confirm("Are you sure you want to deactivate this record?");
	}	
	else if (stat=='D')
	{
		rtn = confirm("Are you sure you want to activate this record?");
	}	
	if (rtn)
	{
		var status=eval('theForm.enumStatusFor'+id).value;
		xajax_update_status_new(id,status);
	}
	return false;
}


function myChangePermissionStatus(id)
{
	rtn = confirm("Are you sure you want to give Full access to this member?");
	if (rtn) 
	{ 
		xajax_update_status_new(id);
	}
}

// Common XAJAX routine to Delete a row.
function sendNewsLetter(id)
{	
	if(confirm('Are you sure you want to send this newsletter?'))
		xajax_sendnewsletter(id);
}


function delete_row_selected(val,pageid,pageurl)
{	
	var item_val; 
	if (fnSelectedChecked())
	{
		if( confirm('Are you sure you want to delete all selected records?'))
		{	
			var i;
			for (i=1;i<val;i++)
			{
				if (document.getElementById('catCheck'+i).checked==true)	
				{
					item_val =document.getElementById('catCheck'+i).value;
					xajax_deleteRow(item_val);
				}
			}
			call_page_after_delete(pageid,pageurl);
		}
	}
}
function delete_row_answer(id,qnsid)
{	
	if( confirm('Are you sure you want to delete this record?'))
	{
		xajax_deleteRow_Answer(id,qnsid);
	}
	return false;	
}
function activate_row_selected(val)
{
	if (fnSelectedChecked())
	{
		if(confirm('Are you sure you want to activate all selected records?'))
		{
			var i;
			for (i=1;i<val;i++)
			{
				if (document.getElementById('catCheck'+i).checked==true)	
				{
					var item_val =document.getElementById('catCheck'+i).value;
					xajax_update_status(item_val,'D');
				}
			}
		}
	}
}
function deactivate_row_selected(val)
{
	if (fnSelectedChecked())
	{
		if(confirm('Are you sure you want to deactivate all selected records?'))
		{
			var i;
			for (i=1;i<val;i++)
			{
				if (document.getElementById('catCheck'+i).checked==true)	
				{
					var item_val =document.getElementById('catCheck'+i).value;
					xajax_update_status(item_val,'A');
				}
			}
		}
	}	
}

function fnCheckall()
{
	var chkall = document.getElementById('countCheck').value;
	var i;
	if (document.getElementById('checkall').checked==true)
	{
		for (i=1;i<chkall;i++)
		{
			document.getElementById('catCheck'+i).checked=true;		
		}	
	}
	else
	{
		for (i=1;i<chkall;i++)
		{
			document.getElementById('catCheck'+i).checked=false;		
		}	
	}
}

function fnSelectedChecked()
{
	var chkall = document.getElementById('countCheck').value;
	var i,chk=1;
	for (i=1;i<chkall;i++)
	{
		if (document.getElementById('catCheck'+i).checked==true)
		{
			chk=1;
			return true;	
			break;
		}
		else
		{
			chk=0;		
		}
	}
	if (chk==0)
	{
		alert("Please select at least one record.");
		return false;
	}
}

function call_page_after_delete(pagid,pageurl)
{
	//alert(pagid+' '+pageurl);
	sk_ajax_request(pageurl,'&page='+pagid+'&pagin=1','txtResult');
}

function call_page_after_refresh(pagid,pageurl)
{
	//alert(pagid+' '+pageurl);
	sk_ajax_request(pageurl,'&page='+pagid+'&pagin=1','txtResult');
}

// Common XAJAX routine to Delete a row.
function delete_row(id)
{
	if( confirm('Are you sure you want to delete this record?'))
		xajax_deleteRow(id);
}
/*
divyanshu comments to show column chart
function delete_all_row(ids)
{
	//if( confirm('Are you sure you want to delete selected record(s)?'))
		xajax_deleteAllRow(ids);
}

// Other Functions.
Array.prototype.exists = function (x) {
    for (var i = 0; i < this.length; i++) {
    	//alert(this[i].value+' Passed value: '+x);
        if (this[i].value == x) return true;
    }
    return false;
}
*/
function clear_cal_date(field_id)
{
	document.getElementById(field_id).value = ""; // Empty hidden variable value
	document.getElementById('disp_cal_'+field_id).innerHTML = '&nbsp;&nbsp;';
}

function byteCounter(field, countfield, maxlimit,setDiv) {
	if (field.value.length > maxlimit) // if too long...trim it!
	{
		field.value = field.value.substring(0, maxlimit);
		document.getElementById(setDiv).innerHTML = field.value.length+"/"+maxlimit;
		// otherwise, update 'characters left' counter
	}
	else
	{
		countfield.value = maxlimit - field.value.length;
		document.getElementById(setDiv).innerHTML = field.value.length+"/"+maxlimit;
	}
}

function get_element_text(element_id)
{
	var text = "";
	var elem = document.getElementById(element_id);
	if(elem.textContent) {
		text = trim(elem.textContent);
	} else if(elem.innerText) {
		text = trim(elem.innerText);
	}
	return text;
}

// Opens a POP Up window.
function MM_openBrWindow(theURL,winName,features)
{ //v2.0
  	window.open(theURL,winName,features);
}


// Image Swap Javascript
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function swap_text(txtCaption){
	if(window.document.getElementById)
	{
               window.document.getElementById("txtCaption").innerHTML=txtCaption;
	 }
           if(window.document.layers)
	   {
               window.document.layers["txtCaption"].innerHTML=txtCaption;
	       /*with(window.document.layers["txtCaption"].document){
                        open();
                        write(txtCaption);
                        close();
                  }*/
	    }
           if(window.document.all)
	   {
		window.document.all["txtCaption"].innerHTML=txtCaption;
	   }
}


// Validates if the element is present in the document or not ?
function isDefined(variable,type_evt)
{
	try
	{
		if(type_evt==1)
		{
			if (variable == null)
			{
				return false;
			}

			if ("undefined" == typeof(variable) )
			{
				return false;
			}
			return true;
		}
		else
			return (typeof(window[variable]) == "undefined")?  false: true;
	}
	catch(e)
	{
		//alert('here.');
	}
}

// Repeats the particular string to the specified number of times.
function strRepeat(cnt)
{
	var retStr = "";
	for(i=0;i<cnt;i++)
		retStr=retStr+",";
	return retStr;
}

// Core function to validate the forms. It reduces the time by just providing the validations for the specified field only. the other not required validations can be skipped.
function validateForm(myForm,cArray,cnt)
{
	var i=0;
	var values = "theControl,theMessage,theNumeric,theEmail,theURL,theConfirmPassword,thebadstuff,theinteger,thepercent,thesize,thedecimal,theimage,theempty,themin,themax,thecheckboxlength,thephoneno";
	var leftSide = new Array();
	var rightVals = new Array();
	leftSide = values.split(",");

	var strRepeats = strRepeat(cnt-1);

	for(i=0;i<leftSide.length;i++){
		if(cArray[leftSide[i]]){
			rightVals[i] = (cArray[leftSide[i]]);
		}else{
			rightVals[i] = strRepeats;
		}
		leftSide[i]=rightVals[i];
	}

	if(!theValidator(myForm,leftSide[0],leftSide[1],leftSide[2],leftSide[3],leftSide[4],leftSide[5],leftSide[6],leftSide[7],leftSide[8],leftSide[9],leftSide[10],leftSide[11],leftSide[12],leftSide[13],leftSide[14],leftSide[15],leftSide[16]))
		return false;

	return true;
}

function validate_FckEditor(instanceName)
{
	var oEditor = FCKeditorAPI.GetInstance(instanceName);
	var str =oEditor.EditorDocument.body.innerHTML;

	str = str.replace("&nbsp;", "");
     	str = str.replace("<BR>", "");
     	str = str.replace("<BR/>", "");
     	str = str.replace("<P>", "");
     	str = str.replace("</P>", "");
     	str = str.replace("<br>", "");
     	str = str.replace("<br/>", "");
     	str = str.replace("<p>", "");
     	str = str.replace("</p>", "");
	str = str.replace("<P", "");
	str = str.replace("_fckxhtmljob=", "");
	str = str.replace("\"", "");
	str = str.replace("\"", "");
	str = str.replace(">", "");
	if (!isNaN(str))
	{
		str = str.replace(str, "");
	}	

     	if(str == "")
     		return false;
     	else
     		return true;
}


// Play with the DOM to add a dynamic row of Text and the delete icon.
function addRowToTable(theForm)
{
	var tbl = document.getElementById('tblDynamic');
	var lastRow = tbl.rows.length;
	if(lastRow<=5)
	{
		if(document.getElementById('no-child'))
		{
			var ind=document.getElementById('no-child').rowIndex;
			tbl.deleteRow(ind);
			lastRow = tbl.rows.length;
		}

		theForm.tempCounter.value = parseInt(theForm.tempCounter.value,10)+1;
		var td0 = theForm.mm.value + '/' + theForm.dd.value + '/' + theForm.yy.value ;
		var dob= theForm.yy.value + '-' + theForm.mm.value + '-' + theForm.dd.value ;

		if(theForm.enumGender[0].checked)	{	var td1 = 'Boy';	}
		else							{	var td1 = 'Girl';	}

		var td2 = document.createElement('img');
		td2.setAttribute('src', 'images/delete-new.gif');
		td2.setAttribute('title', 'Delete');
		td2.setAttribute('alt', 'Delete');
		td2.setAttribute('border', '0');
		//td2.setAttribute('onclick', 'delRowTable('+theForm.tempCounter.value+');');
		//td2.onclick=function(){delRowTable(theForm.tempCounter.value)}

		var hidChild = document.createElement('input');
		hidChild.setAttribute('type', 'hidden');
		hidChild.setAttribute('name', 'child[]');
		if(td1 == 'Boy')			hidChild.setAttribute('value', 'B' + ',' + dob);
		else					hidChild.setAttribute('value', 'G' + ',' + dob);

		var row = tbl.insertRow(lastRow);
		row.setAttribute('id', 'child-' + theForm.tempCounter.value);

		td2.onclick=function(){delRowTable(row)}

		var cell0 = row.insertCell(0);
		var textNode0 = document.createTextNode(td0);
		cell0.appendChild(textNode0);
		cell0.appendChild(hidChild);

		var cell1 = row.insertCell(1);
		var textNode1 = document.createTextNode(td1);
		cell1.appendChild(textNode1);

		var cell2 = row.insertCell(2);
		cell2.appendChild(td2);
	}
	else
		alert('Maximum limit is 5.');
}

// Play with the DOM to remove a dynamic row of Text and the delete icon.
function delRowTable(tr)
{
	if(document.getElementById('child-'+tr))
	{
		var tbl = document.getElementById('tblDynamic');
		var ind=document.getElementById('child-'+tr).rowIndex;
		tbl.deleteRow(ind);
	}
	else
	{
		tr.parentNode.removeChild(tr);
	}
}

// For Manage Affiliate Module
function addRowToTable_associate(theForm)
{
	var tbl = document.getElementById('tblDynamic');
	var lastRow = tbl.rows.length;
// 	alert(lastRow);
	theForm.tempCounter.value = parseInt(theForm.tempCounter.value)+1;
	if(theForm.cat_level2.value != "")
	{
		var x=theForm.cat_level1;
		var y=theForm.cat_level2;
		var cat_id= theForm.cat_level2.value;
		var parent_id= theForm.cat_level1.value;
	}
	else
	{
		if(theForm.cat_level2.length >=0)
		{
			alert('Please select Sub-Category.');
			theForm.cat_level2.focus();
			return false;
		}

		var x=theForm.cat_level1;
		var y=theForm.cat_level2;
		var cat_id= theForm.cat_level2.value ;
		var parent_id= theForm.cat_level1.value;
	}


	cats = Form.getInputs(theForm,'hidden','cats[]');
	var my_cats = $A(cats);
	//alert(my_cats.inspect());
	/*
	my_cats.each(function(cat){
				alert('Value is: '+cat.value);
			});
	*/
	var is_exists;
	is_exists = (my_cats.exists(cat_id));
	/*
	is_exists = my_cats.find( function(cat){
		alert('Cat Value-'+cat.value+'- Cat ID-'+cat_id);
			alert (cat.value == cat_id);
			if (cat.value == cat_id)
			{
				alert('if');
				return false;
			}
			else
			{
				alert('else');
				return true;
			}
		});
	*/

	if(!is_exists)
	{
		var parent_name = x.options[x.selectedIndex].text ;
		var cat_name= y.options[y.selectedIndex].text ;
		var td0= '' + parent_name;
		var td1= '' + cat_name;

		var td2 = document.createElement('img');
		td2.setAttribute('src', 'images/delete1.gif');
		td2.setAttribute('title', 'Delete');
		td2.setAttribute('alt', 'Delete');
		td2.setAttribute('border', '0');
		td2.setAttribute('class', 'setcursor');
		//td1.onclick=function(){delRowTable_associate(theForm.tempCounter.value)}
		//Events cannot be set with set-attribute in IE


		var hidCat = document.createElement('input');
		hidCat.setAttribute('type', 'hidden');
		hidCat.setAttribute('name', 'cats[]');
		hidCat.setAttribute('value', cat_id);


		var row = tbl.insertRow(lastRow);
		row.setAttribute('id', 'cat-' + theForm.tempCounter.value);

		td2.onclick=function(){delRowTable_associate(row)}

		var cell0 = row.insertCell(0);
		var textNode0= document.createTextNode(td0);
	 	cell0.style.width='45%';
	 	cell0.valign='middle';
		cell0.appendChild(textNode0);
		cell0.appendChild(hidCat);

		var cell1 = row.insertCell(1);
		var textNode1 = document.createTextNode(td1);
	 	cell1.style.width='45%';
		cell1.align='center';
	 	cell1.valign='middle';
	// 	cell1.appendChild(hidCat);
		cell1.appendChild(textNode1);

		var cell2 = row.insertCell(2);
	 	cell2.style.width='10%';
	 	cell2.valign='middle';
		cell2.align='right';
	  	cell2.style.padding='8px';
		cell2.appendChild(td2);

		//return true;
	}
	else
	{
		alert('This category already exists.');
	}
	return true;
}

function delRowTable_associate(tr)
{
	if( confirm('Are you sure you want to delete this record?'))
	{
		if(document.getElementById('cat-'+tr))
		{
			var tbl = document.getElementById('tblDynamic');
			var ind=document.getElementById('cat-'+tr).rowIndex;
			tbl.deleteRow(ind);
		}
		else
		{
			tr.parentNode.removeChild(tr);
		}
	}
	return false;
}

// Comma Separated ID's are enabled on the form
function enableIDs(IDs)
{
	var IDs = IDs.split(',');
	for(i=0;i<IDs.length;i++)
	{
		e = document.getElementById(IDs[i]);
		e.disabled = "";
	}
}

// Comma Separated ID's are disabled on the form
function disableIDs(IDs)
{
	var IDs = IDs.split(',');
	for(i=0;i<IDs.length;i++)
	{
		e = document.getElementById(IDs[i]);
		e.disabled = "true";
	}
}

// Comma Separated ID's are used to show the hidden ids
function showHiddenIDs(IDs)
{
	var IDs = IDs.split(',');
	for(i=0;i<IDs.length;i++)
	{
		new Effect.Appear(IDs[i],{duration:0.0,from:0.1,to:1.0});
		//new Effect.Highlight(IDs[i],{startcolor:'#ffff99',endcolor:'#ffff99'});
		//e = document.getElementById(IDs[i]);
		//e.style.display = "";

	}
}

// Comma Separated ID's are used to hide the ids
function hideIDs(IDs)
{
	var IDs = IDs.split(',');
	for(i=0;i<IDs.length;i++)
	{
		new Effect.Fade(IDs[i],{ duration: 0.0 }); //, transition: Effect.Transitions.wobble});
		//e = document.getElementById(IDs[i]);
		//e.style.display = "none";
	}
}

function check_mandatory(theForm)
{
	id = self.setInterval("show_mandatory(document.getElementById('"+theForm+"'))",200);
}

function show_mandatory(theForm)
{
	if(theForm.cat_level2.length >1)
	{
		showHiddenIDs("sub-cat");
		enableIDs("cat_level2");
	}
/*
	if(theForm.cat_level3.length >1)
	{
		showHiddenIDs("sub_cat,sub_sub_cat");
		enableIDs("cat_level2");
		enableIDs("cat_level3");
	}*/
	/*
	if(stopRep=='true')
		self.clearInterval(id);
	else
		alert('running..');
	//alert('here');
	*/
}

function my_check_mandatory(theForm)
{
	id = self.setInterval("my_show_mandatory(document.getElementById('"+theForm+"'))",200);
}

function my_show_mandatory(theForm)
{
	if(theForm.cat_level2.length >1)
		enableIDs("cat_level2");
	if(theForm.cat_level3.length >1)
		enableIDs("cat_level2,cat_level3");
}

/*
* A Popup class to open new windows, using the Prototype.js lib.
*
* Basic Usage:
*   Popup.open( url_for_popup [, options [, window_options ] ] )
*
* Example:
*   Popup.open('http://www.google.com/');
* With options:
*   Popup.open('http://www.google.com/', { focus: true }, { statusbar: 1});
*
* To close the window:
*		Popup.close('http://www.google.com');
*
* To focus the window:
*		Popup.focus('http://www.google.com');
*/
/*
var Popup = Object.extend(Object.extend(Enumerable), {
	// open a popup
	// only mandatory is the url for the popup
	open: function(url) {
		// get the options
		var options = Object.extend({
			name: 'popup',
			focus: false
		}, arguments[1] || {});

		// get the window options
		var window_options = $H(Object.extend({
			width: 640,
			height: 480,
			toolbar: 0,
			scrollbars: 1,
			location: 0,
			statusbar: 0,
			menubar: 0,
			resizable: 1
		}, arguments[2] || {}));

		Popup[url] = window.open(url, options.name, window_options.map(function(v, i) {
			return v[0] + '=' + v[1];
		}).join(', '));

		if (options.focus) {
			this.focus(url);
		}
		return Popup[url];
	},

	// close a popup window
	// pass it the original url used to open the popup
	close: function(url) {
		if (url in this) {
			this[url].close();
			delete this[url];
		}
	},

	// focus am open popup window
	// pass it original url used to open the popup
	focus: function(url) {
		if (url in this) {
			this[url].focus();
			//this[url].print();
		}
	},

	print_page: function(url){
		if (url in this) {
			this[url].print();
		}
	}

});
*/
function PrintThisContent(prn_url)
{
	//Popup.open(prn_url, { focus: true }, { statusbar: 1});
	//Popup.print_page(prn_url);
	var sOption="toolbar=no,location=no,directories=no,menubar=no,";
	sOption+="scrollbars=yes,width=640,height=480,left=0,top=0";

	MM_openBrWindow(prn_url,'print_profile_window',sOption);
}

function PrintThisContent_js()
{
	//var divs = print_div_ids.split(',');
	var sWinHTML;
//	for(i=0;i<divs.length;i++)
//	{
//		var new_id = divs[i];
//		sWinHTML += document.getElementById("'"+new_id+"'").innerHTML;
//	}
	sWinHTML = document.getElementById("print_profile_type").innerHTML;
	sWinHTML += document.getElementById("print_innerfull").innerHTML;
	var class_file = "print_style";
	var addl_path = "";

//	if(in_admin==1)
//	{
//		addl_path = "../";
//		class_file = "style-admin";
//	}
	var popup_content='<html><head><meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"><title>:: ClickSize ::</title><link href="css/'+class_file+'.css" rel="stylesheet" type="text/css"></head><body><table width="500"  border="0" cellspacing="0" cellpadding="0" align="center"><tr><td><img src="images/clr.gif" width="1" height="1" alt=""></td></tr><tr><td id="welcom-bg"><img src="images/clr.gif" width="1" height="2" alt=""></td></tr><tr><td style="padding:15px;"><!--img src="'+addl_path+'images/logo1.gif" title="ClickSize"--></td></tr><tr><td bgcolor="#FFFFFF"><table width="100%" border="0" align="center" cellpadding="2" cellspacing="1"><tr><td>' + sWinHTML + '</td></tr><tr class="trbglc"><td align="center"><img src="images/clr.gif" alt="" width="1" height="1"></td></tr></table></td></tr></table><table width="580" border="0" align="center" cellpadding="0" cellspacing="0"><tr><td height="24" align="center" class="bottom-link-bg">Copyright &copy; 2007, clicksize.com. All Rights Reserved.</td></tr></table></body></html>';

	var sOption="toolbar=yes,location=no,directories=yes,menubar=yes,";
	sOption+="scrollbars=yes,width=1024,height=768,left=0,top=0";

	var winprint=window.open("","",sOption);
	winprint.document.open();
	winprint.document.write(popup_content);

	winprint.print();
    winprint.document.close();
    winprint.focus();
}


function check_all(ccount,ccheck)
{
	if(document.getElementById('checkStatus').value == "")
	{
		document.getElementById('checkStatus').value = "Check";
     
	    for (i=1;i<document.getElementById(''+ccount+'').value;i++)
	    {
	    	//alert(''+ccheck+'_'+i);
	       	document.getElementById(''+ccheck+'_'+i).checked=true;
	    }
	}
	else
	{
		document.getElementById('checkStatus').value = "";
	    for (i=1;i<document.getElementById(''+ccount+'').value;i++)
	    {
	       	document.getElementById(''+ccheck+'_'+i).checked=false;
	    }
	}
}

function chkOptions_all(act,theForm,ccheckbox,ccount)
{
	if(chkOptions(theForm,ccheckbox))
	{
		if(act=='D')
		{
			if(confirm('Are you sure you want to activate these records?'));
			else
				return false;
		}
		else if(act=='A')
		{
			if(confirm('Are you sure you want to deactivate these records?'));
			else
				return false;
		}
		else if(act=='Delete')
		{
			if(confirm('Are you sure you want to delete these records?'));
			else
				return false;
		}
		
		var strChkId='';delChkID = '';
		var i;
		for(i=0; i<theForm.elements.length; i++)
		{
		
			if(theForm.elements[i].name==''+ccheckbox+'[]' && theForm.elements[i].checked)
			{
				//if(strChkId == "")
					var strChkId = theForm.elements[i].value;
//				else
//					strChkId = strChkId + "," + document.frmCouponCode.elements[i].value;
					if(act == 'A')
					{
						
						xajax_update_status(strChkId,'A');
						
					}
					else if(act == 'D')
					{
						xajax_update_status(strChkId,'D');
						
					}
					 
					if(delChkID == "")
					{
						var delChkID = theForm.elements[i].value;
					}
					else
						delChkID = delChkID +","+theForm.elements[i].value;
					
			}
			
		}
		for (i=1;i<document.getElementById(''+ccount+'').value;i++)
	    {
	       	document.getElementById(''+ccheckbox+'_'+i).checked=false;
	    }
	    document.getElementById('checkStatus').value = "";
		if(act == 'Delete')
		{
			//alert(delChkID);
			xajax_deleteRow(delChkID);
			//call_page_after_delete(2,"/admin/promotions.php");
		}

	}
	else
	{
		return false;
	}
}
function chkAll_Options(act,theForm)
{
	
	    if(act == 'edit')
		{
			xajax_editmode(editChkID);
			//call_page_after_delete(2,"/admin/promotions.php");
		}
		if(act == 'Delete')
		{
			xajax_deleteRow(delChkID);
			//call_page_after_delete(2,"/admin/promotions.php");
		}
		
		//alert(strChkId);
		
		
		//$strRadioId=$strRadioId.substring(10,$strRadioId.length);
//		
//		if(act=='edit')
//		{
//			window.location='manage-links.php?act='+act+'&pId='+strRadioId;
//		}
//		else
//		{
//			window.location='manage-links.php?act='+act+'&pId='+strRadioId;
//		}
	}
	
function chkOptions(theForm,ccheckbox)
{
	var resVal=''; 
	//alert(ccheckbox);
	for(i=0; i<theForm.elements.length; i++)
	{
		
			//alert(document.frmCouponCode.elements[i].name);
			if(theForm.elements[i].name==''+ccheckbox+'[]' && theForm.elements[i].checked)
			{
				if(resVal == "")
					var resVal=theForm.elements[i].value;
				else
					resVal = resVal + "," + theForm.elements[i].value;
			}
		
	}
	//alert(resVal);
	if(resVal=='')
	{
		alert('Please select a record.');
		return false;
	}
	else
	{
		//alert(resVal);
		return true;
	}
} 
