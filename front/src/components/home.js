import React, { Component } from 'react'
import '../styles/home.css';
import { Link } from "react-router-dom";
import logo from "../assets/imgs/FutureGuide.png"

import { Container } from 'react-bootstrap';
import Cookies from 'js-cookie'

export default class home extends Component {

    state = {
        isLoading: false,
        resultsSearched: [],
        programsByArea: [],
        programsBackUp: [],
        valueSearched: ""
    }


    saveSearch = (e) => {
        document.getElementById('searchButton').classList.add("disabled");
        this.setState({
            valueSearched: e.target.value
        }, () => {
            let esta = false;
            let programs = this.state.programsByArea;
            for (let index = 0; index < programs.length && !esta; index++) {
                let titles = programs[index].results;
                for (let j = 0; j < titles.length && !esta; j++) {
                    const element = titles[j];
                    if (element.title === this.state.valueSearched) {
                        esta = true;
                        document.getElementById('searchButton').classList.remove("disabled");
                    }
                }
            }
        });


    }
    search = () => {
        console.log("...");

    }

    componentDidMount() {
        //let token = Cookies.get('SESSIONID');
        fetch("http://localhost:3001/programas/area", {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZnIiwiaWF0IjoxNTcyODI5ODEyLCJleHAiOjE1NzI4NDA2MTJ9.K7--rxWPpC8CmrXKI_Svjjtx5Lmqe2mAMIPwehjG3rM'
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.success === false) {
                    console.log(json);
                    //enrutar hacia el home 
                }
                else {
                    let objectFinal = [];
                    json.forEach(element => {
                        objectFinal.push({
                            name: element._id,
                            results: element.programs
                        })
                    });
                    this.setState({
                        programsByArea: objectFinal,
                        programsBackUp: objectFinal
                    });
                    console.log(this.state.programsByArea);
                }
            })
    }

    render() {
        //   let history = useHistory();
        return (
            <div role="main">
                <nav className="navbar sticky-top navbar-light bg-light">
                    <a class="navbar-brand" href="#">
                        <img src="../assets/imgs/FutureGuide.png" width="30" height="30" class="d-inline-block align-top" alt="Futureguide logo" />
                    </a>
                    <form className="form-inline">
                        <button className="btn initialBtns" type="submit">Inicia sesión</button>
                        <button className="btn initialBtns" type="submit">Registrate</button>
                    </form>
                </nav>
                <div id="homeContainer" className="d-flex justify-content-center align-items-center flex-wrap" >
                    <h1 id="slogan">Decide lo mejor para tu futuro.</h1>
                    <form>
                        <div className="form-group">
                            <input type="text" id="searchBar" placeholder="Busca tu programa de interés" list="options" onChange={this.saveSearch} aria-label="Barra de busqueda de programas"></input>
                            <datalist id="options">
                                {this.state.programsByArea.map((e, i) =>
                                    e.results.map((element, i) => <option key={i} value={element.title}>{e.name}</option>)
                                )}
                            </datalist>
                        </div>
                        <Link className="btn btn-dark disabled" id="searchButton" aria-disabled="true" onClick={this.search} to={{
                            pathname: `/programa/${this.state.valueSearched}`,
                            state: {}
                        }}>Buscar</Link>
                    </form>
                </div>
            </div>
        )
    }
}
