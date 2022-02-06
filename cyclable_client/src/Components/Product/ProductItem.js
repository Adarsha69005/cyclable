import React, {Component} from 'react';
import {Row, Col, Well, Button, Image} from 'react-bootstrap';

class ProductItem extends Component {
    constructor(props){
        super(props);
        this.state ={
            isClicked: false
        };
    }
    onReadMore(){
        this.setState({isClicked:true})
    }

    addToCart = (event) => {
        event.preventDefault();
    }

    render() {
        return (
                <div className="col-xs-6 col-md-3">
                  <div className="thumbnail">
                    <img src={`http://localhost:9001/images/product_image/${this.props.image}`} responsive className="thumbnail" />
                    <div className="caption">
                      <h4>Name: {this.props.title}</h4>
                      <h5>Brand:{this.props.brand}</h5>
                      <p>Description: {(this.props.description.length > 50 && this.state.isClicked === false)?(this.props.description.substring(0, 25)):(this.props.description)}
                            <button className={this.state.isClicked === false && this.props.description !== null && this.props.description.length > 50?'btn btn-success btn-sm':'hide'}  onClick={this.onReadMore.bind(this)}>
                                 {(this.state.isClicked === false && this.props.description !== null && this.props.description.length > 50)?('...readmore'):(null)}
                        </button></p>
                      <h5>Price $: {this.props.price}</h5>
                      <p><a href="" className="btn btn-primary" role="button" onClick={this.addToCart}>Buy Now</a></p>
                    </div>
                  </div>
                </div>     
        );
    }
}


export default ProductItem;