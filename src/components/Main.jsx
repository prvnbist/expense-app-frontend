import React, {Component} from 'react';
import {Query, Mutation} from 'react-apollo';

import CURRENT_USER from '../queries/CurrentUser';
import DELETE_EXPENSE_MUTATION from '../queries/DeleteExpense';

import AddExpense from './AddExpense';
import ShowStats from './ShowStats';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPopup: false,
            showStats: false
        }
    }
    toggleExpense = () => {
        this.setState({
            showPopup: !this.state.showPopup
        })
    }
    toggleStats = () => {
        this.setState({
            showStats: !this.state.showStats
        })
    }
    reLoadPageWithNewData = _ => {
        window
            .location
            .reload();
    }
    render() {
        return (
            <main className='container'>
                {this.state.showPopup
                    ? <AddExpense closePopUp={this.toggleExpense}/>
                    : null}
                {this.state.showStats
                    ? <ShowStats closePopUp={this.toggleStats}/>
                    : null}
                <div id="section-title">
                    <div style={{display:"flex",alignItems:"center"}}>
                        <h1>EXPENSES</h1>
                        <button onClick={this.toggleExpense}>
                            <i className='material-icons'>add</i>
                        </button>
                    </div>
                    <h1 onClick={this.toggleStats} style={{marginRight:0,color: "#318FFE", cursor:"pointer"}}>STATS</h1>
                </div>
                <Query query={CURRENT_USER}>
                    {({loading, error, data: {
                            me
                        }}) => {
                        if (loading) 
                            return <img
                                src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/cd514331234507.564a1d2324e4e.gif"
                                alt=""/>;
                        if (error) 
                            return `Error! ${error.message}`;
                        return <div>
                            {me
                                .expenses
                                .reverse()
                                .map(item => <div className="expense-card" key={item.id}
                                    style={{
                                        borderTop: item.type === "plus"
                                            ? '3px solid #318FFE'
                                            : '3px solid #EC1A1A'
                                    }}>
                                    <div className='top-row'>
                                        <span className="spentOn">{item.spentOn}</span>
                                        <div style={{display:"flex",alignItems:"center"}}>
                                            <span
                                                className="amount"
                                                style={{
                                                color: item.type === "plus"
                                                    ? '#318FFE'
                                                    : '#EC1A1A'
                                            }}>{item.type === "plus"
                                                    ? '+'
                                                    : '-'} {parseInt(item.amount).toLocaleString('en-IN')} INR</span>
                                            <Mutation
                                                mutation={DELETE_EXPENSE_MUTATION}
                                                variables={{
                                                    id: item.id
                                                }}
                                                onCompleted={data => this.reLoadPageWithNewData(data)}>
                                                {mutation => <button
                                                    className="deleteExpense"
                                                    onClick={mutation}>
                                                    <i className="material-icons">delete</i>
                                                </button>}
                                            </Mutation>
                                        </div>
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
                                        <span className="description">
                                            <i className='material-icons'>description</i>{item.description ? item.description : 'No description.'}</span>
                                    </div>
                                </div>)}
                        </div>;
                    }}
                </Query>
            </main>
        )
    }
}
