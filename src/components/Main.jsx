import React, {Component} from 'react';
import {Query, Mutation} from 'react-apollo';

import CURRENT_USER from '../queries/CurrentUser';
import DELETE_EXPENSE_MUTATION from '../queries/DeleteExpense';

import AddExpense from './AddExpense';
import ShowStats from './ShowStats';

// const expensesList = [
//     "Mortgage",
//     "Rent",
//     "Property Taxes",
//     "House/Tenant Insurance",
//     "Utility bills",
//     "Lease/Car Loan Payment",
//     "Vehicle Insurance",
//     "Life/Disability/Extended Health",
//     "Bank Fees",
//     "Debt Payments",
//     "Salary",
//     "Electronics",
//     "Groceries",
//     "Personal Care",
//     "Fuel/Public Transportation",
//     "Parking",
//     "Clothing & Shoes",
//     "Daycare",
//     "Work Lunches & Snacks",
//     "Eating Out",
//     "Entertainment",
//     "Tobacco/Alcohol",
//     "Lottery",
//     "Babysitting",
//     "Sports & Recreation",
//     "Hair Care/Salon Services",
//     "Magazines/Newspapers/Books",
//     "Children’s Lessons & Activities",
//     "Furniture"
// ];
export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPopup: false,
            showStats: false,
            searchText: '',
            fromAmount: '',
            toAmount: '',
            fromDate:'',
            toDate:''
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
        let {searchText} = this.state;
        return (
            <main className='container'>
                {this.state.showPopup
                    ? <AddExpense closePopUp={this.toggleExpense}/>
                    : null}
                {this.state.showStats
                    ? <ShowStats closePopUp={this.toggleStats}/>
                    : null}
                <div id="section-title">
                    <div
                        style={{
                        display: "flex",
                        alignItems: "center"
                    }}>
                        <h1>EXPENSES</h1>
                        <button onClick={this.toggleExpense}>
                            <i className='material-icons'>add</i>
                        </button>
                    </div>
                    <h1
                        onClick={this.toggleStats}
                        id="showStatsButton"
                        style={{
                        marginRight: 0,
                        color: "#318FFE",
                        cursor: "pointer"
                    }}>STATS</h1>
                </div>
                <div id="content">
                    <div id="filters">
                        <div id="search">
                            <label htmlFor="searchInput">SEARCH</label>
                            <input
                                type="text"
                                id="searchInput"
                                placeholder="Search..."
                                onChange={e => this.setState({searchText: e.target.value.toLowerCase()})}/>
                        </div>
                        {/* <hr
                            style={{
                            opacity: '0.1',
                            marginBottom: 20
                        }}/> */}
                        {/* <div id="filterTypes">
                            <div id="filterByCost">
                                <label>BY AMOUNT</label>
                                <input type="text" id="amountRangeFrom" placeholder="From" onChange={e => this.setState({fromAmount: e.target.value})}/>
                                <input type="text" id="amountRangeTo" placeholder="To"  onChange={e => this.setState({toAmount: e.target.value})}/>
                            </div>
                            <div id="filterByCategory">
                                <label>BY CATEGORY</label>
                                <select name="selectCategory" placeholder="Choose a category">
                                    {expensesList.map((item, index) => <option key={index} value={item.toLowerCase()}>{item}</option>)}
                                </select>
                            </div>
                            <div id="filterByDate">
                                <label>BY DATE</label>
                                <input type="text" id="dateRangeFrom" placeholder="From" onFocus={e => this.setState({fromDate: e.target.value})}/>
                                <input type="text" id="dateRangeTo" placeholder="To" onChange={e => this.setState({toDate: e.target.value})}/>
                            </div>
                            <button>APPLY</button>
                        </div> */}
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
                            
                            let searchExpense = me
                                .expenses
                                .filter(i => i.spentOn.toLowerCase().includes(searchText));

                            return <div className="expenses-list">
                                {searchExpense
                                    .reverse()
                                    .map(item => <div
                                        className="expense-card"
                                        key={item.id}
                                        style={{
                                        borderTop: item.type === "plus"
                                            ? '3px solid #318FFE'
                                            : '3px solid #EC1A1A'
                                    }}>
                                        <div className='top-row'>
                                            <span title={item.spentOn}className="spentOn">{item.spentOn.length > 30 ? item.spentOn.slice(0,20)+'...' : item.spentOn}</span>
                                            <div
                                                style={{
                                                display: "flex",
                                                alignItems: "center"
                                            }}>
                                                <span
                                                    className="amount"
                                                    style={{
                                                    color: item.type === "plus"
                                                        ? '#318FFE'
                                                        : '#EC1A1A'
                                                }}>{item.type === "plus"
                                                        ? '+'
                                                        : '-'} {parseInt(item.amount).toLocaleString("en-IN", {
                                                        style: 'currency',
                                                        currency: "INR"
                                                    })}</span>
                                                <Mutation
                                                    mutation={DELETE_EXPENSE_MUTATION}
                                                    variables={{
                                                    id: item.id
                                                }}
                                                    onCompleted={data => this.reLoadPageWithNewData(data)}>
                                                    {mutation => <button className="deleteExpense" onClick={mutation}>
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
                                                <i className='material-icons'>description</i>{item.description
                                                    ? item.description
                                                    : 'No description.'}</span>
                                        </div>
                                    </div>)}
                            </div>;
                        }}
                    </Query>
                </div>
            </main>
        )
    }
}
