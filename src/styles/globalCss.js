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
        .it{position:relative;height:100dvh;min-height:620px;display:flex;flex-direction:column;justify-content:center;overflow:hidden;}
        .it-grid{position:absolute;inset:0;pointer-events:none;opacity:0;animation:itBg 1.4s ease .1s forwards,itSettle 2s ease .1s forwards;
          background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);
          background-size:72px 72px;
          mask-image:radial-gradient(ellipse 80% 70% at 50% 45%,#000 30%,transparent 100%);
          -webkit-mask-image:radial-gradient(ellipse 80% 70% at 50% 45%,#000 30%,transparent 100%);}
        /* 아래쪽 글로우는 인트로 안에서 투명해져야 합니다 — 섹션 구분선을 없앤 뒤로는
           바닥에 색이 남아 있으면 About과의 경계에 가로줄이 그대로 드러납니다 */
        .it-amb{position:absolute;inset:0;pointer-events:none;opacity:0;animation:itBg 1.6s ease forwards;
          background:radial-gradient(720px 42% at 72% 26%, ${accent}${mode === "dark" ? "1e" : "2a"}, transparent 70%),
                     radial-gradient(560px 34% at 14% 66%, ${cv.deepPink}${mode === "dark" ? "2e" : "24"}, transparent 72%);
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
        .btn:active,.sk-tab:active,.sub-filters button:active,.top-btn:active,.th-tg:active{transform:scale(.97);}

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

        /* accent picker — 도트 + 헤더 아래 토큰 팝오버 */
        .hd-ac{position:relative;display:flex;align-items:center;}
        .hd-sw{width:18px;height:18px;border-radius:50%;border:1px solid var(--line);cursor:pointer;padding:0;transition:transform .2s,box-shadow .25s;box-shadow:0 0 0 3px ${accent}22;}
        .hd-sw:hover{transform:scale(1.12);}
        .hd-sw:focus-visible{outline:2px solid var(--main);outline-offset:3px;}
        .ac-pop{position:absolute;top:calc(100% + 14px);right:-8px;z-index:260;padding:16px 18px 14px;background:var(--bg-card);border:1px solid var(--line);border-radius:12px;box-shadow:0 24px 60px -24px ${accent}${mode === "dark" ? "55" : "44"};opacity:0;visibility:hidden;transform:translateY(-6px);transition:opacity .22s ease,transform .22s ease,visibility .22s;}
        .ac-pop.open{opacity:1;visibility:visible;transform:none;}
        .ac-pop::before{content:"";position:absolute;top:-5px;right:14px;width:9px;height:9px;background:var(--bg-card);border-left:1px solid var(--line);border-top:1px solid var(--line);transform:rotate(45deg);}
        .ac-lb{font-family:${theme.fonts.mono};font-size:12px;line-height:1;margin-bottom:12px;white-space:nowrap;}
        .ac-sws{display:flex;gap:9px;}
        .ac-hint{font-family:${theme.fonts.mono};font-size:10.5px;color:var(--muted);letter-spacing:.04em;margin-top:12px;padding-top:10px;border-top:1px dashed var(--line);white-space:nowrap;}

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
        /* 터치 전용 메뉴라 링크 높이를 손가락 기준으로 확보 */
        .mnav .mnav-ft a{display:inline-flex;align-items:center;min-height:44px;}

        /* ---------- shared surfaces & controls ----------
           여러 섹션이 글자 그대로 똑같이 쓰는 선언만 모읍니다.
           값이 다른 선언(padding·font-size·letter-spacing)은 각 규칙에 그대로 남습니다.
           .sk-tab.act / .sub-filters button.act 는 여기로 올리지 마세요 —
           .sk-tab:hover 와 특이도가 같아 순서가 바뀌면 활성 탭 호버 색이 뒤집힙니다. */
        .tk-card,.md-frm,.pr-bd,.sk-item,.sub-card{background:var(--bg-card);border:1px solid var(--line);border-radius:14px;}
        /* 액션 버튼 — ActionLink.jsx 전용. 라인 호버 체계(배경 채움 금지).
           크기는 컨테이너가 아니라 size prop이 정하므로 섹션별로 어긋날 수 없습니다. */
        .btn{font-family:${theme.fonts.mono};letter-spacing:.08em;border:1px solid var(--line);border-radius:8px;display:inline-flex;align-items:center;justify-content:center;transition:all .25s;}
        .btn-md{min-height:44px;padding:0 20px;font-size:12.5px;}
        .btn-lg{min-height:52px;padding:0 28px;font-size:13px;}
        .btn:hover{transform:translateY(-1px);}
        /* btn-own은 호버 색을 밖에서 넣는 경우 — 전역 액센트 호버를 끕니다 */
        .btn:not(.btn-own):hover{border-color:var(--accent);color:var(--accent);}
        .btn-pri{color:var(--accent);border-color:var(--accent);font-weight:500;}
        .btn-pri:hover{box-shadow:0 12px 28px -14px ${accent}aa;}
        .btn:focus-visible{outline:2px solid var(--main);outline-offset:2px;}
        .sk-tab,.sub-filters button{background:var(--bg-card);border:1px solid var(--line);border-radius:999px;font-family:${theme.fonts.mono};color:var(--muted);cursor:pointer;transition:all .25s;}
        .sk-tab:focus-visible,.sub-filters button:focus-visible{outline:2px solid var(--main);outline-offset:2px;}

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

        /* signature — theme.js token card */
        .tk-card{padding:26px 28px;font-family:${theme.fonts.mono};font-size:13.5px;line-height:2.05;box-shadow:0 30px 80px -30px ${accent}${mode === "dark" ? "33" : "40"};transition:box-shadow .5s,background .45s;}
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
        .tk-hint{font-size:11px;color:var(--muted);letter-spacing:.06em;margin-top:14px;padding-top:14px;border-top:1px dashed var(--line);word-break:keep-all;}

        /* ---------- section common ---------- */
        /* 섹션 구분은 선이 아니라 여백으로 합니다 —
           각 섹션에 큰 번호와 라벨이 있어 선은 중복 신호였고, 5번 반복되며 페이지를 토막 냈습니다 */
        .sec{padding:160px 0;}

        /* ---------- 앰비언트 글로우 ----------
           선을 걷어낸 자리를 빛의 흐름이 대신합니다. 규칙 세 가지:
           1) 중심을 화면 좌우 바깥(-6% / 106%)에 두고 번짐만 들어오게 합니다.
              동그란 덩어리가 아니라 옆에서 스며드는 결로 보입니다.
           2) 세로는 중심 50% · 크기 46% · 페이드 72%라 섹션 위아래 경계에 닿기 전에
              완전히 투명해집니다 — 경계에서 각지게 잘리지 않습니다.
           3) 좌 → 우 → 좌로 번갈아 배치해 위아래 글로우가 세로로 겹치지 않습니다.
           4) 색은 보라~자주 계열(violet · deepPink · 액센트)로만 돌립니다.
              sky·lavender 같은 차가운 색을 섞으니 청보라가 핑크와 부딪혔고,
              반대로 한 색만 쓰면 페이지 전체가 핑크 일변도가 됩니다.
              Skills에만 액센트를 써서 스와치로 색을 바꿀 때 배경도 함께 반응합니다.
           5) 알파는 색마다 다릅니다 — deepPink는 휘도가 낮아(.32) violet(.56)보다
              크게 잡아야 체감 세기가 비슷해집니다. */
        #about,#journey,#skills,#projects{position:relative;isolation:isolate;}
        #about::before,#journey::before,#skills::before,#projects::before{
          content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;transition:background .6s ease;}
        #about::before{
          background:radial-gradient(980px 58% at -6% 50%, ${cv.violet}${mode === "dark" ? "20" : "28"}, transparent 74%);}
        /* Journey에만 초록 한 톤 — 자주색 아래로 흘러내리게 두고,
           휘도가 가장 높아(.80) 알파는 가장 낮게 잡습니다 */
        #journey::before{
          background:radial-gradient(940px 64% at 106% 50%, ${cv.deepPink}${mode === "dark" ? "2c" : "1e"}, transparent 74%),
                     radial-gradient(700px 26% at 100% 76%, ${cv.violet}${mode === "dark" ? "10" : "18"}, transparent 60%);}
        #skills::before{
          background:radial-gradient(900px 58% at -6% 50%, ${accent}${mode === "dark" ? "18" : "22"}, transparent 74%);}
        /* 프로젝트는 세로로 길어 두 덩이를 위아래로 떨어뜨려 넣습니다 */
        #projects::before{
          background:radial-gradient(940px 30% at 106% 24%, ${cv.violet}${mode === "dark" ? "1e" : "26"}, transparent 74%),
                     radial-gradient(880px 28% at -6% 72%, ${cv.deepPink}${mode === "dark" ? "28" : "1c"}, transparent 74%);}
        .sec-ttl{display:flex;align-items:baseline;gap:18px;margin-bottom:64px;flex-wrap:wrap;}
        .sec-ttl .no{font-family:${theme.fonts.num};font-size:52px;line-height:1;color:transparent;-webkit-text-stroke:1px var(--accent);}
        .sec-ttl h2{font-size:clamp(22px,2.8vw,34px);font-weight:800;letter-spacing:-0.01em;word-break:keep-all;}
        .sec-ttl .lb{font-family:${theme.fonts.disp};font-size:10px;font-weight:700;letter-spacing:.32em;color:var(--muted);width:100%;}

        /* ---------- project media (browser frame + hover) ---------- */
        .md-frm{display:block;position:relative;overflow:hidden;transition:transform .35s ease,border-color .3s,background .45s;}
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
        /* 1열로 접힐 때 이미지가 화면 가로 중앙에 오도록 — 2열에서는 컬럼 폭이 400px에 가까워 영향 없음 */
        .pr-frm{position:relative;max-width:400px;margin-inline:auto;}
        .pr-frm::after{content:"";position:absolute;inset:0;border:1.5px solid var(--accent);border-radius:14px;transform:translate(14px,14px);transition:transform .35s ease,border-color .3s;pointer-events:none;}
        .pr-frm:hover::after{transform:translate(6px,6px);}
        .pr-bd{position:relative;aspect-ratio:4/5;overflow:hidden;box-shadow:0 30px 80px -30px ${accent}${mode === "dark" ? "44" : "3a"};transition:background .45s,box-shadow .5s;}
        .pr-bd img{width:100%;height:100%;object-fit:cover;display:block;filter:saturate(.92);transition:filter .35s;}
        .pr-frm:hover .pr-bd img{filter:none;}

        /* ---------- about ---------- */
        .ab-grid{display:grid;grid-template-columns:.9fr 1.1fr;gap:clamp(48px,5vw,76px);align-items:center;}
        .ab-txt p{color:var(--sub);font-size:16px;line-height:1.8;margin-bottom:22px;word-break:keep-all;}
        /* 도입 문단만 한 단계 키워 시선 진입점을 만듭니다 */
        .ab-txt > p:first-of-type{font-size:17.5px;color:var(--main);margin-bottom:26px;}
        .ab-txt strong{color:var(--main);}
        /* .ab-txt p 보다 특이도를 높여야 인용구 스타일이 눌리지 않습니다 */
        .ab-txt p.ab-quote{font-family:${theme.fonts.mono};font-size:13px;line-height:1.7;color:var(--accent);border-left:2px solid var(--accent);padding-left:16px;margin:36px 0 0;transition:color .3s,border-color .3s;}
        .ab-sns{display:flex;gap:12px;flex-wrap:wrap;margin-top:52px;}

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
        .sk-tab{padding:10px 22px;font-size:12.5px;letter-spacing:.08em;}
        .sk-tab:hover{color:var(--main);}
        .sk-tab.act{background:var(--accent);border-color:var(--accent);color:var(--bg);font-weight:500;}
        .sk-list{display:grid;grid-template-columns:1fr 1fr;gap:18px;}
        .sk-item{padding:26px 28px;transition:border-color .3s,background .45s;}
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

        /* ---------- sub projects ---------- */
        /* 메인과 서브는 같은 04 섹션 안의 다른 묶음이라, 섹션 사이 여백(160px)에 근접하게 띄웁니다 */
        .sub-hd{display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap;margin:190px 0 40px;}
        .sub-ttl{font-family:${theme.fonts.disp};font-size:12px;font-weight:700;letter-spacing:.3em;color:var(--muted);}
        .sub-filters{display:flex;gap:8px;}
        .sub-filters button{padding:8px 18px;font-size:11.5px;letter-spacing:.1em;}
        .sub-filters button.act{background:var(--accent);border-color:var(--accent);color:var(--bg);}
        .sub-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;}
        .sub-card{padding:26px 28px;display:flex;flex-direction:column;transition:border-color .3s,transform .3s,background .45s;}
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

        /* ---------- contact ----------
           인트로와 같은 풀스크린으로 페이지를 수미상관으로 닫습니다.
           카피라이트는 흐름에서 떼어 바닥에 붙입니다. */
        .ft{min-height:100dvh;padding:120px 0 40px;text-align:center;position:relative;display:flex;flex-direction:column;justify-content:center;}
        /* 마무리 섹션은 아래에서 올라오는 빛 하나만 — 좌상단에 하나 더 두니 방향이 겹쳐 지저분했습니다 */
        .ft-bg{position:absolute;inset:0;pointer-events:none;
          background:radial-gradient(720px 46% at 50% 78%, ${cv.deepPink}${mode === "dark" ? "33" : "26"}, transparent 72%);
          transition:background .6s ease;}
        .ft .inner{position:relative;}
        .ft-ttl{font-family:${theme.fonts.num};font-size:clamp(48px,8vw,110px);line-height:.95;letter-spacing:.02em;margin-bottom:26px;}
        .ft-ttl b{color:var(--accent);font-weight:400;transition:color .3s;}
        .ft p{color:var(--sub);margin-bottom:46px;word-break:keep-all;}
        .ft-links{display:flex;justify-content:center;gap:24px;flex-wrap:wrap;}
        .ft-copy{position:absolute;left:0;right:0;bottom:40px;font-family:${theme.fonts.mono};font-size:11px;letter-spacing:.14em;color:var(--muted);}

        /* ---------- responsive ---------- */
        @media (max-width:960px){
          .hero .inner{grid-template-columns:1fr;gap:48px;}
          /* 1열로 접히면 글부터 읽히도록 — 데스크톱의 이미지 왼쪽 배치와 반대 순서 */
          /* 1열에서는 타이틀 → 이미지 → 본문 순서 — 얼굴이 먼저 각인되고 긴 본문 앞에 쉼표가 생깁니다 */
          .ab-grid{grid-template-columns:1fr;gap:52px;justify-items:center;}
          .ab-grid > :first-child{width:100%;}
          .ab-grid > .ab-txt{justify-self:stretch;}
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
          .ac-pop{right:-4px;}
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
          .pf-links .btn,.ft-links .btn{width:100%;}
          .ft{padding:110px 0 60px;}
        }
  `;
}
