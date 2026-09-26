(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,56856,80510,e=>{"use strict";let t={png:"image/png",jpg:"image/jpeg",jpeg:"image/jpeg",gif:"image/gif",webp:"image/webp",svg:"image/svg+xml",bmp:"image/bmp",ico:"image/x-icon",avif:"image/avif"},s={mp3:"audio/mpeg",wav:"audio/wav",ogg:"audio/ogg",oga:"audio/ogg",opus:"audio/ogg",m4a:"audio/mp4",aac:"audio/aac",flac:"audio/flac",weba:"audio/webm"},n={mp4:"video/mp4",m4v:"video/mp4",webm:"video/webm",mov:"video/quicktime",ogv:"video/ogg"},o={pdf:"application/pdf",docx:"application/vnd.openxmlformats-officedocument.wordprocessingml.document"};function r(e){return(e.replace(/\\/g,"/").split("/").pop()??"").toLowerCase().split(".").pop()??""}function a(e){return t[r(e)]??null}function i(e){return s[r(e)]??null}function l(e){return n[r(e)]??null}function u(e){let t=r(e);return"pdf"===t||"docx"===t?t:null}e.s(["DOCX_PREVIEW_MAX_BYTES",0,0xa00000,"TEXT_PREVIEW_MAX_BYTES",0,262144,"documentPreviewKind",0,u,"getAudioMime",0,i,"getDocumentMime",0,function(e){return o[r(e)]??null},"getFileExt",0,r,"getImageMime",0,a,"getVideoMime",0,l,"isAudioPath",0,function(e){return null!==i(e)},"isDocumentPreviewPath",0,function(e){return null!==u(e)},"isImagePath",0,function(e){return null!==a(e)},"isVideoPath",0,function(e){return null!==l(e)}],56856);let c="/coding-harness-research/pi-web";e.s(["demoAssetPath",0,function(e){return`${c}${e.startsWith("/")?e:`/${e}`}`},"demoRouterPath",0,function(){let{pathname:e}=window.location;return(c&&e.startsWith(c)?e.slice(c.length):e)||"/"}],80510)},86551,e=>{"use strict";function t(){return{userMessages:0,assistantMessages:0,toolCalls:0,toolResults:0,totalMessages:0,tokens:{input:0,output:0,cacheRead:0,cacheWrite:0,total:0},cost:0}}function s(e,t){t&&(e.tokens.input+=t.input??0,e.tokens.output+=t.output??0,e.tokens.cacheRead+=t.cacheRead??0,e.tokens.cacheWrite+=t.cacheWrite??0,e.cost+=t.cost?.total??0)}function n(e,t){e.totalMessages+=1,"user"===t.role?e.userMessages+=1:"toolResult"===t.role?(e.toolResults+=1,s(e,t.usage)):"assistant"===t.role&&(e.assistantMessages+=1,Array.isArray(t.content)&&(e.toolCalls+=t.content.filter(e=>"toolCall"===e.type).length),s(e,t.usage))}function o(e){return e.tokens.total=e.tokens.input+e.tokens.output+e.tokens.cacheRead+e.tokens.cacheWrite,e}function r(e){let s=t();for(let t of e)"custom"!==t.role&&n(s,t);return o(s)}e.s(["computeSessionStats",0,function(e){let r=t();for(let t of e){if("compaction"===t.type||"branch_summary"===t.type||"usage"===t.type){s(r,t.usage);continue}"message"===t.type&&n(r,t.message)}return o(r)},"mergeSessionStats",0,function(e,t,s){let n=r(s);if(!e)return n;let o=r(t),a=(e,t)=>Math.max(0,e-t),i={input:e.tokens.input+a(n.tokens.input,o.tokens.input),output:e.tokens.output+a(n.tokens.output,o.tokens.output),cacheRead:e.tokens.cacheRead+a(n.tokens.cacheRead,o.tokens.cacheRead),cacheWrite:e.tokens.cacheWrite+a(n.tokens.cacheWrite,o.tokens.cacheWrite),total:0};return i.total=i.input+i.output+i.cacheRead+i.cacheWrite,{userMessages:e.userMessages+a(n.userMessages,o.userMessages),assistantMessages:e.assistantMessages+a(n.assistantMessages,o.assistantMessages),toolCalls:e.toolCalls+a(n.toolCalls,o.toolCalls),toolResults:e.toolResults+a(n.toolResults,o.toolResults),totalMessages:e.totalMessages+a(n.totalMessages,o.totalMessages),tokens:i,cost:e.cost+a(n.cost,o.cost)}}])},81879,e=>{e.v(e=>Promise.resolve().then(()=>e(86551)))},95364,e=>{"use strict";let t="configured",s=["configured","none","read-only","default","full"],n=[],o=["read","grep","find","ls"],r=["read","bash","edit","write"],a=["bash","read","edit","write","grep","find","ls"],i=new Set([...a,"powershell"]);function l(e){if(0===e.length)return"none";let t=e.map(e=>"powershell"===e?"bash":e).filter(e=>i.has(e)).sort().join(",");return t===[...o].sort().join(",")?"read-only":t===[...r].sort().join(",")?"default":t===[...a].sort().join(",")?"full":"default"}e.s(["CONFIGURED_TOOL_PRESET",0,t,"getPresetFromToolNames",0,l,"getPresetFromTools",0,function(e){return l(e.filter(e=>e.active).map(e=>e.name))},"getToolNamesForPreset",0,function(e){if(e!==t)return"none"===e?[...n]:"read-only"===e?[...o]:"full"===e?[...a]:[...r]},"isToolPreset",0,function(e){return"string"==typeof e&&s.includes(e)}])},11363,e=>{e.v(e=>Promise.resolve().then(()=>e(95364)))},14987,29373,30948,e=>{"use strict";var t=e.i(56856),s=e.i(80510),n=e.i(47173),o=e.i(93981);let r=[{key:"readme-help-tip",path:"README.md",edits:[{oldText:"## Quick Start\n",newText:"## Quick Start\n\n> **Tip:** run `pi-web --help` to list every startup option before you launch it.\n"}]},{key:"appshell-format-duration",path:"components/AppShell.tsx",edits:[{oldText:'import { copyText } from "@/lib/clipboard";\n',newText:'import { copyText } from "@/lib/clipboard";\nimport { formatDuration } from "@/lib/format-duration";\n'},{oldText:'                    const formatDuration = (ms: number) => {\n                      if (ms <= 0) return "0s";\n                      const totalSec = Math.floor(ms / 1000);\n                      const h = Math.floor(totalSec / 3600);\n                      const m = Math.floor((totalSec % 3600) / 60);\n                      const s = totalSec % 60;\n                      if (h > 0) return `${h}h ${m}m`;\n                      if (m > 0) return `${m}m ${s}s`;\n                      return `${s}s`;\n                    };\n',newText:""}]}],a={"lib/format-duration.ts":'/**\n * Compact duration label for the session stats panel: "42s", "5m 3s", "1h 5m".\n * Anything under a second, and invalid input, renders as "0s".\n */\nexport function formatDuration(ms: number): string {\n  if (!Number.isFinite(ms) || ms <= 0) return "0s";\n  const totalSeconds = Math.floor(ms / 1000);\n  const hours = Math.floor(totalSeconds / 3600);\n  const minutes = Math.floor((totalSeconds % 3600) / 60);\n  const seconds = totalSeconds % 60;\n  if (hours > 0) return `${hours}h ${minutes}m`;\n  if (minutes > 0) return `${minutes}m ${seconds}s`;\n  return `${seconds}s`;\n}\n',"lib/format-duration.test.mjs":'import assert from "node:assert/strict";\nimport test from "node:test";\nimport { createJiti } from "jiti";\n\nconst jiti = createJiti(import.meta.url);\nconst { formatDuration } = await jiti.import("./format-duration.ts");\n\ntest("formats seconds, minutes and hours", () => {\n  assert.equal(formatDuration(42_000), "42s");\n  assert.equal(formatDuration(5 * 60_000 + 3_000), "5m 3s");\n  assert.equal(formatDuration(65 * 60_000), "1h 5m");\n});\n\ntest("drops partial seconds like the old inline helper", () => {\n  assert.equal(formatDuration(1_999), "1s");\n  assert.equal(formatDuration(999), "0s");\n});\n\ntest("renders empty and invalid durations as 0s", () => {\n  for (const value of [0, -500, Number.NaN, Number.POSITIVE_INFINITY]) {\n    assert.equal(formatDuration(value), "0s");\n  }\n});\n'},i={"notes.md":"# Scratch notes\n\nPi Web's **Use default directory** creates a dated folder like this one for quick questions that don't belong to a project.\n\n- Sessions here use the *Chat only* tool preset: no file or shell access.\n- Switch projects with the picker at the top of the sidebar.\n","sse-vs-websocket.md":"# SSE vs WebSocket\n\n| | Server-Sent Events | WebSocket |\n| --- | --- | --- |\n| Direction | server → client | both ways |\n| Protocol | plain HTTP | upgraded connection |\n| Reconnect | built into EventSource | do it yourself |\n| Proxies | usually just work | need upgrade support |\n\nPi Web streams agent events over SSE and sends commands with ordinary POST requests.\n"};e.s(["FORMAT_DURATION_TEST_OUTPUT",0,"TAP version 13\n# Subtest: formats seconds, minutes and hours\nok 1 - formats seconds, minutes and hours\n  ---\n  duration_ms: 1.027562\n  type: 'test'\n  ...\n# Subtest: drops partial seconds like the old inline helper\nok 2 - drops partial seconds like the old inline helper\n  ---\n  duration_ms: 0.178082\n  type: 'test'\n  ...\n# Subtest: renders empty and invalid durations as 0s\nok 3 - renders empty and invalid durations as 0s\n  ---\n  duration_ms: 0.15196\n  type: 'test'\n  ...\n1..3\n# tests 3\n# suites 0\n# pass 3\n# fail 0\n# cancelled 0\n# skipped 0\n# todo 0\n# duration_ms 318.133831","PROJECT_FILE_EDITS",0,r,"PROJECT_FILE_OVERRIDES",0,a,"SCRATCH_FILES",0,i],29373);let l=`from flask import Flask, request, jsonify

app = Flask(__name__)

users = []


@app.route("/signup", methods=["POST"])
def signup():
    email = request.form.get("email", "")
    password = request.form.get("password", "")

    if not password:
        return jsonify({"error": "password is required"}), 400

    users.append({"email": email, "password": password})
    return jsonify({"status": "ok"}), 201


if __name__ == "__main__":
    app.run(debug=True)
`,u=`from flask import Flask, request, jsonify

app = Flask(__name__)

users = []


@app.route("/signup", methods=["POST"])
def signup():
    email = request.form.get("email", "")
    password = request.form.get("password", "")

    if not email:
        return jsonify({"error": "email is required"}), 400

    if not password:
        return jsonify({"error": "password is required"}), 400

    users.append({"email": email, "password": password})
    return jsonify({"status": "ok"}), 201


if __name__ == "__main__":
    app.run(debug=True)
`,c=`from flask import Flask, request, jsonify
import re

app = Flask(__name__)

EMAIL_RE = re.compile(r"^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$")

users = []


@app.route("/signup", methods=["POST"])
def signup():
    email = request.form.get("email", "")
    password = request.form.get("password", "")

    if not email or not EMAIL_RE.match(email):
        return jsonify({"error": "a valid email is required"}), 400

    if not password:
        return jsonify({"error": "password is required"}), 400

    users.append({"email": email, "password": password})
    return jsonify({"status": "ok"}), 201


if __name__ == "__main__":
    app.run(debug=True)
`,p=`import pytest

from app import app, users


@pytest.fixture(autouse=True)
def clear_users():
    users.clear()
    yield
    users.clear()


@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


def test_signup_requires_password(client):
    response = client.post("/signup", data={"email": "a@example.com"})
    assert response.status_code == 400


def test_signup_only_accepts_valid_users(client):
    client.post("/signup", data={"email": "a@example.com", "password": "hunter2"})
    client.post("/signup", data={"email": "", "password": "hunter2"})
    assert len(users) == 1
`,d=`${p}

def test_signup_rejects_empty_email(client):
    response = client.post("/signup", data={"email": "", "password": "hunter2"})
    assert response.status_code == 400
    assert response.json == {"error": "email is required"}
`,m=`============================= test session starts ==============================
platform linux -- Python 3.12.4, pytest-8.3.2, pluggy-1.5.0
rootdir: /Users/demo/code/signup-app
collected 2 items

test_app.py::test_signup_requires_password PASSED                       [ 50%]
test_app.py::test_signup_only_accepts_valid_users FAILED                 [100%]

=================================== FAILURES ====================================
_____________________ test_signup_only_accepts_valid_users ______________________

client = <FlaskClient <Flask 'app'>>

    def test_signup_only_accepts_valid_users(client):
        client.post("/signup", data={"email": "a@example.com", "password": "hunter2"})
        client.post("/signup", data={"email": "", "password": "hunter2"})
>       assert len(users) == 1
E       AssertionError: assert 2 == 1
E        +  where 2 = len([{'email': 'a@example.com', 'password': 'hunter2'}, {'email': '', 'password': 'hunter2'}])

test_app.py:22: AssertionError
=========================== short test summary info ============================
FAILED test_app.py::test_signup_only_accepts_valid_users - assert 2 == 1
========================= 1 failed, 1 passed in 0.07s ===========================`,f=`============================= test session starts ==============================
platform linux -- Python 3.12.4, pytest-8.3.2, pluggy-1.5.0
rootdir: /Users/demo/code/signup-app
collected 2 items

test_app.py::test_signup_requires_password PASSED                       [ 50%]
test_app.py::test_signup_only_accepts_valid_users PASSED                 [100%]

============================== 2 passed in 0.06s ================================`,_=`============================= test session starts ==============================
platform linux -- Python 3.12.4, pytest-8.3.2, pluggy-1.5.0
rootdir: /Users/demo/code/signup-app
collected 3 items

test_app.py::test_signup_requires_password PASSED                       [ 33%]
test_app.py::test_signup_only_accepts_valid_users PASSED                 [ 66%]
test_app.py::test_signup_rejects_empty_email PASSED                      [100%]

============================== 3 passed in 0.07s ================================`,h={"app.py":l,"test_app.py":p};function g(){return h}e.s(["SIGNUP_APP_AFTER",0,u,"SIGNUP_APP_BEFORE",0,l,"SIGNUP_APP_WITH_FORMAT_CHECK",0,c,"SIGNUP_PYTEST_FAILING",0,m,"SIGNUP_PYTEST_PASSING",0,f,"SIGNUP_PYTEST_PASSING_3",0,_,"SIGNUP_TEST_BEFORE",0,p,"SIGNUP_TEST_WITH_EMPTY_EMAIL_CASE",0,d,"signupCommitOutput",0,function(e){let t=3+6*!!e.includes("test_app.py"),s=1===e.length?"1 file":`${e.length} files`;return`[main 4f9a2c1] Reject signup requests with an empty email
 ${s} changed, ${t} insertions(+)`},"signupProjectFiles",0,g,"writeSignupProjectFile",0,function(e,t){h={...h,[e]:t}}],30948);let y=new Set(["node_modules",".git",".next","dist","build","__pycache__",".turbo",".cache","coverage",".pytest_cache",".mypy_cache","target","vendor",".DS_Store"]),T={ts:"typescript",tsx:"typescript",js:"javascript",jsx:"javascript",mjs:"javascript",cjs:"javascript",py:"python",rb:"ruby",go:"go",rs:"rust",java:"java",kt:"kotlin",swift:"swift",c:"c",cpp:"cpp",h:"c",hpp:"cpp",cs:"csharp",html:"html",htm:"html",css:"css",scss:"css",less:"css",json:"json",jsonl:"json",yaml:"yaml",yml:"yaml",toml:"toml",xml:"xml",md:"markdown",mdx:"markdown",sh:"bash",bash:"bash",zsh:"bash",fish:"bash",sql:"sql",graphql:"graphql",gql:"graphql",dockerfile:"dockerfile",tf:"hcl",hcl:"hcl",env:"bash",gitignore:"bash",txt:"text",pdf:"pdf",docx:"word"};function w(e){return new TextEncoder().encode(e).length}let k=null;function v(){return k??=(0,o.getRealFetch)()((0,s.demoAssetPath)("/demo-files/manifest.json")).then(e=>{if(!e.ok)throw Error(`HTTP ${e.status}`);return e.json()}).then(e=>e.files).catch(e=>{throw k=null,e})}let P=new Map(Object.entries(a).map(([e,t])=>[e,{path:e,size:w(t),content:t}])),S=new Map,E=null;async function R(e){return await j[0].load(),S.get(e)??null}let j=[{root:n.PROJECT_ROOT,async load(){let e=await v();await (E??=(async()=>{for(let{path:t,edits:s}of r){let n=e.find(e=>e.path===t);if(!n)continue;let o=await I(n).catch(()=>null);if(null===o)continue;let r=o;for(let e of s)r.includes(e.oldText)&&(r=r.replace(e.oldText,e.newText));r!==o&&(S.set(t,o),P.has(t)||P.set(t,{path:t,size:w(r),content:r}))}})().catch(()=>{E=null}));let t=new Map(e.map(e=>[e.path,e]));for(let[e,s]of P)t.set(e,s);return[...t.values()]}},{root:n.WORKTREE_ROOT,load:async()=>v()},{root:n.SCRATCH_ROOT,load:async()=>Object.entries(i).map(([e,t])=>({path:e,size:w(t),content:t}))},{root:n.SIGNUP_ROOT,load:async()=>Object.entries(g()).map(([e,t])=>({path:e,size:w(t),content:t}))}],b=j.map(e=>e.root);async function O(e){let t=j.find(t=>t.root===e);return t?t.load():[]}async function x(e){let t=function(e){for(let t of j){if(e===t.root)return{project:t,relative:""};if(e.startsWith(`${t.root}/`))return{project:t,relative:e.slice(t.root.length+1)}}return null}(e.replace(/\/+$/,"")||"/");if(!t)return null;if(""===t.relative)return{kind:"dir",relative:"",root:t.project.root};let s=await t.project.load(),n=s.find(e=>e.path===t.relative);if(n)return{kind:"file",file:n,relative:t.relative,root:t.project.root};let o=`${t.relative}/`;return s.some(e=>e.path.startsWith(o))?{kind:"dir",relative:t.relative,root:t.project.root}:null}async function A(e){let t=await x(e);if(!t||"dir"!==t.kind)return null;let s=await O(t.root),n=t.relative?`${t.relative}/`:"",o=new Map;for(let e of s){if(!e.path.startsWith(n))continue;let[t,...s]=e.path.slice(n.length).split("/");!t||y.has(t)||t.endsWith(".pyc")||o.set(t,(o.get(t)??!1)||s.length>0)}return[...o.entries()].map(([e,t])=>({name:e,isDir:t,size:0,modified:""})).sort((e,t)=>e.isDir!==t.isDir?e.isDir?-1:1:e.name.localeCompare(t.name))}let M=new Map;async function I(e){if(void 0!==e.content)return e.content;let t=e.asset,s=M.get(t);return s||((s=(0,o.getRealFetch)()($(e)).then(e=>{if(!e.ok)throw Error(`HTTP ${e.status}`);return e.text()})).catch(()=>M.delete(t)),M.set(t,s)),s}async function C(e){let t=await x(e);return t?.kind==="file"?I(t.file):null}function $(e){return e.asset?(0,s.demoAssetPath)(`/demo-files/f/${e.asset}`):null}function F(e){return(0,t.getImageMime)(e)||(0,t.getAudioMime)(e)||(0,t.getVideoMime)(e)||(0,t.getDocumentMime)(e)||"text/plain"}function q(e){return"text/plain"!==F(e)}let D=new Map;e.s(["PROJECT_ROOTS",0,b,"assetUrl",0,$,"fileMeta",0,function(e,s){let n;return{size:s.size,language:"dockerfile"===(n=(e.split("/").pop()??"").toLowerCase())||n.startsWith("dockerfile.")?"dockerfile":".env"===n||n.startsWith(".env.")?"bash":"makefile"===n||"gnumakefile"===n?"makefile":T[n.split(".").pop()??""]??"text",mime:F(e),previewKind:(0,t.documentPreviewKind)(e)}},"isBinaryPath",0,q,"listDirectory",0,A,"lookup",0,x,"originalText",0,R,"primeAssetLookup",0,function(){return v().then(e=>{for(let t of e)t.asset&&(D.set(`${n.PROJECT_ROOT}/${t.path}`,t.asset),D.set(`${n.WORKTREE_ROOT}/${t.path}`,t.asset))}).catch(()=>{})},"projectFiles",0,O,"readFileText",0,I,"readProjectText",0,C,"staticFileUrlForApi",0,function(e){let t=new URL(e,"http://demo.invalid"),o=t.searchParams.get("type");if("read"!==o&&"download"!==o)return e;let r="/"+t.pathname.replace(/^\/api\/files\//,"").split("/").map(decodeURIComponent).join("/");if("read"===o&&!q(r))return e;let a=function(e){let t=(0,n.relativeToProject)(e,n.PROJECT_ROOT);if(t)return P.get(t)?.content;let s=(0,n.relativeToProject)(e,n.SCRATCH_ROOT);if(s&&Object.hasOwn(i,s))return i[s]}(r);if(void 0!==a)return"download"===o?`data:text/plain;charset=utf-8,${encodeURIComponent(a)}`:e;let l=D.get(r);return l?(0,s.demoAssetPath)(`/demo-files/f/${l}`):e},"textChunk",0,function(e,s){let n=new TextEncoder().encode(e),o=Math.min(n.length,s+t.TEXT_PREVIEW_MAX_BYTES);for(;o<n.length&&o>s&&(192&n[o])==128;)o--;return{content:new TextDecoder().decode(n.slice(s,o)),nextOffset:o,truncated:o<n.length,language:"",size:n.length}}],14987)},56413,e=>{e.v(e=>Promise.resolve().then(()=>e(14987)))},47173,e=>{"use strict";let t="/Users/demo",s=`${t}/.pi/agent`,n=`${t}/code/pi-web`,o=`${t}/pi-cwd-20260918`,r=`${t}/code/signup-app`,a=`${t}/code/pi-web-worktrees/feat-session-timer`;e.s(["AGENT_DIR",0,s,"HOME",0,t,"PROJECT_BRANCH",0,"main","PROJECT_ROOT",0,n,"SCRATCH_ROOT",0,o,"SIGNUP_ROOT",0,r,"WORKTREE_BRANCH",0,"feat/session-timer","WORKTREE_ROOT",0,a,"relativeToProject",0,function(e,t=n){return e===t?"":e.startsWith(`${t}/`)?e.slice(t.length+1):null},"sessionFilePath",0,function(e,t,n){return`${s}/sessions/--${e.replace(/^[/\\]/,"").replace(/[/\\:]/g,"-")}--/${t.replace(/[:.]/g,"-")}_${n}.jsonl`}])},93981,e=>{"use strict";let t=(...e)=>fetch(...e);e.s(["getRealFetch",0,function(){return t},"setRealFetch",0,function(e){t=e}])},77471,e=>{e.v(e=>Promise.resolve().then(()=>e(93981)))},95802,e=>{e.v(t=>Promise.all(["static/chunks/10gap-_pl7s60.js","static/chunks/3xxgjlcswdmfe.js","static/chunks/0mckd3k4p5s8v.js","static/chunks/3-b1fguy2cvng.js","static/chunks/3v4bkmhoje89a.js","static/chunks/3m24uvcgw9m7m.js","static/chunks/0yk8z9afhcsyn.js","static/chunks/2v4b5-hkcu72_.js","static/chunks/2o79l4skyi35s.js","static/chunks/0qvow_9o41cgz.js","static/chunks/3egjwkejitey2.js"].map(t=>e.l(t))).then(()=>t(76913)))}]);