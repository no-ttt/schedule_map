import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import './index.css'
import reportWebVitals from './reportWebVitals'
import Direction from './components/Direction'
import Marker from './components/Marker'
import Mapv2 from './components/Mapv2'
import ToolBox from './components/ToolBox'
import routes from './routes.json'


ReactDOM.render(
    <BrowserRouter>
				<Switch>
					<Route exact path="/map" render={props =>
            <Mapv2 {...props} routes={routes} />} />
          <Route exact path="/marker" component={Marker} />
          <Route exact path="/direction" component={Direction} />
          <Route exact path="/toolbox" component={ToolBox} />
				</Switch>
    </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
