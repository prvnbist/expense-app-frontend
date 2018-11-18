import React, {Component} from 'react';
import {Query} from 'react-apollo';
import CURRENT_USER from '../queries/CurrentUser';

import AddExpense from './AddExpense';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPopup: false
        }
    }
    toggleExpense = () => {
        this.setState({
            showPopup: !this.state.showPopup
        })
    }
    render() {
        return (
            <main className='container'>
                {this.state.showPopup
                    ? <AddExpense closePopUp={this.toggleExpense}/>
                    : null}
                <div id="section-title">
                    <h1>EXPENSES</h1>
                    <button onClick={this.toggleExpense}>
                        <i className='material-icons'>add</i>
                    </button>
                </div>
                <Query query={CURRENT_USER}>
                    {({loading, error, data: {
                            me
                        }}) => {
                        if (loading) 
                            return "Loading...";
                        if (error) 
                            return `Error! ${error.message}`;
                        return <div>
                            {me
                                .expenses
                                .map(item => <div className="expense-card" key={item.id}>
                                    <div className='top-row'>
                                        <span className="spentOn">{item.spentOn}</span>
                                        <span className="amount">{parseInt(item.amount).toLocaleString('en-IN')} INR</span>
                                    </div>
                                    <div className='mid-row'>
                                        <span className="category">
                                            <i className='material-icons'>category</i>
                                            <span>{item.category}</span>
                                        </span>
                                        <span className="time">
                                            <i className='material-icons'>access_time</i>
                                            <span>
                                            {new Date(Number(item.createdAt))
                                                .toTimeString()
                                                .slice(0, 5)}
                                            </span>
                                        </span>
                                        <span className="date">
                                            <i className='material-icons'>event</i>
                                            <span>{new Date(Number(item.createdAt))
                                                .toDateString()
                                                .replace(' 2018', '')}</span>
                                        </span>
                                    </div>
                                    <div className='bottom-row'>
                                        <span className="description"><i className='material-icons'>description</i>{item.description}</span>
                                    </div>
                                </div>)}
                        </div>;
                    }}
                </Query>
            </main>
        )
    }
}
