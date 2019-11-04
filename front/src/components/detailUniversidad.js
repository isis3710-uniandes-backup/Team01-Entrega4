import React, { Component } from 'react'
import {Card} from 'react-bootstrap';
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
            ciudad: this.props.ciudad

        }
    }
    render() {
        return (
            <Card id="Universidad" >
                <Card.Body >
                    <Card.Title>
                    <div className="row">
                        <div className="col-4" >

                        </div>
                        <div className="col-8">
                            <h3 id="nombreuniversidad" ><strong>Nombre: {this.state.nombre}</strong></h3>
                        </div>
                    </div>
                    </Card.Title>
                        <h5>Puesto a nivel nacional: {this.puestoNacional}</h5>
                        <h5>Puesto a nivel internacional: {this.puestoInternacional}</h5>
                        <h5>{this.direccion}</h5>
                        <h5>{this.ciudad}</h5>
                </Card.Body>
            </Card>
                  
        )
    }
}
