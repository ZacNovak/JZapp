import React, { Component } from 'react';
import './ClientComp.css';
import AddNewClient from './AddNewClient';
import ClientSummary from './ClientSummary';





class ClientComp extends Component {
    constructor(props){
        super(props);
        
        this.updateclients = this.props.updateclients;
    }


    
    render() {
        
        if (this.props.clientsToShow) {
            return (
                <div>
                    <ListOfClients onClient={this.props.onClient} 
                    clientList = {this.props.clientsToShow}
                    rmFunc={this.props.rmFunc}
                    updateclients={this.props.updateclients}
                    clientId={this.props.clientId}
                    on={this.props.on}
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
        document.getElementById("overlay").style.display = "block";
    }
    
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
            on={this.on}
            updateId={this.state.updateId}
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
    constructor(props){
        super(props);
        this.state = {
            name: " "
        };
        this.updateClients = this.props.updateclients;
        this.id = this.props.id;
        this.updateId=this.props.updateId;
    }
    
      
    off = (e) => {
        document.getElementById("overlay").style.display = "none";

    }

    handleChange = (event) => {
        this.setState({name: event.target.value});
    }
    
    handleSubmit = (event) => {
        console.log('A name was submitted: ' + this.state.name +'with an id of ' + this.props.updateId);
        event.preventDefault();

        let data = {
            id: this.props.updateId,
            name:this.state.name
        }
 
        fetch('http://localhost:5000/updateClient', {
                method: 'put',
                headers: {'Content-type':'application/json'},
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(this.updateClients)
            .then(this.off)
            .then(this.setState({name: ""}))
    }

    

    render(){
    let classType = "";
    let id = this.props.id;
    let clientId = this.props.clientId;

    if(parseInt(id) === parseInt(clientId)){    
        classType = "clientCardSelected"
     } else {
        classType = "clientCard"
    }




    return(
        
        <div>
            <div>

                <div className={classType} id={this.props.id} value={this.props.name} onClick={this.props.onClient}>
                    <div>
                        <h2 className = "clientName">{this.props.name}</h2>
                    </div>
                    <div className="clientButtons">
                        <button className="clientCard-button" id={this.props.id} onClick={this.props.rmFunc}>X</button>
                        <button className="clientCard-button"id={this.props.id} onClick={this.props.on}>Edit</button>
                    </div>
                   
                </div>
                <div id ="overlay">
                    <div className="modal">
                        <h1>Update Client</h1>
                        
                        <div className="form">
                            <form id={this.props.id} onSubmit={this.handleSubmit}>
                                <label>
                                    Name:
                                    <input type="text" value={this.state.name} onChange={this.handleChange}/>
                                    </label>
                                <input className="button" type="submit" value="Submit" />
                            </form>
                            <button onClick={this.off}>Exit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
}


export default ClientComp;