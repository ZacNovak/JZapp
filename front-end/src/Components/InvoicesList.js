import React, { Component } from 'react';

class InvoicesList extends Component {
    constructor(){
        super()
        this.state = {
            client: null,
            invoices: null
        }
    }

    onClientClick = () => {
        fetch('http://localhost:3000/client',{
            method: 'post',
            headers: {'Content type:':'application/json'},
            body: JSON.stringify({
                clientId: this.props.clientId
            })
        })
    }

    render() {
        if(this.props.clientId){
            this.onClientClick();
            // this.setState({
            //       client: this.props.clientId,
            //     });            
             return (
                <div>
                    <h1>{this.props.clientId}</h1>
                </div>
                
            );
            } else {
                return(
                <div>
                    <h3>Please select a client</h3>
                </div>
                );
            }
            
      }
}

export default InvoicesList;