import React, {Component } from 'react';
import { Tabs, Tab,FormControl,FormGroup,ControlLabel,Button} from 'react-bootstrap';
import CyclableApi from '../../ApiSources/cyclable_api';
import Authentication from '../../Authentication/Authentication';
import { Link, Redirect } from 'react-router-dom';


const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
 
  const formValid = ({ formErrors, ...rest }) => {
    let valid = true;
  
    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
      val.length > 0 && (valid = false);
    });
  
    // validate the form was filled out
    Object.values(rest).forEach(val => {
      val === null && (valid = false);
    });
  
    return valid;
  };

export default class LogInSignIn extends Component {

    constructor(){
        super()
        this.state = {
            given_name:null,
            family_name:null,
            email_address:null,
            proof:null,
            password:null,
            confirm_password:null,
            latitude:'',
            longitude:'',
            formErrors: {
                given_name: "",
                family_name: "",
                email_address: "",
                proof:"",
                password: ""
              },
            login_email_address:'',
            login_password:'',
            error_message:'',
            success_message:'',
            error_status:false,
            success_status:false
        }
    }

    componentWillMount() {
      const self = this;
      self.getLocation();
    }

    getLocation = () => {
      const self = this;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(self.showPosition);
      } else {
        console.log("No location");
      }
    }

    showPosition = (position) => {
      this.setState({latitude:position.coords.latitude,longitude:position.coords.longitude})
    }

    handleChange = (event) => {
        const self = this;
        const { name, value } = event.target;
        self.formValidation(name,value);
    }

    formValidation = (name,value) => {

        let formErrors = { ...this.state.formErrors }
      
        switch (name) {
          case "given_name":
            formErrors.given_name =
              value.length < 3 ? "minimum 3 characaters required" : "";
            break;
          case "family_name":
            formErrors.family_name =
              value.length < 3 ? "minimum 3 characaters required" : "";
            break;
          case "email_address":
            formErrors.email_address = emailRegex.test(value)
              ? ""
              : "invalid email address";
            break;
          case "proof":
            formErrors.proof = value.length < 10 ? "minimum 10 characters required" : "";
            break;
          case "password":
            formErrors.password =
              value.length < 6 ? "minimum 6 characaters required" : "";
            break;
          default:
            break;
        }
      
        this.setState({ formErrors, [name]: value });
       }

    RegisterUser = (event) => {
        event.preventDefault();
        const self = this;

        if(formValid(self.state)){
            self.registerSchema = {
                'given_name': this.state.given_name,
                'family_name': this.state.family_name,
                'email_address': this.state.email_address,
                'proof': this.state.proof,
                'password': this.state.password,
                'user_role':'client'
            }
            if(self.state.password === self.state.confirm_password) {
                const api = new CyclableApi();
                api.clientRegister(self.registerSchema).then(function(register_response){
                    
                    self.setState({success_status:true,success_message:register_response.message});
                }).catch((errorMessage) => {
                    console.log(errorMessage);
                })
            }
            
        } else {
            let formErrors = { ...this.state.formErrors }
            if(!this.state.given_name){
              formErrors.given_name ="Enter given name"
            }
            if(!this.state.family_name){
              formErrors.family_name = "Enter family name"
            }
            if(!this.state.email_address){
              formErrors.email_address ="Enter email address"
            }
            if(!this.state.proof){
                formErrors.proof ="Enter cyclist proof"
              }
            if(!this.state.password){
              formErrors.password ="Enter Password"
            }
             self.setState({formErrors})
            console.log("Not Valid Forms")
            self.setState({loader: false}) 
          } 
        
    }
    SignInUser = (event) => {
        event.preventDefault();
        const self = this;
        self.signinSchema = {
            'email_address': self.state.login_email_address,
            'password': self.state.login_password
        }
        if(self.state.login_email_address.length > 0 && self.state.login_password.length > 0){
            const api = new CyclableApi();
            api.clientLogin(self.signinSchema).then(function(signin_response){
               
                if(signin_response.active === true && signin_response.user_role === 'client') {

                  let locationSchema = {
                    "latitude":self.state.latitude,
                    "longitude":self.state.longitude
                  }
                  localStorage.setItem('latitude',self.state.latitude);
                  localStorage.setItem('longitude',self.state.longitude);
                  api.addLocation(locationSchema).then(function(location_data){
                    
                    window.location.href='/user';
                  }).catch(error => {
                    console.log(error);
                    self.setState({error_status:true,error_message:error.data.message});
                })
                    
                } else {
                    self.setState({error_status:true,error_message:"Invalid Credentials."})
                }
            }).catch(error => {
                console.log(error);
                self.setState({error_status:true,error_message:error.data.message});
            })
    }
    }
    render () {

      if(Authentication.isAuthenticated()){
        return <Redirect to='/user' />
      }

        const { formErrors } = this.state;
        return (
            <div>
            <section className="page-title" style={{margin:"0px",padding:'0px'}}>
              <img className="img-fluid" src="images/head.png" alt="image"  />
              <div className="page-text">
                  <h1>LOGIN/REGISTER</h1>
              <p>Home / Page / Login-register</p>
              </div>
            </section>
            <section className="container rl py-5">
            <Tabs
                id="controlled-tab-example"
            >
            <Tab eventKey="home" title="Register">
                <FormGroup controlId="fullname">
                    <ControlLabel>Given Name</ControlLabel>
                        <FormControl
                            onChange = {this.handleChange}
                            type="text"
                            placeholder="Enter GivenName"
                            name="given_name" />
                        <FormControl.Feedback />
                </FormGroup>
                {formErrors.given_name.length > 0  && (
                    <span className="text-danger formvalidation">{formErrors.given_name}</span>
                )}
                <FormGroup controlId="fullname">
                    <ControlLabel>Family Name</ControlLabel>
                        <FormControl
                            onChange = {this.handleChange}
                            type="text"
                            placeholder="Enter FamilyName"
                            name="family_name" />
                        <FormControl.Feedback />
                </FormGroup>
                {formErrors.family_name.length > 0  && (
                    <span className="text-danger formvalidation">{formErrors.family_name}</span>
                )}
                <FormGroup controlId="email">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        onChange = {this.handleChange}
                        type="email"
                        placeholder="Enter Email Address"
                        name="email_address" />
                    <FormControl.Feedback />
                </FormGroup>
                {formErrors.email_address.length > 0  && (
                    <span className="text-danger formvalidation">{formErrors.email_address}</span>
                )}
                <FormGroup controlId="fullname">
                    <ControlLabel>Proof of Being Cyclist</ControlLabel>
                        <FormControl
                            onChange = {this.handleChange}
                            type="text"
                            placeholder="information"
                            name="proof" />
                        <FormControl.Feedback />
                </FormGroup>
                {formErrors.proof.length > 0  && (
                    <span className="text-danger formvalidation">{formErrors.proof}</span>
                )}
                <FormGroup controlId="password">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        onChange = {this.handleChange}
                        type="password"
                        placeholder="Enter Password"
                        name="password" />
                    <FormControl.Feedback />
                </FormGroup>
                {formErrors.password.length > 0  && (
                    <span className="text-danger formvalidation">{formErrors.password}</span>
                )}
                <FormGroup controlId="confirmpassword">
                    <ControlLabel>Confirm Password</ControlLabel>
                    <FormControl
                        onChange = {this.handleChange}
                        type="password"
                        placeholder="Confirm Password"
                        name="confirm_password" />
                    <FormControl.Feedback />
                </FormGroup>
                {this.state.password === this.state.confirm_password ? null:
                    <span className="text-danger formvalidation">Password does not match the confirm password.</span>
                }
                {this.state.success_status === true ?<div className="alert alert-success" role="alert">
                    {this.state.success_message}
                </div>:null}
                <Button  bsStyle="primary" bsSize="small" onClick={this.RegisterUser} >Register</Button>
            </Tab>
            <Tab eventKey="profile" title="Login">
              <p>Login</p>
              <FormGroup controlId="email">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        onChange = {this.handleChange}
                        type="email"
                        placeholder="Enter Email"
                        name="login_email_address" />
                    <FormControl.Feedback />
                </FormGroup>
                <FormGroup controlId="Password">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        onChange = {this.handleChange}
                        type="password"
                        placeholder="Enter Password"
                        name="login_password" />
                    <FormControl.Feedback />
                </FormGroup>
                {this.state.error_status === true ?<div className="alert alert-danger" role="alert">
                    {this.state.error_message}
                </div>:null}
                <Button bsStyle="primary" bsSize="small" onClick={this.SignInUser} >Sign In</Button>
            </Tab>
            </Tabs>
            </section>
            </div>
        );
    }
}