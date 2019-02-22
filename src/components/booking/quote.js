import React, {Component} from 'react';
import './booking.scss';
import {FormattedMessage, injectIntl} from "react-intl";
import {Button, Dialog} from 'element-react';

class Quote extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount() {
    }


    render() {
        return (
            <div className="quote">
                <Dialog
                    title={this.props.intl.formatMessage({id: 'booking.quote'})}
                    size="small"
                    visible={ this.props.showQuote }
                    onCancel={ () => this.props.closeQuote() }
                    lockScroll={ false }
                >
                    <Dialog.Body>
                        <div className="row p-2">
                            <div className="col-6 font-weight-bold">
                                <FormattedMessage id='quote.baseCharge'/>
                            </div>
                            <div className="col-6">
                                {this.props.data.baseCharge}
                            </div>
                        </div>
                        <div className="row p-2">
                            <div className="col-6 font-weight-bold">
                                <FormattedMessage id='quote.fuelSurcharge'/>
                            </div>
                            <div className="col-6">
                                {this.props.data.fuelSurcharge}
                            </div>
                        </div>
                        <div className="row p-2 border-top-1">
                            <div className="col-6 font-weight-bold">
                                <FormattedMessage id='quote.totalWeight'/>
                            </div>
                            <div className="col-6">
                                {this.props.data.totalWeight}
                            </div>
                        </div>
                        <div className="row p-2">
                            <div className="col-6 font-weight-bold">
                                <FormattedMessage id='quote.weightType'/>
                            </div>
                            <div className="col-6">
                                {this.props.data.weightType}
                            </div>
                        </div>
                        <div className="row p-2 border-top-1">
                            <div className="col-6 font-weight-bold">
                                <FormattedMessage id='quote.totalCharge'/>
                            </div>
                            <div className="col-6">
                                {this.props.data.totalCharge}
                            </div>
                        </div>
                        <div><FormattedMessage id='quote.messageFoot'/></div>
                    </Dialog.Body>
                    <Dialog.Footer className="dialog-footer">
                        <Button type="primary" onClick={ () => this.props.closeQuote() }>Ok</Button>
                    </Dialog.Footer>
                </Dialog>
            </div>
        );
    }
}

export default injectIntl(Quote);
