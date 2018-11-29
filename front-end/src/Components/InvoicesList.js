import React, { Component } from 'react';
import Invoices from './InvoicesComp';


class InvoicesList extends Component {
    constructor(){
        super()
        this.state = {
            client: null,
            invoices: null
        }
    }



    onClientClick = () => {
        console.log('on client click is working')
        if(this.state.client !== this.props.clientId){
            this.setState({client:this.props.clientId})
            fetch('http://localhost:5000/clients', {
                method: 'post',
                headers: {'Content-type':'application/json'},
                body: JSON.stringify({
                    id: this.props.clientId,
                })
            })
            .then(response => response.json())
            .then(data => this.setState({invoices:data}))
        }
    }

    render() {
            this.onClientClick();
            if(this.state.invoices){    
                const invoiceComponent =this.state.invoices.map((user,i) => {
                    return <Invoices id={this.state.invoices[i].id} date={this.state.invoices[i].date} location={this.state.invoices[i].location} />
                })            
                return (
                    <div className="ClientComponent">
                     {invoiceComponent}
                    <div className='addClient'>
                    <h2>Add New Invoice</h2>
                    </div>
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