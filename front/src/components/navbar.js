import React, { Component } from 'react';
import '../styles/navbar.css';
import LogIn from './logIn';
import Cookies from 'js-cookie';
import { Link, Redirect } from "react-router-dom";
const Swal = require('sweetalert2');


export default class navbar extends Component {
    state = {
        logIn: false,
        alredyLogged: false
    };

    reseña() {
        Swal.mixin({
            input: 'text',
            confirmButtonText: 'Siguiente &rarr;',
            showCancelButton: true,
            confirmButtonColor: '#00c0be',
            cancelButtonColor: '#464655',
            cancelButtonText: 'Cancelar',
            background: '#fff',
            progressSteps: ['1', '2', '3']
        }).queue([
            {
                title: 'Titulo',
                input: 'text',
                inputPlaceholder: 'Escribe el titulo de la reseña...',
                inputAttributes: {
                    'aria-label': 'Type your message here'
                }
            },
            {
                title: 'Reseña',
                input: 'textarea',
                inputPlaceholder: 'Escribe tu reseña aquí...',
                inputAttributes: {
                    'aria-label': 'Type your message here'
                }
            },
            {
                title: 'La Recomienda?',
                input: 'checkbox',
                inputValue: 0,
                inputPlaceholder:
                    'Seleccione si es así',
                confirmButtonText: 'Publicar'
            }
        ]).then((result) => {
            if (result.value) {
                Swal.fire({
                    type: 'success',
                    title: 'Publicado Exitosamente',
                    toast: true,
                    showConfirmButton: false,
                    timer: 2000
                });
                /*let titulo = result.value[0]
                let descripcion = result.value[1]
                let recomendada = result.value[2]*/
            }
        })
    }
    componentDidMount() {
        let token = Cookies.get("JSESSIONID");
        if (token) {
            this.setState({
                alredyLogged: true
            });

        }
    }

    closeLogIn = () => {
        this.setState({ logIn: false });
    };

    openLogIn = () => {
        this.setState({ logIn: true })
    };

    render() {
        let token = Cookies.get("JSESSIONID");
        if (!token) {
            return <Redirect to='/' />
        }

        return (
            <div className="container" role="main">
                <nav id="menu" className="menu d-none d-md-block">
                    <div className="logo"><img src="LogoCompleto.png" alt="Logo de FutureGuide"></img></div>
                    <div className="menu_section section_1"><h1 className="onlyForAxe">Navegación</h1></div>
                    <div className="menu__wrap_1">
                        <ul data-menu="main" className="menu__level">

                            <li className="menu__item"><a className="menu__link" href="/"><i className="fas fa-home"></i> Home</a></li>
                            <li className="menu__item"><div className="menu__link" ><i className="fas fa-university"></i>Universidades</div></li>
                            <li className="menu__item"><div className="menu__link" ><i className="fas fa-graduation-cap"></i>Carreras</div></li>
                        </ul>
                    </div>

                    <div className="menu_section section_2"><h1 className="onlyForAxe">Configuración</h1></div>
                    <div className="menu__wrap_2">
                        <ul data-menu="main" className="menu__level">
                            <li className="menu__item"><a className="menu__link" href="perfil/"><i className="fas fa-user-tie"></i>Perfil</a></li>
                            {!this.state.alredyLogged ?
                            <>
                                <li className="menu__item">
                                    <div className="menu__link" onClick={this.openLogIn}><i className="fas fa-sign-in-alt" ></i>Ingresar
                                <LogIn mostrar={this.state.logIn} cerrar={this.closeLogIn} />
                                    </div>
                                </li>
                                <li className="menu_movil__item">
                                    <Link className="menu__link" to="/register">
                                        <i className="fas fa-sign-in-alt" />
                                        Registrarse
                                    </Link>
                                </li>
                                </> : <li className="menu_movil__item">
                                    <Link className="menu__link" to={{
                                        pathname : '/',
                                        state :  true
                                    }}>
                                        <i className="fas fa-sign-out-alt"></i>
                                        Salir
                                </Link>
                                </li>}
                        </ul>
                    </div>
                </nav>

                <nav id="menu_movil" className="menu_movil d-block d-sm-block d-md-none">
                    <div className="row">
                        <div className="col-5 d-none d-sm-block col_izq">
                            <div className="row">
                                <div className="col-7">
                                    <li className="menu_movil__item"><div className="menu_movil__link" ><i className="fas fa-university"></i>Universidades</div></li>
                                </div>
                                <div className="col-5">
                                    <li className="menu_movil__item"><div className="menu_movil__link" ><i className="fas fa-graduation-cap"></i>Carreras</div></li>
                                </div>
                            </div>
                        </div>
                        <div className="col-2 d-none d-sm-block col_med">
                            <div className="logo_movil"><img src="Logo.png" alt="Logo de FutureGuide"></img></div>
                        </div>
                        <div className="col-5 d-none d-sm-block col_der">
                            <div className="row">
                                <div className="col-6">
                                    <li className="menu_movil__item"><div className="menu_movil__link" onClick={this.openLogIn}><i className="fas fa-sign-in-alt"></i>Ingresar
                                        <LogIn mostrar={this.state.logIn} cerrar={this.closeLogIn} />
                                    </div></li>
                                </div>
                                <div className="col-6">
                                    <li className="menu_movil__item">
                                        <Link className="menu_movil__link" to="/">
                                            <i className="fas fa-sign-out-alt"></i>
                                            Salir
                                        </Link>

                                    </li>
                                </div>
                            </div>
                        </div>


                        <div className="col-5 d-block d-sm-none col_izq">
                            <div className="row">
                                <div className="col-6">
                                    <li className="menu_movil__item"><div className="menu_movil__link"><i className="fas fa-university"></i></div></li>
                                </div>
                                <div className="col-6">
                                    <li className="menu_movil__item"><div className="menu_movil__link" ><i className="fas fa-graduation-cap"></i></div></li>
                                </div>
                            </div>
                        </div>
                        <div className="col-2 d-block d-sm-none col_med">
                            <div className="logo_movil"><img src="Logo.png" alt="Logo de FutureGuide"></img></div>
                        </div>
                        <div className="col-5 d-block d-sm-none col_der">
                            <div className="row">
                                <div className="col-6">
                                    <li className="menu_movil__item"><div className="menu_movil__link" onClick={this.openLogIn}><i className="fas fa-sign-in-alt"></i></div></li>
                                    <LogIn mostrar={this.state.logIn} cerrar={this.closeLogIn} />
                                </div>
                                <div className="col-6">
                                    <li className="menu_movil__item">
                                        <Link className="menu_movil__link" to="/register">
                                            <i className="fas fa-sign-out-alt"></i>
                                        </Link>

                                    </li>
                                </div>
                            </div>
                        </div>

                    </div>
                </nav>
            </div>
        )
    }
}
