import React, { Component } from 'react';
import {Grid,Row,Col,Button,Form,FormGroup,FormControl,ControlLabel,HelpBlock,Checkbox,Alert} from 'react-bootstrap'
import Container from '../cycleappContainer';
import CyclableApi from '../../ApiSources/cyclable_api';

export default class UserInformation extends Component {

    constructor() {
        super() 
        this.state={
            active:false,
            userdata:{},
            success_status:false,
            success_message:''
        }
    }

    componentDidMount() {
        const self= this;
        const api = new CyclableApi();
        api.getClientById(this.props.match.params.user_id).then(function(response){
            self.setState({userdata: response.user})
        })
    }

    activateClient = (event) => {
            this.setState({active: !this.state.active});
    }

    deactivateClient = (event) => {
        this.setState({active: false});
    }

    saveClientData = (event) => {
        event.preventDefault();
        const self = this;
        self.activateSchema = {
            'activate': self.state.active,
            'user_id': self.props.match.params.user_id
        }
        if(self.state.active === true || self.state.active === false){
            const api = new CyclableApi();
            api.activateClient(self.activateSchema).then(function(response){
                if(self.state.active === true) {
                    self.setState({success_status:true,success_message:response.message});
                } else if(self.state.active === false){
                    self.setState({success_status:true,success_message:'User Deactivated'});
                }
                
            })
        }
        

    }
    render() {

        const {given_name, family_name,email_address, proof,active} = this.state.userdata;
        // const FullName = given_name + ' '+ family_name
        const EmailAddress = email_address
        return (
            <div>
                <Container>
                    <Grid fluid>
                        <Row className="show-grid">
                            <Col xs={12} md={10}>
                                <h3>User Information</h3>
                            </Col>
                        </Row>
                        <hr style={{borderRadius:"5px",borderColor:"black"}}/>
                        <Row>
                            <Col xs={12} md={8}>
                            <div style={{paddingLeft:'100px',paddingTop:'20px', height:"100%"}}>
                            {this.state.success_status === true ?<Alert variant='success'>{this.state.success_message}</Alert>:null}
                                <Form horizontal>
                                      <FieldGroup
                                        id="formControlsText"
                                        type="text"
                                        label="Given Name"
                                        value={given_name}
                                        placeholder=""
                                        readOnly
                                      />
                                      <FieldGroup
                                        id="formControlsText"
                                        type="text"
                                        label="Family Name"
                                        value={family_name}
                                        placeholder=""
                                        readOnly
                                      />
                                      <FieldGroup
                                        id="formControlsText"
                                        type="text"
                                        label="Email"
                                        value={EmailAddress}
                                        placeholder="email_address"
                                        readOnly
                                      />
                                       <FieldGroup
                                        id="formControlsText"
                                        type="text"
                                        label="Proof"
                                        value={proof}
                                        placeholder=""
                                        readOnly
                                      />
                                      {active === false ? <Checkbox onClick={this.activateClient}>Activate User</Checkbox>:<Checkbox onClick={this.deactivateClient}>Deactivate User</Checkbox>}
                                      
                                     
                                      <Button bsStyle="success" style={{margin:"15px"}} onClick={this.saveClientData}>Save</Button>
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