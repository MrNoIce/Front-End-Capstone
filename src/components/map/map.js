import React, { Component } from "react";
import ReactMapGL, { NavigationControl, GeolocateControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
const TOKEN =
  "pk.eyJ1IjoiamFrZXNjb3R0MSIsImEiOiJjanlyZGhkMXcwMTQxM2ptdjBjbDU1bGllIn0.k1hr4yy2-s0IysSwf4z8Kg";
const navStyle = {
  position: "absolute",
  top: 50,
  left: 0,
  padding: "10px"
};


class Map extends Component {
    state = {
        lngLat: []
    }
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
        height: 700,
        // longitude: position.coords.longitude,
        // latitude: position.coords.latitude
      }
    };
  }
  _onClickMap(evt) {
    console.log(evt.lngLat);
    
  }

  render() {
    const { viewport } = this.state;
    return (
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "100vh",
          width: "100vw"
        }}
        mapboxApiAccessToken={TOKEN}
        onViewportChange={viewport => this.setState({ viewport })}
        onClick={this._onClickMap}
      >
        <div style={{ position: "absolute", right: 0 }} />>
        <div className="nav" style={navStyle}>
          <NavigationControl />
          <GeolocateControl />
        </div>
      </ReactMapGL>
    );
  }
}

export default Map;
