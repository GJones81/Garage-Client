import React from 'react';
import { Route } from 'react-router-dom'

import NewItem from './New/NewItem'
import NewList from './New/NewList'

const Posting = props => {

    
    
    return (
        //As a suggestion maybe we should have two different forms and use routers??
        <div>
             <div>
                <h3>Create A New List</h3>
                <NewList />
            </div>
            <div className="addForms">
                <h3>Add New Items To Your List</h3>
                <NewItem />
            </div>
        </div>
    )
}

export default Posting
