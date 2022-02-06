import React, { Component } from 'react';
import {Form,Row,Col,Button,FormGroup,FormControl,ControlLabel} from 'react-bootstrap';
import Messages from './Messages';
import CyclableApi from '../../ApiSources/cyclable_api';
import { connect } from 'mqtt';


export default class ChatUser extends Component {

    constructor(props) {
        super(props)
        this.state={
            name:'',
            textmessage:'',
            messages:[],
            user_clients:[],
            channel_name:'',
            active_li:''

        }
        this.client  = connect('ws://test.mosquitto.org:8080')
        this.client.on('connect', function(){
          console.log("i am connected...")
        })
        
    }

    componentDidMount() {
      const self = this;
      const username = localStorage.getItem('username');
      
      const api = new CyclableApi();
        api.getClientDetails().then(function(clients){
            self.setState({name:username,user_clients:clients.user})
        }).catch((error) => {
          console.log(error);
        })
        self.user_id = localStorage.getItem('user_id');
        self.client.subscribe(`${this.user_id}`);
        self.client.on('message', function(topic,message){
        let chatmessage = JSON.parse(message);
        self.addMessage(chatmessage);

      })
    }

    textMessage = (event) => {
        event.preventDefault();
        this.setState({textmessage:event.target.value})
    }

    submitMessage = (event) => {
      event.preventDefault();
      
      const self = this;
      const message = { name: self.state.name,message:self.state.textmessage}
      let msg = JSON.stringify(message)
      self.client.publish(self.state.channel_name,msg)
      self.addMessage(message)
      self.setState({ textmessage:''}, function(){
        console.log('at message total messages',self.state.messages)
      })
      
    }

    addMessage = (message) => {
      this.setState(state => ({ messages: [message, ...state.messages] }))
    }

    SendMessageWithID = (id) => {
      this.setState({active_li:id,channel_name:id});
    }
    
    render () {

      const chatMessage = this.state.messages.map((message, index) => {
        console.log('at map func',message)
         return <Messages key={index} name={message.name} message={message.message}/>
      })

      let list_userclients = this.state.user_clients.map((user,index) => {
        console.log('user:',user)
        if(user.user_role === 'client' && user._id !== this.user_id){
          return (<li key={user._id} className={this.state.active_li === user._id ? "list-group-item active":"list-group-item" } onClick={() =>this.SendMessageWithID(user._id)}>{user.given_name}</li>)
        }
      })
    
        return (
          <div>
            <div className="row chatuserrow">
              <div className="col-md-6">
              <h5>List of Cyclist</h5>
              <ul className="list-group scrolltypeli">
                  {list_userclients}
              </ul>
              </div>
              <div className="col-md-6">
                <Form>
                <FormGroup controlId="email">
                      <ControlLabel><h5>Message</h5></ControlLabel>
                      <textarea
                      className="inputtextarea"
                      onChange = {this.textMessage}
                      type="text"
                      value={this.state.textmessage}
                      placeholder="Message..."
                      name="textmessage"
                      rows="10" cols="50"
                      ></textarea>

                  </FormGroup>
                  <Button bsStyle="info" onClick={this.submitMessage}>send</Button>
                </Form>
              </div>
            </div>
            <div className="row receivemsg">
              <div className="col-md-12">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h3 className="panel-title">Sent and Received Messages</h3>
                  </div>
                  <div className="panel-body">
                    {chatMessage}
                  </div>
                </div>
                </div>
            </div>
            
            </div>
        );
    }
}