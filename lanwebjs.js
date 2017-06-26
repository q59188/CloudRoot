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

//Custom Function
var g_UIStrCN = {
    cap: "网络端口参数配置",
    autoip: "自动获取IP地址",
    ip: "IP地址",
    mask: "子网掩码",
    gate: "网关",
    dns: "DNS服务器",
    err: ": 不是正确的IP地址格式",
    post: "提交修改",
    resetmod: "重启模块",
    clickreset: "点此按钮重启模块",
    curredit: "当前编辑",
    config: "配置",
    wifiname: "WIFI路由器名称",
    wifipass: "WIFI密码",
    neterror: "网络故障，修改失败!",
    postok: "提交成功!",
    wifisignal: "WIFI信号强度(0-100):",
    netstatus: "连接状态:",
    netconn: "已连接",
    netnotconn: "未连接",
    connmode: ["未连接", "", "2G", "3G", "4G", "网口", "WIFI"],
    conntext: "云服务器连接状态:",
    xchgnetT: "网络端口用途分配",
    xchgnet0: "NET1连接云服务器，NET2连接PLC",
    xchgnet1: "NET1连接PLC，NET2连接云服务器"
};
var g_UIStrEN = {
    cap: "Net Port Config",
    autoip: "Auto IP",
    ip: "IP Address",
    mask: "Subnet mask",
    gate: "Gateway",
    dns: "DNS",
    err: ": Invalid IP Address format!",
    post: "Commit",
    resetmod: "Reset Module",
    clickreset: "Click here to Reset Module",
    curredit: "Edit:",
    config: "Config ",
    wifiname: "WIFI Name",
    wifipass: "WIFI Password",
    neterror: "Network Failure!",
    postok: "Post OK!",
    wifisignal: "WIFI Signal(0-100):",
    netstatus: "Network Status:",
    netconn: "Connected",
    connmode: ["Not Connected", "", "2G", "3G", "4G", "NET", "WIFI"],
    conntext: "CluodServer Connect State:",
    netnotconn: "Not Conneted",
    xchgnetT: "Net Port Usage",
    xchgnet0: "NET1 Connect to CloudServer, NET2 Connect to PLC",
    xchgnet1: "NET1 Connect to PLC, NET2 Connect to CloudServer"
};
var g_UIStr = g_UIStrEN;
var ss = [];
var g_Inf = {}, WifiCurr = 0, g_INIT = 1;
//所有这些Parse函数都返回对读写索引的增加值
function ParseWifi(arr, ib, obj) {
    obj.SSID = arr[ib];
    obj.PASS = arr[ib + 1];
    return ParseIP(arr, ib + 2, obj) + 2;
}
function ParseEthNet(arr, ib, obj) {
    var ret = ParseIP(arr, ib, obj);
    obj.MAC = arr[ib + ret];
    return ret + 1;
}
function EthNetToPost(arr, obj) {
    IPToPost(arr, obj);
    arr.push("");//MAC
}
function WifiToPost(arr, obj) {
    arr.push(obj.SSID);
    arr.push(obj.PASS);
    IPToPost(arr, obj);
}

function ParseIP(arr, ib, obj) {
    var idx = 0, xauto = arr[ib + (idx++)] - 0;
    if (!g_INIT && !(xauto == 1 && obj.AutoIP == 1)) {
        //不是初始化状态，刷新到的和现有的这两个选项也不全是auto，那么忽略刷新到的值
        return 5;
    }
    obj.AutoIP = xauto;
    obj.IP = arr[ib + (idx++)];
    obj.Mask = arr[ib + (idx++)];
    obj.Gateway = arr[ib + (idx++)];
    obj.DNS = arr[ib + (idx++)];
    return idx;
}
function IPToPost(arr, obj) {
    arr.push(obj.AutoIP);
    if (obj.AutoIP) {
        for (var i = 0; i < 4; i++) {
            arr.push('');
        }
        return;
    }
    arr.push(obj.IP);
    arr.push(obj.Mask);
    arr.push(obj.Gateway);
    arr.push(obj.DNS);
}
//这是解析的入口
function ParseDynInfo(s) {
    var arr = s.split("\n");
    if (arr.length < 62) {
        return;
    }
    var idx = 0, iw;
    g_Inf.GrmID = arr[idx++];
    g_Inf.Type = arr[idx++];
    g_Inf.Ver = arr[idx++] * 10;
    g_Inf.SysMode = arr[idx++] - 0;//0是boot，1是应用程序
    if (g_INIT) {
        g_Inf.NET1 = {};
        g_Inf.NET2 = {};
        g_Inf.WIFI = [];
        for (iw = 0; iw < 5; iw++) {
            g_Inf.WIFI.push({});
        }
    }
    idx += ParseEthNet(arr, idx, g_Inf.NET1);
    idx += ParseEthNet(arr, idx, g_Inf.NET2);
    for (var iw = 0; iw < 5; iw++) {
        idx += ParseWifi(arr, idx, g_Inf.WIFI[iw]);
    }
    g_Inf.WifiMAC = arr[idx++];
    g_Inf.SwitchNet = arr[idx++] - 0;
    g_Inf.IsConn1 = arr[idx++] - 0;
    g_Inf.IsConn2 = arr[idx++] - 0;
    g_Inf.IsConn3 = arr[idx++] - 0;
    g_Inf.WifiSel = arr[idx++] - 0;
    g_Inf.WifiSignal = arr[idx++] - 0;
    g_Inf.MobSignal = arr[idx++] - 0;//移动网络信号量
    g_Inf.NetState = arr[idx++] - 0;
    g_Inf.Key = arr[idx++] - 0;
    //下面处理当前时间
    var tt = arr[idx++], aa;
    aa = tt.substr(0, 4) + '-' + tt.substr(4, 2) + '-' + tt.substr(6, 2);
    aa = aa + ',' + tt.substr(8, 2) + ':' + tt.substr(10, 2) + ':' + tt.substr(12, 2);
    g_Inf.TM = aa;
    var spre = g_Inf.Type.substr(0, 5);
    if (spre == "GRM50") {
        Parse50X();
    }
    else if (spre == "GRM53") {
        Parse53X();
    }
}

function DynInfoToPost() {
    var arr = [], i;
    for (i = 0; i < 4; i++) {
        arr.push("");
    }
    EthNetToPost(arr, g_Inf.NET1);
    EthNetToPost(arr, g_Inf.NET2);
    for (i = 0; i < 5; i++) {
        WifiToPost(arr, g_Inf.WIFI[i]);
    }
    arr.push("");//WifiMAC
    arr.push(g_Inf.SwitchNet);
    for (i = 0; i < 9; i++) {
        arr.push("");
    }
    if (arr.length != 62) {
        alert("DynInfoToPost:ERROR,arr.length=" + arr.length);
    }
    return arr.join("\n");
}
function Parse50X() {
    g_Inf.IsGRM50X = 1;
    g_Inf.HasNET2 = g_Inf.Type.indexOf("NE") > 0;
    g_Inf.HasWIFI = g_Inf.Type.indexOf("W") > 0;
}
function Parse53X() {
    g_Inf.IsGRM53X = 1;
    g_Inf.HasNET2 = 1;
    g_Inf.HasNET3 = 1;
    g_Inf.HasWIFI = g_Inf.Type.indexOf("W") > 0;
}
function fGetDynJS(isinit) {
    var xmlhttp = CreateHttp(), sdyn;
    xmlhttp.open("GET", "/dyninfo?rand=" + Math.random(), false);
    try {
        xmlhttp.send("");
        if (xmlhttp.status == 404) {
            xmlhttp.open("GET", "/dyninfo.txt?rand=" + Math.random(), false);
            xmlhttp.send("");
        }
        sdyn = xmlhttp.responseText;
    } catch (e) {
        alert(g_UIStr.neterror);
        location.href = "/";
        return;
    }
    if (sdyn.length < 1) {
        alert(g_UIStr.neterror + "#2");
        location.href = "/";
        return;
    }
    ParseDynInfo(sdyn);
    if (isinit) {
        fInit();
    }
    g_INIT = 0;
    //刷新动态内容
    fRefreshDynJS();
    setTimeout("fGetDynJS()", 3000);;
}
function Byte2Num(v) {
    return ("0x" + v) - 0;
}
function HexToIP(vhex) {
    if (!vhex || vhex.length != 8) return "0.0.0.0";
    return "" + Byte2Num(vhex.substr(0, 2)) +
        "." + Byte2Num(vhex.substr(2, 2)) +
        "." + Byte2Num(vhex.substr(4, 2)) +
        "." + Byte2Num(vhex.substr(6, 2));
}
function HexToMAC(vhex) {
    if (!vhex || vhex.length != 12) return "";
    var sret = "";
    for (var i = 0; i < 5; i++) {
        sret += vhex.substr(i * 2, 2) + "-";
    }
    sret += vhex.substr(10, 2);//最后没有分隔符
    return sret;
}
function IPToHex(sip) {
    var arr = sip.split(".");
    if (arr.length != 4) {
        return "00000000";
    }
    var ret = "", i, tmp, ts;
    for (i = 0; i < 4; i++) {
        tmp = parseInt(arr[i], 10);
        ts = tmp.toString(16);
        if (ts.length < 2) {
            ts = '0' + ts;
        }
        ret += ts;
    }
    return ret;
}
function fRefreshDynJS() {
    GI("ssnet1conn").innerText = g_UIStr.netstatus;
    GI("ssnet2conn").innerText = g_UIStr.netstatus;
    GI("sswificonn").innerText = g_UIStr.netstatus;
    GI("net1conninfo").innerText = g_Inf.IsConn1 ? g_UIStr.netconn : g_UIStr.netnotconn;
    GI("net1conninfo").style.color = g_Inf.IsConn1 ? "#080" : "#900";
    if (g_Inf.IsGRM53X) {
        if (g_Inf.IsGRM53X) {
            GI("NET1NAME").innerHTML = "WAN (MAC: " + HexToMAC(g_Inf.NET1.MAC) + ")";
            GI("NET2NAME").innerHTML = "LAN (MAC: " + HexToMAC(g_Inf.NET2.MAC) + ")";
            GI("net2_lan1_conninfo").innerText = "LAN1:" + (g_Inf.IsConn2 ? g_UIStr.netconn : g_UIStr.netnotconn);
            GI("net2_lan1_conninfo").style.color = g_Inf.IsConn2 ? "#080" : "#900";
            GI("net2_lan2_conninfo").innerText = "LAN2:" + (g_Inf.IsConn3 ? g_UIStr.netconn : g_UIStr.netnotconn);
            GI("net2_lan2_conninfo").style.color = g_Inf.IsConn3 ? "#080" : "#900";
        }
    }
    if (g_Inf.HasNET2) {
        GI("net2conninfo").innerText = g_Inf.IsGRM53X ? "" : (g_Inf.IsConn2 ? g_UIStr.netconn : g_UIStr.netnotconn);
        GI("net2conninfo").style.color = (g_Inf.IsConn2 || g_Inf.IsConn3) ? "#080" : "#900";
    }
    if (g_Inf.NET1.AutoIP) {
        GI("net1conninfo").innerText = GI("net1conninfo").innerText + ",IP=" + HexToIP(g_Inf.NET1.IP);
    }
    if (g_Inf.HasNET2 && g_Inf.NET2.AutoIP && (g_Inf.IsConn2 || g_Inf.IsConn3)) {
        var xconn = GI("net2conninfo").innerText;
        if (xconn) {
            xconn = xconn + ",";
        }
        GI("net2conninfo").innerText = xconn + "IP=" + HexToIP(g_Inf.NET2.IP);
    }
    var wifimac = HexToMAC(g_Inf.WifiMAC);
    if (wifimac != "") {
        wifimac = " (MAC: " + wifimac + ")";
    }
    GI("NETWIFINAME").innerText = "WIFI" + wifimac;
    var sinfo = "";
    if (g_Inf.WifiSel < 0) {
        sinfo = g_UIStr.netnotconn;
    }
    else {
        var scolor = '#E70';
        if (g_Inf.WifiSignal >= 60) scolor = '#080';
        if (g_Inf.WifiSignal < 50) scolor = '#C00';
        sinfo = g_UIStr.netconn + ", " + g_UIStr.config + (g_Inf.WifiSel + 1) + ", " + g_UIStr.wifisignal
            + '<span style="color:' + scolor + '">' + g_Inf.WifiSignal + '</span>';
        sinfo += ", IP=" + HexToIP(g_Inf.WIFI[g_Inf.WifiSel].IP);
    }
    GI("wificonninfo").innerHTML = sinfo;
    if (g_Inf.WifiSel >= 0) {
        var ws = g_Inf.WIFI[g_Inf.WifiSel];
        if (ws.AutoIP && GI("autoipW").checked && (WifiCurr == g_Inf.WifiSel)) {
            fNETToUI(ws, 'W');
        }
    }
    GI("wificonninfo").style.color = (g_Inf.WifiSel >= 0) ? "#080" : "#900";
    if (g_Inf.NET1.AutoIP && GI("autoip1").checked) {
        fNETToUI(g_Inf.NET1, '1');
    }
    if (g_Inf.NET2.AutoIP && GI("autoip2").checked) {
        fNETToUI(g_Inf.NET2, '2');
    }
    var conntext = g_UIStr.conntext + g_UIStr.connmode[g_Inf.NetState];
    if (g_Inf.MobSignal >= 0) {
        conntext += ",3G/4G信号强度:" + g_Inf.MobSignal;
    }
    GI("idconntext").innerText = conntext + ", 刷新时间 (" + g_Inf.TM + ")";
    var snoconn = "";
    if (g_Inf.NetState == 5) {
        //NET
        if (g_Inf.IsGRM53X) {
            snoconn = "当前是网口WAN上网，该网口的设置不可修改！";
        }
        else{
            snoconn = "当前是网口上网，用于连接服务器的网口设置不可修改！";
        }
    }
    else if (g_Inf.NetState == 6) {
        snoconn = "当前是WIFI上网，WIFI配置" + (g_Inf.WifiSel + 1) + "的设置不可修改！";
    }
    GI("idNotChange").innerText = snoconn;
}

function fDoPost__() {
    //注意：不要改变参数顺序
    var xmlhttp = CreateHttp();
    var i, stext = "";
    if (g_Inf.HasWIFI) {
        if (!fWifiSave())
            return;
    }
    if (!fNetSave()) {
        return;
    }
    xmlhttp.open("POST", "/WebConf.cgi", false);
    try {
        stext = DynInfoToPost();
        xmlhttp.send(stext);
    } catch (e) {
        window.alert(g_UIStr.neterror);
        return;
    }
    ParseDynInfo(xmlhttp.responseText);
    alert("修改成功！");
}

function GI(s) {
    return document.getElementById(s);
}
function DR(s) {
    document.write(s);
}
function fUpdateUI() {
    var i;
//    GI("CAP").innerHTML = g_UIStr.cap;
    for (i = 1; i <= 2; i++) {
        GI("ssaip" + i).innerHTML = g_UIStr.autoip;
        GI("ssip" + i).innerHTML = g_UIStr.ip;
        GI("ssmask" + i).innerHTML = g_UIStr.mask;
        GI("ssgate" + i).innerHTML = g_UIStr.gate;
        GI("ssdns" + i).innerHTML = g_UIStr.dns;
    }
//    GI("idEditPost").value = g_UIStr.post;
//    GI("idReset").value = g_UIStr.resetmod;
//    GI("idResetCap").innerHTML = g_UIStr.resetmod;
//    GI("idCilckReset").innerHTML = g_UIStr.clickreset;
    GI("idNetXchgT").innerHTML = g_UIStr.xchgnetT;
    GI("idXchg0T").innerHTML = g_UIStr.xchgnet0;
    GI("idXchg1T").innerHTML = g_UIStr.xchgnet1;

    for (i = 0; i < 5; i++) {
        GI("sswcfg" + i).innerHTML = g_UIStr.config + (i + 1);//+(sswifi[i*7]?":"+sswifi[i*7]:"");
    }
    GI("sscurreditW").innerHTML = g_UIStr.curredit;
    GI("ssnameW").innerHTML = g_UIStr.wifiname;
    GI("sspassW").innerHTML = g_UIStr.wifipass;
    GI("idcurridx").innerHTML = g_UIStr.config + (WifiCurr + 1);

    GI("ssaipW").innerHTML = g_UIStr.autoip;
    GI("ssipW").innerHTML = g_UIStr.ip;
    GI("ssmaskW").innerHTML = g_UIStr.mask;
    GI("ssgateW").innerHTML = g_UIStr.gate;
    GI("ssdnsW").innerHTML = g_UIStr.dns;
    fRefreshDynJS();
}
function fNETToUI(obj, uiidx) {
    GI("autoip" + uiidx).checked = obj.AutoIP;
    GI("ip" + uiidx).value = HexToIP(obj.IP);
    GI("mask" + uiidx).value = HexToIP(obj.Mask);
    GI("gate" + uiidx).value = HexToIP(obj.Gateway);
    GI("dns" + uiidx).value = HexToIP(obj.DNS);
}
function fInit() {
    GI("NET1NAME").innerHTML = "NET1 (MAC: " + HexToMAC(g_Inf.NET1.MAC) + ")";
    GI("NET2NAME").innerHTML = "NET2 (MAC: " + HexToMAC(g_Inf.NET2.MAC) + ")";
    GI("NETWIFINAME").innerHTML = "WIFI (MAC: " + HexToMAC(g_Inf.WifiMAC) + ")";

    if (g_Inf.HasNET2)
        GI("NET2").style.display = "block";
    if (g_Inf.HasWIFI)
        GI("NETWIFI").style.display = "block";
    fNETToUI(g_Inf.NET1, '1');
    fNETToUI(g_Inf.NET2, '2');
    fEnable();
    //if(navigator.language=="zh-CN")
    {
        //GI("langCN").checked = true;
        //GI("langEN").checked = false;
        g_UIStr = g_UIStrCN;
    }
//    GI("GRMID").innerHTML = "(SN: " + g_Inf.GrmID + ")";
    GI("idNetXchgAll").style.display = (g_Inf.HasNET2 && g_Inf.IsGRM50X) ? "block" : "none";
    if (g_Inf.SwitchNet == 0) {
        GI("idXchg0").checked = true;
    }
    else {
        GI("idXchg1").checked = true;
    }
    fUpdateUI();
    GI("idcfgW0").checked = true;
    if (g_Inf.WifiSel >= 0)
        WifiCurr = g_Inf.WifiSel;
    fWifiEdit(9999);
 //   setTimeout("fGetDynJS()", 3000);
}
function fCheckIPx(idx, name, obj) {
    if (GI("autoip" + idx).checked) {
        obj.AutoIP = 1;
        return true;
    }
    if (!fCheckIP("ip" + idx)) {
        alert(name + " " + g_UIStr.ip + g_UIStr.err);
        return false;
    }
    if (!fCheckIP("mask" + idx)) {
        alert(name + " " + g_UIStr.mask + g_UIStr.err);
        return false;
    }
    if (!fCheckIP("gate" + idx)) {
        alert(name + " " + g_UIStr.gate + g_UIStr.err);
        return false;
    }
    if (!fCheckIP("dns" + idx)) {
        alert(name + " " + g_UIStr.dns + g_UIStr.err);
        return false;
    }
    obj.AutoIP = 0;
    obj.IP = IPToHex(GI("ip" + idx).value);
    obj.Mask = IPToHex(GI("mask" + idx).value);
    obj.Gateway = IPToHex(GI("gate" + idx).value);
    obj.DNS = IPToHex(GI("dns" + idx).value);
    return true;
}
function fEnable() {
    var i;
    var chk;
    for (i = 1; i <= 2; i++) {
        chk = GI("autoip" + i).checked;
        GI("ip" + i).disabled = chk;
        GI("mask" + i).disabled = chk;
        GI("gate" + i).disabled = chk;
        GI("dns" + i).disabled = chk;
    }
    chk = GI("autoipW").checked;
    GI("ipW").disabled = chk;
    GI("maskW").disabled = chk;
    GI("gateW").disabled = chk;
    GI("dnsW").disabled = chk;
}
function fCheckIP(sjj) {
    var jj = GI(sjj);
    if (!jj) return false;
    var str = jj.value;
    var pa = str.split(".");
    var j = pa.length
    if (j != 4) {
        alert(str + g_UIStr.err);
        jj.focus();
        return false;
    }
    for (var i = 0; i < 4; i++) {
        if (pa[i].length == 0 || pa[i] > 255 || (String(pa[i] - 0) != pa[i])) {
            alert(str + g_UIStr.err);
            jj.focus();
            return false;
        }
    }
    return true;
}

function fEN() {
    GI("langEN").checked = true;
    GI("langCN").checked = false;
    g_UIStr = g_UIStrEN;
    fUpdateUI();
}
function fCN() {
    GI("langCN").checked = true;
    GI("langEN").checked = false;
    g_UIStr = g_UIStrCN;
    fUpdateUI();
}

function fWifiEdit(idx) {
    if (idx == 9999) {
        idx = 0;
    }
    else {
        if (idx == WifiCurr) return;
        if (!fWifiSave()) {
            GI("idcfgW" + WifiCurr).checked = true;//倒回之前的check
            return;
        }
    }
    GI("idcurridx").innerHTML = g_UIStr.config + " " + (idx + 1);
    var wf = g_Inf.WIFI[idx];
    GI("nameW").value = wf.SSID;
    GI("passW").value = wf.PASS;
    GI("autoipW").checked = wf.AutoIP;
    if (g_Inf.WIFI[idx].AutoIP) {
        GI("ipW").value = "0.0.0.0";
        GI("maskW").value = "0.0.0.0";
        GI("gateW").value = "0.0.0.0";
        GI("dnsW").value = "0.0.0.0";
    }
    else {
        GI("ipW").value = HexToIP(wf.IP);
        GI("maskW").value = HexToIP(wf.Mask);
        GI("gateW").value = HexToIP(wf.Gateway);
        GI("dnsW").value = HexToIP(wf.DNS);
    }
    WifiCurr = idx;
    fEnable();
}
function fWifiSave() {
    var idx = WifiCurr;
    if (!fCheckIP("ipW")) return false;
    if (!fCheckIP("maskW")) return false;
    if (!fCheckIP("gateW")) return false;
    if (!fCheckIP("dnsW")) return false;
    var wf = g_Inf.WIFI[idx];
    wf.AutoIP = GI("autoipW").checked ? 1 : 0;
    wf.SSID = GI("nameW").value;
    wf.PASS = GI("passW").value;
    wf.IP = IPToHex(GI("ipW").value);
    wf.Mask = IPToHex(GI("maskW").value);
    wf.Gateway = IPToHex(GI("gateW").value);
    wf.DNS = IPToHex(GI("dnsW").value);
    return true;
}
function fNetSave() {
    if (!fCheckIPx(1, "NET1", g_Inf.NET1)) return false;
    if (!fCheckIPx(2, "NET2", g_Inf.NET2)) return false;
    g_Inf.SwitchNet = GI("idXchg1").checked ? 1 : 0;

    return true;
}
