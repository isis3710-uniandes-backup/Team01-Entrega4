import React from 'react';
import Programa from './programa';

export default class ListProgramas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            programas: this.props.programas
        }
    }
    /*filtering = e => {
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
    }*/

    render() {
        return (
            <div>
                <div className="row">
                    {this.state.programas.map((e, i) => <Programa funcionUniversidades={this.props.funcionUniversidades} key={i} programa={e} />)}
                </div>
            </div>
        )
    };

}
