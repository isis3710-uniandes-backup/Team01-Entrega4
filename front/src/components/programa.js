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
    componentDidUpdate(prevProps){
        if(prevProps.programa !==  this.props.programa)
        {
            this.setState({
                nombre : this.props.programa.nombre,
                area: this.props.programa.area,
                universidades: this.props.programa.universidades
            })
        }
    }
    cambiarUniversidades() {
        this.state.funcionUniversidades(this.state.universidades, this.state.nombre);
    }

    render() {
        return (
            <div className="col-12 marginBottom">
                <Card onClick={this.cambiarUniversidades} className="Programa">
                    <Card.Body className="little d-flex justify-content-between">
                        <h1 className="nombreprograma " >{this.state.nombre}</h1>
                        <span className={`badge badge-${this.state.area === 'ARTES Y CREATIVIDAD'? 'artes' : this.state.area.toLowerCase()} area `}>{this.state.area}</span>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
