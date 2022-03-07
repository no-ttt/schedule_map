import React, { Component } from 'react';
import { GoogleMap, LoadScript, InfoBox } from '@react-google-maps/api';
import AccessibilityIcon from '@material-ui/icons/Accessibility'

const containerStyle = {
	height: '100vh'
};

const center = {
	lat: 23.968249192607157,
	lng: 120.95896959995788
};

export default class MarkerLoc extends Component {
	render() {
		return (
			<LoadScript
				googleMapsApiKey="AIzaSyC7-6v1eCkrtOESIW9B5UMms2oUgxdP7wA"
			>
				<GoogleMap
					mapContainerStyle={containerStyle}
					center={center}
					zoom={18}
				>
				<InfoBox
					position={center}
					options={{ closeBoxURL: '', enableEventPropagation: true }}
				>
				<div>
					<div><AccessibilityIcon fontSize="large" /></div>
				</div>
					</InfoBox>
				</GoogleMap>
			</LoadScript>
		)
	}
}