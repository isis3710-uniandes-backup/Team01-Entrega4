import React, { Component } from 'react';
import '../styles/perfil.css';
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
                        email: json['correo'],
                        comentarios: json['comentarios'] == undefined ? []:json['comentarios']
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
                                <h5 className="card-title perfil_title">{this.state.username}</h5>
                                <p className="card-text perfil_text"><b>Nombre:</b>{" " + this.state.name}</p>
                                <p className="card-text perfil_text"><b>Correo:</b>{" " + this.state.email}</p>
                                <p className="card-text perfil_text"><b>Contraseña:</b> {" " + this.state.password}</p>
                            </div>
                        </div>
                        <div className="col-4 text-center">
                            <img src="http://lorempixel.com/350/350/" className="card-img rounded-circle perfil_img"alt="..."></img>
                        </div>
                    </div>
                </div>

                <div className="col-12 comentarios">
                    <div className="row">
                        <div id="list-example" className="list-group">
                            {this.state.comentarios.map((e,index) =>
                                <a key={index} className="list-group-item list-group-item-action" href={"#list-item-"+(index)}>Reseña {index+1}</a>
                            )}
                        </div>
                        <div data-target="#list-example" data-offset="0" className="scrollspy-example">
                            {this.state.comentarios.map((e,i)=>
                                <div key={i}>
                                    <h4 id={"list-item-"+(i)}>{e['titulo']}</h4>
                                    <p>{e['descripcion']}</p>
                                    <hr></hr>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
