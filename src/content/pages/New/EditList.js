import React, { useState } from 'react'

const EditList = props => {
    let [listTitle, setListTitle] = useState('')
    let [listId, setListId] = useState(props.lists._id)

        const handleSubmit = e => {
            let token = localStorage.getItem('boilerToken')
            e.preventDefault()
            fetch(props.url + 'list/' + listId, {
            method: 'PUT',
            body: JSON.stringify({
                _id: listId,
                listTitle
            }),
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(Response => {
            console.log('list title changed')
            props.refresh()
            setListTitle('')
            setListId('')
        })
        .catch(err => {
            console.log('Error', err)
        })
    }

    return (
        <div>
            <div className='listForm'>
                <h5>Edit List Title</h5>
                    <form onSubmit={handleSubmit}>
                        <label>New Title:</label>
                            <input type='text' name='listTitle' onChange={e => setListTitle(e.target.value)} />
                            <input type='submit' />

                    </form>

            </div>
        </div>


    )
}

export default EditList