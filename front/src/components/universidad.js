import React, { Component } from 'react'
import { Redirect } from "react-router-dom";

export default class universidad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: this.props.universidad.nombre,
            direccion: this.props.universidad.direccion,
            puesto: this.props.universidad.puestoNacional,
            imagen: this.props.universidad.logo,
            goDetail : false,
            programa : this.props.programa

        }
    }
    detail= () => {
        this.setState({
            goDetail : true
        })
    }
    render() {
        if(this.state.goDetail){
            this.setState({
                goDetail : false
            })
            return <Redirect to={{
                pathname:  `/universidad/${this.state.nombre}/programa/${this.state.programa}`
            }}/>
        }
        return (
            <div className="col-12">
                <div className="card" onClick={this.detail}>
                <div className="card-header">{this.state.nombre}</div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <img className="lib-img-show img-fluid" alt="logo universidad" height="100" width="100" src={this.state.imagen} />
                        </div>
                        <div className="col-md-8">
                            <h5>{this.state.direccion}</h5>
                            <p>Puesto nacional : <strong>{this.state.puesto}</strong></p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            
        )
    }
}
