import React, { Component } from 'react';
import './componentStyles.css';

class InvoiceOverlay extends Component{
    constructor(props){
        super(props);
        this.state = {
            date: " ",
            location: " "
        };
    }
    
    handleDateChange = (event) => {
        this.setState({date: event.target.value});
    }

    handleLocationChange = (event) => {
        this.setState({location: event.target.value});
    }
    
    handleSubmit = (event) => {
        console.log('An invoice was submitted with date of: ' + this.state.date + 'with a location of ' + this.state.location + 'with an id of' + this.props.invoiceId + 'and ClientId of' + this.props.clientId);
        event.preventDefault();

        let data = {
            id: this.props.invoiceId,
            date:this.state.date,
            location: this.state.location,
            client_id: this.props.clientId
        }
 
        fetch('http://localhost:5000/updateInvoice', {
                method: 'put',
                headers: {'Content-type':'application/json'},
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(this.props.updateInvoiceList)
            .then(this.props.closeInvoiceEditor)
            .then(this.setState({date:" ", location:" "}))
    }

    render() {
        return(
            <div id ="invoiceOverlay">
            <div className="modal invoiceModal">
                <h1>Update Invoice</h1>
                
                <div className="form">
                    <form id={this.props.id} onSubmit={this.handleSubmit}>
                        <label>
                            Date:
                            <input type="date" value={this.state.date} onChange={this.handleDateChange}/>
                            </label>
                            <br/>
                        <label>
                            Location:
                            <input type="text" value={this.state.location} onChange={this.handleLocationChange}/>
                            </label>
                            <br/>
                        <input className="button" type="submit" value="Submit" />
                    </form>
                    <button onClick={this.props.closeInvoiceEditor}>Exit</button>
                </div>
            </div>
            </div>
        )
    }
}

export default InvoiceOverlay;