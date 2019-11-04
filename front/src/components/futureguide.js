import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from './navbar';
import Register from './registro';
import Home from './home';
import DetailCareer from './detailCareer';

export default class futureguide extends Component {

    constructor(props) {
        super(props);
        this.state = {
            logueado: false,
        }
    }

    render() {
        return (
            
                <BrowserRouter>
                    <div>
                        <Switch>
                        <Route exact path="/register">
                            <Register logueado={this.state.logueado}/>
                        </Route>
                        <Route exact path="/" component={Navbar} />
                        <Route  path="/universidad/:nombre/programa/:name" component={DetailCareer} />
                        </Switch>
                    </div>
                </BrowserRouter>
            
        )
    }
}
