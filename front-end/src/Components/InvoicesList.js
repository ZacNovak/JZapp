import React, { Component } from 'react';
import './componentStyles.css';
import AddNewInvoice from './AddNewInvoice.js';
import InvoiceSummary from './InvoiceSummary.js';



class InvoicesList extends Component {

    render() {
        if (this.props.invoicesToShow) {
            return (
                <div>
                    <ListOfInvoices 
                    onInvoice={this.props.onInvoice}
                    invoiceList={this.props.invoicesToShow}
                    rmInvoice={this.props.rmInvoice}
                    invoiceId={this.props.invoiceId}
                    updateInvoiceList={this.props.updateInvoiceList}
                    clientId={this.props.clientId}
                    />
                    <AddNewInvoice clientId={this.props.clientId} 
                    updateInvoiceListAdd={this.props.updateInvoiceListAdd} 
                    />
                    <InvoiceSummary invoiceList = {this.props.invoicesToShow}
                    clientName={this.props.clientName}
                    />
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

class ListOfInvoices extends Component{

    render(){
    if (this.props.invoiceList) {
        let invoiceArr = this.props.invoiceList;
        invoiceArr.sort(function(a, b) { 
            let adate = new Date(a.date);
            let bdate = new Date(b.date);
            return adate - bdate;
          });
        let invoicesInList = invoiceArr.map((invoice,i) =>
            <SingleInvoice key={invoiceArr[i].id}
            id={invoiceArr[i].id}
            date={invoiceArr[i].date}
            location={invoiceArr[i].location}
            updateInvoiceList={this.props.updateInvoiceList}
            onInvoice={this.props.onInvoice}
            rmInvoice={this.props.rmInvoice}
            invoiceId={this.props.invoiceId}
            clientId={this.props.clientId}
            />
        );
        return (
            <ul>{invoicesInList}</ul>
        );
    } else {
        return <p> No invoices to show </p>
    }
}
}

// -------------------------------------------------------------- //

class SingleInvoice extends Component {

    render(){
    
    let date = this.props.date;
    date = date.substring(0,16);
    
    let classType = "";
    let id = this.props.id;
    let invoiceId = this.props.invoiceId;

    if(parseInt(id) === parseInt(invoiceId)){    
        classType = "card invoiceCard cardSelected"
     } else {
        classType = "card invoiceCard"
    }

        
    return(
        <div>
            <div className={classType} id={this.props.id} onClick={this.props.onInvoice}>
                <p className="invoicesText">
                    Date: {date} <br/> 
                    Location: {this.props.location} 
                </p>
                <div className="cardButtons">
                    <button id={this.props.id} onClick={this.props.rmInvoice}>X</button>
                    <button id={this.props.id} onClick={this.props.updateInvoiceList}>Edit</button>  
                </div>
            </div>
        </div>

    );
    }
}

export default InvoicesList;