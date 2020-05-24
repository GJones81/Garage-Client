import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'



//This is the form to add a new item to the list 
const EditItem = props => {
    let [name, setName] = useState(props.list.item.name)
    let [price, setPrice] = useState(props.list.item.price)
    let [image, setImage] = useState(props.list.item.image)
    let [condition, setCondition] = useState(props.list.item.condition)
    let [ imageUrl, setImageUrl ] = useState('')
    let [itemId, setItemId] = useState(props.item._id)

    //Reactstrap states
    let [modal, setModal] = useState(false)
    let [nestedModal, setNestedModal] = useState(false)
    let [closeAll, setCloseAll] = useState(false)

    //Reactstrap functions
    let toggle = () => setModal(!modal)
    let toggleNested = () => {
        setNestedModal(!nestedModal)
        setCloseAll(false)
    }

    let toggleAll = () => {
        setNestedModal(!nestedModal)
        setCloseAll(true)
    }    

    //POST list/item Adds a new item to an existing list
    const handleSubmit = e => {
        let token = localStorage.getItem('boilerToken')
        e.preventDefault()
        fetch(props.url + 'list/item/' + itemId, {
            method: 'PUT',
            body: JSON.stringify({
                listId: props.list._id,
                name,
                price,
                image,
                condition
            }),
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            })
            .then(response => {
                console.log('item was created')
                //recall the API to populate with new info that was given(typed)
                props.refresh()
                setName('')
                setPrice('')
                setImage('')
                setCondition('')
                setImageUrl('')
            })
    }


    

    let checkUploadResult = (resultEvent) => {
        
        if (resultEvent.event === 'success') {
            setImageUrl(resultEvent.info.secure_url)
            setImage(resultEvent.info.secure_url)
        }  
    }
    
    let widget = window.cloudinary.createUploadWidget({
        cloudName: "swaggyi",
        uploadPreset: "Garage" } ,
        (error, result) => { 
            checkUploadResult(result)
        })

        const showWidget = (widget) => {
            widget.open()
        
        }

    return (
        <div>
            <Button color='danger' onClick={toggle}>Edit this item</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Edit an Item</ModalHeader>
                <ModalBody>
                    <div className="itemForm">
                        <button onClick={() => showWidget(widget)}>Upload</button>
                        <form onSubmit={handleSubmit}>
                            <p>Edit: {props.item.name}</p>
                            <label>Image:</label>
                                <input type="hidden" name="image" value={imageUrl} />
                                <img src={imageUrl} name='image' /> 
                            <label>Name:</label>
                                <input type="text" name="name" onChange={e => setName(e.target.value)}/>
                            <label>Condition:</label>
                                <input type="number" name="condition" onChange={e => setCondition(e.target.value)}/>
                            <label>Price:</label>
                                <input type="number" name="price" onChange={e => setPrice(e.target.value)}/>
                            <input type="submit" />
                        </form>  
                    </div>
                    <br />
                    <Button color='success' onClick={toggleNested}>Show Nested Modal</Button>
                    <Modal isOpen={nestedModal} toggle={toggleNested} onClosed={closeAll ? toggle : undefined}>
                        <ModalHeader>Nested Modal title</ModalHeader>
                        <ModalBody>Stuff and things</ModalBody>
                        <ModalFooter>
                            <Button color='primary' onClick={toggleNested}>Done</Button>{''}
                            <Button color='secondary' onClick={toggleAll}>All Done</Button>
                        </ModalFooter>
                    </Modal>
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' onClick={toggle}>Do something</Button>{''}
                    <Button color='secondary' onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default EditItem