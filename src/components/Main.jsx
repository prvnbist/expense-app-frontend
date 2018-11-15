import React, {Component} from 'react';
import {Query} from 'react-apollo';
import CURRENT_USER from '../queries/CurrentUser';
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
                            {me.expenses.map(item => <div  className="expense-card" key={item.id}>
                                <div>
                                    <span className="spentOn">{item.spentOn}</span>
                                    <span className="description">{item.description}</span>
                                </div>
                                <div>
                                    <span className="category">{item.category}</span>
                                    <span className="createdAt">{new Date(Number(item.createdAt)).toTimeString().slice(0,5)}  •  {new Date(Number(item.createdAt)).toDateString().replace(' 2018','')}</span>
                                    {console.log(item.createdAt)}
                                </div>
                                <div>
                                    <span className="amount">{item.amount}</span>
                                </div>
                            </div>)}
                        </div>;
                    }}
                </Query>
            </main>
        )
    }
}
