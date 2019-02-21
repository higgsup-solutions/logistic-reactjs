import React, {Component} from "react";
import {FormattedMessage, injectIntl} from "react-intl";
import {Form, Input, Button} from "element-react";

class SearchBooking extends Component {

    constructor(props) {
        super(props);

        this.state = {
            form: {
                connoteNumber: '',
                senderCity: '',
                receiverCity: '',
                senderName: '',
                receiveName: ''
            }
        };
    }

    onSubmit(e) {
        e.preventDefault();
    }

    onChange(key, value) {
        this.state.form[key] = value;
        this.forceUpdate();
    }

    onSearch() {
        this.props.onSearchClick(this.state.form);
    };

    render() {
        return (
            <div className="search-booking text-left">
                <Form model={this.state.form}
                      inline={true}
                      onSubmit={this.onSubmit.bind(this)}>

                    <Form.Item
                        label={`${this.props.intl.formatMessage({id: 'history.connoteNumber'})}:`}>
                        <Input value={this.state.form.connoteNumber}
                               placeholder={`${this.props.intl.formatMessage({id: 'history.connoteNumber'})}`}
                               onChange={this.onChange.bind(this, 'connoteNumber')}/>
                    </Form.Item>
                    <Form.Item label={`${this.props.intl.formatMessage({id: 'history.senderCity'})}:`}>
                        <Input value={this.state.form.senderCity}
                               placeholder={`${this.props.intl.formatMessage({id: 'history.senderCity'})}`}
                               onChange={this.onChange.bind(this, 'senderCity')}/>
                    </Form.Item>
                    <Form.Item label={`${this.props.intl.formatMessage({id: 'history.receiverCity'})}:`}>
                        <Input value={this.state.form.receiverCity}
                               placeholder={`${this.props.intl.formatMessage({id: 'history.receiverCity'})}`}
                               onChange={this.onChange.bind(this, 'receiverCity')}/>
                    </Form.Item>
                    <Form.Item label={`${this.props.intl.formatMessage({id: 'history.senderName'})}:`}>
                        <Input value={this.state.form.senderName}
                               placeholder={`${this.props.intl.formatMessage({id: 'history.senderName'})}`}
                               onChange={this.onChange.bind(this, 'senderName')}/>
                    </Form.Item>
                    <Form.Item label={`${this.props.intl.formatMessage({id: 'history.receiveName'})}:`}>
                        <Input value={this.state.form.receiveName}
                               placeholder={`${this.props.intl.formatMessage({id: 'history.receiveName'})}`}
                               onChange={this.onChange.bind(this, 'receiveName')}/>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" onClick={this.onSearch.bind(this)}>
                            <FormattedMessage id='search'/>
                        </Button>
                        <Button>
                            <FormattedMessage id='clear'/>
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }

}

export default injectIntl(SearchBooking);
