import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import IssueList from "./issues/issueList";
import Login from "./authentication/login";
import Welcome from "./authentication/welcome";
import Register from "./authentication/register";
import issueManager from "./modules/issueManager"
import loginManager from "./modules/loginManager"
import IssueEditForm from "./issues/issueEditForm"

export default class ApplicationViews extends Component {
  state = {
    issues: [],
    users: []
  };

//   getUserIssues = () => {
//     issueManager
//       .getAll(parseInt(sessionStorage.getItem("userId")))
//       .then(userIssues => this.setState({ issues: userIssues }));
//   };

  isAuthenticated = () => sessionStorage.getItem("userId") !== null;

//   componentDidMount() {
//     const newState = {};

//     fetch("http://localhost:5002/issues")
//       .then(r => r.json())
//       .then(issues => (newState.issues = issues))
//       .then(() => this.setState(newState));
//   }

  getUser = userName => {
    return loginManager.get("user", userName);
  };

  render() {
    return (
      <React.Fragment>
        {/* <Route
          exact
          path="/"
          render={props => {
            return <IssueList issues={this.state.issues} />;
          }}
        /> */}
        <Route
          exact
          path="/"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <IssueList
                  {...props}
                  getUserIssues={this.getUserIssues}
                  deleteIssue={this.deleteIssue}
                />
              );
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
        <Route
          path="/issues/:issueId(\d+)/edit"
          render={props => {
            return (
              <IssueEditForm {...props} updateIssue={this.updateIssue} />
            );
          }}
        />
        <Route exact path="/login" component={Login} />
      </React.Fragment>
    );
  }
}
