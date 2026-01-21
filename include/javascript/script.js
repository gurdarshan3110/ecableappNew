var menu=function(){
	var t=15,z=50,s=6,a;
	function dd(n){this.n=n; this.h=[]; this.c=[]}
	dd.prototype.init=function(p,c){
		a=c; var w=document.getElementById(p), s=w.getElementsByTagName('ul'), l=s.length, i=0;
		for(i;i<l;i++){
			var h=s[i].parentNode; this.h[i]=h; this.c[i]=s[i];
			h.onmouseover=new Function(this.n+'.st('+i+',true)');
			h.onmouseout=new Function(this.n+'.st('+i+')');
		}
	}
	dd.prototype.st=function(x,f){
		var c=this.c[x], h=this.h[x], p=h.getElementsByTagName('a')[0];
		clearInterval(c.t); c.style.overflow='hidden';
		if(f){
			p.className+=' '+a;
			if(!c.mh){c.style.display='block'; c.style.height=''; c.mh=c.offsetHeight; c.style.height=0}
			if(c.mh==c.offsetHeight){c.style.overflow='visible'}
			else{c.style.zIndex=z; z++; c.t=setInterval(function(){sl(c,1)},t)}
		}else{p.className=p.className.replace(a,''); c.t=setInterval(function(){sl(c,-1)},t)}
	}
	function sl(c,f){
		var h=c.offsetHeight;
		if((h<=0&&f!=1)||(h>=c.mh&&f==1)){
			if(f==1){c.style.filter=''; c.style.opacity=1; c.style.overflow='visible'}
			clearInterval(c.t); return
		}
		var d=(f==1)?Math.ceil((c.mh-h)/s):Math.ceil(h/s), o=h/c.mh;
		c.style.opacity=o; c.style.filter='alpha(opacity='+(o*100)+')';
		c.style.height=h+(d*f)+'px'
	}
	return{dd:dd}
}();




var menu1=function(){
	var t=15,z=50,s=6,a;
	function dd1(n){this.n=n; this.h=[]; this.c=[]}
	dd1.prototype.init=function(p,c){
		a=c; var w=document.getElementById(p), s=w.getElementsByTagName('ul'), l=s.length, i=0;
		for(i;i<l;i++){
			var h=s[i].parentNode; this.h[i]=h; this.c[i]=s[i];
			h.onmouseover=new Function(this.n+'.st('+i+',true)');
			h.onmouseout=new Function(this.n+'.st('+i+')');
		}
	}
	dd1.prototype.st=function(x,f){
		var c=this.c[x], h=this.h[x], p=h.getElementsByTagName('a')[0];
		clearInterval(c.t); c.style.overflow='hidden';
		if(f){
			p.className+=' '+a;
			if(!c.mh){c.style.display='block'; c.style.height=''; c.mh=c.offsetHeight; c.style.height=0}
			if(c.mh==c.offsetHeight){c.style.overflow='visible'}
			else{c.style.zIndex=z; z++; c.t=setInterval(function(){sl(c,1)},t)}
		}else{p.className=p.className.replace(a,''); c.t=setInterval(function(){sl(c,-1)},t)}
	}
	function sl(c,f){
		var h=c.offsetHeight;
		if((h<=0&&f!=1)||(h>=c.mh&&f==1)){
			if(f==1){c.style.filter=''; c.style.opacity=1; c.style.overflow='visible'}
			clearInterval(c.t); return
		}
		var d=(f==1)?Math.ceil((c.mh-h)/s):Math.ceil(h/s), o=h/c.mh;
		c.style.opacity=o; c.style.filter='alpha(opacity='+(o*100)+')';
		c.style.height=h+(d*f)+'px'
	}
	return{dd1:dd1}
}();



var menu2=function(){
	var t=15,z=50,s=6,a;
	function dd2(n){this.n=n; this.h=[]; this.c=[]}
	dd2.prototype.init=function(p,c){
		a=c; var w=document.getElementById(p), s=w.getElementsByTagName('ul'), l=s.length, i=0;
		for(i;i<l;i++){
			var h=s[i].parentNode; this.h[i]=h; this.c[i]=s[i];
			h.onmouseover=new Function(this.n+'.st('+i+',true)');
			h.onmouseout=new Function(this.n+'.st('+i+')');
		}
	}
	dd2.prototype.st=function(x,f){
		var c=this.c[x], h=this.h[x], p=h.getElementsByTagName('a')[0];
		clearInterval(c.t); c.style.overflow='hidden';
		if(f){
			p.className+=' '+a;
			if(!c.mh){c.style.display='block'; c.style.height=''; c.mh=c.offsetHeight; c.style.height=0}
			if(c.mh==c.offsetHeight){c.style.overflow='visible'}
			else{c.style.zIndex=z; z++; c.t=setInterval(function(){sl(c,1)},t)}
		}else{p.className=p.className.replace(a,''); c.t=setInterval(function(){sl(c,-1)},t)}
	}
	function sl(c,f){
		var h=c.offsetHeight;
		if((h<=0&&f!=1)||(h>=c.mh&&f==1)){
			if(f==1){c.style.filter=''; c.style.opacity=1; c.style.overflow='visible'}
			clearInterval(c.t); return
		}
		var d=(f==1)?Math.ceil((c.mh-h)/s):Math.ceil(h/s), o=h/c.mh;
		c.style.opacity=o; c.style.filter='alpha(opacity='+(o*100)+')';
		c.style.height=h+(d*f)+'px'
	}
	return{dd2:dd2}
}();



var menu3=function(){
	var t=15,z=50,s=6,a;
	function dd3(n){this.n=n; this.h=[]; this.c=[]}
	dd3.prototype.init=function(p,c){
		a=c; var w=document.getElementById(p), s=w.getElementsByTagName('ul'), l=s.length, i=0;
		for(i;i<l;i++){
			var h=s[i].parentNode; this.h[i]=h; this.c[i]=s[i];
			h.onmouseover=new Function(this.n+'.st('+i+',true)');
			h.onmouseout=new Function(this.n+'.st('+i+')');
		}
	}
	dd3.prototype.st=function(x,f){
		var c=this.c[x], h=this.h[x], p=h.getElementsByTagName('a')[0];
		clearInterval(c.t); c.style.overflow='hidden';
		if(f){
			p.className+=' '+a;
			if(!c.mh){c.style.display='block'; c.style.height=''; c.mh=c.offsetHeight; c.style.height=0}
			if(c.mh==c.offsetHeight){c.style.overflow='visible'}
			else{c.style.zIndex=z; z++; c.t=setInterval(function(){sl(c,1)},t)}
		}else{p.className=p.className.replace(a,''); c.t=setInterval(function(){sl(c,-1)},t)}
	}
	function sl(c,f){
		var h=c.offsetHeight;
		if((h<=0&&f!=1)||(h>=c.mh&&f==1)){
			if(f==1){c.style.filter=''; c.style.opacity=1; c.style.overflow='visible'}
			clearInterval(c.t); return
		}
		var d=(f==1)?Math.ceil((c.mh-h)/s):Math.ceil(h/s), o=h/c.mh;
		c.style.opacity=o; c.style.filter='alpha(opacity='+(o*100)+')';
		c.style.height=h+(d*f)+'px'
	}
	return{dd3:dd3}
}();