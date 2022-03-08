import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import reportWebVitals from './reportWebVitals'
import Map from './components/Map'
import Direction from './components/Direction'
import Marker from './components/Marker'
import Mapv2 from './components/Mapv2'
import routes from './routes.json'


ReactDOM.render(
  <React.StrictMode>
    <Mapv2 routes={routes} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
