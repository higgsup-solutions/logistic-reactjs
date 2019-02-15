import React, {Component} from 'react';
import './layout.scss';
import PublicHeaderComponent from "../share/public-header.component";
import PublicFooterComponent from "../share/public-footer.component";

class PublicLayoutComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <PublicHeaderComponent/>
                {this.props.children}
                <PublicFooterComponent/>
            </div>
        );
    }
}

export default PublicLayoutComponent;
