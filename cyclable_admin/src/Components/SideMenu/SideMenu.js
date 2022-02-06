import React, { Component } from 'react';
import {ListGroup,ListGroupItem,Well} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Authentication from '../../Authentication/Authentication';

export default class  extends Component {

    logOut = () => {
        Authentication.logOut();
        window.location.href="/signin";
    }
    render() {
        return (
            <Well style={{paddingBottom:'415px', backgroundColor:'#D3D3D3'}}>
                <ListGroup>
                    <ListGroupItem><Link to="/dashboard">Dashboard</Link></ListGroupItem>
                    <ListGroupItem><a href="/product">Products</a></ListGroupItem>
                    <ListGroupItem><Link to="/userlist">Users</Link></ListGroupItem>
                    <ListGroupItem onClick={this.logOut}>LogOut</ListGroupItem>
                </ListGroup>
            </Well>
        );
    }
}