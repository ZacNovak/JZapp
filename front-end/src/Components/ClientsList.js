import React, { Component } from 'react';
import './ClientComp.css';


class ClientComp extends Component {
    render() {
        if (this.props.clientsToShow) {
            return (
                <ListOfClients onClient={this.props.onClient} 
                clientList = {this.props.clientsToShow}/>
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
        let clientsInList = clientArr.map((client,i) =>
            <SingleClient key={clientArr[i].idnum} 
            id={clientArr[i].idnum} 
            name={clientArr[i].name}
            onClient={props.onClient}
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
    return(
        <div>
            <div className='clientCard' id={props.id} onClick={props.onClient}>
                <h2>{props.name}</h2>
            </div>
        </div>

    );
}


export default ClientComp;