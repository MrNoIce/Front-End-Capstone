import React, { Component } from "react";
import issueManager from "../modules/issueManager";
import "./issues.css"

export default class IssueEditForm extends Component {
  // Set initial state
  state = {
    userId: "",
    address: "",
    details: "",
    issueType: "",
    lngLat: "",
    picture: ""
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  updateExistingIssue = evt => {
    evt.preventDefault();

    if (!this.state.address === null) {
      window.alert("Hullo?");
    } else {
        console.log(this.state)
      const editedIssue = {
        id: this.props.match.params.issueId,
        address: this.state.address,
        details: this.state.details,
        issueType: this.state.issueType,
        lngLat: this.state.lngLat,
        picture: this.state.uploadedFileCloudinaryUrl,
        userId: parseInt(this.state.userId)
      };

      this.props
        .updateIssue("issues", editedIssue)
        .then(() => this.props.history.push("/issues"));
    }
  };

  componentDidMount() {
    issueManager.get("issues",this.props.match.params.issueId).then(issue => { console.log(issue)
      this.setState({
        userId: issue.userId,
        address: issue.address,
        details: issue.details,
        issueType: issue.issueType,
        lngLat: issue.lngLat,
        picture: issue.uploadedFileCloudinaryUrl,

      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <form className="issueForm">
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="address"
              value={this.state.address}
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
              value={this.state.details}
            />
          </div>
          <div className="form-group">
            <label htmlFor="issueType">Issue Type</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="issueType"
              value={this.state.issueType}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lngLat">Location</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="lngLat"
              value={this.state.lngLat}
            />
          </div>
          <div className="imageCard" >
              <img
                type="image"
                src={this.state.picture}
                style={{ width: "300px", height: "300px" }}
                className=""
                onChange={this.handleFieldChange}
              />
            </div>
          <button
            type="submit"
            onClick={this.updateExistingIssue}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}
