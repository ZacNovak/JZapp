import React, { Component } from 'react';
import AddNewItem from './AddNewItem';

class ItemsList extends Component {

    render() {
        if (this.props.itemsToShow) {
            return (
                <div>
                    <ListOfItems 
                    itemsList={this.props.itemsToShow}
                    removeItem={this.props.removeItem}
                    />
                    <AddNewItem 
                    updateItemList={this.props.updateItemList}
                    invoiceId={this.props.invoiceId}
                    />
                </div>
            );
        } else {
            return(
                <div>
                    <h3 className="await">Please select an invoice </h3>
                </div>
            );
        }
    }
}

// -------------------------------------------------------------- //

function ListOfItems(props) {
    if (props.itemsList) {
        let itemsArr = props.itemsList;
        let itemsInList = itemsArr.map((item,i) =>
            <SingleItem key={itemsArr[i].id}
            id={itemsArr[i].id}
            quantity={itemsArr[i].quantity}
            name={itemsArr[i].name}
            price={itemsArr[i].price}
            removeItem={props.removeItem}
            />
        );
        return (
            <ul>{itemsInList}</ul>
        );
    } else {
        return <p> No items to show </p>
    }
}

function SingleItem(props) {
    return(
        <div>
            <div className='itemCard' id={props.id}>
                <h2>{props.name}</h2> <br></br>
                <h2>Quantity: {props.quantity}, Price: {props.price}</h2> 
                <button id={props.id} onClick={props.removeItem}>x</button>
            </div>
        </div>

    );
}



export default ItemsList;