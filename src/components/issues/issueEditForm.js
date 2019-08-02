import React, { Component } from "react";
import issueManager from "../modules/issueManager";
import "./issues.css"

export default class IssueEditForm extends Component {
  // Set initial state
  state = {
    userId: "",
    address: "",
    details: "",
    issueTypeId: "",
    lngLat: ""
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
        issueTypeId: this.state.issueTypeId,
        lngLat: this.state.lngLat,
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
        userTypeId: issue.userTypeId,
        lngLat: issue.lngLat
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
            <label htmlFor="issueTypeId">Issue Type</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="issueTypeId"
              value={this.state.issueTypeId}
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
