import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom"
import "./index.css";
import Problems from "./problems";

ReactDOM.render(
  <Router>
    <Problems />
  </Router>,
  document.getElementById("root")
);
