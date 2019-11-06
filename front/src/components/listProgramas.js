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
    render() {
        return (
            <div>
                <div id="macheting">
                    {this.state.programas.map((e, i) => <Programa funcionUniversidades={this.props.funcionUniversidades} key={i} programa={e} />)}
                </div>
            </div>
        )
    };

}
