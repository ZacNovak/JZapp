import React, { Component } from 'react';
import './componentStyles.css';

class ClientOverlay extends Component{
    constructor(props){
        super(props);
        this.state = {
            newname: this.props.clientName,
        };
    }

    handleChange = (event) => {
        this.setState({newname: event.target.value});
    }
    
    handleSubmit = (event) => {
        console.log('A name was submitted: ' + this.state.newname +' with an id of ' + this.props.clientId);
        event.preventDefault();

        let data = {
            id: this.props.clientId,
            name:this.state.newname
        }
 
        fetch('http://localhost:5000/updateClient', {
                method: 'put',
                headers: {'Content-type':'application/json'},
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(this.props.updateClients)
            .then(this.props.closeClientEditor)
            .then(this.setState({newname: ""}))
    
        }


    render() {
        return(
            <div id ="clientOverlay">
                <div className="modal clientModal">
                    <h1>Update Client</h1>
                    
                    <div className="form">
                        <form id={this.props.clientId} onSubmit={this.handleSubmit}>
                            <label>
                                Name:
                                <input type="text" value={this.state.clientName} onChange={this.handleChange}/>
                                </label>
                            <input className="button" type="submit" value="Submit" />
                        </form>
                        <button onClick={this.props.closeClientEditor}>Exit</button>
                    </div>
                </div>
        </div>
    

        );
    }

}

export default ClientOverlay;