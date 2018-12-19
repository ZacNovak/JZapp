import React, { Component } from 'react';
import './ClientComp.css';
import image from './img/pay.png';



class InvoiceSummary extends Component {
    constructor(props){
        super(props);
        this.state = {
        };
       
    }


    
    render(){
        let message = "not working"
        if(this.props.invoiceList.length === 0){
            message = `${this.props.clientName} has not shopped with us yet`
        } else if (this.props.invoiceList.length === 1) {
            message = `${this.props.clientName} has visited our store once`
        } else {
            message = `${this.props.clientName} has shopped with us ${this.props.invoiceList.length} times`
        }

        return (
            <div className="clientSummary">
                <img className="shopper" src={image} alt="Shopper"/>
                <h2 className="clientSummaryText"> {message} </h2>
            </div>
        );
    }

}

// -------------------------------------------------------------- //



export default InvoiceSummary;