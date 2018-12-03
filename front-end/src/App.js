import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css'; 
import ClientList from './Components/ClientsList.js';
import InvoicesList from './Components/InvoicesList.js';
import ItemsList from './Components/ItemsList';
import AddNewClient from './Components/AddNewClient';

class App extends Component {
  constructor() {
    super();
    this.state = {
      invoicesToShow: null,
      itemsToShow: null,
      clientsToShow: null
    }
  }
  
  onClient = (e) => {
    this.setState({itemsToShow:null});
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

  updateClientList = () => {
    fetch('http://localhost:5000/all_clients')
    .then(response=> response.json())
    .then(data => this.setState({clientsToShow:data}));
  }

  removeClient = (e) => {
    console.log(e.currentTarget.id);
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

  render() {
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>
        </div>
        <div className="flex-container">
            <div className="col-4">
              <h2 className="heading">Clients</h2>
              <ClientList clientsToShow={this.state.clientsToShow} 
              onClient={this.onClient}
              rmFunc={this.removeClient}
              />
              <AddNewClient updateclients={this.updateClientList}/>
            </div>
            <div className="col-4">
              <h2 className="heading">Invoices</h2>
              <InvoicesList invoicesToShow={this.state.invoicesToShow} onInvoice={this.onInvoice}/>
            </div>
            <div className="col-4">
              <h2 className="heading">Items</h2>
              <ItemsList itemsToShow={this.state.itemsToShow}/>
            </div>
         
        </div>
      </div>

    );
  }
}

export default App;
