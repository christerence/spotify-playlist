import React from 'react';
import './card.scss'

const Card = (props) => (
    <div className="card-container" style={{ backgroundColor: props.color }}>
        {props.children}
    </div>
)


export { Card }