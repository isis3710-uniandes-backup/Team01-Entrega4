import React, { Component } from 'react'
import {
    Link,
    Redirect
  } from "react-router-dom";
import Cookies from 'js-cookie'

export default class detailCareer extends Component {
    state = {
        universidad : "",
        programa : "",
        costo : 0,
        duracion : -1 ,
        altaCalidad : false,
        acreditacionInternacional : "",
        salario : 0,
        videos : [],
        comentarios : []

        
    }
    componentDidMount()
    {
        let token = Cookies.get("JSESSIONID");
        console.log(token);
        if(token)
        {
            let {nombre, name} =  this.props.match.params;

            fetch(`http://localhost:3001/carrera/${nombre.toUpperCase()}/${name.toUpperCase()}` , {
                method: 'GET',
                headers: new Headers({
                    'Authorization': token
                })
            })
            .then(res => res.json())
            .then(json => {
                this.setState({
                    universidad : nombre, 
                    programa : name ,
                    costo : json.costo,
                    duracion : json.duracion,
                    altaCalidad : json.altaCalidad,
                    acreditacionInternacional : json.acreditacionInternacional,
                    salario : json.salario,
                    videos : json.videos,
                    comentarios : json.comentarios
                }, () => {
                    console.log(this.state);
                })
            }) 
        }        
    }
    render() {
        let token = Cookies.get("JSESSIONID");
        if(!token){
            return <Redirect to='/'/>
        }
        return (
            <div>
                
            </div>
        )
    }
}
