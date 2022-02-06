import React, { Component } from 'react';
import Container from '../cycleappContainer';
import {Image} from 'react-bootstrap';

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <Container>
                    <div>
                        <h1 style={{textAlign:'center'}}>Welcome to Dashboard</h1>
                        <hr style={{borderRadius:"5px",borderColor:"black"}}/>
                        <Image src="/images/dashboard_image.jpg" alt="dashboard" style={{width:"100%",height:"500px"}} responsive/>
                    </div>
                </Container>
            </div>
        );
    }
}