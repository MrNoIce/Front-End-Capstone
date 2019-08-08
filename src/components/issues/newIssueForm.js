import React, { Component } from "react";
import ReactDOM, { render } from "react-dom";
import Dropzone from "react-dropzone";
import request from "superagent";
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
const CLOUDINARY_UPLOAD_PRESET = "uploadCapstone";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/dqwaphhqv/image/upload";

const navStyle = {
  position: "",
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
        width: 600,
        height: 500,
        address: "",
        details: "",
        issueType: "",
        lngLat: "",
        uploadedFileCloudinaryUrl: "",
        selectValue: ""
      }
    };
    this.handleDropChange = this.handleDropChange.bind(this);
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
        issueType: this.state.selectValue,
        lngLat: this.state.lngLat,
        picture: this.state.uploadedFileCloudinaryUrl,
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
  //image uploading
  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  }
  handleImageUpload(file) {
    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
      .field("file", file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== "") {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
      }
    });
  }

  handleDropChange(e) {
    this.setState({ selectValue: e.target.value });
  }

  render() {
    const { viewport } = this.state;
    return (
      <React.Fragment>
        <div className="navUpLoad">
          <div className="cards">
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
                  placeholder="Click map of specific location"
                />
              </div>
              <div className="form-group">
                <Dropdown
                  className="submitBtn"
                  isOpen={this.state.dropdownOpen}
                  toggle={this.toggle}

                  // onClick={this.handleDropChange}
                >
                  <DropdownToggle caret>
                    Issue type: {this.state.selectValue}
                  </DropdownToggle>
                  <DropdownMenu id="dropdown">
                    <DropdownItem
                      header
                      value="0"
                      onClick={this.handleDropChange}
                    >
                      Choose issue type
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem value="Road" onClick={this.handleDropChange}>
                      Road Condition
                    </DropdownItem>
                    <DropdownItem
                      value="Sidewalk"
                      onClick={this.handleDropChange}
                    >
                      Side Walk
                    </DropdownItem>
                    <DropdownItem
                      value="Traffic Light"
                      onClick={this.handleDropChange}
                    >
                      Traffic Light
                    </DropdownItem>
                    <DropdownItem value="NES" onClick={this.handleDropChange}>
                      Power line/telephone pole
                    </DropdownItem>
                    <DropdownItem
                      value="Metro Water"
                      onClick={this.handleDropChange}
                    >
                      Water line/Sewer
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
              {/* <div>Selected value is : {this.state.selectValue}</div> */}
              <button
                type="submit"
                onClick={this.constructNewIssue}
                className="btn btn-primary"
              >
                Submit
              </button>
            </form>
          </div>
          <div className="cards">
            <div className="formGroupMap">
              <ReactMapGL
                {...viewport}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                // containerStyle={{
                //   height: "auto",
                //   width: "auto"
                // }}
                mapboxApiAccessToken={API_KEY}
                onViewportChange={viewport => this.setState({ viewport })}
                onClick={evt => this.onClickMap(evt)}
              >
                {/* <div style={{ position: "absolute", right: 0 }} /> */}
                <div className="nav" style={navStyle}>
                  <NavigationControl />
                  <GeolocateControl />
                </div>
              </ReactMapGL>
            </div>
          </div>
          <div className="cards">
            <div className="FileUpload">
              {/* <div > */}
              <Dropzone
                onDrop={this.onImageDrop.bind(this)}
                accept="image/*"
                multiple={false}
              >
                {({ getRootProps, getInputProps }) => {
                  return (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      {
                        <button className="btn btn-primary">
                          Drag and drop or click to select image to upload.
                        </button>
                      }
                    </div>
                  );
                }}
              </Dropzone>
              {/* </div> */}

              <div>
                {this.state.uploadedFileCloudinaryUrl === "" ? null : (
                  <div className="formGroupPicture">
                    {/* <p>{this.state.uploadedFile.name}</p> */}
                    <img
                      src={this.state.uploadedFileCloudinaryUrl}
                      style={{ width: "380px", height: "350px" }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
