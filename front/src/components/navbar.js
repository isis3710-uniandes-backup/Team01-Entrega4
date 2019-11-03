import React, { Component } from 'react';
import '../styles/navbar.css';
import LogIn from './logIn';
const Swal = require('sweetalert2')

export default class navbar extends Component{
    state={
        logIn:false
    }

    mostrar(){
        Swal.fire({
            title: 'Reseña',
            input: 'textarea',
            inputPlaceholder: 'Escribe tu reseña aquí...',
            inputAttributes: {
                'aria-label': 'Type your message here'
            },
            showCancelButton: true,
            confirmButtonText: 'Publicar',
            cancelButtonText: 'Cancelar',
            background: '#edf7f6'
            })
            .then((value)=>{
                console.log(value['value'])
            })
    }
handleLogIn=()=>{
    this.setState({logIn:!this.state.logIn})
}

    render() {
        return(
            <div className="container">
                <nav id="menu" className="menu d-none d-md-block">
                    <div className="logo"><img src="LogoCompleto.png" alt="Logo de FutureGuide"></img></div>
                    <div className="menu_section section_1">Navegación</div>
                    <div className="menu__wrap_1">
                        <ul data-menu="main" className="menu__level">
                            <li className="menu__item"><a className="menu__link" onClick={this.mostrar}><i className="fas fa-home"></i>Home</a></li>
                            <li className="menu__item"><a className="menu__link" href="#"><i className="fas fa-university"></i>Universidades</a></li>
                            <li className="menu__item"><a className="menu__link" href="#"><i className="fas fa-graduation-cap"></i>Carreras</a></li>
                        </ul>
                    </div>

                    <div className="menu_section section_2">Configuración</div>
                    <div className="menu__wrap_2">
                        <ul data-menu="main" className="menu__level">
                            <li className="menu__item"><a className="menu__link" href="#"><i className="fas fa-user-tie"></i>Perfil</a></li>
                            <li className="menu__item"><a className="menu__link" href="#" onClick={this.handleLogIn}><i className="fas fa-sign-in-alt" ></i>Ingresar 
                            <LogIn mostrar={this.state.logIn}/>
                            </a></li>
                            <li className="menu__item"><a className="menu__link" href="#"><i className="fas fa-sign-out-alt"></i>Registrarse</a></li>
                        </ul>
                    </div>
                </nav>

                <nav id="menu_movil" className="menu_movil d-block d-sm-block d-md-none">
                    <div className="row">
                        <div className="col-5 col_izq">
                            <div className="row">
                                <div className="col-6">
                                    <li className="menu_movil__item"><a className="menu_movil__link" href="#"><i className="fas fa-university"></i>Universidades</a></li>
                                </div>
                                <div className="col-6">
                                    <li className="menu_movil__item"><a className="menu_movil__link" href="#"><i className="fas fa-graduation-cap"></i>Carreras</a></li>
                                </div>
                            </div>
                        </div>
                        <div className="col-2 col_med">
                            <div className="logo_movil"><img src="Logo.png" alt="Logo de FutureGuide"></img></div>
                        </div>
                        <div className="col-5 col_der">
                            <div className="row">
                                <div className="col-6">
                                    <li className="menu_movil__item"><a className="menu_movil__link" href="#" onClick={this.handleLogIn}><i className="fas fa-sign-in-alt"></i>Ingresar
                                    <LogIn mostrar={this.state.logIn}/>
                                    </a></li>
                                </div>
                                <div className="col-6">
                                    <li className="menu_movil__item"><a className="menu_movil__link" href="#"><i className="fas fa-sign-out-alt"></i>Registrarse</a></li>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}
