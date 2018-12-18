import React, { Component } from 'react';
import './ClientComp.css';
import UpdateClient from './UpdateClient.js';
import AddNewClient from './AddNewClient';




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
                    openForm={this.openForm}
                    closeForm={this.closeForm}
                    />
                    <AddNewClient updateclients={this.props.updateclients}/>
                    
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

function ListOfClients(props) {
    
    if (props.clientList) {
        let clientArr = props.clientList;
        let clientCount = clientArr.length
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
            openForm={props.openForm}
            closeForm={props.closeForm}
            />,            
        );
        return (
            <ul>{clientsInList}</ul>
        );
    } else {
        return <p> No clients to show </p>
    }
}

class SingleClient extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: " ",
        };
        this.updateClients = this.props.updateclients;
        this.id = this.props.id;
    }
    
    on = (event) => {
        document.getElementById("overlay").style.display = "block";
        event.preventDefault();
        

    }
      
    off = (event) => {
        document.getElementById("overlay").style.display = "none";
    }

    handleChange = (event) => {
        this.setState({name: event.target.value});
    }
    
    handleSubmit = (event) => {
        console.log('A name was submitted: ' + this.state.name +'with an id of ' + this.id);
        event.preventDefault();

        let data = {
            id: this.id,
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
                <div className={classType} id={this.props.id} onClick={this.props.onClient}>
                    <h2 className = "clientName">{this.props.name}</h2>
                    <button id={this.props.id} onClick={this.props.rmFunc}>X</button>
                    <button onClick={this.on}>Edit</button>
                    <div id="overlay" >
                        <div id="modal">
                            <h1>Update Client</h1>
                            <br/>
                            <br/>
                            <div className="form">
                                <form onSubmit={this.handleSubmit}>
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
        </div>

    );
}
}


export default ClientComp;