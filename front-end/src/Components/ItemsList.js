import React, { Component } from 'react';
import AddNewItem from './AddNewItem';
import ItemsSummary from './ItemsSummary.js';
import './componentStyles.css';



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
                    updateItemList={this.props.updateItemListAdd}
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
    render(){
        return(
            <div>
                <div className='card invoiceCard' id={this.props.id}>
                    <p className="invoicesText">
                    <strong>{this.props.name}</strong> <br></br>
                    Quantity: {this.props.quantity} <br></br>
                    Price: {this.props.price}</p> 
                    <div className="cardButtons">
                        <button id={this.props.id} onClick={this.props.removeItem}>x</button>
                        <button id={this.props.id} onClick={this.props.updateItemList}>Edit</button>  
                    </div>
                </div>
            </div>
        );    
    }
}



export default ItemsList;