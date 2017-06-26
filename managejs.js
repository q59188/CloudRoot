"use strict";
function GEBI(a) {
    return document.getElementById(a);
}
function msgbox(a) {
    window.alert(a);
}
function GI(a){
    return document.getElementById(a);
}
function GoHome() {
    window.location.href = GRM.home;
}
function DR(a){
    document.write(a);
}
if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/(^\s*)|(\s*$)/g, "");
    }
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
function fHideCalendar() { if (!GI("calendardiv")) return; $FUN("calendardiv").style.visibility = "hidden"; for (var i = 0; i < goSelectTag.length; i++) { goSelectTag[i].style.visibility = "visible"; } goSelectTag.length = 0; }
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
function PassSubmitTest(){
	var ret=false;
	var ff = GEBI("chkpass");
	var msg = "";
	if(ff.CHP.value==""){
	    if (GRM.x_ip){
	        ff.CHP.value = "111111";
	    } else{
	        alert("修改密码和权限必须输入当前的高优先级密码!");
	        return false;
	    }
	} else {
	    if (GRM.x_ip && ff.CHP.value != "111111") {
	        alert("请正确输入当前的高优先级密码(默认值111111)!");
	        return false;
	    }
	}
	if(ff.HP.value=="111111"){
	alert("不可把密码修改为默认值!");
	return false;
	}
	if(ff.HP.value==ff.CHP.value){
	alert("不可把密码修改为现有的密码!");
	return false;
	}
	if(ff.HP.value!= ff.HP2.value){
	alert("输入和重复高优先级密码必须相同!");
	return false;
	}
	if (ff.HP.value) {
	    msg = fPassFmt2Str(fCheckPassFmt(ff.HP.value, 6), 6);
	    if (msg) {
	        alert("高优先级密码:" + msg);
	        return false;
	    }
	}
	if(ff.MP.value!= ff.MP2.value){
	    alert("输入和重复中优先级密码必须相同!");
	    return false;
	}
	if (ff.MP.value) {
	    fPassFmt2Str(fCheckPassFmt(ff.MP.value, 6), 6);
	    if (msg) {
	        alert("中优先级密码:" + msg);
	        return false;
	    }
	}
	if(ff.LP.value!= ff.LP2.value){
	alert("输入和重复低优先级密码必须相同!");
	return false;
	}
	if (ff.LP.value) {
	    fPassFmt2Str(fCheckPassFmt(ff.LP.value, 6), 6);
	    if (msg) {
	        alert("低优先级密码:" + msg);
	        return false;
	    }
	}
	return true;
}
function fEditDownPassChk() {
    var dsp = GEBI("idEditDownPassChk").checked ? 'block' : 'none';
    GEBI("idEditPassTab").style.display = dsp;
    GEBI("idEditPassTab").style.borderWidth = "1px";
}
function fCheckPassFmt(v, dig) {
    if (v.length == 0)
        return 5;
    if (v.length < dig)
        return 3;
    if (v.length > 15)
        return 4;
    var num = 0;
    var reg = /\d/; //如果有数字
    if (reg.test(v)) {
        num++;
    }
    reg = /[a-zA-Z]/; //如果有字母
    if (reg.test(v)) {
        num++;
    }
    if(num<2)
        return 1;
    reg = /[^0-9a-zA-Z]/; //如果有特殊字符
    if (reg.test(v)) {
        return 2;
    }
    return 0;
}
function fPassFmt2Str(iv,dig){
    if(iv==0)return "";
    if(iv==1)return "密码必须同时含有字母(大小写均可)和数字";
    if(iv==2)return "密码不能有字母(大小写均可)和数字之外的其它字符";
    if(iv==3)return "密码长度不够，至少要"+dig+"位";
    if (iv == 4) return "密码不可超过15位";
    if (iv == 5) return "密码不可为空";
    return "#ERROR";
}
function fManageCreateDlg() {
    $("#btn_datapage").button({
        icons: {
            primary: "ui-icon-arrowreturnthick-1-w"
        }
    });
    if (GRM.x_phone) {
        $("#btn_editphone").button({
            icons: {
                primary: "ui-icon-contact"
            }
        });
    };
    if (GRM.x_editlan) {
        $("#btn_editlan").button({
            icons: {
                primary: "ui-icon-contact"
            }
        });
    };
    $("#tabs").tabs({
        beforeActivate: function (event, ui) {
            var x = ui.newTab.get(0);
            if (x.id == "idHisEditPage") {
                fOnHisPageActive();
            }
            else if (x.id == "idSubTabPageHdr") {
                if (GRM.hasst) {
                    fOnSubTabActive();
                }
            }
        }
    });
    g_HisEditor = $("#idHisEditor").dialog({
        autoOpen: false,
        resizable: false,
        minHeight: 500,
        minWidth: 700,
        modal: true,
        position: { of: '#tabs' },
        dialogClass: "no-close",
        //draggable:false,
        buttons: [
            {
                text: "确定", icons: { primary: "ui-icon-check" },
                click: function () {
                    if (fHisEditorOkCheck()) {
                        $(this).dialog("close");
                        fHisPageInit();
                    }
                }
            },
            {
                text: "取消", icons: { primary: "ui-icon-closethick" },
                click: function () {
                    $(this).dialog("close");
                    fHisPageInit();
                }
            }],
        close: function () {
            fHisEditorClear();
        }
    });
    g_HisVarItemEditor = $("#idHisVarItemEditor").dialog({
        autoOpen: false,
        resizable: false,
        minHeight: 300,
        minWidth: 400,
        modal: true,
        dialogClass: "no-close",
        position: { of: '#idHisEditor' },
        //draggable: false,
        buttons: [{
            text: "确定", icons: { primary: "ui-icon-check" },
            click: function () {
                if (fhvOkCheck()) {
                    $(this).dialog("close");
                    fHisEditorVar2UI();
                }
            }
        },
            {
                text: "取消", icons: { primary: "ui-icon-closethick" },
                click: function () {
                    $(this).dialog("close");
                }
            }],
        close: function () {
            fhvClear();
        }
    });
    if (!(GRM.x_hen && GRM.x_hv)) {
        GEBI("idhisedittable").style.display = "none";
    }
    //
    g_STabEditor = $("#idSTabItemEditor").dialog({
        autoOpen: false,
        resizable: false,
        minHeight: 500,
        maxHeight: 660,
        minWidth: 700,
        modal: true,
        position: { of: '#tabs' },
        dialogClass: "no-close",
        //draggable:false,
        buttons: [
            {
                text: "确定", icons: { primary: "ui-icon-check" },
                click: function () {
                    if (fSTabEditorOkCheck()) {
                        $(this).dialog("close");
                    }
                }
            },
            {
                text: "取消", icons: { primary: "ui-icon-closethick" },
                click: function () {
                    $(this).dialog("close");
                }
            }],
        close: function () {
            fSTabEditorClear();
        }
    });
}
function fDownClick() {//进入下载界面
    if (!GRM.x_d) {
        var sPass = GEBI("DOWNPASS").value;
        if (sPass == "12345678") {
            msgbox("不可使用默认密码,请使用您修改后的密码！");
            return;
        }
        var msg = fPassFmt2Str(fCheckPassFmt(sPass, 8), 8);
        if (msg) {
            msgbox(msg);
            return;
        }
        var xmlhttp = CreateHttp();
        var stext = "CHP=" + sPass+"&GRM="+GRM.id;
        try {
            xmlhttp.open("POST", "/nimanageaj?SID=" + GRM.sid, false);
            xmlhttp.send(stext);
            if (xmlhttp.responseText != "OK") {
                msgbox("密码错误！");
                return;
            }
        } catch (e) {
            msgbox("网络故障！");
            GoHome();
        }
    }
    window.location.href = '/nimanagedown?SID=' + GRM.sid + '&RN=' + GRM.rn;//跳转！
}
function fDownEdit()//修改下载密码
{
    var pe1 = GEBI("DOWNPASSEDT1").value;
    var pe2 = GEBI("DOWNPASSEDT2").value;
    if (pe1 != pe2) {
        msgbox("两次输入密码必须一致！");
        return false;
    }
//    if (pe1 == "12345678") {
//        msgbox("不可使用默认密码,请使用您修改后的密码！");
//        return;
//    }
    var msg = fPassFmt2Str(fCheckPassFmt(pe1, 8), 8);
    if (msg) {
        msgbox("修改密码:" + msg);
        return false;
    }
    var currp = "";
    if (!GRM.x_dip) {
        currp = GEBI("DOWNPASS0").value;
    //    if (currp == "12345678") {
    //        msgbox("不可使用默认密码,请使用您修改后的密码！");
    //        return;
    //    }
        msg = fPassFmt2Str(fCheckPassFmt(currp, 8), 8);
        if (msg) {
            msgbox("当前下载密码:" + msg);
            return false;
        }
    }
    var xmlhttp = CreateHttp();
    var stext = "DP=" + pe1 + "&GRM=" + GRM.id + "&CHP=" + currp;
    try {
        xmlhttp.open("POST", "/nimanageaj?SID=" + GRM.sid, false);
        xmlhttp.send(stext);
        if (xmlhttp.responseText.trim() != "OK") {
            msgbox("密码修改失败！");
            return;
        }
    } catch (e) {
        msgbox("网络故障！");
        GoHome();
    }
    msgbox("密码修改成功！");
    window.location.href = '/nimanagedown?SID=' + GRM.sid + '&RN=' + Math.ceil(Math.random()*100000);//跳转！
}
function feditphone() {
    window.location.href = "/nieditphone?SID=" + GRM.sid;
}

function feditlan() {
    window.location.href = "/lancfg?SID=" + GRM.sid;
}

var g_HisVarList = [], g_His = {}, g_HisEditor, g_HisVarItemEditor, g_STabEditor;
function fOnHisPageActive() {
    if (g_His.IsInit) return;
    var xmlhttp = CreateHttp();
    var stext ="N";
    try {
        xmlhttp.open("POST", "/exdata?SID=" + GRM.sid + "&OP=HE&random=" + Math.random, false);
        xmlhttp.send(stext);
        if (xmlhttp.status != 200)
            throw 1;
        var i,cnt, ret = xmlhttp.responseText .split("\r\n");
        if (ret[0] != "OK"){
            msgbox(ret[2]);
            return;
        }
        cnt = +ret[1];
        g_HisVarList = [];
        for (i = 0; i < cnt; i++) {
            g_HisVarList.push(ret[i + 2]);
        }
        g_His.IsInit = true;
    } catch (e) {
        msgbox("网络故障！");
        GoHome();
        return;
    }
    //加载历史变量OK
    g_His.obj = g_hispage;
    g_His.arr=g_His.obj.items;
    fHisPageInit();
}

function fMakeIconButton(sico, sonclick, stext, sxprop) {
    if (!stext) stext = '';
    if (!sxprop) sxprop = '';
    if (sonclick.length > 0)
        sonclick = ' onclick="' + sonclick + '" ';
    return '<button ' + sonclick + sxprop + ' ><table class="clsnogrid"><tr><td><span class="ui-icon ' + sico + '"></span></td><td>' + stext + '</td></tr></table></button>';
}

function fHisPageInit() {
    if (g_isoldie) {
        GEBI("idhisedittable").innerHTML = '在IE8或更早版本的IE上无法配置历史曲线！<br/>请升级到IE9以上，或者使用非IE核心的浏览器！<br/>例如：chrome，Firefox，以及国产的傲游maxthon，QQ浏览器，猎豹浏览器，搜狗浏览器等等，<br/>包括iPhone和安卓手机的浏览器';
        return;
    }
    GI("idhdDate").value = new Date().format("yyyy-MM-dd");
    var shtm = '<table  style="width:100%" class="clsgrid"><thead> <tr><th style="width:8%">序号</th><th style="width:27%">历史页面名称</th><th style="width:10%">变量</th><th style="width:15%">调整顺序</th><th style="width:30%">操作</th></tr></thead> <tbody>', s1, i;
    for (i = 0; i < g_His.arr.length; i++) {
        s1 = '<tr><th>' + (i + 1) + '</th><td><table class="clsnogridN"><tr><td style="vertical-align: bottom"><span class="ui-icon ';
        s1 += g_His.arr[i].tab_cols == 0 ? ' ui-icon-grm-trand' : ' ui-icon-grm-grid';
        s1 += '"></span></td><td>' + g_His.arr[i].tabname + '</td></tr></table></td><td  class="clsmid">';
        s1 += g_His.arr[i].v_var.length + '个</td><td class="clsmid">';
        if (i == 0) {
            s1 += fMakeIconButton('ui-icon-arrowthick-1-n', '', '', 'style="min-width:2em;opacity:0.5" disabled')
        } else {
            s1 += fMakeIconButton('ui-icon-arrowthick-1-n', 'fHisPageMove(' + i + ',1)', '', ' style="min-width:2em"')
        }
        if (i == g_His.arr.length - 1) {
            s1 += fMakeIconButton('ui-icon-arrowthick-1-s', '', '', 'style="min-width:2em;opacity:0.5" disabled')
        } else {
            s1 += fMakeIconButton('ui-icon-arrowthick-1-s', 'fHisPageMove(' + i + ',0)', '', 'style="min-width:2em"')
        }
        s1 += '</td><td class="rt">';
        s1 += fMakeIconButton('ui-icon-tag', 'fHisPageEdit(' + i + ')', '编辑') + "&nbsp;";
        s1 += fMakeIconButton('ui-icon-closethick', 'fHisPageDel(' + i + ')', '删除');
        shtm += s1 + '</td></tr>';
    }
    if (g_His.arr.length < 20) {
        s1 = '<tr><td colspan="5" class="rt">'
        s1 += fMakeIconButton('ui-icon-grm-grid', 'fHisPageAdd(1)', '新建历史数据表')+"&nbsp;";
        s1 += fMakeIconButton('ui-icon-grm-trand', 'fHisPageAdd(0)', '新建历史曲线图');
        shtm += s1;
    }
    shtm += '</tbody></table>';
    if (g_His.isChanged) {
        shtm += '<div style="text-align:right"><table class="clsnogridN" style="display:inline-block"><tr><td><span class="clshischanged">历史页面配置已改变，点此处保存: </span></td><td>' + fMakeIconButton('ui-icon-disk', 'fHisSave()', '保存历史配置') + '</td></tr></table></div>';
    }
    shtm += '<br />说明:<br />每个历史页面可以是历史曲线图或者历史数据表。<br />每个设备最多可建立20个历史页面。<br />每个历史页面可含有最多10个变量。';
    shtm += '<br/><span style="color:#800">当前历史数据容量:' + GRM.hvlim + ' MB, 历史报警容量:' + (GRM.halim*1000) + ' 条</span><br/>';

    GEBI("idhisedittable").innerHTML = shtm;
}
function fHisPageEdit(idx) {
    g_His.edit = g_His.arr[idx];
    g_His.isAdd = false;
    fHisEditor2UI();
    g_HisEditor.dialog('open');
}
function fHisPageAdd(tabcol) {
    g_His.isAdd = true;
    if (tabcol == 0) {
        g_His.edit = {
            tab_cols: 0,//非0就是表格模式，此时代表表格的列数，可取1-6
            tabname: '曲线图1',
            caption: '',
            caption_color: '#800000',
            bg_color: '#C8C8C8',//背景色，表格模式也是表格的背景色
            bg2_color: '#F0F0F0',//背景色，表格模式也是表格的背景色
            grid_color: '#707070',//网格色，表格模式也是表格的网格色
            smooth: true,
            y_caption: "数值",
            y2_enable: 1,
            y2_caption: "数值2",
            v_var: []
        };
        g_His.edit.tabname = "曲线图" + (g_His.arr.length + 1);
        g_His.edit.caption = g_His.edit.tabname;
    }
    else {
        g_His.edit = {
            tab_cols: tabcol,//非0就是表格模式，此时代表表格的列数，可取1-6
            tabname: '数据表1',
            bg_color: '#C0C0C0',//背景色，表格模式也是表格的背景色
            grid_color: '#303030',//网格色，表格模式也是表格的网格色
            tab_tmcolor: '#AA4',//时间列的显示颜色
            v_var: []
        };
        g_His.edit.tabname = "数据表" + (g_His.arr.length + 1);
    }
    fHisEditor2UI();
    g_HisEditor.dialog('open');
}
function fHisPageDel(idx) {
    g_His.arr.splice(idx, 1);
    g_His.isChanged = true;
    fHisPageInit();
}
function fHisPageMove(idx,isup) {
    var delret = g_His.arr.splice(idx, 1);
    if (isup) idx -= 1; else idx += 1;
    g_His.arr.splice(idx, 0, delret[0]);
    g_His.isChanged = true;
    fHisPageInit();
}
function fIsNameInHisVar(sname){
    for(var i=0;i<g_HisVarList.length;i++){
        if(g_HisVarList[i]==sname)return true;
    }
    return false;
}
function fHisDefCheckVar(hisdef) {
    var i, j, ret="";
    for (j = 0; j < hisdef.v_var.length; j++) {
        if (!fIsNameInHisVar(hisdef.v_var[j].name)) {
            ret = hisdef.v_var[j].name;
            hisdef.v_var.splice(j, 1);
            j--;
        }
    }
    return ret;
}
function fHisSave() {
    var xmlhttp = CreateHttp(),i,j,k;
    for (i = 0; i < g_His.arr.length; i++) {
        fHisDefCheckVar(g_His.arr[i]);
    }
    var stext = JSON.stringify(g_His.obj);
    try {
        xmlhttp.open("POST", "/exdata?SID=" + GRM.sid + "&OP=JHDW&random=" + Math.random, false);
        xmlhttp.send(stext);
        if (xmlhttp.status != 200)
            throw 1;
        var i, cnt, ret = xmlhttp.responseText.split("\r\n");
        if (ret[0] != "OK") {
            msgbox("保存历史页面配置错误！");
            return;
        }
        g_His.isChanged = false;
        fHisPageInit();
    } catch (e) {
        msgbox("网络故障！");
        GoHome();
        return;
    }
    msgbox("保存历史页面配置成功");
}
function fNameIdxInHis(sname,vhis){
    for(var i=0;i<vhis.v_var.length;i++){
        if(vhis.v_var[i].name==sname)return i;
    }
    return -1;
}
function fHisEditorVar2UI() {
    var i, ss, sl, vi,sy;
    ss = '<table class="clsgrid" width="100%">';
    for (i = 0; i < g_His.edit.v_var.length; i++) {
        vi = g_His.edit.v_var[i];
        sy = '';
        if (g_His.edit.tab_cols == 0) {
            if(g_His.edit.y2_caption)
            {
                if (vi.use_y2) sy = '(副y轴)'; else sy = '(主y轴)';
            }
        }
        sl = '<tr><td style="width:10%">' + (i + 1) + '</td><td style="color:' + vi.color + '">' + vi.name + '(显示名: ' + vi.display + ') '+sy+'</td><td>'+fMakeIconButton('ui-icon-tag','fhvEdit(' + i + ')','编辑')+'</td>';
        ss += sl;
    }
    GEBI("idheUsedVar").innerHTML = ss + '</table>';
}
var g_DefVarColors = ['#FF0000', '#F07800', '#008000', '#0000FF', '#FF00FF', '#A52A2A',  '#6C6C00', '#C0B800', '#800080','#00CCCC'];

function fHisEditor2UI() {
    var i, ss, sl, vi;
    var sret = fHisDefCheckVar(g_His.edit);
    if (sret) {
        msgbox(sret + ": 变量名找不到，该变量已被自动删除");
    }
    fHisEditorVar2UI();
    ss = '<fieldset style=""><legend>当前可用变量</legend>';
    ss += '<ul style="background-color:transparent;font-size:100%; max-height:300px;overflow:scroll">';
    for (i = 0; i < g_HisVarList.length; i++) {
        sl = '<li style="padding-bottom:5px;"><label>';
        sl += '<input type="checkbox" onclick="fhvAddDel(' + i + ')" id="idhvCheck'+i+'" ';
        if (fNameIdxInHis(g_HisVarList[i], g_His.edit)!= -1) {
            sl += ' checked="checked" ';            
        }
        sl += '>&nbsp;' + g_HisVarList[i] + '</label></li>';
        ss += sl;
    }
    ss += '</ul></fieldset>';
    GEBI("idheVarList").innerHTML = ss;
    ss = '<fieldset><legend>';
    if (g_His.edit.tab_cols == 0) ss += '历史曲线图属性';
    else ss+='历史数据表属性'
    ss += '</legend><table width="100%">';
    ss += '<tr><td width="50%">页面名称:</td><td><input type="text" id="idhetabname" class="clshedit" maxlength=32 value="' + g_His.edit.tabname + '"/></tr>';
    if (g_His.edit.tab_cols == 0) {
        //曲线图
        if (!g_His.edit.caption_color)
            g_His.edit.caption_color = "#333";
        if (!g_His.edit.bg2_color)
            g_His.edit.bg2_color = g_His.edit.bg_color;
        ss += '<tr><td>曲线图标题:</td><td><input type="text" class="clshedit" maxlength=64 id="idhecaption"  value="' + g_His.edit.caption + '"/></tr>';
        ss += '<tr><td>标题色:</td><td><span style="width:5em" id="idhecaption_color" hx="' + g_His.edit.caption_color + '"></span></td></tr>';
        ss += '<tr><td>背景渐进色1:</td><td><span style="width:5em" id="idhebg_color" hx="' + g_His.edit.bg_color + '"></span></td></tr>';
        ss += '<tr><td>背景渐进色2:</td><td><span style="width:5em" id="idhebg2_color" hx="' + g_His.edit.bg2_color + '"></span></td></tr>';
        ss += '<tr><td>网格色:</td><td><span style="width:5em" id="idhegrid_color" hx="' + g_His.edit.grid_color + '" ></span></td></tr>';
        ss += '<tr><td>显示模式:</td><td><label><input type="radio" id="idhesmooth1" name="nmrdsmooth" />曲线</label>&nbsp;<label><input type="radio" name="nmrdsmooth" checked id="idhesmooth0" />折线</label> </td></tr>';
        ss += '<tr><td>主Y轴标题:</td><td><input type="text" class="clshedit" maxlength=64 id="idhey_caption" value="' + g_His.edit.y_caption + '"/></td></tr>';
        ss += '<tr><td>副Y轴标题:<br>(空白可禁用右侧副y轴)</td><td><input type="text"  class="clshedit" maxlength=64  id="idhey2_caption" value="' + g_His.edit.y2_caption + '"/></td></tr>';
    } else {
        //ss += '<tr><td>背景色:</td><td><span style="width:5em" id="idhebg_color" hx="' + g_His.edit.bg_color + '"></span></td></tr>';
        //ss += '<tr><td>网格色:</td><td><span style="width:5em" id="idhegrid_color" hx="' + g_His.edit.grid_color + '" ></span></td></tr>';
        ss+='<tr><td>时间列颜色:</td><td><span style="width:5em" id="idhetab_tmcolor" hx="' + g_His.edit.tab_tmcolor + '" ></span></td></tr>';
        ss += '<tr><td>表格列数(1-6):</td><td><input type="text"  class="clshedit" maxlength=1  id="idhetab_cols" value="' + g_His.edit.tab_cols + '"/></td></tr>';
    }
    GEBI("idheMain").innerHTML = ss + '</table>';
    if (g_His.edit.tab_cols == 0) {
        if(g_His.edit.smooth)
            GEBI("idhesmooth1").checked = true;
        $("#idhecaption_color").css("cursor", "pointer").iColor();
        $("#idhebg2_color").css("cursor", "pointer").iColor();
    } else {
        $("#idhetab_tmcolor").css("cursor", "pointer").iColor();
    }
    $("#idhebg_color").css("cursor", "pointer").iColor();
    $("#idhegrid_color").css("cursor", "pointer").iColor();
}
function fxGetColor(sid) {
    var ic = GEBI(sid).getAttribute("hx").trim();
    if (ic && ic.length > 0) {
        if(ic.charAt(0)!='#')
        ic = '#' + ic;
    }
    return ic;
}
function fHisEditorOkCheck() {
    if (g_His.edit.v_var.length == 0) {
        msgbox("不可以没有变量！");
        return false;
    }
    var tmp = g_His.edit;
    var sret = fHisDefCheckVar(tmp);
    if (sret) {
        msgbox(sret+": 变量名找不到，该变量已被自动删除");
    }
    tmp.tabname = GEBI('idhetabname').value;
    if (g_His.edit.tab_cols == 0) {
        //曲线图
        tmp.caption = GEBI('idhecaption').value.trim();
        tmp.caption_color = fxGetColor('idhecaption_color');
        tmp.bg_color = fxGetColor('idhebg_color');
        tmp.bg2_color = fxGetColor('idhebg2_color');
        tmp.grid_color = fxGetColor('idhegrid_color');
        tmp.smooth = GEBI("idhesmooth1").checked ? 1 : 0;
        tmp.y_caption = GEBI('idhey_caption').value.trim();
        tmp.y2_caption = GEBI('idhey2_caption').value.trim();
    } else {
        //表格
        //tmp.bg_color = fxGetColor('idhebg_color');
        //tmp.grid_color = fxGetColor('idhegrid_color');
        tmp.tab_tmcolor = fxGetColor('idhetab_tmcolor');
        tmp.tab_cols = parseInt(GEBI('idhetab_cols').value, 10);
        if (isNaN(tmp.tab_cols)) tmp.tab_cols = 1;
    }
    if (g_His.isAdd) {
        g_His.arr.push(g_His.edit);
    }
    g_His.edit = null;
    g_His.isChanged = true;
    return true;
}
function fHisEditorClear() {
    if (g_His.isAdd) {
        delete g_His.edit;
    }
}

function fhvAddDel(vidx) {
    var idxinhis = fNameIdxInHis(g_HisVarList[vidx], g_His.edit);
    if (idxinhis == -1) {
        //没有，添加
        var newidx = g_His.edit.v_var.length;
        if (newidx >= 10) {
            msgbox("最多只能加入10个变量！");
            GEBI("idhvCheck"+vidx).checked = false;
            return;
        }
        var vitem = {
            name: g_HisVarList[vidx], display: g_HisVarList[vidx],
            color: g_DefVarColors[newidx % 10], use_y2: 0, unit: ''
        };
        g_His.edit.v_var.push(vitem);
    }
    else {
        g_His.edit.v_var.splice(idxinhis, 1);
    }
    g_His.isChanged = true;
    fHisEditorVar2UI();
}
function fhv2UI() {
    var i, ss, vi = g_His.edit.v_var[g_His.currhv];
    if (!vi.hasOwnProperty('fnum')) {
        vi.fnum = -1;//-1是自动格式
    }
    ss = '<fieldset><legend>当前变量: ' + vi.name + '</legend>';
    ss += '<table width="100%"><tr><td width="50%">变量显示名:</td><td><input type="text" id="idhvdisplay" class="clshedit" maxlength=32 value="' + vi.display + '"/></tr>';
    ss += '<tr><td>变量颜色:</td><td><span style="width:5em" id="idhvcolor" hx="' + vi.color + '"></span></td></tr>';
    var inum=vi.fnum>-1?vi.fnum+"":"";
    ss+='<tr><td>小数位数(0-6)<br/>空白是自动</td><td><input type="text" id="idhvnum" class="clshedit" maxlength=1 value="' + inum + '"/></tr>';
    if (g_His.edit.tab_cols == 0) {
        //曲线图
        if (g_His.edit.y2_caption)
            ss += '<tr><td>对应y轴:</td><td><label><input type="radio" id="idhvy0" name="nmhvy" checked />主y轴(左侧)</label>&nbsp;<br/><label><input type="radio" name="nmhvy"  id="idhvy1" />副y轴(右侧)</label> </td></tr>';
    }
    ss += '<table width="100%"><tr><td width="40%">变量单位:</td><td><input type="text" id="idhvunit" class="clshedit" maxlength=32 value="' + vi.unit + '"/></tr>';
    ss += '</table></fieldset>';
    GEBI("idHisVarItemEditor").innerHTML = ss;
    if (g_His.edit.tab_cols == 0&&vi.use_y2 && g_His.edit.y2_caption) {
        GEBI('idhvy1').checked = true;
    }
    $("#idhvcolor").css("cursor", "pointer").iColor();
}
function ValToStrN(v, fnum) {
    if (typeof (fnum) == 'undefined')
        return v + '';
    if (fnum <= -1) return v + '';
    return (v + 0).toFixed(fnum);
}
function fhvOkCheck() {
    var i, ss, vi = g_His.edit.v_var[g_His.currhv];
    vi.display = GEBI('idhvdisplay').value;
    vi.color = fxGetColor('idhvcolor');
    if (g_His.edit.tab_cols == 0) {
        if (g_His.edit.y2_caption) {
            if (GEBI('idhvy1').checked)
                vi.use_y2 = 1;
            else vi.use_y2 = 0;
        }
        else
            vi.use_y2 = 0;
    }
    vi.unit = GEBI('idhvunit').value;
    var inum = GI('idhvnum').value;
    inum = parseInt(inum, 10);
    if (inum >= 0 && inum <= 6) {

    }
    else {
        inum = -1;
    }
    vi.fnum = inum;
    return true;
}
function fhvEdit(idx) {
    g_His.currhv = idx;
    fhv2UI();
    g_HisVarItemEditor.dialog('open');
}
function fhvClear() {
    //
}


GRM.x_devd = GRM.grmt.length > 0;//device support download
GRM.x_phone = (GRM.exop & 0x0800) > 0;
GRM.x_editlan = (GRM.exop & 0x1000) > 0;
function fBodyLoad() {
    GEBI("idRDCaption").innerText = "变量刷新间隔(目前为" + GRM.rdhms + ")";
}
function fWriteDownTab(){
    if(!GRM.x_den)return;
    var stab='<table width="100%" border="1" class="clsgrid">';
    
    if (!GRM.x_devd) {
        stab += '<tr> <td colspan="2" style="text-align: center;"><b>设备不支持远程下载功能，需要升级最新固件后上线一次才能使用!</b></td></tr>';
    } else if (GRM.x_dip) {
        stab += '<tr> <td colspan="2" style="text-align: center;"><b>首次使用远程下载，请先修改密码!</b></td></tr>';
    } else {
        //正常下载
        if (GRM.x_d) {
            stab += '<tr><td colspan="2" style="text-align: center;">';
        }
        if (!GRM.x_d) {
            stab += '<tr><td class="rt">输入远程下载密码</td><td><input class="seditsize" type="password" id="DOWNPASS" value="" maxlength="15" style="width:16em">';
        }
        stab += '<button class="sbtnsize" onclick="fDownClick()">进入远程下载管理...</button>';
        //if (GRM.x_d) {
            stab+='<label><input type="checkbox" id="idEditDownPassChk" onclick="fEditDownPassChk();">修改下载密码</label>';
       // }
        stab+='</td></tr>'
    }
    stab+='</table>';
    if (GRM.x_devd) {
        stab += '<div id="idEditPassTab"';
        if (GRM.x_dip)
            stab += '>';
        else
            stab += ' style="display:none">';

        stab += '<div style="text-align:center;font-weight:bold;padding-top:0.5em;padding-bottom:0.2em">修改下载密码:</div><table border="1" width="100%" class="clsgrid" > ';
        if (!GRM.x_dip) {
            stab+='<tr><td class="rt">当前的密码(旧密码)</td><td><input class="seditsize" type="password" id="DOWNPASS0" value="" maxlength="15" style="width:16em"></td></tr>';
        }
        stab += '<tr><td colspan="2" style="text-align:center">新密码长度8-15位，为了安全，必须同时包含数字和字母</td></tr>' +
'<tr><td class="rt">新密码</td><td><input class="seditsize" type="password" id="DOWNPASSEDT1" value="" maxlength="15" style="width:16em"></td></tr>' +
'<tr><td class="rt">确认新密码</td><td><input class="seditsize" type="password" id="DOWNPASSEDT2" value="" maxlength="15" style="width:16em"><button class="sbtnsize" onclick="fDownEdit()">提交修改！</button></td></tr></table></div>';
    }
    DR(stab);
}
var g_SubTab = { Vars: [], Tabs: [], IsInit:false};
function fOnSubTabActive(){
    if (g_SubTab.IsInit) return;
    var xmlhttp = CreateHttp();
    var stext = "NG";
    try {
        xmlhttp.open("POST", "/exdata?SID=" + GRM.sid + "&OP=E&random=" + Math.random, false);
        xmlhttp.send(stext);
        if (xmlhttp.status != 200)
            throw 1;
        var i, cnt,tmpi,tmpst,tmpnm, ret = xmlhttp.responseText.split("\r\n");
        if (ret[0] != "OK") {
            msgbox(ret[2]);
            return;
        }
        cnt = +ret[1];
        g_SubTab.IsInit = true;
        //列出实际存在的主页面
        for (i = 0; i < TabItems.length; i++) {
            tmpi = TabItems[i];
            if (tmpi.pg >= 900) continue;
            tmpnm = "TAB_" + tmpi.n;
            
            if (!g_SubTab.hasOwnProperty(tmpnm)) {
                g_SubTab[tmpnm] = [];
                g_SubTab.Tabs.push(tmpi.n);
            }
        }
        //从变量信息中获取子变量组
        for (i = 0; i < cnt; i++) {
            tmpi = ret[2 + i].split(",");
            tmpi = tmpi[1];//得到Group
            tmpi = tmpi.split(".");
            if (tmpi.length < 2) continue;
            tmpst=g_SubTab["TAB_"+tmpi[0]];
            if (!tmpst.hasOwnProperty("ST_" + tmpi[1])) {
                tmpst.push(tmpi[1]);
                tmpst["ST_" + tmpi[1]] = 1;
            }
            else {
                tmpst["ST_" + tmpi[1]] = tmpst["ST_" + tmpi[1]] + 1;
            }                
        }
        //从SubTabDef里面查找
        for (i = 0; i < g_SubTabDef.length; i++) {
            tmpi = g_SubTabDef[i];
            tmpnm = "TAB_" + tmpi.tab;
            if (g_SubTab.hasOwnProperty(tmpnm)) {
                g_SubTab[tmpnm].Def = tmpi;
            }
        }
        fMakeSubTabHTML();
    } catch (e) {
        msgbox("网络故障！");
        GoHome();
        return;
    }
}
function fSetSubTabSaveEnable(ena) {
    GI("idSubTabSaveTD").style.display = ena ? "block" : "none";
}
function fMakeSubTabHTML() {
    if (g_isoldie) {
        GI("idSubTabBox").innerHTML = '在IE8或更早版本的IE上无法配置子表格！<br/>请升级到IE9以上，或者使用非IE核心的浏览器！<br/>例如：chrome，Firefox，以及国产的傲游maxthon，QQ浏览器，猎豹浏览器，搜狗浏览器等等，<br/>包括iPhone和安卓手机的浏览器';
        return;
    }
    var i, j, k,ss,shtm = '<table  style="width:100%" class="clsgrid"><thead> <tr><th style="width:10%">序号</th><th style="width:35%">页面名称</th><th style="width:20%">子表格</th><th style="width:35%">操作</th></tr></thead> <tbody>';
    for (i = 0;i<g_SubTab.Tabs.length;i++){
        ss='<tr><th>'+(i+1)+'</th><td>'+g_SubTab.Tabs[i]+'</td><td class="ct">'+g_SubTab["TAB_"+g_SubTab.Tabs[i]].length+' 个'+'</td><td>'
        if (g_SubTab["TAB_" + g_SubTab.Tabs[i]].length > 0) {
            ss += fMakeIconButton('ui-icon-tag', 'fSubTabEdit(' + i + ')', '编辑');
        }else{
            ss += '(没有子表格)';
        }    
        ss+='</td></tr>';
        shtm+=ss;
    }
    shtm += '</tbody></table>';
    shtm += '<div id="idSubTabSaveTD" style="width:100%;text-align:right" ><table  class="clsnogridN" style="display: inline-block;"><tbody><tr><td><span class="clshischanged">';
    shtm += '子表格配置已改变，点此处保存:</span></td><td>' + fMakeIconButton('ui-icon-disk', 'fSubTabSave()', '保存子表格配置');
    shtm += '</td></tr></tbody></table></div>'
    GI("idSubTabBox").innerHTML = shtm;
    fSetSubTabSaveEnable(false);
}
function fSubTabEdit(i) {
    var ss, tmpnm;
    tmpnm = g_SubTab.Tabs[i];
    g_SubTab.CurrIdx = i;
    g_SubTab.Curr = g_SubTab["TAB_" + tmpnm];
    if (!g_SubTab.Curr.Def) {
        g_SubTab.Curr.Def = { tab: tmpnm, colcount: 1,rows:[] };
    }
    fFillSTabEditor(g_SubTab.Curr, g_SubTab.Curr.Def.colcount)
    g_STabEditor.dialog('open');
}
function fFillSTabEditor(atab,col) {
    var ss,sl, i, j, k,xdd,dd;
    dd=atab.Def;
    xdd = {
        "tab": "冷库状态",
        "colcount": 2,
        "rowcount": 2,
        "rows": [
         [
          {
              "subtab": "压机1",
              "subcol": 1
          }, {
              "subtab": "压机2",
              "subcol": 1
          }], [
          {
              "subtab": "故障输入",
              "subcol": 1
          }, {
              "subtab": "测试用",
              "subcol": 1
          }]]
    };
    var cucol = col, curow =Math.ceil( atab.length / cucol);
    ss = '<b>当前页面: ' + dd.tab + '</b>';
    ss += '<fieldset><legend>页面内的子表格列数</legend>';
    for (i = 0; i < 4; i++) {
        sl = '<label><input type="radio" onclick="fSTabChangeCol(' + (i+1) + ')" name="nmSTabChangeCol" ';
        if (col==i+1){
            sl += ' checked="checked" autofocus ';
        }
        sl += '> ' + (i + 1) + '列&nbsp; </label> &nbsp; &nbsp; ';
        ss += sl;
    }
    ss += '</fieldset>';
    if (curow == dd.rowcount && cucol == dd.colcount) {
        //一致，可以比较每一项
        for (i = 0; i < curow; i++) {
            for (j = 0; j < cucol; j++) {
                if (!atab.hasOwnProperty("ST_" + dd.rows[i][j].subtab)) {
                    //这一个没有
                    dd.rows[i][j].subtab = "";
                    dd.rows[i][j].subcol = 1;
                }
            }
        }
    }
    else {
        //不一致，删空所有准备重建
        dd.rows = [];
        for (i = 0; i < curow; i++) {
            dd.rows.push([]);
            for (j = 0; j < cucol; j++) {
                dd.rows[i][j] = {};
                dd.rows[i][j].subtab = "";
                dd.rows[i][j].subcol = 1;
            }
        }
    }
    var sper = 100 / cucol;
    ss += '<table width="100%" class="clsgrid">';
    for (i = 0; i < curow; i++) {
        ss += '<tr>';
        for (j = 0; j < cucol; j++) {
            ss += '<td width="' + sper + '">选择子表格:<br>';
            ss += fMakeSubTabOption("idstop" + i + j, dd.rows[i][j].subtab,atab);
            ss += '<br>'+fMakeSybTabSubCol('idstsc'+i+j,dd.rows[i][j].subcol)+ '</td>';
        }
        ss += '</tr>';
    }
    dd.rowcount = curow;
    dd.colcount = cucol;
    GEBI("idSTabItemEditor").innerHTML = ss;
}
function fMakeSubTabOption(xid, sel,atab) {
    var ss='<select id="'+xid+'" style="min-width:10em"><option value="">(无)</option>';
    for(var i=0;i<atab.length;i++){
        ss+='<option value="'+atab[i]+'" ';
        if(atab[i]==sel){
            ss+=' selected';
        }
        ss+='>'+atab[i]+'</option>\n';
    }
    ss += '</select>';
    return ss;
}
function fMakeSybTabSubCol(xid, scol) {
    var ss='<fieldset><legend>子表格内部列数</legend>',i,sl;
    for (i = 0; i < 4; i++) {
        sl = '<label style="display:inline-block;margin:3px"><input type="radio" name="nm'+xid+'" id="'+xid+i+'"';
        if (scol==i+1){
            sl += ' checked="checked" ';
        }
        sl += '>' + (i + 1) + '列&nbsp;</label>';
        ss += sl;
    }
    ss += '</fieldset>';
    return ss;
}
function fSTabChangeCol(icol) {
    fFillSTabEditor(g_SubTab.Curr, icol);
}
function fSTabEditorOkCheck() {
    var i,j,k,dd= g_SubTab.Curr.Def,sv;
    var namechk={},selcnt=0;
    for (i = 0; i < dd.rowcount; i++) {
        for (j = 0; j < dd.colcount; j++) {
            sv = GI('idstop' + i + j).value;
            if (sv) {
                if (namechk['V_' + sv]) {
                    msgbox( '每个子表格只能被选择一次, "'+sv +'": 不可重复选择！');
                    return false;
                }
                namechk['V_' + sv] = 1;
                selcnt++;
            }
            dd.rows[i][j].subtab = sv;
            sv = 'idstsc' + i + j;
            for (k = 0; k < 4; k++) {
                if (GI(sv + k).checked) {
                    dd.rows[i][j].subcol = k+1;
                }
            }
        }
    }
    if (selcnt == 0) {
        msgbox('不可以没有任何子表格！');
        return false;
    }
    fSetSubTabSaveEnable(true);
    return true;
}
function fSubTabSave() {
    var xmlhttp = CreateHttp(),pv;
    g_SubTabDef = [];
    for (i = 0; i < g_SubTab.Tabs.length; i++) {
        pv = g_SubTab["TAB_" + g_SubTab.Tabs[i]].Def;
        if(pv)g_SubTabDef.push(pv);
    }
    var stext = JSON.stringify(g_SubTabDef);
    try {
        xmlhttp.open("POST", "/exdata?SID=" + GRM.sid + "&OP=JSTW&random=" + Math.random, false);
        xmlhttp.send(stext);
        if (xmlhttp.status != 200)
            throw 1;
        var i, cnt, ret = xmlhttp.responseText.split("\r\n");
        if (ret[0] != "OK") {
            msgbox("保存子表格配置错误！");
            return;
        }
    } catch (e) {
        msgbox("网络故障！");
        GoHome();
        return;
    }
    msgbox("保存子表格配置成功");
    fSetSubTabSaveEnable(false);
}
function fSTabEditorClear() {

}
function fHisDelBtn() {
    var stm = GI('idhdDate').value, hasalm = GI('idhdAlm').checked, hasvar = GI('idhdVar').checked;
    if (!(hasalm || hasvar)) {
        msgbox("历史报警和历史数据至少要选择一个");
        return;
    }
    if (!confirm('是否要删除历史记录？删除后不可还原！'))
        return;
    stm = stm.split('-');
    var stime=stm[0]+stm[1]+stm[2]+'235959';
    var xmlhttp = CreateHttp();
    var src;
    var sret = "删除完成";
    if (GRM.TESTSERVER) {
        msgbox('历史记录那么宝贵，你删了别人就看不到了 ^_^\n---测试服务器不允许删历史---');
        return;
    }
    if (hasalm) {
        src = '/exdata?SID=' + GRM.sid + '&OP=AD';
        try {
            xmlhttp.open("POST", src, false);
            xmlhttp.send(stime);
        } catch (e) {
            msgbox("网络故障");
            GoHome();
            return;
        }
        var ret = xmlhttp.responseText.split("\r\n");
        if (ret[0] == 'OK') {
            sret += ', 删除历史报警' + ret[1] + '条，剩余' + ret[2] + '条';
        }
        else
            sret += ',删除历史报警出错：' + ret[2];
    }
    if (hasvar) {
        src = '/exdata?SID=' + GRM.sid + '&OP=HD';
        try {
            xmlhttp.open("POST", src, false);
            xmlhttp.send(stime);
        } catch (e) {
            msgbox("网络故障");
            GoHome();
            return;
        }
        var ret = xmlhttp.responseText.split("\r\n");
        if (ret[0] == 'OK') {
            sret += ', 删除历史数据' + ret[1] + '条，剩余' + ret[2] + '条';
        }
        else
            sret += ',删除历史数据出错：' + ret[2];
    }
    msgbox(sret);
    GI('idhdAlm').checked = false;
    GI('idhdVar').checked = false;
}
