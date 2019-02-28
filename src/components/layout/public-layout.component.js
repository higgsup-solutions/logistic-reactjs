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
                <div className="layout-content public">
                    {this.props.children}
                </div>
                <PublicFooterComponent/>
            </div>
        );
    }
}

export default PublicLayoutComponent;
