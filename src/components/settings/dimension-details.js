import React, {Component} from "react";
import {FormattedMessage, injectIntl} from "react-intl";
import {Dialog, Button, Input, Notification} from "element-react";
import {MODIFY_MODE} from "../../App.constant";
import {addDimension, updateDimension} from "../../integrate/dimension";
import {processNumber} from "../../utils/number";

class DimensionDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            mode: MODIFY_MODE.ADD_MODE,
            dialogVisible: false,
            dimensionItem: {
                name: '',
                weight: '',
                width: '',
                length: '',
                height: '',
                comment: ''
            }
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {data, isClickItem, mode} = nextProps;
        if (isClickItem && data) {
            let newState = {
                mode,
                dialogVisible: true,
            };

            // if edit mode => set data item
            if (mode === MODIFY_MODE.EDIT_MODE) {
                newState = {
                    ...newState,
                    dimensionItem: {...data}    // prevent ref
                }
            }
            this.setState(newState);
        } else {
            this.setState({
                dialogVisible: false
            })
        }
    }

    onChangeInput = (fieldName) => (value) => {
        if (fieldName === 'length' && processNumber.checkExistNotNumber(value)) {
            return;
        }
        if (fieldName === 'width' && processNumber.checkExistNotNumber(value)) {
            return;
        }
        if (fieldName === 'height' && processNumber.checkExistNotNumber(value)) {
            return;
        }

        let newState = {...this.state};
        newState.dimensionItem[fieldName] = value;
        this.setState(newState);
    };

    isFilled = () => {
        if (!this.state.dimensionItem.name) return false;
        if (!this.state.dimensionItem.width) return false;
        if (!this.state.dimensionItem.height) return false;
        if (!this.state.dimensionItem.length) return false;

        return true;
    };

    onDialogDismiss = (isUpdatedDimensionList = false) => {
        this.setState({
            dimensionItem: {
                name: '',
                weight: '',
                width: '',
                length: '',
                height: '',
                comment: ''
            }
        });
        this.props.onCloseDimensionDetail({isUpdatedDimensionList})
    };

    onClickSaveBtn() {
        if (this.state.mode === MODIFY_MODE.ADD_MODE) {
            addDimension(this.state.dimensionItem)
                .then(res => {
                    if (res.status === 'OK') {
                        Notification.success({
                            title: 'Success',
                            message: this.props.intl.formatMessage({id: 'settings.dimensions.addSuccess'})
                        });
                        // close dialog and reload list
                        this.onDialogDismiss(true)
                    } else {
                        Notification.error({
                            title: 'Error',
                            message: res.messageString
                        });
                    }
                })
        } else {
            updateDimension(this.state.dimensionItem.id, this.state.dimensionItem)
                .then(res => {
                    if (res.status === 'OK') {
                        Notification.success({
                            title: 'Success',
                            message: this.props.intl.formatMessage({id: 'settings.dimensions.editSuccess'})
                        });
                        // close dialog and reload list
                        this.onDialogDismiss(true)
                    } else {
                        Notification.error({
                            title: 'Error',
                            message: res.messageString
                        });
                    }
                })
        }
    }

    render() {
        return (
            <div className="text-left shipment-detail-container">
                <Dialog
                    title={this.props.intl.formatMessage({id: 'settings.dimensions.addDimension'})}
                    size="tiny"
                    visible={this.state.dialogVisible}
                    onCancel={() => this.onDialogDismiss()}
                    lockScroll={false}>
                    <Dialog.Body>
                        <div className="row">
                            <div className="col-md-7">
                                <div className="mb-3">
                                    <div className="label">
                                        <FormattedMessage id='settings.dimensions.name'/>
                                        <span className="required">*</span>
                                    </div>
                                    <Input
                                        value={this.state.dimensionItem.name}
                                        onChange={this.onChangeInput('name')}/>
                                </div>
                                <div className="">
                                    <div className="label">
                                        <FormattedMessage id='settings.dimensions.comment'/>
                                    </div>
                                    <Input
                                        type="textarea"
                                        autosize={{ minRows: 5, maxRows: 6}}
                                        value={this.state.dimensionItem.comment}
                                        onChange={this.onChangeInput('comment')}
                                    />
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="mb-3">
                                    <div className="label">
                                        <FormattedMessage id='settings.dimensions.lengthDenote'/>
                                        <span className="required">*</span>
                                    </div>
                                    <Input
                                        value={this.state.dimensionItem.length}
                                        onChange={this.onChangeInput('length')}/>
                                </div>
                                <div className="mb-3">
                                    <div className="label">
                                        <FormattedMessage id='settings.dimensions.widthDenote'/>
                                        <span className="required">*</span>
                                    </div>
                                    <Input
                                        value={this.state.dimensionItem.width}
                                        onChange={this.onChangeInput('width')}/>
                                </div>
                                <div>
                                    <div className="label">
                                        <FormattedMessage id='settings.dimensions.heightDenote'/>
                                        <span className="required">*</span>
                                    </div>
                                    <Input
                                        value={this.state.dimensionItem.height}
                                        onChange={this.onChangeInput('height')}/>
                                </div>
                            </div>
                        </div>

                    </Dialog.Body>
                    <Dialog.Footer className="dialog-footer">
                        <Button onClick={this.onClickSaveBtn.bind(this)}
                                disabled={!this.isFilled()}
                                type="primary">
                            <FormattedMessage id='save'/>
                        </Button>
                        <Button onClick={() => this.onDialogDismiss()}
                                type="primary">
                            <FormattedMessage id='cancel'/>
                        </Button>
                    </Dialog.Footer>
                </Dialog>
            </div>
        )
    }

}

export default injectIntl(DimensionDetails);
