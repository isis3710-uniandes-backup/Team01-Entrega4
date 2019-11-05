import React, { Component } from 'react'
import { Card } from 'react-bootstrap';
import "../styles/programa.css"

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
    cambiarUniversidades() {
        this.state.funcionUniversidades(this.state.universidades, this.state.nombre);
    }

    render() {
        return (
            <div className="col-12 marginBottom">
                <Card onClick={this.cambiarUniversidades} className="Programa">
                    <Card.Body >
                        <Card.Title className="programa-title">
                            <br></br>
                            <h1 className="nombreprograma" >{this.state.nombre}</h1>
                        </Card.Title>
                        <h2 className="area">Área: {this.state.area}</h2>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
