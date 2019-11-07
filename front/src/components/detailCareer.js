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
            nombre = nombre.replace("+", "");
            nombre = nombre.replace("+", "");
            console.log(nombre);
            console.log(name);
            fetch(`https://futureguide.herokuapp.com/carrera/${nombre.toUpperCase()}/${name.toUpperCase()}`, {
                method: 'GET'
            })
                .then(res => res.json())
                .then(json => {
                    console.log(json)
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

    reseña = () => {
        let token = Cookies.get("JSESSIONID");
        if (token) {
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
                        titulo: result.value[0],
                        descripcion: result.value[1],
                        recomendada: result.value[2] === 0 ? false : true
                    };
                    let boddy = JSON.stringify(json);
                    fetch(`https://futureguide.herokuapp.com/carrera/${this.state.universidad.toUpperCase()}/${this.state.programa.toUpperCase()}/${"comentarios"}`, {
                        method: 'POST',
                        headers: new Headers({
                            'Authorization': token,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }),
                        body: boddy
                    }).then(() => {
                        fetch(`https://futureguide.herokuapp.com/usuarios/${Cookies.get("USERNAME")}/${"comentarios"}`, {
                            method: 'POST',
                            headers: new Headers({
                                'Authorization': token,
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            }),
                            body: boddy
                        }).then(() => {
                            let coments = this.state.comentarios;
                            coments.push(json)
                            this.setState({
                                comentarios: coments
                            })
                        });
                    })
                }
            })
        }
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
                                <div className="row justify-content-center" id="marginBottomRow">
                                    {this.state.comentarios.length > 1 ? <>
                                        <a className="carousel-control-prev" href="#carousel-example-1z" role="button" data-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="sr-only">Previous</span>
                                        </a>
                                        <a className="carousel-control-next" href="#carousel-example-1z" role="button" data-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="sr-only">Next</span>
                                        </a>
                                    </> : false}
                                </div>
                                <div id="carousel-example-1z" className="carousel slide carousel-fade" data-ride="carousel">
                                    <ol className="carousel-indicators">
                                        <li data-target="#carousel-example-1z" data-slide-to={0} className="active"></li>
                                        {this.state.comentarios.map((element, index) => index !== 0 ?
                                            <li key={index} data-target="#carousel-example-1z" data-slide-to={index + 1}></li> : false)}
                                    </ol>
                                    <div className="carousel-inner" role="listbox" aria-label="carousel de reseñas">
                                        {this.state.comentarios.length > 0 ?
                                            <div className="carousel-item active">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h3 className="tituloComentario">{this.state.comentarios[0].titulo}</h3>
                                                    </div>
                                                    <div className="card-body">
                                                        <blockquote className="blockquote mb-0">
                                                            <p className="comentarioDescripcion">"{this.state.comentarios[0].descripcion}"</p>
                                                            {this.state.comentarios[0].recomendada ? <span className="badge badge-style badge-recomendada">Recomendada</span> : <span className="badge badge-style badge-nrecomendada">No recomendada</span>}
                                                        </blockquote>
                                                    </div>
                                                </div>
                                            </div> : false}
                                        {this.state.comentarios.map((el, i) => <div key={i} className="carousel-item">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h3 className="tituloComentario">{el.titulo}</h3>
                                                </div>
                                                <div className="card-body">
                                                    <blockquote className="blockquote mb-0">
                                                        <p className="comentarioDescripcion">"{el.descripcion}"</p>
                                                        {el.recomendada ? <span className="badge badge-style badge-recomendada">Recomendada</span> : <span className="badge badge-style badge-nrecomendada">No recomendada</span>}
                                                    </blockquote>
                                                </div>
                                            </div>
                                        </div>)}
                                    </div>
                                </div>
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
                        <div className="scrollbar scrollbar-videos">
                            {this.state.videos.map((element, index) =>
                                <div key={index} className="embed-responsive embed-responsive-16by9 videos">
                                    <iframe className="embed-responsive-item" src={element} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" title={`Video${index}`} aria-label={`Video${index}`} allowFullScreen></iframe>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
