import React, { Component } from 'react'
import { BrowserRouter, Route } from "react-router-dom";
//import Home from './home';
import Navbar from './navbar';
import Perfil from './perfil';

export default class futureguide extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Navbar />
                        <Route exact path="/perfil" component={Perfil} />
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}
