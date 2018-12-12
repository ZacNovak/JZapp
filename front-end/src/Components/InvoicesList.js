import React, { Component } from 'react';
import AddNewInvoice from './AddNewInvoice.js';


class InvoicesList extends Component {

    render() {
        if (this.props.invoicesToShow) {
            return (
                <div>
                    <ListOfInvoices onInvoice={this.props.onInvoice}
                    invoiceList={this.props.invoicesToShow}
                    rmInvoice={this.props.rmInvoice}/>
                    <AddNewInvoice clientId={this.props.clientId} 
                    updateInvoiceList={this.props.updateInvoiceList} />
                </div>
            );
        } else {
            return(
                <div>
                    <h3>Please select a client</h3>
                </div>
            );
        }
   
      }
    }

// -------------------------------------------------------------- //

function ListOfInvoices(props) {
    if (props.invoiceList) {
        let invoiceArr = props.invoiceList;
        let invoicesInList = invoiceArr.map((invoice,i) =>
            <SingleInvoice key={invoiceArr[i].id}
            id={invoiceArr[i].id}
            date={invoiceArr[i].date}
            location={invoiceArr[i].location}
            onInvoice={props.onInvoice}
            rmInvoice={props.rmInvoice}
            />
        );
        return (
            <ul>{invoicesInList}</ul>
        );
    } else {
        return <p> No invoices to show </p>
    }
}

function SingleInvoice(props) {
    return(
        <div>
            <div className='invoiceCard' id={props.id} onClick={props.onInvoice}>
                <h2>{props.date}</h2> 
                <h2>Location: {props.location}</h2>
                <button id={props.id} onClick={props.rmInvoice}>x</button>
            </div>
        </div>

    );
}

export default InvoicesList;