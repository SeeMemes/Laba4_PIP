import React, {useRef} from "react"
import store from "../../storage/storage";
import {Button} from "primereact/button";
import {Messages} from "primereact/messages";
import {InputNumber} from "primereact/inputnumber";
import {Slider} from "primereact/slider";


function Form(props) {

    const onSubmit = () => {
        if (props.validate()) {
            fetch("/api/points/add", { //!!!
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': `Bearer_${store.getState().token}`
                },
                body: JSON.stringify({key: store.getState().token, x: props.x, y: props.y, r: props.r})
            }).then(response => response.text().then(text => {
                if (response.ok) {
                    props.setResults(JSON.parse(text).data)
                }
                /*if (response.status == 403) {
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
                                body: JSON.stringify({x: props.x, y: props.y, r: props.r})
                            }).then(response => response.text().then(text => {
                                if (response.ok) {
                                    props.setResults(JSON.parse(text))
                                } else {
                                    props.messageText.current.show({
                                        severity: 'error',
                                        summary: 'Refresh token error'
                                    })
                                }
                            }))
                        } else {
                            props.messageText.current.show({
                                severity: 'error',
                                summary: 'Refresh token error'
                            })
                        }
                    }))
                }*/
            }))
        }
    }

    const onClear = () => {
        fetch("/api/points/clear", { //!!!
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer_${store.getState().token}`
            },
            body: JSON.stringify({key: store.getState().token})
        }).then(response => {
            if (response.ok) {
                props.setResults(null)
            }
            /*if (response.status == 403) {
                fetch("/api/refresh/token", {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({refresh_token: sessionStorage.getItem("refresh_token")})
                }).then(response => response.json().then(rtoken => {
                    if (response.ok) {
                        store.dispatch({type: "TOKEN_UPDATE", token: rtoken.token})
                        fetch("/api/app/clear", {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json;charset=utf-8',
                                'Authorization': `Bearer_${store.getState().token}`
                            }
                        }).then(response => {
                            if (response.ok) {
                                props.setResults(null)
                            } else {
                                props.messageText.current.show({
                                    severity: 'error',
                                    summary: 'Refresh token error'
                                })
                            }
                        })
                    }else {
                        props.messageText.current.show({
                            severity: 'error',
                            summary: 'Refresh token error'
                        })
                    }
                }))
            }*/
        })
    }

    return (
        <div className="p-align-center p-fluid">
            <form>
                <Messages ref={(el) => props.messageText.current = el}/>
                <div className="p-field p-grid"     >
                    <div className="p-field p-grid ">
                        <label htmlFor="x_value" className="p-sm-2 p-md-4 p-xl-6">X:</label>
                        <div className="p-sm-12 p-md-7 p-xl-5 p-col">
                            <InputNumber id="x_value" value={props.x} onValueChange={(e) => props.setX(e.value)} mode="decimal"
                                         min={-3} max={5}
                                         minFractionDigits={1} maxFractionDigits={3} placeholder="Enter X [-3;5]"/>
                        </div>
                    </div>

                    <div className="p-field p-grid ">
                        <label htmlFor="y_value" className="p-sm-2 p-md-4 p-xl-6">Y:</label>
                        <div className="p-sm-12 p-md-7 p-xl-5 p-col">
                            <Slider
                                value={props.y}
                                onChange={(e) => props.setY(e.value)}
                                aria-labelledby="non-linear-slider"
                                step={0.001}
                                min={-3}
                                max={5}
                            />
                            <br/>
                            <InputNumber id="y_value" value={props.y} disabled mode="decimal"
                                         min={-3} max={5}
                                         maxFractionDigits={0} placeholder="Choose Y [-3;5]"/>
                        </div>
                    </div>

                    <div className="p-field p-grid ">
                        <label htmlFor="r_value" className="p-sm-2 p-md-4 p-xl-6">R:</label>
                        <div className="p-sm-12 p-md-7 p-xl-5 p-col">
                            <InputNumber id="r_value" value={props.r} onValueChange={(e) => props.setR(e.value)} mode="decimal"
                                         min={0.01} max={4.99}
                                         minFractionDigits={1} maxFractionDigits={2} placeholder="Enter R [0.01;4.99]"/>
                        </div>
                    </div>

                    <div className="p-sm-12 p-md-6  p-align-center p-col">
                        <Button type="button" onClick={onSubmit} className="p-button-primary p-margin" label="Submit" icon="pi"/>
                    </div>

                    <div className="p-sm-12 p-md-6 p-xl-3 p-align-center p-col" >
                        <Button type="button" onClick={onClear} className="p-button-primary" label="Clear" icon="pi"/>
                    </div>
                </div>
            </form>
        </div>
        )

}


export default Form;
