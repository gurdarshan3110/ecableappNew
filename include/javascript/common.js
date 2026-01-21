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

