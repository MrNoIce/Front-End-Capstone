import React, { Component } from "react"
import { Link } from "react-router-dom"
import {withRouter} from 'react-router-dom'
import LoginManager from "../modules/loginManager"

 class Register extends Component {

    // Set initial state needs to be empty
    state = {
        username: "",
        password: "",
        // existingUser: {}
    }

    addNewUser = (user) =>
        LoginManager.post(user)
        .then( newUser => {
        sessionStorage.setItem("userId", newUser.id)
        alert("Thank you for Registering")

      })


    // Update state whenever an input field is edited
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    // Simplistic handler for login submit
    saveNewUser = event => {
        event.preventDefault()
        const user = {
            username: this.state.username,
            password: this.state.password
        }

        this.addNewUser(user).then(() => this.props.history.push("/home"))
    }
    render() {
        return (
            <form className="RegisterForm">
                <h1 className="h3 mb-3 font-weight-normal">Welcome to Our Issues Please Register</h1>
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
                <button onClick={this.saveNewUser} type="submit">
                   Register
                </button>
            </form>
        )
    }
}
export default withRouter(Register)