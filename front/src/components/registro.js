import React, { Component } from 'react';
import { Redirect } from 'react-router';
import {Button} from 'react-bootstrap';
import '../styles/registro.css';
//import Swal from "sweetalert2";
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
            logueado: this.props.logueado
            };
        this.changeValue = this.changeValue.bind(this);
        this.signUp = this.signUp.bind(this);
        this.validate = this.validate.bind(this);
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
                            .then(res => res.json())
                            .catch(error => console.error('Error:', error));
                    
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
            <div className="container register-container">
                <div className="row" id="login">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-6 offset-md-3 register-form">
                                <h3>Registrarse</h3>

                                <div className="form-group">
                                    <input id="username" required type="text" className="form-control register-form-control-username" placeholder="Username "
                                           onChange={this.changeValue} title="Completa este campo."></input>
                                    {checkUsername ? check === true ? <p id="validation">Ya esta en uso este usuario, intenta con otro.</p> : <div/> :
                                    <p className="validation">*Este campo es obligatorio</p>}
                                </div>
                                    <div className="form-group">
                                        <input id="name" required type="text" className="form-control" placeholder="Nombre "
                                               onChange={this.changeValue} title="Completa este campo."/>
                                        {checkName ? <div/>:<p className="validation">*Este campo es obligatorio</p>}
                                    </div>
                                    <div className="form-group">
                                        <input id="email" required type="text" className="form-control" placeholder="Correo "
                                               onChange={this.changeValue} title="Completa este campo."/>
                                        {checkEmail ? <div/>:<p className="validation">*Este campo es obligatorio</p>}
                                    </div>
                                    <div className="form-group">
                                        <input id="password" required type="password" className="form-control" placeholder="Contraseña "
                                               onChange={this.changeValue} title="Completa este campo."/>
                                        {checkPassword ? <div/>:<p className="validation">*Este campo es obligatorio</p>}
                                    </div>
                                    <div className="form-group">
                                        <Button id="but" type="button" className="btnSubmit" value="Registrarse" onClick={this.validate}>
                                           <strong>Registrarse</strong> 
                                        </Button>
                                        
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
