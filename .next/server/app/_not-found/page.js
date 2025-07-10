(()=>{var e={};e.id=409,e.ids=[409],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},8103:(e,t,n)=>{"use strict";n.r(t),n.d(t,{GlobalError:()=>o.a,__next_app__:()=>f,originalPathname:()=>u,pages:()=>d,routeModule:()=>m,tree:()=>l}),n(7352),n(5866),n(2029);var r=n(3191),a=n(8716),i=n(7922),o=n.n(i),s=n(5231),c={};for(let e in s)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(c[e]=()=>s[e]);n.d(t,c);let l=["",{children:["/_not-found",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(n.t.bind(n,5866,23)),"next/dist/client/components/not-found-error"]}]},{}]},{layout:[()=>Promise.resolve().then(n.bind(n,2029)),"c:\\Users\\YASSER\\Documents\\GitHub\\Lab-Security\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(n.t.bind(n,5866,23)),"next/dist/client/components/not-found-error"]}],d=[],u="/_not-found/page",f={require:n,loadChunk:()=>Promise.resolve()},m=new r.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/_not-found/page",pathname:"/_not-found",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},4601:(e,t,n)=>{Promise.resolve().then(n.t.bind(n,2994,23)),Promise.resolve().then(n.t.bind(n,6114,23)),Promise.resolve().then(n.t.bind(n,9727,23)),Promise.resolve().then(n.t.bind(n,9671,23)),Promise.resolve().then(n.t.bind(n,1868,23)),Promise.resolve().then(n.t.bind(n,4759,23))},9170:()=>{},6399:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{isNotFoundError:function(){return a},notFound:function(){return r}});let n="NEXT_NOT_FOUND";function r(){let e=Error(n);throw e.digest=n,e}function a(e){return"object"==typeof e&&null!==e&&"digest"in e&&e.digest===n}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},7352:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{PARALLEL_ROUTE_DEFAULT_PATH:function(){return a},default:function(){return i}});let r=n(6399),a="next/dist/client/components/parallel-route-default.js";function i(){(0,r.notFound)()}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},2029:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>o,metadata:()=>a,viewport:()=>i});var r=n(9510);n(5023);let a={title:"SQL Injection Lab | Cybersecurity Training",description:"A comprehensive SQL injection testing lab with multiple vulnerability levels for cybersecurity education and penetration testing practice.",keywords:"SQL injection, cybersecurity, penetration testing, security lab, ethical hacking",authors:[{name:"Security Lab Team"}]},i={width:"device-width",initialScale:1,themeColor:"#0a0a0f"};function o({children:e}){return(0,r.jsxs)("html",{lang:"en",children:[(0,r.jsxs)("head",{children:[r.jsx("link",{rel:"icon",href:"/favicon.ico"}),r.jsx("meta",{name:"theme-color",content:"#0a0a0f"})]}),(0,r.jsxs)("body",{className:"cyber-container",children:[r.jsx("div",{className:"matrix-bg",id:"matrix-bg"}),e,r.jsx("script",{dangerouslySetInnerHTML:{__html:`
              // Matrix rain effect
              function createMatrixRain() {
                const container = document.getElementById('matrix-bg');
                if (!container) return;
                
                const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@#$%^&*()';
                
                function createChar() {
                  const char = document.createElement('div');
                  char.className = 'matrix-char';
                  char.textContent = chars[Math.floor(Math.random() * chars.length)];
                  char.style.left = Math.random() * 100 + '%';
                  char.style.animationDuration = (Math.random() * 15 + 10) + 's';
                  char.style.animationDelay = Math.random() * 5 + 's';
                  container.appendChild(char);
                  
                  setTimeout(() => {
                    if (container.contains(char)) {
                      container.removeChild(char);
                    }
                  }, 25000);
                }
                
                // Create initial characters
                for (let i = 0; i < 50; i++) {
                  setTimeout(createChar, Math.random() * 5000);
                }
                
                // Continue creating characters
                setInterval(createChar, 300);
              }
              
              // Start matrix effect after page loads
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', createMatrixRain);
              } else {
                createMatrixRain();
              }
            `}})]})]})}},5023:()=>{}};var t=require("../../webpack-runtime.js");t.C(e);var n=e=>t(t.s=e),r=t.X(0,[276,471],()=>n(8103));module.exports=r})();