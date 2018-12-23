import React, { Component } from 'react';
import './componentStyles.css';

class ItemOverlay extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: " ",
            price: " ",
            gst: " ",
            quanity: " "
        };
    }

    handleNameChange = (event) => {
        this.setState({name: event.target.value});
    }

    handlePriceChange = (event) => {
        this.setState({price: event.target.value});
        let newgst = this.state.price*0.05;
        this.setState({gst:newgst});
    }

    handleQuantityChange = (event) => {
        this.setState({quantity: event.target.value});
    }

    handleSubmit = (event) => {
        console.log('An item was submitted names: ' + this.state.name + 'with a price of ' + this.state.price + 
        'with an invoiceid of' + this.props.invoiceId + 'ItemID of' + this.props.updateId);
        
        event.preventDefault();

        let data = {
            id: this.props.updateId,
            name:this.state.name,
            price:this.state.price,
            gst: this.state.gst,
            quantity: this.state.quantity,
            invoice_id: this.props.invoiceId
        }
 
        fetch('http://localhost:5000/updateItem', {
                method: 'put',
                headers: {'Content-type':'application/json'},
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(this.props.updateItems)
            .then(this.props.closeItemEditor)
            .then(this.setState({name: ""}))
            .then(this.setState({price: ""}))
            .then(this.setState({quantity: ""}))

    }

    render() {
        return(
            <div id ="itemOverlay">
                <div className="modal itemModal">
                    <h1>Update Items</h1>
                    
                    <div className="form">
                        <form id={this.props.id} onSubmit={this.handleSubmit}>
                            <label>
                                Name:
                                <input type="text" value={this.state.name} onChange={this.handleNameChange}/>
                                </label>
                                <br/>
                            <label>
                                Price:
                                <input type="text" value={this.state.price} onChange={this.handlePriceChange}/>
                                </label>
                                <br/>
                            <label>
                                Quantity:
                                <input type="text" value={this.state.quantity} onChange={this.handleQuantityChange}/>
                                </label>
                                <br/>
                            <input className="button" type="submit" value="Submit" />
                        </form>
                        <button onClick={this.props.closeItemEditor}>Exit</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ItemOverlay;