import React, { Component } from 'react';

class ClientComp extends Component {
    constructor(){
        super()
        this.state = {
            clients: ['empty', 'not empty']
        }
    }

    getClientList = () => {
        fetch('http://localhost:5000/all_clients')
        .then(response=> response.json())
        .then(data => console.log(data))
    }

    render() {
        return (
          <div className="ClientComponent">
            <button onClick={this.getClientList}>Get Client List</button>
          </div>
        );
      }
}

export default ClientComp;