import React, { Component } from "react"
// import "./issue.css"
import IssueCard from "./issueCard"

export default class IssueList extends Component {
    render () {
        return (
            <React.Fragment>
                <div className="issueButton">
                    <button type="button"
                            onClick={()=> this.props.history.push("/issues/new")}
                            className="btn btn-success">
                        Submit Issue
                    </button>
                </div>
                <section className="issues">
                {
                    this.props.issues.map(issue =>
                        <IssueCard key={issue.id} issue={issue} {...this.props} />
                    )
                }
                </section>
            </React.Fragment>
        )
    }
}