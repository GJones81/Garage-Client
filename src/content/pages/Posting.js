import React from 'react';
import { Route } from 'react-router-dom'

import NewItem from './New/NewItem'
import EditItem from './New/EditItem'
import NewLists from './New/NewLists'
import EditList from './New/EditList'


//NOTE: Should discuss with Guy, maybe a suggestion, but do we want to render the edit form 
// on the same page rather than rendering a totally different page??

//fetch calls edit/delete should go here 
const Posting = props => {
    // is the button in the right place?? fix tomorrow
    const handleItemDelete = (itemId, listId) => {
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
            console.log('Item was deleted successful')
            //refresh the API by calling it?? yes??
            props.refresh()
        })
        .catch(err => {
            console.log('Error', err)
        })
    }

    const handleListDelete = (listId) => {
        let token = localStorage.getItem('boilerToken')
        fetch(props.url + 'list/' + listId, {
            method: 'DELETE',
            body: JSON.stringify({listId}),
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(() =>{
            console.log('List was deleted successfully')
            props.refresh()
        })
        .catch(err => {
            console.log('Error', err)
        })
    }


    let list = props.lists.map((l, i) => {
        let itemz = l.item.map((x, y) => {
            return (
            <div key={y}>
                <img src={x.image}></img>
                <p>Item</p>
                <p>{x.name}</p>
                <p>Price</p>
                <p>${x.price}</p>
                <p>Condition</p>
                <p>{x.condition}</p>
                
                <p>Edit an Item</p>
                <EditItem url = { props.url} token={props.updateToken} list={l} item={x} refresh={props.refresh}
                />
                <button onClick={() => handleItemDelete(x._id, l._id)}>Delete Item</button>
            </div> 
            )
        })
        return(
            <div key={i}>
                <h2>{l.listTitle}</h2>
                <EditList url={ props.url } token={props.updateToken} refresh={props.refresh} lists={l}/>
                <button onClick={() => handleListDelete(l._id)}>Delete List</button>
                <p>Add a New Item to a List</p>
                <NewItem  url = { props.url} token={props.updateToken} list={l} refresh={props.refresh} />
                {itemz}
            </div>
        )
    })

    
    return (
        //As a suggestion maybe we should have two different forms and use routers??
        <div>
              <div className="addForms">
                <h3>Create A New List</h3>
                <NewLists url = { props.url} token={props.updateToken} refresh={props.refresh} />
            </div>
            <div>
                {list}
            </div>
        </div>
    )
}

export default Posting


