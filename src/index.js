import {BrowserRouter, Switch, Route} from 'react-router-dom';
import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';

// Apollo Imports
import {ApolloProvider} from "react-apollo";
import {ApolloClient, ApolloLink, InMemoryCache, HttpLink} from "apollo-boost";

// Components
import Dashboard from './components/Main.jsx';
import Login from './components/Login.jsx';

// Styles
import './styles/index.scss';

// Keys import {DB_URI} from './config/keys';

const httpLink = new HttpLink({uri: 'http://localhost:4000/graphql'});

// Middleware to set the headers
const authLink = new ApolloLink((operation, forward) => {
    if(localStorage.getItem('access_token') !== undefined) {
        const token = localStorage.getItem('access_token');
        console.log('token',token);
        operation.setContext({
            headers: {
                authorization: token ? `Bearer ${token}` : ''
            }
        });
        return forward(operation);
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

class App extends Component {
    render() {
        return (
            <Fragment>
                <ApolloProvider client={client}>
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/" component={Login}/>
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