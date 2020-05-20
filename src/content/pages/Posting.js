import React from 'react';
import { Route } from 'react-router-dom'

import NewItem from './New/NewItem'
import NewList from './New/NewList'

const Posting = props => {

    
    
    return (
        //As a suggestion maybe we should have two different forms and use routers??
        <div>
            <div className="addForms">
                <Route exact path='/newItem' component={NewItem} /> 
            </div>
            <div>
                <Route exact path='/newListing' component={NewList} />
                
            </div>
        </div>
    )
}

export default Posting
