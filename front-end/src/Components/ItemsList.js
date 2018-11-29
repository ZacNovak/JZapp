import React, { Component } from 'react';
import Items from './ItemsComp';


class ItemsList extends Component {
    constructor(){
        super()
        this.state = {
            invoice: null,
            items: null
        }
    }



    onInvoiceClick = () => {
        console.log('on client click is working')
        if(this.state.invoice !== this.props.invoiceID){
            this.setState({client:this.props.invoiceID})
            fetch('http://localhost:5000/invoices', {
                method: 'post',
                headers: {'Content-type':'application/json'},
                body: JSON.stringify({
                    id: this.props.invoiceID,
                })
            })
            .then(response => response.json())
            .then(data => this.setState({items:data}))
        }
    }

    render() {
            this.onInvoiceClick();
            if(this.state.items){    
                const itemComponent =this.state.items.map((user,i) => {
                    return <Items id={this.state.items[i].id} name={this.state.items[i].name} quantity={this.state.items[i].quantity} />
                })            
                return (
                    <div className="ClientComponent">
                     {itemComponent}
                    <div className='addClient'>
                    <h2>Add New Item</h2>
                    </div>
                </div>   
                );
            } else {
                return(
                    <div>
                        <h3>Please select an invoice</h3>
                    </div>
                );
            }
   
      }
    }


export default ItemsList;