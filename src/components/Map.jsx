import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import AccessibilityIcon from '@material-ui/icons/Accessibility'
import DragDropList from './DragDropList'

var Key = ['AIzaSyC7-6v1eCkrtOESIW9B5UMms2oUgxdP7wA']

const AnyReactComponent = ({ text }) => 
    <div><AccessibilityIcon /></div>

const listItem = [
  { title: "清寶鹹油條", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAJ99vluAYcEeFk1t0HqI0VzGUUdvhaextpA&usqp=CAU", lat: 23.967405865634767, lng: 120.95330045720442 }, 
  { title: "彩蝶瀑布", src: "https://taiwan.sharelife.tw/tw-news-img/36306/1c56240720335317.jpg", lat: 23.997006189001198, lng: 121.03915676781364 },
  { title: "清境農場", src: "https://doqvf81n9htmm.cloudfront.net/data/crop_article/120767/102501.jpg_1140x855.jpg", lat: 24.057289306608432, lng: 121.16248065783212 },
  { title: "伊達邵", src: "https://www.taiwan.net.tw/att/1/big_scenic_spots/pic_C100_271_6.jpg", lat: 23.849747313450543, lng: 120.9296663169757 },
  { title: "虎頭山", src: "https://img.bobblog.tw/flickr/25013636722_fbd5966956_z.jpg", lat: 23.96668371946003, lng: 120.98933492441988 },
];

export default class Map extends Component {
  static defaultProps = {
    center: {
      lat: 23.96823370739581,
      lng: 120.96023908465449
    },
    zoom: 15
  };

  render() {
    return (
      <div style={{ height: '100vh', width: '100%' }} className="dragdroplist-side">
        <div className="dragdroplist-board">
          <DragDropList listItem={listItem} width={200} height={50} />
        </div>
        <GoogleMapReact
          bootstrapURLKeys={{ key: Key }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={23.96823370739581}
            lng={120.96023908465449}
            text="My Marker"
          />
          
        </GoogleMapReact>
        
      </div>
    );
  }
}
