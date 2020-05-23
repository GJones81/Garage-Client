import React, { useState } from 'react';

//This is a form to create a new, empty list 
const NewLists = props => {
    let [listTitle, setListTitle] = useState('')

    // POST /list

    const handleSubmit = e => {
        let token = localStorage.getItem('boilerToken')
        e.preventDefault()
        fetch(props.url + 'list', {
            method: 'POST',
            body: JSON.stringify({
                listTitle
            }),
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log('Empty list was created')
            props.refresh()
            setListTitle('')
        })
        .catch(err => {
            console.log('Error', err)
        }) 
    }

    return (
        <div>
            <div className="listForm">
                <h5>Create a New List</h5>
                    <form onSubmit={handleSubmit}>
                        <label>List Title:</label>
                            <input type="text" name='listTitle' onChange={e => setListTitle(e.target.value)} />
                            <input type='submit' />
                    </form>
            </div>
        </div>
    )
}

export default NewLists