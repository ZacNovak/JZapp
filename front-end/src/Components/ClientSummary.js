import React, { Component } from 'react';
import './componentStyles.css';
import image from './img/man.png';



class ClientSummary extends Component {
    render() {
        return (
            <div className="clientSummary">
                <img className="shopper" src={image} alt="Shopper"/>
                <h2 className="clientSummaryText">There are {this.props.clientList.length} shoppers at JZ store</h2>
            </div>
        );
    }

}

// -------------------------------------------------------------- //



export default ClientSummary;