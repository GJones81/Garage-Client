import React from 'react';
import styled from 'styled-components'
import { Button, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap'

//import MapboxGLMap from './MapboxGLMap'



const Discovery = props => {

  let discovery = props.discoveries.publicSales.map((d, i) =>{

    let items = d.list.item.map((x, y) => {
        return (
        <div key={y}>
          <Card>
            <CardBody>
              <CardTitle><p>Item:</p></CardTitle>
                <CardSubtitle><p>{x.name}</p></CardSubtitle>
            </CardBody>
              <CardImg src={x.image}></CardImg>
            <CardBody>
              <CardText>
                <p>Price</p>
                <p>${x.price}</p>
                <p>Condition</p>
                <p>{x.condition}</p>
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
          {items}
        </div>
    )
})

      

    // let Layout = () => {
    //   return (
    //     <>
    //         <h1>Look for Sales</h1>
    //       <main>
    //         <MapboxGLMap />
    //       </main>
    //     </>
    //   );
    // };


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