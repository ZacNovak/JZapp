import React, { Component } from 'react';

class InvoicesList extends Component {

    render() {
        console.log(this.props.invoicesToShow)
        if (this.props.invoicesToShow) {
            return (
                <ListOfInvoices onInvoice={this.props.onInvoice}
                invoiceList={this.props.invoicesToShow}/>
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
            </div>
        </div>

    );
}

export default InvoicesList;