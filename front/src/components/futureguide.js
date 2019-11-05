import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from './navbar';
import Perfil from './perfil';
import Register from './registro';
import Home from './home';
import DetailCareer from './detailCareer';
import Listas from './listas'

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
                        <Route exact path="/" component={Home} />
                        <Route exact path="/register">
                            <Register logueado={this.state.logueado}/>
                        </Route>
                        <Route path="*">
                            <Navbar/>
                            <Switch>
                                <Route exact path="/perfil" component={Perfil} />
                                <Route exact path="/carreras" component={Listas} />
                                <Route exact path="/universidad/:nombre/programa/:name" component={DetailCareer}/>
                            </Switch>
                        </Route>
                        </Switch>
                    </div>
                </BrowserRouter>
            
        )
    }
}
