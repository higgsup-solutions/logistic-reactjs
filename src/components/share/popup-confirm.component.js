import React, {Component} from 'react';
import './share.scss';

class PopupConfirmComponent extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="modal fade" id="popupConfirm" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title">{this.props.title}</h3>
                            <button className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {this.props.content}
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-flat" data-dismiss="modal" aria-label="Close">Close</button>
                            <button className="btn btn-danger" data-dismiss="modal" aria-label="Close" onClick={this.props.confirm}>{this.props.confirmName}</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default PopupConfirmComponent;