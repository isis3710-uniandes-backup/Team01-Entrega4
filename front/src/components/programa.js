import React, { Component } from 'react'
import {Card, Button, Image} from 'react-bootstrap';
import "../styles/detailUniversidad.css"

export default class Programa extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: this.props.programa.nombre,
            area: this.props.programa.area,
            universidades: this.props.programa.universidades,
            funcionUniversidades: this.props.funcionUniversidades
        }
        this.cambiarUniversidades = this.cambiarUniversidades.bind(this);
    }
    cambiarUniversidades(){
        this.state.funcionUniversidades(this.state.universidades, this.state.nombre);
    }

    render() {
        return (
            <Card onClick={this.cambiarUniversidades} id="Programa">
                <Card.Body >
                    <Card.Title>
                    <div className="row">
                        <div className="col">
                            <h3 id="nombreprograma" ><strong>Nombre: {this.state.nombre}</strong></h3>
                        </div>
                    </div>
                    </Card.Title>
                        <h5>Area: {this.area}</h5>
                </Card.Body>
            </Card>    
        )
    }
}
