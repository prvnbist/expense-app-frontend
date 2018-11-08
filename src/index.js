import {BrowserRouter, Switch, Route} from 'react-router-dom';
import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';

// Apollo Imports
import {ApolloProvider} from "react-apollo";
import {ApolloClient, ApolloLink, InMemoryCache, HttpLink} from "apollo-boost";

// Components
import Home from './components/Home.jsx';
import Dashboard from './components/Dashboard.jsx';
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';

// Styles
import './styles/index.scss';

// Keys 
import {REACT_APP_SERVER_URL} from './config/keys';
const httpLink = new HttpLink({uri: REACT_APP_SERVER_URL});

// Middleware to set the headers
const authLink = new ApolloLink((operation, forward) => {
    if (localStorage.getItem('access_token') !== undefined) {
        const token = localStorage.getItem('access_token');
        operation.setContext({
            headers: {
                authorization: token
                    ? `Bearer ${token}`
                    : ''
            }
        });
        return forward(operation);
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    fetchOptions: {
        credentials: 'include'
    },
    onError: ({networkError}) => {
        if (networkError) 
            console.log('Network Error', networkError);
        }
    });

class App extends Component {
    render() {
        return (
            <Fragment>
                <ApolloProvider client={client}>
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route exact activeClassName="active" path="/login" component={Login}/>
                            <Route exact activeClassName="active" path="/signup" component={SignUp}/>
                            <Route exact path="/dashboard" component={Dashboard}/>
                        </Switch>
                    </BrowserRouter>
                </ApolloProvider>
            </Fragment>
        );
    }
}

ReactDOM.render(
    <App/>, document.getElementById('root'));