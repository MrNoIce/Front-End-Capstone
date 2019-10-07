import React, { Component } from "react";
import IssueCard from "./issueCard";
import issueManager from "../modules/issueManager";
import "./issues.css"


//getting the user to display only their issues
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
  deleteIssue = issue => {
    issueManager
      .delete("issues", issue)
      .then(() => issueManager.all(+sessionStorage.getItem("userId")))
      .then(data => {
        this.setState({ issues: data })
      })
      .then(() => console.log(this.state))
      .then(() =>  this.props.history.push("/issues"))
  }
  componentDidMount() {
    console.log("issue list component mount")
    this.getUserIssues(userId);
  }
  render() {
    console.log("issue list render")
    return (
      <React.Fragment>
        <section className="issues">
          {this.state.issues.map(issue => (
            <IssueCard key={issue.id} issue={issue} {...this.props} deleteIssue={this.deleteIssue} />
          ))}
        </section>
      </React.Fragment>
    );
  }
}
