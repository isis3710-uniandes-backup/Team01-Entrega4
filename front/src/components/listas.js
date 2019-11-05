import React, { Component } from 'react'
import { Row, Col} from 'react-bootstrap';
import ListProgramas from './listProgramas';
import ListUniversidades from './listUniversidades';
import Cookies from 'js-cookie';


export default class Listas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            programas: [],
            universidades: [],
            nombrePrograma:""
        }
    }
    
    componentDidMount(){
        let token = Cookies.get("JSESSIONID");
        if (token) {
            console.log("Habemus token");
            fetch('https://futureguide.herokuapp.com/programas',
            {
                    method: 'GET',
                    headers: new Headers({
                        'Authorization': token
                    })
            }).then(
                resp=>{this.setState({programas:resp.json()})}
            )
        }
    }

    actualizarUniversidades(pUniversidades,pNombrePrograma)
    {
        this.setState({
            universidades: pUniversidades,
            nombrePrograma: pNombrePrograma
        })
    }

    render() {
        return (
            <Row>
                <Col id="ListaProgramas">
                    <ListProgramas funcionUniversidades={this.actualizarUniversidades} programas={this.state.programas}></ListProgramas>
                </Col>
                <Col id="ListaUniversidades">
                    <ListUniversidades nombrePrograma={this.state.nombrePrograma} universidades={this.state.universidades}></ListUniversidades>
                </Col>
            </Row>
        )
    }
}
