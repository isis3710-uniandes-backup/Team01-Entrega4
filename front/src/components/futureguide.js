import React, { Component } from 'react'
import { BrowserRouter, Route } from "react-router-dom";
import Home from './home';
import Navbar from './navbar';

export default class futureguide extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Route exact path="/" component={Navbar} />
                        <div>
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}
