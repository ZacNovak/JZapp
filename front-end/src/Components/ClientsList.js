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
                return <Client id={this.state.clients[i].idnum} name={this.state.clients[i].name} onClient={this.props.onClient}/>

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

//class ClientListComp extends Component {

    // showClients = () => {
    //     let clientArr = this.props.clientList;
    //     let clientHtmlStr = "";
    //     // loop through array in props
    //     for (let i=0; i<clientArr.length; i++){}
    //     // generate a clickable link for every name in client array
//     //     // set innerhtml of returning div
//     // }
    
//     createClient = (client) => {
//         return <button>{client}</button>
//     }

//     showClients = () => {
//         let clientArr = this.props.clientList;
//         let clientHtmlStr = "";
//         // loop through client arr
//         for (let i=0; i<clientArr.length; i++){
//             //clientHtmlStr += this.createClient(clientArr[i].name);
//             clientHtmlStr += clientArr[i].name + '<br>';
//         }
//         document.getElementById('SingleThing').setInnerHTML = clientHtmlStr;

//     }

//     render() {
//         if (this.props.clientList) {
//             return (
//                 <div id='SingleThing'>{this.showClients()}</div>
//             );
//         } else {
//             return (
//                 <div id='SingleThing'>
//                   <p>Empty client list</p>
//                 </div>
//               );
//         }
        
//       }
// }

export default ClientComp;