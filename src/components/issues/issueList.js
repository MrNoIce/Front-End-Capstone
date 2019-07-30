import React, { Component } from "react";
import IssueCard from "./issueCard";
import issueManager from "../modules/issueManager";
import "./issues.css"



let userId = sessionStorage.getItem("userId");

export default class IssueList extends Component {
  state = {
    issues: []
  };
log = (thing) => {
    console.log(thing)
}
getUserIssues = () => {
    issueManager.all(parseInt(sessionStorage.getItem("userId")))
      .then(userIssues => this.setState({issues: userIssues}))
  }
  componentDidMount() {
    this.getUserIssues(userId);
  }
  render() {
      {this.log(this.state.issues)}
    return (
      <React.Fragment>
        <div className="issueButton">
          <button
            type="button"
            onClick={() => this.props.history.push("/issues/new")}
            className="btn btn-primary"
          >
            Add New Article
          </button>
        </div>
        <section className="issues">
          {this.state.issues.map(issue => (
            <IssueCard key={issue.id} issue={issue} {...this.props} />
          ))}
        </section>
      </React.Fragment>
    );
  }
}
