"use strict";
function GEBI(a) {
    return document.getElementById(a);
}
function msgbox(a) {
    window.alert(a);
}
function GI(a) {
    return document.getElementById(a);
}
function GoHome() {
    window.location.href = GRM.home;
}
function DR(a) {
    document.write(a);
}
if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/(^\s*)|(\s*$)/g, "");
    }
};
var v_oldtofixed = Number.prototype.toFixed;
Number.prototype.toFixed = function (d) {
    var s = this + "";
    if (!d)
        d = 0;
    if (s.indexOf(".") == -1)
        s += ".";
    s += new Array(d + 1).join("0");
    if (new RegExp("^(-|\\+)?(\\d+(\\.\\d{0," + (d + 1) + "})?)\\d*$").test(s)) {
        var s = "0" + RegExp.$2, pm = RegExp.$1, a = RegExp.$3.length, b = true;
        if (a == d + 2) {
            a = s.match(/\d/g);
            if (parseInt(a[a.length - 1]) > 4) {
                for (var i = a.length - 2; i >= 0; i--) {
                    a[i] = parseInt(a[i]) + 1;
                    if (a[i] == 10) {
                        a[i] = 0;
                        b = i != 1;
                    } else
                        break;
                }
            }
            s = a.join("").replace(new RegExp("(\\d+)(\\d{" + d + "})\\d$"),
            "$1.$2");
        }
        if (b)
            s = s.substr(1);
        return (pm + s).replace(/\.$/, "");
    }
    return this + "";
};
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, // month
        "d+": this.getDate(), // day
        "h+": this.getHours(), // hour
        "m+": this.getMinutes(), // minute
        "s+": this.getSeconds(), // second
        "q+": Math.floor((this.getMonth() + 3) / 3)
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "")
                .substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
                    : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    if (/(zzz)/.test(format)) {
        format = format.replace("zzz", ("000" + this.getMilliseconds()).substr(3));  // millisecond
    }
    return format;
}
function getMonthMaxDay(year, month) {
    if (month == 4 || month == 6 || month == 9 || month == 11) {
        return 30;
    }
    else if (month == 2) {
        if (year % 4 == 0 || (year % 100 == 0 && year % 400 == 0)) {
            return 29;
        }
        else {
            return 28;
        }
    }
    else {
        return 31;
    }
    return 0;
}
function AddDay(tmDay, tmAdd) {
    var x = new Date();
    x.setTime(tmDay.getTime() + tmAdd * 3600 * 24 * 1000);
    return x;
}
function AddMinute(tmDay, tmAdd) {
    var x = new Date();
    x.setTime(tmDay.getTime() + tmAdd * 60 * 1000);
    return x;
}
function AddMonth(tmDay, tmAdd) {
    var xyear = tmDay.getFullYear(), xmonth = tmDay.getMonth(), xdate = tmDay.getDate();
    xmonth += tmAdd;
    var ryear = xyear + Math.floor(xmonth / 12);
    var rmonth = xmonth - 12 * Math.floor(xmonth / 12);//余数
    var rdatemax = getMonthMaxDay(ryear, rmonth + 1);//上面的月是从0开始的!
    if (xdate > rdatemax) {
        xdate = rdatemax;
    }
    var r = new Date();
    r.setTime(tmDay.getTime());//设时分秒
    r.setFullYear(ryear, rmonth, xdate);//修改年月日
    return r;
}
function DateTimeToStrTM(dt) {
    return dt.format("yyyyMMddhhmmss");
}
function DateTimeToStrTMDay(dt) {
    return dt.format("yyyyMMdd");
}
function DateTimeToStr(dt) {
    return dt.format("yyyy-MM-dd, hh:mm:ss");
}
function StrTMToStr(stm) {
    return stm.substr(0, 4) + '-' + stm.substr(4, 2) + '-' + stm.substr(6, 2) + ', ' +
        stm.substr(8, 2) + ':' + stm.substr(10, 2) + ':' + stm.substr(12, 2);
}
function StrTMToDateTime(stm) {
    var y, M, d, h = 0, m = 0, s = 0;
    y = +stm.substr(0, 4);
    M = +stm.substr(4, 2) - 1;//0起！
    d = +stm.substr(6, 2);
    if (stm.length > 8) {
        h = +stm.substr(8, 2);
        m = +stm.substr(10, 2);
        s = +stm.substr(12, 2);
    }
    var ret = new Date(y, M, d, h, m, s);
    return ret;
}
function StrTMToUTC(stm) {
    var y, M, d, h = 0, m = 0, s = 0;
    y = +stm.substr(0, 4);
    M = +stm.substr(4, 2) - 1;//0起！
    d = +stm.substr(6, 2);
    if (stm.length > 8) {
        h = +stm.substr(8, 2);
        m = +stm.substr(10, 2);
        s = +stm.substr(12, 2);
    }
    var ret = Date.UTC(y, M, d, h, m, s);
    return ret;
}
function CreateHttp() {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        var MSXML = ['MSXML2.XMLHTTP.5.0', 'MSXML2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP'];
        for (var n = 0; n < MSXML.length; n++) {
            try { xmlhttp = new ActiveXObject(MSXML[n]); break; } catch (e) { }
        }
    }
    return xmlhttp;
}
function Num2Hex(num, digits) {
    var s = num.toString(16);
    while (s.length < digits)
        s = "0" + s;
    return "0x" + s;
}
////GlobalFunction End!

///
////MyCalendar.js
//
var gMonths = new Array("一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月");
var WeekDay = new Array("日", "一", "二", "三", "四", "五", "六");
var strToday = "今天", strYear = "年", strMonth = "月", strDay = "日", splitChar = "-", startYear = 2010, endYear = 2020,
    dayTdHeight = 12, dayTdTextSize = 12, gcNotCurMonth = "#E0E0E0", gcRestDay = "#FF0000", gcWorkDay = "#444444",
    gcMouseOver = "#79D0FF", gcMouseOut = "#F4F4F4", gcToday = "#444444", gcTodayMouseOver = "#6699FF", gcTodayMouseOut = "#79D0FF",
    gdCtrl = new Object(), goSelectTag = new Array(), gdCurDate = new Date(),
    giYear = gdCurDate.getFullYear(), giMonth = gdCurDate.getMonth() + 1, giDay = gdCurDate.getDate(), gnYear = giYear, gnMonth = giMonth, gnDay = giDay;
function $FUN() { var elements = new Array(); for (var i = 0; i < arguments.length; i++) { var element = arguments[i]; if (typeof (arguments[i]) == 'string') { element = document.getElementById(arguments[i]); } if (arguments.length == 1) { return element; } elements.Push(element); } return elements; }
Array.prototype.Push = function () { var startLength = this.length; for (var i = 0; i < arguments.length; i++) { this[startLength + i] = arguments[i]; } return this.length; }
String.prototype.HexToDec = function () { return parseInt(this, 16); }
String.prototype.cleanBlank = function () { return this.isEmpty() ? "" : this.replace(/\s/g, ""); }
function checkColor() { var color_tmp = (arguments[0] + "").replace(/\s/g, "").toUpperCase(); var model_tmp1 = arguments[1].toUpperCase(); var model_tmp2 = "rgb(" + arguments[1].substring(1, 3).HexToDec() + "," + arguments[1].substring(1, 3).HexToDec() + "," + arguments[1].substring(5).HexToDec() + ")"; model_tmp2 = model_tmp2.toUpperCase(); if (color_tmp == model_tmp1 || color_tmp == model_tmp2) { return true; } return false; }
function $V() { return $FUN(arguments[0]).value; }
function fPopCalendar(evt, popCtrl, dateCtrl) {
    evt.cancelBubble = true; gdCtrl = dateCtrl; fSetYearMon(giYear, giMonth);
    var point = fGetXY(popCtrl); var xx = ($FUN("calendardiv").style);
    {
        xx.left = point.x + "px"; xx.top = (point.y + popCtrl.offsetHeight + 1) + "px";
        xx.visibility = 'visible'; xx.zindex = '99'; xx.position = 'absolute';
    } $FUN("calendardiv").focus();
}
function fSetDate(iYear, iMonth, iDay) { var iMonthNew = new String(iMonth); var iDayNew = new String(iDay); if (iMonthNew.length < 2) { iMonthNew = "0" + iMonthNew; } if (iDayNew.length < 2) { iDayNew = "0" + iDayNew; } gdCtrl.value = iYear + splitChar + iMonthNew + splitChar + iDayNew; fHideCalendar(); }
function fHideCalendar() { var cdv = $FUN("calendardiv");if(!cdv)return; cdv.style.visibility = "hidden"; for (var i = 0; i < goSelectTag.length; i++) { goSelectTag[i].style.visibility = "visible"; } goSelectTag.length = 0; }
function fSetSelected() {
    var iOffset = 0; var iYear = parseInt($FUN("tbSelYear").value); var iMonth = parseInt($FUN("tbSelMonth").value);
    var aCell = $FUN("cellText" + arguments[0]); aCell.bgColor = gcMouseOut;
    {
        var iDay = parseInt(aCell.innerHTML); if (checkColor(aCell.style.color, gcNotCurMonth))
        { iOffset = (aCell.innerHTML > 10) ? -1 : 1; } iMonth += iOffset; if (iMonth < 1) { iYear--; iMonth = 12; }
        else if (iMonth > 12) { iYear++; iMonth = 1; }
    } fSetDate(iYear, iMonth, iDay);
}
function Point(iX, iY) { this.x = iX; this.y = iY; }
function fBuildCal(iYear, iMonth) { var aMonth = new Array(); for (var i = 1; i < 7; i++) { aMonth[i] = new Array(i); } var dCalDate = new Date(iYear, iMonth - 1, 1); var iDayOfFirst = dCalDate.getDay(); var iDaysInMonth = new Date(iYear, iMonth, 0).getDate(); var iOffsetLast = new Date(iYear, iMonth - 1, 0).getDate() - iDayOfFirst + 1; var iDate = 1; var iNext = 1; for (var d = 0; d < 7; d++) { aMonth[1][d] = (d < iDayOfFirst) ? (iOffsetLast + d) * (-1) : iDate++; } for (var w = 2; w < 7; w++) { for (var d = 0; d < 7; d++) { aMonth[w][d] = (iDate <= iDaysInMonth) ? iDate++ : (iNext++) * (-1); } } return aMonth; }
function fDrawCal(iYear, iMonth, iCellHeight, iDateTextSize) { var colorTD = " bgcolor='" + gcMouseOut + "' bordercolor='" + gcMouseOut + "'"; var styleTD = " valign='middle' align='center' style='height:" + iCellHeight + "px;font-weight:bolder;font-size:" + iDateTextSize + "px;"; var dateCal = ""; dateCal += "<tr>"; for (var i = 0; i < 7; i++) { dateCal += "<td" + colorTD + styleTD + "color:#990099'>" + WeekDay[i] + "</td>"; } dateCal += "</tr>"; for (var w = 1; w < 7; w++) { dateCal += "<tr>"; for (var d = 0; d < 7; d++) { var tmpid = w + "" + d; dateCal += "<td" + styleTD + "cursor:pointer;' onclick='fSetSelected(" + tmpid + ")'>"; dateCal += "<span id='cellText" + tmpid + "'></span>"; dateCal += "</td>"; } dateCal += "</tr>"; } return dateCal; }
function fUpdateCal(iYear, iMonth) {
    var myMonth = fBuildCal(iYear, iMonth); var i = 0; for (var w = 1; w < 7; w++) {
        for (var d = 0; d < 7; d++) {
            var xx = ($FUN("cellText" + w + "" + d));
            {
                xx.parentNode.bgColor = gcMouseOut; xx.parentNode.borderColor = gcMouseOut;
                xx.parentNode.onmouseover = function () { this.bgColor = gcMouseOver; };
                xx.parentNode.onmouseout = function () { this.bgColor = gcMouseOut; };
                if (myMonth[w][d] < 0) { xx.style.color = gcNotCurMonth; xx.innerHTML = Math.abs(myMonth[w][d]); } else {
                    xx.style.color = ((d == 0) || (d == 6)) ? gcRestDay : gcWorkDay;
                    xx.innerHTML = myMonth[w][d]; if (iYear == giYear && iMonth == giMonth && myMonth[w][d] == giDay) {
                        xx.style.color = gcToday; xx.parentNode.bgColor = gcTodayMouseOut; xx.parentNode.onmouseover = function () {
                            this.bgColor = gcTodayMouseOver;
                        }; xx.parentNode.onmouseout = function () { this.bgColor = gcTodayMouseOut; };
                    }
                }
            }
        }
    }
}
function fSetYearMon(iYear, iMon) { $FUN("tbSelMonth").options[iMon - 1].selected = true; for (var i = 0; i < $FUN("tbSelYear").length; i++) { if ($FUN("tbSelYear").options[i].value == iYear) { $FUN("tbSelYear").options[i].selected = true; } } fUpdateCal(iYear, iMon); }
function fPrevMonth() { var iMon = $FUN("tbSelMonth").value; var iYear = $FUN("tbSelYear").value; if (--iMon < 1) { iMon = 12; iYear--; } fSetYearMon(iYear, iMon); }
function fNextMonth() { var iMon = $FUN("tbSelMonth").value; var iYear = $FUN("tbSelYear").value; if (++iMon > 12) { iMon = 1; iYear++; } fSetYearMon(iYear, iMon); }
function fGetXY(aTag) { var oTmp = aTag; var pt = new Point(0, 0); do { pt.x += oTmp.offsetLeft; pt.y += oTmp.offsetTop; oTmp = oTmp.offsetParent; } while (oTmp.tagName.toUpperCase() != "BODY"); return pt; }
function getDateDiv() {
    var noSelectForIE = ""; var noSelectForFireFox = ""; if (document.all) { noSelectForIE = "onselectstart='return false;'"; } else { noSelectForFireFox = "-moz-user-select:none;"; } var dateDiv = ""; dateDiv += "<div id='calendardiv' onclick='event.cancelBubble=true' " + noSelectForIE + " style='" + noSelectForFireFox + "position:absolute;z-index:99;visibility:hidden;border:1px solid #999999;'>"; dateDiv += "<table border='0' bgcolor='#E0E0E0' cellpadding='1' cellspacing='1' >"; dateDiv += "<tr>"; dateDiv += "<td><input type='button' id='PrevMonth' value='<' style='height:20px;width:20px;font-weight:bolder;' onclick='fPrevMonth()'>";
    dateDiv += "</td><td><select id='tbSelYear' style='border:1px solid;' onchange='fUpdateCal($V(\"tbSelYear\"),$V(\"tbSelMonth\"))'>"; for (var i = startYear; i < endYear; i++) { dateDiv += "<option value='" + i + "'>" + i + strYear + "</option>"; } dateDiv += "</select></td><td>"; dateDiv += "<select id='tbSelMonth' style='border:1px solid;' onchange='fUpdateCal($V(\"tbSelYear\"),$V(\"tbSelMonth\"))'>"; for (var i = 0; i < 12; i++) { dateDiv += "<option value='" + (i + 1) + "'>" + gMonths[i] + "</option>"; } dateDiv += "</select></td><td>"; dateDiv += "<input type='button' id='NextMonth' value='>' style='height:20px;width:20px;font-weight:bolder;' onclick='fNextMonth()'>";
    dateDiv += "</td>"; dateDiv += "</tr><tr>"; dateDiv += "<td align='center' colspan='4'>"; dateDiv += "<div style='background-color:#cccccc'><table width='100%' border='0' cellpadding='3' cellspacing='1'>"; dateDiv += fDrawCal(giYear, giMonth, dayTdHeight, dayTdTextSize); dateDiv += "</table></div>"; dateDiv += "</td>"; dateDiv += "</tr><tr><td align='center' colspan='4' nowrap>"; dateDiv += "<span style='cursor:pointer;font-weight:bolder;' onclick='fSetDate(gnYear,gnMonth,gnDay)' onmouseover='this.style.color=\"" + gcMouseOver + "\"' onmouseout='this.style.color=\"#000000\"'>" + strToday + ":" + giYear + strYear + giMonth + strMonth + giDay + strDay + "</span>"; dateDiv += "</tr></tr>"; dateDiv += "</table></div>"; return dateDiv;
}
document.onclick = fHideCalendar;

//Custom Function
function fUpdateFooter() {
    var ft = GI("idfooter");
    if (GRM.SP == "B") {
        ft.style.display = "none";
        return;
    }
    var sst = '';//0:未登录,1:Enum,2:Conn,3:OK
    GRM.name = GRM.name.replace("(透传状态,无变量)", "(透传状态,如需查看变量请在电脑端退出GVCOM程序)");//
    if (GRM.name.indexOf("透传状态") > 0) {
        sst = '<span style="color:green;">透传状态</span>';
    }
    else{
    if (GRM.st == 3)
        sst = '<span style="color:green;">已登录</span>';
    else if (GRM.st == 0)
        sst = '<span style="color:red;">未登录</span>';
    else if (GRM.st == 1)
        sst = '<span style="color:blue;">获取变量信息</span>';
    else if (GRM.st == 2)
        sst = '<span style="color:blue;">连接设备</span>';

    }
    ft.innerHTML = '页面更新时间[' + GRM.tmP + '],设备最近活动时间[' + GRM.tmA + ']<br>设备序号[<b>' + GRM.id + '</b>],状态:' + sst + ',登录时间[' + GRM.tmL + ']';
}
function fMText2Str(mt, val) {
    var i;
    for (i = 0; i < mt.length; i++) {
        if (val <= mt[i].v)
            return mt[i].s;
    }
    return mt[mtl.length - 1].s;
}

function fVarToMTIdx(pv, val) {
    var i;
    var ret=0;
    for (i = 1; i <= pv.mt.length - 1; i++)
        if (val >= pv.mt[i].v)
            ret= i;
    return ret;
}
function fVarToMT(pv) {
    if (pv.mt.length > 0) {
        return pv.mt[fVarToMTIdx(pv, pv.v)].s;
    }
    else {
        return "#ERROR#MTEXT";
    }
}
function fLowHigh(p,sret) {
    if (!isNaN(p.hv)) {
        if (p.v > p.hv)
            sret = '<span class="hm">' + sret + '</span>';
    }
    if (!isNaN(p.lv)) {
        if (p.v < p.lv)
            sret = '<span class="lm">' + sret + '</span>';
    }
    return sret;
}
function fVarValToHtml(p,usedval) {/*	ptmBOOL,1
	ptmINT, 2
	ptmHEX, 3
	ptmFLOAT,4
	ptmEXP, 5
	ptmMTEXT,6*/
    var v1, v2, vr, vc, bakvv = p.v,sret;
    if (arguments.length == 2)
        p.v = usedval;        
    if (p.u) {
        if (p.u.substr(0, 1) != ' ') { p.u = ' ' + p.u; }        
    }
        
    if (isNaN(p.v)) {
        p.v = bakvv;
        return '---' + p.u;
    }        
    if (p.t == 1) {
        vr = p.v ? p.s1 : p.s0;
        vr += p.u;
        vc = p.v ? p.c1 : p.c0;
        if (vc)
            vc = 'color:' + vc;
        p.v = bakvv;
        return '<span style="' + vc + '">' + vr + '</span>';
    }
    else if (p.t == 2) {
        sret = Math.round(p.v) + p.u;
        sret=fLowHigh(p, sret);
        p.v = bakvv;
        return sret;
    }
    else if (p.t == 3) {
        sret = Num2Hex(Math.round(p.v), p.st) + p.u;
        sret = fLowHigh(p, sret);
        p.v = bakvv;
        return sret;
    }
    else if (p.t == 4) {
        //浮点数默认的st是0，这个时候表示不限制小数位数
        sret = (p.st == 0) ? (p.v + "") : p.v.toFixed(p.st);
        sret += p.u;
        sret = fLowHigh(p, sret);
        p.v = bakvv;
        return sret;
    }
    else if (p.t == 5) {
        sret = p.v.toExponential(p.st) + p.u;
        sret = fLowHigh(p, sret);
        p.v = bakvv;
        return sret;
    }
    else {
        sret = fVarToMT(p) + p.u;
        p.v = bakvv;
        return sret;
    }
}
var g_GrmNameConvTab = ["$COM1ERROR", "串口1错误标志",
"$COM2ERROR", "串口2错误标志",
"$COM3ERROR", "串口3错误标志",
"$NETCOMERROR", "网口设备错误标志",
"$SIGNAL", "信号强度",
"$NETTRAFFIC", "网络流量",
"$NETOFF", "禁用网络标志",
"$ALARMFLAG", "全局报警标志",
"$ALARMOFF", "全局报警禁用",
"$ERRORCODE", "系统错误代码",
"$NETSTATE", "网络连接状态",
"$YEAR", "日期：年",
"$MONTH", "日期：月",
"$DAY", "日期：日",
"$HOUR", "时间：时",
"$MINUTE", "时间：分",
"$SECOND", "时间：秒",
"$WEEKDAY","日期：星期",
"$SIMMATCH", "SIM卡相同标志",
"$SIMERROR", "SIM卡错误代码",
"$POWERIN", "系统电源电压",
"$POWERIN2", "辅助电源电压"];
function fConvName(s) {
    var ss = s.toUpperCase(), i;
    for (i = 0; i < g_GrmNameConvTab.length / 2; i++) {
        if (ss == g_GrmNameConvTab[i * 2])
            return g_GrmNameConvTab[i * 2 + 1];
    }
    //强制替换所有的中文点
    return s.replace(/．/g, ".");
}

function fVarCanWrite(v)
{
    if (!v.w) return false;
    if (!v.pu) return true;
    if (v.pr == GRM.pr) return false;
    else return true;
}
function fniaj() {
    if (ajcount < 500) {
        ajcount = ajcount + 1;
        xmlhttp.open("GET", "/niaj?SID=" + GRM.sid + "&PG=" + GRM.pg + "&RN=" + GRM.rn + "&JR=" + ajcount, 1);
        xmlhttp.send();
    }
}
function fniHttpChg() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var ret, i, vcnt = VV.length;
        ret = xmlhttp.responseText.split("\r\n");
        if (ret.length == (vcnt + 2) || ret.length == (vcnt + 3)) {
            for (i = 0; i < vcnt; i++)
                VV[i].v = Number(ret[i]);
            GRM.tmP = ret[vcnt];
            GRM.tmA = ret[vcnt + 1];
            fniCalcAllVar();
            fUpdateFooter();
            setTimeout("fniaj()", 2000);
        }
    }
}
function fniCalcAllVar() {
    for (var i = 0; i < VV.length; i++) {
        var sret = fVarValToHtml(VV[i]);
        if (fVarCanWrite(VV[i]))
            sret = '<a href="/modify?SID=' + GRM.sid + '&N=' + i + '&PG=' + GRM.pg + '&RN=' + GRM.rn + '">' + sret + '</a>';
        document.getElementById('idxv' + i).innerHTML = sret;
    }
}
function fniPageInit() {
    var i;
    for (i = 0; i < VV.length; i++) {
        VV[i].idx = i;
    }
    GRM.name.replace("(透传状态, 无变量)", "(透传状态,如需查看变量请在电脑端退出GVCOM程序)");//
    if (GRM.hasst) {
        for (i = 0; i < SubTabDef.length; i++) {
            if (SubTabDef[i].tab == g_TabName) {
                g_stab = SubTabDef[i];
                break;
            }
        }
        if (!g_stab.colcount) {
            g_HasSubTab = false;
        }
        if (GRM.mob) {
            //修正g_stab.rows
            var newrow = [];
            for (i = 0; i < g_stab.rowcount; i++) {
                for (var k = 0; k < g_stab.colcount; k++) {
                    if (g_stab.rows[i][k].subtab) {
                        newrow.push([g_stab.rows[i][k]]);
                        g_stab.rows[i][k].subcol = 1;
                    }
                }
            }
            g_stab.rows = newrow;
            g_stab.rowcount = newrow.length;
            g_stab.colcount = 1;
        }
        g_stab.hts = [];
        for (i = 0; i < g_stab.rowcount; i++) {
            g_stab.hts[i] = [];
        }
    }
    else {
        g_HasSubTab = false
    }
}
function fniMakeContent() {
    if (GRM.st != 3) return;//模块没有处在正常运行状态
    if (GRM.mob)
        GRM.cols = 1;
    if (!g_HasSubTab) {
        document.write(fniMakeTableItem(VV, 'idDevTab', GRM.cols));
        return;
    }
    //下面是新的模式
    var vperc = 100 / g_stab.colcount;
    var cc, rr, k, svv, subb = {}, vi, sbname, sbdefi, sbtabhtm, linecnt;
    var ret = '<table width="96%" class="clsATop" style="background-color:transparent;max-width:1440px">';
    if (GRM.xmob) ret = '<table width="99%" class="clsATop" style="background-color:transparent;">';
    for (k = 0; k < VV.length; k++) {
        vi = VV[k];
        sbname = "SB_" + vi.sg;
        if (!subb.hasOwnProperty(sbname))
            subb[sbname] = [];
        subb[sbname].push(vi);
    }
    var hdrw = "",hassubtab=0;
    if (GRM.mob)
        hdrw = ' style="width:99%;margin: 0 auto;max-width:36em" ';
    for (rr = 0; rr < g_stab.rowcount; rr++) {
        ret += '<tr>';
        linecnt = 0;
        for (cc = 0; cc < g_stab.colcount; cc++) {
            sbdefi = g_stab.rows[rr][cc];
            if (!sbdefi.subtab) continue;
            if (!subb["SB_" + sbdefi.subtab]) continue;
            if (subb["SB_" + sbdefi.subtab].length / sbdefi.subcol > linecnt)
                linecnt = subb["SB_" + sbdefi.subtab].length;
        }
        for (cc = 0; cc < g_stab.colcount; cc++) {
            sbdefi = g_stab.rows[rr][cc];
            ret += '<td width="' + vperc + '%" valign="top">';
            if (sbdefi.subtab) {
                ret += '<div class="clsSubTabHdr"' + hdrw + '><span class="clsSubTabText">' + sbdefi.subtab + '</span>';
                sbtabhtm = fniMakeTableItem(subb["SB_" + sbdefi.subtab], 'idDevTab' + rr + cc, sbdefi.subcol, 98.5, linecnt);
                ret += sbtabhtm + '</div>';
                hassubtab++;
            } else {
                ret += '&nbsp;';
            }
            ret += '</td>';
         }
        ret += '</tr>'
    }
    ret += '</table>'
    if (hassubtab == 0) {
        ret = '<p>当前页面未配置任何子表格！</p>' + ret;
    }
    document.write(ret);
}

function fniMakeTableItem(vv, tabid, cols, twidth, minline) {
    if (!vv) return "";
    var i, rrow, vcnt = vv.length, colbase = 0;
    var ts = "", tabstr = "", ts2, hascmt = false;
    for (i = 0; i < vcnt; i++) {
        if (vv[i].c) {
            hascmt = true;
            break;
        }
    }
    var tw = twidth ? ' width="' + twidth + '%"' : '';
    var idW =cols>1? 6: 10;
    ts = hascmt ? '<td><b>&nbsp;描述&nbsp;</b></td>' : '';
    tabstr += '<table border="1" align="middle" id="' + tabid + '" class="clsVarTab" '+tw+' ><thead><tr>';
    for (i = 0; i < cols; i++)
        tabstr += '<td style="min-width:2.5em;width:'+idW+'%"><b>序号</b></td><td><b>&nbsp;变量名</b></td><td style="min-width:5em"><b>&nbsp;变量值 </b></td>' + ts;
    tabstr += '</tr></thead>';
    vcnt = Math.ceil(vcnt / cols) * cols;
    if (!minline) minline = 0;
    if (vcnt < minline) vcnt = minline;
    for (i = 0; i < vcnt; i++) {
        ts = '';
        if (i % cols == 0) {
            if (ts) {
                rrow++; ts += '</tr><tr>';
            }
            else {
                ts += '<tr>';
            }
            colbase = 0;
        }
        else {
            colbase += 4;
        }
        if (i < vv.length) {
            if (vv[i].it == 1) {
                if (vv[i].s0 == "") vv[i].s0 = "0";
                if (vv[i].s1 == "") vv[i].s1 = "1";
                vv[i].u = "";///开关量没有单位!
            }
            ts += '<th>' + (i + 1) + '</th>';
            ts += '<td class="vnm" >' + fConvName(vv[i].n) + '</td>';
            ts2 = fVarCanWrite(vv[i]) ? ' class="dx" ' : '';
            ts += '<td  class="vv"  id="idxv' + vv[i].idx + '" ' + ts2 + ' >&nbsp;</td>';
            if (hascmt) ts += '<td class="vcmt" >' + vv[i].c + '</td>';
        } else {
            ts += '<th>&nbsp;</th><td class="vnm" >&nbsp;</td><td>&nbsp;</td>'
            if (hascmt) ts += '<td class="vcmt" >&nbsp;</td>';
        }
        tabstr += ts;
    }
    return tabstr + '</table>';
}

function fniMakeTab() {
    var i, sact, ret = '';
    for (i = 0; i < TabItems.length; i++) {
        sact = (TabItems[i].pg == GRM.pg) ? ' class="sel" ' : '';
        ret += ('<li' + sact + ' id="idmuli' + i + '"><a href="/ni?SID=' + GRM.sid + '&PG=' + TabItems[i].pg + '&RN=' + GRM.rn + '"> &nbsp;' + TabItems[i].n + '&nbsp; </a></li>');
    } document.write('<ul>' + ret + '</ul>');
}
////MyAlarm.js
var g_Alarm = {}, g_His = {};//核心报警对象
var g_HisExportStr = "", g_AlmExportStr = "";
function AlarmQuery(tmbegin, tmend, isinc, maxcnt) {
    var sbegin = DateTimeToStrTMDay(tmbegin);
    var send = DateTimeToStrTMDay(tmend);
    var xmlhttp = CreateHttp();
    var src = '/exdata?SID=' + GRM.sid + '&OP=A';
    var inc = isinc ? "+" : "-";
    var val = sbegin + "\r\n" + send + "\r\n" + inc + "\r\n" + maxcnt;
    g_AlmExportStr = val + "\r\nCHS";
    GI("idDownLoad").style.display = "none";
    xmlhttp.open("POST", src, false);
    g_Alarm.NetError = 0;
    try {
        xmlhttp.send(val);    } catch (e) {
        g_Alarm.NetError = 1;
        ShowMsg("网络错误，无法连接!");
        return;
    }
    var ret = xmlhttp.responseText.split("\r\n");
    if (ret.length < 2 || (ret[0] != "OK") && ret[0] != "ERROR") {
        g_Alarm.NetError = 1;
        ShowMsg("网络错误，无法获取数据!");
        return;
    }
    if (ret[0] == "ERROR") {
        g_Alarm.GrmError = ret[1];
        g_Alarm.GrmErrorMsg = ret[2];
        ShowMsg(g_Alarm.GrmErrorMsg);
        return;
    }
    var meta = ret[1].split(",");
    //OnlineFlag,TimeZone,RecCount, ClipFlag,DbOldTime,DbNewTime,MaxQuery
    g_Alarm.Online = meta[0] == 'Y';
    g_Alarm.TimeZoneDiff = meta[1] - 0;
    g_Alarm.AllRecCount = meta[2]-0;
    g_Alarm.Clip = meta[3] == 'Y';
    g_Alarm.DbOldTime = StrTMToDateTime(meta[4]);
    g_Alarm.DbNewTime = StrTMToDateTime(meta[5]);
    g_Alarm.MaxQuery = meta[6] - 0;
    g_Alarm.Msgs = [];
    var msgcnt = meta[2] - 0;
    var amsg;
    var ameta;
    /*
    RecId是记录号,从1开始。
Tm是本条短信产生的时间，格式是17位的yyyyMMddhhmmsszzz。对报警短信这就是报警的时间。对恢复/应答，这是恢复或者应答的时间。
Type是短信类型，单个字母：A是报警，R是报警恢复，K是报警应答
AlarmID是报警的序号，就是GRM开发软件里面配置的报警的序号，从1开始。从网络应答报警的时候需要这个序号。
Flag是短信标志，只对报警短信有，可能是0-2字母，R表示该报警已恢复，K表示该报警已应答，没有标志位的这里就是空白，但逗号分隔符仍然有。
RefId是对应报警短信的记录号，只有报警恢复和报警应答短信有。用于跟踪对应的报警短信。报警短信这里是0。
RefTm是对应报警短信的报警时间，只有报警恢复和报警应答短信有，报警短信这里是空白。
    */
    for (var i = 0; i < msgcnt; i++) {
        ameta = ret[2 + i * 2].split(",");
        amsg = {};
        amsg.RecId = ameta[0] - 0;
        amsg.Tm = StrTMToDateTime(ameta[1]);
        amsg.Type = ameta[2];
        amsg.AlarmID = ameta[3] - 0;
        amsg.Flag = 0;//目前Flag未用！
        amsg.RefId = 0;//目前未用！
        amsg.RefTm = null;//目前未用！
        amsg.Text = ret[3 + i * 2];//<br>恰好是需要的，所以不转换它，直接使用！
        g_Alarm.Msgs.push(amsg);
    }
}
function fSetStart(edt) {
    var arr = edt.value.split("-");
    giYear = arr[0] - 0;
    giMonth = arr[1] - 0;
    giDay = arr[2] - 0;
}
function fAlmSetTable() {
    var divtab = GI("idDivTab");
    var si, i, ai, st = '<table border="1" align="center"  width="100%"><thead><tr> <td width="6%"><b>序号</b></td><td width="20%"><b>时间</b></td><td width="8%"><b>类型</b></td><td width="8%"><b>报警ID</b></td><td><b>内容</b></td> </tr> </thead> <tbody>\n ';
    if (g_Alarm.Msgs) {
        var srange = g_Alarm.qtBegin.format('yyyy-MM-dd') + ' 到 ' + g_Alarm.qtEnd.format('yyyy-MM-dd');
        var f500 = g_Alarm.Clip ? '查询结果过多, 只显示前500条！ ' : '结果:' + g_Alarm.Msgs.length + '条, ';
        si = '<div style="font-weight:bold;color:#202070;text-align:center;background-color:#E0F0F0">查询时间段(' + srange + '), ' + f500 + ' ';
        if (g_Alarm.AllRecCount > 0 && g_Alarm.Msgs.length == 0) {
            if (g_Alarm.qtBegin.getTime() > g_Alarm.DbNewTime.getTime()) {
                si += '<span style="color:#D00">已超过数据库最新记录(' + g_Alarm.DbNewTime.format('yyyy-MM-dd') + ')</span>';
            } else if (g_Alarm.qtEnd.getTime() < g_Alarm.DbOldTime.getTime()) {
                si += '<span style="color:#440">已超过数据库最旧记录(' + g_Alarm.DbOldTime.format('yyyy-MM-dd') + ')</span>';
            }
        }
        si += '</div>';
        st = si + st;
        for (i = 0; i < g_Alarm.Msgs.length; i++) {
            ai = g_Alarm.Msgs[i];
            si = '<tr><td>' + ai.RecId + '</td><td>' + DateTimeToStr(ai.Tm) + '</td><td>';
            if (ai.Type == 'A')
                si += '报警';
            else if (ai.Type == 'R')
                si += '恢复';
            else si += ai.Type;
            si += '</td><td>' + ai.AlarmID + '</td><td>' + ai.Text + '</td></tr>';
            st += si;
        }
        if (g_Alarm.Msgs.length == 0) {
            st += '<tr><td>(无)</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>';
        }
    }
    divtab.innerHTML = st + ' </tbody></table>';
}

function fAlmExport() {
    var xmlhttp = CreateHttp();
    var src = '/exdata?SID=' + GRM.sid + '&OP=AX';
    xmlhttp.open("POST", src, false);
    try {
        xmlhttp.send(g_AlmExportStr);
    } catch (e) {
        g_His.NetError = 1;
        ShowMsg("网络错误，无法导出!");
        return;
    }
    var ret = xmlhttp.responseText.split("\r\n");
    if (ret[0] != "OK") {
        ShowMsg("历史报警导出错误!");
        return;
    }
    GI("idDownLoadBtn").style.display = "none";
    GI("idDownLoad").style.display = "inline-block";
    GI("idDownURL").href = ret[1];
}

function fAlmQuery() {
    var stmbase = GI("idInpCal").value;
    var tmnum = parseInt(GI("idDays").value, 10);
    var isinc = GI("idInc").checked;
    HideMsg();
    GI("idDownLoad").style.display = "none";
    GI("idDownLoadBtn").style.display = "none";
    stmbase = stmbase.replace(/-/g, "/");
    var tmbase = new Date(stmbase);
    if (isNaN(tmnum)) {
        ShowMsg("时间长度必须是数字!");
        GI("idDays").focus();
        return;
    }
    var dayweekmonth = 0;//Day
    var isupdate = GI("idIncDate").checked;
    if (GI("idrdWeek").checked) {
        dayweekmonth = 1;
        if (tmnum > 100)
            tmnum = 100;
    }
    if (GI("idrdMonth").checked) {
        dayweekmonth = 2;
        if (tmnum > 12) {
            tmnum = 12;
        }
    }
    if (tmnum < 1) {
        tmnum = 1;
    }
    GI("idDays").value = tmnum;
    if (!isinc) {
        tmnum = -tmnum;//递减,时间变成减
    }
    var tm2 = tmbase;
    if (dayweekmonth == 2) {
        tm2 = AddMonth(tmbase, tmnum);
    }
    else if (dayweekmonth == 1) {
        tm2 = AddDay(tmbase, tmnum * 7);
    }
    else {
        tm2 = AddDay(tmbase, tmnum);
    }
    var tbegin, tend;
    if (isinc) {
        tbegin = tmbase;
        tend = tm2;
    }
    else {
        tbegin = tm2;
        tend = tmbase;
    }
    tend.setTime(tend.getTime());
    AlarmQuery(tbegin, tend, isinc, 500);
    g_Alarm.qtBegin = tbegin;
    g_Alarm.qtEnd = tend;
    fAlmSetTable();
    if (isupdate) {
        tend.setTime(tend.getTime());
        GI("idInpCal").value = tm2.format('yyyy-MM-dd');
    }
    if (g_Alarm.Msgs.length > 0) {
        GI("idDownLoadBtn").style.display = "inline";
    }
}
var fd = true;

function ValToStrN(v, fnum) {
    if (typeof (fnum) == 'undefined')
        return v + '';
    if (fnum <= -1) return v + '';
    return (v + 0).toFixed(fnum);
}
function fHisInitChart() {
    Number.prototype.toFixed = v_oldtofixed;
    var chartini = {
        // Highcharts 配置
        chart: {
            renderTo: "idDivTab",  // 注意这里一定是 ID 选择器
            type: 'line',
            ignoreHiddenSeries: false,
            zoomType: 'x',
            animation:false,
            panning: true,
            panKey: 'shift',
            style: {
                fontFamily: "",
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#006cee'
            },
            backgroundColor: {
                linearGradient: [0, 0, 0, 600],
                stops: [
                    [0, '#F0F0F0'],
                    [1, '#C8C8C8']
                ]
            },
            //plotBackgroundImage: "/nimanage_bg.png",
            xx_Nouse: 0
        },
        title: {
            text: '',      //指定图表标题
            style: {}
        },
        credits: { enabled: false },
        tooltip: {
            shared: true,
            crosshairs: [true, true],
            dateTimeLabelFormats: {
                millisecond: "%Y-%m-%d, %H:%M:%S.%L",
                second: "%Y-%m-%d日, %H:%M:%S",
                minute: "%Y-%m-%d日, %H:%M:%S",
                hour: "%Y-%m-%d日, %H:%M:%S",
                day: "%Y-%m-%d日, %H:%M:%S",
                month: "%G,%B",
                year: "%Y"
            }
        },
        labels: { items: [] },
        xAxis: {
            gridLineWidth: 1,
            labels: {
                align: 'left',
                x: 3,
                y: -3
            },
            type: 'datetime',
            title: {
                text: '时间日期'
            }
        },
        yAxis: [
        {
            title: {
                text: '数值'
            },
            labels: {
                x: -3,
                y: 16,
                format: '{value:.,0f}'
            },
            tickLength: 0,
            //tickInterval: 5,
            //tickPixelInterval:null,
            showFirstLabel: true
        }],
        plotOptions: {
            series: {
                states: {
                    hover: { lineWidth: 2, lineWidthPlus: 0 }
                }
            }
        },
        series: [],
        _nouse: 0
    };
    if (!g_isSupportTouch) {
        chartini.labels.items.push({
            html: "鼠标拖选可放大/缩小，按住Shift拖动曲线", style: {
                left: '10px',
                top: '-20px'
            }
        });
    }
    if (hisdef.smooth)
        chartini.chart.type = "spline";
    chartini.title.text = hisdef.caption;
    chartini.title.style.color = hisdef.caption_color;
    chartini.chart.borderWidth = 1;
    chartini.chart.backgroundColor.stops[0][1] = hisdef.bg_color;
    chartini.chart.backgroundColor.stops[1][1] = hisdef.bg2_color;
    var chartini_y1 = chartini.yAxis[0];
    //if (!hisdef.y_auto) {
    //    chartini_y1.max = hisdef.y_max;
    //    chartini_y1.min = hisdef.y_min;
    //    chartini_y1.tickAmount = 5;
    //}
    chartini_y1.title.text = hisdef.y_caption;
    chartini.xAxis.gridLineColor = hisdef.grid_color;
    chartini_y1.gridLineColor = hisdef.grid_color;
    hisdef.y2_enable = !!hisdef.y2_caption;
    var hasy2 = false;
    for (var i = 0; i < hisdef.v_var.length; i++) {
        if (hisdef.v_var[i].use_y2 && hisdef.y2_enable)
            hasy2 = true;
        if (!hisdef.v_var[i].hasOwnProperty('fnum')) hisdef.v_var[i].fnum = -1;
    }
    if (!hasy2) {
        hisdef.y2_enable = false;
        hisdef.y2_caption = "";
    }

    if (hisdef.y2_caption) {
        chartini.yAxis.push({
            title: { text: hisdef.y2_caption },
            labels: { x: -3, y: 16, format: '{value:.,0f}' }, opposite: true,
            showFirstLabel: true, tickLength: 0
        });
        var chartini_y2 = chartini.yAxis[1];
        //if (!hisdef.y2_auto) {
        //    chartini_y2.max = hisdef.y2_max;
        //    chartini_y2.min = hisdef.y2_min;
        //    chartini_y2.tickAmount = 5;
        //}
        chartini_y2.gridLineColor = hisdef.grid_color;
    }
    for (var i = 0; i < hisdef.v_var.length; i++) {
        var vvitem = {
            name: hisdef.v_var[i].display,
            color: hisdef.v_var[i].color,
            data: [],
            yaxis: 0,
            tooltip: {}
        };
        if (hisdef.v_var[i].use_y2 && hisdef.y2_enable) vvitem.name += ' (副y轴)';
        if (hisdef.v_var[i].use_y2 && hisdef.y2_enable) {
            vvitem.yAxis = 1;
        }
        if (hisdef.v_var[i].unit) {
            vvitem.tooltip.valueSuffix = " " + hisdef.v_var[i].unit;
        }
        if (hisdef.v_var[i].fnum > -1) {
            vvitem.tooltip.valueDecimals = hisdef.v_var[i].fnum;
        }
        chartini.series.push(vvitem);
    }
    g_chart = new Highcharts.Chart(chartini);
}

function fHisExport() {
    var xmlhttp = CreateHttp();
    var src = '/exdata?SID=' + GRM.sid + '&OP=HX';
    xmlhttp.open("POST", src, false);
    try {
        xmlhttp.send(g_HisExportStr);
    } catch (e) {
        g_His.NetError = 1;
        ShowMsg("网络错误，无法连接!");
        return;
    }
    var ret = xmlhttp.responseText.split("\r\n");
    if (ret[0] != "OK") {
        ShowMsg("历史数据导出错误!");
        return;
    }
    GI("idDownLoadBtn").style.display = "none";
    GI("idDownLoad").style.display = "inline-block";
    GI("idDownURL").href = ret[1];
}
function fHisQueryG() {
    var xmlhttp = CreateHttp();
    var src = '/exdata?SID=' + GRM.sid + '&OP=HG';
    xmlhttp.open("POST", src, false);
    try {
        xmlhttp.send("");
    } catch (e) {
        g_His.NetError = 1;
        ShowMsg("网络错误，无法连接!");
        return;
    }
    var arr = xmlhttp.responseText.split("\r\n");
    if (arr.length > 1 && arr[0] == "OK") {
        //AllRecCount,RecCountLimit,TimeZone,DbOldTime,DbNewTime,MaxQuery 
        var vret = arr[1].split(",");
        var vall = vret[0] * 1.0, vlimit = vret[1] * 1.0;
        var dbold = StrTMToDateTime(vret[3]),dbnew=StrTMToDateTime(vret[4]);
        if (vall > vlimit) vall = vlimit;
        var msg = "现有数据记录条数:" + vall + ", 限值:" + vlimit + ",已用比例:" + (100 * vall / vlimit).toFixed(2) + "%\n";
        if (vall > 0) {
            msg += "最早的历史数据时间(" + dbold.format("yyyy-MM-dd hh:mm:ss") + "),最晚时间(" + dbnew.format("yyyy-MM-dd hh:mm:ss") + ")";
        }
        alert(msg);
    }
}
function fAlmQueryG() {
    var xmlhttp = CreateHttp();
    var src = '/exdata?SID=' + GRM.sid + '&OP=AG';
    xmlhttp.open("POST", src, false);
    try {
        xmlhttp.send("");
    } catch (e) {
        g_His.NetError = 1;
        ShowMsg("网络错误，无法连接!");
        return;
    }
    var arr = xmlhttp.responseText.split("\r\n");
    if (arr.length > 1 && arr[0] == "OK") {
        //AllRecCount,RecCountLimit,TimeZone,DbOldTime,DbNewTime,MaxQuery 
        var vret = arr[1].split(",");
        var vall = vret[0] * 1.0, vlimit = vret[1] * 1.0;
        var dbold = StrTMToDateTime(vret[3]), dbnew = StrTMToDateTime(vret[4]);
        if (vall > vlimit) vall = vlimit;
        var msg = "现有报警记录条数:" + vall + ", 限值:" + vlimit + ",已用比例:" + (100 * vall / vlimit).toFixed(2) + "%\n";
        if (vall > 0) {
            msg += "最早的报警记录时间(" + dbold.format("yyyy-MM-dd hh:mm:ss") + "),最晚时间(" + dbnew.format("yyyy-MM-dd hh:mm:ss") + ")";
        }
        alert(msg);
    }
}
function fHisQuery() {
    var stmbase = GI("idInpCal").value;
    var stmtm = GI("idInpTime").value;
    var tmnum = parseInt(GI("idDays").value, 10);
    var isinc = GI("idInc").checked;
    HideMsg();
    if (hisdef.tab_cols == 0) {//曲线图
        if (g_chart.resetZoomButton)
            g_chart.zoomOut();
    }
    stmbase = stmbase.replace(/-/g, "/");
    var tmbase = new Date(stmbase + " " + stmtm);
    if (isNaN(tmnum)) {
        ShowMsg("时间长度必须是数字!");
        GI("idDays").focus();
        return;
    }
    var minhourday = 0;//Min
    var isupdate = GI("idIncDate").checked;
    if (GI("idrdHour").checked) {
        minhourday = 1;
        if (tmnum > 240)
            tmnum = 240;
    }
    if (GI("idrdDay").checked) {
        minhourday = 2;
        if (tmnum > 31) {
            tmnum = 31;
        }
    }
    if (tmnum < 1) {
        tmnum = 1;
    }
    GI("idDays").value = tmnum;
    if (!isinc) {
        tmnum = -tmnum;//递减,时间变成减
    }
    var tm2 = tmbase;
    if (minhourday == 2) {
        tm2 = AddMinute(tmbase, tmnum * 60 * 24);
    }
    else if (minhourday == 1) {
        tm2 = AddMinute(tmbase, tmnum * 60);
    }
    else {
        tm2 = AddMinute(tmbase, tmnum);
    }
    var tbegin, tend;
    if (isinc) {
        tbegin = tmbase;
        tend = tm2;
    }
    else {
        tbegin = tm2;
        tend = tmbase;
    }
    tend.setTime(tend.getTime());
    HisQuery(tbegin, tend, isinc, 1000);
    g_His.qtBegin = tbegin;
    g_His.qtEnd = tend;
    g_His.isInc = isinc;
    fHisSetRet();
    if (isupdate) {
        tend.setTime(tend.getTime());
        GI("idInpCal").value = tm2.format('yyyy-MM-dd');
        GI("idInpTime").value = tm2.format('hh:mm:ss');
    }

    if (g_His.AllRecCount > 0) {
        GI("idDownLoadBtn").style.display = "inline-block";
    }
    else {
        GI("idDownLoadBtn").style.display = "none";
    }
}

function HisQuery(tmbegin, tmend, isinc, maxcnt) {
    var sbegin = DateTimeToStrTM(tmbegin);
    var send = DateTimeToStrTM(tmend);
    var xmlhttp = CreateHttp();
    var src = '/exdata?SID=' + GRM.sid + '&OP=H';
    var inc = isinc ? "+" : "-";
    var val = sbegin + "\r\n" + send + "\r\n" + inc + "\r\n", valname = "",exvalname="";
    var i, j, k, varcount,tmpv;
    g_HisExportStr = val;
    varcount = hisdef.v_var.length;
    GI("idDownLoad").style.display = "none";
    for (i = 0; i < varcount; i++) {
        tmpv= hisdef.v_var[i];
        if (valname.length == 0){
            valname =tmpv.name;
            exvalname = tmpv.name + ":" + tmpv.display + ":" + tmpv.unit + ":-1";
        }       
        else {
            valname += "," + hisdef.v_var[i].name;
            exvalname +=","+ tmpv.name + ":" + tmpv.display + ":" + tmpv.unit + ":-1";
        }  
        tmpv.dval = [];//重新初始化
    }
    hisdef.ret_tms = [];//
    val += valname + "\r\n" + maxcnt;
    g_HisExportStr += exvalname + '\r\n'+(6*maxcnt)+'\r\nCHS';
    xmlhttp.open("POST", src, false);
    g_His.NetError = 0;
    g_His.AllRecCount = 0;
    try {
        xmlhttp.send(val);
    } catch (e) {
        g_His.NetError = 1;
        ShowMsg("网络错误，无法连接!");
        return;
    }
    var ret = xmlhttp.responseText.split("\r\n");
    if (ret.length < 2 || (ret[0] != "OK") && ret[0] != "ERROR") {
        g_His.NetError = 1;
        ShowMsg("网络错误，无法获取数据!");
        return;
    }
    if (ret[0] == "ERROR") {
        g_His.GrmError = ret[1];
        g_His.GrmErrorMsg = ret[2];
        if (g_His.GrmError == 16) {
            g_His.GrmErrorMsg = "历史数据定义错误，常见原因是某个历史变量不存在！";
        }
        ShowMsg(g_His.GrmErrorMsg);
        return;
    }
    var meta = ret[1].split(",");
    //OnlineFlag,TimeZone,RecCount, ClipFlag,DbOldTime,DbNewTime,MaxQuery
    g_His.Online = meta[0] == 'Y';
    g_His.TimeZoneDiff = meta[1] - 0;
    g_His.AllRecCount = meta[2] - 0;
    g_His.Clip = meta[3] == 'Y';
    g_His.DbOldTime = StrTMToDateTime(meta[4]);
    g_His.DbNewTime = StrTMToDateTime(meta[5]);
    g_His.MaxQuery = meta[6] - 0;
    var msgcnt = meta[2] - 0;
    var amsg, ameta, atm, tmpval;
    for (j = 0; j < varcount; j++) {
        hisdef.v_var[j].dval.length = msgcnt;
    }
    for (i = 0; i < msgcnt; i++) {
        ameta = ret[2 + i].split(",");
        atm = StrTMToUTC(ameta[1]);
        hisdef.ret_tms.push(StrTMToStr(ameta[1]));
        if (hisdef.tab_cols == 0 && !isinc) {
            for (j = 0; j < varcount; j++) {
                tmpval = ameta[2 + j] - 0;
                if (isNaN(tmpval)) tmpval = null;
                hisdef.v_var[j].dval[msgcnt - 1 - i] = [atm, tmpval];
            }
        }
        else {
            for (j = 0; j < varcount; j++) {
                tmpval = ameta[2 + j] - 0;
                if (isNaN(tmpval)) tmpval = null;
                hisdef.v_var[j].dval[i] = [atm, tmpval];
            }
        }
    }
    if (g_His.AllRecCount == 0) {
        var infss = "所选时间段内查不到任何数据!<br>";
        if (g_His.DbOldTime.getFullYear() >= 2000) {
            infss += "最早的数据时间:" + g_His.DbOldTime.format("yyyy-MM-dd,hh:mm:ss")
                + ",最晚的数据时间:" + g_His.DbNewTime.format("yyyy-MM-dd,hh:mm:ss");
        }
        ShowInfoMsg(infss);
    }
}

function fHisSetRet() {
    if (hisdef.tab_cols == 0) {
        g_chart.zoom();
        //曲线图直接插入数据即可
        for (var i = 0; i < hisdef.v_var.length; i++) {
            g_chart.series[i].setData(hisdef.v_var[i].dval);
        }
        return;
    }
    var tabhtm = '<table id="idHisTab" border="1" align="center"  width="100%" ';
    if (GRM.xmob) {
        tabhtm += 'style=" "';
    }
    else {
        tabhtm += 'style="padding:5px"';
    }
    tabhtm += '><thead><tr>';
    var i, j, sitem = '<th>序号</th><th class="ctm">采样时间</th>'
    for (j = 0; j < hisdef.v_var.length; j++) {
        sitem += '<th class="cv_' + j + '">' + hisdef.v_var[j].display + '</th>';
    }
    for (i = 0; i < hisdef.tab_cols; i++) {
        if (i == 0) {
            tabhtm += sitem;
        } else {
            tabhtm += '<th style="width:2em">&nbsp;</th>' + sitem;
        }
    }
    tabhtm += "</tr></thead>";
    //生成了表头，下面是数据
    tabhtm += "<tbody>";
    var rrow = 0, vcnt = hisdef.ret_tms.length, gridcnt, ts, ts2;
    gridcnt = Math.ceil(vcnt / hisdef.tab_cols) * hisdef.tab_cols;
    for (i = 0; i < gridcnt; i++) {
        ts = '';
        if (i % hisdef.tab_cols == 0) {
            if (ts) {
                rrow++; ts += '</tr><tr>';
            }
            else {
                ts += '<tr>';
            }
        }
        if (i < vcnt) {
            ts += '<th>' + (i + 1) + '</th>';
            ts += '<td class="ctm" >' + hisdef.ret_tms[i] + '</td>';
            for (j = 0; j < hisdef.v_var.length; j++) {
                ts2 =  ValToStrN(hisdef.v_var[j].dval[i][1], hisdef.v_var[j].fnum);
                if (hisdef.v_var[j].unit)
                    ts2 += " " + hisdef.v_var[j].unit;
                ts += '<td class="cv_' + j + '">' + ts2 + '</td>';
            }
        }
        else {//没有数据
            ts += '<th>&nbsp;</th>';
            ts += '<td class="ctm" >&nbsp;</td>';
            for (j = 0; j < hisdef.v_var.length; j++) {
                ts += "<td>&nbsp;</td>";
            }
        }
        if (hisdef.tab_cols > 1 && (i % hisdef.tab_cols != hisdef.tab_cols - 1)) {
            ts += '<td>&nbsp;</td>';
        }
        tabhtm += ts;
    }
    GI("idDivTab").innerHTML = tabhtm + '</tbody></table>';
}
function fHisInit() {
    GI("idInpCal").value = new Date().format('yyyy-MM-dd');
    GI("idDownLoad").style.display = "none";
    GI("idDownLoadBtn").style.display = "none";
    if (hisdef.tab_cols == 0) {
        fHisInitChart();
        return;
    }
    else {
        if (GRM.mob)
            hisdef.tab_cols = 1;
        var tabhtm = '<table id="idHisTab" border="1" align="center"  width="100%"><thead><tr>';
        var i, j, sitem = "<th>序号</th><th>采样时间</th>";
        for (j = 0; j < hisdef.v_var.length; j++) {
            sitem += "<th>" + hisdef.v_var[j].display + "</th>";
        }
        for (i = 0; i < hisdef.tab_cols; i++) {
            if (i == 0) {
                tabhtm += sitem;
            } else {
                tabhtm += '<th style="width:2em">&nbsp;</th>' + sitem;
            }
        }
        tabhtm += "</tr></thead>";
        GI("idDivTab").innerHTML = tabhtm + '</table>';
    }
}

function fGetGvImg(sname) {
    if (sname == "OK_18px") {
        return '<img alt="OK_18px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAWCAYAAADNX8xBAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAQQSURBVHja3JRbbJRVEIC/c87/799uF7psb7ZKkYIGCpFLQFHBFmIiGAW0iYnQooAJRCMhAUQCEu+JxBdfjEJADGp8UMBComghUIGCBoRCTcWGcC3rUmj3wu7+1+PDIhJ99cmZZOZl5svMZGaE1pr/QsT/GDQkHUNLjXnDxIxbpGJJVZ6oeGKSnNw0OTJpXNSOVmug37oeP37xeGfHD4e/7u26vDv4xnf/DVIanYVwT2RiQ3Ta+/Mr500fWToCQxpoNAIQSDSaS95lvjq5vX3buk9fTX2X7PgblInh+R6V16tmLTWWfvZIzdSYkgZe4CKRSC0LkbpghJSEZIhDV48k33397UUXPjy/HUBE8oMYcr584trImn1ja+pLs0EOqSUGCoVCaIlAgNZ42qcsiGFhkbEyHIwfyqxvWT+rf+/1gyLcXxKa39fS1lQ3d1pSpzC1QUEVUqtbVbnapTKoYkLReIQQnMqcJlGU4Iv2L49teWZToxjXPeHJVVUrWu3BNvigtCpgbnqpJQEBES9CQ3EDxaoY13fZm95HWqbJ+zZrXlrzvJh98ultTaPmNF+lD0MXWjF0AaRQSC3Ag5nWTGqKagDY37+fbq8bMwgRtaJs3rG1VSw4sfDU+DH3jU27aaQWaK0xtImhFUorHN9hiphCY7QRgM5kJ3sy32NhIX2JoRTtXYfPiMZjjybq6msr7vCqCfyAiFdCmgymNNABlDkxlpQvJWwWE8/F2ZL4hCAIMLVJ4Gu6Ul1c6Uv0iWE/1yXMOlkx3K9jeWg508ONHMkcoTXbihu4NIdbmFL2AATw8cWN9Ng9hHyLpJPi3MA54tk/yAb5PnHvT/Wn9VBvjJt3WGut44XqxYU5XDvA0f6jrBy+AqUUbfE2Nl3ZAg4ks0mS2RS+HYAB2VzujLhn1+jPQxPUPDNvorOaZaXLWFS7EICskyUcCtN7o5dnTzaTvpHBsA2EJxCeBE/glrokTwzsFtWL75xT+VrlTisXInADcrk8qypX8tzdC25t9KpfV7MjsZOoE0M4AulIcED7AqfC5tKGCy+KoruKrJGbR+0N11oPq4yBGzjYrstbtW8wZ+hs2q/+yMKexRQ7YZRtIG2JzCtkXhGU+GQupzvPrv7tcQEQayi/f9h7w9sswxzk5wNyqnAmM0pn0OF2kLATWHbRTYiByhY23lFu9uKbZ1tSnQPbxV/XW9M8dG7FksqtlOhS3wlwpENKpggpEzMIIfICmVMoWyGUQud0JvFB7yvX9ic2Ar64/acMeahsasXLVRtkvXzQNVx8PAIZQADSUShfoWwT75T3S99H8XdSJwZ2Aj6A+OenMwab4dLpsaaSxyJPGSPUaB3W5WgBGdHnd7u/Z/akv00e6N/l571Lt+f9OQBjCuTb/nIhPQAAAABJRU5ErkJggg==" />';
    }
    else if (sname == "Export_18px") {
        return '<img alt="Export_18px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAWCAYAAADNX8xBAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAOwSURBVHja7JTPb1RVFMc/9703paXT6aNKWywtBacWMYYqISEsiCGpxJULTfwrTNSFCYlu2Ji4MBoJIaLoxl9gaIMwagIsKETKD60ikgItFahUWjod2pl57/46Lh6oOzcuvcnNPefcnE++59yTq0SE/2Kp/0H/Dtr56ckpHzW1OutxXnBe8Pf3A9vJP+IiGBGsF4xAGEWsW7r4q9p54PyibVyZT1KNNh5tPNY6jPGk1mOsu396rPWk3lNzQmI9VeeJciEvNv10Wb3++Wg5ya2I09SgrccYj3hPol3mW492HucEaz2JcyROSFwGjBpCXlh+6ZLaUzpb7uloizPpYL1nYalK3NyM9YKIIEA10VjrWN7UiHVZuR6whNy4cOKMOj42Ud6+cV38oGlOYPzGNBvWdOEAD4TA7fl7JNrS09mGtiACQQCLGt7bs/eI+vaHa+UdTz0aG8kujRWu3Pqd9b1dOJuBggBm7lYwxrKq/SG0zVQqFFXj2ffhByX15cjP5a39XXHdeARwXpievUt3x0qc94iAUgGVpSrWOeJCAes9gQoAqFnh8KGDJXVg5GJ564buuK6zJOd9Bupsz55cIAAq1SrGWlYUYpwIdV0nDAK8WsbwwS9K6uj5q+Udm4pxTYMgGOuZmL5NX89qrBNCpYgCuDNXw1hLR3sBERi6OkRzQ54tnYPs+2hvSX197mp5cFMxrqeZIu08k9MzFLu7CJXidmWWHyvfM2Wuoxz0NvbT1/Akw0v7cVHKSy07OXTgs5L6+NiF8sa17XH6oEdOmFuo0LWyg8nyOKNNR1hsm0dFChEQLTRXWpFGTxrVeXxmB3On50tqeHS8vH2gGNe0xwtY67j5xyytrQ28P7OLm50TVJIldKJRBiIayAU5mlWeQthC22Ivy493ltTw2Svl7QN9cS11CGCc487MPU6bw+wO3yLRKaEJUDokMAGhiQhNiHggB0FrjoFTm79TQ6NXys8M9MX11N6fjYATP46wJ30TWmBb8CyrGtdQTapcv3eNKRnnlkxhGjW1fJVaoUr/5Sd+U4cvTC4OPr02X9PZQOYU7B7Zz7ic4dUNu+gqdEII8wuawCoOzX/CO8EbkBdWs4Zt6fPUS+aUenfo5HR3e1tsnReRTNHEnUnaWmL1cL5dtNUIoLURZSX31SNvL7vsxuymm8+lm9Wg6m7uZ+zcsW/Uy6+8VrTOh6i/P6lcmMN7hxP/VziSyP0SXVo/+9jslt6xnqN2QeaKPcXQa0suVEt/DgBPGFP5fqRQGQAAAABJRU5ErkJggg==">';
    }
}

var divMsg;
function ShowMsg(s) {
    divMsg.innerHTML = s;
    divMsg.style.display = "block";
    alert(s);
}
function ShowInfoMsg(s) {
    divMsg.innerHTML = s;
    divMsg.style.display = "block";
}
function HideMsg() {
    divMsg.style.display = "none";
}
