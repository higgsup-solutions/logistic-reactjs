import React, {Component} from 'react';
import {Button, Dialog} from 'element-react';
import './address-book.scss';
import {removeAddress} from "../../integrate/address-book";
import {FormattedMessage, injectIntl} from "react-intl";

class RemoveAddressBook extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addressData: props.addressData
        };
    }


    removeAddress = () => {
        removeAddress(this.state.addressData.id)
            .then(() => this.props.onSubmit());
    };

    render() {
        return (
            <div>
                <Dialog
                    title={this.props.intl.formatMessage({id: 'ab.remove.title'})}
                    size="tiny"
                    visible={ this.props.visible }
                    onCancel={ this.props.onCancel }
                >
                    <Dialog.Body>
                        <span>
                            <FormattedMessage id="ab.remove.confirm"/>&nbsp;
                            <strong>{this.state.addressData.contactName}</strong>?
                        </span>
                    </Dialog.Body>

                    <Dialog.Footer className="dialog-footer">
                        <Button onClick={ this.props.onCancel }>
                            <FormattedMessage id="cancel"/>
                        </Button>
                        <Button type="primary" onClick={ this.removeAddress }>
                            <FormattedMessage id="confirm"/>
                        </Button>
                    </Dialog.Footer>
                </Dialog>
            </div>
        );
    }
}

export default injectIntl(RemoveAddressBook);
