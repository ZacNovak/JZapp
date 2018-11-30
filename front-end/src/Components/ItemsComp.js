import React from 'react';
import './ClientComp.css';


const Items = ({id, name, quantity}) =>{
    return(
        <div>
            <div className='clientCard'>
                <h2>Item ID: {id}</h2>
                <h2>Name: {name}</h2>
                <h2>Quantity: {quantity}</h2>
            </div>
        </div>

    )
}

export default Items;

