import React, { Component } from 'react';
import './ClientComp.css';


class AddNewClient extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: " ",
            id: null
        };
        this.updateClients = this.props.updateclients;
    }

    handleChange = (event) => {
        this.setState({name: event.target.value});
        this.setState({id:Math.floor((Math.random() * 100) + 1)});
    }
    
    handleSubmit = (event) => {
        console.log('A name was submitted: ' + this.state.name + ', id: '+ this.state.id);
        event.preventDefault();

        let data = {
            idnum:this.state.id,
            name:this.state.name
        }
 
        fetch('http://localhost:5000/newClient', {
                method: 'post',
                headers: {'Content-type':'application/json'},
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(this.updateClients)
        
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit} className="newClientForm">
            <h3>Add new client:</h3>
            <label>
                Name:
                <input type="text" value={this.state.name} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
            </form>
        );
    }

}

// -------------------------------------------------------------- //



export default AddNewClient;