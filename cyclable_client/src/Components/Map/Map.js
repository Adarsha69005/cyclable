import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import cyclable_api from '../../ApiSources/cyclable_api';
const mapStyles = {
  width: "auto",
  height: '400px'
};

export class MapContainer extends Component {

  constructor() {
    super()
      this.state={
        latitude:'',
        longitude:'',
        locations:[]
    }
  }

  componentWillMount() {
    this.setState({latitude:localStorage.getItem('latitude'),longitude:localStorage.getItem('longitude')})
    this.getAllUserLocations();
  }

  getAllUserLocations(){
    const self= this;
    let api = new cyclable_api();
    api.getUsersLocation().then(response => {
      self.setState({locations:response.location})
    })
  }


  render() {
    
    return (
      <div className="col-md-12">
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
          lat: this.state.latitude,
          lng: this.state.longitude
        }} className="container">
        <Marker
          title='Current Location'
          position={{lat:this.state.latitude, lng:this.state.longitude}} />
          {this.state.locations.map((location,index) => {
            
            return (<Marker position={{lat:location.coordinates[0], lng:location.coordinates[1]}} key={index}/>)
        })}
        </Map>
      </div>
      
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyA-7y2bcNv7TxP8VfcIhwtxMZj4aaXgILs'
})(MapContainer);