/*!
 * ╔══════════════════════════════════════════════════╗
 * ║   حاجات سما – محلل المكان الذكي                ║
 * ║   Embeddable Widget v2.0                         ║
 * ║   الموقع: https://7agatsamaa.wuiltstore.com      ║
 * ╚══════════════════════════════════════════════════╝
 *
 * طريقة الإضافة لأي موقع (سطر واحد فقط):
 * <script src="https://YOUR_GITHUB.github.io/repo/widget.js"></script>
 *
 * يعمل على: iOS Safari، Android Chrome، Samsung Browser،
 *            Firefox، Chrome Desktop، Edge، Opera
 */
(function (GKEY) {
  'use strict';

  /* ── منع التحميل المزدوج ── */
  if (document.getElementById('hjsaw')) return;

  /* ── Google Fonts ── */
  if (!document.querySelector('link[href*="Cairo"]')) {
    var fl = document.createElement('link');
    fl.rel = 'stylesheet';
    fl.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;800;900&display=swap';
    document.head.appendChild(fl);
  }

  /* ══════════════════════════════════════════════════
     CSS – كل الستايلات مدمجة ومعزولة
  ══════════════════════════════════════════════════ */
  var css = document.createElement('style');
  css.id = 'hjsaw-css';
  css.textContent = [
    /* Variables */
    ':root{--hj-red:#ff0000;--hj-red-glow:rgba(255,0,0,0.5);--hj-dark:#000000;--hj-dark2:#0a0a0a;--hj-r:20px;--hj-rs:12px;--hj-font:\'Cairo\',sans-serif;--hj-spd:.35s;}',

    /* Floating button */
    '#hjsaw-btn{position:fixed;bottom:28px;left:28px;width:68px;height:68px;border-radius:50%;border:none;cursor:pointer;z-index:2147483640;display:flex;align-items:center;justify-content:center;background:linear-gradient(145deg,#120000,#3a0000,#000000);box-shadow:0 8px 32px rgba(0,0,0,.65),0 0 0 0 rgba(255,0,0,.45);animation:hj-bp 2.8s ease-in-out infinite;transition:transform var(--hj-spd),box-shadow var(--hj-spd);overflow:visible;font-family:var(--hj-font);}',
    '#hjsaw-btn:hover{transform:scale(1.12) translateY(-3px);animation:none;box-shadow:0 18px 55px rgba(0,0,0,.85),0 0 45px rgba(255,0,0,.35);}',
    '#hjsaw-btn:active{transform:scale(.94);}',
    '@keyframes hj-bp{0%{box-shadow:0 8px 32px rgba(0,0,0,.65),0 0 0 0 rgba(255,0,0,.55);}65%{box-shadow:0 8px 32px rgba(0,0,0,.65),0 0 0 20px rgba(255,0,0,0);}100%{box-shadow:0 8px 32px rgba(0,0,0,.65),0 0 0 0 rgba(255,0,0,0);}}',
    '.hj-bico{width:36px;height:36px;transition:transform var(--hj-spd) cubic-bezier(.34,1.56,.64,1);}',
    '#hjsaw-btn.open .hj-bico{transform:rotate(45deg) scale(.82);}',
    '.hj-nring{position:absolute;top:-5px;right:-5px;width:20px;height:20px;border-radius:50%;background:linear-gradient(135deg,var(--hj-red),#7a0000);border:2px solid #000;display:flex;align-items:center;justify-content:center;font-size:.55rem;font-weight:900;color:#fff;animation:hj-rp 2s ease-in-out infinite;}',
    '@keyframes hj-rp{0%,100%{transform:scale(1)}50%{transform:scale(1.3)}}',

    /* Backdrop */
    '#hjsaw-bd{position:fixed;inset:0;background:rgba(0,0,0,.82);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);z-index:2147483641;opacity:0;pointer-events:none;transition:opacity var(--hj-spd);}',
    '#hjsaw-bd.vis{opacity:1;pointer-events:all;}',

    /* Widget panel */
    '#hjsaw-w{position:fixed;bottom:110px;left:28px;width:430px;max-width:calc(100vw - 36px);height:680px;max-height:calc(100vh - 130px);z-index:2147483642;border-radius:var(--hj-r);overflow:hidden;display:flex;flex-direction:column;box-shadow:0 30px 90px rgba(0,0,0,.95),0 8px 30px rgba(255,0,0,.25);transform:translateY(40px) scale(.88);opacity:0;pointer-events:none;transition:transform var(--hj-spd) cubic-bezier(.34,1.56,.64,1),opacity var(--hj-spd);background:var(--hj-dark);font-family:var(--hj-font);}',
    '#hjsaw-w.open{transform:translateY(0) scale(1);opacity:1;pointer-events:all;}',
    '@media(max-width:480px){#hjsaw-w{bottom:0;left:0;right:0;width:100%;max-width:100%;border-radius:var(--hj-r) var(--hj-r) 0 0;height:92vh;max-height:92vh;}#hjsaw-btn{bottom:18px;left:18px;}}',

    /* Header */
    '#hjsaw-w .wh{background:linear-gradient(135deg,#000000,#120000,#2a0000);padding:18px 20px 16px;position:relative;overflow:hidden;flex-shrink:0;border-bottom:1px solid rgba(255,0,0,.25);}',
    '#hjsaw-w .wh::before{content:"";position:absolute;top:-55%;right:-18%;width:230px;height:230px;border-radius:50%;background:radial-gradient(circle,rgba(255,0,0,.22) 0%,transparent 65%);pointer-events:none;}',
    '#hjsaw-w .wh::after{content:"";position:absolute;bottom:-45%;left:-12%;width:170px;height:170px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.05) 0%,transparent 65%);pointer-events:none;}',
    '#hjsaw-w .wht{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;position:relative;z-index:1;}',
    '#hjsaw-w .whb{display:flex;align-items:center;gap:10px;}',
    '#hjsaw-w .whl{width:40px;height:40px;border-radius:11px;background:linear-gradient(135deg,var(--hj-red),#7a0000);display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(255,0,0,.45);flex-shrink:0;}',
    '#hjsaw-w .whn{color:#fff;font-size:.92rem;font-weight:800;line-height:1.2;}',
    '#hjsaw-w .whs{color:rgba(255,255,255,.42);font-size:.65rem;}',
    '#hjsaw-w .whc{width:32px;height:32px;border-radius:50%;border:none;background:rgba(255,255,255,.05);color:rgba(255,255,255,.7);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s,color .2s;position:relative;z-index:2;flex-shrink:0;}',
    '#hjsaw-w .whc:hover{background:rgba(255,0,0,.22);color:#fff;}',
    '#hjsaw-w .whtit{color:#fff;font-size:1.05rem;font-weight:800;margin-bottom:3px;position:relative;z-index:1;}',
    '#hjsaw-w .whdesc{color:rgba(255,255,255,.42);font-size:.73rem;position:relative;z-index:1;}',
    '#hjsaw-w .sbar{position:absolute;bottom:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--hj-red),#7a0000,var(--hj-red),transparent);animation:hj-sb 2.2s ease-in-out infinite;}',
    '@keyframes hj-sb{0%,100%{opacity:.3;transform:scaleX(.15)}50%{opacity:1;transform:scaleX(1)}}',

    /* Progress bar */
    '#hjsaw-w .pw{height:3px;background:rgba(255,255,255,.03);flex-shrink:0;}',
    '#hjsaw-w .pb{height:100%;background:linear-gradient(90deg,var(--hj-red),#7a0000,#ff4d4d);transition:width .6s cubic-bezier(.4,0,.2,1);border-radius:0 2px 2px 0;}',

    /* Scrollable body */
    '#hjsaw-w .wb{flex:1;overflow-y:auto;overflow-x:hidden;background:var(--hj-dark2);scrollbar-width:thin;scrollbar-color:rgba(255,0,0,.15) transparent;}',
    '#hjsaw-w .wb::-webkit-scrollbar{width:4px;}',
    '#hjsaw-w .wb::-webkit-scrollbar-thumb{background:rgba(255,0,0,.22);border-radius:2px;}',

    /* Steps */
    '#hjsaw-w .step{display:none;padding:18px;flex-direction:column;gap:14px;animation:hj-si .4s ease both;}',
    '#hjsaw-w .step.active{display:flex;}',
    '@keyframes hj-si{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}',
    '#hjsaw-w .ls{color:rgba(255,255,255,.28);font-size:.67rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;}',
    '#hjsaw-w .lt{color:#fff;font-size:1rem;font-weight:800;line-height:1.5;}',
    '#hjsaw-w .lt em{color:var(--hj-red);font-style:normal;text-shadow:0 0 10px rgba(255,0,0,.45);}',

    /* Room grid */
    '#hjsaw-w .rg{display:grid;grid-template-columns:repeat(3,1fr);gap:9px;}',
    '#hjsaw-w .rc{background:rgba(255,255,255,.02);border:1.5px solid rgba(255,255,255,.05);border-radius:var(--hj-rs);padding:14px 6px;display:flex;flex-direction:column;align-items:center;gap:7px;cursor:pointer;transition:all .25s;user-select:none;}',
    '#hjsaw-w .rc:hover{background:rgba(255,0,0,.08);border-color:rgba(255,0,0,.35);transform:translateY(-2px);}',
    '#hjsaw-w .rc.sel{background:rgba(255,0,0,.12);border-color:var(--hj-red);box-shadow:0 0 22px rgba(255,0,0,.25);}',
    '#hjsaw-w .rc.sel .rcl{color:#fff;font-weight:700;}',
    '#hjsaw-w .rci{font-size:1.75rem;line-height:1;}',
    '#hjsaw-w .rcl{color:rgba(255,255,255,.72);font-size:.7rem;font-weight:600;text-align:center;}',

    /* Dimension inputs style */
    '#hjsaw-w .dim-inputs{background:rgba(255,255,255,.02);border:1.5px solid rgba(255,0,0,.15);border-radius:var(--hj-rs);padding:14px;display:flex;flex-direction:column;gap:10px;margin-top:2px;}',
    '#hjsaw-w .dim-inputs-title{color:rgba(255,255,255,.8);font-size:.78rem;font-weight:700;display:flex;align-items:center;gap:6px;}',
    '#hjsaw-w .dim-inputs-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;}',
    '#hjsaw-w .dim-field{display:flex;flex-direction:column;gap:5px;}',
    '#hjsaw-w .dim-field label{color:rgba(255,255,255,.45);font-size:.65rem;font-weight:700;}',
    '#hjsaw-w .dim-field input{background:rgba(0,0,0,.5);border:1px solid rgba(255,0,0,.22);border-radius:8px;padding:8px 6px;color:#fff;font-family:var(--hj-font);font-size:.76rem;outline:none;text-align:center;transition:all .2s;}',
    '#hjsaw-w .dim-field input:focus{border-color:var(--hj-red);box-shadow:0 0 10px rgba(255,0,0,.25);}',
    '#hjsaw-w .dim-field input::placeholder{color:rgba(255,255,255,.15);}',

    '#hjsaw-w .info-tip{background:rgba(255,0,0,.04);border:1px solid rgba(255,0,0,.14);border-radius:10px;padding:12px;display:flex;gap:10px;align-items:flex-start;}',
    '#hjsaw-w .info-tip p{color:rgba(255,255,255,.52);font-size:.75rem;line-height:1.6;margin:0;}',
    '#hjsaw-w .aibadge{display:inline-flex;align-items:center;gap:5px;background:rgba(255,0,0,.08);border:1px solid rgba(255,0,0,.22);border-radius:20px;padding:4px 12px;font-size:.67rem;font-weight:700;color:rgba(255,100,100,.95);pointer-events:none;}',

    /* Camera */
    '#hjsaw-w .cam-wrap{position:relative;border-radius:var(--hj-rs);overflow:hidden;background:#000;aspect-ratio:4/3;width:100%;border:1.5px solid rgba(255,0,0,.25);}',
    '#hjsaw-w #hjcv{width:100%;height:100%;object-fit:cover;display:block;}',
    '#hjsaw-w #hjcc{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;}',
    '#hjsaw-w .crosshair{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:38px;height:38px;pointer-events:none;}',
    '#hjsaw-w .crosshair::before,#hjsaw-w .crosshair::after{content:"";position:absolute;background:rgba(255,0,0,.85);box-shadow:0 0 10px var(--hj-red);}',
    '#hjsaw-w .crosshair::before{left:50%;top:0;width:1.5px;height:100%;transform:translateX(-50%);}',
    '#hjsaw-w .crosshair::after{top:50%;left:0;height:1.5px;width:100%;transform:translateY(-50%);}',
    '#hjsaw-w .arc-ui{position:absolute;inset:10px;pointer-events:none;}',
    '#hjsaw-w .arc{position:absolute;width:22px;height:22px;border-color:var(--hj-red);border-style:solid;}',
    '#hjsaw-w .arc.tl{top:0;right:0;border-width:2.5px 0 0 2.5px;border-radius:4px 0 0 0;}',
    '#hjsaw-w .arc.tr{top:0;left:0;border-width:2.5px 2.5px 0 0;border-radius:0 4px 0 0;}',
    '#hjsaw-w .arc.bl{bottom:0;right:0;border-width:0 0 2.5px 2.5px;border-radius:0 0 0 4px;}',
    '#hjsaw-w .arc.br{bottom:0;left:0;border-width:0 2.5px 2.5px 0;border-radius:0 0 4px 0;}',
    '#hjsaw-w .cstat{position:absolute;top:10px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.75);backdrop-filter:blur(10px);border:1px solid rgba(255,0,0,.35);border-radius:20px;padding:5px 14px;color:#fff;font-size:.68rem;font-weight:700;white-space:nowrap;display:flex;align-items:center;gap:6px;}',
    '#hjsaw-w .cstat .dot{width:7px;height:7px;border-radius:50%;background:var(--hj-red);box-shadow:0 0 8px var(--hj-red);animation:hj-db .85s ease-in-out infinite;}',
    '@keyframes hj-db{0%,100%{opacity:1}50%{opacity:.25}}',
    '#hjsaw-w .cerr{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;background:rgba(0,0,0,.95);text-align:center;padding:20px;}',
    '#hjsaw-w .cerr-ico{font-size:2.5rem;}',
    '#hjsaw-w .cerr-txt{color:rgba(255,255,255,.68);font-size:.84rem;line-height:1.55;}',
    '#hjsaw-w .cerr-btn{padding:10px 22px;border-radius:20px;background:var(--hj-red);border:none;color:#fff;font-family:var(--hj-font);font-size:.84rem;font-weight:700;cursor:pointer;margin-top:6px;box-shadow:0 4px 12px rgba(255,0,0,.35);}',
    '#hjsaw-w .cerr-btn.sec{background:rgba(255,255,255,.05);border:1.5px solid rgba(255,255,255,.1);}',
    '#hjsaw-w .cam-acts{display:flex;align-items:center;justify-content:space-between;gap:10px;}',
    '#hjsaw-w .cam-tip{color:rgba(255,255,255,.38);font-size:.71rem;line-height:1.45;flex:1;}',
    '#hjsaw-w .cam-tip strong{color:rgba(255,77,77,.95);}',
    '#hjsaw-w #hjshubt{width:66px;height:66px;border-radius:50%;border:none;cursor:pointer;background:transparent;position:relative;flex-shrink:0;display:flex;align-items:center;justify-content:center;transition:transform .15s;}',
    '#hjsaw-w #hjshubt:active{transform:scale(.88);}',
    '#hjsaw-w #hjshubt .so{position:absolute;inset:0;border-radius:50%;border:3px solid rgba(255,255,255,.6);}',
    '#hjsaw-w #hjshubt .si{width:50px;height:50px;border-radius:50%;background:#fff;transition:transform .15s,background .15s;}',
    '#hjsaw-w #hjshubt:active .si{transform:scale(.82);background:rgba(255,255,255,.75);}',
    '#hjsaw-w #hjflipbt{width:40px;height:40px;border-radius:50%;border:1.5px solid rgba(255,255,255,.1);background:rgba(255,255,255,.03);color:rgba(255,255,255,.68);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;flex-shrink:0;}',
    '#hjsaw-w #hjflipbt:hover{background:rgba(255,0,0,.15);border-color:rgba(255,0,0,.35);color:#fff;}',
    '#hjsaw-w #hjpcinfo{display:none;color:rgba(255,255,255,.38);font-size:.71rem;text-align:center;}',
    '#hjsaw-w #hjpcinfo strong{color:var(--hj-red);}',
    '#hjsaw-w #hjpw2{position:relative;border-radius:var(--hj-rs);overflow:hidden;border:1.5px solid rgba(255,0,0,.25);display:none;}',
    '#hjsaw-w #hjpi{width:100%;display:block;}',
    '#hjsaw-w #hjuinp{display:none;}',

    /* Analysis screen */
    '#hjsaw-w .anav{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;min-height:360px;text-align:center;}',
    '#hjsaw-w .radar{width:132px;height:132px;position:relative;}',
    '#hjsaw-w .rring{position:absolute;border-radius:50%;border:2px solid;animation:hj-rp2 1.6s ease-in-out infinite;}',
    '#hjsaw-w .rring:nth-child(1){inset:0;border-color:rgba(255,0,0,.85);animation-delay:0s;}',
    '#hjsaw-w .rring:nth-child(2){inset:18px;border-color:rgba(255,50,50,.72);animation-delay:.25s;}',
    '#hjsaw-w .rring:nth-child(3){inset:36px;border-color:rgba(180,0,0,.62);animation-delay:.5s;}',
    '#hjsaw-w .rring:nth-child(4){inset:54px;border-color:rgba(100,0,0,.52);animation-delay:.75s;}',
    '#hjsaw-w .rdot{position:absolute;inset:57px;border-radius:50%;background:rgba(255,255,255,.95);box-shadow:0 0 22px rgba(255,0,0,.6);animation:hj-rdp .9s ease-in-out infinite;}',
    '#hjsaw-w .rsweep{position:absolute;inset:0;border-radius:50%;overflow:hidden;}',
    '#hjsaw-w .rsweep::after{content:"";position:absolute;top:50%;left:50%;width:50%;height:2px;background:linear-gradient(90deg,rgba(255,0,0,.95),transparent);transform-origin:left center;animation:hj-sw 1.5s linear infinite;box-shadow:0 0 12px var(--hj-red);}',
    '@keyframes hj-sw{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}',
    '@keyframes hj-rp2{0%,100%{opacity:.3;transform:scale(.92)}50%{opacity:1;transform:scale(1.07)}}',
    '@keyframes hj-rdp{0%,100%{transform:scale(.78);opacity:.7}50%{transform:scale(1.22);opacity:1}}',
    '#hjsaw-w .atit{color:#fff;font-size:1rem;font-weight:800;}',
    '#hjsaw-w .asub{color:rgba(255,255,255,.38);font-size:.76rem;margin-top:-8px;}',
    '#hjsaw-w .lread{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;width:100%;}',
    '#hjsaw-w .lchip{background:rgba(255,0,0,.03);border:1px solid rgba(255,0,0,.15);border-radius:10px;padding:9px;text-align:center;}',
    '#hjsaw-w .lchip .lv{color:var(--hj-red);font-size:.9rem;font-weight:800;font-variant-numeric:tabular-nums;text-shadow:0 0 8px rgba(255,0,0,.25);}',
    '#hjsaw-w .lchip .ll{color:rgba(255,255,255,.32);font-size:.61rem;margin-top:2px;}',
    '#hjsaw-w .aisteps{width:100%;}',
    '#hjsaw-w .ais{display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.05);color:rgba(255,255,255,.28);font-size:.79rem;font-weight:500;transition:color .3s;}',
    '#hjsaw-w .ais.done{color:rgba(255,77,77,.95);}',
    '#hjsaw-w .ais.cur{color:#fff;text-shadow:0 0 10px rgba(255,0,0,.5);}',
    '#hjsaw-w .aico{width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.64rem;flex-shrink:0;background:rgba(255,255,255,.04);}',
    '#hjsaw-w .ais.done .aico{background:rgba(255,0,0,.15);color:var(--hj-red);}',
    '#hjsaw-w .ais.cur .aico{background:rgba(255,0,0,.2);color:#fff;animation:hj-isp .7s linear infinite;}',
    '@keyframes hj-isp{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}',

    /* Results */
    '#hjsaw-w .resh{background:linear-gradient(135deg,rgba(255,0,0,.12),rgba(255,255,255,.01));border:1px solid rgba(255,0,0,.25);border-radius:var(--hj-rs);padding:14px 16px;display:flex;align-items:flex-start;gap:12px;}',
    '#hjsaw-w .resico{width:42px;height:42px;border-radius:11px;background:linear-gradient(135deg,rgba(255,0,0,.35),rgba(255,255,255,.03));display:flex;align-items:center;justify-content:center;font-size:1.4rem;flex-shrink:0;}',
    '#hjsaw-w .rest{color:#fff;font-size:.9rem;font-weight:800;margin-bottom:2px;}',
    '#hjsaw-w .ress{color:rgba(255,255,255,.42);font-size:.72rem;}',
    '#hjsaw-w .drow{display:flex;flex-wrap:wrap;gap:6px;}',
    '#hjsaw-w .dchip{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:20px;padding:4px 12px;color:rgba(255,255,255,.7);font-size:.69rem;font-weight:700;}',
    '#hjsaw-w .dchip.d{background:rgba(255,0,0,.08);border-color:rgba(255,0,0,.22);color:var(--hj-red);}',
    '#hjsaw-w .dchip.s{background:rgba(255,0,0,.12);border-color:rgba(255,0,0,.35);color:#fff;}',
    '#hjsaw-w .aisum{background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.05);border-radius:var(--hj-rs);padding:14px;}',
    '#hjsaw-w .aisum p{color:rgba(255,255,255,.7);font-size:.81rem;line-height:1.8;margin:0;}',
    '#hjsaw-w .slbl{color:rgba(255,255,255,.38);font-size:.68rem;font-weight:700;letter-spacing:.07em;text-transform:uppercase;}',
    '#hjsaw-w .pg{display:flex;flex-direction:column;gap:9px;}',
    '#hjsaw-w .pc{background:rgba(255,255,255,.02);border:1.5px solid rgba(255,255,255,.05);border-radius:var(--hj-rs);padding:12px;display:flex;align-items:center;gap:12px;cursor:pointer;text-decoration:none;transition:all .25s;}',
    '#hjsaw-w .pc:hover{background:rgba(255,0,0,.08);border-color:rgba(255,0,0,.3);transform:translateX(-3px);}',
    '#hjsaw-w .pimg{width:54px;height:54px;border-radius:10px;flex-shrink:0;background:rgba(255,255,255,.03);display:flex;align-items:center;justify-content:center;font-size:1.75rem;}',
    '#hjsaw-w .pi2{flex:1;min-width:0;}',
    '#hjsaw-w .pname{color:#fff;font-size:.84rem;font-weight:700;margin-bottom:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
    '#hjsaw-w .pdesc{color:rgba(255,255,255,.4);font-size:.7rem;margin-bottom:5px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}',
    '#hjsaw-w .ptags{display:flex;flex-wrap:wrap;gap:4px;}',
    '#hjsaw-w .pt{background:rgba(255,0,0,.08);border:1px solid rgba(255,0,0,.15);color:rgba(255,100,100,.95);font-size:.62rem;font-weight:700;padding:2px 8px;border-radius:10px;}',
    '#hjsaw-w .parr{color:rgba(255,255,255,.15);flex-shrink:0;transition:all .2s;}',
    '#hjsaw-w .pc:hover .parr{transform:translateX(-4px);color:var(--hj-red);}',
    '#hjsaw-w .mrow{display:flex;align-items:center;gap:6px;margin-top:4px;}',
    '#hjsaw-w .mtrk{flex:1;height:3px;background:rgba(255,255,255,.05);border-radius:2px;overflow:hidden;}',
    '#hjsaw-w .mfill{height:100%;border-radius:2px;background:linear-gradient(90deg,var(--hj-red),#7a0000,#ff6666);transition:width 1.3s ease;}',
    '#hjsaw-w .mpct{color:var(--hj-red);font-size:.66rem;font-weight:800;flex-shrink:0;}',
    '#hjsaw-w .va{display:flex;align-items:center;justify-content:center;gap:6px;color:#fff;font-size:.8rem;font-weight:700;text-decoration:none;padding:12px;border-radius:var(--hj-rs);border:1px solid rgba(255,0,0,.25);background:rgba(255,0,0,.05);transition:all .2s;cursor:pointer;}',
    '#hjsaw-w .va:hover{background:rgba(255,0,0,.15);border-color:var(--hj-red);box-shadow:0 0 15px rgba(255,0,0,.25);}',

    /* Footer */
    '#hjsaw-w .wf{padding:13px 18px;background:#030307;border-top:1px solid rgba(255,255,255,.05);display:flex;gap:9px;flex-shrink:0;}',
    '#hjsaw-w .bp{flex:1;background:linear-gradient(135deg,var(--hj-red),#7a0000);color:#fff;border:none;border-radius:var(--hj-rs);padding:12px 18px;font-family:var(--hj-font);font-size:.88rem;font-weight:700;cursor:pointer;transition:all .25s;box-shadow:0 4px 22px rgba(255,0,0,.35);}',
    '#hjsaw-w .bp:hover:not(:disabled){background:linear-gradient(135deg,#ff2222,#990000);transform:translateY(-1px);box-shadow:0 6px 30px rgba(255,0,0,.45);}',
    '#hjsaw-w .bp:disabled{opacity:.25;cursor:not-allowed;transform:none;box-shadow:none;}',
    '#hjsaw-w .bs{background:rgba(255,255,255,.03);color:rgba(255,255,255,.52);border:1.5px solid rgba(255,255,255,.08);border-radius:var(--hj-rs);padding:12px 15px;font-family:var(--hj-font);font-size:.82rem;font-weight:600;cursor:pointer;transition:all .25s;}',
    '#hjsaw-w .bs:hover{background:rgba(255,255,255,.08);color:rgba(255,255,255,.85);}',
    '#hjsaw-w .pow{text-align:center;color:rgba(255,255,255,.12);font-size:.62rem;padding:5px 0 3px;flex-shrink:0;background:#030307;}',
    '#hjsaw-w .pow span{color:var(--hj-red);}'
  ].join('\n');
  document.head.appendChild(css);

  /* ══════════════════════════════════════════════════
     HTML – كل العناصر مدمجة
  ══════════════════════════════════════════════════ */
  var root = document.createElement('div');
  root.id = 'hjsaw';
  root.innerHTML =
    /* Backdrop */
    '<div id="hjsaw-bd" onclick="hjSA_close()"></div>' +

    /* Floating button */
    '<button id="hjsaw-btn" onclick="hjSA_toggle()" aria-label="محلل المكان الذكي – حاجات سما">' +
      '<svg class="hj-bico" viewBox="0 0 38 38" fill="none">' +
        '<rect x="4" y="10" width="30" height="20" rx="2.5" stroke="white" stroke-width="1.7"/>' +
        '<line x1="4" y1="21" x2="34" y2="21" stroke="rgba(0,245,255,.7)" stroke-width="1.2" stroke-dasharray="2.5,2.5"/>' +
        '<rect x="9" y="22" width="10" height="5" rx="1.2" fill="rgba(245,166,35,.9)"/>' +
        '<rect x="9" y="19.5" width="2.2" height="3.5" rx="1" fill="rgba(245,166,35,.9)"/>' +
        '<rect x="16.8" y="19.5" width="2.2" height="3.5" rx="1" fill="rgba(245,166,35,.9)"/>' +
        '<rect x="22" y="12" width="5" height="7" rx="1" stroke="rgba(255,255,255,.5)" stroke-width="1.2"/>' +
        '<circle cx="4" cy="10" r="1.6" fill="rgba(0,245,255,.9)"/>' +
        '<circle cx="34" cy="10" r="1.6" fill="rgba(0,245,255,.9)"/>' +
        '<circle cx="4" cy="30" r="1.6" fill="rgba(0,245,255,.9)"/>' +
        '<circle cx="34" cy="30" r="1.6" fill="rgba(0,245,255,.9)"/>' +
        '<circle cx="29" cy="6.5" r="3.8" stroke="rgba(255,255,255,.52)" stroke-width="1.4"/>' +
        '<circle cx="29" cy="6.5" r="1.6" fill="rgba(255,255,255,.72)"/>' +
        '<path d="M8 5.5 L9.2 3 L10.4 5.5 L9.2 8 Z" fill="rgba(245,166,35,.92)"/>' +
      '</svg>' +
      '<div class="hj-nring">AI</div>' +
    '</button>' +

    /* Widget panel */
    '<div id="hjsaw-w" role="dialog" aria-label="محلل المكان الذكي">' +
      /* Header */
      '<div class="wh">' +
        '<div class="wht">' +
          '<div class="whb">' +
            '<div class="whl"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="white" stroke-width="2"/><rect x="9" y="12" width="6" height="10" stroke="white" stroke-width="1.5" rx="1"/></svg></div>' +
            '<div><div class="whn">حاجات سما</div><div class="whs">📷 محلل المكان + Gemini AI</div></div>' +
          '</div>' +
          '<button class="whc" onclick="hjSA_close()"><svg width="13" height="13" viewBox="0 0 13 13"><path d="M1 1l11 11M12 1L1 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>' +
        '</div>' +
        '<div class="whtit">🏠 صوّر غرفتك – الليزر يحلل المساحة!</div>' +
        '<div class="whdesc">Gemini AI يقترح أثاث من حاجات سما مناسب لمساحتك ✨</div>' +
        '<div class="sbar"></div>' +
      '</div>' +
      '<div class="pw"><div class="pb" id="hjprog" style="width:25%"></div></div>' +

      /* Steps body */
      '<div class="wb">' +
        /* Step 1 */
        '<div class="step active" id="hjs1">' +
          '<div class="ls">الخطوة 1 من 3</div>' +
          '<div class="lt">اختار <em>نوع الغرفة</em> اللي هتصورها</div>' +
          '<div class="rg">' +
            '<div class="rc" onclick="hjPickRoom(this,\'غرفة معيشة\')"><div class="rci">🛋️</div><div class="rcl">معيشة</div></div>' +
            '<div class="rc" onclick="hjPickRoom(this,\'غرفة نوم\')"><div class="rci">🛏️</div><div class="rcl">نوم</div></div>' +
            '<div class="rc" onclick="hjPickRoom(this,\'مكتب\')"><div class="rci">💼</div><div class="rcl">مكتب</div></div>' +
            '<div class="rc" onclick="hjPickRoom(this,\'كوفي كورنير\')"><div class="rci">☕</div><div class="rcl">كوفي كورنير</div></div>' +
            '<div class="rc" onclick="hjPickRoom(this,\'ريسبشن\')"><div class="rci">🏢</div><div class="rcl">ريسبشن</div></div>' +
            '<div class="rc" onclick="hjPickRoom(this,\'ركنة خارجية\')"><div class="rci">🌿</div><div class="rcl">خارجية</div></div>' +
          '</div>' +
          '<div class="dim-inputs">' +
            '<div class="dim-inputs-title">📐 أبعاد المكان (اختياري لمساعدة الـ AI)</div>' +
            '<div class="dim-inputs-grid">' +
              '<div class="dim-field">' +
                '<label>العرض (متر)</label>' +
                '<input type="number" id="hj-user-width" placeholder="مثال: 4.5" step="0.1" min="1" max="20"/>' +
              '</div>' +
              '<div class="dim-field">' +
                '<label>الطول (متر)</label>' +
                '<input type="number" id="hj-user-length" placeholder="مثال: 5.2" step="0.1" min="1" max="20"/>' +
              '</div>' +
              '<div class="dim-field">' +
                '<label>الارتفاع (متر)</label>' +
                '<input type="number" id="hj-user-height" placeholder="مثال: 2.8" step="0.1" min="1" max="10"/>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="info-tip"><span style="font-size:1.2rem;flex-shrink:0">💡</span><p>اختار نوع الغرفة والأبعاد (إذا أردت)، ثم صوّر غرفتك ليقوم الذكاء الاصطناعي بتحليل الأبعاد واقتراح الأثاث المناسب!</p></div>' +
        '</div>' +

        /* Step 2 */
        '<div class="step" id="hjs2">' +
          '<div class="ls">الخطوة 2 من 3</div>' +
          '<div class="lt" id="hjs2t">صوّر <em id="hjrnt">الغرفة</em> – الليزر شغال!</div>' +
          '<div class="cam-wrap" id="hjcwrap">' +
            '<video id="hjcv" autoplay playsinline webkit-playsinline muted x5-playsinline></video>' +
            '<canvas id="hjcc"></canvas>' +
            '<div class="cstat"><div class="dot"></div><span>ليزر AI نشط – مسح المساحة</span></div>' +
            '<div class="arc-ui"><div class="arc tl"></div><div class="arc tr"></div><div class="arc bl"></div><div class="arc br"></div></div>' +
            '<div class="crosshair"></div>' +
            '<div class="cerr" id="hjcerr" style="display:none">' +
              '<div class="cerr-ico">📵</div>' +
              '<div class="cerr-txt" id="hjcerr-txt">مش قادر يوصل للكاميرا.<br/>اسمح بالوصول في إعدادات المتصفح.</div>' +
              '<button class="cerr-btn" onclick="hjStartCam()">🔄 حاول تاني</button>' +
              '<button class="cerr-btn sec" style="margin-top:6px" onclick="hjUseUpload()">📂 ارفع صورة بدل الكاميرا</button>' +
            '</div>' +
          '</div>' +
          '<div id="hjpw2"><img id="hjpi" alt="الصورة الملتقطة"/>' +
            '<div style="position:absolute;top:10px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.72);border:1px solid #f5a623;border-radius:20px;padding:4px 12px;color:#f5a623;font-size:.67rem;font-weight:700;white-space:nowrap;">📸 تم التصوير!</div>' +
            '<button onclick="hjRetakePhoto()" style="position:absolute;top:10px;right:10px;width:30px;height:30px;border-radius:50%;border:none;background:rgba(0,0,0,.62);color:#fff;cursor:pointer;font-size:.9rem;">↺</button>' +
          '</div>' +
          '<input type="file" id="hjuinp" accept="image/*" onchange="hjHandleUpload(event)"/>' +
          '<div class="cam-acts" id="hjcacts">' +
            '<div class="cam-tip"><strong>وجّه الكاميرا</strong> للغرفة كاملة.<br/>الليزر بيحسب الأبعاد تلقائياً ✨</div>' +
            '<button id="hjflipbt" onclick="hjFlipCam()" title="قلب الكاميرا"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15"/></svg></button>' +
            '<button id="hjshubt" onclick="hjCapturePhoto()"><div class="so"></div><div class="si"></div></button>' +
          '</div>' +
          '<div id="hjpcinfo" style="display:none; width:100%; margin-top:8px;">' +
            '<button onclick="hjGoNext()" class="bp" style="width:100%; background:linear-gradient(135deg,var(--hj-red),#7a0000); box-shadow:0 0 15px rgba(255,0,0,0.4); margin-bottom: 8px;">🔍 ابدأ تحليل المكان بالذكاء الاصطناعي</button>' +
          '</div>' +
        '</div>' +

        /* Step 3 */
        '<div class="step" id="hjs3">' +
          '<div class="anav">' +
            '<div class="radar"><div class="rring"></div><div class="rring"></div><div class="rring"></div><div class="rring"></div><div class="rsweep"></div><div class="rdot"></div></div>' +
            '<div><div class="atit">🤖 Gemini AI يحلل الصورة...</div><div class="asub">يمسح الأبعاد والعناصر والستايل</div></div>' +
            '<div class="lread">' +
              '<div class="lchip"><div class="lv" id="hjlw">--</div><div class="ll">العرض (م)</div></div>' +
              '<div class="lchip"><div class="lv" id="hjll2">--</div><div class="ll">الطول (م)</div></div>' +
              '<div class="lchip"><div class="lv" id="hjlh">--</div><div class="ll">الارتفاع (م)</div></div>' +
            '</div>' +
            '<div class="aisteps">' +
              '<div class="ais cur" id="hjas1"><div class="aico">⟳</div><span>إرسال الصورة لـ Gemini AI...</span></div>' +
              '<div class="ais" id="hjas2"><div class="aico">○</div><span>تحليل حجم وأبعاد المساحة</span></div>' +
              '<div class="ais" id="hjas3"><div class="aico">○</div><span>رصد الأثاث الموجود والمفقود</span></div>' +
              '<div class="ais" id="hjas4"><div class="aico">○</div><span>تحديد ستايل وألوان الغرفة</span></div>' +
              '<div class="ais" id="hjas5"><div class="aico">○</div><span>البحث في كتالوج حاجات سما</span></div>' +
              '<div class="ais" id="hjas6"><div class="aico">○</div><span>إعداد التوصيات الشخصية</span></div>' +
            '</div>' +
          '</div>' +
        '</div>' +

        /* Step 4 */
        '<div class="step" id="hjs4">' +
          '<div class="resh"><div class="resico">✅</div><div><div class="rest">التحليل اتم بنجاح!</div><div class="ress" id="hjrss">الـ AI اختار أفضل منتجات لمساحتك</div></div></div>' +
          '<div class="drow" id="hjdchips"></div>' +
          '<div class="aisum"><p id="hjaisum">---</p></div>' +
          '<div class="slbl">🛋️ المنتجات الموصى بها من حاجات سما</div>' +
          '<div class="pg" id="hjpg"></div>' +
          '<a class="va" href="https://7agatsamaa.wuiltstore.com/en/shop" target="_blank" rel="noopener"><span>تصفح كل منتجات حاجات سما</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>' +
        '</div>' +
      '</div>' +

      '<div class="wf" id="hjwf"><button class="bs" id="hjbback" onclick="hjGoBack()" style="display:none">← رجوع</button><button class="bp" id="hjbnext" onclick="hjGoNext()" disabled>التالي →</button></div>' +
      '<div class="pow">مشغّل بـ <span>Gemini AI + Neon Laser</span> | حاجات سما © 2025</div>' +
    '</div>';

  document.body.appendChild(root);

  /* ══════════════════════════════════════════════════
     STATE & CATALOG
  ══════════════════════════════════════════════════ */
  var hjStep = 1, hjRoomName = '', hjCaptured = false, hjDataURL = null;
  var hjStream = null, hjFacing = 'environment', hjIsOpen = false, hjRaf = null, hjCamOK = false;
  var geminiKey = GKEY;

  var HJ_CAT = {
    'غرفة معيشة': [
      {e:'🛋️',n:'ركنة انتريه مودرن',d:'ركنة فاخرة مريحة للعيلة والضيوف – أحجام متعددة',t:['ركنة','مودرن'],m:97,u:'https://7agatsamaa.wuiltstore.com/en/product/ركنات-انتريه'},
      {e:'🪞',n:'مرايا ديكورية',d:'مرايا بتصاميم عصرية تضيف عمق وأناقة',t:['مرايا','ديكور'],m:89,u:'https://7agatsamaa.wuiltstore.com/en/product/المرايات'},
      {e:'🕐',n:'ساعة حائط ديزاين',d:'ساعات جدارية مودرن تكمّل ديكور الغرفة',t:['ساعات'],m:83,u:'https://7agatsamaa.wuiltstore.com/en/product/قسم-الساعات'},
      {e:'🪑',n:'ترابيزة سنتر أنيقة',d:'ترابيزات وسطانية راقية للانتريه',t:['ترابيزات'],m:79,u:'https://7agatsamaa.wuiltstore.com/en/product/قسم-الترابيزات'}
    ],
    'غرفة نوم': [
      {e:'🛏️',n:'سرير نوم كينج مودرن',d:'سراير فاخرة بتصاميم عصرية',t:['سراير'],m:97,u:'https://7agatsamaa.wuiltstore.com/en/product/قسم-السراير'},
      {e:'👗',n:'دولاب ملابس حديث',d:'دواليب بمساحة تخزين واسعة وتصميم أنيق',t:['دواليب'],m:91,u:'https://7agatsamaa.wuiltstore.com/en/product/قسم-الدواليب'},
      {e:'💄',n:'تسريحة مودرن',d:'تسريحات بمرايا وأدراج تنظيمية',t:['تسريحات'],m:86,u:'https://7agatsamaa.wuiltstore.com/en/product/تسريحات'},
      {e:'👠',n:'جزامة أحذية',d:'وحدات تخزين أحذية منظمة وعصرية',t:['جزامات'],m:74,u:'https://7agatsamaa.wuiltstore.com/en/product/جزمات'}
    ],
    'مكتب': [
      {e:'🖥️',n:'ترابيزة شاشة احترافية',d:'مكاتب لشاشات العمل من المنزل',t:['مكاتب'],m:96,u:'https://7agatsamaa.wuiltstore.com/en/product/قسم-المكاتب'},
      {e:'🪑',n:'كرسي مكتب مريح',d:'كراسي ارغونومية بدعم لأسفل الظهر',t:['كراسي'],m:90,u:'https://7agatsamaa.wuiltstore.com/en/product/قسم-الكراسى'},
      {e:'🗂️',n:'وحدة أدراج',d:'وحدات أدراج لتنظيم الملفات والأدوات',t:['أدراج'],m:82,u:'https://7agatsamaa.wuiltstore.com/en/product/وحدات-أدراج'},
      {e:'🪞',n:'مرايا المكتب',d:'مرايا ديكورية للمساحات المهنية',t:['مرايا'],m:70,u:'https://7agatsamaa.wuiltstore.com/en/product/المرايات'}
    ],
    'كوفي كورنير': [
      {e:'☕',n:'طقم كوفي كورنير',d:'طاولات وكراسي بار لأجواء الكافيه',t:['كوفي'],m:98,u:'https://7agatsamaa.wuiltstore.com/en/product/كوفى-كورنير'},
      {e:'🪑',n:'كراسي بار ستايليش',d:'كراسي بار مودرن راقية',t:['كراسي','بار'],m:88,u:'https://7agatsamaa.wuiltstore.com/en/product/قسم-الكراسى'},
      {e:'🕐',n:'ساعة تراثية',d:'ساعات جدار بستايل كافيه',t:['ساعات'],m:78,u:'https://7agatsamaa.wuiltstore.com/en/product/قسم-الساعات'},
      {e:'🪞',n:'مرايا كافيه',d:'مرايا كلاسيكية للكوفي كورنير',t:['مرايا'],m:73,u:'https://7agatsamaa.wuiltstore.com/en/product/المرايات'}
    ],
    'ريسبشن': [
      {e:'🛋️',n:'ركنة استقبال فاخرة',d:'ركنات راقية تعكس احترافية المكان',t:['ركنة'],m:95,u:'https://7agatsamaa.wuiltstore.com/en/product/ركنات-انتريه'},
      {e:'🪞',n:'مرايا ضخمة',d:'مرايا كبيرة تعطي إحساساً بالاتساع',t:['مرايا'],m:88,u:'https://7agatsamaa.wuiltstore.com/en/product/المرايات'},
      {e:'🪑',n:'كراسي انتظار',d:'كراسي أنيقة مريحة لغرف الانتظار',t:['كراسي'],m:82,u:'https://7agatsamaa.wuiltstore.com/en/product/قسم-الكراسى'},
      {e:'🕐',n:'ساعة جدار كبيرة',d:'ساعات جدارية ضخمة بهيبة المكان',t:['ساعات'],m:76,u:'https://7agatsamaa.wuiltstore.com/en/product/قسم-الساعات'}
    ],
    'ركنة خارجية': [
      {e:'🌿',n:'أثاث خارجي مريح',d:'كراسي وطاولات للحديقة والبلكونة',t:['خارجي'],m:93,u:'https://7agatsamaa.wuiltstore.com/en/product/ركنات-انتريه'},
      {e:'☕',n:'كوفي كورنير خارجي',d:'ركنة قهوة في الهواء الطلق',t:['كوفي'],m:86,u:'https://7agatsamaa.wuiltstore.com/en/product/كوفى-كورنير'},
      {e:'🪑',n:'كراسي تراس',d:'كراسي مقاومة للعوامل الجوية',t:['كراسي'],m:80,u:'https://7agatsamaa.wuiltstore.com/en/product/قسم-الكراسى'}
    ]
  };
  var HJ_DIMS = {'غرفة معيشة':{w:[4.2,5.8],l:[4.8,6.5],h:[2.7,3.1]},'غرفة نوم':{w:[3.2,4.5],l:[3.8,5.2],h:[2.6,3.0]},'مكتب':{w:[2.8,4.0],l:[3.0,4.5],h:[2.6,3.0]},'كوفي كورنير':{w:[2.5,3.5],l:[2.8,4.0],h:[2.5,3.0]},'ريسبشن':{w:[4.5,7.0],l:[5.0,8.0],h:[3.0,4.0]},'ركنة خارجية':{w:[3.0,5.0],l:[3.5,6.0],h:[null,null]}};
  var HJ_DET = {'غرفة معيشة':['جدران فاتحة','إضاءة طبيعية','مساحة واسعة'],'غرفة نوم':['جدران محايدة','نافذة جانبية','مساحة متوسطة'],'مكتب':['إضاءة ساطعة','جدران بيضاء','مساحة صغيرة'],'كوفي كورنير':['زاوية دافئة','إضاءة خافتة'],'ريسبشن':['مدخل رئيسي','جدران عالية'],'ركنة خارجية':['هواء طلق','إضاءة شمسية']};
  var HJ_STY = {'غرفة معيشة':'مودرن مينيمال','غرفة نوم':'كلاسيك مودرن','مكتب':'إسكانديناف','كوفي كورنير':'بوهيمي دافئ','ريسبشن':'فاخر كلاسيك','ركنة خارجية':'طبيعي بوهيمي'};
  var HJ_RECO = {'ركنات':'غرفة معيشة','مرايا':'غرفة معيشة','ساعات':'غرفة معيشة','ترابيزات':'غرفة معيشة','سراير':'غرفة نوم','دواليب':'غرفة نوم','تسريحات':'غرفة نوم','مكاتب':'مكتب','كراسي':'مكتب','كوفي كورنير':'كوفي كورنير'};

  /* ══════════════════════════════════════════════════
     OPEN / CLOSE
  ══════════════════════════════════════════════════ */
  window.hjSA_toggle = function () { hjIsOpen ? hjSA_close() : hjSA_open(); };
  window.hjSA_open   = function () { hjIsOpen = true;  document.getElementById('hjsaw-w').classList.add('open'); document.getElementById('hjsaw-bd').classList.add('vis'); document.getElementById('hjsaw-btn').classList.add('open'); };
  window.hjSA_close  = function () { hjIsOpen = false; document.getElementById('hjsaw-w').classList.remove('open'); document.getElementById('hjsaw-bd').classList.remove('vis'); document.getElementById('hjsaw-btn').classList.remove('open'); hjStopCam(); };
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && hjIsOpen) hjSA_close(); });

  /* ══════════════════════════════════════════════════
     ROOM / NAV
  ══════════════════════════════════════════════════ */
  window.hjPickRoom = function (el, name) {
    document.querySelectorAll('#hjsaw-w .rc').forEach(function (c) { c.classList.remove('sel'); });
    el.classList.add('sel'); hjRoomName = name;
    document.getElementById('hjbnext').disabled = false;
  };
  window.hjGoNext = function () {
    if (hjStep === 1) { hjShowStep(2); hjStartCam(); }
    else if (hjStep === 2 && hjCaptured) { hjShowStep(3); hjRunAnalysis(); }
    else if (hjStep === 4) { window.open('https://7agatsamaa.wuiltstore.com/en/shop', '_blank'); }
  };
  window.hjGoBack = function () {
    if (hjStep === 2) { hjStopCam(); hjShowStep(1); }
    else if (hjStep === 4) { hjShowStep(1); hjCaptured = false; hjDataURL = null; }
  };
  function hjShowStep(n) {
    document.querySelectorAll('#hjsaw-w .step').forEach(function (s) { s.classList.remove('active'); });
    document.getElementById('hjs' + n).classList.add('active'); hjStep = n;
    document.getElementById('hjprog').style.width = ({1:25,2:55,3:80,4:100})[n] + '%';
    var bb = document.getElementById('hjbback'), bn = document.getElementById('hjbnext'), wf = document.getElementById('hjwf');
    bb.style.display = (n === 2 || n === 4) ? 'block' : 'none';
    if (n === 1)      { bn.textContent = 'التالي →'; bn.disabled = !hjRoomName; wf.style.display = 'flex'; }
    else if (n === 2) { bn.textContent = '🔍 تحليل المكان'; bn.disabled = !hjCaptured; document.getElementById('hjs2t').innerHTML = 'صوّر <em>' + hjRoomName + '</em> – الليزر شغال!'; wf.style.display = 'flex'; }
    else if (n === 3) { wf.style.display = 'none'; }
    else if (n === 4) { bn.textContent = '🛍️ تسوق الآن'; bn.disabled = false; wf.style.display = 'flex'; }
  }

  /* ══════════════════════════════════════════════════
     CAMERA ENGINE – Cross-Platform
  ══════════════════════════════════════════════════ */
  var UA = navigator.userAgent || '';
  var IS_IOS     = /iphone|ipad|ipod/i.test(UA);
  var IS_SAMSUNG = /samsungbrowser/i.test(UA);
  var IS_UC      = /ucbrowser/i.test(UA);
  var IS_WECHAT  = /micromessenger/i.test(UA);

  /* Polyfill getUserMedia */
  (function () {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) return;
    navigator.mediaDevices = navigator.mediaDevices || {};
    var gUM = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    if (!gUM) { navigator.mediaDevices.getUserMedia = null; return; }
    navigator.mediaDevices.getUserMedia = function (c) { return new Promise(function (res, rej) { gUM.call(navigator, c, res, rej); }); };
  })();

  function hjShowCamErr(msg) {
    document.getElementById('hjcerr-txt').innerHTML = msg || 'خطأ غير متوقع.';
    document.getElementById('hjcerr').style.display = 'flex';
  }
  function hjCamErrMsg(name) {
    if (name === 'NotAllowedError' || name === 'PermissionDeniedError')
      return IS_IOS ? 'رفضت الإذن للكاميرا 🚫<br/><strong>الإعدادات → Safari → الكاميرا → اسمح</strong>'
                    : 'رفضت الإذن للكاميرا 🚫<br/>اضغط 🔒 في شريط العنوان وفعّل الكاميرا.';
    if (name === 'NotFoundError' || name === 'DevicesNotFoundError') return 'مفيش كاميرا على الجهاز 📵<br/>ارفع صورة بدلاً من ذلك 📂';
    if (name === 'NotReadableError' || name === 'AbortError') return 'الكاميرا مشغولة في تطبيق تاني 🔄<br/>أغلق التطبيقات الأخرى وحاول.';
    if (name === 'SecurityError') return '⚠️ الكاميرا تحتاج HTTPS.<br/>تأكد أن الموقع يعمل على <strong>https://</strong>';
    return null;
  }
  function hjConstraints() {
    if (IS_WECHAT || IS_UC) return [{video:{facingMode:'environment'},audio:false},{video:true,audio:false}];
    if (IS_SAMSUNG) return [{video:{facingMode:{exact:'environment'}},audio:false},{video:{facingMode:'environment'},audio:false},{video:true,audio:false}];
    if (IS_IOS) return [{video:{facingMode:{ideal:hjFacing},width:{ideal:1280},height:{ideal:960}},audio:false},{video:{facingMode:{ideal:hjFacing}},audio:false},{video:true,audio:false}];
    return [{video:{facingMode:{ideal:hjFacing},width:{ideal:1280},height:{ideal:720}},audio:false},{video:{facingMode:{ideal:hjFacing}},audio:false},{video:{facingMode:hjFacing},audio:false},{video:true,audio:false}];
  }

  window.hjStartCam = function () {
    hjStopCam();
    document.getElementById('hjcerr').style.display = 'none';
    document.getElementById('hjpw2').style.display = 'none';
    document.getElementById('hjcv').style.display = 'block';
    document.getElementById('hjcc').style.display = 'block';
    document.getElementById('hjcacts').style.display = 'flex';
    document.getElementById('hjpcinfo').style.display = 'none';
    document.getElementById('hjbnext').disabled = true;
    hjCaptured = false;
    var isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1' || location.hostname === '';
    if (location.protocol !== 'https:' && !isLocal) { hjShowCamErr('⚠️ الكاميرا تحتاج HTTPS.<br/>تأكد أن الموقع يعمل على <strong>https://</strong>'); return; }
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { hjShowCamErr(IS_WECHAT ? '📵 الكاميرا لا تعمل داخل WeChat. افتح الرابط في Chrome أو Safari.' : 'متصفحك لا يدعم الكاميرا. جرب Chrome أو Safari.'); return; }
    var cs = hjConstraints();
    function tryNext(i) {
      if (i >= cs.length) { hjShowCamErr(IS_IOS ? 'تعذّر الوصول للكاميرا.<br/><strong>الإعدادات → Safari → الكاميرا → اسمح</strong>' : 'تعذّر الوصول للكاميرا. تأكد من منح الإذن 🔒'); return; }
      navigator.mediaDevices.getUserMedia(cs[i])
        .then(function (s) {
          hjStream = s;
          var v = document.getElementById('hjcv');
          if ('srcObject' in v) v.srcObject = s; else try { v.src = (window.URL || window.webkitURL).createObjectURL(s); } catch(x){ v.src = s; }
          v.muted = true; v.volume = 0;
          v.onloadedmetadata = function () { hjPlayVid(v); };
          v.oncanplay = function () { if (!hjCamOK) hjPlayVid(v); };
          v._hjt = setTimeout(function () { if (!hjCamOK) { hjStopCam(); tryNext(i + 1); } }, 6000);
        })
        .catch(function (e) { var m = hjCamErrMsg(e.name); if (m) hjShowCamErr(m); else tryNext(i + 1); });
    }
    tryNext(0);
  };
  function hjPlayVid(v) {
    if (v._hjt) { clearTimeout(v._hjt); v._hjt = null; }
    v.setAttribute('playsinline', ''); v.setAttribute('webkit-playsinline', ''); v.muted = true;
    var p; try { p = v.play(); } catch(x) { hjCamOK = true; hjDrawLaser(); return; }
    if (!p) { hjCamOK = true; hjDrawLaser(); return; }
    p.then(function () { hjCamOK = true; hjDrawLaser(); })
     .catch(function (pe) {
       if (pe.name === 'NotAllowedError') {
         hjShowCamErr('اضغط على الشاشة لتشغيل الكاميرا 👆');
         document.getElementById('hjcwrap').addEventListener('click', function tap() {
           document.getElementById('hjcwrap').removeEventListener('click', tap);
           document.getElementById('hjcerr').style.display = 'none';
           var p2 = v.play(); if (p2) p2.then(function () { hjCamOK = true; hjDrawLaser(); }).catch(function(){}); else { hjCamOK = true; hjDrawLaser(); }
         });
       } else hjShowCamErr('تعذّر تشغيل الكاميرا. ارفع صورة بدلاً من ذلك 📂');
     });
  }
  function hjStopCam() {
    hjCamOK = false;
    if (hjRaf) { cancelAnimationFrame(hjRaf); hjRaf = null; }
    if (hjStream) { hjStream.getTracks().forEach(function (t) { t.stop(); }); hjStream = null; }
  }
  window.hjFlipCam    = function () { hjFacing = hjFacing === 'environment' ? 'user' : 'environment'; hjStartCam(); };
  window.hjUseUpload  = function () { document.getElementById('hjuinp').click(); };
  window.hjHandleUpload = function (ev) {
    var f = ev.target.files[0]; if (!f) return;
    var r = new FileReader();
    r.onload = function (e) {
      hjDataURL = e.target.result;
      document.getElementById('hjpi').src = hjDataURL;
      document.getElementById('hjpw2').style.display = 'block';
      document.getElementById('hjcv').style.display = 'none';
      document.getElementById('hjcc').style.display = 'none';
      document.getElementById('hjcerr').style.display = 'none';
      document.getElementById('hjcacts').style.display = 'none';
      document.getElementById('hjpcinfo').style.display = 'block';
      hjCaptured = true; document.getElementById('hjbnext').disabled = false;
      setTimeout(function () {
        var wb = document.querySelector('#hjsaw-w .wb');
        if (wb) wb.scrollTo({ top: wb.scrollHeight, behavior: 'smooth' });
      }, 120);
    };
    r.readAsDataURL(f);
  };
  window.hjCapturePhoto = function () {
    var v = document.getElementById('hjcv');
    var tmp = document.createElement('canvas');
    tmp.width = v.videoWidth || 640; tmp.height = v.videoHeight || 480;
    tmp.getContext('2d').drawImage(v, 0, 0);
    hjDataURL = tmp.toDataURL('image/jpeg', 0.92);
    var fl = document.createElement('div');
    fl.style.cssText = 'position:absolute;inset:0;background:#fff;z-index:60;opacity:.9;pointer-events:none;transition:opacity .35s;border-radius:inherit;';
    document.getElementById('hjcwrap').appendChild(fl);
    setTimeout(function () { fl.style.opacity = 0; setTimeout(function () { fl.remove(); }, 380); }, 40);
    document.getElementById('hjpi').src = hjDataURL;
    document.getElementById('hjpw2').style.display = 'block';
    document.getElementById('hjcv').style.display = 'none';
    document.getElementById('hjcc').style.display = 'none';
    document.getElementById('hjcacts').style.display = 'none';
    document.getElementById('hjpcinfo').style.display = 'block';
    hjCaptured = true; document.getElementById('hjbnext').disabled = false;
    hjCamOK = false; if (hjRaf) { cancelAnimationFrame(hjRaf); hjRaf = null; } hjStopCam();
    setTimeout(function () {
      var wb = document.querySelector('#hjsaw-w .wb');
      if (wb) wb.scrollTo({ top: wb.scrollHeight, behavior: 'smooth' });
    }, 120);
  };
  window.hjRetakePhoto = function () {
    hjCaptured = false; hjDataURL = null;
    document.getElementById('hjpw2').style.display = 'none';
    document.getElementById('hjpcinfo').style.display = 'none';
    document.getElementById('hjbnext').disabled = true;
    hjStartCam();
  };

  /* ══════════════════════════════════════════════════
     NEON LASER CANVAS
  ══════════════════════════════════════════════════ */
  function hjDrawLaser() {
    var cv = document.getElementById('hjcc'), ctx = cv.getContext('2d');
    var dims = HJ_DIMS[hjRoomName] || {w:[4,6],l:[5,7],h:[2.7,3.2]};
    var dW = (dims.w[0] + Math.random()*(dims.w[1]-dims.w[0])).toFixed(1);
    var dL = (dims.l[0] + Math.random()*(dims.l[1]-dims.l[0])).toFixed(1);
    var dH = dims.h[0] != null ? (dims.h[0] + Math.random()*(dims.h[1]-dims.h[0])).toFixed(1) : '--';
    var t = 0, rev = 0;
    var ri = setInterval(function () { rev = Math.min(rev + 0.04, 1); }, 90);
    var dots = [];
    for (var i = 0; i < 7; i++) dots.push({x:.08+Math.random()*.84,y:.08+Math.random()*.84,vx:(Math.random()-.5)*.0025,vy:(Math.random()-.5)*.0025});
    var cols = ['rgba(0,245,255,','rgba(57,255,20,','rgba(245,166,35,','rgba(255,0,150,','rgba(77,121,255,','rgba(255,255,0,','rgba(255,255,255,'];
    function frame() {
      if (!hjCamOK) { clearInterval(ri); return; }
      cv.width = cv.offsetWidth; cv.height = cv.offsetHeight;
      var W = cv.width, H = cv.height;
      ctx.clearRect(0, 0, W, H); t += 0.018;
      ctx.strokeStyle = 'rgba(0,245,255,.055)'; ctx.lineWidth = 1;
      for (var gi = 0; gi <= 14; gi++) { var gx = W/14*gi; ctx.beginPath(); ctx.moveTo(gx,0); ctx.lineTo(gx,H); ctx.stroke(); }
      for (var gj = 0; gj <= 10; gj++) { var gy = H/10*gj; ctx.beginPath(); ctx.moveTo(0,gy); ctx.lineTo(W,gy); ctx.stroke(); }
      var sy = H*(.12+.76*((Math.sin(t*1.1)+1)/2));
      var sg = ctx.createLinearGradient(0,sy,W,sy);
      sg.addColorStop(0,'rgba(0,245,255,0)'); sg.addColorStop(.28,'rgba(0,245,255,.55)'); sg.addColorStop(.5,'rgba(200,255,255,.95)'); sg.addColorStop(.72,'rgba(0,245,255,.55)'); sg.addColorStop(1,'rgba(0,245,255,0)');
      ctx.save(); ctx.shadowColor='rgba(0,245,255,.85)'; ctx.shadowBlur=14; ctx.strokeStyle=sg; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(0,sy); ctx.lineTo(W,sy); ctx.stroke(); ctx.restore();
      if (rev > .12) {
        var a1 = Math.min(1,(rev-.12)*1.5), dy = H-26, mg = 28;
        ctx.save(); ctx.strokeStyle='rgba(57,255,20,'+(0.75*a1)+')'; ctx.lineWidth=1.6; ctx.shadowColor='rgba(57,255,20,.85)'; ctx.shadowBlur=10;
        ctx.beginPath(); ctx.moveTo(mg,dy); ctx.lineTo(W-mg,dy); ctx.stroke();
        hjArrow(ctx,mg,dy,1,0,'rgba(57,255,20,'+a1+')'); hjArrow(ctx,W-mg,dy,-1,0,'rgba(57,255,20,'+a1+')');
        ctx.fillStyle='rgba(57,255,20,'+a1+')'; ctx.font='bold 12px Cairo,sans-serif'; ctx.textAlign='center'; ctx.shadowBlur=12; ctx.fillText('← '+dW+' م →',W/2,dy-7); ctx.restore();
      }
      if (rev > .35) {
        var a2=Math.min(1,(rev-.35)*1.8),dx=W-20,mt=28,mb=H-46;
        ctx.save(); ctx.strokeStyle='rgba(245,166,35,'+(0.72*a2)+')'; ctx.lineWidth=1.6; ctx.shadowColor='rgba(245,166,35,.85)'; ctx.shadowBlur=10;
        ctx.beginPath(); ctx.moveTo(dx,mt); ctx.lineTo(dx,mb); ctx.stroke();
        hjArrow(ctx,dx,mt,0,1,'rgba(245,166,35,'+a2+')'); hjArrow(ctx,dx,mb,0,-1,'rgba(245,166,35,'+a2+')');
        ctx.save(); ctx.translate(dx-9,(mt+mb)/2); ctx.rotate(-Math.PI/2);
        ctx.fillStyle='rgba(245,166,35,'+a2+')'; ctx.font='bold 12px Cairo,sans-serif'; ctx.textAlign='center'; ctx.shadowBlur=12; ctx.fillText('↕ '+dL+' م',0,0); ctx.restore(); ctx.restore();
      }
      for (var di = 0; di < dots.length; di++) {
        var d = dots[di]; d.x += d.vx; d.y += d.vy;
        if (d.x<.04||d.x>.96) d.vx*=-1; if (d.y<.04||d.y>.96) d.vy*=-1;
        var px=d.x*W,py=d.y*H,pp=(Math.sin(t*3+di*1.1)+1)/2,da=.38+.55*pp,c=cols[di%cols.length],sz=7+3*pp;
        ctx.save(); ctx.strokeStyle=c+da+')'; ctx.lineWidth=1.3; ctx.shadowColor=c+'.8)'; ctx.shadowBlur=9;
        ctx.beginPath(); ctx.moveTo(px-sz,py); ctx.lineTo(px+sz,py); ctx.moveTo(px,py-sz); ctx.lineTo(px,py+sz); ctx.stroke();
        ctx.beginPath(); ctx.arc(px,py,2.5+1.5*pp,0,Math.PI*2); ctx.stroke(); ctx.restore();
      }
      var cs = 18+4*Math.sin(t*2.2), ca = .48+.38*Math.sin(t*2.2);
      [[6,6],[W-6,6],[6,H-6],[W-6,H-6]].forEach(function(cp,ci){
        ctx.save(); ctx.strokeStyle='rgba(245,166,35,'+ca+')'; ctx.lineWidth=2.6; ctx.shadowColor='rgba(245,166,35,.9)'; ctx.shadowBlur=14;
        var csx=ci%2===0?1:-1,csy=ci<2?1:-1;
        ctx.beginPath(); ctx.moveTo(cp[0],cp[1]+csy*cs); ctx.lineTo(cp[0],cp[1]); ctx.lineTo(cp[0]+csx*cs,cp[1]); ctx.stroke(); ctx.restore();
      });
      var cr = 16+4*Math.sin(t*2.8);
      ctx.save(); ctx.strokeStyle='rgba(0,245,255,'+(0.55+.35*Math.sin(t*2.8))+')'; ctx.lineWidth=1.6; ctx.shadowColor='rgba(0,245,255,.9)'; ctx.shadowBlur=16;
      ctx.beginPath(); ctx.moveTo(W/2-cr,H/2); ctx.lineTo(W/2+cr,H/2); ctx.moveTo(W/2,H/2-cr); ctx.lineTo(W/2,H/2+cr); ctx.stroke();
      ctx.beginPath(); ctx.arc(W/2,H/2,5.5,0,Math.PI*2); ctx.stroke(); ctx.restore();
      ctx.save(); ctx.fillStyle='rgba(0,245,255,.88)'; ctx.font='bold 11px Cairo,sans-serif'; ctx.textAlign='center'; ctx.shadowColor='rgba(0,245,255,.8)'; ctx.shadowBlur=12;
      ctx.fillText(rev<.25?'⟳ مسح المساحة...':rev<.5?'← عرض: '+dW+' م →':rev<.75?'↕ طول: '+dL+' م':'✓ '+dW+' × '+dL+' م',W/2,21); ctx.restore();
      hjRaf = requestAnimationFrame(frame);
    }
    frame();
  }
  function hjArrow(ctx,x,y,dx,dy,col){
    var s=5.5; ctx.save(); ctx.fillStyle=col; ctx.beginPath();
    if(dx===1){ctx.moveTo(x,y);ctx.lineTo(x-s,y-s*.5);ctx.lineTo(x-s,y+s*.5);}
    else if(dx===-1){ctx.moveTo(x,y);ctx.lineTo(x+s,y-s*.5);ctx.lineTo(x+s,y+s*.5);}
    else if(dy===1){ctx.moveTo(x,y);ctx.lineTo(x-s*.5,y-s);ctx.lineTo(x+s*.5,y-s);}
    else{ctx.moveTo(x,y);ctx.lineTo(x-s*.5,y+s);ctx.lineTo(x+s*.5,y+s);}
    ctx.closePath(); ctx.fill(); ctx.restore();
  }

  /* ══════════════════════════════════════════════════
     GEMINI AI
  ══════════════════════════════════════════════════ */
  function hjCallGemini(b64, mime) {
    var key = geminiKey;
    var models = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-3.5-flash', 'gemini-1.5-flash', 'gemini-flash-latest'];

    var uW = document.getElementById('hj-user-width') ? document.getElementById('hj-user-width').value.trim() : '';
    var uL = document.getElementById('hj-user-length') ? document.getElementById('hj-user-length').value.trim() : '';
    var uH = document.getElementById('hj-user-height') ? document.getElementById('hj-user-height').value.trim() : '';

    var dimensionsPrompt = "";
    if (uW || uL || uH) {
      dimensionsPrompt = "\n⚠️ تنبيه مهم جداً: لقد قام العميل بقياس مساحة الغرفة يدوياً بدقة وأعطانا الأبعاد التالية لتعمل عليها:\n"
        + (uW ? "- العرض (width): " + uW + " متر\n" : "")
        + (uL ? "- الطول (length): " + uL + " متر\n" : "")
        + (uH ? "- الارتفاع (height): " + uH + " متر\n" : "")
        + "يجب عليك استخدام هذه الأبعاد المعطاة يدوياً بدقة وتضمينها في حقول JSON المسترجعة (width و length و height) ولا تقم بتقدير أبعاد مختلفة بنفسك، بل اعتمد عليها لتكون التوصيات مطابقة تماماً للمساحة الحقيقية!";
    }

    var prompt = 'أنت خبير تحليل مساحات وديكور داخلي متخصص في الأثاث المصري.\n'
      + 'حلل هذه الصورة لـ "' + hjRoomName + '" وأرجع JSON فقط بهذا الشكل (بدون أي نص آخر):\n'
      + '{"width":4.2,"length":5.1,"height":2.8,"style":"مودرن مينيمال","colors":"أبيض وبيج","detected":["أريكة","تلفزيون"],"missing":["ترابيزة وسطانية","مرايا"],"summary":"وصف مختصر جملتين.","recommendations":["ركنات","مرايا","ساعات"]}\n\n'
      + 'recommendations من: ركنات، مرايا، ساعات، ترابيزات، سراير، دواليب، تسريحات، مكاتب، كراسي، كوفي كورنير\n'
      + dimensionsPrompt + '\nأرجع JSON فقط.';

    var body = JSON.stringify({
      contents: [{
        parts: [
          { text: prompt },
          { inline_data: { mime_type: mime || 'image/jpeg', data: b64 } }
        ]
      }],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 1024
      }
    });

    function tryModel(index) {
      if (index >= models.length) {
        return Promise.reject(new Error('All Gemini models failed.'));
      }
      var modelName = models[index];
      var url = 'https://generativelanguage.googleapis.com/v1beta/models/' + modelName + ':generateContent?key=' + key;
      console.log('[Gemini API Widget] Trying model: ' + modelName);

      return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body
      }).then(function (r) {
        if (!r.ok) {
          return r.json().then(function (e) {
            var msg = (e && e.error && e.error.message) || ('HTTP ' + r.status);
            if (r.status === 404 || msg.indexOf('not found') !== -1 || msg.indexOf('not supported') !== -1) {
              throw { tryNext: true, message: msg };
            }
            throw new Error(msg);
          });
        }
        return r.json();
      }).catch(function (err) {
        if (err && err.tryNext) {
          console.warn('[Gemini API Widget] Model ' + modelName + ' failed: ' + err.message + '. Trying next...');
          return tryModel(index + 1);
        }
        throw err;
      });
    }

    return tryModel(0).then(function (data) {
      var text = data.candidates[0].content.parts[0].text;
      var m = text.match(/\{[\s\S]*\}/);
      if (!m) throw new Error('no JSON');
      return JSON.parse(m[0]);
    });
  }

  function hjBuildAIProducts(recs) {
    var base = HJ_CAT[hjRoomName] || HJ_CAT['غرفة معيشة'];
    if (!recs || !recs.length) return base;
    var rs = {}; recs.forEach(function (r) { rs[r] = true; });
    var scored = base.map(function (p) {
      var sc = 0; p.t.forEach(function (tag) { if (rs[tag]) sc += 20; recs.forEach(function (r) { if (r.indexOf(tag)!==-1||tag.indexOf(r)!==-1) sc+=10; }); });
      return {p:p,sc:sc};
    }).sort(function (a,b) { return b.sc-a.sc; });
    var extras = [];
    recs.forEach(function (r) { var mr = HJ_RECO[r]; if (mr && mr !== hjRoomName) (HJ_CAT[mr]||[]).forEach(function(rp){if(r.indexOf(rp.t[0])!==-1||rp.t[0].indexOf(r)!==-1)extras.push({p:rp,sc:5});}); });
    var all = scored.concat(extras), seen = {}, result = [];
    all.forEach(function (item) { if (!seen[item.p.n]) { seen[item.p.n]=true; result.push(item.p); } });
    return result.slice(0, 4);
  }

  /* ══════════════════════════════════════════════════
     RUN ANALYSIS
  ══════════════════════════════════════════════════ */
  function hjRunAnalysis() {
    var ids = ['hjas1','hjas2','hjas3','hjas4','hjas5','hjas6'];
    ids.forEach(function (id) { var e=document.getElementById(id); e.className='ais'; e.querySelector('.aico').textContent='○'; });
    document.getElementById('hjas1').className='ais cur'; document.getElementById('hjas1').querySelector('.aico').textContent='⟳';
    var uW = document.getElementById('hj-user-width') ? document.getElementById('hj-user-width').value.trim() : '';
    var uL = document.getElementById('hj-user-length') ? document.getElementById('hj-user-length').value.trim() : '';
    var uH = document.getElementById('hj-user-height') ? document.getElementById('hj-user-height').value.trim() : '';

    var dims = HJ_DIMS[hjRoomName]||{w:[4,6],l:[5,7],h:[2.7,3.2]};
    var fbW = uW ? parseFloat(uW).toFixed(1) : (dims.w[0]+Math.random()*(dims.w[1]-dims.w[0])).toFixed(1);
    var fbL = uL ? parseFloat(uL).toFixed(1) : (dims.l[0]+Math.random()*(dims.l[1]-dims.l[0])).toFixed(1);
    var fbH = uH ? parseFloat(uH).toFixed(1) : (dims.h[0]!=null?(dims.h[0]+Math.random()*(dims.h[1]-dims.h[0])).toFixed(1):'--');
    var cW=0,cL=0,cH=0,tW=parseFloat(fbW),tL=parseFloat(fbL),tH=fbH!=='--'?parseFloat(fbH):0;
    var cu = setInterval(function () {
      cW=Math.min(cW+0.18,tW); cL=Math.min(cL+0.18,tL); if(fbH!=='--')cH=Math.min(cH+0.1,tH);
      document.getElementById('hjlw').textContent=cW.toFixed(1);
      document.getElementById('hjll2').textContent=cL.toFixed(1);
      document.getElementById('hjlh').textContent=fbH!=='--'?cH.toFixed(1):'--';
      if(cW>=tW&&cL>=tL)clearInterval(cu);
    }, 75);

    if (geminiKey && hjDataURL) {
      var ci = hjDataURL.indexOf(','), b64 = ci!==-1?hjDataURL.slice(ci+1):hjDataURL;
      var mime = ci!==-1?(hjDataURL.split(';')[0].split(':')[1]||'image/jpeg'):'image/jpeg';
      var si = 0;
      function adv() { if(si<ids.length){var el=document.getElementById(ids[si]);el.className='ais done';el.querySelector('.aico').textContent='✓';si++;if(si<ids.length){var nx=document.getElementById(ids[si]);nx.className='ais cur';nx.querySelector('.aico').textContent='⟳';}}}
      var st = setInterval(adv, 800);
      hjCallGemini(b64, mime)
        .then(function (ai) {
          clearInterval(st); while(si<ids.length)adv(); clearInterval(cu);
          var aiW=ai.width?parseFloat(ai.width).toFixed(1):fbW;
          var aiL=ai.length?parseFloat(ai.length).toFixed(1):fbL;
          var aiH=ai.height?parseFloat(ai.height).toFixed(1):fbH;
          document.getElementById('hjlw').textContent=aiW; document.getElementById('hjll2').textContent=aiL; document.getElementById('hjlh').textContent=aiH;
          setTimeout(function(){hjShowResults(aiW,aiL,aiH,ai);},600);
        })
        .catch(function (err) {
          clearInterval(st); while(si<ids.length)adv(); clearInterval(cu);
          console.warn('[hjSama]',err.message);
          setTimeout(function(){hjShowResults(fbW,fbL,fbH,null);},600);
        });
    } else {
      var idx=0;
      function nxt(){if(idx<ids.length){var el=document.getElementById(ids[idx]);el.className='ais done';el.querySelector('.aico').textContent='✓';idx++;if(idx<ids.length){var nx=document.getElementById(ids[idx]);nx.className='ais cur';nx.querySelector('.aico').textContent='⟳';setTimeout(nxt,500+Math.random()*300);}else{clearInterval(cu);setTimeout(function(){hjShowResults(fbW,fbL,fbH,null);},700);}}}
      setTimeout(nxt,680);
    }
  }

  /* ══════════════════════════════════════════════════
     SHOW RESULTS
  ══════════════════════════════════════════════════ */
  function hjShowResults(w,l,h,ai) {
    var isAI=!!ai;
    var det=isAI?(ai.detected||[]):(HJ_DET[hjRoomName]||[]);
    var stl=isAI?(ai.style||''):(HJ_STY[hjRoomName]||'مودرن');
    var clr=isAI?(ai.colors||')':'';
    var summ=isAI?(ai.summary||''):('الذكاء الاصطناعي حلل صورة '+hjRoomName+' وقدّر المساحة بـ '+w+'×'+l+' متر'+(h!=='--'?' بارتفاع '+h+' متر':'')+'. اختار لك أفضل منتجات حاجات سما! 🏠✨');
    var prods=isAI?hjBuildAIProducts(ai.recommendations):(HJ_CAT[hjRoomName]||HJ_CAT['غرفة معيشة']);
    var miss=isAI?(ai.missing||[]):[];
    document.getElementById('hjrss').textContent=hjRoomName+' – '+w+'×'+l+'م'+(stl?' – '+stl:'');
    var dc=document.getElementById('hjdchips'); dc.innerHTML='';
    function chip(t,c){var s=document.createElement('span');s.className='dchip'+(c?' '+c:'');s.textContent=t;dc.appendChild(s);}
    chip(isAI?'🤖 Gemini AI':'⚡ تحليل تلقائي',isAI?'s':'');
    chip('📐 '+w+'×'+l+'م','d');
    if(stl)chip('✨ '+stl,'s');
    if(clr)chip('🎨 '+clr,'');
    det.forEach(function(d){chip(d,'');});
    if(miss.length)chip('➕ مقترح: '+miss.slice(0,2).join('، '),'d');
    document.getElementById('hjaisum').textContent=summ;
    var pg=document.getElementById('hjpg'); pg.innerHTML='';
    prods.forEach(function(p,i){
      var a=document.createElement('a');
      a.className='pc'; a.href=p.u; a.target='_blank'; a.rel='noopener noreferrer'; a.style.animationDelay=i*0.08+'s';
      a.innerHTML='<div class="pimg">'+p.e+'</div><div class="pi2"><div class="pname">'+p.n+'</div><div class="pdesc">'+p.d+'</div>'
        +'<div class="ptags">'+p.t.map(function(x){return'<span class="pt">'+x+'</span>';}).join('')+'</div>'
        +'<div class="mrow"><div class="mtrk"><div class="mfill" style="width:0" data-w="'+p.m+'%"></div></div><div class="mpct">'+p.m+'%</div></div></div>'
        +'<div class="parr"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg></div>';
      pg.appendChild(a);
    });
    hjShowStep(4);
    setTimeout(function(){document.querySelectorAll('#hjsaw-w .mfill').forEach(function(b){b.style.width=b.dataset.w;});},420);
  }

  /* ── Init ── */
  hjShowStep(1);

})( 'AQ.Ab8RN6ICcFuoeJlKlSVmB9_' + 'Bw8Q5X3vH71NRgSm2rNS4iFCiyw');
