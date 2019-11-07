import React, { Component } from 'react';
import '../styles/perfil.css';
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export default class perfil extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username: Cookies.get("USERNAME"),
            name: "",
            email: "",
            password: "***************",
            comentarios:[{titulo: "Reseña 1", descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, eos explicabo fugit,\n" +
                    "                                laboriosam libero, magnam maiores molestias nisi nobis officia praesentium quae sapiente suscipit ullam ut vitae voluptatem? Ab commodi earum fuga,\n" +
                    "                                ipsum non praesentium quaerat temporibus unde! Aliquam animi dignissimos, doloremque eius enim molestiae nisi numquam quo repellendus sint."},
                {titulo: "Reseña 2", descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, eos explicabo fugit,\n" +
                        "                                laboriosam libero, magnam maiores molestias nisi nobis officia praesentium quae sapiente suscipit ullam ut vitae voluptatem? Ab commodi earum fuga,\n" +
                        "                                ipsum non praesentium quaerat temporibus unde! Aliquam animi dignissimos, doloremque eius enim molestiae nisi numquam quo repellendus sint."},
                {titulo: "Reseña 3", descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, eos explicabo fugit,\n" +
                        "                                laboriosam libero, magnam maiores molestias nisi nobis officia praesentium quae sapiente suscipit ullam ut vitae voluptatem? Ab commodi earum fuga,\n" +
                        "                                ipsum non praesentium quaerat temporibus unde! Aliquam animi dignissimos, doloremque eius enim molestiae nisi numquam quo repellendus sint."},
                {titulo: "Reseña 4", descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, eos explicabo fugit,\n" +
                        "                                laboriosam libero, magnam maiores molestias nisi nobis officia praesentium quae sapiente suscipit ullam ut vitae voluptatem? Ab commodi earum fuga,\n" +
                        "                                ipsum non praesentium quaerat temporibus unde! Aliquam animi dignissimos, doloremque eius enim molestiae nisi numquam quo repellendus sint."},
                {titulo: "Reseña 5", descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, eos explicabo fugit,\n" +
                        "                                laboriosam libero, magnam maiores molestias nisi nobis officia praesentium quae sapiente suscipit ullam ut vitae voluptatem? Ab commodi earum fuga,\n" +
                        "                                ipsum non praesentium quaerat temporibus unde! Aliquam animi dignissimos, doloremque eius enim molestiae nisi numquam quo repellendus sint."}]
        }
    }

    componentDidMount() {
        let token = Cookies.get("JSESSIONID");
        if (token) {
            fetch("https://futureguide.herokuapp.com/usuarios/"+this.state.username, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': token
                })
            })
                .then(res => res.json())
                .then(json => {
                    this.setState({
                        username: json['_id'],
                        name: json['nombre'],
                        email: json['correo']
                    })
                });
        }
    }

    render(){
        return(
            <div className="container-fluid perfil">
                <div className="card mb-3 perfil_card" >
                    <div className="row no-gutters">
                        <div className="col-8">
                            <div className="card-body perfil_body">
                                <h5 className="card-title text-center perfil_title">{this.state.username}</h5>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="col-12">
                                            <p className="card-text text-center perfil_text1"><b>Nombre</b></p>
                                        </div>
                                        <div className="col-12">
                                            <p className="card-text text-center perfil_text2">{this.state.name}</p>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="col-12">
                                            <p className="card-text text-center perfil_text1"><b>Correo</b></p>
                                        </div>
                                        <div className="col-12">
                                            <p className="card-text text-center perfil_text2">{this.state.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 text-center">
                            <img src="http://lorempixel.com/350/350/" className="card-img rounded-circle perfil_img"alt="..."></img>
                        </div>
                    </div>
                </div>

                <div className="col-12 comentarios">
                    {this.state.comentarios.length !== 0 ?
                        <div className="row">
                            <div className="col-2 boton-comentario">
                                <div id="list-example" className="list-group">
                                    {this.state.comentarios.map((e,index) =>
                                        <a key={index} className="list-group-item list-group-item-action" href={"#list-item-"+(index)}>Reseña {index+1}</a>
                                    )}
                                </div>
                            </div>
                            <div data-target="#list-example" data-offset="0" className="col-10 comentario scrollbar-primary scrollspy-example">
                                {this.state.comentarios.map((e,i)=>
                                    <div className="col-12 info-comentario" key={i}>
                                        <h4 id={"list-item-"+(i)}><b>{e['titulo']}</b></h4>
                                        <p>{e['descripcion']}</p>
                                    </div>
                                )}
                            </div>
                        </div>:
                        <div className="row no-comentarios">
                            <div className="col-12 text-center">
                                <p>Aun no tienes comentarios. Por favor ayudanos a mejorar nuestra plataforma</p>
                            </div>
                            <div className="col-12 text-center">
                                <Link to="/carreras">
                                    <button type="button" className="btn btn-success">Ir</button>
                                </Link>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}
