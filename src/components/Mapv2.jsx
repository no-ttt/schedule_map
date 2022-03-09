/* global google */
import React from "react"
import { GoogleMap, DirectionsRenderer, InfoBox, InfoWindow } from "@react-google-maps/api"
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
      displayBox: "",
      display: false,
      icon: "",
    }
    this.changeList = this.changeList.bind(this);
  };

  changeList(updateList) {
    this.setState({
      routes: updateList,
      displayBox: "",
    }, () => {
      this.onMapLoad()
    })
  }

  _handleKeyDown = (e) => {
		if (e.key === 'Enter') {
		  this.setState({
        icon: e.target.value
      })
		}
	}

  onMapLoad = () => {
    directionsService = new google.maps.DirectionsService();
    console.log(this.state.routes)
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
          <div className="mapv2-board-title">南投一直吃</div>
          <div className="mapv2-memo">
            <div className="mapv2-memo-sort">
              <div className="mapv2-memo-content">出發日期 : </div>
              <div className="mapv2-memo-content">2022/3/9</div> 
            </div>
            <div className="mapv2-memo-sort">
              <div className="mapv2-memo-content">交通方式 : </div>
              <div className="mapv2-memo-content">汽車</div>
            </div>
            <div className="mapv2-memo-sort">
              <div className="mapv2-memo-content">icon </div>
                <input type="text"
                  className="mapv2-input" style={{ width: "50", height: "30" }}
                  onKeyDown={this._handleKeyDown}
                />
            </div>
          </div>
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
              <div>
                {this.state.icon === "" 
                  ? <button className="mapv2-default-loc" onClick={() => {this.setState({displayBox: index, display: !this.state.display})}}>{index+1}</button>
                  : <button className="mapv2-icon-btn" onClick={() => {this.setState({displayBox: index, display: !this.state.display})}}><img src={this.state.icon} alt="my_icon" className="mapv2-icon" /></button>
                }
                {this.state.displayBox === index && this.state.display === true &&
                  <InfoWindow
                    position={{ lat: item.location.lat, lng: item.location.lng }}
                    onCloseClick={() => {this.setState({display: !this.state.display})}}
                    zIndex={1}
                  >
                    <div className="toolbox-info">
                      <img title={item.title} src={item.src} alt={item.title} className="toolbox-img"></img>
                      <div className="toolbox-title">{item.title}</div>
                    </div>
                  </InfoWindow>
                }
              </div>
            </InfoBox>
          )}
        </GoogleMap>
      </div>
    );
  }
}

