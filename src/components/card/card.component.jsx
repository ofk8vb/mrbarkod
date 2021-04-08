import React from 'react';
import './card.styles.css'

export const Card =  props =>(

    <div className='card-container'>
        <h2><span>Stok kodu:</span> <span className='stok-no' >{props.product['StokTanim']}</span></h2>
        <ul>
            <li><span>Renk:</span>{props.product["Renk"]}</li>
            <li><span>Beden:</span>{props.product["Beden"]}</li>
            <li><span>Miktar:</span> {props.product["Miktar"]}</li>
            <li><span>Fiyat:</span> {props.product["Fiyat"]}</li>
        </ul>
    </div>

)