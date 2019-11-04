import React, { Component } from 'react'

export default class universidad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: this.props.universidad.nombre,
            direccion: this.props.universidad.direccion,
            puesto: this.props.universidad.puestoNacional,
            imagen: this.props.universidad.logo

        }
    }
    render() {
        return (
            <div class="card">
                <div class="card-header">{this.state.nombre}</div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-4">
                            <img class="lib-img-show" alt="logo universidad" height="100" width="100" src={this.state.logo} />
                        </div>
                        <div class="col-md-8">
                            <h5>{this.state.direccion}</h5>
                            <h5>{this.state.puesto}</h5>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
