import React from 'react';
import { Route } from 'react-router-dom'

import newItem from './New/newItem'
import newList from './New/newList'

const Posting = props => {

    
    
    return (
        //As a suggestion maybe we should have two different forms and use routers??
        <div>
            <div className="addForms">
                <h3>New Items</h3>
                <Route exact path='/newItem' component={newItem} /> 
            </div>
            <div>
                <h3>New List</h3>
                <Route exact path='/newListing' component={newList} />
                
            </div>
        </div>
    )
}

export default Posting
