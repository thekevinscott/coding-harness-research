import{O as e}from"./utils-BfiNEqda.js";var t=`signup-fix-demo`,n=`Fix empty-email signup bug`,r=`/workspace`,i=`The signup form accepts empty emails. Fix it.`,a=`${r}/app.py`,o=`${r}/test_app.py`,s=`from flask import Flask, request, jsonify

app = Flask(__name__)

users = []


@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json(force=True)
    email = data.get("email", "")
    password = data.get("password", "")

    if not password:
        return jsonify({"error": "password is required"}), 400

    # TODO: this lets an empty email through
    users.append({"email": email, "password": password})
    return jsonify({"status": "ok"}), 201
`,c=s.replace(`    if not password:
        return jsonify({"error": "password is required"}), 400

    # TODO: this lets an empty email through
    users.append({"email": email, "password": password})`,`    if not password:
        return jsonify({"error": "password is required"}), 400

    if not email:
        return jsonify({"error": "email is required"}), 400

    users.append({"email": email, "password": password})`),l=c.replace(`from flask import Flask, request, jsonify

app = Flask(__name__)`,`import re

from flask import Flask, request, jsonify

app = Flask(__name__)

EMAIL_RE = re.compile(r"^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$")`),u=l.replace(`    if not email:
        return jsonify({"error": "email is required"}), 400

    users.append({"email": email, "password": password})`,`    if not email:
        return jsonify({"error": "email is required"}), 400

    if not EMAIL_RE.match(email):
        return jsonify({"error": "email is invalid"}), 400

    users.append({"email": email, "password": password})`),d=`def test_signup_accepts_valid_user(client):
    response = client.post(
        "/signup", json={"email": "a@example.com", "password": "hunter2"}
    )
    assert response.status_code == 201


def test_signup_rejects_empty_password(client):
    response = client.post(
        "/signup", json={"email": "a@example.com", "password": ""}
    )
    assert response.status_code == 400


def test_signup_rejects_empty_email(client):
    response = client.post(
        "/signup", json={"email": "", "password": "hunter2"}
    )
    assert response.status_code == 400


def test_signup_rejects_missing_fields(client):
    response = client.post("/signup", json={})
    assert response.status_code == 400
`,f=`============================= test session starts ==============================
collected 4 items

test_app.py::test_signup_accepts_valid_user PASSED                     [ 25%]
test_app.py::test_signup_rejects_empty_password PASSED                 [ 50%]
test_app.py::test_signup_rejects_empty_email FAILED                    [ 75%]
test_app.py::test_signup_rejects_missing_fields PASSED                 [100%]

=================================== FAILURES ====================================
_________________________ test_signup_rejects_empty_email _______________________

    def test_signup_rejects_empty_email(client):
        response = client.post(
            "/signup", json={"email": "", "password": "hunter2"}
        )
>       assert response.status_code == 400
E       assert 201 == 400
E        +  where 201 = <Response 201 CREATED>.status_code

test_app.py:19: AssertionError
========================= 1 failed, 3 passed in 0.18s ===========================`,p=`============================= test session starts ==============================
collected 4 items

test_app.py::test_signup_accepts_valid_user PASSED                     [ 25%]
test_app.py::test_signup_rejects_empty_password PASSED                 [ 50%]
test_app.py::test_signup_rejects_empty_email PASSED                    [ 75%]
test_app.py::test_signup_rejects_missing_fields PASSED                 [100%]

========================== 4 passed in 0.16s ============================`,m=`============================= test session starts ==============================
collected 5 items

test_app.py::test_signup_accepts_valid_user PASSED                     [ 20%]
test_app.py::test_signup_rejects_empty_password PASSED                 [ 40%]
test_app.py::test_signup_rejects_empty_email PASSED                    [ 60%]
test_app.py::test_signup_rejects_missing_fields PASSED                 [ 80%]
test_app.py::test_signup_rejects_whitespace_email PASSED               [100%]

========================== 5 passed in 0.18s ============================`,h=0,g=e=>(h+=1,`signup-demo-${e}-${h}`),_=e=>({exit_code:e,pid:4242,username:`openhands`,hostname:`sandbox`,working_dir:r,py_interpreter_path:`/usr/bin/python3`,prefix:``,suffix:``});function v(){return{id:g(`user-prompt`),timestamp:new Date().toISOString(),source:`user`,llm_message:{role:`user`,content:[{type:`text`,text:i}]},activated_skills:[],extended_content:[]}}function y(e){return{id:g(`agent-message`),timestamp:new Date().toISOString(),source:`agent`,llm_message:{role:`assistant`,content:[{type:`text`,text:e}]},activated_skills:[],extended_content:[]}}function b(e){return{id:g(`fork-reply`),timestamp:new Date().toISOString(),source:`user`,llm_message:{role:`user`,content:[{type:`text`,text:e}]},activated_skills:[],extended_content:[]}}function x(t,n){let r=g(`${t}-action`),i=g(`${t}-tool-call`);return{toolCallId:i,action:{id:r,timestamp:new Date().toISOString(),source:`agent`,thought:[],thinking_blocks:[],action:n,tool_name:`file_editor`,tool_call_id:i,tool_call:{id:i,type:`function`,function:{name:`file_editor`,arguments:JSON.stringify({command:n.command,path:n.path})}},llm_response_id:g(`${t}-response`),security_risk:e.LOW}}}function S(e,t,n){return{id:g(`file-editor-observation`),timestamp:new Date().toISOString(),source:`environment`,tool_name:`file_editor`,tool_call_id:t,action_id:e,observation:n}}function C(t,n){let r=g(`${t}-action`),i=g(`${t}-tool-call`);return{toolCallId:i,action:{id:r,timestamp:new Date().toISOString(),source:`agent`,thought:[],thinking_blocks:[],action:{kind:`ExecuteBashAction`,command:n,is_input:!1,timeout:null,reset:!1},tool_name:`execute_bash`,tool_call_id:i,tool_call:{id:i,type:`function`,function:{name:`execute_bash`,arguments:JSON.stringify({command:n})}},llm_response_id:g(`${t}-response`),security_risk:e.LOW}}}function w(e,t,n,r,i){return{id:g(`bash-observation`),timestamp:new Date().toISOString(),source:`environment`,tool_name:`execute_bash`,tool_call_id:t,action_id:e,observation:{kind:`ExecuteBashObservation`,content:[{type:`text`,text:r}],command:n,exit_code:i,error:i!==0,timeout:!1,metadata:_(i)}}}function T(){let{action:e,toolCallId:t}=x(`read-app`,{kind:`FileEditorAction`,command:`view`,path:a,file_text:null,old_str:null,new_str:null,insert_line:null,view_range:null}),n=s.split(`
`).map((e,t)=>`${t+1}\t${e}`).join(`
`);return{action:e,observation:S(e.id,t,{kind:`FileEditorObservation`,command:`view`,output:`Here's the result of running \`cat -n\` on ${a}:\n${n}`,path:a,prev_exist:!0,old_content:null,new_content:null,error:null})}}function E(){let{action:e,toolCallId:t}=C(`pytest-fail`,`cd /workspace && python -m pytest test_app.py -v`);return{action:e,observation:w(e.id,t,e.action.command,f,1)}}function D(){let{action:e,toolCallId:t}=x(`fix-empty-email`,{kind:`FileEditorAction`,command:`str_replace`,path:a,file_text:null,old_str:`    if not password:
        return jsonify({"error": "password is required"}), 400

    # TODO: this lets an empty email through
    users.append({"email": email, "password": password})`,new_str:`    if not password:
        return jsonify({"error": "password is required"}), 400

    if not email:
        return jsonify({"error": "email is required"}), 400

    users.append({"email": email, "password": password})`,insert_line:null,view_range:null});return{action:e,observation:S(e.id,t,{kind:`FileEditorObservation`,command:`str_replace`,output:`The file ${a} has been edited successfully.`,path:a,prev_exist:!0,old_content:s,new_content:c,error:null})}}function O(e=`pytest-pass`,t=p){let{action:n,toolCallId:r}=C(e,`cd /workspace && python -m pytest test_app.py -v`);return{action:n,observation:w(n.id,r,n.action.command,t,0)}}function k(){let{action:e,toolCallId:t}=x(`import-re`,{kind:`FileEditorAction`,command:`str_replace`,path:a,file_text:null,old_str:`from flask import Flask, request, jsonify

app = Flask(__name__)`,new_str:`import re

from flask import Flask, request, jsonify

app = Flask(__name__)

EMAIL_RE = re.compile(r"^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$")`,insert_line:null,view_range:null});return{action:e,observation:S(e.id,t,{kind:`FileEditorObservation`,command:`str_replace`,output:`The file ${a} has been edited successfully.`,path:a,prev_exist:!0,old_content:c,new_content:l,error:null})}}function A(){let{action:e,toolCallId:t}=x(`email-format`,{kind:`FileEditorAction`,command:`str_replace`,path:a,file_text:null,old_str:`    if not email:
        return jsonify({"error": "email is required"}), 400

    users.append({"email": email, "password": password})`,new_str:`    if not email:
        return jsonify({"error": "email is required"}), 400

    if not EMAIL_RE.match(email):
        return jsonify({"error": "email is invalid"}), 400

    users.append({"email": email, "password": password})`,insert_line:null,view_range:null});return{action:e,observation:S(e.id,t,{kind:`FileEditorObservation`,command:`str_replace`,output:`The file ${a} has been edited successfully.`,path:a,prev_exist:!0,old_content:l,new_content:u,error:null})}}function j(){let{action:e,toolCallId:t}=x(`add-test`,{kind:`FileEditorAction`,command:`str_replace`,path:o,file_text:null,old_str:`def test_signup_rejects_missing_fields(client):
    response = client.post("/signup", json={})
    assert response.status_code == 400`,new_str:`def test_signup_rejects_missing_fields(client):
    response = client.post("/signup", json={})
    assert response.status_code == 400


def test_signup_rejects_whitespace_email(client):
    response = client.post(
        "/signup", json={"email": "   ", "password": "hunter2"}
    )
    assert response.status_code == 400`,insert_line:null,view_range:null});return{action:e,observation:S(e.id,t,{kind:`FileEditorObservation`,command:`str_replace`,output:`The file ${o} has been edited successfully.`,path:o,prev_exist:!0,old_content:d,new_content:`${d}

def test_signup_rejects_whitespace_email(client):
    response = client.post(
        "/signup", json={"email": "   ", "password": "hunter2"}
    )
    assert response.status_code == 400
`,error:null})}}function M({files:e=[`app.py`],message:t=`Reject empty email on signup`,stat:n=`1 file changed, 3 insertions(+), 1 deletion(-)`}={}){let{action:r,toolCallId:i}=C(`git-commit`,`git add ${e.join(` `)} && git commit -m "${t}"`);return{action:r,observation:w(r.id,i,r.action.command,`[main 8c1f0e2] ${t}
 ${n}`,0)}}export{j as a,A as c,b as d,k as f,v as h,m as i,D as l,T as m,n,y as o,O as p,r,M as s,t,E as u};