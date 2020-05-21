import React from 'react';
import { Route } from 'react-router-dom'

import NewItem from './New/NewItem'
import NewList from './New/NewList'

const Posting = props => {

    let list = props.item.currentList[0].item.map((l, i) => {
        return (
            <div key={i}>
                <p>Item</p>
                <p>{l.name}</p>
                <p>Price</p>
                <p>${l.price}</p>
                <p>Condition</p>
                <p>{l.condition}</p>
                <img src={l.image}></img>
            </div>
        )
    })
    
    return (
        //As a suggestion maybe we should have two different forms and use routers??
        <div>
             <div className="addForms">
                <h3>Create A New List</h3>
                <NewList />
            </div>
            <div className="addForms">
                <h3>Add New Items To Your List</h3>
                <NewItem />
            </div>
            <div>
                {list}
            </div>
        </div>
    )
}

export default Posting
