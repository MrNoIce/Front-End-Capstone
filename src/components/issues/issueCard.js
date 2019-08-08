import React, { Component } from "react";
import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./issues.css";

const emailTo = "bemybanker@gmail.com";
const emailCC = "bemybanker@gmail.com";
const emailSub = "insert issue subject";

export default class IssueCard extends Component {
  handleDelete = () => {this.props.deleteIssue(this.props.issue.id)}
  render() {
    const emailBody = [
      this.props.issue.address,
      this.props.issue.details,
      this.props.issue.lngLat,
      this.props.issue.issueType,
      this.props.issue.picture
    ];
    return (
      <div key={this.props.issue.id} className="card">
        <div className="card-body">
          <div className="card-title">
            <div className="imageCard">
              <img
                src={this.props.issue.picture}
                style={{ width: "300px", height: "300px" }}
                className=""
                alt="..."
              />
            </div>
            <h5 style={{width:"300px"}}>Address: {this.props.issue.address}</h5>
            <h5 style={{width:"300px"}}>Issue type: {this.props.issue.issueType}</h5>
            <h6 style={{width:"300px"}}>Details: {this.props.issue.details}</h6>
            <h6 style={{width:"300px"}}>Specific Location: {this.props.issue.lngLat} </h6>
            {/* <Link className="nav-link" to={`/issue/${this.props.issue.id}`}>
              Details
            </Link> */}

            <button
              type="button"
              className="btn btn-info"
              onClick={() => {
                this.props.history.push(`/issues/${this.props.issue.id}/edit`);
              }}
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() =>
                window.open(
                  "mailto:" +
                    emailTo +
                    "?cc=" +
                    emailCC +
                    "&subject=" +
                    emailSub +
                    "&body=" +
                    emailBody,
                  "_self"
                )
              }
              className="btn btn-primary"
            >
              Email
            </button>
            <button text="Delete"
              onClick={this.handleDelete}
              className="card-link">
                Delete
                </button>
          </div>
        </div>
      </div>
    );
  }
}
