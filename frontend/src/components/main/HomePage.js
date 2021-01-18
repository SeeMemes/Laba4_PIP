import React, {useEffect, useRef, useState} from "react"
import store from "../../storage/storage";
import Form from "./Form";
import LogoutButton from "./LogoutButton";
import Table from "./Table";
import Canvas from "./Canvas";






function HomePage(props) {
    const [results, setResults] = useState(null)
    const [x_val, setX] = useState(null);
    const [y_val, setY] = useState(null);
    const [r_val, setR] = useState(null);
    const MessageText = useRef()

    function validate_number(str, min, max) {
        let n = parseFloat(str);
        return (!isNaN(n) && n >= min && n <= max);
    }

    function validate(){
        const validation_result = !validate_number(x_val, -3, 5) || !validate_number(y_val, -3, 5) ||!validate_number(r_val, 0.01, 5)
        if (validation_result){
            if (MessageText.current !== null) {
                MessageText.current.show({
                    severity: 'warn',
                    summary: 'Validation error'
                })
            }
        }
        return !validation_result
    }

    useEffect(() => {

        if (results === null) {
            fetch("/api/points/get", { //!!!
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': `Bearer_${store.getState().token}`
                },
                body: JSON.stringify({key: store.getState().token/*, x: props.x, y: props.y, r: props.r*/})
            }).then(response => response.text().then(text => {
                if (response.ok) {
                    setResults(JSON.parse(text).data)
                    console.log("Результаты", JSON.parse(text).data)
                }/*if (response.status == 403) {
                    fetch("/api/refresh/token", {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({refresh_token: sessionStorage.getItem("refresh_token")})
                    }).then(response => response.json().then(rtoken => {
                        if (response.ok) {
                            store.dispatch({type: "TOKEN_UPDATE", token: rtoken.token})
                            fetch("/api/app/area", {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json;charset=utf-8',
                                    'Authorization': `Bearer_${store.getState().token}`
                                },
                                body: JSON.stringify({x: x_val, y: y_val, r: r_val})
                            }).then(response => response.text().then(text => {
                                if (response.ok) {
                                    setResults(JSON.parse(text))
                                } else {
                                    MessageText.current.show({
                                        severity: 'error',
                                        summary: 'Refresh token error'
                                    })
                                }
                            }))
                        } else {
                            MessageText.current.show({
                                severity: 'error',
                                summary: 'Refresh token error'
                            })
                        }
                    }))
                }*/
            }))
        }
    })

    return (
        <div>
            <LogoutButton />
            <Canvas key={props.key} validateNumber={validate_number} messageText={MessageText}  x={x_val} y={y_val} r={r_val} results={results} setResults={setResults}/>
            <Form key={props.key} setResults={setResults} messageText={MessageText} x={x_val} y={y_val} r={r_val} setX={setX} setY={setY} setR={setR} validate={validate}/>
            <Table key={props.key} results={results}/>
        </div>
    );
}
export default HomePage