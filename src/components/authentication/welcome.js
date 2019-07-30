import React, { Component } from "react"
import { Link } from "react-router-dom"
import {withRouter} from 'react-router-dom'


 class Welcome extends Component {

    render() {
        return (
            <form>
                <h1 className="h3 mb-3 font-weight-normal">Welcome to Our Issues Please Register or Login</h1>
                <button><Link to="/register">Register</Link></button>
                <button><Link to="/login">Login</Link></button>
            </form>
        )
    }
}
export default withRouter(Welcome)