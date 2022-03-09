import React, { Component } from 'react'
import { GoogleMap, InfoBox } from '@react-google-maps/api'
import AccessibilityIcon from '@material-ui/icons/Accessibility'

const containerStyle = {
	height: '100vh'
};

const center = {
	lat: 23.968668266711262, 
	lng: 120.95759065868928
};

export default class Marker extends Component {
	render() {
		return (
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
		)
	}
}