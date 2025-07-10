2:I[4707,[],""]
3:I[6423,[],""]
4:{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"}
5:{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"}
6:{"display":"inline-block"}
7:{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0}
8:T687,
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
            0:["FWvOXAGvwiVKshsLFhnaC",[[["",{"children":["/_not-found",{"children":["__PAGE__",{}]}]},"$undefined","$undefined",true],["",{"children":["/_not-found",{"children":["__PAGE__",{},[["$L1",[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":"404"}],["$","div",null,{"style":{"display":"inline-block"},"children":["$","h2",null,{"style":{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0},"children":"This page could not be found."}]}]]}]}]],null],null],null]},[null,["$","$L2",null,{"parallelRouterKey":"children","segmentPath":["children","/_not-found","children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L3",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","notFoundStyles":"$undefined"}]],null]},[[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/60ad68199f8e7d39.css","precedence":"next","crossOrigin":"$undefined"}]],["$","html",null,{"lang":"en","children":[["$","head",null,{"children":[["$","link",null,{"rel":"icon","href":"/favicon.ico"}],["$","meta",null,{"name":"theme-color","content":"#0a0a0f"}]]}],["$","body",null,{"className":"cyber-container","children":[["$","div",null,{"className":"matrix-bg","id":"matrix-bg"}],["$","$L2",null,{"parallelRouterKey":"children","segmentPath":["children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L3",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":"$4","children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":"$5","children":"404"}],["$","div",null,{"style":"$6","children":["$","h2",null,{"style":"$7","children":"This page could not be found."}]}]]}]}]],"notFoundStyles":[]}],["$","script",null,{"dangerouslySetInnerHTML":{"__html":"$8"}}]]}]]}]],null],null],["$L9",["$","meta",null,{"name":"robots","content":"noindex"}]]]]]
9:[["$","meta","0",{"name":"viewport","content":"width=device-width, initial-scale=1"}],["$","meta","1",{"name":"theme-color","content":"#0a0a0f"}],["$","meta","2",{"charSet":"utf-8"}],["$","title","3",{"children":"SQL Injection Lab | Cybersecurity Training"}],["$","meta","4",{"name":"description","content":"A comprehensive SQL injection testing lab with multiple vulnerability levels for cybersecurity education and penetration testing practice."}],["$","meta","5",{"name":"author","content":"Security Lab Team"}],["$","meta","6",{"name":"keywords","content":"SQL injection, cybersecurity, penetration testing, security lab, ethical hacking"}]]
1:null
