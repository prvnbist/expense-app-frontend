import React, {Component} from 'react';
import {Query} from 'react-apollo';

import CURRENT_USER from '../queries/CurrentUser';

import AddExpense from './AddExpense';
import ShowStats from './ShowStats';
import Expense from './ExpenseCard';

const expensesList = [
    "Mortgage",
    "Rent",
    "Property Taxes",
    "House/Tenant Insurance",
    "Utility bills",
    "Lease/Car Loan Payment",
    "Vehicle Insurance",
    "Life/Disability/Extended Health",
    "Bank Fees",
    "Debt Payments",
    "Salary",
    "Electronics",
    "Groceries",
    "Personal Care",
    "Fuel/Public Transportation",
    "Parking",
    "Clothing & Shoes",
    "Daycare",
    "Work Lunches & Snacks",
    "Eating Out",
    "Entertainment",
    "Tobacco/Alcohol",
    "Lottery",
    "Babysitting",
    "Sports & Recreation",
    "Hair Care/Salon Services",
    "Magazines/Newspapers/Books",
    "Children’s Lessons & Activities",
    "Furniture"
];

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPopup: false,
            showStats: false,
            searchText: '',
            fromAmount: '',
            toAmount: '',
            fromDate: '',
            toDate: '',
            byCategory: ''
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
    clearFilters = () => {
        this.setState({searchText: '', byCategory: '', fromAmount: '', toAmount: ''})
    }
    render() {
        let {searchText, fromAmount, toAmount, byCategory} = this.state;
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
                    <div
                        style={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        {/* <i className="material-icons" onClick={this.viewList}>menu</i>
                        <i style={{margin:'0 16px'}} className="material-icons" onClick={this.viewGrid}>apps</i> */}
                        <h1
                            onClick={this.toggleStats}
                            id="showStatsButton"
                            style={{
                            marginRight: 0,
                            color: "#318FFE",
                            cursor: "pointer"
                        }}>STATS</h1>
                    </div>
                </div>
                <div id="content">
                    <div id="filters">
                        <div id="search">
                            <label htmlFor="searchInput">SEARCH</label>
                            <input
                                type="text"
                                id="searchInput"
                                placeholder="Search..."
                                value={searchText}
                                onChange={e => this.setState({
                                searchText: e
                                    .target
                                    .value
                                    .toLowerCase()
                            })}/>
                        </div>
                        <hr
                            style={{
                            opacity: '0.1',
                            marginBottom: 20
                        }}/>
                        <div id="filterTypes">
                            <div id="filterByCost">
                                <label>BY AMOUNT</label>
                                <input
                                    type="text"
                                    id="amountRangeFrom"
                                    placeholder="Min"
                                    value={fromAmount}
                                    onChange={e => this.setState({fromAmount: e.target.value})}/>
                                <input
                                    type="text"
                                    id="amountRangeTo"
                                    placeholder="Max"
                                    value={toAmount}
                                    onChange={e => this.setState({toAmount: e.target.value})}/>
                            </div>
                            <div id="filterByCategory">
                                <label>BY CATEGORY</label>
                                <select
                                    name="selectCategory"
                                    placeholder="Choose a category"
                                    onChange={e => this.setState({byCategory: e.target.value})}>
                                    {expensesList.map((item, index) => <option
                                        key={index}
                                        onChange={e => this.setState({month: e.target.value})}
                                        value={item.toLowerCase()}>{item}</option>)}
                                </select>
                            </div>
                            {/* <div id="filterByDate">
                                <label>BY DATE</label>
                                <input type="text" id="dateRangeFrom" placeholder="From" onFocus={e => this.setState({fromDate: e.target.value})}/>
                                <input type="text" id="dateRangeTo" placeholder="To" onChange={e => this.setState({toDate: e.target.value})}/>
                            </div> */}
                            <button onClick={this.clearFilters}>CLEAR</button>
                        </div>
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
                            
                            let expensesList = me
                                .expenses
                                .filter(i => i.spentOn.toLowerCase().includes(searchText))
                                .filter(i => byCategory !== '' ? i.category.toLowerCase() === byCategory : i.category.toLowerCase() !== '')
                                .filter(i => Number(i.amount) >= (fromAmount !== '' ? Number(fromAmount) : 0))
                                .filter(i => Number(i.amount) <= (toAmount !== '' ? Number(toAmount) : Number(`4${ "0".repeat(20)}`)));
                            // console.table(expensesList)
                            return <div className="expenses-list">
                                {expensesList.reverse().map((item, index) => <div key={index} className="expenses-section">
                                    {/* <h1>TODAY</h1> */}
                                    <Expense item={item}/>
                                </div>)}
                            </div>;
                        }}
                    </Query>
                </div>
            </main>
        )
    }
}
