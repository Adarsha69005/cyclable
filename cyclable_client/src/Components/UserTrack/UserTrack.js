import React, { Component } from 'react';
import GoogleMap from '../Map/Map';
import ChatUser from '../ChatUser/ChatUser';
export default class UserTrack extends Component {
  
    render() {
        return (
            <div className="container">
            <div className="row">
            <div class="col-md-12">
                <div className="trackstyle">
                <h1 className="headerstyle">Track Cyclist</h1>
                </div>
                </div>
                </div>
                <div className="row mapstyle">
                <div className=""><GoogleMap /></div>
                </div>
            <ChatUser />

            
            </div>
        );
    }
}