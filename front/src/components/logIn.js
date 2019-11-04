import React, { Component } from 'react';
import Swal from 'sweetalert2';
import { Modal, Button, Form } from 'react-bootstrap'
import Cookies from 'js-cookie';
const md5 = require("md5");
const url = "https://futureguide.herokuapp.com";

class LogIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usuario: "",
            password: "",
            show: this.props.mostrar
        };
        this.changeValue = this.changeValue.bind(this);
        this.logIn = this.logIn.bind(this);
        this.hide = this.hide.bind(this);
    }
    componentDidUpdate(prevProps)
    {          
        if (this.props.mostrar !== prevProps.mostrar) {
            this.setState({show:this.props.mostrar});
          }
    }
    logIn() {
        if (this.state.usuario !== "" && this.state.password !== "") {

            var data = { _id: this.state.usuario, password: md5(this.state.password) };

            fetch(url + "/login", {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .catch(
                    Swal.fire({
                        type: 'error',
                        title: 'Usuario o Contraseña incorrecta',
                        text: 'Vuelve a intentarlo',
                        timer: 1500
                    })
                )
                .then(
                    Swal.fire({
                        type: 'success',
                        title: 'Bienvenido de nuevo ' + this.state.usuario,
                        text: '¡Diviértete en nuestra plataforma!',
                        timer: 2000
                    })
                ).then(
                    this.hide()
                );
        } else {
            Swal.fire({
                type: 'error',
                title: 'Falta Info',
                text: 'Completa todos los campos para seguir',
                timer: 1500
            })
        }
    }
    hide() {
        this.props.cerrar();
    }
    changeValue(e) {
        if (e.target.id === "usuario") {
            this.setState({
                usuario: e.target.value
            });
            console.log(e.target.value);
        } else {
            this.setState({
                password: e.target.value
            });
        }
    }
    render() {
        return (

            <div>
                <Modal show={this.state.show} onHide={this.hide}>
                    <Modal.Header closeButton>
                        <Modal.Title>Iniciar Sesion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group >
                                <Form.Label>Usuario</Form.Label>
                                <Form.Control id="usuario" type="text" placeholder="Usuario" onChange={this.changeValue} />

                            </Form.Group>

                            <Form.Group >
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control id="password" type="password" placeholder="Contraseña" onChange={this.changeValue} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.hide}>
                            Cerrar
                        </Button>
                        <Button variant="primary" onClick={this.logIn}>
                            Loguearme
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default LogIn;
