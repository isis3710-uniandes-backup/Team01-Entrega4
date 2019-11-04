import React, { Component } from 'react'
import "../styles/universidad.css"

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
            <div class="col-md-6 no-padding lib-item" data-category="view">
                <div class="lib-panel">
                    <div class="row box-shadow">
                        <div class="col-md-6">
                            <img class="lib-img-show" alt="logo universidad" height="100" width="100" src={this.state.imagen}/>
                        </div>
                        <div class="col-md-6">
                            <div class="lib-row lib-header">
                                {this.state.nombre}
                                <div class="lib-header-seperator"></div>
                            </div>
                            <div class="lib-row lib-desc">
                               <h5>{this.state.direccion}</h5>
                               <h5>{this.state.puesto}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
