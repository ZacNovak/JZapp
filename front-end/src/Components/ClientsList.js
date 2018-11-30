import React, { Component } from 'react';
import Client from './ClientComp';
import './ClientComp.css';


class ClientComp extends Component {
    constructor(){
        super()
        this.state = {
            clients: null
        }
    }

    componentDidMount() {
        fetch('http://localhost:5000/all_clients')
        .then(response=> response.json())
        .then(data => this.setState({clients:data}))
    }

    render() {
        if(this.state.clients){
            const clientComponent =this.state.clients.map((user,i) => {
                return <Client id={this.state.clients[i].idnum} 
                name={this.state.clients[i].name} 
                onClient={this.props.onClient}
                />

            }) 
            
            return (
           
                <div className="ClientComponent">
                    {clientComponent}
                    <div className='addClient'>
                        <h2>Add New Client</h2>
                    </div>
                </div>
                
            );
            } else {
                return(
                <div>
                    <h1>Loading</h1>
                </div>
                );
            }
            
      }
}

export default ClientComp;