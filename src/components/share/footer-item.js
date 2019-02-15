import React, {Component} from 'react';
import './share.scss';

class FooterItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount() {
    }


    render() {
        return (
            <div className="footer-item">
                <i className={`fa ${this.props.icon}`}></i>
                <span className="text">{this.props.text}</span>
            </div>
        );
    }
}

export default FooterItem;
