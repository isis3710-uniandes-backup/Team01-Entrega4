import React, { Component } from 'react'
import {Card, Image} from 'react-bootstrap';
import { Link } from "react-router-dom";
import "../styles/detailUniversidad.css"

export default class universidad extends Component {
    constructor(props) {
        super(props);
        this.state = {

            nombre: this.props.universidad.nombre,
            direccion: this.props.universidad.direccion,
            puestoNacional: this.props.universidad.puestoNacional,
            puestoInternacional: this.props.puestoInternacional,
            imagen: this.props.universidad.logo,
            ciudad: this.props.ciudad,
            programa: this.props.programa
        }
    }
    render() {
        return (
            <div id="card" className="col-12 marginBottom">
                 <Link id="link" to ={{
                    pathname: `/universidad/+${this.state.nombre}+/programa/${this.state.programa}`}} >
                    <Card id="Universidad" >
                            <Card.Header>
                             <h5 id="nombreuniversidad" ><strong>{this.state.nombre}</strong></h5>  
                            </Card.Header>
                            <Card.Body >
                            <div className="row" id="info">
                                <div className="col-3" >
                                <br></br>
                                <Image id="LogoUniversidad" src={this.state.imagen}></Image>
                                </div>
                                <div className="col-9">
                                    <p>Puesto a nivel nacional: {this.state.puestoNacional}</p>
                                    <p>Puesto a nivel internacional: {this.state.puestoInternacional}</p>
                                    <p>{this.state.direccion}</p>
                                    <p>{this.state.ciudad}</p>
                                </div>
                            </div>
                               

                                
                        </Card.Body>
                    </Card>
                </Link>    
            </div>
        )
    }
}
