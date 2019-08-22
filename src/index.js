import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Apollo Imports
import { ApolloProvider } from "@apollo/react-hooks";

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";

// Components
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";

// Styles
import "./styles/index.scss";
require("dotenv").config();

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
  cache: new InMemoryCache(),
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    authLink,
    new HttpLink({
      uri: process.env.REACT_APP_SERVER_URL,
      credentials: ""
    })
  ])
});

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact activeClassName="active" path="/" component={Home} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route path="*" component={Home} />
        </Switch>
      </Router>
    );
  }
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
