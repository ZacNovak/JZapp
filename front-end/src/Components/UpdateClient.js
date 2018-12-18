import React, { Component } from 'react';
import './ClientComp.css';
import Popup from "reactjs-popup";




class UpdateClient extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: " ",
            isOpen: false
        };
        this.updateClients = this.props.updateClients;
        this.id = this.props.id;
        
    }

    handleChange = (event) => {
        this.setState({name: event.target.value});
    }
    
    handleSubmit = (event) => {
        console.log('A name was submitted: ' + this.state.name +'with an id of ' + this.id);
        event.preventDefault();

        let data = {
            id: this.id,
            name:this.state.name
        }
 
        fetch('http://localhost:5000/updateClient', {
                method: 'put',
                headers: {'Content-type':'application/json'},
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(this.updateClients)
            
        
    }
    
    render() {
        return (
            <Popup trigger={<button className="button"> Edit Client </button>}
            position="right center"
            closeOnDocumentClick    
            >
            {close => (
              <div className="modal">
                <a className="close" onClick={close}>
                  &times;
                </a>
                <div className="header"> Update Client </div>
                <div className="content" >
                    <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input type="text" value={this.state.name} onChange={this.handleChange}/>
                        </label>
                    <input className="submit" type="submit" value="Submit" />
                    
                </form>
                </div>
                <div className="actions">

                  <button
                    className="button"
                    onClick={() => {
                      console.log('modal closed ')
                      console.log(close)
                      close()
                    }}
                  >
                    Exit
                  </button>
                </div>
              </div>
            )}
          </Popup>
        
        );
    }

}

// -------------------------------------------------------------- //



export default UpdateClient;