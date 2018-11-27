import React, { Component } from 'react';

class ClientComp extends Component {
    constructor(){
        super()
        this.state = {
            clients: null
        }
    }

    getClientList = () => {
        fetch('http://localhost:5000/all_clients')
        .then(response=> response.json())
        .then(data => this.setState({clients:data}))
    }

    render() {
        return (
          <div className="ClientComponent">
            <button onClick={this.getClientList}>Get Client List</button>
            <ClientListComp clientList={this.state.clients}/>
          </div>
        );
      }
}

class ClientListComp extends Component {

    // showClients = () => {
    //     let clientArr = this.props.clientList;
    //     let clientHtmlStr = "";
    //     // loop through array in props
    //     for (let i=0; i<clientArr.length; i++){}
    //     // generate a clickable link for every name in client array
    //     // set innerhtml of returning div
    // }
    
    createClient = (client) => {
        return <button>{client}</button>
    }

    showClients = () => {
        let clientArr = this.props.clientList;
        let clientHtmlStr = "";
        // loop through client arr
        for (let i=0; i<clientArr.length; i++){
            //clientHtmlStr += this.createClient(clientArr[i].name);
            clientHtmlStr += clientArr[i].name + '<br>';
        }
        document.getElementById('SingleThing').setInnerHTML = clientHtmlStr;

    }

    render() {
        if (this.props.clientList) {
            return (
                <div id='SingleThing'>{this.showClients()}</div>
            );
        } else {
            return (
                <div id='SingleThing'>
                  <p>Empty client list</p>
                </div>
              );
        }
        
      }
}

export default ClientComp;