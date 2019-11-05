import React from 'react';
import Universidad from './universidad';

export default class Programa extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            universidades: this.props.universidades,
            univFilt : this.props.universidades,
            criteria: ""
        }
    }
    filtering = e => {
        let criteria = e.target.value;
        let filtered = this.state.univFilt;
        let filtr = filtered.filter(
            element => {
                console.log(element.name.includes(criteria));
                return element.name.includes(criteria);
            }
        );
        if(criteria === '')
        {
            filtr = this.state.univFilt;
        }
        this.setState({
            universidades: filtr,
            criteria : criteria
        });
    }

    render() {
        return (
            <div>
                <input className="form-control" type="text" id="myInput" onChange={this.filtering} value={this.state.criteria} placeholder="Busca por el nombre del evento deportivo.." />
                <div className="row">
                    {this.state.universidades.map((e, i) => <Universidad key={i} universidad={e} />)}
                </div>
            </div>
        )
    };

}
