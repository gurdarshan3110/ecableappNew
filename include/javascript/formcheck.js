//////////////// Common Header and Footer JS Code /////////////////////////////
function chkform(theForm)
{	
	arr = new Array();
	arr["theControl"]="vchEmail,vchPassword";
	arr["theMessage"]="Email ID,Password";
	arr["theempty"]="Y,Y";
	arr["theEmail"]="Y,";	
	arr["thebadstuff"] = ",";
	if(!validateForm(theForm,arr,5))
		return false;
	else
	{
		xajax_login_member(theForm.vchEmail.value,theForm.vchPassword.value);
		return false;
	}
		//return true;	
}

function checkforgotpass(theForm)
{	
	arr = new Array();
	arr["theControl"]="vchEmail";
	arr["theMessage"]="Your Email ID";
	arr["theempty"]="Y";
	arr["theEmail"]="Y";	
	arr["thebadstuff"] = "";
	if(!validateForm(theForm,arr,5))
		return false;
	else
	{
		xajax_forgot_password(theForm.vchEmail.value);
		return false;
	}
		//return true;	
}

function hide_forgot_password()
{	
	setTimeout('hide_forgot()',3000);
}
function hide_forgot()
{	
	clear_forgot_feild();
	Effect.SlideUp('dd1'); return false;
}
function clear_forgot_feild()
{
	document.getElementById('forgot_msg').innerHTML = "&nbsp;";
	document.getElementById('vchEmail').value = "";
}	

function show_login_boxes()	// If login was not correct then this function calls by ajax
{
	setTimeout('insert_login_html()',2000);
}
function insert_login_html()
{	
	xajax_login_box_regenerate();
}

function redirect_login(url)
{
	window.location=url;
}

function show_deactivate_msg(divpos)
{
	document.getElementById('dd2').style.top=divpos;
	setTimeout('hide_deactivate_msg()',30000);
	Effect.toggle('dd2'); return false;
}
function hide_deactivate_msg()
{
	if (document.getElementById('dd2').style.display == '')
		Effect.SlideUp('dd2'); return false;
}
function hide_deactivate_msg_after_some_time()
{
	setTimeout('hide_deactivate_msg()',5000);
}	

function show_incorrect_msg(divpos)
{
	document.getElementById('dd3').style.top=divpos;
	setTimeout('hide_incorrect_msg()',30000);
	Effect.toggle('dd3'); return false;
}
function hide_incorrect_msg()
{
	if (document.getElementById('dd3').style.display == '')
		Effect.SlideUp('dd3'); return false;
}
function hide_incorrect_msg_after_some_time()
{
	setTimeout('show_incorrect_msg()',5000);
}	


//////////////// End Of Common Header and Fooer JS Code /////////////////////////////

//////////////// Member Registration JS Code /////////////////////////////

function checkforProffessionalMember(theForm,regType)
{
	arr = new Array();
	arr["theControl"]="vchFName,vchLName,vchEmail,vchPassword,vchRePassword,txtAddress,vchPhone";
	arr["theMessage"]="First Name,Last Name,Email,Password,Re-type Password,Address,Phone";
	arr["theConfirmPassword"]=",,,,Y,,";	
	arr["theEmail"]=",,Y,,,,";
	arr["theempty"]="Y,Y,Y,Y,Y,Y,Y";
	arr["theimage"]=",,,,,,";
	arr["thebadstuff"]="7,,,,,,";
	
	if(!validateForm(theForm,arr,7))
		return false;
	if (regType=='New')
	{
		if (theForm.vchVarificationCode.value=='')
		{
			alert("Please enter the Varification Code");
			return false;
		}
	}

}
function checklogin(theForm,divpos)
{	
	arr = new Array();
	arr["theControl"]="vchEmail,vchPassword";
	arr["theMessage"]="Email,Password";
	arr["theConfirmPassword"]=",";	
	arr["theEmail"]="Y,";
	arr["theempty"]="Y,Y";
	arr["theimage"]=",";
	arr["thebadstuff"]=",";
	
	if(!validateForm(theForm,arr,2))
		return false;
	else
	{
		xajax_login_member(theForm.vchEmail.value,theForm.vchPassword.value,divpos);
		return false;
	}

}
//////////////// End Of Member Registration JS Code /////////////////////////////

/////////////////// Password Strength JS /////////////////////////////////////
function passwordStrength(password)
{
	var desc = new Array();
	desc[0] = "Very Weak";
	desc[1] = "Weak";
	desc[2] = "Better";
	desc[3] = "Medium";
	desc[4] = "Strong";
	desc[5] = "Strongest";

	var score   = 0;

	//if password bigger than 6 give 1 point
	if (password.length > 6) score++;

	//if password has both lower and uppercase characters give 1 point	
	if ( ( password.match(/[a-z]/) ) && ( password.match(/[A-Z]/) ) ) score++;

	//if password has at least one number give 1 point
	if (password.match(/\d+/)) score++;

	//if password has at least one special caracther give 1 point
	if ( password.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/) )	score++;

	//if password bigger than 12 give another 1 point
	if (password.length > 12) score++;

	 document.getElementById("passwordDescription").innerHTML = desc[score];
	 document.getElementById("passwordStrength").className = "strength" + score;
}
///////////////////////////// End Of Password Strength JS //////////////////////////////////

function call_to_hide_error_message()
{
	setTimeout("hide_message()",3000);
}

function hide_message()
{
	document.getElementById('msg').innerHTML="";
	document.getElementById('msg_hid').value="";
}

function fotgot_password_div(divpos)
{
	document.getElementById('dd1').style.top=divpos;
	Effect.toggle('dd1','appear'); 
	return false;
}

function changeToTxt(val,hideid,dispid)
{	
	//alert(val);
	if (isNaN(val))
	{
		document.getElementById(dispid).style.display='';
	}
	else
	{
		document.getElementById(dispid).style.display='none';
	}
}

function changeToTxtMulti(val,hideid,dispid,fieldnameid,vchfield)
{
	var i;
	for (i=0; i<document.getElementById(fieldnameid).length;i++)
	{
		if (document.getElementById(fieldnameid).options[i].selected==true)
		{
			//document.getElementById(fieldnameid).options[i].selected=true;
			//IDs += document.getElementById(fieldnameid).options[i].value+",";
			if (document.getElementById(fieldnameid).options[i].value == 'Other')	
			{
				document.getElementById(vchfield).value = "";
				changeToTxt('Other',hideid,dispid);
			}
			else
				changeToTxt(document.getElementById(fieldnameid).options[i].value,hideid,dispid);
		}
	}
}

function checkEducationForm(theForm,formNam)
{
	arr = new Array();
	if (isNaN(theForm.intProfessionID.value))
	{
		arr["theControl"]="intProfessionID,vchProfession,intEducationID,vchEducation";
		arr["theMessage"]="Profession on professional information module,Other Profession,Education,Other Education";
		arr["theConfirmPassword"]=",,,";	
		arr["theEmail"]=",,,";
		arr["theempty"]="Y,Y,Y,Y";
		arr["theimage"]=",,,";
		arr["thebadstuff"]=",,,";
	}
	else
	{
		arr["theControl"]="intProfessionID,intEducationID";
		arr["theMessage"]="Profession on professional information module,Education";
		arr["theConfirmPassword"]=",";	
		arr["theEmail"]=",";
		arr["theempty"]="Y,Y";
		arr["theimage"]=",";
		arr["thebadstuff"]=",";
	}
	if(!validateForm(theForm,arr,4))
		return false;
	else
	{	
		xajax_insert_update_education(xajax.getFormValues(formNam));
		return false;
	}
}

function checkSpecialtyForm(theForm,formNam)
{
	arr = new Array();
	if (isNaN(theForm.intProfessionID1.value))
	{
		arr["theControl"]="intProfessionID1,vchProfession1,intSpecialtyID,vchSpecialty";
		arr["theMessage"]="Profession on professional information module,Other Profession,Specialty,Other Specialty";
		arr["theConfirmPassword"]=",,,";	
		arr["theEmail"]=",,,";
		arr["theempty"]="Y,Y,Y,Y";
		arr["theimage"]=",,,";
		arr["thebadstuff"]=",,,";
	}
	else
	{
		arr["theControl"]="intProfessionID1,intSpecialtyID";
		arr["theMessage"]="Profession on professional information module,Specialty";
		arr["theConfirmPassword"]=",";	
		arr["theEmail"]=",";
		arr["theempty"]="Y,Y";
		arr["theimage"]=",";
		arr["thebadstuff"]=",";
	}
	if(!validateForm(theForm,arr,4))
		return false;
	else
	{	
		xajax_insert_update_speciality(xajax.getFormValues(formNam));
		return false;
	}
}

function checkCertificateForm(theForm,formNam)
{
	arr = new Array();
	if (isNaN(theForm.intProfessionID2.value))
	{
		if (theForm.intProfessionalMemberCertificationID.value=='')
		{
			arr["theControl"]="intProfessionID2,vchProfession2,intCertificationID,vchCertificate,filename";
			arr["theMessage"]="Profession on professional information module,Other Profession,Certificate,Other Certificate,Certificate Image";
			arr["theConfirmPassword"]=",,,,";	
			arr["theEmail"]=",,,,";
			arr["theempty"]="Y,Y,Y,Y,Y";
			arr["theimage"]=",,,,Y";
			arr["thebadstuff"]=",,,,";
		}
		else
		{
			arr["theControl"]="intProfessionID2,vchProfession2,intCertificationID,vchCertificate";
			arr["theMessage"]="Profession on professional information module,Other Profession,Certificate,Other Certificate";
			arr["theConfirmPassword"]=",,,";	
			arr["theEmail"]=",,,";
			arr["theempty"]="Y,Y,Y,Y";
			arr["theimage"]=",,,";
			arr["thebadstuff"]=",,,";
		}
	}
	else
	{
		if (theForm.intProfessionalMemberCertificationID.value=='')
		{
			arr["theControl"]="intProfessionID2,intCertificationID,filename";
			arr["theMessage"]="Profession on professional information module,Certificate,Certificate Image";
			arr["theConfirmPassword"]=",,";	
			arr["theEmail"]=",,";
			arr["theempty"]="Y,Y,Y";
			arr["theimage"]=",,Y";
			arr["thebadstuff"]=",,";
		} 
		else
		{
			arr["theControl"]="intProfessionID2,intCertificationID";
			arr["theMessage"]="Profession on professional information module,Certificate";
			arr["theConfirmPassword"]=",";	
			arr["theEmail"]=",";
			arr["theempty"]="Y,Y";
			arr["theimage"]=",";
			arr["thebadstuff"]=",";
		}
	}
	if(!validateForm(theForm,arr,5))
		return false; 
	else
	{	
		xajax_insert_update_certificate(xajax.getFormValues(formNam));
		return false;
	}
}
function checkMainProfilePicture(theForm,frmName)
{
	arr = new Array();	
	arr["theControl"]="filename";
	arr["theMessage"]="Main Picture";
	arr["theempty"]="Y";
	arr["theimage"]="Y";
	if(!validateForm(theForm,arr,1))
		return false;
	else
	{
		xajax_update_main_picture(xajax.getFormValues(frmName));	
		return false;
	}
}
function checkProfPhotoAlbum(theForm,frmName)
{
	arr = new Array();	
	arr["theControl"]="filename";
	arr["theMessage"]="Album Photo";
	arr["theempty"]="Y";
	arr["theimage"]="Y";
	if(!validateForm(theForm,arr,1))
		return false;
	else
	{
		xajax_insert_photo_album(xajax.getFormValues(frmName));	
		return false;
	}
}
function checkMainProfileVideo(theForm,frmName)
{
	arr = new Array();	
	arr["theControl"]="filename";
	arr["theMessage"]="Profile Main Video";
	arr["theempty"]="Y";
	arr["theimage"]="SWFWMV";
	if(!validateForm(theForm,arr,1))
		return false;
	else
	{
		xajax_update_main_video(xajax.getFormValues(frmName));	
		return false;
	}
}


function checkForProfBio(theForm)
{
	arr = new Array();
	arr["theControl"]="vchFName,txtAddress,intCountryID,intStateID,vchState,intCityID,vchCity,vchZipCode,";
	arr["theMessage"]="First Name,Address,Country,State,State,City,City,ZipCode";
	arr["theEmail"]=",,,,,,,";
	arr["theempty"]="Y,Y,Y,Y,Y,Y,Y,Y";
	arr["theimage"]=",,,,,,,";
	arr["thebadstuff"]=",,,,,,,";

	if(!validateForm(theForm,arr,8))
		return false;
		
}

function checkProfessionalInformation(theForm)
{
	arr = new Array();
	arr["theControl"]="intProfessionID";
	arr["theMessage"]="Primary Health Profession";
	arr["theEmail"]=",";
	arr["theempty"]="Y";
	arr["theimage"]=",";
	arr["thebadstuff"]=",";

	if(!validateForm(theForm,arr,1))
		return false;
}


function checkLicenseForm(theForm,frmName)
{
	var bool=false;
	for (i=1; i<document.getElementById('intCountryIDs').length;i++)
	{
		if (document.getElementById('intCountryIDs').options[i].selected==true)
		{
			bool=true;
			break;	
		}
	}
	if (bool==false)
	{
		alert("Please select at least one country.");
		return false;	
	}
	else
	{	
		xajax_insert_update_license(xajax.getFormValues(frmName));
	}	
	return false;	
}

function select_all(val,fieldname)
{
	var IDs='';
	
	for (i=0; i<document.getElementById(fieldname).length;i++)
	{
		if (document.getElementById(fieldname).options[i].selected==true)
		{
			document.getElementById(fieldname).options[i].selected=true;
			IDs += document.getElementById(fieldname).options[i].value+",";
		}
	}
	//document.getElementById(fieldname).options[0].selected=false;
	
	IDs=IDs.substr(0,IDs.length-1);	
	
	if (fieldname == 'intCountryIDs')
	{
		//xajax_getMultiCountryNames(IDs);	
		xajax_getMultiStates(IDs);
	}
	else if (fieldname == 'intStateIDs')
	{
		//xajax_getMultiStateNames(IDs);
		xajax_getMultiCities(IDs);
	}
	/*else if (fieldname == 'intCityIDs')
	{
		xajax_getMultiCityNames(IDs);	
	}*/		

}

function auto_populate_education_drop_dwon(profid,educationid)
{
	xajax_getEducation(profid,educationid);
}
function auto_populate_specialty_drop_dwon(profid,specialtyid)
{
	xajax_getSpecialty(profid,specialtyid);
}
function auto_populate_certificate_drop_dwon(profid,certificateid)
{
	xajax_getCertificate(profid,certificateid);
}

function checkProfessionalInvitation(theForm,frmName)
{
	if (theForm.vchProfEmails.value=='')
	{
		alert("Please enter professionals email addresses to invite.");	
		return false;	
	}
	else
	{
		var status = true;
		var i = 0;
		var emails = theForm.vchProfEmails.value.split(",");
		for(i=0; i<emails.length; i++){
			if(!EmailValidate(triming(emails[i]))){			
				alert("Incorrect Email address: "+emails[i]);
				status = false;
				break;
			}
		}
		if(status){
			xajax_invite_professional_members(xajax.getFormValues(frmName));
		}

	}
	return false;	
}

function EmailValidate(email) {
   var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
   return reg.test(email);
}

function triming(str){
	var	str = str.replace(/^\s\s*/,''),
		ws = /\s/,
		i = str.length;
	while (ws.test(str.charAt(--i)));
	return str.slice(0, i + 1);
}