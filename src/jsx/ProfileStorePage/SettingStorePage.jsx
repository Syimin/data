import React from 'react'
import {Container,Row,Col,Card,Accordion} from 'react-bootstrap'
import SettingStoreForm from './SettingStoreForm'     

    const SettingStorePage = (props)=>{
        const {sid} = props.match.params
        return(
            <Container>
                <Row className="d-flex justify-content-center">
                    <Col sm={12} md={6}>
                        <SettingStoreForm sid={sid}/>
                        {/* <PostWallpaper uid={uid}/> */}
                    </Col>
                </Row>
            </Container>
        )                  
    }

    export default SettingStorePage
 
    

