import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import IssueList from "./issues/issueList";
import Login from "./authentication/login";
import Welcome from "./authentication/welcome";
import Register from "./authentication/register";
import issueManager from "./modules/issueManager";
import loginManager from "./modules/loginManager";
import IssueEditForm from "./issues/issueEditForm";
import IssueForm from "./issues/newIssueForm"
import "./issues/issues.css";
import Map from "./map/map"
import "bootstrap/dist/css/bootstrap.min.css";



export default class ApplicationViews extends Component {
  state = {
    issues: [],
    lngLat: [],
    users: []
  };

  //   getUserIssues = () => {
  //     issueManager
  //       .getAll(parseInt(sessionStorage.getItem("userId")))
  //       .then(userIssues => this.setState({ issues: userIssues }));
  //   };

  isAuthenticated = () => sessionStorage.getItem("userId") !== null;

//   addLocation = lngLat =>
//     issueManager
//       .post("issues", lngLat)
//       .then(() => issueManager.all("issues"))
//       .then(lngLat =>
//         this.setState({
//           lngLat: lngLat
//         })
//       );

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
          path="/newIssue"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <IssueForm
                  {...props}
                  addIssue={this.addIssue}
                />
              );
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
        <Route
          exact
          path="/map"
          component={Map}
        />
        <Route exact path="/login" component={Login} />
      </React.Fragment>
    );
  }
}
