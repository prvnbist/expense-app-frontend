import React, { Component } from "react";

import NavBar from "../components/NavBar";
import Tabs from "../components/Tabs";
import Login from "./Login";
import SignUp from "./SignUp";

export default class Home extends Component {
  render() {
    return (
      <div id="home">
        <NavBar />
        <Tabs>
          <div label="Log In">
            <Login {...this.props} />
          </div>
          <div label="Sign Up">
            <SignUp {...this.props} />
          </div>
        </Tabs>
      </div>
    );
  }
}
