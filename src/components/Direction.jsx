import React, { Component } from 'react'
import { GoogleMap, DirectionsService, DirectionsRenderer } from '@react-google-maps/api'

const containerStyle = {
  height: '100vh'
};

const center = {
  lat: 23.968249192607157,
  lng: 120.95896959995788
};

export default class Direction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      response: null,
      travelMode: 'DRIVING',
      origin: '545南投縣埔里鎮中山路三段676號545',
      destination: '545南投縣埔里鎮中山路三段245號',
    }
    this.directionsCallback = this.directionsCallback.bind(this)
  }

  directionsCallback (response) {
    console.log(response)

    if (response !== null) {
      if (response.status === 'OK') {
        this.setState(
          () => ({
            response
          })
        )
      } else {
        console.log('response: ', response)
      }
    }
  }

  render() {
    return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={18}
      >
        <DirectionsService
          options={{
            destination: this.state.destination,
            origin: this.state.origin,
            travelMode: this.state.travelMode
          }}
          callback={this.directionsCallback}
        />
        {
          this.state.response !== null && (
            <DirectionsRenderer
              options={{ 
                directions: this.state.response
              }}
            />
          )
        }
      </GoogleMap>
    )
  }
}