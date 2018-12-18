import React, { Component } from 'react';
import './ClientComp.css';
import UpdateClient from './UpdateClient.js';



class ClientComp extends Component {
    constructor(props){
        super(props);
        this.updateclients = this.props.updateclients;
    }
    
    render() {
        if (this.props.clientsToShow) {
            return (
                <ListOfClients onClient={this.props.onClient} 
                clientList = {this.props.clientsToShow}
                rmFunc={this.props.rmFunc}
                updateclients={this.props.updateclients}
                clientId={this.props.clientId}
                />
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

function ListOfClients(props) {
    
    if (props.clientList) {
        let clientArr = props.clientList;
        clientArr.sort(function(a, b) { 
            return a.idnum - b.idnum;
          });
        let clientsInList = clientArr.map((client,i) =>
            <SingleClient key={clientArr[i].idnum} 
            id={clientArr[i].idnum} 
            name={clientArr[i].name}
            onClient={props.onClient}
            rmFunc={props.rmFunc}
            updateclients={props.updateclients}
            clientId={props.clientId}
            />
        );
        return (
            <ul>{clientsInList}</ul>
        );
    } else {
        return <p> No clients to show </p>
    }
}

function SingleClient(props) {
    
    let classType = "";
    let id = props.id;
    let clientId = props.clientId;

    if(parseInt(id) === parseInt(clientId)){    
        classType = "clientCardSelected"
     } else {
        classType = "clientCard"
    }

    return(
        
        <div>
            <div >
                <div className={classType} id={props.id} onClick={props.onClient}>
                    <h2>{props.name}</h2>
                    <button id={props.id} onClick={props.rmFunc}>X</button>
                    <UpdateClient id={props.id} updateClients={props.updateclients}/>
                </div>
            </div>
        </div>

    );
}


export default ClientComp;