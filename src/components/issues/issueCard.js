import React, { Component } from "react";
import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./issues.css"

const emailTo = "bemybanker@gmail.com"
const emailCC = "bemybanker@gmail.com"
const emailSub = "insert issue subject"
const emailBody = "insert issue details and location"

export default class IssueCard extends Component {
  render() {
    return (
      <div key={this.props.issue.id} className="card">
        <div className="card-body">
          <div className="card-title">
            <img src={this.props.issue.picture} className="" alt="..."/>
            <h5>Address: {this.props.issue.address}</h5>
            <h5>Issue type: {this.props.issue.issueTypeId}</h5>
            <h6>Details: {this.props.issue.details}</h6>
            <h6>Specific Location: {this.props.issue.lngLat} </h6>
            {/* <Link className="nav-link" to={`/issue/${this.props.issue.id}`}>
              Details
            </Link> */}
            <button
              type="button"
              className="btn btn-info"
              onClick={() => {
                this.props.history.push(
                  `/issues/${this.props.issue.id}/edit`
                );
              }}
            >
              Edit
            </button>
            <button
            type="button"
            onClick={() => window.open('mailto:'+emailTo+'?cc='+emailCC+'&subject='+emailSub+'&body='+emailBody, '_self')}
            className="btn btn-primary"
          >
            Email
          </button>
            <a
              href="#"
              onClick={() => this.props.deleteIssue(this.props.issue.id)}
              className="card-link"
            >
              Delete
            </a>
          </div>
        </div>
      </div>
    );
  }
}
