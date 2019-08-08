import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import IssueList from "./issues/issueList";
import Login from "./authentication/login";
import Welcome from "./authentication/welcome";
import Register from "./authentication/register";
import issueManager from "./modules/issueManager";
import loginManager from "./modules/loginManager";
import IssueEditForm from "./issues/issueEditForm";
import IssueForm from "./issues/newIssueForm";
import "./issues/issues.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default class ApplicationViews extends Component {
  state = {
    issues: [],
    lngLat: [],
    users: []
  };

  isAuthenticated = () => sessionStorage.getItem("userId") !== null;

  deleteIssue = issue => {
    console.log(this.state.issues)
    issueManager
      .delete("issues", issue)
      .then(() => issueManager.all("issues"))
      .then(data => {
        this.setState({ issues: data })
        // this.props.history.push("/issues")
      })
  }

  updateIssue = (resourse, editedIssueObject) => {
    return issueManager
      .put(resourse, editedIssueObject)
      .then(() => issueManager.all(resourse))
      .then(issues => {
        this.setState({
          issues: issues
        });
      });
  };
  addIssue = issue =>
    issueManager
      .post("issues", issue)
      .then(() => issueManager.all("issues"))
      .then(issues =>
        this.setState({
          issues: issues
        })
      );
  getUser = userName => {
    return loginManager.get("user", userName);
  };

  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path="/issues"
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
          exact
          path="/"
          render={props => {
            if (this.isAuthenticated()) {
              return <IssueForm {...props} addIssue={this.addIssue} />;
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
        <Route
          exact
          path="/issues/:issueId(\d+)/edit"
          render={props => {
            return <IssueEditForm {...props} updateIssue={this.updateIssue} />;
          }}
        />
        {/* <Route
          exact
          path="/imgUpload"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <Image
                  {...props}
                />
              );
            } else {
              return <Redirect to="/login" />;
            }
          }}
        /> */}
        <Route exact path="/login" component={Login} />
      </React.Fragment>
    );
  }
}
