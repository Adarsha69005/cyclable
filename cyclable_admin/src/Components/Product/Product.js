import React, { Component } from 'react';
import {Grid,Row,Col,Button,Form,FormGroup,FormControl,Table} from 'react-bootstrap'
import Container from '../cycleappContainer';
import CyclableApi from '../../ApiSources/cyclable_api';

export default class Product extends Component {

    constructor(props) {
        super(props)
        this.state = {
            products:[],
            error_message:'',
            error_status:false,
            no_product_to_display:true,
            search:''
        }
    }

    componentDidMount() {
        const self = this;
        self.getProducts();
    }

    viewProduct = (product_id) => {
        window.location.href=`/product/${product_id}`;
    }

    handleSearchText = (event) => {
     
        this.setState({[event.target.name]:event.target.value})
    }

    SearchProduct = (event) => {
        event.preventDefault();
        const self = this;
        const api = new CyclableApi();
        self.searchSchema = {
            'query':self.state.search
        }
        api.searchProduct(self.searchSchema).then(function(search_response) {
            self.setState({products:search_response.product})
        }).catch(error => {
            self.setState({error_status:true,error_message:"Search Query Product Not Found"})
        })
    }

    deleteProduct = (product_id) => {
        const self = this;
        const api = new CyclableApi();
        api.deleteProductById(product_id).then(function(response) {
            let deleteDataProduct= self.state.products.filter((product,index)=> {
                return product_id !== product._id;
            })
            self.setState(state => {
                state.products = deleteDataProduct;
                return state;
            })
        }).catch(error => {
            self.setState({error_message:'Unable to Delete Product',error_status:true})
        })
    }

    getProducts = () => {
        const self = this;
        const api = new CyclableApi();
        api.getProduct().then(function(products) {
            if(products.product === undefined || products.product.length === 0){
                self.setState({products:products.product});
            }else {
                self.setState({products:products.product,no_product_to_display:false});
            }
        }).catch(error => {
            self.setState({no_product_to_display:true})
          })

    }

    addProductPage = () => {
        window.location.href="/addproduct";
    }
    render() {
        let Products;
        const products_details = this.state.products;
        if(products_details !== undefined && products_details.length !== 0){
            Products = products_details.map((product, index) => {
            return (
                <tr key={index}>
                    <td className="tablefont"><strong>{index + 1}</strong></td>
                    <td className="tablefont"><strong>{product.title}</strong></td>
                    <td className="tablefont"><strong>{product.brand}</strong></td>
                    <td><span style={{color:"green"}}><i className="fa fa-eye fa-2x" onClick={() => {this.viewProduct(product._id)}}></i></span><span style={{paddingLeft:"50px", color:"red"}}  onClick={() => this.deleteProduct(product._id)}><i className="fa fa-trash fa-2x"></i></span> </td>
                </tr>
            );
        })
        }
        
        return (
            <div>
                <Container>
                    <Grid fluid>
                        <Row className="show-grid">
                            <Col xs={12} md={10}>
                                <h3>Products</h3>
                            </Col>
                            <Col xs={6} md={2}>
                                <Button bsStyle="primary" style={{marginTop:"15px"}} onClick={this.addProductPage}>Add Product</Button>
                            </Col>
                        </Row>
                        <hr style={{borderRadius:"5px",borderColor:"black"}}/>
                        <Row className="show-grid">
                            <Form inline style={{paddingLeft:'20px', paddingBottom:'10px'}}>
                                <FormGroup controlId="formInlineName">
                                  <FormControl type="text" name="search" placeholder="search..." onChange={this.handleSearchText} />
                                </FormGroup>
                                <Button onClick={this.SearchProduct}><i className="fa fa-search"></i></Button>
                            </Form>
                        </Row>
                        <Row className="show-grid">
                            <div style={{paddingLeft:'20px',paddingTop:'20px', height:"100%"}}>
                            <p style={{color:"red"}}>{this.state.error_status === true ? this.state.error_message:null}</p>
                            {this.state.no_product_to_display === true ? <div><hr /><h3 style={{paddingBottom:"345px"}}>No Product to Display</h3></div>:
                                <Table striped condensed hover >
                                    <thead>
                                      <tr>
                                          <td><strong>NO.</strong></td>
                                          <td><strong>Product Name</strong></td>
                                          <td><strong>Brand</strong></td>
                                          <td><span><strong>View</strong></span><span style={{paddingLeft:'50px'}}><strong>Delete</strong></span></td>
                                      </tr>
                                    </thead>
                                    <tbody >
                                      {Products}
                                    </tbody>
                                </Table>}
                            </div>
                        </Row>
                </Grid>
                </Container>
            </div>
        );
    }
}