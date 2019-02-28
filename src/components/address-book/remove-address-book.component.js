import React, {Component} from 'react';
import {Button, Dialog} from 'element-react';
import './address-book.scss';
import {removeAddress} from "../../integrate/address-book";

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
                    title="Delete address"
                    size="tiny"

                    visible={ this.props.visible }
                    onCancel={ this.props.onCancel }
                >
                    <Dialog.Body>
                        <span>
                            Are you sure to delete address of <strong>{this.state.addressData.contactName}</strong>?
                        </span>
                    </Dialog.Body>

                    <Dialog.Footer className="dialog-footer">
                        <Button onClick={ this.props.onCancel }>Cancel</Button>
                        <Button type="primary" onClick={ this.removeAddress }>Confirm</Button>
                    </Dialog.Footer>
                </Dialog>
            </div>
        );
    }
}

export default RemoveAddressBook;
