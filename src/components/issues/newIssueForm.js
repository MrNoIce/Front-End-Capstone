import React, { Component } from "react";
// import ReactDOM, {render} from 'react-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import "./issues.css";

export default class IssueForm extends Component {
  // Set initial state
  state = {
    userId: "",
    address: "",
    details: "",
    issueTypeId: ""
  };

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
        userId: parseInt(sessionStorage.getItem("userId"))
      };

      // Create the article and redirect user to article list
      this.props.addIssue(issue).then(() => this.props.history.push("/issues"));
    }
  };

  render() {
    return (
      <React.Fragment>
        <form className="issueForm">
          <div className="form-group">
            <label htmlFor="address">Loaction of Issue</label>
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
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
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
      </React.Fragment>
    );
  }
}
