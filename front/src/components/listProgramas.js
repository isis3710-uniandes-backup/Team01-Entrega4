import React from 'react';
import Programa from './programa';
import '../styles/listPrograms.css';
export default class ListProgramas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            programas: this.props.programas
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.programas !== this.props.programas)
        {
            this.setState({
                programas : this.props.programas
            })
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
        console.log(this.state);
        return (
            <div>
                <div id="macheting">
                    {this.state.programas.map((e, i) => <Programa funcionUniversidades={this.props.funcionUniversidades} key={i} programa={e} />)}
                </div>
            </div>
        )
    };

}
