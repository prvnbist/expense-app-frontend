import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Apollo Imports
import { ApolloProvider } from "react-apollo";
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink
} from "apollo-boost";

// Components
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";

// Styles
import "./styles/index.scss";
require("dotenv").config();
// Keys
const httpLink = new HttpLink({ uri: process.env.REACT_APP_SERVER_URL });

// Middleware to set the headers
const authLink = new ApolloLink((operation, forward) => {
  if (localStorage.getItem("access_token") !== undefined) {
    const token = localStorage.getItem("access_token");
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ""
      }
    });
    return forward(operation);
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  fetchOptions: {
    credentials: "include"
  },
  onError: ({ networkError }) => {
    if (networkError) console.log("Network Error", networkError);
  }
});

class App extends Component {
  render() {
    return (
      <Fragment>
        <ApolloProvider client={client}>
          <Router>
            <Switch>
              <Route exact activeClassName="active" path="/" component={Home} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route path="*" component={Home} />
            </Switch>
          </Router>
        </ApolloProvider>
      </Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
