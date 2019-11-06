import React, { Component } from 'react'
import {
    Redirect
} from "react-router-dom";
import Cookies from 'js-cookie'
import timeImage from "../assets/imgs/alarm-clock.png"
import cashImage from "../assets/imgs/cash.png"
import acreditacionInternacionalImg from "../assets/imgs/global-marketing.png"
import "../styles/detailCareer.css";
import Swal from "sweetalert2";
export default class detailCareer extends Component {
    state = {
        universidad: "",
        programa: "",
        costo: 0,
        duracion: -1,
        altaCalidad: false,
        acreditacionInternacional: "",
        salario: 0,
        videos: [],
        comentarios: []


    }
    componentDidMount() {
        let token = Cookies.get("JSESSIONID");
        if (token) {
            let { nombre, name } = this.props.match.params;
             nombre = nombre.replace("+","");
             nombre = nombre.replace("+","");
             console.log(nombre, name);
            fetch(`http://futureguide.herokuapp.com/carrera/${nombre.toUpperCase()}/${name.toUpperCase()}`, {
                method: 'GET'
            })
                .then(res => res.json())
                .then(json => {
                    this.setState({
                        universidad: nombre,
                        programa: name,
                        costo: json.costo,
                        duracion: json.duracion,
                        altaCalidad: json.altaCalidad,
                        acreditacionInternacional: json.acreditacionInternacional,
                        salario: json.salario,
                        videos: json.videos,
                        comentarios: json.comentarios
                    })
                })
        }
    }

    reseña(){
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

                let json = {
                    titulo : result.value[0],
                    descripcion : result.value[1],
                    recomendada : result.value[2]
                };
                /*
                let boddy = JSON.stringify(json);
                let { nombre, name } = this.props.match.params;
                nombre = nombre.replace("+","");
                nombre = nombre.replace("+","");
                fetch(`http://futureguide.herokuapp.com/carrera/${nombre.toUpperCase()}/${name.toUpperCase()}/${"comentarios"}`, {
                    method: 'POST',
                    body: boddy
                }).then(()=>{
                    console.log("TODO BIEN")
                })*/
            }
        })
    }
    render() {
        let token = Cookies.get("JSESSIONID");
        if (!token) {
            return <Redirect to='/' />
        }
        return (
            <div className="container-fluid detailCareer" role="main">
                <div className="row">
                    <div className="col-lg-7 col-xl-7 col-md-7 col-12 infoDetail">
                        <div className="row">
                            <div className="col-lg-6 col-xl-6 col-md-6 col-12">
                                <h1 id="programName">{this.state.programa}</h1>
                                <h2 id="universityyName">{this.state.universidad}</h2>
                                {this.state.altaCalidad ? <span className="badge badge-calite">Alta calidad</span> : false}
                                <br />
                                <strong>Costo semestre </strong>
                                <strong className="atributosCareer">${this.state.costo}</strong>

                            </div>
                            <ul className="col-lg-6 col-xl-6 col-md-6 col-12x   list-group list-group-flush">
                                <li className="list-group-item  d-flex justify-content-between align-items-center">
                                    <img src={timeImage} className="img-fluid img-responsive img-Little" alt="Duracion de la carrera" />
                                    <strong className="atributosCareer">{this.state.duracion} </strong> <strong className=" cursiveAnotation text-right">semestres.</strong>
                                </li>
                                <li className="list-group-item  d-flex justify-content-between align-items-center">
                                    <img src={cashImage} className="img-fluid img-responsive img-Little" alt="Duracion de la carrera" />
                                    <p className="atributosCareer">{this.state.salario}</p> <strong className=" cursiveAnotation text-right">en promedio.</strong>
                                </li>
                                {this.state.acreditacionInternacional ? <li className="list-group-item  d-flex justify-content-between align-items-center">
                                    <img src={acreditacionInternacionalImg} className="img-fluid img-responsive img-Little" alt="Duracion de la carrera" />
                                    <p className="atributosCareer">{this.state.acreditacionInternacional}</p>
                                </li> : false}
                            </ul>
                        </div>
                        <div className="row d-flex justify-content-center">
                            <div className="col-12 overflow">
                                {this.state.comentarios.map((element, index) =>

                                    <div  key={index} className="card">
                                        <div className="card-header">
                                            <h3 id="tituloComentario">{element.titulo}</h3>
                                        </div>
                                        <div className="card-body">
                                            <blockquote className="blockquote mb-0">
                                                <p id="comentarioDescripcion">"{element.descripcion}"</p>
                                               {element.recomendada ? <span className="badge badge-style badge-recomendada">Recomendada</span> : <span className="badge badge-style badge-nrecomendada">No recomendada</span>  } 
                                            </blockquote>
                                        </div>
                                    </div>
                            )}
                            </div>
                        </div>
                        <div className="row boton">
                            <div className="col-12 text-center">
                                <button type="button" className="btn btn-success" onClick={this.reseña}>Agregar</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-5 d-none d-md-block text-center" id="videosColumn">
                        <h2>Videos</h2>
                        {this.state.videos.map((element, index) =>
                            <div key={index} className="embed-responsive embed-responsive-16by9 videos">
                                <iframe className="embed-responsive-item" src={element} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" title={`Video${index}`} aria-label={`Video${index}`} allowFullScreen></iframe>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}
