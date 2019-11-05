import React from 'react';
import Universidad from './universidad';

export default class ListUniversidades extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            universidades: this.props.universidades,
            programa: this.props.nombrePrograma
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.universidades !== prevProps.universidades) 
        {
            this.setState(
                {
                    universidades: this.props.universidades,
                    programa: this.props.nombrePrograma
                }
            );
        }
    }

    render() {
        return (
            <div>
                {this.state.universidades ?
                    <div className="row">
                        {this.state.universidades.map((e, i) => <  Universidad programa={this.state.programa} key={i} universidad={e} />)}
                    </div> : false}
            </div>
        )
    };

}
