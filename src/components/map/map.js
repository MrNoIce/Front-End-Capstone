import React, { Component } from "react";
import MapGL, { NavigationControl } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
const TOKEN =
  "pk.eyJ1IjoiamFrZXNjb3R0MSIsImEiOiJjanlyZGhkMXcwMTQxM2ptdjBjbDU1bGllIn0.k1hr4yy2-s0IysSwf4z8Kg";
const navStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px"
};
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        longitude: -86.7816016,
        latitude: 36.1626638,
        zoom: 15,
        bearing: 0,
        pitch: 0,
        width: 1000,
        height: 700
      }
    };
  }
  render() {
    const { viewport } = this.state;
    return (
      <MapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
            height: '100vh',
            width: '100vw'
          }}
        mapboxApiAccessToken={TOKEN}
      >
        <div className="nav" style={navStyle}>
          <NavigationControl/>
        </div>
      </MapGL>
    );
  }
}
export default Map;
