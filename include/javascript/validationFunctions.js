

function checkformPressOff(theform){  
	theControl = "vchName,vchEmail,vchOrganisation,vchContactNumber,vchTimeCal,txtAddress,txtMessage";
	theMessage = "name,email,organisation,telephone-number,best time to call,address,specific request";
	theNumeric = ",,,Y,,,";
	theEmail = ",Y,,,,,";
	theURL = ",,,,,,";
	theConfirmPassword = ",,,,,,";
	thebadstuff = ",,,,,,"; 
	theinteger = ",,,,,,";
	thepercent = ",,,,,,";
	thesize = ",,,,,,";
	thedecimal =",,,,,,";
	theimage = ",,,,,,";
	theempty = "Y,Y,Y,,,,";
	themin = ",,,,,,";
	themax = ",,,,,,";
	thecheckboxlength = ",,,,,,";
	thephoneno = ",,,,,,";
		
	if(!theValidator(theform,theControl,theMessage,theNumeric,theEmail,theURL,theConfirmPassword,thebadstuff,theinteger,thepercent,thesize,thedecimal,theimage,theempty,themin,themax,thecheckboxlength,thephoneno))
	return false;
}



function checkformContact(theform){  
	theControl = "vchTitle,vchName,vchLastName,vchMobileNum,vchTimeCal,vchEmail";
	theMessage = "title,forename,surname,telephone-mobile,best time to call,email address";
	theNumeric = ",,,Y,,,,";
	theEmail = ",,,,,,Y";
	theURL = ",,,,,,,";
	theConfirmPassword = ",,,,,,,";
	thebadstuff = ",,,,,,,"; 
	theinteger = ",,,,,,,";
	thepercent = ",,,,,,,";
	thesize = ",,,,,,,";
	thedecimal =",,,,,,,";
	theimage = ",,,,,,,";
	theempty = "Y,Y,Y,Y,Y,Y";
	themin = ",,,,,,,";
	themax = ",,,,,,,";
	thecheckboxlength = ",,,,,,,";
	thephoneno = ",,,,,,,";
		
if(!theValidator(theform,theControl,theMessage,theNumeric,theEmail,theURL,theConfirmPassword,thebadstuff,theinteger,thepercent,thesize,thedecimal,theimage,theempty,themin,themax,thecheckboxlength,thephoneno))
 
return false;

}


function checkformVaccancy(theform){  
	theControl = "vchTitle,vchForeName,vchSurName,vchTelephoneDay,txtTelephoneMobile,txtBestTimeToCall,vchEmailAddress,vchInformation";
	theMessage = "title,forename,surname,telephone-daytime,telephone-mobile,best time to call,email address,Other Information";
	theNumeric = ",,,Y,Y,,,";
	theEmail = ",,,,,,Y,";
	theURL = ",,,,,,,";
	theConfirmPassword = ",,,,,,,";
	thebadstuff = ",,,,,,,"; 
	theinteger = ",,,,,,,";
	thepercent = ",,,,,,,";
	thesize = ",,,,,,,";
	thedecimal =",,,,,,,";
	theimage = ",,,,,,,";
	theempty = "Y,Y,Y,,Y,Y,Y,";
	themin = ",,,,,,,";
	themax = ",,,,,,,";
	thecheckboxlength = ",,,,,,,";
	thephoneno = ",,,,,,,";
		
	if(!theValidator(theform,theControl,theMessage,theNumeric,theEmail,theURL,theConfirmPassword,thebadstuff,theinteger,thepercent,thesize,thedecimal,theimage,theempty,themin,themax,thecheckboxlength,thephoneno))
	{
		return false;
	}
	var chks = document.getElementsByName('txtService[]');
		var hasChecked = false;
		for (var i = 0; i < chks.length; i++)
		{
		if (chks[i].checked)
		{
		hasChecked = true;
		}
		}
		if (!hasChecked)
		{
		alert("Please select at least one box.");
		chks[0].focus();
		return false;
		}
}
function checkformReq(theform){  
	theControl = "vchNameReq,vchContactNumberReq,vchCallTimeReq,vchEmailReq";
	theMessage = "name,telephone,best time to call,email";
	theNumeric = ",Y,,";
	theEmail = ",,,Y";
	theURL = ",,,";
	theConfirmPassword = ",,,";
	thebadstuff = ",,,"; 
	theinteger = ",,,";
	thepercent = ",,,";
	thesize = ",,,";
	thedecimal =",,,";
	theimage = ",,,";
	theempty = "Y,Y,Y,Y";
	themin = ",,,";
	themax = ",,,";
	thecheckboxlength = ",,,";
	thephoneno = ",,,";
		
	if(!theValidator(theform,theControl,theMessage,theNumeric,theEmail,theURL,theConfirmPassword,thebadstuff,theinteger,thepercent,thesize,thedecimal,theimage,theempty,themin,themax,thecheckboxlength,thephoneno))
	return false;
}


function checkformRecommend(theform){  
	theControl = "vchName,vchFriendName,vchFriendEmail";
	theMessage = "name,friend's name,friend's email,";
	theNumeric = ",,";
	theEmail = ",,Y";
	theURL = ",,";
	theConfirmPassword = ",,";
	thebadstuff = ",,"; 
	theinteger = ",,";
	thepercent = ",,";
	thesize = ",,";
	thedecimal =",,";
	theimage = ",,";
	theempty = "Y,Y,Y";
	themin = ",,";
	themax = ",,";
	thecheckboxlength = ",,";
	thephoneno = ",,";
		
	if(!theValidator(theform,theControl,theMessage,theNumeric,theEmail,theURL,theConfirmPassword,thebadstuff,theinteger,thepercent,thesize,thedecimal,theimage,theempty,themin,themax,thecheckboxlength,thephoneno))
	return false;
}


function addToFavourits()
{
	if(document.all)
		window.external.AddFavorite(location.href,document.title);
	else if(window.sidebar)
		window.sidebar.addPanel(document.title,location.href,'');
}
