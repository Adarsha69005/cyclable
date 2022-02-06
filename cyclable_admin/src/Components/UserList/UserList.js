import React, { Component } from 'react';
import {Grid,Row,Col,Table} from 'react-bootstrap'
import Container from '../cycleappContainer';
import CyclableApi from '../../ApiSources/cyclable_api';

export default class UserList extends Component {
    constructor() {
        super()
        this.state = {
            users:[],
            no_users_to_display:true
        }
    }

    componentDidMount() {
        const self = this;
        self.getUsers();
    }

    deleteUser = (user_id) => {
        const self = this;
        const api = new CyclableApi();
        api.deleteClientById(user_id).then(function(response) {
            let deleteDataClient= self.state.users.filter((user,index)=> {
                return user_id !== user._id;
            })
            self.setState(state => {
                state.users = deleteDataClient;
                return state;
            })
        }).catch(error => {
            self.setState({error_message:'Unable to Delete User',error_status:true})
        })
    }

    viewUser = (user_id) => {
        window.location.href=`/userlist/${user_id}`;
    }

    getUsers = () => {
        const self = this;
        const api = new CyclableApi();
        api.getClientDetails().then(function(users) {
            if(users.user === undefined || users.user.length === 0){
                self.setState({users:users.user});
            }else {
                let client_user = users.user.filter(userfilter => {
                    return userfilter.user_role !== 'admin'
                })
                if(client_user.length !== 0){
                    self.setState({users:client_user,no_users_to_display:false},function(){
                        console.log('after update:',this.state.users);
                    });
                }
                
            }
        }).catch(error => {
            console.log(error);
            self.setState({no_users_to_display:true})
          })

    }
    render() {
        let Users;
        const users_details = this.state.users;
        if(users_details !== undefined && users_details.length !== 0){
            Users = users_details.map((user, index) => {
            return (
                <tr key={index}>
                    <td className="tablefont"><strong>{index + 1}</strong></td>
                    <td className="tablefont"><strong>{user.given_name} {user.family_name}</strong></td>
                    <td className="tablefont"><strong>{user.email_address}</strong></td>
                    <td><span style={{color:"green"}}><i className="fa fa-eye fa-2x" onClick={() => this.viewUser(user._id)}></i></span><span style={{paddingLeft:"50px", color:"red"}}  onClick={() => this.deleteUser(user._id)}><i className="fa fa-trash fa-2x"></i></span> </td>
                </tr>
            );
        })
        }
        return (
            <div>
                <Container>
                    <Grid fluid>
                        <Row className="show-grid">
                            <Col xs={12} md={10}>
                                <h3>User Lists</h3>
                            </Col>
                        </Row>
                        <hr style={{borderRadius:"5px",borderColor:"black"}}/>
                        <Row className="show-grid">
                            <div style={{paddingLeft:'20px',paddingTop:'20px', height:"100%"}}>
                            <p style={{color:"red"}}>{this.state.error_status === true ? this.state.error_message:null}</p>
                            {this.state.no_users_to_display === true ? <div><h3 style={{paddingBottom:"345px"}}>No Users to Display</h3></div>:
                                <Table striped condensed hover >
                                    <thead>
                                      <tr>
                                          <td><strong>NO.</strong></td>
                                          <td><strong>Full Name</strong></td>
                                          <td><strong>Email Address</strong></td>
                                          <td><span><strong>View</strong></span><span style={{paddingLeft:'50px'}}><strong>Delete</strong></span></td>
                                      </tr>
                                    </thead>
                                    <tbody >
                                      {Users}
                                    </tbody>
                                </Table>}
                            </div>
                        </Row>
                </Grid>
                </Container>
            </div>
        );
    }
}