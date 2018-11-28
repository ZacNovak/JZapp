import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css'; 
import ClientList from './Components/ClientsList.js';
import InvoicesList from './Components/InvoicesList.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      invoicesToShow: null
    }
  }
  
  onClient = (e) => {
    this.setState({
      invoicesToShow: e.currentTarget.id
    })
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
              <ClientList onClient={this.onClient}/>

            </div>
            <div className="col-4">
              <h2 className="heading">Invoices</h2>
              <InvoicesList clientId={this.state.invoicesToShow}/>
            </div>
            <div className="col-4">
              <h2 className="heading">Items</h2>
            </div>
         
        </div>
      </div>

    );
  }
}

export default App;
