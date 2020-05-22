import React from 'react';
import { Route } from 'react-router-dom'

import NewItem from './New/NewItem'
import NewList from './New/NewList'


//NOTE: Should discuss with Guy, maybe a suggestion, but do we want to render the edit form 
// on the same page rather than rendering a totally different page??

//fetch calls edit/delete should go here 
const Posting = props => {


    // is the button in the right place?? fix tomorrow
    const handleDelete = (itemId, listId) => {
        let token = localStorage.getItem('boilerToken')
        console.log(itemId, listId)
        fetch(props.url + 'list/item/' + itemId, {  // <-- im wondering if that is the proper endpoint?
            method: 'DELETE',
            body: JSON.stringify({listId}),
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(() => {
            console.log('delete was successful')
            //refresh the API by calling it?? yes??
        })
    }

    let list = props.lists.map((l, i) => {
        let itemz = l.item.map((x, y) => {
            return (
            <div key={y}>
                <p>Item</p>
                <p>{x.name}</p>
                <p>Price</p>
                <p>${x.price}</p>
                <p>Condition</p>
                <p>{x.condition}</p>
                <img src={x.image}></img>
                <button onClick={() => handleDelete(x._id, l._id)}>Delete</button>
            </div> 
            )
        })
        return(
            <div key={i}>
                <h2>{l.listTitle}</h2>
                {itemz}
            </div>
        )
    })

    
    return (
        //As a suggestion maybe we should have two different forms and use routers??
        <div>
             <div className="addForms">
                <h3>Create A New List</h3>
                <NewList url = { props.url} />
            </div>
            <div className="addForms">
                <h3>Add New Items To Your List</h3>
                <NewItem  url = { props.url} token = {props.updateToken}/>
            </div>
            <div>
                
                {list}
                
            </div>
        </div>
    )
}

export default Posting


