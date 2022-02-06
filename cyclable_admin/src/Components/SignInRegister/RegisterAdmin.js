import React, {Component} from 'react';
import {Grid,Row,Well,Panel,Form,FormGroup,ControlLabel,FormControl,HelpBlock,Col,Button,Alert} from 'react-bootstrap';
import './signInRegister.css'
import CyclableApi from '../../ApiSources/cyclable_api';
import {Link, Redirect} from 'react-router-dom';
import Authentication from '../../Authentication/Authentication';

export default class RegisterAdmin extends Component {

    constructor() {
      super();
      this.state = {
        given_name:'',
        family_name:'',
        email_address:'',
        password:'',
        confirm_password:'',
        error_status:false,
        error_message:'',
        success_status: false,
        success_message:''
      }
    }

    handleChange = (event) => {
      this.setState({[event.target.name]:event.target.value})
    }

    handleSubmit = (event) => {
      event.preventDefault();
      const self = this;

      self.registerSchema = {
        "given_name":self.state.given_name,
        "family_name": self.state.family_name,
        "email_address": self.state.email_address,
        "password": self.state.password,
        "user_role": "admin"
      }
      if(self.state.given_name.length <= 0 || self.state.family_name.length <= 0 || self.state.email_address.length <= 0 || self.state.password.length <= 0) {
        self.setState({error_message:"Enter all the required fields", error_status:true})
      }else {
      const api = new CyclableApi();
      if(self.state.password === self.state.confirm_password){
        api.adminRegister(self.registerSchema).then(register_response => {
          if(register_response.user_id){
            this.setState({success_status:true,success_message:register_response.message})
          }
          
        }).catch(error => {
          self.setState({error_message:"something went wrong",error_status:true})
        })
      }
    }
      
    }
    
    render () {

      if(Authentication.isAuthenticated()){
        return <Redirect to='/dashboard' />
      }
        return (
          <div className="signinbackground backgrounddesign">
            <Grid>
                <Row className="show-grid registerrow">
                <Col xs={6} md={4}>
                </Col>
                <Col xs={8} md={4}>
                    <Panel bsStyle="info">
                        <Panel.Heading>
                          <Panel.Title componentClass="h1">Register Admin</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                        <Well>
                            <Form horizontal>
                              <FieldGroup
                                // id="formControlsText"
                                type="text"
                                label="Given Name"
                                placeholder="Given Name"
                                name="given_name"
                                onChange={this.handleChange}
                              />
                              <FieldGroup
                                // id="formControlsText"
                                type="text"
                                label="Family Name"
                                placeholder="Family Name"
                                name="family_name"
                                onChange={this.handleChange}
                              />
                              <FieldGroup
                                // id="formControlsText"
                                type="email"
                                label="Email"
                                placeholder="Email"
                                name="email_address"
                                onChange={this.handleChange}
                              />
                              <FieldGroup
                                // id="formControlsText"
                                type="password"
                                label="Password"
                                placeholder="Password"
                                name="password"
                                onChange={this.handleChange}
                              />
                              <FieldGroup
                                // id="formControlsText"
                                type="password"
                                label="Confirm Password"
                                placeholder="Confirm Password"
                                name="confirm_password"
                                onChange={this.handleChange}
                              />
                              <p style={{color:"red"}}>{this.state.error_status === true ? this.state.error_message:null}</p>
                              {this.state.success_status === true ?<Alert variant='success'>{this.state.success_message}</Alert>:null}
                              <Button onClick={this.handleSubmit} bsStyle="info">Register Admin</Button><br />
                              <p style={{paddingTop:"10px"}}>Already Registered : </p>
                              <Link to='/signin' ><Button bsStyle="success">Sign In</Button></Link>
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

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}