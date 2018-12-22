import React, { Component } from 'react';
import './ClientComp.css';


class AddNewClient extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: " ",
        };
        this.updateClientsAdd = this.props.updateClientsAdd;
    }

    handleChange = (event) => {
        this.setState({name: event.target.value});
    }
    
    handleSubmit = (event) => {
        console.log('A name was submitted: ' + this.state.name);
        event.preventDefault();

        let data = {
            name:this.state.name
        }
 
        fetch('http://localhost:5000/newClient', {
                method: 'post',
                headers: {'Content-type':'application/json'},
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(this.updateClientsAdd)
            .then(this.setState({name: ""}))
        
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit} className="formStyle clientForm">
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