import React from 'react';
import './ClientComp.css';


const Invoice = ({id, date, location}) =>{
    return(
        <div>
            <div className='clientCard' onClick={this.props.onInvoice}>
                <h2>Invoice ID: {id}</h2>
                <h2>Date: {date}</h2>
                <h2>Location: {location}</h2>
            </div>
        </div>

    )
}

export default Invoice;

