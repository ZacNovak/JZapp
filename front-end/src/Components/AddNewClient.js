import React, { Component } from 'react';
import './ClientComp.css';


class AddNewClient extends Component {
    constructor(){
        super()
        this.state = {
            name: " ",
            id: null
        }
    }


    render() {
        return (
            <div className='addClient'>
            <h2>New Client Form</h2>
            </div>
        );
    }

    }

// -------------------------------------------------------------- //



export default AddNewClient;