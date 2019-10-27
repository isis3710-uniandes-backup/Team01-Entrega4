import React, { Component } from 'react'
import '../styles/home.css';
import { Container } from 'react-bootstrap';
import { Search } from 'semantic-ui-react'
import Cookies from 'js-cookie'

export default class home extends Component {

    state = {
        isLoading: false,
        resultsSearched: { a : {name : "a", results: [{
        "title": "Fay, Stokes and Weissnat",
        "description": "Multi-tiered bottom-line infrastructure",
        "image": "https://s3.amazonaws.com/uifaces/faces/twitter/alterchuca/128.jpg",
        "price": "$95.98"
      }]}},
        programsByArea : [],
        valueSearched : ""
    }

    handleSearchChange = (e, {value}) => {
        this.setState({
            isLoading: true,
            valueSearched : e.target.value
        }, () => {
           let newResults = this.state.programsByArea.filter(element => {
                return element.nombre.includes(this.state.valueSearched.toUpperCase())
            });
            //falta tomar los nuevos resultados y dividirlos en categorias
        });
        

    }

    componentDidMount()
    {
        let token = Cookies.get('SESSIONID');
        fetch("http://localhost:3001/programas", {
            method : 'GET',
            headers : new Headers({
                'Authorization' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZnIiwiaWF0IjoxNTcyMTUxNTc4LCJleHAiOjE1NzIxNjIzNzh9.HWuV4kEhKcQDg9v99gRIE8NKQz6NsVYZI9wFjO7rwrg'
            })
        })
        .then(res => res.json())
        .then(json => {
            this.setState({
                programsByArea : json
            }, () => {
                console.log(this.state.programsByArea);
            })
        })
    }

    render() {
        return (
            <div>
                <Container>
                    <h1>Decide lo mejor para tu futuro</h1>
 {                    <Search
                        category
                        loading={this.state.isLoading}
                        onResultSelect={this.handleResultSelect}
                        onSearchChange={this.handleSearchChange}
                        results={this.state.resultsSearched}
                        value={this.state.valueSearched}
                        placeholder="Busca el programa de tu interés... "
                        {...this.props}
                    /> }
                </Container>
            </div>
        )
    }
}
