import React from 'react';
import Universidad from './universidad';

export default class ListUniversidades extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            universidades: this.props.universidades
        }
    }

    componentDidUpdate( prevProps){
        if (this.props.universidades !== prevProps.universidades) {
            this.setState({ universidades: this.props.universidades });
        }
    }

    render() {
        return (
            <div>
                <div className="row">
                    {this.state.universidades.map((e, i) => <Universidad key={i} universidad={e} />)}
                </div>
            </div>
        )
    };

}
