import { theme } from "../theme";

export function buildCss({ cv, accent, mode }) {
  return `
        @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&family=Bebas+Neue&family=IBM+Plex+Mono:wght@400;500&display=swap');
        @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css');

        :root{
          --bg:${cv.bg};
          --bg-card:${cv.bgCard};
          --line:${cv.line};
          --main:${cv.main};
          --sub:${cv.sub};
          --muted:${cv.muted};
          --accent:${accent};
        }
        *{margin:0;padding:0;box-sizing:border-box;}
        html,body{height:100%;overflow:hidden;}
        .wrap{background:var(--bg);color:var(--main);font-family:${theme.fonts.body};height:100dvh;overflow-y:auto;overflow-x:hidden;line-height:1.65;transition:background .45s ease,color .45s ease;}
        .inner{max-width:1180px;margin:0 auto;padding:0 40px;}
        a{color:inherit;text-decoration:none;}
        button{font-family:inherit;}
        ::selection{background:var(--accent);color:var(--bg);}

        .rv{opacity:0;transform:translateY(26px);transition:opacity .7s ease,transform .7s ease;}
        .rv.on{opacity:1;transform:none;}
        @media (prefers-reduced-motion: reduce){
          .rv{opacity:1;transform:none;transition:none;}
          html{scroll-behavior:auto;}
          .wrap,.wrap *{transition:none !important;animation:none !important;}
          .it *{opacity:1 !important;transform:none !important;clip-path:none !important;width:auto !important;filter:none !important;}
          .dec-in,.dec-in *{opacity:.55 !important;}
        }

        /* ---------- intro keyframes ---------- */
        @keyframes itRise{from{transform:translateY(110%);}to{transform:translateY(0);}}
        @keyframes itBlur{from{filter:blur(14px);opacity:.35;}to{filter:blur(0);opacity:1;}}
        @keyframes itFade{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:none;}}
        @keyframes itBg{from{opacity:0;}to{opacity:1;}}
        @keyframes itSettle{from{transform:scale(1.06);}to{transform:scale(1);}}
        @keyframes itType{from{width:0;}to{width:calc(36ch + 1.44em);}}
        @keyframes itCaret{0%,100%{opacity:1;}50%{opacity:0;}}
        @keyframes itFloat{0%{transform:translateY(0);}100%{transform:translateY(-26px);}}
        @keyframes itLine{to{transform:scaleY(1);}}
        @keyframes itSpin{to{transform:rotate(360deg);}}

        /* ---------- intro ---------- */
        .it{position:relative;height:100dvh;min-height:620px;display:flex;flex-direction:column;justify-content:center;overflow:hidden;border-bottom:1px solid var(--line);}
        .it-grid{position:absolute;inset:0;pointer-events:none;opacity:0;animation:itBg 1.4s ease .1s forwards,itSettle 2s ease .1s forwards;
          background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);
          background-size:72px 72px;
          mask-image:radial-gradient(ellipse 80% 70% at 50% 45%,#000 30%,transparent 100%);
          -webkit-mask-image:radial-gradient(ellipse 80% 70% at 50% 45%,#000 30%,transparent 100%);}
        .it-amb{position:absolute;inset:0;pointer-events:none;opacity:0;animation:itBg 1.6s ease forwards;
          background:radial-gradient(720px 480px at 72% 20%, ${accent}${mode === "dark" ? "1e" : "2a"}, transparent 68%),
                     radial-gradient(560px 420px at 14% 88%, ${cv.deepPink}${mode === "dark" ? "2e" : "24"}, transparent 70%);
          transition:background .6s ease;}
        .it-glow{position:absolute;top:0;left:0;width:560px;height:560px;border-radius:50%;pointer-events:none;
          background:radial-gradient(circle, ${accent}${mode === "dark" ? "17" : "20"} 0%, transparent 62%);
          transition:transform .18s ease-out,background .5s;will-change:transform;}
        .it-dot{position:absolute;width:7px;height:7px;border-radius:50%;opacity:0;animation:itBg 1s ease 1.6s forwards,itFloat 6s ease-in-out 1.6s infinite alternate;pointer-events:none;}

        /* 우측 SVG 장식 — 리플 아크 필드 (화면 밖으로 블리드) */
        .it-deco{position:absolute;top:50%;right:-26%;transform:translateY(-50%);width:min(62vw,780px);pointer-events:none;transition:transform .3s ease-out;will-change:transform;}
        .it-deco svg{width:100%;height:auto;display:block;}
        .dec-in{opacity:0;animation:itDeco 2.6s ease .9s forwards,itDrift 16s ease-in-out 3.5s infinite alternate;}
        @keyframes itDeco{from{opacity:0;transform:scale(.97);}to{opacity:.55;transform:scale(1);}}
        @keyframes itDrift{from{transform:translateY(0);}to{transform:translateY(12px);}}
        .d-dash{animation:itSpin 80s linear infinite;transform-origin:50% 50%;}
        .d-arcA{animation:itSpin 44s linear infinite;transform-origin:50% 50%;}
        .d-arcB{animation:itSpin 30s linear infinite reverse;transform-origin:50% 50%;}
        .d-orb{animation:itSpin 22s linear infinite;transform-origin:50% 50%;}
        .d-orb2{animation:itSpin 38s linear infinite reverse;transform-origin:50% 50%;}

        .it .inner{position:relative;width:100%;}
        .it-type{font-family:${theme.fonts.mono};font-size:14px;color:var(--accent);letter-spacing:.04em;margin-bottom:34px;display:flex;align-items:center;transition:color .3s;}
        .it-type i{font-style:normal;display:block;overflow:hidden;white-space:nowrap;width:0;animation:itType 1.5s steps(36) .35s forwards;}
        .it-type b{font-weight:400;margin-left:2px;animation:itCaret 1s step-end infinite;}
        .it-typo{will-change:transform;transition:transform .25s ease-out;}
        .it-ln{display:block;overflow:hidden;line-height:.94;padding-bottom:.04em;}
        .it-ln span{display:block;font-family:${theme.fonts.num};font-weight:400;font-size:clamp(72px,14vw,190px);letter-spacing:.02em;transform:translateY(110%);animation:itRise .9s cubic-bezier(.2,.9,.25,1) forwards,itBlur 1s ease forwards;}
        .it-ln.l1 span{animation-delay:.55s,.55s;color:transparent;-webkit-text-stroke:1.5px var(--main);}
        .it-ln.l2 span{animation-delay:.78s,.78s;}
        .it-ln.l2 .arw{display:inline-block;color:var(--accent);transition:color .3s;}
        .it-ln.l2 .cd{background:linear-gradient(94deg,var(--accent),${cv.lavender});-webkit-background-clip:text;background-clip:text;color:transparent;padding-right:.18em;}
        .it-kr{position:relative;padding-left:18px;opacity:0;animation:itFade .8s ease 1.4s forwards;font-size:clamp(17px,2.2vw,24px);font-weight:700;color:var(--sub);margin-top:38px;word-break:keep-all;}
        .it-kr::before{content:"";position:absolute;left:0;top:5px;bottom:5px;width:2.5px;background:var(--accent);transform:scaleY(0);transform-origin:top;animation:itLine .5s ease 1.55s forwards;transition:background .3s;}
        .it-kr strong{color:var(--main);}
        .it-sub{opacity:0;animation:itFade .8s ease 1.6s forwards;font-family:${theme.fonts.mono};font-size:12px;letter-spacing:.14em;color:var(--muted);margin-top:14px;padding-left:18px;}
        .it-cue{position:absolute;bottom:32px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:11px;opacity:0;animation:itFade .8s ease 1.95s forwards;background:none;border:none;cursor:pointer;}
        .it-cue em{font-family:${theme.fonts.mono};font-style:normal;font-size:10px;letter-spacing:.3em;color:var(--muted);transition:color .25s;}
        .it-cue:hover em{color:var(--accent);}
        .cue-ms{width:24px;height:38px;border:1.5px solid var(--muted);border-radius:999px;display:flex;justify-content:center;transition:border-color .25s;}
        .it-cue:hover .cue-ms{border-color:var(--accent);}
        .cue-ms i{display:block;width:4px;height:8px;border-radius:4px;background:var(--accent);margin-top:7px;animation:cueDrop 1.7s ease-in-out 2.1s infinite;transition:background .3s;}
        @keyframes cueDrop{0%{transform:translateY(0);opacity:1;}65%{transform:translateY(13px);opacity:0;}100%{transform:translateY(0);opacity:0;}}
        .it-cue:focus-visible{outline:2px solid var(--accent);outline-offset:4px;}

        /* 재진입 축약 리플레이 — 타이핑 생략, 딜레이 단축 */
        .it.fast .it-amb,.it.fast .it-grid{animation-delay:0s;}
        .it.fast .dec-in{animation-delay:.15s,2s;}
        .it.fast .it-type i{animation:none;width:36ch;}
        .it.fast .it-ln.l1 span{animation-delay:.08s,.08s;}
        .it.fast .it-ln.l2 span{animation-delay:.26s,.26s;}
        .it.fast .it-kr{animation-delay:.6s;}
        .it.fast .it-kr::before{animation-delay:.75s;}
        .it.fast .it-sub{animation-delay:.75s;}
        .it.fast .it-cue{animation-delay:.9s;}
        .it.fast .it-dot{animation-delay:.5s,.5s;}

        /* 공통 프레스 상태 — 라인 버튼 체계 */
        .pf-links a:active,.ft-links a:active,.hero-sns a:active,.sk-tab:active,.sub-filters button:active,.top-btn:active,.th-tg:active{transform:scale(.97);}

        /* ---------- top button ---------- */
        .top-btn{position:fixed;right:26px;bottom:26px;z-index:90;width:50px;height:50px;border-radius:50%;background:var(--bg-card);border:1px solid var(--line);cursor:pointer;display:flex;align-items:center;justify-content:center;opacity:0;transform:translateY(16px);pointer-events:none;transition:opacity .35s ease,transform .35s ease,border-color .25s,background .45s;box-shadow:0 10px 30px -12px ${accent}55;}
        .top-btn.show{opacity:1;transform:none;pointer-events:auto;}
        .top-btn:hover{border-color:var(--accent);}
        .top-btn:hover svg{transform:translateY(-2px);}
        .top-btn:focus-visible{outline:2px solid var(--accent);outline-offset:3px;}
        .top-btn svg{width:16px;height:16px;stroke:var(--main);fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;transition:transform .25s;}

        /* ---------- header ---------- */
        .hd{position:fixed;top:0;left:0;right:0;z-index:250;background:${mode === "dark" ? "rgba(6,6,14,0.75)" : "rgba(236,233,255,0.8)"};backdrop-filter:blur(14px);border-bottom:1px solid var(--line);transition:background .45s;}
        .hd .inner{display:flex;align-items:center;justify-content:space-between;height:66px;gap:16px;}
        .pg{position:absolute;left:0;right:0;bottom:-1px;height:2px;pointer-events:none;}
        .pg i{display:block;height:100%;background:linear-gradient(90deg,var(--accent),${cv.lavender});transform-origin:left;transform:scaleX(0);}
        .logo{font-family:${theme.fonts.disp};font-weight:700;font-size:13px;letter-spacing:.28em;cursor:pointer;background:none;border:none;color:var(--main);white-space:nowrap;}
        .logo em{font-style:normal;color:var(--accent);transition:color .3s;}
        .hd-r{display:flex;align-items:center;gap:26px;}
        .gnb{display:flex;gap:26px;list-style:none;}
        .gnb button{background:none;border:none;cursor:pointer;font-family:${theme.fonts.mono};font-size:12px;letter-spacing:.1em;color:var(--muted);transition:color .25s;padding:6px 0;}
        .gnb button i{font-style:normal;color:var(--accent);margin-right:6px;transition:color .3s;}
        .gnb button:hover,.gnb button:focus-visible{color:var(--main);}
        .gnb button:focus-visible{outline:1px solid var(--accent);outline-offset:4px;}
        .gnb button.act{color:var(--main);}
        .gnb button{position:relative;}
        .gnb button::after{content:"";position:absolute;left:0;right:100%;bottom:0;height:1.5px;background:var(--accent);transition:right .3s ease;}
        .gnb button.act::after{right:0;}

        /* theme toggle — SVG 세그먼트 슬라이드 스위치 */
        .th-tg{position:relative;display:flex;align-items:center;width:74px;height:36px;background:var(--bg-card);border:1px solid var(--line);border-radius:999px;cursor:pointer;padding:0;transition:border-color .25s;flex-shrink:0;}
        .th-tg:hover{border-color:var(--accent);}
        .th-tg:focus-visible{outline:2px solid var(--accent);outline-offset:3px;}
        .th-thumb{position:absolute;top:3px;left:${mode === "dark" ? "3px" : "39px"};width:30px;height:30px;border-radius:50%;background:var(--accent);display:flex;align-items:center;justify-content:center;transition:left .3s cubic-bezier(.5,1.4,.5,1),background .3s;box-shadow:0 4px 14px -4px ${accent}aa;}
        .th-thumb svg{width:15px;height:15px;stroke:var(--bg);fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}
        .th-ico{position:absolute;top:0;width:36px;height:36px;display:flex;align-items:center;justify-content:center;pointer-events:none;}
        .th-ico svg{width:14px;height:14px;stroke:var(--muted);fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;opacity:.55;transition:opacity .25s;}
        .th-ico.l{left:1px;}
        .th-ico.r{right:1px;}
        .th-ico.hide svg{opacity:0;}

        /* hamburger */
        .hbg{display:none;background:none;border:none;cursor:pointer;width:40px;height:40px;position:relative;z-index:210;}
        .hbg span{display:block;width:22px;height:2px;background:var(--main);margin:5px auto;border-radius:2px;transition:transform .3s ease,opacity .3s ease;}
        .hbg.open span:nth-child(1){transform:translateY(7px) rotate(45deg);}
        .hbg.open span:nth-child(2){opacity:0;}
        .hbg.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg);}
        .hbg:focus-visible{outline:2px solid var(--accent);outline-offset:2px;}

        /* mobile overlay menu */
        .mnav{position:fixed;inset:0;z-index:200;background:${mode === "dark" ? "rgba(6,6,14,0.97)" : "rgba(236,233,255,0.98)"};backdrop-filter:blur(18px);display:flex;flex-direction:column;justify-content:center;padding:0 36px;opacity:0;pointer-events:none;transition:opacity .3s ease;}
        .mnav.open{opacity:1;pointer-events:auto;}
        .mnav ul{list-style:none;display:flex;flex-direction:column;gap:8px;}
        .mnav button{background:none;border:none;cursor:pointer;text-align:left;width:100%;padding:16px 0;font-size:26px;font-weight:800;color:var(--main);font-family:${theme.fonts.body};border-bottom:1px solid var(--line);display:flex;align-items:baseline;gap:14px;}
        .mnav button i{font-style:normal;font-family:${theme.fonts.num};font-size:16px;color:var(--accent);}
        .mnav .mnav-ft{margin-top:44px;display:flex;gap:18px;font-family:${theme.fonts.mono};font-size:12px;color:var(--muted);}

        /* ---------- hero ---------- */
        .hero{position:relative;padding:130px 0;border-bottom:1px solid var(--line);}
        .hero-bg{position:absolute;inset:0;pointer-events:none;
          background:radial-gradient(680px 420px at 78% 16%, ${accent}${mode === "dark" ? "22" : "2e"}, transparent 68%),
                     radial-gradient(520px 380px at 10% 85%, ${cv.deepPink}${mode === "dark" ? "30" : "26"}, transparent 70%);
          transition:background .6s ease;}
        .hero .inner{position:relative;display:grid;grid-template-columns:1.15fr .85fr;gap:60px;align-items:center;}
        .hero-hello{font-family:${theme.fonts.mono};font-size:14px;color:var(--accent);margin-bottom:22px;letter-spacing:.06em;transition:color .3s;}
        .hero-ttl{font-weight:800;font-size:clamp(28px,3.6vw,44px);line-height:1.24;letter-spacing:-0.02em;margin-bottom:20px;word-break:keep-all;}
        .hero-ttl .grad{background:linear-gradient(92deg,var(--accent),${cv.lavender});-webkit-background-clip:text;background-clip:text;color:transparent;}
        .hero-desc{color:var(--sub);font-size:16.5px;max-width:520px;word-break:keep-all;margin-bottom:34px;}
        .hero-desc strong{color:var(--main);font-weight:600;}
        .hero-sns{display:flex;gap:12px;flex-wrap:wrap;}
        .hero-sns a{font-family:${theme.fonts.mono};font-size:12px;letter-spacing:.08em;padding:10px 18px;border:1px solid var(--line);border-radius:8px;color:var(--sub);transition:all .25s;}
        .hero-sns a:hover{border-color:var(--accent);color:var(--accent);transform:translateY(-1px);}

        /* signature — theme.js token card */
        .tk-card{background:var(--bg-card);border:1px solid var(--line);border-radius:14px;padding:26px 28px;font-family:${theme.fonts.mono};font-size:13.5px;line-height:2.05;box-shadow:0 30px 80px -30px ${accent}${mode === "dark" ? "33" : "40"};transition:box-shadow .5s,background .45s;}
        .tk-bar{display:flex;gap:7px;margin-bottom:18px;}
        .tk-bar i{width:10px;height:10px;border-radius:50%;background:var(--line);}
        .tk-bar i:first-child{background:var(--accent);transition:background .3s;}
        .tk-key{color:var(--muted);}
        .tk-str{color:${cv.green};}
        .tk-fn{color:${cv.sky};}
        .tk-swatches{display:flex;gap:10px;margin:6px 0 2px;padding-left:2ch;flex-wrap:wrap;}
        .tk-sw{width:26px;height:26px;border-radius:7px;border:1px solid var(--line);cursor:pointer;transition:transform .2s;}
        .tk-sw:hover{transform:translateY(-3px);}
        .tk-sw:focus-visible{outline:2px solid var(--main);outline-offset:2px;}
        .tk-sw.act{box-shadow:0 0 0 2px var(--bg),0 0 0 4px var(--accent);}
        .tk-hint{font-size:11px;color:var(--muted);letter-spacing:.06em;margin-top:14px;padding-top:14px;border-top:1px dashed var(--line);}

        /* ---------- section common ---------- */
        .sec{padding:130px 0;border-bottom:1px solid var(--line);}
        .sec-ttl{display:flex;align-items:baseline;gap:18px;margin-bottom:64px;flex-wrap:wrap;}
        .sec-ttl .no{font-family:${theme.fonts.num};font-size:52px;line-height:1;color:transparent;-webkit-text-stroke:1px var(--accent);}
        .sec-ttl h2{font-size:clamp(22px,2.8vw,34px);font-weight:800;letter-spacing:-0.01em;word-break:keep-all;}
        .sec-ttl .lb{font-family:${theme.fonts.disp};font-size:10px;font-weight:700;letter-spacing:.32em;color:var(--muted);width:100%;}

        /* ---------- project media (browser frame + hover) ---------- */
        .md-frm{display:block;position:relative;border:1px solid var(--line);border-radius:14px;background:var(--bg-card);overflow:hidden;transition:transform .35s ease,border-color .3s,background .45s;}
        a.md-frm{cursor:pointer;}
        .md-frm:hover{transform:translateY(-6px);}
        .md-frm:focus-visible{outline:2px solid var(--accent);outline-offset:3px;}
        .md-bar{display:flex;align-items:center;gap:6px;padding:12px 16px;border-bottom:1px solid var(--line);}
        .md-bar i{width:9px;height:9px;border-radius:50%;background:var(--line);flex-shrink:0;}
        .md-bar em{font-family:${theme.fonts.mono};font-style:normal;font-size:10px;letter-spacing:.14em;color:var(--muted);margin-left:8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
        .md-bd{position:relative;overflow:hidden;}
        .md-bd img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .55s ease;}
        .md-frm:hover .md-bd img{transform:scale(1.05);}
        .md-ph{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;transition:transform .55s ease;}
        .md-frm:hover .md-ph{transform:scale(1.04);}
        .md-ph span{font-size:30px;}
        .md-ph em{font-family:${theme.fonts.mono};font-style:normal;font-size:11px;letter-spacing:.14em;color:var(--muted);text-align:center;padding:0 12px;}
        .md-ph small{font-family:${theme.fonts.mono};font-size:9.5px;letter-spacing:.08em;color:var(--muted);opacity:.55;}
        .md-ov{position:absolute;inset:0;opacity:0;display:flex;align-items:flex-end;justify-content:flex-start;padding:22px;transition:opacity .35s ease;}
        .md-cta{font-family:${theme.fonts.mono};font-size:12px;letter-spacing:.14em;color:#fff;transform:translateY(8px);transition:transform .35s ease;}
        @media (hover:hover){
          .md-frm:hover .md-ov{opacity:1;}
          .md-frm:hover .md-cta{transform:none;}
        }
        @media (hover:none){
          .md-ov{opacity:.85;}
          .md-cta{transform:none;}
        }

        /* ---------- profile media (accent offset frame) ---------- */
        .pr-frm{position:relative;max-width:400px;}
        .pr-frm::after{content:"";position:absolute;inset:0;border:1.5px solid var(--accent);border-radius:14px;transform:translate(14px,14px);transition:transform .35s ease,border-color .3s;pointer-events:none;}
        .pr-frm:hover::after{transform:translate(6px,6px);}
        .pr-bd{position:relative;aspect-ratio:4/5;border:1px solid var(--line);border-radius:14px;background:var(--bg-card);overflow:hidden;transition:background .45s;}
        .pr-bd img{width:100%;height:100%;object-fit:cover;display:block;filter:saturate(.92);transition:filter .35s;}
        .pr-frm:hover .pr-bd img{filter:none;}

        /* ---------- about ---------- */
        .ab-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:70px;align-items:start;}
        .ab-txt p{color:var(--sub);font-size:16px;margin-bottom:20px;word-break:keep-all;}
        .ab-txt strong{color:var(--main);}
        .ab-quote{font-family:${theme.fonts.mono};font-size:13px;color:var(--accent);border-left:2px solid var(--accent);padding-left:16px;margin-top:28px;transition:color .3s,border-color .3s;}

        /* ---------- journey ---------- */
        .jn-list{position:relative;padding-left:34px;display:flex;flex-direction:column;gap:44px;}
        .jn-list::before{content:"";position:absolute;left:8px;top:6px;bottom:6px;width:1px;background:var(--line);}
        .jn-item{position:relative;}
        .jn-dot{position:absolute;left:-31px;top:7px;width:11px;height:11px;border-radius:50%;background:var(--bg);border:2px solid var(--muted);transition:background .45s;}
        .jn-date{font-family:${theme.fonts.mono};font-size:12px;letter-spacing:.1em;color:var(--muted);margin-bottom:6px;}
        .jn-ttl{font-size:19px;font-weight:800;display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:8px;}
        .jn-tag{font-family:${theme.fonts.mono};font-size:11px;letter-spacing:.06em;padding:4px 10px;border-radius:999px;border:1px solid var(--line);}
        .jn-item p{color:var(--sub);font-size:14.5px;max-width:640px;word-break:keep-all;}

        /* ---------- skills ---------- */
        .sk-tabs{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:42px;}
        .sk-tab{background:var(--bg-card);border:1px solid var(--line);border-radius:999px;padding:10px 22px;font-family:${theme.fonts.mono};font-size:12.5px;letter-spacing:.08em;color:var(--muted);cursor:pointer;transition:all .25s;}
        .sk-tab:hover{color:var(--main);}
        .sk-tab.act{background:var(--accent);border-color:var(--accent);color:var(--bg);font-weight:500;}
        .sk-tab:focus-visible{outline:2px solid var(--main);outline-offset:2px;}
        .sk-list{display:grid;grid-template-columns:1fr 1fr;gap:18px;}
        .sk-item{background:var(--bg-card);border:1px solid var(--line);border-radius:14px;padding:26px 28px;transition:border-color .3s,background .45s;}
        .sk-item:hover{border-color:var(--accent);}
        .sk-item h3{font-size:16.5px;font-weight:800;margin-bottom:10px;display:flex;align-items:center;gap:10px;}
        .sk-item h3::before{content:"";width:8px;height:8px;border-radius:2px;background:var(--accent);flex-shrink:0;transition:background .3s;}
        .sk-item p{font-size:14px;color:var(--sub);word-break:keep-all;}

        /* ---------- main projects ---------- */
        .pf-list{display:flex;flex-direction:column;gap:110px;}
        .pf-item{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center;}
        .pf-item:nth-child(even) .pf-txt{order:2;}
        .pf-item:nth-child(even) .pf-media{order:1;}
        .pf-lb{font-family:${theme.fonts.disp};font-size:10.5px;font-weight:700;letter-spacing:.3em;display:block;margin-bottom:14px;}
        .pf-name{font-size:clamp(24px,3vw,38px);font-weight:800;letter-spacing:-0.01em;display:flex;align-items:baseline;gap:16px;flex-wrap:wrap;}
        .pf-num{font-family:${theme.fonts.num};font-weight:400;font-size:.8em;color:transparent;-webkit-text-stroke:1px ${cv.muted};}
        .pf-meta{font-family:${theme.fonts.mono};font-size:12px;color:var(--muted);letter-spacing:.05em;margin:10px 0 22px;line-height:1.9;}
        .pf-desc{color:var(--sub);font-size:15.5px;word-break:keep-all;margin-bottom:22px;}
        .pf-role{list-style:none;display:flex;flex-direction:column;gap:10px;margin-bottom:26px;}
        .pf-role li{font-size:14px;color:var(--sub);padding-left:18px;position:relative;word-break:keep-all;}
        .pf-stack{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:26px;}
        .pf-stack span{font-family:${theme.fonts.mono};font-size:11.5px;padding:5px 11px;border-radius:6px;border:1px solid var(--line);color:var(--muted);}
        .pf-links{display:flex;gap:12px;flex-wrap:wrap;}
        .pf-links a{font-family:${theme.fonts.mono};font-size:12.5px;letter-spacing:.08em;padding:11px 22px;border-radius:8px;border:1px solid var(--line);transition:all .25s;}
        .pf-links a:hover{transform:translateY(-1px);}
        .pf-links a:focus-visible{outline:2px solid var(--main);outline-offset:2px;}

        /* ---------- sub projects ---------- */
        .sub-hd{display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap;margin:130px 0 40px;}
        .sub-ttl{font-family:${theme.fonts.disp};font-size:12px;font-weight:700;letter-spacing:.3em;color:var(--muted);}
        .sub-filters{display:flex;gap:8px;}
        .sub-filters button{background:var(--bg-card);border:1px solid var(--line);border-radius:999px;padding:8px 18px;font-family:${theme.fonts.mono};font-size:11.5px;letter-spacing:.1em;color:var(--muted);cursor:pointer;transition:all .25s;}
        .sub-filters button.act{background:var(--accent);border-color:var(--accent);color:var(--bg);}
        .sub-filters button:focus-visible{outline:2px solid var(--main);outline-offset:2px;}
        .sub-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;}
        .sub-card{background:var(--bg-card);border:1px solid var(--line);border-radius:14px;padding:26px 28px;display:flex;flex-direction:column;transition:border-color .3s,transform .3s,background .45s;}
        .sub-card:hover{transform:translateY(-5px);}
        .sub-card h3{font-size:17px;font-weight:800;margin-bottom:6px;display:flex;justify-content:space-between;align-items:center;gap:10px;}
        .sub-card h3 i{font-style:normal;font-size:14px;color:var(--muted);}
        .sub-cat{font-family:${theme.fonts.mono};font-size:10.5px;letter-spacing:.14em;color:var(--muted);margin-bottom:14px;}
        .sub-card p{font-size:13.5px;color:var(--sub);word-break:keep-all;flex:1;margin-bottom:20px;}
        .sub-stack{display:flex;flex-wrap:wrap;gap:7px;}
        .sub-stack span{font-family:${theme.fonts.mono};font-size:11px;color:var(--muted);}
        .sub-stack span::before{content:"#";}
        .sub-next{border-style:dashed;align-items:center;justify-content:center;text-align:center;gap:10px;min-height:200px;cursor:default;}
        .sub-next b{font-family:${theme.fonts.num};font-size:26px;letter-spacing:.06em;color:var(--muted);font-weight:400;}
        .sub-next p{flex:0;margin:0;font-size:12.5px;}

        /* ---------- contact ---------- */
        .ft{padding:150px 0 80px;text-align:center;position:relative;}
        .ft-bg{position:absolute;inset:0;pointer-events:none;background:radial-gradient(620px 340px at 50% 100%, ${cv.deepPink}${mode === "dark" ? "33" : "26"}, transparent 70%);}
        .ft .inner{position:relative;}
        .ft-ttl{font-family:${theme.fonts.num};font-size:clamp(48px,8vw,110px);line-height:.95;letter-spacing:.02em;margin-bottom:26px;}
        .ft-ttl b{color:var(--accent);font-weight:400;transition:color .3s;}
        .ft p{color:var(--sub);margin-bottom:46px;word-break:keep-all;}
        .ft-links{display:flex;justify-content:center;gap:24px;flex-wrap:wrap;}
        .ft-links a{font-family:${theme.fonts.mono};font-size:13px;letter-spacing:.06em;padding:14px 28px;border-radius:8px;border:1px solid var(--line);transition:all .25s;}
        .ft-links a:hover{border-color:var(--accent);color:var(--accent);transform:translateY(-1px);}
        .ft-links a.pri{color:var(--accent);border-color:var(--accent);font-weight:500;}
        .ft-links a.pri:hover{box-shadow:0 12px 28px -14px ${accent}aa;}
        .ft-copy{margin-top:76px;font-family:${theme.fonts.mono};font-size:11px;letter-spacing:.14em;color:var(--muted);}

        /* ---------- responsive ---------- */
        @media (max-width:960px){
          .hero .inner{grid-template-columns:1fr;gap:48px;}
          .ab-grid{grid-template-columns:1fr;gap:44px;}
          .sk-list{grid-template-columns:1fr;}
          .pf-item{grid-template-columns:1fr;gap:34px;}
          .pf-item:nth-child(even) .pf-txt{order:1;}
          .pf-item:nth-child(even) .pf-media{order:2;}
          .sub-grid{grid-template-columns:1fr 1fr;}
          .sec{padding:104px 0;}
        }
        @media (max-width:768px){
          .it-deco{right:-52%;width:120vw;}
          .dec-in{animation:itDeco 2.6s ease .9s forwards,itDrift 16s ease-in-out 3.5s infinite alternate;}
          @keyframes itDeco{from{opacity:0;transform:scale(.97);}to{opacity:.32;transform:scale(1);}}
          .top-btn{right:18px;bottom:18px;width:46px;height:46px;}
          .gnb{display:none;}
          .hbg{display:block;}
          .hd-r{gap:12px;}
          .inner{padding:0 26px;}
          .hero{padding:104px 0;}
          .pf-list{gap:80px;}
        }
        @media (max-width:480px){
          .inner{padding:0 20px;}
          .sec{padding:84px 0;}
          .sec-ttl{gap:12px;margin-bottom:48px;}
          .sec-ttl .no{font-size:38px;}
          .hero{padding:88px 0;}
          .hero-desc{font-size:15px;}
          .tk-card{padding:20px 18px;font-size:12px;}
          .tk-sw{width:30px;height:30px;}
          .jn-list{padding-left:26px;gap:36px;}
          .jn-dot{left:-23px;}
          .sub-grid{grid-template-columns:1fr;}
          .sub-hd{margin-top:96px;}
          .pf-links a{width:100%;text-align:center;}
          .ft-links a{width:100%;}
          .ft{padding:110px 0 60px;}
        }
  `;
}
