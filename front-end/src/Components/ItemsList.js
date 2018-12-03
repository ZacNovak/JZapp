import React, { Component } from 'react';

class ItemsList extends Component {

    render() {
        console.log(this.props.itemsToShow);
        if (this.props.itemsToShow) {
            return (
                <ListOfItems itemsList={this.props.itemsToShow}/>
            );
        } else {
            return(
                <div>
                    <h3>Please select an invoice </h3>
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
            <div className='invoiceCard' id={props.id}>
                <h2>{props.name}</h2> 
                <h2>Quantity: {props.quantity}</h2>
                <h2>Price: {props.price}</h2>
            </div>
        </div>

    );
}



export default ItemsList;