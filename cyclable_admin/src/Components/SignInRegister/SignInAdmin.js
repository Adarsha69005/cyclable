import React, {Component} from 'react';
import {Grid,Row,Well,Panel,Form, FormGroup,Col,FormControl,Checkbox,Button} from 'react-bootstrap';
import './signInRegister.css';
import CyclableApi from '../../ApiSources/cyclable_api';
import { Link, Redirect } from 'react-router-dom';
import Authentication from '../../Authentication/Authentication';

export default class SignInAdmin extends Component {

    constructor() {
      super();
      this.state = {
        email_address:'',
        password:'',
        error_status: false,
        error_message: ''
      }
    }

    handleChange = (event) => {
      this.setState({[event.target.name]:event.target.value});
    }

    handleSubmit = (event) => {
      event.preventDefault();
      const self = this;
      self.signInSchema = {
        "email_address":this.state.email_address,
        "password":this.state.password
      }
      if(this.state.email_address.length <= 0 && this.state.password.length <= 0){
        this.setState({error_status:true,error_message:"email and password required"})
      } else {
        const api = new CyclableApi();
        api.adminLogin(self.signInSchema).then(login_response => {
          if(login_response.token && login_response.user_role === 'admin'){
            localStorage.setItem("token",login_response.token)
            localStorage.setItem("user_id",login_response.user_id)
            window.location.href="/dashboard";
          }

        }).catch(error => {
        self.setState({error_message:error.data.message,error_status:true})
        })
      }
      
    }
    render () {

      if(Authentication.isAuthenticated()){
        return <Redirect to='/dashboard' />
      }

        return (
          <div className="backgrounddesign">
            <Grid>
                <Row className="show-grid signinrow">
                <Col xs={6} md={4}>
                </Col>
                <Col xs={8} md={4}>
                    <Panel bsStyle="info">
                        <Panel.Heading>
                          <Panel.Title componentClass="h1">Admin Login</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                        <Well>
                            <Form horizontal>
                                <FormGroup controlId="formHorizontalEmail">
                                  <Col sm={10}>
                                    <FormControl type="email" placeholder="Email" name="email_address" onChange={this.handleChange} />
                                  </Col>
                                </FormGroup>

                                <FormGroup controlId="formHorizontalPassword">
                                  <Col sm={10}>
                                    <FormControl type="password" placeholder="Password" name="password" onChange={this.handleChange} />
                                  </Col>
                                </FormGroup>

                                <FormGroup>
                                  <Col smOffset={2} sm={10}>
                                    <Checkbox>Remember me</Checkbox>
                                  </Col>
                                </FormGroup>

                                <FormGroup>
                                  <Col smOffset={2} sm={10}>
                                  <p style={{color:"red"}}>{this.state.error_status === true ? this.state.error_message:null}</p>
                                    <Button bsStyle="primary" onClick={this.handleSubmit}>Login To Cyclable</Button><hr />
                                    <p>Don't have an Account : </p>
                                    <Link to='/'><Button bsStyle="success">Register</Button></Link>
                                  </Col>
                                </FormGroup>
                            </Form>
                            </Well>
                        </Panel.Body>
                    </Panel>
                    
                </Col>
                <Col xsHidden md={4}>
                </Col>
            </Row>
            </Grid>
          </div>  
            
        );
    }
}