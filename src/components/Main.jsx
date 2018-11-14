import React, {Component} from 'react';
import {Query} from 'react-apollo';
import CURRENT_USER from './queries/currentUser';
export default class Main extends Component {
    render() {
        return (
            <main>
                <div id="section-title">
                    <h1>EXPENSES</h1>
                    <button>+</button>
                </div>
                <Query query={CURRENT_USER}>
                    {({loading, error, data:{me}}) => {
                        if (loading) 
                            return "Loading...";
                        if (error) 
                            return `Error! ${error.message}`;
                        return <div>
                            {me.expenses.map(item => <div key={item.id}>
                                <span>{item.spentOn}</span>
                                <span>{item.category}</span>
                                <span>{item.description}</span>
                                <span>{item.amount}</span>
                            </div>)}
                        </div>;
                    }}
                </Query>
            </main>
        )
    }
}
