import React, { Component } from 'react';
import './ClientComp.css';


class AddNewInvoice extends Component {
    constructor(props){
        super(props);
        this.state = {
            date: " ",
            location:" "
        };
        this.updateInvoiceList = this.props.updateInvoiceList;
    }

    handleDateChange = (event) => {
         this.setState({date: event.target.value});

     }

     handleLocationChange = (event) => {
        this.setState({location: event.target.value});

    }
    
    handleSubmit = (event) => {
        console.log('An invoice was submitted with a date of: ' + this.state.date + ', location of : '+ this.state.location);
        event.preventDefault();

        let data = {
            date:this.state.date,
            location:this.state.location,
            clientId: this.props.clientId
        }

        console.log(data);

        
 
        fetch('http://localhost:5000/newInvoice', {
                method: 'post',
                headers: {'Content-type':'application/json'},
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(this.updateInvoiceList)
        
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit} className="newInvoiceForm" >
            <h3>Add new Invoice: </h3>
            <label className = "addInvoice">
                Date: 
                <input type="date" value={this.state.date} onChange={this.handleDateChange}/>
                <br/>
                
                Location:
                <select name="location" form="location">
                    <option value="North">North</option>
                    <option value="East">East</option>
                    <option value="South">South</option>
                    <option value="West">West</option>
                </select>
            </label>
            <br/>
            <input classname = "submitButton" type="submit" value="Submit" />
            </form>
        );
    }

}

export default AddNewInvoice;

// -------------------------------------------------------------- //