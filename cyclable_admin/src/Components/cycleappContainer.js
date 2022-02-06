import React, { Component } from 'react';
import {Grid,Row,Col} from 'react-bootstrap'
import NavBar from './NavBar';
import SideMenu from './SideMenu/SideMenu';

export default class CycleAppContainer extends Component {
    render() {
        return (
            <div className="Container">
            <nav>
                <NavBar />
            </nav>
                <Grid fluid>
                    <Row className="show-grid">
                        <Col xs={6} md={2} style={{marginRight:"0px", paddingRight:"0px"}}>
                            <SideMenu />
                        </Col>
                        <Col xs={12} md={10} style={{marginLeft:"0px", paddingLeft:"0px", backgroundColor:"white"}}>
                            {this.props.children}
                        </Col>
                    </Row>
                </Grid>  
            <footer>
            </footer>
        </div>
        );
    }
}