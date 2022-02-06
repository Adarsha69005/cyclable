import React, { Component } from 'react';
import {Grid,Row,Col,Button,Alert,Image,ListGroup,ListGroupItem} from 'react-bootstrap';
import Container from '../cycleappContainer';
import CyclableApi from '../../ApiSources/cyclable_api';

export default class ProductInformation extends Component {

    constructor() {
        super() 
        this.state={
            productdata:{},
            success_status:false,
            success_message:''
        }
    }

    componentDidMount() {
        const self= this;
        const api = new CyclableApi();
        api.getProductbyId(this.props.match.params.product_id).then(function(response){
            self.setState({productdata: response.product})
        })
    }

    render() {

        return (
            <div>
                <Container>
                    <Grid fluid>
                        <Row className="show-grid">
                            <Col xs={12} md={10}>
                                <h3>Product Information</h3>
                            </Col>
                        </Row>
                        <hr style={{borderRadius:"5px",borderColor:"black"}}/>
                        <Row>
                            <Col xs={12} md={8}>
                            <div style={{paddingLeft:'100px',paddingTop:'20px', height:"100%"}}>
                            {this.state.success_status === true ?<Alert variant='success'>{this.state.success_message}</Alert>:null}
                                
                                <div>
                                    <Image src={`http://localhost:9001/images/product_image/${this.state.productdata.image}`} rounded height="40%" width="40%" alt="Product Image"/>
                                    <ListGroup style={{paddingTop:'20px'}}>
                                        <ListGroupItem><strong>Title: {this.state.productdata.title}</strong></ListGroupItem>
                                        <ListGroupItem><strong>Price: {this.state.productdata.price}</strong></ListGroupItem>
                                        <ListGroupItem><strong>Brand: {this.state.productdata.brand}</strong></ListGroupItem>
                                        <ListGroupItem ><strong>Description: {this.state.productdata.description}</strong></ListGroupItem>
                                    </ListGroup>
                                </div>
                                
                            </div>
                            </Col>
                        </Row>
                </Grid>
                </Container>
            </div>
        );
    }
}
