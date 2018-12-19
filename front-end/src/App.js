import React, { Component } from 'react';
import './App.css'; 
import ClientList from './Components/ClientsList.js';
import InvoicesList from './Components/InvoicesList.js';
import ItemsList from './Components/ItemsList';

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
      clientLength: null
    }
  }
  
  onClient = (e) => {
    this.setState({itemsToShow:null});
    this.setState({clientId: e.currentTarget.id});
    this.setState({clientName: e.target.getElementsByClassName('clientName')[0].textContent})
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

  componentDidMount() {
    fetch('http://localhost:5000/all_clients')
    .then(response=> response.json())
    .then(data => this.setState({clientsToShow:data}));
  }

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



  updateClientList = () => {
    // this.setState({invoicesToShow:null});
    // this.setState({clientId: null});

    fetch('http://localhost:5000/all_clients')
    .then(response=> response.json())
    .then(data => this.setState({clientsToShow:data}))
    
  }

  updateClientListAdd = () => {
    this.setState({invoicesToShow:null});
    this.setState({clientId: null});
    this.setState({itemsToShow: null})

    fetch('http://localhost:5000/all_clients')
    .then(response=> response.json())
    .then(data => this.setState({clientsToShow:data}))
  }


  removeClient = (e) => {
    this.setState({invoicesToShow:null});
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

  render() {
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <h1> Welcome to JZ Store of Goodies</h1>
            {/* <img src={logo} className="App-logo" alt="logo" /> */}
          </header>
        </div>
        <div className="background">
            <div className="flex-container">
                <div className="col-4">
                  <h2 className="heading">Clients</h2>
                  <ClientList clientsToShow={this.state.clientsToShow} 
                  onClient={this.onClient}
                  rmFunc={this.removeClient}
                  updateclients={this.updateClientList}
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
