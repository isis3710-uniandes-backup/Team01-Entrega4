import React, { Component } from 'react'
import '../styles/home.css';
import { Link } from "react-router-dom";
import logo from "../assets/imgs/FutureGuide.png";
import Register from './registro';
import LogIn from './logIn';
import Cookies from 'js-cookie';
import { ToastContainer } from 'react-toastify';


export default class home extends Component {

    state = {
        isLoading: false,
        resultsSearched: [],
        programsByArea: [],
        programsBackUp: [],
        valueSearched: "",
        registro: false,
        logIn: false,
        alreadyLogged: false
    }

    closeRegistro=  ()=>{
        this.setState({registro: false});
    };

    openRegistro= ()=>{
        this.setState({registro:true})
    };


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
    closeSession = () => {
        Cookies.remove("JSESSIONID");
        this.setState({
            alreadyLogged: false
        })
    }
    closeLogIn = () => {
        this.setState({ logIn: false, alreadyLogged: false });
    };
    cierreExitoso = () => {
        this.setState({ logIn: false, alreadyLogged: true });

    }

    openLogIn = () => {
        this.setState({ logIn: true })
    };

    componentDidMount() {

        if(this.props.location.state)
        {
            this.closeSession();
        }

        let token = Cookies.get("JSESSIONID");
        if (token) {
            console.log("Habemus token");
            fetch("https://futureguide.herokuapp.com/programas/area", {
                method: 'GET',
                headers: new Headers({
                    'Authorization': token
                })
            })
                .then(res => res.json())
                .then(json => {
                    if (json.success === false) {

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
                            programsBackUp: objectFinal,
                            alreadyLogged: true
                        });
                        console.log(this.state.programsByArea);
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        }
        else {
            console.log("Loguese");
        }
    }

    render() {
        return (
            <div role="main" id="homecontainer" className="container">
                      <ToastContainer
                containerId ={'A'}
                    position="bottom-right"
                    autoClose={2400}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable
                    pauseOnHover
                />
                <nav className="navbar sticky-top navbar-light bg-light">
                    <a className="navbar-brand" href="/">
                        <img src={logo} height="60" className="d-inline-block align-top" alt="Futureguide logo" />
                    </a>
     
                    {!this.state.alreadyLogged ?
                        <div className="form-inline">
                            <button className="btn initialBtns" onClick={this.openLogIn}>Inicia sesión</button>
                            <LogIn mostrar={this.state.logIn} cierreExitoso={this.cierreExitoso} cerrar={this.closeLogIn} />
                            <button className="btn initialBtns" type="submit" onClick={this.openRegistro}>Registrarse </button>
                            <Register mostrar={this.state.registro} cerrar={this.closeRegistro}/>
                        </div>
                        :
                        <div className="form-inline">
                        <Link to="/carreras">
                            <button className="btn initialBtns">Explorar</button>
                        </Link>
                        <button className="btn initialBtns" onClick={this.closeSession}>Cerrar sesión</button>
                        </div>
                       
                    }
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
                        <Link className="btn disabled" id="searchButton" aria-disabled="true" onClick={this.search} to={{
                            pathname: `/programa/${this.state.valueSearched}`,
                            state: {}
                        }}>Buscar</Link>
                    </form>
                </div>
            </div>
        )
    }
}
