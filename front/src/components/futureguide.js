import React, { Component } from 'react'
import { BrowserRouter, Route } from "react-router-dom";
import Home from './home';

export default class futureguide extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Navbar logFunc={this.loguear} />
                        <Route exact path="/" component={Home} />
                        <div>
                        </div>

                    </div>
                </BrowserRouter>
            </div>
        )
    }
}
