import { Route } from 'react-router-dom'
import React, { Component } from "react"
import IssueList from './issues/issueList'


export default class ApplicationViews extends Component {
    state = {
        issues: [],
        users: []
    }

    componentDidMount() {
        const newState = {}

        fetch("http://localhost:5002/issues")
            .then(r => r.json())
            .then(issues => newState.issues = issues)
            .then(() => this.setState(newState))
    }


    render() {
        return (
            <React.Fragment>
                <Route exact path="/" render={(props) => {
                    return <IssueList issues={this.state.issues} />
                }} />
            </React.Fragment>
        )
    }
}