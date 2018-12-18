import React, { Component } from 'react';
import AddNewInvoice from './AddNewInvoice.js';


class InvoicesList extends Component {

    render() {
        if (this.props.invoicesToShow) {
            return (
                <div>
                    <ListOfInvoices onInvoice={this.props.onInvoice}
                    invoiceList={this.props.invoicesToShow}
                    rmInvoice={this.props.rmInvoice}
                    invoiceId={this.props.invoiceId}
                    />
                    <AddNewInvoice clientId={this.props.clientId} 
                    updateInvoiceList={this.props.updateInvoiceList} />
                </div>
            );
        } else {
            return(
                <div>
                    <h3 className="await">Please select a client</h3>
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
            invoiceId={props.invoiceId}
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
    let date = props.date;
    date = date.substring(0,16);
    
    let classType = "";
    let id = props.id;
    let invoiceId = props.invoiceId;

    if(parseInt(id) === parseInt(invoiceId)){    
        classType = "invoiceCardSelected"
     } else {
        classType = "invoiceCard"
    }

        
    return(
        <div>
            <div className={classType} id={props.id} onClick={props.onInvoice}>
                <h2>Date: {date}</h2><br/>
                <h2>Location: {props.location}</h2>
                <button id={props.id} onClick={props.rmInvoice}>x</button>
            </div>
        </div>

    );
}

export default InvoicesList;