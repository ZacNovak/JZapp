import React, { Component } from 'react';
import AddNewInvoice from './AddNewInvoice.js';
import InvoiceSummary from './InvoiceSummary.js';



class InvoicesList extends Component {
    constructor(props){
        super(props);
        this.state = { 
        };
    }

    render() {
        if (this.props.invoicesToShow) {
            return (
                <div>
                    <ListOfInvoices onInvoice={this.props.onInvoice}
                    invoiceList={this.props.invoicesToShow}
                    rmInvoice={this.props.rmInvoice}
                    invoiceId={this.props.invoiceId}
                    updateInvoiceList={this.props.updateInvoiceList}
                    clientId={this.props.clientId}
                    />
                    <AddNewInvoice clientId={this.props.clientId} 
                    updateInvoiceList={this.props.updateInvoiceList} />
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
        console.log(e.target.id);
        this.setState({updateId: e.target.id});
        document.getElementById("overlay-invoices").style.display = "block";
    }



    render(){
    if (this.props.invoiceList) {
        let invoiceArr = this.props.invoiceList;
        console.log(invoiceArr)
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
            on={this.on}
            updateId={this.state.updateId}
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
    constructor(props){
        super(props);
        this.state = {
            date: " ",
            location: " "
        };
        this.updateInvoiceList = this.props.updateInvoiceList;
    }
    
      
    off = (e) => {
        document.getElementById("overlay-invoices").style.display = "none";

    }

    handleDateChange = (event) => {
        this.setState({date: event.target.value});
    }

    handleLocationChange = (event) => {
        this.setState({location: event.target.value});
    }
    
    handleSubmit = (event) => {
        console.log('An invoice was submitted with date of: ' + this.state.date + 'with a location of ' + this.state.location + 'with an id of' + this.props.updateId + 'and ClientId of' + this.props.clientId);
        event.preventDefault();

        let data = {
            id: this.props.updateId,
            date:this.state.date,
            location: this.state.location,
            client_id: this.props.clientId
        }
 
        fetch('http://localhost:5000/updateInvoice', {
                method: 'put',
                headers: {'Content-type':'application/json'},
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(this.updateInvoiceList)
            .then(this.off)
    }

    

    render(){
    
    let date = this.props.date;
    date = date.substring(0,16);
    
    let classType = "";
    let id = this.props.id;
    let invoiceId = this.props.invoiceId;

    if(parseInt(id) === parseInt(invoiceId)){    
        classType = "invoiceCardSelected"
     } else {
        classType = "invoiceCard"
    }

        
    return(
        <div>
            <div className={classType} id={this.props.id} onClick={this.props.onInvoice}>
                <h2 className="invoicesText">Date: {date}</h2><br/>
                <h2 className="invoicesText">Location: {this.props.location}</h2>
                <button id={this.props.id} onClick={this.props.rmInvoice}>X</button>
                <button id={this.props.id} onClick={this.props.on}>Edit</button>  
            </div>
            <div id ="overlay-invoices">
                <div className="modal-invoices">
                    <h1>Update Invoice</h1>
                    
                    <div className="form">
                        <form id={this.props.id} onSubmit={this.handleSubmit}>
                            <label>
                                Date:
                                <input type="date" value={this.state.date} onChange={this.handleDateChange}/>
                                </label>
                                <br/>
                            <label>
                                Location:
                                <input type="text" value={this.state.location} onChange={this.handleLocationChange}/>
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

export default InvoicesList;