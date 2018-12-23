import React, { Component } from 'react';
import './App.css'; 
import ClientList from './Components/ClientsList.js';
import InvoicesList from './Components/InvoicesList.js';
import ItemsList from './Components/ItemsList';
import ClientOverlay from './Components/ClientOverlay';

class App extends Component {
  constructor() {
    super();
    this.state = {
      invoicesToShow: null,
      itemsToShow: null,
      clientsToShow: null,
      clientId: null,
      clientName: null,
      invoiceId: null,
      showClientEditor:false,
      showInvoiceEditor:false,
      showItemEditor:false,
    }
  }

  // populate the client list from db when app first renders
  componentDidMount() {
    fetch('http://localhost:5000/all_clients')
    .then(response=> response.json())
    .then(data => this.setState({clientsToShow:data}));
  }
  
  // retrieve a client's list of invoices
  onClient = (e) => {
    this.setState({itemsToShow:null});
    this.setState({clientId: e.currentTarget.id});
    this.setState({clientName: e.currentTarget.getElementsByClassName('clientName')[0].textContent});

    fetch('http://localhost:5000/clients', {
                method: 'post',
                headers: {'Content-type':'application/json'},
                body: JSON.stringify({
                    id: e.currentTarget.id,
                })
            })
            .then(response => response.json())
            .then(data => this.setState({invoicesToShow:data}))
  }

  // retrieve the items in a given invoice
  onInvoice = (e) => {
    console.log(e.currentTarget.id);
    this.setState({invoiceId: e.currentTarget.id})
    fetch('http://localhost:5000/invoices', {
                method: 'post',
                headers: {'Content-type':'application/json'},
                body: JSON.stringify({
                    id: e.currentTarget.id,
                })
            })
            .then(response => response.json())
            .then(data => this.setState({itemsToShow:data}))
  }

  // update the invoice list after an invoice has been modified
  updateInvoiceList = () => {
    fetch('http://localhost:5000/clients', {
                method: 'post',
                headers: {'Content-type':'application/json'},
                body: JSON.stringify({
                    id: this.state.clientId,
                })
            })
            .then(response => response.json())
            .then(data => this.setState({invoicesToShow:data}))
  }

  // update the invoice list after a new invoice has been added
  updateInvoiceListAdd = () => {
    this.setState({itemsToShow:null});
    this.setState({invoiceId: null});
    fetch('http://localhost:5000/clients', {
                method: 'post',
                headers: {'Content-type':'application/json'},
                body: JSON.stringify({
                    id: this.state.clientId,
                })
            })
            .then(response => response.json())
            .then(data => this.setState({invoicesToShow:data}))
  }

  // update the client list after a new client has been added
  updateClientList = () => {
    fetch('http://localhost:5000/all_clients')
    .then(response=> response.json())
    .then(data => this.setState({clientsToShow:data}))
    
    //CREATE NEW FETCH TO GET CLIENT NAME BY ID???
    //this.setState({clientName:nameStr});  
  }

  // update the client list after a new client has been added
  updateClientListAdd = () => {
    this.setState({invoicesToShow:null});
    this.setState({clientId: null});
    this.setState({itemsToShow: null})

    fetch('http://localhost:5000/all_clients')
    .then(response=> response.json())
    .then(data => this.setState({clientsToShow:data}))
  }

  // update the item list after an item has been modified or added
  updateItemList = () => {
    fetch('http://localhost:5000/invoices', {
                method: 'post',
                headers: {'Content-type':'application/json'},
                body: JSON.stringify({
                    id: this.state.invoiceId,
                })
            })
            .then(response => response.json())
            .then(data => this.setState({itemsToShow:data}))
  }

  // remove a client
  removeClient = (e) => {
    this.setState({invoicesToShow:null, itemsToShow:null});
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    
    fetch('http://localhost:5000/rmClient', {
                method: 'post',
                headers: {'Content-type':'application/json'},
                body: JSON.stringify({
                    id: e.currentTarget.id,
                })
            })
            .then(response => response.json())
            .then(data => this.setState({clientsToShow:data}))
  }

  // remove an invoice
  removeInvoice = (e) => {
    this.setState({itemsToShow:null});
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    
    let data = {
      id: e.currentTarget.id,
      clientId: this.state.clientId
    }

    console.log(data)

    fetch('http://localhost:5000/rmInvoice', {
                method: 'post',
                headers: {'Content-type':'application/json'},
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => this.setState({invoicesToShow:data}))
  }

  // remove an item
  removeItem = (e) => {
    console.log(e.currentTarget.id);

    let data = {
      id: e.currentTarget.id,
      invoice_id: this.state.invoiceId
    };

    fetch('http://localhost:5000/rmItem', {
      method: 'post',
      headers: {'Content-type':'application/json'},
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => this.setState({itemsToShow:data}))
  }

  // provide a window to update a client 
  openClientEditor = (e) => {
    console.log(e.currentTarget.id);
    this.setState({showClientEditor:true});
  }

  closeClientEditor = () => {
    this.setState({showClientEditor:false});
  }

  // provide a window to update an invoice 
  openInvoiceEditor = (e) => {
    console.log(e.currentTarget.id);
    this.setState({showInvoiceEditor:true});
  }

  closeInvoiceEditor = () => {
    this.setState({showInvoiceEditor:false});
  }

  // provide a window to update an item 
  openItemEditor = (e) => {
    console.log(e.currentTarget.id);
    this.setState({showItemEditor:true});
  }

  closeItemEditor = () => {
    this.setState({showItemEditor:false});
  }

  render() {
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <h1> Welcome to JZ Store of Goodies</h1>
          </header>
        </div>
        { this.state.showClientEditor && <ClientOverlay 
                  clientId={this.state.clientId} 
                  clientName={this.state.clientName}
                  openClientEditor={this.openClientEditor}
                  closeClientEditor={this.closeClientEditor} 
                  updateClients={this.updateClientList}
                  /> 
        }

        {/* { this.state.showInvoiceEditor && <InvoiceOverlay 
                  clientId={this.state.clientId} 
                  clientName={this.state.clientName}
                  openClientEditor={this.openClientEditor}
                  closeClientEditor={this.closeClientEditor} 
                  updateClients={this.updateClientList}
                  /> 
        }

        { this.state.showItemEditor && <ItemOverlay 
                  clientId={this.state.clientId} 
                  clientName={this.state.clientName}
                  openClientEditor={this.openClientEditor}
                  closeClientEditor={this.closeClientEditor} 
                  updateClients={this.updateClientList}
                  /> 
        } */}
        
        <div className="background">
            <div className="flex-container">
                <div className="col-4">
                  <h2 className="heading">Clients</h2>
                  <ClientList clientsToShow={this.state.clientsToShow} 
                  onClient={this.onClient}
                  rmFunc={this.removeClient}
                  updateclients={this.openClientEditor}
                  updateClientsAdd={this.updateClientListAdd}
                  clientId={this.state.clientId}
                  />
                </div>

                <div className="col-4">
                  <h2 className="heading">Invoices</h2>
                  <InvoicesList 
                  invoicesToShow={this.state.invoicesToShow} 
                  onInvoice={this.onInvoice} 
                  updateInvoiceList={this.updateInvoiceList} 
                  updateInvoiceListAdd={this.updateInvoiceListAdd} 
                  clientId={this.state.clientId}
                  rmInvoice={this.removeInvoice}
                  invoiceId={this.state.invoiceId}
                  clientName={this.state.clientName}
                  />
                </div>

                <div className="col-4">
                  <h2 className="heading">Items</h2>
                  <ItemsList itemsToShow={this.state.itemsToShow}
                    updateItemList={this.updateItemList}
                    invoiceId={this.state.invoiceId}
                    removeItem={this.removeItem}
                    clientId={this.state.clientId}
                    clientName={this.state.clientName}
                   />
                </div>
               
            </div>
        </div>
      </div>

    );
  }
  }

export default App;
