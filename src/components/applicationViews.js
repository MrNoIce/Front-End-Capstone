import { Route, Redirect, withRouter } from "react-router-dom";
import React, { Component } from "react";
import IssueList from "./issues/issueList";
import Login from "./authentication/login";
import issueManager from "./modules/issueManager";
import loginManager from "./modules/loginManager";
import IssueEditForm from "./issues/issueEditForm";
import IssueForm from "./issues/newIssueForm";
import "./issues/issues.css";
import "bootstrap/dist/css/bootstrap.min.css";


//Setting the state of the current variables
class ApplicationViews extends Component {
  state = {
    issues: [],
    lngLat: [],
    users: []
  };

  isAuthenticated = () => sessionStorage.getItem("userId") !== null;
//function to update the issue
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
  //function to add a new issue
  addIssue = issue =>
    issueManager
      .post("issues", issue)
      .then(() => issueManager.all("issues"))
      .then(issues =>
        this.setState({
          issues: issues
        })
      );
  //function to attach the user to the new issue being stored
  getUser = userName => {
    return loginManager.get("user", userName);
  };
//rendering and routes for the different tabs on navbar
  render() {
    console.log("app render trigger");
    return (
      <React.Fragment>
        <Route
          exact
          path="/issues"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <IssueList {...props} getUserIssues={this.getUserIssues} />
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
        <Route exact path="/login" component={Login} />
      </React.Fragment>
    );
  }
}

export default withRouter(ApplicationViews);
