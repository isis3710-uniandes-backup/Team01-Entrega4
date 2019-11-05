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
            universidades: []
        }
    }
    
    componentDidMount(){
        let token = Cookies.get("JSESSIONID");
        if (token) {
            console.log("Habemus token");
            fetch('http://futureguide.herokuapp.com/programas', 
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

    actualizarUniversidades(pUniversidades)
    {
        this.setState({
            universidades: pUniversidades
        })
    }

    render() {
        return (
            <Row>
                <Col id="ListaProgramas">
                    <ListProgramas funcionUniversidades={this.actualizarUniversidades} programas={this.state.programas}></ListProgramas>
                </Col>
                <Col id="ListaUniversidades">
                    <ListUniversidades universidades={this.state.universidades}></ListUniversidades>
                </Col>
            </Row>
        )
    }
}
