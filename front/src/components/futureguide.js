import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from './navbar';
import Register from './registro';
import { BrowserRouter, Route } from "react-router-dom";
import Home from './home';
import Navbar from './navbar';

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
                        </Switch>
                    </div>
                </BrowserRouter>
            
        )
    }
}
