 
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
