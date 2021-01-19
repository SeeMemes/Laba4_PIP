import React, {useState} from "react";
import './loginForm.css';
import store from "../../storage/storage";
import {Messages} from "primereact/messages";
import {InputText} from 'primereact/inputtext';
import {Button} from "primereact/button";
import {Password} from 'primereact/password';
import "../../index.css"


let MessagesInstance
function LoginForm() {
    const onSignIn=(e)=>{
        const data ={
            "username":username,
            "password":password
        }

        if (username.length!==0 && password.length) {
            fetch("/lk/login", {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
            }).then(response => response.json().then(json => {
                if (json.status === 'ok' && json.exception !== 'true') {
                    store.dispatch({type: "NEW_TOKEN", token: json.key, rtoken: json.refresh_token})
                    console.log("JSON входа: ", json)
                } else if (json.exception === 'true') {
                    MessagesInstance.show({
                        severity: 'error',
                        summary: json.details
                    })
                } else {
                    MessagesInstance.show({
                        severity: 'error',
                        summary: 'Unhandled error'
                    })
                    store.dispatch({type: "TOKEN_CLEAR", token: null})
                }
            }))
        }
        else {
            MessagesInstance.show({
                severity: 'error',
                summary: 'Enter login and password'
            })
        }
    }

    const onSignUp=(e)=>{
        const data ={
            "username":username,
            "password":password
        }
        if (username.length!==0 && password.length) {
            fetch("/lk/register", {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
            }).then(response => response.json().then(json => {
                if (json.status === "ok" && json.exception !== 'true') {
                    store.dispatch({type: "NEW_TOKEN", token: json.key, rtoken: json.refresh_token})
                    console.log("JSON входа: ",json.status)
                } else if (json.exception === "true") {
                    MessagesInstance.show({
                        severity: 'error',
                        summary: json.details
                    })
                } else {
                    MessagesInstance.show({
                        severity: 'error',
                        summary: 'Unhandled error'
                    })
                    store.dispatch({type: "TOKEN_CLEAR", token: null})
                }
            }))
        }
        else {
            MessagesInstance.show({
                severity: 'error',
                summary: 'Enter login and password'
            })
        }
    }

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div className="p-align-center p-fluid">
            <form className="form_div">
                <Messages icon ref={(el) => MessagesInstance = el}/>
                <div className="p-field p-grid"     >

                    <div className="p-field p-grid">
                        <label htmlFor="username" className="p-sm-2 p-md-4 p-xl-6">Username</label>
                        <div className="p-sm-12 p-md-7 p-xl-5">
                            <InputText id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                    </div>
                    <div className="p-field p-grid ">
                        <label htmlFor="password" className="p-sm-2 p-md-4 p-xl-6">Password</label>
                        <div className="p-sm-12 p-md-7 p-xl-5 ">
                            <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                    </div>
                    <div className="p-sm-12 p-md-6  p-align-center">
                        <Button type="button" onClick={onSignIn} className="p-button-primary p-margin" label="Sign in" icon="pi"/>
                    </div>

                    <div className="p-sm-12 p-md-6 p-xl-3 p-align-center" >
                        <Button type="button" onClick={onSignUp} className="p-button-primary " label="Register" icon="pi"/>
                    </div>
                </div>
            </form>
        </div>

    )
}

export default LoginForm;