import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Modal, Button, Form, FormControl } from 'react-bootstrap';
import '../styles/registro.css';
import Cookies from 'js-cookie';
import Swal from "sweetalert2";
const url = "";


let check = false;
let checkUsername = true;
let checkName = true;
let checkEmail = true;
let checkPassword = true;

export default class register extends Component{

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            name: "",
            email: "",
            password: "",
            changeLogInStatus: this.props.changeLogInStatus,
            //logFunc: this.props.logFunc,
            logueado: this.props.logueado,
            show:false
            };
        this.changeValue = this.changeValue.bind(this);
        this.signUp = this.signUp.bind(this);
        this.validate = this.validate.bind(this);
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
                username: e.target.value
            });
        }
        else if(e.target.id === "name") {
            this.setState({
                name: e.target.value
            });
            if(e.target.id !== "")
                checkName = true;
        }
        else if(e.target.id === "email") {
            this.setState({
                email: e.target.value
            });
            if(e.target.id !== "")
                checkEmail = true;
        }
        else if(e.target.id === "password") {
            this.setState({
                password: e.target.value
            });
            if(e.target.id !== "")
                checkPassword = true;
        }
    }

    //usernameCheck(username){
    //  let user = Users.findOne({username: username});
    //  return user==null ? false:true;
    //}

    validate(){
        checkUsername = false;
        checkEmail = false;
        checkName = false;
        checkPassword = false;
        if(this.state.username !== "")
            checkUsername = true;
        if(this.state.name !== "")
            checkName = true;
        if(this.state.email !== "")
            checkEmail = true;
        if(this.state.password !== "")
            checkPassword = true;
        if(checkUsername && checkPassword && checkEmail && checkName)
            this.signUp();
        this.forceUpdate ()
    }

    signUp(){
        var userFind;
            fetch(url+'/usuarios/' + this.state.username)
                .then(res => res.json())
                .then(data => userFind = data[0]);
            console.log(userFind);

            if (userFind === undefined) {
                try {
                        fetch(url+'/register', {
                            method: 'POST', // or 'PUT'
                            body: JSON.stringify({
                                username: this.state.username,
                                name: this.state.name,
                                email: this.state.email,
                                password: this.state.password
                            }),
                            headers: {
                                'Content-Type': 'application/json'
                            }
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

                            ).catch(error => console.error('Error:', error));
                    
                } catch (e) {
                    console.log(e);
 
                }
            }
    }

    render() {
        if (this.state.logueado) {
            return <Redirect to={{
                pathname : '/',
                state : {
                    user : this.state.username
                }
            }} />;
        }
        return (

            <div>
            <Modal show={this.state.show} onHide={this.hide}>
                <Modal.Header closeButton>
                    <Modal.Title>Registrarse</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group >
                            <Form.Label>Username</Form.Label>
                            <Form.Control id="username" required type="text" className="form-control register-form-control-username" placeholder="Username "
                                onChange={this.changeValue} title="Completa este campo.">
                                
                            </Form.Control>
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control id="name" required type="text" className="form-control" placeholder="Nombre "
                                onChange={this.changeValue} title="Completa este campo.">
                               
                            </Form.Control>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Correo</Form.Label>
                            <Form.Control id="email" required type="text" className="form-control" placeholder="Correo "
                                onChange={this.changeValue} title="Completa este campo.">
                            </Form.Control>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control id="password" required type="password" className="form-control" placeholder="Contraseña "
                                onChange={this.changeValue} title="Completa este campo.">
                            </Form.Control>
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.hide}>
                        Cerrar
                    </Button>
                    <Button id="but" type="button" className="btnSubmit" value="Registrarse" onClick={this.validate}>
                        <strong>Registrarse</strong> 
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
        )
    }
}
