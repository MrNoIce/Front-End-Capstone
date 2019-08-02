import React, { Component } from "react";
import ReactDOM, { render } from "react-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import ReactMapGL, { NavigationControl, GeolocateControl } from "react-map-gl";
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
  onClickMap = evt => {
    console.log(evt.lngLat);
    this.setState({
      lngLat: evt.lngLat
    });
  };
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
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
      }
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

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
    }
  };

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }
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
              value={this.state.lngLat}
              onChange={this.handleFieldChange}
              id="lngLat"
              placeholder="Click on the map for the specific location"
            />
          </div>
          <div className="form-group">
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle caret>Dropdown</DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Choose issue type</DropdownItem>
                {/* <DropdownItem>Some Action</DropdownItem> */}
                {/* <DropdownItem disabled>Action (disabled)</DropdownItem> */}
                <DropdownItem divider />
                <DropdownItem>Road Condition</DropdownItem>
                <DropdownItem>Side Walk</DropdownItem>
                <DropdownItem>Traffic Light</DropdownItem>
              </DropdownMenu>
            </Dropdown>
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
          onClick={evt => this.onClickMap(evt)}
        >
          <div style={{ position: "absolute", right: 0 }} />>
          <div className="nav" style={navStyle}>
            <NavigationControl />
            <GeolocateControl />
          </div>
        </ReactMapGL>
      </React.Fragment>
    );
  }
}
