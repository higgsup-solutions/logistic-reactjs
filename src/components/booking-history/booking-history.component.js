import React, { Component } from "react";
import './booking-history.scss';
import image1 from './../../assets/image1.jpg';

class BookingHistory extends Component {
    render() {
        return (
            <h1>
                <img src={image1} width="200" height="200" alt="image1" />
            </h1>
        );
    }
}

export default BookingHistory;
