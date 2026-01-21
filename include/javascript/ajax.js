
var oAjaxRequest; // Global ajax request

/**
 *
 * AjaxRequest
 *
 */
 
// AjaxRequest class wraps an XMLHttpRequest object
//
// Example use of GET request: 
//		oAjaxRequest = new AjaxRequest();
//		oAjaxRequest.initialize()
//		oAjaxRequest.onreadystatechange(handlerFunction);
//		oAjaxRequest.onfailure(failureFunction); 	// OPTIONAL
//		oAjaxRequest.bDefaultFailureBehavior = false;	// OPTIONAL, default behavior is to warn if no server response
//		oAjaxRequest.open("GET", "http://myurl/?myquerystring", true);
//		oAjaxRequest.send(null);
//
//		...
//
//		if (oAjaxRequest.isReady())
//			myVar = oAjaxRequest.responseText();
//
//		...or...
//
//		oAjaxRequest.abort();
//
function AjaxRequest()
{
	var oHttpRequest;
	var bResponseReceived;		// True if response has been received since last request
	var guid;			// Unique ID updated per request sent
	var dtLastSent;			// Date last request was sent
	this.msTimeout = 60000; 		// Timeout, cancel the request if no response is received in 15 seconds
	this.bDefaultFailureBehavior = true;	// True if we want to user default onfailure behavior
	var fxnFailure;		// Fxn pointer for custom onfailure handler (may be used in conjunction w/ default)
	
	// The following wrapper functions all emulate
	// behavior of the XMLHttpRequest object itself, 
	// with some error handling included.
	//
	// All properties can be accessed through AjaxRequest
	// member functions, so calling
	// oAjaxRequest.status() returns oHttpRequest.status
	
	this.initialize = function()
	{
		this.msTimeout = 60000;
		this.bDefaultFailureBehavior = true;
		guid = new Date().getTime();
		bResponseReceived = false;
		fxnFailure = null;
		oHttpRequest = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Msxml2.XMLHTTP");
		// default behavior is fire and forget pattern, use isHealthy() to report any errors encountered
		var oSelf = this; // Can't use "this" w/in following closure b/c we won't know its execution context
		oHttpRequest.onreadystatechange = function() {oSelf.isHealthy();}
	}
	
	// abort
	//
	// Abort old http request.
	// Must remove onreadystatechange function before aborting b/c
	// abort() calls the onreadystatechange function pointer.
	//
	this.abort = function()
	{
		if (!oHttpRequest) return;
		if (oHttpRequest.readyState != 0 && oHttpRequest.readyState != 4)
		{
			oHttpRequest.onreadystatechange = function() {return false}
			oHttpRequest.abort();
			fxnFailure = null;
			guid = null;
		}
	}

	this.status = function()
	{
		// Use try/catch to grab the http status b/c
		// if the ajax request is in mid-process and the user
		// leaves the page, mozilla will throw an exception
		if (!oHttpRequest) return -1;
		try {return oHttpRequest.status;}
		catch (e) {return 0;}
	}
	
	// onreadystatechange
	//
	// Set function pointer to onreadystatechangehandler
	// via oAjaxRequest.onreadystatechange(ptr)
	//
	this.onreadystatechange = function(ptrHandler)
	{
		if (!oHttpRequest) this.initialize();
		var oSelf = this; // Can't use "this" w/in following closure b/c we won't know its execution context
		oHttpRequest.onreadystatechange = function() {if (oSelf.isHealthy()) ptrHandler.call();}
	}

	// onfailure
	//
	// Set function pointer for failure handler
	// which will be called if a request is sent and
	// no response is received within specified timeout period.
	//
	this.onfailure = function(ptrHandler)
	{
		fxnFailure = ptrHandler;
	}

	// timeoutExpired
	//
	// Called msTimeout milliseconds after the request is sent.
	// If the current request has the same id as the request that initiated
	// the timeout and it still has received no response, then we need to
	// abort and resort to calling the failure function, if provided.
	//
	this.timeoutExpired = function( id )
	{
		if (guid != id) return;
		if (bResponseReceived) return;
		if (((new Date()) - dtLastSent) < (this.msTimeout - 1000))
		{
			// case 323896, see http://bugzilla.mozilla.org/show_bug.cgi?id=318419
			var oSelf = this;
			setTimeout(function() {oSelf.timeoutExpired(id)}, this.msTimeout);
			return;
		};
		if (this.bDefaultFailureBehavior) this.doDefaultFailureBehavior();
		if (fxnFailure && fxnFailure.call) fxnFailure.call();
		this.abort();
	}

	// doDefaultFailureBehavior
	//
	// Default failure behavior warns the user that a response was never
	// received and closes any Info popups
	//
	this.doDefaultFailureBehavior = function()
	{
		Info.showRequireConfirm(Lang.getString("FB_NO_RESPONSE"));
		EditableTableManager.hideAllPanes();
	}

	// isHealthy
	//
	// Called in conjunction with all other onreadystatechange handlers
	// in order to guarantee that the HttpRequest is either waiting or has
	// return succesfully.
	//
	// If the status code indicates that an error has been returned, then
	// display as an ordinary FogBugz Internal Error and cancel the request
	//
	// Only return true if no error has been returned and the response is
	// entirely received.
	//
	this.isHealthy = function()
	{
		if (this.readyState() == 4)
		{
			// Response has been received
			bResponseReceived = true;
			if (this.status() != 0 && this.status() != 200 && this.responseText().length)
			{
				// Error occurred, so toss it over the main document body
				// or we might hang the UI on a bad Ajax request
				this.showError();
				this.abort();
				return false;
			}
		}
		return this.isReady();
	}

	// showError
	//
	// Call when ajax request fails somewhere down the line and a bad status
	// code is returned.
	//	
	this.showError = function()
	{
		// In order to maintain expected behavior of the browser's back button,
		// we use a form to POST the body of the ajax error to
		// default.asp, which will spit the contents
		// back out.
		var s = this.responseText();
		var oForm = document.createElement("form");
		var oTextArea = document.createElement("textarea");
		oForm.appendChild(oTextArea);
		
		oForm.name = "formWithError";
		oForm.action = Lang.getString("FB_DEFAULT_URL");
		oForm.method = "POST";

		oTextArea.name = "sAjaxError"
		oTextArea.style.display = "none";
		oTextArea.value = s;

		document.body.appendChild(oForm);
		oForm.submit();
	}

	this.send = function(content)
	{
		if (!oHttpRequest) this.initialize();
		bResponseReceived = false;
		var oSelf = this; // copy this and guid into closure to be called after timeout
		var id = guid;
		oHttpRequest.send(this.noCache(content));
		dtLastSent = new Date();
		setTimeout(function() {oSelf.timeoutExpired(id)}, this.msTimeout);
	}
	
	this.open = function(sMethod, sURL, fAsync)
	{
		if (!oHttpRequest) this.initialize();
		if (sURL.indexOf("undefined?") == 0) sURL = sURL.substring("undefined?".length-1);
		var sURLNoCache = (sMethod.toUpperCase() == "POST") ? sURL : this.noCache(sURL);
		oHttpRequest.open(sMethod, sURLNoCache, fAsync);
		if (sMethod.toUpperCase() == "POST")
		{
			oHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		}
	}
	
	this.readyState = function()
	{
		if (!oHttpRequest) return -1;
		return oHttpRequest.readyState;
	}
	
	this.responseText = function()
	{
		if (!oHttpRequest) return null;
		return oHttpRequest.responseText;
	}
	
	this.responseXML = function()
	{
		if (!oHttpRequest) return null;
		return oHttpRequest.responseXML;
	}
	
	this.isBusy = function()
	{
		if (!oHttpRequest) return false;
		return ((oHttpRequest.readyState != 4) && 
				(oHttpRequest.readyState != 0));
	}
	
	// isReady
	//
	// True iff readyState == 4 and http status == 200
	//
	this.isReady = function()
	{
		if (!oHttpRequest) return false;
		if (oHttpRequest.readyState != 4) return false;
		try {return (oHttpRequest.status == 200);}
		catch (e) {return false;}
	}

	// noCache
	//
	// Append a rider to the supplied query string data in order
	// to avoid any and all browser caching behavior
	// 
	this.noCache = function(sData)
	{
		if (!sData) return null;
		return trailingAmpersand(sData) + "nocache=" + new Date().valueOf();
	}
} // end AjaxRequest class

/**
 *
 * XML Parser - singleton
 *
 */
 
 // XMLParser doesn't store any internal state but
 // provides XML parsing capabilities.
 //
 // The first parameter in all method calls is the parent
 // node to be acted on.
 //
 // The second parameter in all method calls is the tag name
 // of the desired node.
 //
 // Example:
 // XMLParser.getNodeFrom(myNode, "index") returns the first
 // element by the tagname of "index" from myNode's subtree.

var XMLParser = new function()
{
	// getNodeFrom
	//
	// Returns first node by tag name sElem in oNodeParent
	//
	this.getNodeFrom = function( oNodeParent, sElem )
	{
		var e = oNodeParent.getElementsByTagName(sElem);
		if (e)	e = e[0];
		if (e)	return e;
		return null;
	}
	
	// getNodeUsingIdFrom
	//
	// Returns first node by tag name sElem in oNodeParent that
	// also has matching sId
	//
	this.getNodeUsingIdFrom = function( oNodeParent, sElem, sId)
	{
		var rgElems = this.getNodeArrayFrom(oNodeParent, sElem);
		for (var ix = 0; ix < rgElems.length; ix++)
		{
			if (rgElems[ix].id == sId)
				return rgElems[ix];
		}
		return null;
	}
	
	// getNodeArrayUsingIdFrom
	//
	// Returns all nodes by tag name sElem in oNodeParent that
	// also have matching sId
	//
	this.getNodeArrayUsingIdFrom = function( oNodeParent, sElem, sId )
	{
		if (null == elById(sId)) return new Array();
		var rgMatches = new Array();
		var nMatches = 0;
		var rgElems = this.getNodeArrayFrom(oNodeParent, sElem);
		for (var ix = 0; ix < rgElems.length; ix++)
		{
			if (rgElems[ix].id == sId)
				rgMatches[nMatches++] = rgElems[ix];
		}
		return rgMatches;
	}
	
	// getNodeArrayFrom
	//
	// Returns array of elements by tag name sElem in oNodeParent
	//
	this.getNodeArrayFrom = function( oNodeParent, sElem )
	{
		var rg = oNodeParent.getElementsByTagName(sElem);
		if (rg) return rg;
		return null;
	}
	
	// getTextFrom
	//
	// Returns first text node value of first element sElem
	// in oNodeParent
	//
	this.getTextFrom = function( oNodeParent, sElem )
	{
		return this.getNthTextFrom(oNodeParent, sElem, 0);
	}

	// getTextOf
	//
	// Returns first text node value of oNode
	//
	this.getTextOf = function( e )
	{
		if (e) e = e.childNodes;
		if (e) e = e[0];
		if (e) e = e.nodeValue;
		if (e) return e;
		return null;
	}
	
	// getNthTextFrom
	//
	// Returns text node value of n'th element sElem
	// in oNodeParent
	//
	this.getNthTextFrom = function( oNodeParent, sElem, n )
	{
		var e = oNodeParent.getElementsByTagName(sElem)
		if (e) e = e[n];
		if (e) e = e.childNodes;
		if (e) e = e[0];
		if (e) e = e.nodeValue;
		if (e) return e;
		return null;
	}
	
	// getCustomTagValueFrom
	//
	// Returns first text value of first custom tag element
	// by the name of sElem
	// ...for parsing custom HTML tags in the form of "tagNS:tag"
	// ...such as "fb:cellvalue"
	//
	this.getCustomTagValueFrom = function( oNodeParent, sElem )
	{
		return this.getNthCustomTagValueFrom(oNodeParent, sElem, 0);
	}
	
	this.setCustomTagValue = function( oNodeParent, sElem, vVal )
	{
		var e = this.getNodeFrom(oNodeParent, sElem); // Mozilla
		if (!e)
		{
			var ix = sElem.indexOf(":");
			if (ix >= 0)
			{
				sElem = sElem.substring(ix+1);
				e = this.getNodeFrom(oNodeParent, sElem); // IE
			}
		}
		
		if (e) e = e.childNodes;
		if (e) e = e[0];
		if (e) e.nodeValue = vVal;
	}
	
	// getNthCustomTagValueFrom
	//
	// Get the nodevalue of the n'th custom tag in oNodeParent
	//
	this.getNthCustomTagValueFrom = function( oNodeParent, sElem, n )
	{
		var e = this.getNthTextFrom(oNodeParent, sElem, n); // Mozilla
		if (!e)
		{
			var ix = sElem.indexOf(":");
			if (ix >= 0)
			{
				sElem = sElem.substring(ix+1);
				e = this.getNthTextFrom(oNodeParent, sElem, n); // IE
			}
		}
		if (e) return e;
		return null;
	}
	
	// getCDataFrom
	//
	// Returns first CData node value of element sElem
	// in oNode
	//
	this.getCDataFrom = function( oNode, sElem )
	{
		var e = oNode.getElementsByTagName(sElem);
		if (e) e = e[0];
		if (e) e = e.childNodes;
		if (e)
		{
			// Various javascript parsers may handle XML CData
			// fields differently...
			// Mozilla stores CData in childNodes[1]...
			// IE stores CData in childNodes[0]...
			// Opera stores CData in childNodes[1], 
			// ...but large Opera CData spills over into childNodes[2], etc
			//
			// CData is nodeType 4
			var e0 = e[0];
			var e1 = e[1];
			if (e0 && e1 && e0.nodeType == 4 && e1.nodeType == 4)
			{
				// Opera: if we have two legit cdata childnodes,
				// Opera may have split up a large chunk of cdata into
				// multiple children.
				var s = e0.nodeValue + e1.nodeValue;
				var i = 2;
				var ex = e[i];
				// Concatenate all of Opera's split nodes
				while (ex && ex.nodeType == 4)
				{
					s += ex.nodeValue;
					i++;
					ex = e[i];
				}
				return s;
			}
			if (e0 && e0.nodeType == 4)	return e0.nodeValue;
			if (e1 && e1.nodeType == 4) return e1.nodeValue;
		}
		return null;
	}
} // end XMLParser singleton


// Process - singleton
//
// Process keeps track of any long-running or Ajax'ed JS processes
// in case we need to perform any sort of cleanup or recovery if the user
// hits ESC and cancels all JS execution.
//
// Example:
// 	function doSomeWork()
//	{
//		Process.start(this, "completeWork", failureWork, "Doing Work Now!");
//
//		setTimeout(completeWork, 1);
//		...(if setTimeout or AjaxRequest returns control to user, they may hit ESC)...
//	}
//
//	function completeWork()
//	{
//		...doing the work...
//	}
//
//	function failureWork()
//	{
//		...undo the incomplete work if user hit ESC...
//	}
//
var Process = new function()
{
	var rgProcess = new Array();

	// start
	//
	// Register the start of a JS process
	// oCompleteFxnOwner - object owner of sFxnComplete which completes process
	// sFxnComplete - string name of function which, when run, signals completion of process
	// fxnCleanup - fxn to be called if process is halted unexpectedly (user hits ESC)
	// sInfo - string Info to be displayed during process execution
	//	sIdCenter* - id of element to center Info within
	//
	this.start = function( oCompleteFxnOwner, sFxnComplete, fxnCleanup, sInfo, sIdCenterHorizontal, sIdCenterVertical )
	{
		rgProcess[sFxnComplete] = { 'fxnCleanup' : fxnCleanup, 'bInfo' : (sInfo != null) }

		if (!oCompleteFxnOwner) oCompleteFxnOwner = window;

		if (oCompleteFxnOwner[sFxnComplete] && oCompleteFxnOwner[sFxnComplete].call)
		{
			//
			// Add Process.stop() to the end of completion function
			//
			if (!oCompleteFxnOwner[sFxnComplete + "_original"])
				oCompleteFxnOwner[sFxnComplete + "_original"] = oCompleteFxnOwner[sFxnComplete];

			oCompleteFxnOwner[sFxnComplete] = function(){oCompleteFxnOwner[sFxnComplete + "_original"].apply(oCompleteFxnOwner, arguments); Process.stop(sFxnComplete);}
		}

		if (sInfo) Info.show(sInfo, sIdCenterHorizontal, sIdCenterVertical);
	}

	// stop
	//
	// Signal completion of a JS process
	//
	this.stop = function( sFxnComplete )
	{
		if (!rgProcess[sFxnComplete]) return;

		if (rgProcess[sFxnComplete].bInfo) Info.hide();
		rgProcess[sFxnComplete] = null;
	}

	// haltAll
	//
	// If execution is cancelled (user hit ESC), 
	// call all cleanup functions and destroy all processes
	//
	this.haltAll = function()
	{
		for (var sKey in rgProcess)
		{
			if (!rgProcess[sKey]) continue;
			{
				if (rgProcess[sKey].fxnCleanup && rgProcess[sKey].fxnCleanup.call)
					rgProcess[sKey].fxnCleanup.call();
				if (rgProcess[sKey].bInfo)
					Info.hide();

				// IE, Opera, and Safari don't cancel their
				// XMLHttpRequest objects on ESC...so we want
				// to let the processes finish their work if they're
				// still around.
				if (!(window.ie || window.opera || window.safari))
				{
					rgProcess[sKey] = null;
				}
			}
		}
	}
}
