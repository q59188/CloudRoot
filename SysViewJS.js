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
function DR(a) {
    document.write(a);
}
function fMakeGrpInv() {
    var i, j, pp, sn;
    for (i = 0; i < g_WebGrpInfo.length; i++) {
        pp = g_WebGrpInfo[i];
        for (j = 0; j < pp.dev.length; j++) {
            sn = 'F' + pp.dev[j];
            if (!g_WebGrpInv.hasOwnProperty(sn)) {
                g_WebGrpInv[sn] = [];
            }
            g_WebGrpInv[sn].push(pp.name);
        }
    }
}
function fGroupFromGRM(sGRM) {
    sGRM = 'F' + sGRM;
    if (!g_WebGrpInv.hasOwnProperty(sGRM))
        return "";
    var x = g_WebGrpInv[sGRM];
    var ret = x.concat(',');
    if (ret[ret.length - 1] == ',')
        ret.length = ret.length - 1;
    if (ret[ret.length - 1] == ',')
        ret.length = ret.length - 1;
    return " <span style='color:#9000C0'>[" + ret + "]</span>";
}
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


//GENV = { TM: 1421653136466 };
//WEBCL = [
//{ GRM: "20001000005", IP: "2130706433", LT: 1421653132082, AT: 1421653132082, X: 1, P: 2 }
//];
//DEV = [
//{GRM:"20001000005",W:6,S:{NAME:"冷库远程监控系统1",IP:3232235886,LOG:2,LT:1421656884178,AT:1421656959526},CL:[{T:0,IP:2130706433,P:2},]},
//{ GRM: "20001000032", W: 0, S: { NAME: "冷库远程监控系统4", IP: 1845602496, LOG: 1, LT: 1421653129649, AT: 1421653130054 }, CL: [] }
//];
function tmnum2str(itm) {
    var vx = new Date(itm);
    return vx.format("yyyy-MM-dd,hh:mm:ss.zzz");
}
function fmtip(nip) {
    return (Math.floor(nip / (256 * 256 * 256))) + "." +
        (Math.floor(nip % (256 * 256 * 256) / (256 * 256))) + "." +
        (Math.floor(nip % (256 * 256) / 256)) + "." +
        (Math.floor(nip % 256));
}
function tmnumdiff2str(tm) {
    tm = tm / 1000;
    var vs;
    if (tm > 24 * 3600)
        vs = (tm / (24 * 3600)).toFixed(2) + '天';
    else if (tm > 3600)
        vs = (tm / 3600).toFixed(1) + '小时';
    else if (tm > 60)
        vs = (tm / 60).toFixed(1) + '分钟';
    else
        vs = tm.toFixed(1) + '秒';
    tm = tm / 60;
    if (tm < 30)
        return '<span style="color:#422">' + vs + '</span>';
    else if (tm < 4 * 60)
        return '<span style="color:#734">' + vs + '</span>';
    else if (tm < 24 * 60)
        return '<span style="color:#C86">' + vs + '</span>';
    else if (tm < 3 * 24 * 60)
        return '<span style="color:#F84">' + vs + '</span>';
    else if (tm < 10 * 24 * 60)
        return '<span style="color:#F40">' + vs + '</span>';
    else
        return '<span style="color:#E00">' + vs + '</span>';
}
function MakeDiff(v,lim) {
    if (v.length <= 1) return '';
    var i,ini=0, ret = [];
    if (v.length > (lim+1))
        ini = v.length - (lim + 1);
    for (i = ini; i < v.length - 1; i++) {
        ret.push(v[i + 1] - v[i]);
    }
    ret.reverse();
    return '[' + ret.join(',') + ']';
}
function fNumWanToStr(v) {
    if (v < 20000)
        return v + '';
    if (v < 2000000)
        return Math.round(v / 1000) / 10 + '万';
    if (v < 2000000000)
        return Math.round(v / 10000) / 100 + '百万';
    return Math.round(v / 1000000) / 100 + '亿';
}
function fqian(tm) {
    tm = (GENV.TM - tm) / 1000;
    var vs;
    if (tm > 24 * 3600)
        vs = (tm / (24 * 3600)).toFixed(2) + '天前';
    else if (tm > 3600)
        vs = (tm / 3600).toFixed(1) + '小时前';
    else if (tm > 60)
        vs = (tm / 60).toFixed(1) + '分钟前';
    else
        vs = tm.toFixed(1) + '秒前';
    tm = tm / 60;
    if (tm < 30)
        return '<span style="color:#222">' + vs + '</span>';
    else if (tm < 4 * 60)
        return '<span style="color:#734">' + vs + '</span>';
    else if (tm < 24 * 60)
        return '<span style="color:#C86">' + vs + '</span>';
    else if (tm < 3 * 24 * 60)
        return '<span style="color:#F84">' + vs + '</span>';
    else if (tm < 10 * 24 * 60)
        return '<span style="color:#F40">' + vs + '</span>';
    else
        return '<span style="color:#E00">' + vs + '</span>';
}
function proclgcm(s) {
    var i;
    if (lgcmhash.hasOwnProperty(s)) {
        i = lgcmhash[s];
        lgcm[i].cnt++;
    }
    else {
        i = lgcm.length;
        lgcm.push({ cnt: 1, id: s });
        lgcmhash[s] = i;
    }
}
function ipnum2ref(nip) {
    var sip = fmtip(nip);
    var ns = "";
    if (sip == '115.29.224.83')
        ns = " (bak.yunplc.com)";
    else if (sip == '115.28.40.121')
        ns = ' (www.yunplc.com)';
    else if (sip == '127.0.0.1')
        ns = ' (DX)';
    else if (sip == '0.0.0.0')
        ns = ' (ServerGroup)';
    if (ns)
        return ns;
    return '<A href="http://www.baidu.com/s?wd=' + sip + '" target=_blank>' + sip + '</A>';
}
function ipIsDX(nip) {
    var sip = fmtip(nip);
    return sip == '127.0.0.1';
}
function QueryCust(s) {
    var i;
    var xsub=s.substr(0, 2) ;
    if (xsub== '40'||xsub=='53'||xsub=='23') {
        s = '50' + s.substr(2, s.length - 2);
    }
    for (i = 0; i < sCustDB.length / 2; i++) {
        if (sCustDB[i * 2] == s)
            return sCustDB[i * 2 + 1];
    }
    return "";
}
var g_pass, g_issysdevop;
var g_clip = [], g_cliphash = {};

function procclip(sip) {
    var i;
    if (g_cliphash.hasOwnProperty(sip)) {
        i = g_cliphash[sip];
        g_clip[i].cnt++;
    }
    else {
        i = g_clip.length;
        g_clip.push({ cnt: 1, id: sip });
        g_cliphash[sip] = i;
    }
}
function clip2str() {
    var ret = '';
    if (!CLIENT_PER_IP_MIN)
        CLIENT_PER_IP_MIN = 20;
    g_clip.sort(function (a, b) { return a.cnt < b.cnt ? 1 : -1 });
    for (var i = 0; i < g_clip.length; i++) {
        var im = g_clip[i];
        if(im.id== '115.29.224.83'||im.id== '115.28.40.121'||im.id=='127.0.0.1'||im.id=='0.0.0.0')
            continue;
        if (im.cnt < CLIENT_PER_IP_MIN) break;
        ret += '\nIP=' + im.id + ',Count=' + im.cnt;
    }
    if (ret) {
        ret = '<hr><b>[登录' + CLIENT_PER_IP_MIN + '个客户端以上的IP有：]</b>' + ret + '';
    }
    return ret;
}
function fonload() {
    var sout = "", s, s2, sip;
    var ipre = document.getElementById("idTx");
    var i, j;
    var iditu = 0, iall = DEV.length, igrm = 0, iopc = 0, iopcall = 0, iweb = WEBCL.length, itrans = 0, ihasr=0;
    var pd, pg, piv, pw, dxcnt = 0;
    var bdt, btrans;
    var nlg = 0, nlgall = 0;
    var dltmp, dlmax = 0, dlmaxd = 0, dl3d = 0, dl10d = 0, dl1d = 0, dl4h = 0, dl30 = 0, dlother = 0;
    var dev_enum = [], dev_first = [], dev_down = [];
    var cnt_200 = 0, cnt_400 = 0, cnt_500 = 0;
    var tmfbegin = new Date().getTime();
    var tdiff, wcont = 0, dxcont = 0;
    var min3 = [];
    document.getElementById("idH1").innerHTML = "GrmCloudServer信息[" + tmnum2str(GENV.TM) + "]";
    function fperc(p) {
        return p + '个(' + (p * 100 / igrm).toFixed(1) + '%)';
    }
    var regwebss = "";
    if(GENV.hasOwnProperty("WebClCNT"))
        iweb = GENV.WebClCNT;
    
    var url =window.location.search;
    // alert(url.length); 
    // alert(url.lastIndexOf('=')); 
    g_pass = url.substring(url.lastIndexOf('P=') + 2, url.length);//
    g_issysdevop = url.indexOf('SYSDEVOPEN=1') > 0;
    fMakeGrpInv();
    //统计
    for (i = 0; i < DEV.length; i++) {
        pg = DEV[i];
        pg.hw_phone = ((pg.Ex & 0x0800) != 0);
        pg.hw_down = ((pg.Ex & 0x0400) != 0);
        pg.hw_alm = ((pg.Ex & 0x4) != 0);
        pg.hw_his = ((pg.Ex & 0x8) != 0);
        pg.hw_map = ((pg.Ex & 0x0100) != 0);
        pg.hw_trans = ((pg.Ex & 0x4000) != 0);
        pg.hw_dir = ((pg.Ex & 0x0001) != 0);
        if (pg.S.LT) {
            dltmp = GENV.TM - pg.S.LT;
            if (dltmp > dlmax)
                dlmax = dltmp;
            if (dltmp > 240 * 3600 * 1000)
                dl10d++;
            else if (dltmp > 72 * 3600 * 1000)
                dl3d++;
            else if (dltmp > 24 * 3600 * 1000)
                dl1d++;
            else if (dltmp > 4 * 3600 * 1000)
                dl4h++;
            else if (dltmp > 1800 * 1000)
                dl30++;
            else
                dlother++;
            igrm++;
            if (pg.S.LOG >= 100)
                iditu++;
        }
        if (pg.CL.length > 0)
            iopc++;
        iopcall += pg.CL.length;
        if (pg.S.IP) {//有设备
            proclgcm(pg.GRM.substr(0, 6));
            //对200，400，500系列分别计数
            switch (pg.GRM.substr(0, 1)) {
                case "2":
                    cnt_200++; break;
                case "3":
                    cnt_400++; break;
                case "4":
                    cnt_400++; break;
                case "5":
                    cnt_500++; break;
            }
            if (pg.hw_dir) ihasr++;
            for (j = 0; j < pg.CL.length; j++) {
                pd = pg.CL[j];
                if (!pd)
                    continue;
                if (pd.T == 2)
                    itrans++;
            }
        }
    }
    for (i = 0; i < DEV.length; i++) {
        pg = DEV[i];
        if (pg.S.LT) {
            dltmp = GENV.TM - pg.S.LT;
            if (dltmp > dlmax - 900 * 1000)//比最长时间晚15分钟内登录的
                dlmaxd++;
        }
    }
    lgcm.sort(function (a, b) { return a.cnt < b.cnt ? 1 : -1 });
    for (i = 0; i < lgcm.length; i++) {
        piv = lgcm[i];
        if (piv.cnt < LARGECUST_LEVEL) continue;
        nlg++;
        nlgall += piv.cnt;
    }
    for (i = 0; i < WEBCL.length; i++) {
        pw = WEBCL[i];
        procclip(fmtip(pw.IP));
        pw.isDX = ipIsDX(pw.IP);
        if (pw.isDX) {
            dxcnt++;
        }
        if ((pw.AT - pw.LT >= 1000) && ((GENV.TM - pw.AT) / 1000 < 60)) {
            if (pw.isDX)
                dxcont++;
            else
                wcont++;
        }
    }
    if (!GENV.WEBCONN) {
        GENV.WEBCONN = 0;
    }
    var avgweb = 0;
    if (GENV.AllWebReq.CMIN.V.length > 1) {
        for (i = 1; i < GENV.AllWebReq.CMIN.V.length; i++) {
            avgweb += (GENV.AllWebReq.CMIN.V[i] - GENV.AllWebReq.CMIN.V[i-1]);
        }
        avgweb = avgweb / (GENV.AllWebReq.CMIN.V.length-1 );
        avgweb = Math.round(avgweb / 60 * 10) / 10;
    }
    var avgregweb = 0;
    if (GENV.hasOwnProperty("RegWebReq")) {
        if (GENV.RegWebReq.CMIN.V.length > 1) {
            for (i = 1; i < GENV.RegWebReq.CMIN.V.length; i++) {
                avgregweb += (GENV.RegWebReq.CMIN.V[i] - GENV.RegWebReq.CMIN.V[i - 1]);
            }
            avgregweb = avgregweb / (GENV.RegWebReq.CMIN.V.length - 1);
            avgregweb = Math.round(avgregweb / 60 * 10) / 10;
        }
        regwebss = "ExWeb登录计数:" + fNumWanToStr(GENV.RegWebReq.CNT) + '次,' + avgregweb + '次每秒,';
    }
    sout = '<B style="COLOR: #000">[登录的设备:' + igrm + '个,客户ID总数:' + lgcm.length +
        '个,无设备仅客户端:' + (iall - igrm) + '个,有OPC的设备:' + iopc + '个,OPC总计:' + iopcall + '个,Web客户端:' + (iweb - dxcnt) + '个(活动' + wcont + '个),' +
        '数据交换:' + dxcnt + '个(活动' + dxcont + '个),<br/>透传的模块:' + itrans + '个,地图定位:' + iditu + '个,Web工作线程:' + GENV.WEBCONN
        + '个,Web请求计数:' +fNumWanToStr(GENV.AllWebReq.CNT) + '次,'+avgweb +'次每秒,'+regwebss+ '不可重定向的:' + (igrm - ihasr) + '个]</B>';
    sout += '\n<B style="COLOR: #000">[设备分类: GRM200系列 ' + cnt_200 + ' 个, GRM300/400系列 ' + cnt_400 + ' 个, GRM500系列 ' + cnt_500 + ' 个]</B>';
    sout += '\n<B style="COLOR: #000">[设备最长登录时间:' + fqian(GENV.TM - dlmax) + ', 从未掉线的设备:' + fperc(dlmaxd) + ']</B>';
    sout += '\n<B style="COLOR: #000">[登录10天以上:' + fperc(dl10d) + ',3～10天:' + fperc(dl3d) +
    ',1～3天:' + fperc(dl1d) + ', 4小时～1天:' + fperc(dl4h) + ',半小时～4小时:' + fperc(dl30) + ',半小时内:' + fperc(dlother) + ']</B>';
    if (GENV.AllWebReq.CMIN.V.length > 1) {
        sout += '\n最近每分钟Web请求数:<span style="font-size:small;color:#C9C">' + MakeDiff(GENV.AllWebReq.CMIN.V, 30) + '</span>';
    }
    if (GENV.AllWebReq.CHOUR.V.length > 1) {
        sout += '\n最近每小时Web请求数:<span style="font-size:small;color:#C9C">' + MakeDiff(GENV.AllWebReq.CHOUR.V, 24) + '</span>';
    }
    if (nlg > 0) {
        sout += '\n<b style="COLOR: #000">[批量客户 (>=' + LARGECUST_LEVEL
            + '个设备)共有' + nlg + '个，批量客户的设备总计' + nlgall + '个，占登录设备的' + (nlgall * 100 / igrm).toFixed(1) + '%]</b>';
    }
    WEBCL.sort(function (a, b) { return a.GRM > b.GRM || (a.GRM == b.GRM && a.X < b.X) ? 1 : -1 });
    sout += clip2str();
    if (g_IsMob) {
        sout = sout.replace(/\n/g, "<br/>\n");
        ipre.innerHTML = sout;
        tmfbegin = new Date().getTime() - tmfbegin;
        document.getElementById("idJSTM").innerHTML = "(本次JS处理时间" + tmfbegin + "ms)";
        return;
    }
    for (i = 0; i < WEBCL.length; i++) {
        pw = WEBCL[i];
        if (pw.isDX)
            continue;
        if (pw.X) s2 = '<B style="COLOR:#050">ExtWeb#:'; else s2 = '<B>WebPage:';
        tdiff = pw.AT - pw.LT;
        if (tdiff >= 1000) {
            tdiff = '在线:' + tmnumdiff2str(tdiff) + ';';
            if ((GENV.TM - pw.AT) / 1000 < 60) {
                tdiff = '<span style="color:#4C4">持续活动中</span>';
            }
            else {
                tdiff += '最近活动=' + fqian(pw.AT) + '';
            }
        } else {
            tdiff = '<span style="font-size:small;color:#C8C">短暂登录</span>';
        }
        s = '\n' + s2 + pw.GRM + '</B>; IP地址=' +  ipnum2ref(pw.IP) + '; 登录=' + fqian(pw.LT) + '(' + tmnum2str(pw.LT) + '); ' + tdiff + '<span style="font-size:small;color:#44B">(' + QueryCust(pw.GRM.substr(0, 6)) + ')</span>';
        sout += s;
    }
    for (i = 0; i < WEBCL.length; i++) {
        pw = WEBCL[i];
        if (pw.isDX) {
            s2 = '<B style="COLOR:#740">DX:';
            tdiff = pw.AT - pw.LT;
            if (tdiff >= 1000) {
                tdiff = '在线:' + tmnumdiff2str(tdiff) + ';';
                if ((GENV.TM - pw.AT) / 1000 < 60) {
                    tdiff = '<span style="color:#4C4">持续活动中</span>';
                }
                else {
                    tdiff += '最近活动=' + fqian(pw.AT) + '';
                }
            } else {
                tdiff = '<span style="font-size:small;color:#C8C">短暂登录</span>';
            }
            s = '\n' + s2 + pw.GRM + '</B>; IP地址=' + ipnum2ref(pw.IP) + '; 登录=' + fqian(pw.LT) + '(' + tmnum2str(pw.LT) + '); ' + tdiff + '<span style="font-size:small;color:#44B">(' + QueryCust(pw.GRM.substr(0, 6)) + ')</span>';
            sout += s;
        }
    }
    var hasHR = false;
    if (WEBCL.length) {
        sout += '<hr />';
        hasHR = true;
    }
    if (nlg > 0) {
        for (i = 0; i < lgcm.length; i++) {
            piv = lgcm[i];
            if (piv.cnt < LARGECUST_LEVEL) continue;

            s = '<div>批量客户ID: ' + piv.id + '; 有' + piv.cnt + '个设备, ' + QueryCust(piv.id) + '</div>';
            sout += s;
        }
        sout += '<hr />';
        hasHR = true;
    }
    if (!hasHR)
        sout += '<hr />';
    var sweb50 = '';
    for (i = 0; i < DEV.length; i++) {
        pg = DEV[i];
        if (i == 0)
            s = '<b>GRM_ID:' + pg.GRM + '</B>';
        else
            s = '\n<b>GRM_ID:' + pg.GRM + '</B>';
        if (pg.W) {
            s += '(Web=' + pg.W + ')';
            if (pg.W >= 50) {
                sweb50 += pg.GRM + '('+pg.W+'); ';
            }
        }            
        s += '  <span style="font-size:small;color:#44B">(' + QueryCust(pg.GRM.substr(0, 6)) + ')</span>' + fGroupFromGRM(pg.GRM);
        if (g_issysdevop) {
            s += '<a href="/sysdevop?GRM=' + pg.GRM + '&P=' + g_pass + '">[设备管理]</a>';
        }
        sout += s;
        if (pg.S.LT) {
            //per GRM Device
            if (pg.S.LOG >= 100) {
                bdt = 1;
                pg.S.LOG -= 100;
            }
            else
                bdt = 0;
            if (pg.S.LOG >= 10) {
                btrans = 1;
                pg.S.LOG -= 10;
            }
            else
                btrans = 0;
            if (pg.S.LOG == 0)
                s2 = '<span style=\"color:red;\">未登录</span>;';
            else if (pg.S.LOG == 1)
                s2 = '<span style=\"color:blue;\">已登录</span>;';
            else if (pg.S.LOG == 2){
                s2 = btrans ? '<B style=\"color:orange;\">透传中</B>;' : '<B style=\"color:green;\">数据传输中</B>;';
            }
            else {
                s2 = '<B style=\"color:#800000;\">登录中</B>;'
                if (pg.S.LOG == 3)
                    dev_enum.push(pg.GRM);
                else if (pg.S.LOG == 4)
                    dev_first.push(pg.GRM);
                else if (pg.S.LOG == 5) {
                    s2 = '<B style=\"color:#80CCCC;\">下载中</B>;';
                    dev_down.push(pg.GRM);
                }
            }
            if (bdt)
                s2 += '<span style=\"color:#700;\">地图定位</span>';
            s = '\n--GRM设备名=' + pg.S.NAME + '; IP=' + ipnum2ref(pg.S.IP) + ';' + s2;
            s += "[";
            if (pg.hw_alm) s += "#A";
            if (pg.hw_dir) s += "#R";
            if (pg.hw_down) s += "#D";
            if (pg.hw_his) s += "#H";
            if (pg.hw_map) s += "#M";
            if (pg.hw_phone) s += "#P";
            if (pg.hw_trans) s += "#T";
            s += "]";
            if (pg.FV) {
                s += "FV:" + pg.FV;
                if (pg.GT.substr(0, 4) == "GRM2" ) {
                    if(pg.FV >= 72){
                        s += ' <span class="clshis">(支持历史)</span>';
                    }
                }
                else if (pg.GT.substr(0, 4) == "GRM5") {
                    if (pg.FV >= 50) {
                        s += ' <span class="clshis">(支持历史)</span>';
                    }
                }
            }
            if (pg.S.LT > GENV.TM - 2 * 60 * 1000) {
                min3.push(pg.GRM +'('+ fqian(pg.S.LT)+')');
            }
            s += '\n  登录=' + fqian(pg.S.LT) + '(' + tmnum2str(pg.S.LT) + '); 最近活动=' + fqian(pg.S.AT);
            sout += s;
        }
        for (j = 0; j < pg.CL.length; j++) {
            pd = pg.CL[j];
            if (!pd)
                continue;
            if (pd.T == 0)
                s2 = 'OpcServer';
            else if (pd.T == 1)
                s2 = 'OpcMgr';
            else s2 = 'Trans';
            s = '\n--客户端=' + s2 + ';IP=' + ipnum2ref(pd.IP) + ';权限=';
            if (pd.P == 0)
                s2 = '低';
            else if (pd.P == 1) s2 = '中';
            else s2 = '高';
            sout += s + s2;
        }
    }

    if (dev_enum.length > 0)
        sout += '\nDevInEnum(' + dev_enum.length + ')个: ' + dev_enum.join(';');
    if (dev_first.length > 0)
        sout += '\nDevInFirstRun(' + dev_first.length + ')个: ' + dev_first.join(';');
    if (dev_down.length > 0)
        sout += '\nDevInDownLoad(' + dev_down.length + ')个: ' + dev_down.join(';');
    if (sweb50) {
        sout += '\n大于50个Web客户端的设备[' + sweb50 + ']';
    }
    if (min3.length > 0) {
        var n3len = min3.length;
        if(min3.length>50)
            min3.length=50;
        sout += '\n最近2分钟内登录的设备有('+n3len+'个)[\n' + min3.join(';\n') + ']';
    }
    sout = sout.replace(/\n/g, "<br/>\n");
    ipre.innerHTML = sout;
    tmfbegin = new Date().getTime() - tmfbegin;
    document.getElementById("idJSTM").innerHTML = "(本次JS处理时间" + tmfbegin + "ms)";
}
function fForceDelGroup() {
    var xmlhttp = CreateHttp();
    var src = '/sysdevop?GRM=' + g_GRM.GRM + '&OP=REMOVE&P=' + g_pass;
    var val = GI('idManPass').value;
    if (!val) {
        alert("不可以没有管理密码");
        return false;
    }
    xmlhttp.open("POST", src, false);
    try {
        xmlhttp.send(val);
    } catch (e) {
        alert("网络错误!");
        return;
    }
    var ret = xmlhttp.responseText.split("\r\n");
    if (ret.length >= 1 && ret[0] == 'OK') {
        //OK
        alert("操作完成！");
        window.location.href = '/sysview?P=' + g_pass;
    }
    else {
        alert("操作失败！");
        freloadx();
    }
}
function fForceActive(isact) {
    var xmlhttp = CreateHttp(), sop = isact ? 'ACTIVE1' : 'ACTIVE0';
    var src = '/sysdevop?GRM=' + g_GRM.GRM + '&OP=' + sop + '&P=' + g_pass;
    var val = GI('idManPass').value;
    if (!val) {
        alert("不可以没有管理密码");
        return false;
    }
    xmlhttp.open("POST", src, false);
    try {
        xmlhttp.send(val);
    } catch (e) {
        alert("网络错误!");
        return;
    }
    var ret = xmlhttp.responseText.split("\r\n");
    if (ret.length >= 1 && ret[0] == 'OK') {
        //OK
        alert("操作完成！");
        freloadx();
    }
    else {
        alert("操作失败！");
        freloadx();
    }
}