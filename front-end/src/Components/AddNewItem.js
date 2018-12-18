import React, { Component } from 'react';
import './ClientComp.css';

// Move this class from App to ItemsList component
class AddNewItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: null,
            price: null,
            gst: null,
            quantity: null
        };
        this.updateItemList = this.props.updateItemList;
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
        event.preventDefault();

        let data = {
            name:this.state.name,
            price:this.state.price,
            gst: this.state.gst,
            quantity: this.state.quantity,
            invoice_id: this.props.invoiceId
        }
 
        fetch('http://localhost:5000/newItem', {
                method: 'post',
                headers: {'Content-type':'application/json'},
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(this.updateItemsList)
        
        console.log(data);
        
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit} className="newClientForm" >
            <h3>Add new Item:</h3>
            <label>
                Item:
                <input type="text" value={this.state.name} onChange={this.handleNameChange}/>
                Price:
                <input type="float" value={this.state.price} onChange={this.handlePriceChange}/>
                Quantity:
                <input type="int" value={this.state.quantity} onChange={this.handleQuantityChange}/>
            </label>
            <input type="submit" value="Submit" />
            </form>
        );
    }

}

export default AddNewItem;

// -------------------------------------------------------------- //