import React, { Component } from 'react';
import './componentStyles.css';
import image from './img/basket.png';




class ItemsSummary extends Component {
    
    render(){

        let quantity = 0;
        this.props.itemsList.forEach((item) => {
            quantity += item.quantity;
        });

        let price = null;
        this.props.itemsList.forEach((item) => {
            // console.log(item.price)
            // console.log(item.price.substring(1))
            price += (item.price.substring(1) * item.quantity);
        });

        let message = "not working"
        if(this.props.itemsList.length === 0){
            message = `This invoice has no items`
        } else {
            message = `${this.props.clientName} purchased ${quantity} items for $${price}`
        } 


        // console.log(this.props.itemsList)

        return (
            <div className="clientSummary">
                <img className="shopper" src={image} alt="Shopper"/>
                <h2 className="clientSummaryText"> {message} </h2>
            </div>
        );
    }

}

// -------------------------------------------------------------- //



export default ItemsSummary;