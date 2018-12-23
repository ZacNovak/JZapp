import React, { Component } from 'react';
import './componentStyles.css';
import AddNewClient from './AddNewClient';
import ClientSummary from './ClientSummary';

class ClientComp extends Component {
    render() {
        
        if (this.props.clientsToShow) {
            return (
                <div>
                    <ListOfClients onClient={this.props.onClient} 
                    clientList = {this.props.clientsToShow}
                    rmFunc={this.props.rmFunc}
                    updateclients={this.props.updateclients}
                    clientId={this.props.clientId}
                    />
                    <AddNewClient updateClientsAdd={this.props.updateClientsAdd}/>
                    <ClientSummary clientList = {this.props.clientsToShow}/>
                </div>
            );
        } else {
            return (
                <div>
                <h1>Loading</h1>
                </div>
            );
        }
    }
}

// -------------------------------------------------------------- //

class ListOfClients extends Component {
    
    render(){
    if (this.props.clientList) {
        let clientArr = this.props.clientList;
        clientArr.sort(function(a, b) { 
            return a.idnum - b.idnum;
          });
        let clientsInList = clientArr.map((client,i) =>
            <SingleClient key={clientArr[i].idnum} 
            id={clientArr[i].idnum} 
            name={clientArr[i].name}
            onClient={this.props.onClient}
            rmFunc={this.props.rmFunc}
            updateclients={this.props.updateclients}
            clientId={this.props.clientId}
            />,            
        );
        return (
            <ul>{clientsInList}</ul>
        );
    } else {
        return <p> No clients to show </p>
    }
    }
}

class SingleClient extends Component {
    render(){
    let classType = "";
    let id = this.props.id;
    let clientId = this.props.clientId;

    if(parseInt(id) === parseInt(clientId)){    
        classType = "card clientCard cardSelected"
     } else {
        classType = "card clientCard"
    }

    return(
        <div className={classType} id={this.props.id} value={this.props.name} onClick={this.props.onClient}>
            <div>
                <h2 className = "clientName">{this.props.name}</h2>
            </div>
            <div className="cardButtons">
                <button id={this.props.id} onClick={this.props.rmFunc}>X</button>
                <button id={this.props.id} onClick={this.props.updateclients}>Edit</button>
            </div>
        </div>

    );
}
}


export default ClientComp;