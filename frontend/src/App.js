import React, {Component} from 'react';
import HomePage from "./components/main/HomePage";
import LoginForm from "./components/login/LoginForm";
import {Panel} from "primereact/panel";
import 'primereact/resources/themes/saga-orange/theme.css';
import 'primereact/resources/primereact.css';


class App extends Component {



    componentDidMount(){
        this.props.store.subscribe(() => {
            this.setState({reduxState: this.props.store.getState()});
        })
    }

    render() {
        return (
            <div className="p-grid p-justify-center wrapper">
                <div className="p-col p-sm-12 p-md-8 p-xl-5">
                    <Panel header={"Provotorov Aleksandr P3210 10532"}>
                        {this.props.store.getState().token !== null ? <HomePage key={this.props.store.getState().token} /> :<LoginForm/>}
                    </Panel>
                </div>

            </div>
        )
    }
}


export default App;