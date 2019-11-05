import React, { Component } from 'react';
import Swal from 'sweetalert2';
import { Modal, Button, Form } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    componentDidUpdate(prevProps) {
        if (this.props.mostrar !== prevProps.mostrar) {
            this.setState({ show: this.props.mostrar });
        }
    }
    logIn() {
        if (this.state.usuario !== "" && this.state.password !== "") {

            var data = { _id: this.state.usuario, password: md5(this.state.password) };
            console.log(data);

            fetch("http://localhost:3001" + "/login", {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include'

            }).then(res => {
                if (res.status === 200) {
                    toast.success('¡Bienvenido de nuevo ' + this.state.usuario + ' !', {
                        containerId : 'A',
                        position: "bottom-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });

                    this.hideSuccess();
                } else if (res.status === 500) {
                    toast.error('Error en el servidor', {
                        containerId : 'A',
                        position: "bottom-right",
                        autoClose: 1200,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                }
                else {
                    toast.error('Usuario o contraseña incorrecta. Vuelva a intentarlo', {
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
            ).catch(error => {
                toast.error('Usuario o contraseña incorrecta. Vuelva a intentarlo', {
                    containerId : 'A',
                    position: "top-center",
                    autoClose: 1200,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            }
            );
        } else {
            toast.info('Debes llenar todos los campos.', {
                containerId : 'A',
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
    }
    hide() {
        this.props.cerrar();
    }
    hideSuccess() {
        this.props.cierreExitoso();
    }
    changeValue(e) {

        if (e.target.id === "usuario") {
            this.setState({
                usuario: e.target.value
            });
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
