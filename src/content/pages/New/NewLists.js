import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

//This is a form to create a new, empty list 
const NewLists = props => {
    let [listTitle, setListTitle] = useState('')

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

    // POST /list

    const handleSubmit = e => {
        let token = localStorage.getItem('boilerToken')
        e.preventDefault()
        fetch(props.url + '/list', {
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
                <Button color="info" onClick={toggle}>Create A New List</Button>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}><h3>Create a New List</h3></ModalHeader>
                    <ModalBody>
                        <div className="listForm">
                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Label>List Title:</Label>
                                        <Input type="text" name='listTitle' onChange={e => setListTitle(e.target.value)} />
                                        <Button color='primary' type='submit'>Create an empty list</Button>
                                </FormGroup>
                            </Form>
                        </div>
                        <br />
                    <Button color="success" onClick={toggleNested}>Show Nested Modal?</Button>
                    <Modal isOpen={nestedModal} toggle={toggleNested} onClosed={closeAll ? toggle : undefined}>
                        <ModalHeader>Nested Modal Title</ModalHeader>
                        <ModalBody>Stuff and Things?</ModalBody>
                        <ModalFooter>
                            <Button color='primary' onClick={toggleNested}>Done</Button>{''}
                            <Button color='secondary' onClick={toggleAll}>All Done</Button>
                        </ModalFooter>
                    </Modal>
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' onClick={toggle}>Do Something</Button>{''}
                    <Button color='secondary' onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
            </div>
    )
}

export default NewLists