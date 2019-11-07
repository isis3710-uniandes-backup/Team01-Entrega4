import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap';
import ListProgramas from './listProgramas';
import ListUniversidades from './listUniversidades';
import Cookies from 'js-cookie';
import '../styles/listas.css';
import { Redirect } from "react-router-dom";
import cap from '../assets/imgs/graduate-cap.png'

export default class Listas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            programas: [],
            programasTotal: [],
            universidadesTotal: [],
            universidades: [],
            nombrePrograma: "",
            programClicked: false
        }
    }

    componentDidMount() {
        let token = Cookies.get("JSESSIONID");
        if (token) {
            fetch('https://futureguide.herokuapp.com/programas',
                {
                    method: 'GET',
                    headers: new Headers({
                        'Authorization': token
                    })
                }).then(
                    resp => resp.json()
                )
                .then(json => {

                    this.setState({
                        programas: json,
                        programasTotal: json
                    })
                })
        }
    }

    changePrograms = (e) => {
        this.setState({
            programas: this.state.programasTotal.filter(element =>
                element.nombre.includes(e.target.value.toUpperCase())
            )
        })
    }
    changeUniversities = (e) => {
        this.setState({
            universidades: this.state.universidadesTotal.filter(element => {
                return (element.nombre.includes(e.target.value.toUpperCase()) || element.nickname.includes(e.target.value.toUpperCase()))
            })
        })
    }

    actualizarUniversidades = (pUniversidades, pNombrePrograma) => {
        let token = Cookies.get("JSESSIONID");
        let universidadesNuevas;
        if (token) {
            let urlServer = "https://futureguide.herokuapp.com";
            fetch(urlServer + `/programas/${pNombrePrograma}/universidades`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': token
                })
            })
                .then(res => res.json())
                .then(json => {
                    universidadesNuevas = json;
                    this.setState({
                        universidades: universidadesNuevas,
                        universidadesTotal: universidadesNuevas,
                        nombrePrograma: pNombrePrograma,
                        programClicked: true
                    })
                })


        }
    }

    render() {
        let token = Cookies.get("JSESSIONID");
        if (!token) {
            return <Redirect to='/' />
        }
        return (
            <Row className="container-fluid listas" style={{ overflowY: "auto" }} role="main">
                <Col className="col-6" >
                    <div className="col-12" id="searchprogramInput__Container">
                        <input id="searchprogramInput" className="form-control form-control-sm" type="text" placeholder="Buscar programa..." onChange={this.changePrograms} aria-label="Input para buscar un programa"></input>
                    </div>
                    <div className="scrollbar scrollbar-primary">
                        <ListProgramas funcionUniversidades={this.actualizarUniversidades} programas={this.state.programas}></ListProgramas>
                    </div>
                </Col>


                {this.state.programClicked ?
                    <>
                        <Col className="col-6" id="ListaUniversidades" >

                            <div className="col-12" id="searchprogramInput__Container">
                                <input id="searchprogramInput" className="form-control form-control-sm" type="text" placeholder="Buscar universidad..." onChange={this.changeUniversities} aria-label="Input para buscar una universidad"></input>
                            </div>
                            <div className="scrollbar scrollbar-universidades">
                                <ListUniversidades nombrePrograma={this.state.nombrePrograma} universidades={this.state.universidades}></ListUniversidades>
                            </div>
                        </Col>
                    </> : <Col className="col-6 d-flex align-items-center" id="ListaUniversidades" >
                        <div className="text-center w-100">
                            <img src={cap} alt="Marca de agua." className="img-fluid" />
                        </div>
                    </Col>
                }
            </Row>
        )
    }
}
