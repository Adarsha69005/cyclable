import React, { Component } from 'react';
import {Grid,Row,Col,Button,Form,FormGroup,FormControl,ControlLabel,HelpBlock,Alert} from 'react-bootstrap'
import Container from '../cycleappContainer';
import CyclableApi from '../../ApiSources/cyclable_api';

export default class AddProduct extends Component {
    
    constructor() {
        super()
        this.state = {
            title:'',
            price:'',
            brand:'',
            product_image:'',
            description:'',
            error_message:'',
            success_message:'',
            error_status:false,
            success_status:false
        }
    }

    handleChange = (event) => {
        event.preventDefault();
        const self = this;
        self.setState({[event.target.name]:event.target.value});
    }
    handleImageChange = (event) => {
        
        event.preventDefault();
        this.setState({product_image:event.target.files[0]})
    }

    addProduct = (event) => {
        event.preventDefault();
        const self = this;
        const {title,price,brand,product_image,description} = self.state;
        let addProductSchema = new FormData();
        addProductSchema.append('title',title);
        addProductSchema.append('price',price);
        addProductSchema.append('brand',brand);
        addProductSchema.append('description',description);
        addProductSchema.append('product_image',product_image);
        
        
        const api = new CyclableApi();
        api.addProduct(addProductSchema).then(function(response) {
            if(response.product_id){
                self.setState({success_status:true,success_message:response.message})
                
            }
            
        }).catch(error => {
            self.setState({error_message:"Failed to add Product.",error_status:true})
          })
    }

    render() {
        return (
            <div>
                <Container>
                    <Grid fluid>
                        <Row className="show-grid">
                            <Col xs={12} md={10}>
                                <h3>Add Product</h3>
                            </Col>
                        </Row>
                        <hr style={{borderRadius:"5px",borderColor:"black"}}/>
                        <Row>
                            <Col xs={12} md={8}>
                            <div style={{paddingLeft:'100px',paddingTop:'20px', height:"100%"}}>
                                <Form horizontal>
                                      <FieldGroup
                                        id="formControlsText"
                                        type="text"
                                        label="Title"
                                        placeholder="Title"
                                        name="title"
                                        onChange={this.handleChange}
                                      />
                                      <FieldGroup
                                        id="formControlsText"
                                        type="text"
                                        label="Price"
                                        placeholder="Price"
                                        name="price"
                                        onChange={this.handleChange}
                                      />
                                      <FieldGroup
                                        id="formControlsText"
                                        type="text"
                                        label="Brand"
                                        placeholder="Brand"
                                        name="brand"
                                        onChange={this.handleChange}
                                      />
                                      <FieldGroup
                                        id="formControlsText"
                                        type="file"
                                        label="Product Image"
                                        placeholder="image"
                                        name="product_image"
                                        onChange={this.handleImageChange}
                                      />
                                      <FieldGroup
                                        id="formControlsText"
                                        type="textarea"
                                        label="Description"
                                        placeholder="Description"
                                        name="description"
                                        onChange={this.handleChange}
                                      />
                                        <p style={{color:"red"}}>{this.state.error_status === true ? this.state.error_message:null}</p>
                                        {this.state.success_status === true ?<Alert variant='success'>{this.state.success_message}</Alert>:null}
                                      <Button bsStyle="success" style={{margin:"15px"}} onClick={this.addProduct}>Add Product</Button>
                                </Form>
                            </div>
                            </Col>
                        </Row>
                </Grid>
                </Container>
            </div>
        );
    }
}

function FieldGroup({ id, label, help, ...props }) {
    return (
      <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
  }