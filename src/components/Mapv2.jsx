import ReactDOM from "react-dom"
import React from "react"
import { GoogleMap, DirectionsRenderer, InfoBox } from "@react-google-maps/api"
import DragDropList from './DragDropList'

const center = {
  lat: 23.968249192607157,
  lng: 120.95896959995788
};
let directionsService;

export default class Mapv2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: this.props.routes,
      directions: null,
    }
    this.changeList = this.changeList.bind(this);
  };

  changeList(updateList) {
    this.setState({
      routes: updateList,
    })
    this.onMapLoad()
  }

  onMapLoad = () => {
    directionsService = new google.maps.DirectionsService();

    const listCopy = this.state.routes.map(item => {
      return {
        location: { lat: item.location.lat, lng: item.location.lng },
        stopover: true
      };
    });

    const origin =
      listCopy.length === 1
        ?
        listCopy[0].location

        : listCopy.shift().location;   // 移除並傳第一個元素

    const destination =
      listCopy.length === 1
        ?
        listCopy[0].location
        : listCopy.pop().location;    // 移除並傳最一個元素

    const waypoints = listCopy;       // 去除起點跟終點後的中間元素

    this.getDirection(origin, destination, waypoints);
  };

  // function that is calling the directions service
  getDirection = (origin, destination, waypoints) => {
    waypoints.length >= 1
      ? directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING,
          waypoints: waypoints
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result
            });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      )
      : directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result
            });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
  };

  render() {
    return (
      <div className="mapv2-side">
        <div className="mapv2-board">
          <DragDropList listItem={this.state.routes} changeList={this.changeList} width={200} height={50} />
        </div>
        <GoogleMap
          center={center}
          zoom={5}
          onLoad={map => this.onMapLoad(map)}
          mapContainerStyle={{ height: '100vh', width: '100%' }}
        >
          {this.state.directions !== null && (
            <DirectionsRenderer
              directions={this.state.directions}
              options={{ suppressMarkers: true }}
            />
          )}
          {this.state.routes.map((item, index) =>
            <InfoBox
              position={{ lat: item.location.lat, lng: item.location.lng }}
              options={{ closeBoxURL: '', enableEventPropagation: true }}
            >
              <div className="loc">{index + 1}</div>
            </InfoBox>
          )}
        </GoogleMap>
      </div>
    );
  }
}

