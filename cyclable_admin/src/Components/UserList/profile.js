import React, { Component } from 'react';
import {Grid,Row,Col,Button,Form,FormGroup,FormControl,ControlLabel,HelpBlock,Checkbox,Alert} from 'react-bootstrap'
import Container from '../cycleappContainer';
import CyclableApi from '../../ApiSources/cyclable_api';

export default class Profile extends Component {

    constructor() {
        super() 
        this.state={
            userdata:{},
            given_name:'',
            family_name:'',
            email_address:'',
            success_status: false,
            success_message:''
        }
    }

    componentDidMount() {
        const self= this;
        const api = new CyclableApi();

        let admin_id = localStorage.getItem("user_id");
        api.getClientById(admin_id).then(function(response){
            self.setState({given_name: response.user.given_name,family_name:response.user.family_name,email_address:response.user.email_address})
        })
    }

    onChangeInput = (event) => {
      this.setState({[event.target.name]:event.target.value})
    }

    updateAdminData = (event) => {
      const self = this;
      event.preventDefault();
      const {given_name, family_name, email_address} = this.state;

      let updateSchema = {
        "given_name":given_name,
        "family_name":family_name
      }
      const api = new CyclableApi();
      api.updateAdmin(updateSchema).then((response) => {
        if(response.success === true){
          self.setState({success_status:true,success_message:response.message})
        }
        
      }).catch(error => {
        console.log(error);
      })

    }

    render() {

        const {given_name, family_name,email_address} = this.state;
        return (
            <div>
                <Container>
                    <Grid fluid>
                        <Row className="show-grid">
                            <Col xs={12} md={10}>
                                <h3>Profile</h3>
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
                                        name="given_name"
                                        value={given_name}
                                        placeholder="given name"
                                        onChange = {this.onChangeInput}
                                      />
                                      <FieldGroup
                                        id="formControlsText"
                                        type="text"
                                        label="Family Name"
                                        name="family_name"
                                        value={family_name}
                                        placeholder="family name"
                                        onChange = {this.onChangeInput}
                                      />
                                      <FieldGroup
                                        id="formControlsText"
                                        type="text"
                                        label="Email"
                                        name = "email_address"
                                        value={email_address}
                                        placeholder="email_address"
                                        readOnly
                                      />
                                     
                                      <Button bsStyle="success" style={{margin:"15px"}} onClick={this.updateAdminData}>Save</Button>
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