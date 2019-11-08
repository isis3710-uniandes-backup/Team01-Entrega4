import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import '../styles/registro.css';
import {toast } from 'react-toastify';
const md5 = require("md5");



let checkUsername = true;
let checkName = true;
let checkEmail = true;
let checkPassword = true;

export default class register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            name: "",
            email: "",
            password: "",
            changeLogInStatus: this.props.changeLogInStatus,
            logueado: this.props.logueado,
            show: false,
            usernameError: null,
            emailError: null,
            passwordError: null
        };
        this.changeValue = this.changeValue.bind(this);
        this.signUp = this.signUp.bind(this);
        this.hide = this.hide.bind(this);

    }



    componentDidUpdate(prevProps) {
        if (this.props.mostrar !== prevProps.mostrar) {
            this.setState({ show: this.props.mostrar });
        }
    }

    hide() {
        this.props.cerrar();
    }

    changeValue(e) {
        if (e.target.id === "username") {
            this.setState({
                usernameError: null,
                username: e.target.value
            }, () => {
                if (this.state.usernameError === null) {
                    if (this.state.username.length < 6) 
                    {
                        this.setState({
                            usernameError: 'Su nombre de usuario debe tener más de 6 caracteres'
                        })
                    }
                }
                if(this.state.username.length > 6){

                    fetch('https://futureguide.herokuapp.com/usuarios/' + this.state.username, {
                        method: 'GET'
                    })
                        .then(res => res.status === 200 ? res.json() : null)
                        .then(json => {
                            if (json) {
                                if (json._id === this.state.username) {
                                    this.setState({
                                        usernameError: 'El usuario ya existe, intente otro'
                                    })
                                }
                            }
                        })
                        .catch(error => {
                            console.log("Not the user");
                        })
                }
               
            });
        }
        else if (e.target.id === "name") {
            this.setState({
                name: e.target.value
            });
            if (e.target.id !== "")
                checkName = true;
        }
        else if (e.target.id === "email") {
            this.setState({
                email: e.target.value,
                emailError: null
            }, () => {
                if (this.state.emailError === null) {
                    if (!this.state.email.includes("@")) {
                        this.setState({
                            emailError: 'Correo inválido.'
                        })
                    }
                }
            });
            if (e.target.id !== "")
                checkEmail = true;
        }
        else if (e.target.id === "password") {
            this.setState({
                password: e.target.value,
                passwordError: null
            }, () => {
                if (this.state.passwordError === null) {
                    if (!(/\d/.test(this.state.password) && /[A-Z]/.test(this.state.password))) {
                        this.setState({
                            passwordError: 'Tu contraseña debe contener por lo menos un caracter numérico y una mayúscula.'
                        })
                    }


                }
            });
            if (e.target.id !== "")
                checkPassword = true;
        }
    }
    signUp() {

        try {
          let checkUsername = false;
           let checkEmail = false;
            let checkName = false;
            let checkPassword = false;
            if (this.state.username !== "" && this.state.usernameError === null)
                checkUsername = true;
            if (this.state.name !== "")
                checkName = true;
            if (this.state.email !== "" && this.state.emailError === null)
                checkEmail = true;
            if (this.state.password !== "" && this.state.passwordError === null)
                checkPassword = true;

            if (checkEmail && checkName && checkPassword && checkUsername) {
                let json = {
                    _id: this.state.username,
                    nombre: this.state.name,
                    correo: this.state.email,
                    password: md5(this.state.password)
                };
                let boddy = JSON.stringify(json);
                fetch('https://futureguide.herokuapp.com/register', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      },
                    body: boddy,

                })
                .then(res => {
                        res.json()
                        if (res.status === 200) {
                            toast('¡Registro exitoso, ahora ingresa!', {
                                containerId : 'A',
                                position: "bottom-right",
                                autoClose: 2000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true
                            });
                            this.hide();
                        } else if (res.status === 500) {
                            toast.error('Lo sentimos, algo fallo en el servidor. Vuelve a intentarlo.', {
                                containerId : 'A',
                                position: "top-center",
                                autoClose: 1500,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true
                            });
                        }
                    }
                    )
                    .catch(error => {
                        toast.error('Error en el servidor. Vuelve a intentarlo', {
                            containerId : 'A',
                            position: "top-center",
                            autoClose: 1500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true
                        });
                    });
            }
            else {
                console.error("XD");
            }

        } catch (e) {
            console.log(e);

        }
    }


    render() {
        return (

            <div>
                <Modal show={this.state.show} onHide={this.hide}>
                    <Modal.Header closeButton>
                        <Modal.Title>¡Únete a nuestra comunidad!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body id="Register" >
                        <Form>
                            <Form.Group >
                                <Form.Label>Usuario</Form.Label>

                                <Form.Control id="username" required type="text" className={`form-control ${this.state.usernameError ? 'is-invalid register-form-control-username ' : 'register-form-control-username'}`} placeholder="Dinos como quieres que te llamemos... "
                                    onChange={this.changeValue} title="Username"  aria-label="Username">
                                </Form.Control>
                                <div className='invalid-feedback'>{this.state.usernameError}</div>
                                {checkUsername ? <div /> : <strong className="`valid`ation">*Rellena este campo</strong>}
                            </Form.Group>

                            <Form.Group >
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control id="name" required type="text" className="form-control" placeholder="Nombre "
                                    onChange={this.changeValue} title="Nombre" aria-label="Nombre">
                                </Form.Control>
                                {checkName ? <div /> : <strong className="validation">*Rellena este campo</strong>}
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Correo</Form.Label>
                                <Form.Control id="email" required type="text" className={`form-control ${this.state.emailError ? 'is-invalid ' : ''}`} placeholder="Brindanos tu correo... "
                                    onChange={this.changeValue} title="Correo" aria-label="Correo">
                                </Form.Control>
                                <div className='invalid-feedback'>{this.state.emailError}</div>
                                {checkEmail ? <div /> : <strong className="validation">*Rellena este campo</strong>}
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control id="password" required type="password" className={`form-control ${this.state.passwordError ? 'is-invalid ' : ''}`} placeholder="Contraseña "
                                    onChange={this.changeValue} title="Completa este campo." aria-label="Contrasenia usada">
                                </Form.Control>
                                <div className='invalid-feedback'>{this.state.passwordError}</div>
                                {checkPassword ? <div /> : <strong className="validation">*Rellena este campo</strong>}
                            </Form.Group>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.hide}>
                            Cerrar
                    </Button>
                        <Button id="but" type="button" className="btnSubmit" value="Registrarse" onClick={this.signUp}>
                            <strong>Registrarse</strong>
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
