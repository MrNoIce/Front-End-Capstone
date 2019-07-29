import React, { Component} from "react"
import NavBar from "./components/nav/navbar"
import ApplicationViews from "./components/applicationViews"
import "./problems.css"
// import "bootstrap/dist/css/bootstrap.min.css"

class Problems extends Component {
    render() {
        return (
            <React.Fragment>
                <NavBar />
                <ApplicationViews />
            </React.Fragment>
        )
    }
}

export default Problems
