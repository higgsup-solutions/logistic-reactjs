import React, {Component} from 'react';
import './confirm.scss';

class ConfirmComponent extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.location.state.data)
    }


    render() {

        return (
            <div className="confirm">
                <h1>Confirm page</h1>
            </div>
        );
    }
}

export default ConfirmComponent;
