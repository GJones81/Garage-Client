import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const EditList = props => {
    let [listTitle, setListTitle] = useState('')
    let [listId, setListId] = useState(props.lists._id)

    //Reactstrap states
    const [modal, setModal] = useState(false);
    const [nestedModal, setNestedModal] = useState(false);
    const [closeAll, setCloseAll] = useState(false);

    //Reactstrap functions
    const toggle = () => setModal(!modal);

    const toggleNested = () => {
        setNestedModal(!nestedModal);
        setCloseAll(false);
    }

    const toggleAll = () => {
        setNestedModal(!nestedModal);
        setCloseAll(true);
    }

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
            <Button color="primary" onClick={toggle}>Edit this List</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Edit the Title of this List</ModalHeader>
                <ModalBody>
                    <div className='listForm'>
                        <h5>Edit List Title</h5>
                            <form onSubmit={handleSubmit}>
                                <label>New Title:</label>
                                    <input type='text' name='listTitle' onChange={e => setListTitle(e.target.value)} />
                                    <input type='submit' />
                            </form>
                    </div>
                    <br />
                    <Button color="success" onClick={toggleNested}>Show Nested Modal</Button>
                    <Modal isOpen={nestedModal} toggle={toggleNested} onClosed={closeAll ? toggle : undefined}>
                        <ModalHeader>Nested Modal title</ModalHeader>
                        <ModalBody>Stuff and things</ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={toggleNested}>Done</Button>{' '}
                            <Button color="secondary" onClick={toggleAll}>All Done</Button>
                        </ModalFooter>
                    </Modal>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={toggle}>Submit</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default EditList

{/* <Form onSubmit={handleSubmit}>
<FormGroup>
    <div>
        <Label><strong>List(current)</strong>: {props.list.listTitle}</Label>
    </div>
        <Label>Name:</Label>
            <Input type="text" name="name" onChange={e => setName(e.target.value)}/>
    <ModalFooter>
        <Button color='primary' type="submit" onClick={toggle}>Add the Item</Button>{''}
        <Button color='secondary' onClick={toggle}>Cancel</Button>
    </ModalFooter>
</FormGroup>
</Form> */}