import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Modal, Button, Form } from 'react-bootstrap';
import '../styles/registro.css';
import Swal from "sweetalert2";
const md5 = require("md5");



let check = false;
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
                    if (this.state.username.length < 6) {
                        this.setState({
                            usernameError: 'Su nombre de usuario debe tener más de 6 caracteres'
                        })
                    }
                }
                fetch('https://futureguide.herokuapp.com/usuarios/' + this.state.username, {
                    method: 'GET'
                })
                    .then(res => res.status === 200 ? res.json() : null)
                    .then(json => {
                        if (json) {
                            if (json._id === this.state.username) {
                                console.log("Ya existe");
                                this.setState({
                                    usernameError: 'El usuario ya existe, intente otro'
                                })
                            }
                        }
                    })
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
                console.log(boddy);
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
                            Swal.fire({
                                type: 'success',
                                title: 'Registro exitoso',
                                text: '¡Diviértete en nuestra plataforma!',
                                timer: 2000
                            });
                            this.hide();
                        } else if (res.status === 500) {
                            Swal.fire({
                                type: 'error',
                                title: 'Error en el servidor',
                                text: 'Vuelve a intentarlo',
                                timer: 1500
                            });
                        }
                    }
                    )
                    .catch(error => console.error('Error:', error));
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
                                    onChange={this.changeValue} title="Username">
                                </Form.Control>
                                <div className='invalid-feedback'>{this.state.usernameError}</div>
                                {checkUsername ? <div /> : <strong className="`valid`ation">*Rellena este campo</strong>}
                            </Form.Group>

                            <Form.Group >
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control id="name" required type="text" className="form-control" placeholder="Nombre "
                                    onChange={this.changeValue} title="Nombre">
                                </Form.Control>
                                {checkName ? <div /> : <strong className="validation">*Rellena este campo</strong>}
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Correo</Form.Label>
                                <Form.Control id="email" required type="text" className={`form-control ${this.state.emailError ? 'is-invalid ' : ''}`} placeholder="Brindanos tu correo... "
                                    onChange={this.changeValue} title="Correo">
                                </Form.Control>
                                <div className='invalid-feedback'>{this.state.emailError}</div>
                                {checkEmail ? <div /> : <strong className="validation">*Rellena este campo</strong>}
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control id="password" required type="password" className={`form-control ${this.state.passwordError ? 'is-invalid ' : ''}`} placeholder="Contraseña "
                                    onChange={this.changeValue} title="Completa este campo.">
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
