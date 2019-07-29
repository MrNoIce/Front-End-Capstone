import React, { Component } from "react";
import { Link } from "react-router-dom";
// import "./issue.css";

export default class IssueCard extends Component {
  render() {
    return (
      <div key={this.props.issue.id} className="card">
        <div className="card-body">
          <div className="card-title">
            <img src={"..."} className="" alt=""/>
            <h5>{this.props.issue.address}</h5>
            <h5>{this.props.issue.issueTypeId}</h5>
            <Link className="nav-link" to={`/issue/${this.props.issue.id}`}>
              Details
            </Link>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                this.props.history.push(
                  `/issue/${this.props.issue.id}/edit`
                );
              }}
            >
              Edit
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
