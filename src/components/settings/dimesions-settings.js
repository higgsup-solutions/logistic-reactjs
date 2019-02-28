import React, {Component} from 'react';
import {FormattedMessage, injectIntl} from "react-intl";
import {Button, Card, Notification, Table} from "element-react";
import {
    getDimensionList,
    deleteDimensionList
} from "../../integrate/settings";
import DimensionDetails from "./dimension-details";
import {MODIFY_MODE} from "../../App.constant";

class DimensionsSettings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            columns: [
                {
                    label: "Name",
                    prop: "name",
                },
                {
                    label: "L",
                    prop: "length",
                },
                {
                    label: "W",
                    prop: "width",
                },
                {
                    label: "H",
                    prop: "height",
                },
                {
                    label: "Comment",
                    prop: "comment"
                }
            ],
            data: [],
            selectedItem: {},
            isClickItem: false,
            mode: MODIFY_MODE.ADD_MODE
        }
    }

    componentWillMount() {
        this.fetchDimensionList();
    }

    fetchDimensionList() {
        getDimensionList().then(res => {
            this.setState({
                data: res.data || []
            })
        })
    }

    onAddDimension() {
        this.setState({
            isClickItem: true,
            mode: MODIFY_MODE.ADD_MODE
        })
    }

    onEditDimension() {
        this.setState({
            isClickItem: true,
            mode: MODIFY_MODE.EDIT_MODE
        })
    }

    onCloseDimensionDetails({isUpdatedDimensionList}) {
        // Update List
        if (isUpdatedDimensionList) {
            this.fetchDimensionList()
        }

        // Close Dialog
        this.setState({
            isClickItem: false
        });
    }

    onDeleteDimension() {
        console.log('Delete Dimension');
        console.log(this.state.selectedItem);
        if (this.state.selectedItem.id) {
            deleteDimensionList(this.state.selectedItem.id)
                .then(res => {
                    if (res.status === 'OK') {
                        Notification.success({
                            title: 'Success',
                            message: this.props.intl.formatMessage({id: 'settings.dimensions.deleteSuccess'})
                        });
                        return Promise.resolve(true)
                    } else {
                        Notification.error({
                            title: 'Error',
                            message: res.messageString
                        });
                        return Promise.resolve(false)
                    }
                })
                .then(isDeleted => {
                    if (isDeleted) {
                        this.fetchDimensionList();
                    }
                })
        }
    }

    render() {
        return (
            <div>
                <div className="dimensions-settings">
                    <div className="row">
                        <div className="col-md-12">
                            <Card className="mycard confirm-card"
                                  header={
                                      <div className="clearfix"
                                           style={{paddingLeft: '1em'}}>
                                          <FormattedMessage id='settings.tab.dimensions'/>
                                      </div>
                                  }>
                                <Table
                                    emptyText={this.props.intl.formatMessage({id: 'emptyData'})}
                                    style={{width: '100%'}}
                                    columns={this.state.columns}
                                    data={this.state.data}
                                    border={true}
                                    highlightCurrentRow={true}
                                    onCurrentChange={item => this.setState({selectedItem: item})}
                                />
                                <div className="text-right mt-3">
                                    <Button
                                        type="primary"
                                        onClick={this.onAddDimension.bind(this)}>
                                        <FormattedMessage id='add'/>
                                    </Button>
                                    <Button
                                        disabled={!this.state.selectedItem.id}
                                        type="primary"
                                        onClick={this.onEditDimension.bind(this)}>
                                        <FormattedMessage id='edit'/>
                                    </Button>
                                    <Button
                                        disabled={!this.state.selectedItem.id}
                                        type="primary"
                                        onClick={this.onDeleteDimension.bind(this)}>
                                        <FormattedMessage id='delete'/>
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/*Dialog for Add and Edit Dimensions*/}
                    <DimensionDetails
                        data={this.state.selectedItem}
                        isClickItem={this.state.isClickItem}
                        mode={this.state.mode}
                        onCloseDimensionDetail={this.onCloseDimensionDetails.bind(this)}
                    />
                </div>
            </div>
        )
    }

}

export default injectIntl(DimensionsSettings);
