import React, { Component } from "react"
// import { Link } from "react-router-dom"
import {withRouter} from 'react-router-dom'
import LoginManager from "../modules/loginManager"

class Login extends Component {

    // Set initial state
  state = {
    username: '',
    password: ''
  };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  // Simplistic handler for login submit
  handleLogin = e => {
    e.preventDefault();

    LoginManager.get(this.state.username).then(result => {
      console.log('result', result);
      if (result.length > 0) {
        result.forEach(res => {
          sessionStorage.setItem(
            "userId", res.id
          );
        });

        alert("Hey there, welcome Back")

        this.props.history.push('/');
      } else {
        alert('Please Register');
      }
    });

    /*
            For now, just store the email and password that
            the customer enters into local storage.
        */
  };

  render() {
            return (
                <form onSubmit={this.handleLogin}>
                    <h1 className="h3 mb-3 font-weight-normal">Welcome to Our Issues Please Login</h1>
                    <label htmlFor="inputUsername">
                        Username
                    </label>
                    <input onChange={this.handleFieldChange} type="username"
                           id="username"
                           placeholder="Username"
                           required="" autoFocus="" />
                    <label htmlFor="inputPassword">
                        Password
                    </label>
                    <input onChange={this.handleFieldChange} type="password"
                           id="password"
                           placeholder="Password"
                           required="" />
                    <button type="submit">
                       Login
                    </button>
                </form>
            )
        }
}
export default withRouter(Login)
