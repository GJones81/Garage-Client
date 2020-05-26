import React, { useState } from 'react'
import { Button, Form, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap'

//This is the form to add a new item to the list 
const NewItem = props => {
    let [name, setName] = useState('')
    let [price, setPrice] = useState('')
    let [image, setImage] = useState('')
    let [condition, setCondition] = useState('')
    let [ imageUrl, setImageUrl ] = useState('')

    // let [listTitle, setListTitle] = useState('')

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
        fetch(props.url + 'list/item', {
            method: 'POST',
            body: JSON.stringify({
                _id: props.list._id,
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
                setImageUrl('')
                setImage('')
                setCondition('')
                
            })
            .catch(err => {
                console.log('Error', err)
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
            <Button color='info' onClick={toggle}>Add an Item to the List</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add an Item</ModalHeader>
                <ModalBody>
                    <div className="itemForm">
                        <Button color='primary' onClick={() => showWidget(widget)}>Upload An Image</Button>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label>New Item for :{props.list.listTitle}</Label>
                                        <Input type="hidden" name="image" value={imageUrl} />
                                        <img src={imageUrl} name='image' /> 
                                    <Label>Name:</Label>
                                        <Input type="text" name="name" onChange={e => setName(e.target.value)}/>
                                    <Label for='condition'>Rate the Condition of the Item</Label>
                                        <Input type="select" name="condition" onChange={e => setCondition(e.target.value)}>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                            <option>6</option>
                                            <option>7</option>
                                            <option>8</option>
                                            <option>9</option>
                                            <option>10</option>
                                        </Input>
                                    <Label>Price:</Label>
                                        <Input type="number" name="price" onChange={e => setPrice(e.target.value)}/>
                                    <Button color='primary' type="submit">Add the item</Button>
                                <ModalFooter>
                                    <Button color='primary' type="submit" onClick={toggle}>Add the Item</Button>{''}
                                    <Button color='secondary' onClick={toggle}>Cancel</Button>
                                </ModalFooter>
                            </FormGroup>
                        </Form>
                    </div>
                        <br />
                        <Button color='success' onClick={toggleNested}>Show Nested Modal</Button>
                        <Modal isOpen={nestedModal} toggle={toggleNested} onClosed={closeAll ? toggle : undefined}>
                        <ModalHeader>Nested Modal Title</ModalHeader>
                        <ModalBody>Stuff and things</ModalBody>
                        <ModalFooter>
                            <Button color='primary' onClick={toggleNested}>Done</Button>{''}
                            <Button color='secondary' onClick={toggleAll}>All Done</Button>
                        </ModalFooter>
                    </Modal>
                </ModalBody>
                
            </Modal>
        </div>
    )
}

export default NewItem
