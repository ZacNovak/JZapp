import React from 'react';
import './ClientComp.css';


const Client = ({id, name, onClient}) =>{
    return(
        <div>
            <div className='clientCard' id={id} onClick={onClient}>
                <h2>Client ID: {id}</h2>
                <h2>Client Name: {name}</h2>
            </div>
        </div>

    )
}

export default Client;

