import React from 'react'
import {Query} from 'react-apollo';

import Tabs from './Tabs';
import CURRENT_USER from '../queries/CurrentUser';
import Expense from './ExpenseCard';

export default class Main1 extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <Tabs>
                    <div label="Expenses">
                        <Query query={CURRENT_USER}>
                            {({loading, error, data: {
                                    me
                                }}) => {
                                if (loading) 
                                    return <div>Loading...</div>;
                                if (error) 
                                    return `Error! ${error.message}`;
                                return <div className="expenses-list">
                                    {me
                                        .expenses
                                        .reverse()
                                        .map((item, index) => <Expense key={index} item={item}/>)}
                                </div>;
                            }}
                        </Query>
                    </div>
                    <div label="Insights">
                        Insights
                    </div>
                </Tabs>
            </div>
        );
    }
}