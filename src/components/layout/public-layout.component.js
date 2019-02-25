import React, {Component} from 'react';
import './layout.scss';
import PublicHeaderComponent from "../share/public-header.component";
import PublicFooterComponent from "../share/public-footer.component";
import Header from "../share/header.component";

class PublicLayoutComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <PublicHeaderComponent pathname={this.props.location.pathname}/>
                {this.props.children}
                <PublicFooterComponent/>
            </div>
        );
    }
}

export default PublicLayoutComponent;
