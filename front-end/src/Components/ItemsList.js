import React, { Component } from 'react';
import AddNewItem from './AddNewItem';
import ItemsSummary from './ItemsSummary.js';
import './ClientComp.css';



class ItemsList extends Component {

    render() {
        if (this.props.itemsToShow) {
            return (
                <div>
                    <ListOfItems 
                    itemsList={this.props.itemsToShow}
                    removeItem={this.props.removeItem}
                    invoiceId={this.props.invoiceId}
                    updateItemList={this.props.updateItemList}

                    />
                    <AddNewItem 
                    updateItemList={this.props.updateItemList}
                    invoiceId={this.props.invoiceId}
                    />
                    <ItemsSummary 
                    itemsList={this.props.itemsToShow}
                    clientName={this.props.clientName}
                    />
                </div>
            );
        } else if (this.props.clientId) {
            return(
                <div>
                    <h3 className="await">Please select an invoice </h3>
                </div>
            );
        } else {
            return(
                <div></div>
            );
        } 
        
    }
}

// -------------------------------------------------------------- //

class ListOfItems extends Component{
    constructor(props){
        super(props);
        this.state = { 
            updateId: ""
        };
    }
    
    on = (e) => {
        if (!e) var e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        // console.log(e.target.id);
        this.setState({updateId: e.target.id});
        document.getElementById("overlay-items").style.display = "block";
    }

    
    render(){
    if (this.props.itemsList) {
        let itemsArr = this.props.itemsList;
        itemsArr.sort(function(a, b) { 
            return a.id - b.id;
          });
        // console.log(itemsArr);

        let itemsInList = itemsArr.map((item,i) =>
            <SingleItem key={itemsArr[i].id}
            id={itemsArr[i].id}
            quantity={itemsArr[i].quantity}
            name={itemsArr[i].name}
            price={itemsArr[i].price}
            removeItem={this.props.removeItem}
            on={this.on}
            updateId={this.state.updateId}
            invoiceId={this.props.invoiceId}
            updateItemList={this.props.updateItemList}


            />
        );
        return (
            <ul>{itemsInList}</ul>
        );
    } else {
        return <p> No items to show </p>
    }
    }
}

class SingleItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: " ",
            price: " ",
            quanity: " "
        };
        this.updateItemList = this.props.updateItemList;
    }

    off = (e) => {
        document.getElementById("overlay-items").style.display = "none";

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
            .then(this.updateItemList)
            .then(this.off)
            .then(this.setState({name: ""}))
            .then(this.setState({price: ""}))
            .then(this.setState({quantity: ""}))

    }

    render(){
    return(
        <div>
            <div className='itemCard' id={this.props.id}>
                <h2 className="invoicesText">{this.props.name}</h2> <br></br>
                <h2 className="invoicesText">Quantity: {this.props.quantity}, Price: {this.props.price}</h2> 
                <button id={this.props.id} onClick={this.props.removeItem}>x</button>
                <button id={this.props.id} onClick={this.props.on}>Edit</button>  
            </div>
            <div id ="overlay-items">
                <div className="modal-items">
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
                        <button onClick={this.off}>Exit</button>
                    </div>
                </div>
            </div>
        </div>
        );    
    }
}



export default ItemsList;