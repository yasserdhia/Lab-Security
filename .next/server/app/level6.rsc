2:I[9107,[],"ClientPageRoot"]
3:I[1291,["229","static/chunks/229-f29a117295b4be11.js","991","static/chunks/app/level6/page-93fae79154799c6a.js"],"default",1]
4:I[4707,[],""]
5:I[6423,[],""]
6:T687,
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
            0:["FWvOXAGvwiVKshsLFhnaC",[[["",{"children":["level6",{"children":["__PAGE__",{}]}]},"$undefined","$undefined",true],["",{"children":["level6",{"children":["__PAGE__",{},[["$L1",["$","$L2",null,{"props":{"params":{},"searchParams":{}},"Component":"$3"}],null],null],null]},[null,["$","$L4",null,{"parallelRouterKey":"children","segmentPath":["children","level6","children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","notFoundStyles":"$undefined"}]],null]},[[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/60ad68199f8e7d39.css","precedence":"next","crossOrigin":"$undefined"}]],["$","html",null,{"lang":"en","children":[["$","head",null,{"children":[["$","link",null,{"rel":"icon","href":"/favicon.ico"}],["$","meta",null,{"name":"theme-color","content":"#0a0a0f"}]]}],["$","body",null,{"className":"cyber-container","children":[["$","div",null,{"className":"matrix-bg","id":"matrix-bg"}],["$","$L4",null,{"parallelRouterKey":"children","segmentPath":["children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":"404"}],["$","div",null,{"style":{"display":"inline-block"},"children":["$","h2",null,{"style":{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0},"children":"This page could not be found."}]}]]}]}]],"notFoundStyles":[]}],["$","script",null,{"dangerouslySetInnerHTML":{"__html":"$6"}}]]}]]}]],null],null],["$L7",null]]]]
7:[["$","meta","0",{"name":"viewport","content":"width=device-width, initial-scale=1"}],["$","meta","1",{"name":"theme-color","content":"#0a0a0f"}],["$","meta","2",{"charSet":"utf-8"}],["$","title","3",{"children":"SQL Injection Lab | Cybersecurity Training"}],["$","meta","4",{"name":"description","content":"A comprehensive SQL injection testing lab with multiple vulnerability levels for cybersecurity education and penetration testing practice."}],["$","meta","5",{"name":"author","content":"Security Lab Team"}],["$","meta","6",{"name":"keywords","content":"SQL injection, cybersecurity, penetration testing, security lab, ethical hacking"}]]
1:null
