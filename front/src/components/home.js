import React, { Component } from 'react'
import '../styles/home.css';
import { Container, Row } from 'react-bootstrap';
import Cookies from 'js-cookie'

export default class home extends Component {

    state = {
        isLoading: false,
        resultsSearched: [],
        programsByArea: [],
        programsBackUp: [],
        valueSearched: ""
    }

    handleSearchChange = (e, { value }) => {

        this.setState({
            isLoading: true,
            valueSearched: e.target.value
        }, () => {
            let temporal = [...this.state.programsByArea];
            temporal.map(element => {
                let backupElement = element;
                let newPrograms = backupElement.results.filter(program => {
                    return program.title.includes(this.state.valueSearched.toUpperCase());
                })
                backupElement.results = newPrograms;
                return backupElement;
            });
            this.setState({
                resultsSearched: temporal
            });
            //falta tomar los nuevos resultados y dividirlos en categorias
        });
    }
    search() {

    }

    componentDidMount() {
        console.log("Mounting")
        //let token = Cookies.get('SESSIONID');
        fetch("http://localhost:3001/programas/area", {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZnIiwiaWF0IjoxNTcyMzYyNjgxLCJleHAiOjE1NzIzNzM0ODF9.kjuLfblG8PyQu-OamiE3I1Ekz_KMqZnA4hUs8Mey_y8'
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.success === false) {
                    console.log(json);
                    //enrutar hacia el home 
                }
                else {
                    let objectFinal = [];
                    json.forEach(element => {
                        objectFinal.push({
                            name: element._id,
                            results: element.programs
                        })
                    });
                    this.setState({
                        programsByArea: objectFinal,
                        programsBackUp: objectFinal
                    });
                    console.log(this.state.programsByArea);
                }
            })
    }

    render() {
        return (
            <div>
                <Container className="justify-content-center align-items-center text-center h-100">
                    <div id="homeContainer"  >
                        <h1>Decide lo mejor para tu futuro</h1>
                        <form onSubmit={this.search}>
                            <div className="form-group">
                                <input type="text" id="searchBar" placeholder="Busca por universidad o programa" list="options"></input>
                                 
                                <datalist id="options">
                                    {this.state.programsByArea.map((e, i) =>
                                        e.results.map((element, i) => <option key={i} value={element.title}>{e.name}</option>)
                                    )}
                                </datalist>
                            </div>
                        </form>
                    </div>

                </Container>
            </div>
        )
    }
}
