import React, {Component } from 'react';
import CarouselSlide from '../carousel';
import {Grid,Row,Col} from 'react-bootstrap';
import ProductItem from './ProductItem';
import CyclableApi from '../../ApiSources/cyclable_api';

export default class Product extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            products:[]
        }
    }
    componentDidMount() {
        const self = this;
        const api = new CyclableApi();
        api.getProduct().then(function(product_response){
            self.setState({products:product_response.product})
        })

    }
    render(){
            
            let productList =this.state.products.map((product) => {
                return (
                        <ProductItem
                            id={product._id}
                            title={product.title}
                            brand={product.brand}
                            description={product.description}
                            image={product.image}
                            price={product.price}
                            key={product._id}
                        />
                )
            })
            return(
                <div className="container" style={{paddingBottom:"150px"}}>
                    <div className="row textheaderstyle">
                    <h1>Cyclable Product</h1></div>
                    <hr/>
                    <div class="row">
                        {productList}
                    </div>
                </div>
            );
        }

    
}
