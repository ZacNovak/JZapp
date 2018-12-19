import React, { Component } from 'react';
import './ClientComp.css';
import image from './img/man.png';



class ClientSummary extends Component {
    constructor(props){
        super(props);
        this.state = {
        };
       
    }
    
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