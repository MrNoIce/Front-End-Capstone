import React, { Component } from "react";
import ReactDOM, { render } from "react-dom";
// import Map from "../map/map";
import ReactMapGL, { NavigationControl, GeolocateControl } from "react-map-gl";
// import IssueForm from "../issues/newIssueForm"
import "mapbox-gl/dist/mapbox-gl.css";
import "./issues.css";

const API_KEY = process.env.REACT_APP_API_KEY;

const navStyle = {
  position: "absolute",
  top: 50,
  left: 0,
  padding: "10px"
};

export default class IssueForm extends Component {
  // Set initial state
  onClickMap = (evt) => {
    console.log(evt.lngLat);
    this.setState({
      lngLat: evt.lngLat
    });
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
        address: "",
        details: "",
        issueTypeId: "",
        lngLat: ""
        // longitude: position.coords.longitude,
        // latitude: position.coords.latitude
      }
    };
  }
  //   state = {
  //     address: "",
  //     details: "",
  //     issueTypeId: "",
  //     lngLat: ""
  //   };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  constructNewIssue = evt => {
    evt.preventDefault();
    if (this.state.address === "") {
      window.alert("Uhh, Hullo?");
    } else {
      const issue = {
        address: this.state.address,
        details: this.state.details,
        issueTypeId: this.state.issueTypeId,
        lngLat: this.state.lngLat,
        userId: parseInt(sessionStorage.getItem("userId"))
      };

      // Create the article and redirect user to article list
      this.props.addIssue(issue).then(() => this.props.history.push("/issues"));
      //   this.props
      //     .addLocation(this.props.lngLat)
      //     .then(() => this.props.history.push("/issues"));
    }
  };

  render() {
    const { viewport } = this.state;
    return (
      <React.Fragment>
        <form className="issueForm">
          <div className="form-group">
            <label htmlFor="address">Location of Issue</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="address"
              placeholder="Address"
            />
          </div>
          <div className="form-group">
            <label htmlFor="details">Details</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="details"
              placeholder="Details"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lngLat">Location</label>
            <input
              type="text"
              required
              className="form-control"
              value= {this.state.lngLat}
              onChange={this.handleFieldChange}
              id="lngLat"
              placeholder="Location"
            />
          </div>
          <div className="form-group">
            <label htmlFor="issueTypeId">Issue Type</label>
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown button
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </div>
          </div>
          <button
            type="submit"
            onClick={this.constructNewIssue}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
        <ReactMapGL
          {...viewport}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: "100vh",
            width: "100vw"
          }}
          mapboxApiAccessToken={API_KEY}
          onViewportChange={viewport => this.setState({ viewport })}
          onClick={ (evt) => this.onClickMap(evt)}
        >
          <div style={{ position: "absolute", right: 0 }} />>
          <div className="nav" style={navStyle}>
            {/* <IssueForm lngLat={this.state} /> */}
            <NavigationControl />
            <GeolocateControl />
          </div>
        </ReactMapGL>
      </React.Fragment>
    );
  }
}
