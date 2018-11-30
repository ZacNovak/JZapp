import React from 'react';
import './ClientComp.css';


const Invoices = ({id, date, location, onInvoice}) =>{
    return(
        <div>
            <div className='clientCard' id={id} onClick={onInvoice}>
                <h2>Invoice ID: {id}</h2>
                <h2>Date: {date}</h2>
                <h2>Location: {location}</h2>
            </div>
        </div>

    )
}

export default Invoices;

