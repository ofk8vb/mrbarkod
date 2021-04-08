import React from 'react';
import {Card} from '../card/card.component.jsx'
import './cardlist.styles.css'

export const CardList = props =>(

    <div className='card-list'>
    {props.products.map(product=>(
         <Card key={product.Renk} product={product} />
         ))}
    </div>

)