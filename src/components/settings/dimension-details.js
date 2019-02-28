import React, {Component} from "react";
import {FormattedMessage, injectIntl} from "react-intl";
import {Dialog, Button, Layout, Input} from "element-react";
import dateUtil from "../../utils/datetime";

class DimensionDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dialogVisible: true,
            dimensionItem: {
                name: '',
                weight: '',
                width: '',
                length: '',
                height: '',
                comment: ''
            },
            shipmentDetail: {},
            bookingDetailData: [],
            dimensionDTOList: [],
            addressData: [],
            quoteDetailData: []
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {data, isClickItem} = nextProps;
        if (isClickItem && data) {
            this.collectDataFromSelectedItem(data)
        } else {
            this.setState({
                dialogVisible: false
            })
        }
    }

    onChangeInput = (fieldName) => (e) => {
        let newState = {...this.state};
        newState.dimensionItem[fieldName] = e;
        this.setState(newState);
    };

    collectDataFromSelectedItem(data) {
        this.setState({
            dialogVisible: true,
            dimensionItem: data
        })
    }

    onDialogDismiss() {
        this.props.onCloseDimensionDetail()
    }

    render() {
        return (
            <div className="text-left shipment-detail-container">
                <Dialog
                    title={this.props.intl.formatMessage({id: 'settings.dimensions.editDimensions'})}
                    size="tiny"
                    visible={this.state.dialogVisible}
                    onCancel={this.onDialogDismiss.bind(this)}
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
                        <Button onClick={this.onDialogDismiss.bind(this)}
                                type="primary">
                            <FormattedMessage id='close'/>
                        </Button>
                    </Dialog.Footer>
                </Dialog>
            </div>
        )
    }

}

export default injectIntl(DimensionDetails);
