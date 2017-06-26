"use strict";
/*jslint browser: true, passfail: false, plusplus: true, vars: true, white: true, indent: 4 */
/*global Raphael,g_DisAutoLoad:true,JDEV:true,JPIC,JANICTL,gvWrite,gvOnVarChange ,$ */
/*
    //配套的JQueryUI变回1.9.2，以便支持IE6
*/
function degsin(deg) {
    return Math.sin(deg / 180 * Math.PI);
}
function degcos(deg) {
    return Math.cos(deg / 180 * Math.PI);
}
function gvMsgBox(s) {
    window.alert(s);
}

function gvMeter(aPanel, px, py, rd, divn, divlen) {
    var pl = aPanel.createPolyline();
    aPanel.addElement(pl);
    var i, lx, ly, lx2, ly2, dg;
    var divmul = Math.floor(rd / divn);
    if (divmul < 1) {
        divmul = 1;
    }
    for (i = 0; i <= divn * divmul; i++) {
        dg = 180 * i / (divn * divmul);
        lx = rd * degcos(dg);
        ly = -rd * degsin(dg);
        pl.addPointXY(lx + px, ly + py);
        if (i % divmul === 0) {
            lx2 = (rd + divlen) * degcos(dg);
            ly2 = -(rd + divlen) * degsin(dg);
            pl.addPointXY(lx2 + px, ly2 + py);
            pl.addPointXY(lx + px, ly + py);
        }
    }
    return pl;
}

function gvMeterCursor(aPanel, px, py, len, width, angle) {
    var pl = aPanel.createPolygon();
    aPanel.addElement(pl);

    var ptx, pty, plx, ply, prx, pry;
    ptx = len * degcos(angle);
    pty = -len * degsin(angle);
    plx = width / 2 * degcos(angle + 90);
    ply = -width / 2 * degsin(angle + 90);
    prx = width / 2 * degcos(angle - 90);
    pry = -width / 2 * degsin(angle - 90);
    pl.addPointXY(ptx + px, pty + py);
    pl.addPointXY(plx + px, ply + py);
    pl.addPointXY(prx + px, pry + py);
    pl.getFill().setColor("#0000FF");//rgb(0,255,0)
    return pl;
}

function gvMeterCursorPos(pl, px, py, len, width, angle) {
    var psptx, pspty, psplx, psply, psprx, pspry;
    psptx = len * degcos(angle);
    pspty = -len * degsin(angle);
    psplx = width / 2 * degcos(angle + 90);
    psply = -width / 2 * degsin(angle + 90);
    psprx = width / 2 * degcos(angle - 90);
    pspry = -width / 2 * degsin(angle - 90);
    pl.clearPoints();
    pl.addPointXY(Math.round(psptx + px), Math.round(pspty + py));
    pl.addPointXY(Math.round(psplx + px), Math.round(psply + py));
    pl.addPointXY(Math.round(psprx + px), Math.round(pspry + py));
    return pl;
}

function gvFullMeter(aPanel, px, py, rd, divn, divlen, curwd, angle, curcolor) {
    var ret = {};
    ret.Meter = gvMeter(aPanel, px, py, rd, divn, divlen);
    ret.Cursor = gvMeterCursor(aPanel, px, py, rd - 5, curwd, angle);
    ret.Cursor.getFill().setColor(curcolor);
    ret.param_px = px;
    ret.param_py = py;
    ret.param_rd = rd;
    ret.param_curlen = rd - 5;
    ret.param_curwd = curwd;
    ret.param_angle = angle;

    return ret;
}
function gvFullMeterCur(aMeter, aangel) {
    gvMeterCursorPos(aMeter.Cursor, aMeter.param_px, aMeter.param_py, aMeter.param_curlen, aMeter.param_curwd, aangel);
}

function gvMeterPath(aPanel, px, py, rd, divn, divlen) {
    var pss;
    /*
	(rx ry x-axis-rotation large-arc-flag sweep-flag x y)+
	//	pss="M300,200A150,150,0,0,1,600,200";
	*/
    pss = "M" + (px - rd) + "," + py + "A" + rd + "," + rd + ",0,0,1," + (px + rd) + "," + py;
    var i, dg;
    for (i = 0; i <= divn; i++) {
        dg = 180 * i / divn;
        pss = pss + "M" + (px + rd * degcos(dg)) + "," + (py - rd * degsin(dg)) +
        "L" + (px + (rd + divlen) * degcos(dg)) + "," + (py - (rd + divlen) * degsin(dg));
    }
    var pl = aPanel.path(pss);
    return pl;
}

function gvColorLight(cc, eff) {
    var cl = Raphael.color(cc);
    if (!cl.error) {
        eff = eff || 1.5;
        var ll = cl.l * eff;
        if (ll > 1) { ll = 1; }
        return Raphael.hsl(cl.h, cl.s, ll);
    }
    return cc;
}
function gvBtn(aPanel, x, y, w, h, atxt, acolor) {
    var pl = aPanel.rect(x, y, w, h, h / 2.5);
    var cl = acolor || "#BBBBBB";
    var cl2 = gvColorLight(cl);
    atxt = atxt || "按钮";
    pl.attr("fill", "270-" + cl + "-" + cl2 + ":66-" + cl);
    pl.txt = aPanel.text(x + w / 2, y + h / 2, atxt);
    pl.txt.attr("font-size", "16");
    pl.inparea = aPanel.rect(x, y, w, h);
    pl.inparea.attr("fill", "#FFFFFF");
    pl.inparea.attr("opacity", 0);
    pl.inparea.attr("stroke", "none");
    var gg = pl.glow({ color: "yellow", fill: true, opacity: 0.7, width: 15 });
    pl.glowItem = gg;
    gg.hide();
    return pl;
}
Raphael.fn.ball = function (x, y, r, hue) {
    hue = hue || 0;
    return this.set(
        this.ellipse(x, y + r - r / 5, r, r / 2).attr({ fill: "rhsb(" + hue + ", 1, .25)-hsb(" + hue + ", 1, .25)", stroke: "none", opacity: 0 }),
        this.ellipse(x, y, r, r).attr({ fill: "r(.5,.9)hsb(" + hue + ", 1, .75)-hsb(" + hue + ", .5, .25)", stroke: "none" }),
        this.ellipse(x, y, r - r / 5, r - r / 20).attr({ stroke: "none", fill: "r(.5,.1)#ccc-#ccc", opacity: 0 })
    );
};

function gvCheckFloat(str) {
    var r = /^(-?\d+)(\.\d+)?$/;　　//浮点数 
    if (r.test(str)) {
        return parseFloat(str);
    }
    return NaN;
}
function gvCheckInt(str) {
    var r = /^(-?\d+)$/;　　//整数
    if (r.test(str)) {
        return parseInt(str,10);
    }
    return NaN;
}
function gvCheckHex(str) {
    var r = /^([0-9a-fA-F]+)$/;　　//Hex 
    if (r.test(str)) {
        return parseInt(str, 16);
    }
    return NaN;
}

//UI部分
var sUA = navigator.userAgent;
var g_NoGlow = (sUA.indexOf("iPhone") > -1);
var isNoModal = ((sUA.indexOf("WebKit") > -1) && (sUA.indexOf("Android") > -1)) || (sUA.indexOf("iPhone") > -1);
var g_glowItem = null;
var g_FontSize = [{ Size: 12, Name: "宋体" }, { Size: 16, Name: "宋体" }, { Size: 20, Name: "宋体" }, { Size: 24, Name: "宋体" },
    { Size: 32, Name: "黑体" }, { Size: 48, Name: "黑体" }, { Size: 64, Name: "黑体" }];
//下面是绘图部分的定义
var g_paper;
var g_DefFontSize;

function gvAddBd(obj, x, y, w, h, bdw, grd) {
    var pathstr;
    x = x - 1; y = y - 1;
    w = w + 2; h = h + 2;
    obj.bd_3 = g_paper.rect(x, y, bdw, h).attr("fill", "180-" + grd).attr("stroke-width", "0");
    obj.bd_4 = g_paper.rect(x + w - bdw, y, bdw, h).attr("fill", "180-" + grd).attr("stroke-width", "0");
    //Bott
    pathstr = Raphael.format("M{0},{1}H{2}L{3},{4},H{5}z", x, y + h, x + w, x + w - bdw, y + h - bdw, x + bdw);
    obj.bd_2 = g_paper.path(pathstr).attr("fill", "90-" + grd).attr("stroke-width", "0");
    //Top
    pathstr = Raphael.format("M{0},{1}H{2}L{3},{4},H{5}z", x, y, x + w, x + w - bdw, y + bdw, x + bdw);
    obj.bd_1 = g_paper.path(pathstr).attr("fill", "90-" + grd).attr("stroke-width", "0");
}

var sgBoolArr = ["0", "1", "关", "开", "否", "是", "故障", "正常", "失败", "成功", "开", "关", "是", "否", "正常", "故障", "成功", "失败"];
function gvfmt(vv, mt, subt) {
    if (mt === 0) {
        return "#ERROR#";
    }
    if (isNaN(vv)) {
        return "#ERROR#";
    }
    if (mt === 1) {//bool
        if (subt >= sgBoolArr.length / 2) {
            return "#ERROR";
        }
        var iid = vv ? 1 : 0;
        return sgBoolArr[subt * 2 + iid];
    }
    if (mt === 2) {//int
        return Number(Math.round(vv)).toString(10);
    }
    if (mt === 3) {//Hex
        subt = (subt > 8) ? 8 : subt;
        subt = (subt < 1) ? 1 : subt;
        var ret = Number(Math.round(vv)).toString(16).toUpperCase();
        while (ret.length < subt) {
            ret = "0" + ret;
        }
        return ret;
    }
    if (mt === 4) {//Float
        return Number(vv).toFixed(subt);
    }
    if (mt === 5) {//Exp
        return Number(vv).toExponential(subt);
    }
    return "#ERROR#";
}

function gvRangeToStr(rg,ishex) {
    if (!rg) {
        return "";
    }
    if (!rg.hasOwnProperty('nio')) {
        return "";
    }
    if (ishex) {
        return " (0x" + rg.nio.toString(16) + " ～ 0x" + rg.aio.toString(16) + ") ";
    }
    return " (" + rg.nio + " ～ " + rg.aio + ") ";
}
function gvRangeCheck(rg, val) {
    if (!rg) {
        return true;
    }
    if (val > rg.aio) {
        return false;
    }
    if (val < rg.nio) {
        return false;
    }
    return true;
}
function gvRangeIO2Prj(rg, val) {
    if (!rg) {
        return val;
    }
    if (isNaN(rg.aio + rg.nio + rg.apr + rg.npr)) {
        return val;//有任何一个NaN，就不能缩放，所以返回原始值
    }
    if (rg.aio === rg.nio) {
        return NaN;
    }
    return (val - rg.nio) * (rg.apr - rg.npr) / (rg.aio - rg.nio) + rg.npr;
}
function gvRangePrj2IO(rg, val) {
    if (!rg) {
        return val;
    }
    if (isNaN(rg.aio + rg.nio + rg.apr + rg.npr)) {
        return val;//有任何一个NaN，就不能缩放，所以返回原始值
    }
    if (rg.apr === rg.npr) {
        return NaN;
    }
    return (val - rg.npr) * (rg.aio - rg.nio) / (rg.apr - rg.npr) + rg.nio;
}
/*
多状态文本的转换
*/
function gvConvMulti(arr, val) {
    if (isNaN(val)) {
        return "#ERROR#";
    }
    var i, cnt = arr.length / 2;
    for (i = 0; i < cnt; i++) {
        if (val < arr[i * 2 + 1]) {
            return arr[i * 2];
        }
    }
    return arr[arr.length - 1];
}
function gvConvMultiNoNAN(arr, val) {
    if (isNaN(val)) {
        return arr[0];//这里对故障值的处理不一样
    }
    var i, cnt = arr.length / 2;
    for (i = 0; i < cnt; i++) {
        if (val < arr[i * 2 + 1]) {
            return arr[i * 2];
        }
    }
    return arr[arr.length - 1];
}
function gvProcessInpNumOP(inpobj) {
    //TT.inp_X={it:2,vid:0,d:D_GRM1,vn:'回差温度',tt:0,PV1:'',PV2:'',PV3:'',PV4:'',PB1:0,PB2:0};
    var vval = inpobj.d.JV[inpobj.vid];
    if (inpobj.tt<=1) {
        vval =inpobj.tt;
    }
    else if (inpobj.tt == 2) {
        vval = !vval + 0;
    }
    else if (inpobj.tt == 3) {
        vval = inpobj.PV1;
    }
    else if (inpobj.tt == 4) {
        vval += inpobj.PV1;
        if(vval> inpobj.PV3){
            if (inpobj.PB1) {
                vval = inpobj.PV2;
            }
            else {
                vval = inpobj.PV3;
            }
        }
    }
    else if (inpobj.tt == 5) {
        vval -= inpobj.PV1;
        if (vval < inpobj.PV2) {
            if (inpobj.PB1) {
                vval = inpobj.PV3;
            }
            else {
                vval = inpobj.PV2;
            }
        }
    }
    else {
        throw ('inpobj.tt ERROR!');
    }
    //var dlgsrc = '<div title="请等待..."><p>变量写入中，请等待...</p></div>';
    //var dd = $(dlgsrc);
    //dd.dialog({
    //    width: 400, modal: true, closeOnEscape: false, dialogClass: "dlg-no-close", resizable: false,
    //});
    inpobj.d.JV[inpobj.vid] = vval;
    gvWrite(inpobj.d, inpobj.vn, vval);//写完了就更新变量，然后立刻读一次
    //dd.dialog("close");
    //dd.dialog("destroy");
    //dd.remove();
    if (JDEV) {
        gvOnVarChange();
    }
}
function gvProcessInpNumDlg(inpobj) {
    function fCloseInpDlg(dd) {
        dd.dialog("close");
        dd.dialog("destroy");
        dd.remove();
        g_DisAutoLoad = 0;
        if (g_glowItem) {
            g_glowItem.hide();
        }
        g_glowItem = null;
    }
    g_DisAutoLoad = 1;
    var prom = inpobj.prompt, prange = gvRangeToStr(inpobj.conv, +(inpobj.tt === 2));
    var sidx = 'DLGINP_' + Math.floor(Math.random() * 9999999);
    var dlgsrc, i, si;
    gvProcessInp.i_idx = -1;
    if (inpobj.tt === 3)//bool
    {
        dlgsrc = '<div title="变量输入: 开关量"><p>' + prom + '</p></div>';
        $(dlgsrc).dialog({
            width: 400, modal: true, closeOnEscape: true, dialogClass: "dlg-no-close", resizable: false,
            buttons: [
                {
                    text: inpobj.vlist[1],
                    click: function () {
                        inpobj.d.JV[inpobj.vid] = 0;
                        gvWrite(inpobj.d, inpobj.vn, 0);
                        if (JDEV) {
                            gvOnVarChange();
                        }
                        fCloseInpDlg($(this));
                    }
                },
            {
                text: inpobj.vlist[3],
                click: function () {
                    inpobj.d.JV[inpobj.vid] = 1;
                    gvWrite(inpobj.d, inpobj.vn, 1);//写完了什么也不更新，立刻读一次
                    if (JDEV) {
                        gvOnVarChange();
                    }
                    fCloseInpDlg($(this));
                }
            },
            {
                text: "(取消)",
                autofocus: 1,
                click: function () {
                    fCloseInpDlg($(this));
                }
            }]
        });
    }
    else if (inpobj.tt === 4) {//List
        dlgsrc = '<div title="变量输入: 列表"><p>' + prom + '</p><div>';
        for (i = 0; i < inpobj.vlist.length / 2; i++) {
            si = '<label style="display:block;margin:0 auto;padding:5px"><input type="radio" value="' + i + '" name="InpM" onclick="gvProcessInp.i_idx=' + i + ';"';
            si += ' >' + inpobj.vlist[i * 2 + 1] + '</label>';
            dlgsrc += si;
        }
        dlgsrc += '</div></div>';
        $(dlgsrc).dialog({
            width: 400, modal: true, closeOnEscape: true, dialogClass: "dlg-no-close", resizable: false,
            buttons: [{
                text: "确认",
                click: function () {
                    if (gvProcessInp.i_idx === -1) {
                        gvMsgBox("必须选择一个选项！");
                        g_DisAutoLoad = 0;
                        return;
                    }
                    inpobj.d.JV[inpobj.vid] = inpobj.vlist[gvProcessInp.i_idx * 2];
                    gvWrite(inpobj.d, inpobj.vn, inpobj.vlist[gvProcessInp.i_idx * 2]);//写完了什么也不更新，立刻读一次
                    if (JDEV) {
                        gvOnVarChange();
                    }
                    fCloseInpDlg($(this));
                }
            },
            {
                text: "(取消)",
                click: function () {
                    fCloseInpDlg($(this));
                }
            }]
        });
    }
    else {//Num
        var ttx = ": 整数",is0x="";
        if (inpobj.tt === 1) {
            ttx = ": 浮点数";
        }
        else if (inpobj.tt === 2) {
            ttx = ": 十六进制";
            is0x = "0x";
        }
        dlgsrc = '<div title="变量输入'+ttx+'"><div><p>' + prom +prange+ '</p><p>'+is0x+'<input type="text" autofocus="1" style="width:70%;" value="" id="' + sidx + '"/></p></div></div>';
        $(dlgsrc).dialog({
            width: 400, modal: true, closeOnEscape: true, dialogClass: "dlg-no-close", resizable: false,
            buttons: [{
                text: "确认",
                click: function () {
                    var vv;
                    if (inpobj.tt === 0) {
                        vv = gvCheckInt(document.getElementById(sidx).value);
                    }
                   else if (inpobj.tt === 1) {
                        vv = gvCheckFloat(document.getElementById(sidx).value);
                    }
                    if (inpobj.tt === 2) {
                        vv = gvCheckHex(document.getElementById(sidx).value);
                    }
                    if (isNaN(vv)) {
                        gvMsgBox("输入格式错误! 必须是数字，有效范围" + prange);
                        g_DisAutoLoad = 0;
                        return;
                    }
                    if (!gvRangeCheck(inpobj.conv, vv)) {
                        gvMsgBox("输入错误! 有效范围" + prange);
                        g_DisAutoLoad = 0;
                        return;
                    }
                    inpobj.d.JV[inpobj.vid] = gvRangeIO2Prj(inpobj.conv, vv);
                    gvWrite(inpobj.d, inpobj.vn, gvRangeIO2Prj(inpobj.conv, vv));//写完了什么也不更新，立刻读一次
                    if (JDEV) {
                        gvOnVarChange();
                    }
                    fCloseInpDlg($(this));
                }
            },
            {
                text: "(取消)",
                click: function () {
                    fCloseInpDlg($(this));
                }
            }]
        });
    }
}

function gvProcessInp(inpobj) {
    if (inpobj.it == 1) {
        gvProcessInpNumDlg(inpobj);
    }
    else if (inpobj.it == 2) {
        gvProcessInpNumOP(inpobj);
    }
    else if (inpobj.it == 3) {
        gvProcessInpSysFunc(inpobj);
    }
}

//function AddBtnItemClick(btn, fn) {
//    btn.inparea.mousedown(function () {
//        if (isNoModal) {
//            var tm_diff = GetTime() - andw_lasttm;
//            if (tm_diff < 500) return;
//        };
//        if (g_glowItem) g_glowItem.hide();
//        g_glowItem = btn.glowItem;
//        g_glowItem.show();
//    });
//    btn.inparea.mouseup(function () {
//        if (isNoModal) {
//            var tm_diff = GetTime() - andw_lasttm;
//            if (tm_diff < 500) return;
//        }
//        fn();
//        if (isNoModal) {
//            andw_lasttm = GetTime();
//        }
//        if (g_glowItem) g_glowItem.hide();
//        g_glowItem = null;
//    });
//}

function TGxBase(aX, aY, aW, aH) {
    this.x = aX;
    this.y = aY;
    this.w = aW;
    this.h = aH;
}
TGxBase.prototype.vs_Color = function (c) {
    this.intItem.attr("fill", c);
};
TGxBase.prototype.vs_BdColor = function (c) {
    this.intItem.attr("stroke", c);
};
TGxBase.prototype.hasPR = function (i) {
    return this.hasOwnProperty(i);
};
TGxBase.prototype.gvOnClick = function (/*aevt, x, y*/) {
    //this就是发生点击的这个inpItem
    gvProcessInp(this.gvRef.inp_X);
    return true;
};
TGxBase.prototype.gvOnMouseOver = function () {
    if (this.gvRef.inp_X) {
        if (g_glowItem) {
            g_glowItem.hide();
        }
        g_glowItem = this.gvRef.glowItem;
        g_glowItem.show();
    }
    return true;
};
TGxBase.prototype.gvOnMouseLeave = function () {
    if (this.gvRef.inp_X) {
        if (g_glowItem) {
            g_glowItem.hide();
        }
        g_glowItem = null;
    }
    return true;
};
TGxBase.prototype.gvAddGrow = function (refobj) {
    if (!g_NoGlow) {
        var gg = refobj.glow({ color: "#FFC000", fill: false, opacity: 0.8, width: 12 });
        this.glowItem = gg;
        gg.insertBefore(refobj);
        gg.hide();
    }
};
TGxBase.prototype.DoAni = function (/*aevt, x, y*/) {
    return true;
};
////开始各种元件
function TGxRect(aX, aY, aW, aH) {
    TGxBase.call(this, aX, aY, aW, aH);
}
//处理标准属性，sop为空则全部处理，sop="T"只处理文字不处理边框 ，sop="B"只处理边框和背景不处理文字
function gvMakeStdProp(v, sop) {
    var hasTx = true, hasBd = true;
    if (sop === "T") {
        hasBd = false;
    }
    if (sop === "B") {
        hasTx = false;
    }
    if (hasBd) {
        v.i_Color = v.i_Color || "";
        v.i_Grad = v.i_Grad || "";
        v.i_BorderW = v.i_BorderW || 0;
        if (v.i_Grad.length > 0 || v.i_Color.length > 0) {
            v.intItem.attr("fill", v.i_Grad || v.i_Color);
        }
        if (!v.i_BorderW || ((!v.i_BdColor) && (!v.vx_BdColor))) {
            v.intItem.attr("stroke-opacity", 0);
        }
        else {
            v.intItem.attr("stroke-width", v.i_BorderW);
            if (!v.hasOwnProperty("i_BdColor")) {
                v.i_BdColor = v.i_Color;
            }
            v.intItem.attr("stroke", v.i_BdColor);
        }
    }
    if (hasTx) {
        if (!v.hasOwnProperty("i_TxSize")) {
            v.i_TxSize = 1;
        }

        v.i_sText = v.i_sText || "";
        v.i_TxColor = v.i_TxColor || "";
        if (v.i_sText.length > 0) {
            v.intItemT = g_paper.text(v.x + v.w / 2, v.y + v.h / 2, v.i_sText);
            v.intItemT.attr("font-size", g_FontSize[v.i_TxSize].Size).attr("font-family", g_FontSize[v.i_TxSize].Name);
            if (v.i_TxColor.length > 0) {
                v.intItemT.attr("fill", v.i_TxColor);
            }
        }
    }
}

TGxRect.prototype = new TGxBase();
TGxRect.prototype.constructor = TGxRect;
TGxRect.prototype.EndInit = function () {
    this.intItem = g_paper.rect(this.x, this.y, this.w, this.h);
    gvMakeStdProp(this);
};

////
function TGxRndRect(aX, aY, aW, aH) {
    TGxBase.call(this, aX, aY, aW, aH);
}
TGxRndRect.prototype = new TGxBase();
TGxRndRect.prototype.constructor = TGxRndRect;
TGxRndRect.prototype.EndInit = function () {
    this.intItem = g_paper.rect(this.x, this.y, this.w, this.h, this.i_R);
    gvMakeStdProp(this);
};
////
function TGxEllipse(aX, aY, aW, aH) {
    TGxBase.call(this, aX, aY, aW, aH);
}
TGxEllipse.prototype = new TGxBase();
TGxEllipse.prototype.constructor = TGxEllipse;
TGxEllipse.prototype.EndInit = function () {
    this.intItem = g_paper.ellipse(this.x + this.w / 2, this.y + this.h / 2, this.w / 2, this.h / 2);
    gvMakeStdProp(this, "B");//处理边框
    this.i_Clip = this.i_Clip || 0;
    if (this.i_Clip) {
        if (this.i_Clip === 1)//上半
        {
            this.h = this.h / 2;
        }
        else if (this.i_Clip === 2) {
            this.h = this.h / 2;
            this.y += this.h;
        }
        else if (this.i_Clip === 3) {
            this.w = this.w / 2;
        }
        else if (this.i_Clip === 4) {
            this.w = this.w / 2;
            this.x += this.w;
        }
        else {
            this.h = this.h / 2;
            this.w = this.w / 2;
            if (this.i_Clip === 6) {
                this.y += this.h;
            }
            else if (this.i_Clip === 7) {
                this.x += this.w;
            }
            else if (this.i_Clip === 8) {
                this.x += this.w;
                this.y += this.h;
            }
        }
        var srd = Math.floor((this.i_BorderW + 1) / 2);
        var fmt = Raphael.format("{0},{1},{2},{3}", this.x - srd, this.y - srd, this.w + srd * 2 + 1, this.h + srd * 2 + 1);
        this.intItem.attr("clip-rect", fmt);
    }
    gvMakeStdProp(this, "T");//再处理文字
};

//GxImg
function TGxImg(aX, aY, aW, aH) {
    TGxBase.call(this, aX, aY, aW, aH);
}
TGxImg.prototype = new TGxBase();
TGxImg.prototype.constructor = TGxImg;
TGxImg.prototype.EndInit = function () {
    if (this.inp_X) {
        if (!this.intBack) {
            this.intBack = g_paper.rect(this.x, this.y, this.w, this.h);
            this.intBack.attr("fill", "#FFF").attr("stroke-width", 0).attr("fill-opacity", 0.01);
        }
    }
    if (!this.i_Img && !this.vx_Img) {
        this.i_Img = { file: 'ERROR.png', w: 32, h: 32 };//没有的默认值
    }
    if (this.vx_Img) {
        this.i_Img = null;
    }
    if (this.i_Img) {
        this.vx_Img = 0;
        this.vs_Img(this.i_Img);
    }
};
TGxImg.prototype.vs_Img = function (vobj) {
    if (this.vx_Img < 2) {
        var picw = vobj.w, pich = vobj.h, hasclip = false, picwh;
        if (this.i_ImgAlign === 0) {
            //原始
            if (picw > this.w || pich > this.h) {
                hasclip = true;
            }
        }
        else if (this.i_ImgAlign === 1) {
            //铺满
            picw = this.w; pich = this.h;
        }
        else if (this.i_ImgAlign === 2) {
            //按比例/留空
            picwh = picw / pich;
            if (picwh > this.w / this.h) {//pic比外面宽
                picw = this.w;
                pich = this.w / picwh;
            } else {
                pich = this.h;
                picw = this.h * picwh;
            }
        }
        else if (this.i_ImgAlign === 3) {
            //按比例/裁切
            picwh = picw / pich;
            if (picwh > this.w / this.h) {//pic比外面宽
                pich = this.h;
                picw = this.h * picwh;
            } else {
                picw = this.w;
                pich = this.w / picwh;
            }
            hasclip = true;
        }
        this.intItem = g_paper.image("/site/" + JPIC.siteid + '/' + vobj.file, this.x + this.w / 2 - picw / 2, this.y + this.h / 2 - pich / 2, picw, pich);
        if (hasclip) {
            this.intItem.attr("clip-rect", this.x + ',' + this.y + ',' + this.w + ',' + this.h);
        }
        gvMakeStdProp(this, 'T');//文字只能在这里！如果在图片前面生成就被图片挡了
        this.intItem.gvRef = this;
        if (JDEV) {
            if (this.inp_X) {
                this.intItem.click(this.gvOnClick);
                this.intItem.hover(this.gvOnMouseOver, this.gvOnMouseLeave);
                this.intItem.attr("cursor", "pointer");
                this.gvAddGrow(this.intItem);
            }
        }
        this.vx_Img += 2;
    }
    else {
        if (this.intItem) {
            this.intItem.attr("src", "/site/" + JPIC.siteid + '/' + vobj.file);
        }
    }
};
TGxImg.prototype.DoAni = function () {
    return true;
};

//// 
function TGxText(aX, aY, aW, aH) {
    TGxBase.call(this, aX, aY, aW, aH);
}

TGxText.prototype = new TGxBase();
TGxText.prototype.constructor = TGxText;

TGxText.prototype.EndInit = function () {
    this.i_BorderW = this.i_BorderW || 1;
    this.i_BdColor = this.i_BdColor || "";
    this.i_TxColor = this.i_TxColor || "";
    this.i_Grad = this.i_Grad || "";
    this.i_Color = this.i_Color || "";
    if (this.i_Color.length > 0 || this.i_Grad.length > 0) {//填充色
        this.intBack = g_paper.rect(this.x, this.y, this.w, this.h);
        this.intBack.attr("fill", this.i_Grad || this.i_Color).attr("stroke-width", 0);
    }
    if (this.inp_X) {
        if (!this.intBack) {
            this.intBack = g_paper.rect(this.x, this.y, this.w, this.h);
            this.intBack.attr("fill", "#FFF").attr("stroke-width", 0).attr("fill-opacity", 0.01);
        }
        this.gvAddGrow(this.intBack);
    }
    if (this.i_BdType === 1) {
        //Simple Bd
        this.intBd = g_paper.rect(this.x, this.y, this.w, this.h).attr("fill-opacity", 0).attr("stroke-width", this.i_BorderW);
    }
    else if (this.i_BdType > 1) {
        var xgrd;
        if (this.i_BdType === 2) {
            xgrd = Raphael.format("{0}-{1}", gvColorLight(this.i_BdColor, 0.3), this.i_BdColor);
        }
        else if (this.i_BdType === 3) {
            xgrd = Raphael.format("{0}-{1}:45-{1}:55-{0}", gvColorLight(this.i_BdColor, 0.3), this.i_BdColor);
        }
        if (this.i_BdType === 4) {
            xgrd = Raphael.format("{1}-{0}", gvColorLight(this.i_BdColor, 0.3), this.i_BdColor);
        }
        gvAddBd(this, this.x, this.y, this.w, this.h, this.i_BorderW, xgrd);
    }
    this.intItem = g_paper.text(this.x + this.w / 2, this.y + this.h / 2, "####");
    if (!this.hasPR("i_PreText")) { this.i_PreText = ""; }
    if (!this.hasPR("i_AfterText")) { this.i_AfterText = ""; }
    if (this.hasPR("i_MidText")) {
        this.intItem.attr("text", this.i_PreText + this.i_MidText + this.i_AfterText);
    }
    if (this.i_TxColor) {
        this.intItem.attr("fill", this.i_TxColor);
    }
    this.intItem.attr("font-size", g_FontSize[this.i_TxSize].Size).attr("font-family", g_FontSize[this.i_TxSize].Name);
    this.intItem.gvRef = this;
    if (JDEV) {
        if (this.inp_X) {
            this.intItem.click(this.gvOnClick);
            this.intItem.mouseover(this.gvOnMouseOver);
            this.intItem.attr("cursor", "pointer");
            if (this.intBack) {
                this.intBack.attr("cursor", "pointer");
                this.intBack.gvRef = this;
                this.intBack.hover(this.gvOnMouseOver, this.gvOnMouseLeave);
                this.intBack.click(this.gvOnClick);
            }
        }
    }
    if (this.intBack) {
        JANICTL.push(this);
    }
};

TGxText.prototype.vs_MidText = function (s) {
    this.intItem.attr("text", this.i_PreText + s + this.i_AfterText);
};
////
function TGxButton(aX, aY, aW, aH) {
    TGxBase.call(this, aX, aY, aW, aH);
}
TGxButton.prototype = new TGxBase();
TGxButton.prototype.constructor = TGxButton;
TGxButton.prototype.EndInit = function () {
    var ftcolor = this.i_TxColor ? 'color:' + this.i_TxColor +'; ': '';
    var fbcolor = this.i_Color ? 'background-color:' + this.i_Color + '; ' : '';
    var fvalue='按钮';
    if (!this.hasPR("i_PreText")) { this.i_PreText = ""; }
    if (!this.hasPR("i_AfterText")) { this.i_AfterText = ""; }
    if (this.hasPR("i_MidText")) {
        fvalue = this.i_PreText + this.i_MidText + this.i_AfterText;
    }
    var sbtn = '<input type="button" value="' + fvalue + '" onclick="fButtonClick(JCTL[' + this.x_Idx + ']);"  id="xbtnid_' + this.x_Idx + '" ';
    sbtn += ' style="position:absolute; top:' + this.y + 'px; left:' + this.x + 'px; width:' + this.w + 'px; height:' + this.h + 'px;'+
    'font-size:' + g_FontSize[this.i_TxSize].Size + 'px; ' +ftcolor +fbcolor+' " />';
    document.getElementById('UserFrame').innerHTML = document.getElementById('UserFrame').innerHTML + sbtn;
    this.gvRef = this;
};
TGxButton.prototype.vs_Color = function (c) {    //颜色
    document.getElementById('xbtnid_' + this.x_Idx).style.backgroundColor = c;
};
TGxButton.prototype.vs_MidText = function (s) {
    document.getElementById('xbtnid_' + this.x_Idx).value = this.i_PreText + s + this.i_AfterText;
};
function fButtonClick(btnobj) {
    if (JDEV) {
        btnobj.gvOnClick();
    }
}

function TGxLamp(aX, aY, aW, aH) {
    TGxBase.call(this, aX, aY, aW, aH);
}
TGxLamp.prototype = new TGxBase();
TGxLamp.prototype.constructor = TGxLamp;
TGxLamp.prototype.EndInit = function () {
    this.intItem = g_paper.circle(this.x + this.w / 2, this.y + this.h / 2, this.w / 2);
    this.intItem.attr("background-color", "#900");
};
////
function TGxLamp2(aX, aY, aW, aH) {
    TGxBase.call(this, aX, aY, aW, aH);
}
TGxLamp2.prototype = new TGxBase();
TGxLamp2.prototype.constructor = TGxLamp2;
TGxLamp2.prototype.EndInit = function () {
    this.intItem = g_paper.circle(this.x + this.w / 2, this.y + this.h / 2, this.w / 2);
    this.intItem.attr("background-color", "#900");
};
