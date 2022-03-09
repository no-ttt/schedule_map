import React, { Component } from 'react'
import { GoogleMap, InfoWindow } from '@react-google-maps/api'

const containerStyle = {
	height: '100vh'
};

const center = {
	lat: 23.968668266711262, 
	lng: 120.95759065868928
};

export default class Toolbox extends Component {
	render() {
		return (
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={center}
				zoom={18}
			>
				<InfoWindow position={center}>
						<h1>Hello World!</h1>
				</InfoWindow>
			</GoogleMap>
		)
	}
}