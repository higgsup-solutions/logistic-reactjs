import React, {Component} from 'react'
import {FormattedMessage, injectIntl} from "react-intl";
import {Button, Card, Input} from "element-react";

class AddressDefaultSettings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            type: props.type,
            oldDefaultAddress: {},
            findCompany: '',
            findContact: '',
            findAddress: {},
        }
    }

    onChangeInput = (fieldName) => (e) => {
        let newState = {...this.state};
        newState[fieldName] = e;
        this.setState(newState);
    };

    resetFind() {
        this.setState({
            findAddress: this.state.oldDefaultAddress
        })
    }

    saveDefaultAddress() {
        // update default address
        console.log('save ...')
    }

    componentWillMount() {
        // call api
    }

    render() {
        return (
            <Card className="mycard default-address-card mb-4"
                  header={
                      <div className="clearfix"
                           style={{paddingLeft: '1em'}}>
                          <FormattedMessage
                              id='settings.defaultAddress.from'/>
                      </div>
                  }>
                <div className="row mb-4">
                    <div className="col-md-6">
                        <div className="label">
                            <FormattedMessage
                                id='settings.defaultAddress.findCompany'/>:
                        </div>
                        <Input
                            value={this.state.findCompany}
                            onChange={this.onChangeInput('findCompany')}/>
                    </div>
                    <div className="col-md-6">
                        <div className="label">
                            <FormattedMessage
                                id='settings.defaultAddress.findContact'/>:
                        </div>
                        <Input
                            value={this.state.findContact}
                            onChange={this.onChangeInput('findContact')}/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-8">
                        <div>1</div>
                        <div>2</div>
                        <div>3</div>
                        <div>4</div>
                        <div>5</div>
                    </div>
                    <div className="col-md-4 text-right">
                        <Button type="primary"
                                onClick={this.resetFind.bind(this)}>
                            <FormattedMessage id='reset'/>
                        </Button>
                        <Button type="primary"
                                onClick={this.saveDefaultAddress.bind(this)}>
                            <FormattedMessage id='save'/>
                        </Button>
                    </div>
                </div>
            </Card>
        )
    }

}

export default injectIntl(AddressDefaultSettings);
