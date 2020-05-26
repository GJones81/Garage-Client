import React from 'react';
import styled from 'styled-components'
import { Button, Card, CardGroup, CardImg, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap'

//import MapboxGLMap from './MapboxGLMap'



const Discovery = props => {

  let discovery = props.discoveries.publicSales.map((d, i) =>{

    let items = d.list.item.map((x, y) => {
        return (
        <div key={y}>
          <Card body inverse style={{ backgroundColor: '#778899', borderColor: '#000' }}>
            <CardBody>
              <CardTitle><p>Item: {x.name}</p></CardTitle>
            </CardBody>
              <CardImg src={x.image} style={{height: 180, width: 318}}></CardImg>
            <CardBody>
              <CardText>
                <p>Price: ${x.price}</p>
                <p>Condition: {x.condition}</p>
              </CardText>
            </CardBody>
          </Card>

        </div> 
        )
    })
    return(
          <div key={i}>
          <p>Address: {d.address}</p>
          <p>Date: {d.date}</p>
          <CardGroup> {items} </CardGroup>
        </div>
    )
})

    return (
      <div>
        <div>
          {/* <Layout /> */}
        </div>
        <div>
        { discovery }
        </div>
      </div>
    )
}

export default Discovery