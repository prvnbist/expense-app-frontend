import React, {Component} from 'react';

import {Mutation} from 'react-apollo';

import ADD_EXPENSE_MUTATION from '../queries/AddExpense';

export default class AddExpense extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spentOn: '',
            category: 'grocery',
            amount: '',
            type: 'plus',
            description: ''
        }
    }
    reLoadPageWithNewData = _ => {
        window.location.reload();
    }
    render() {
        const {spentOn, category, amount, type,description} = this.state;
        const fixedExpensesList = [
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
            "Electronics"
        ];
        const variableExpensesList = [
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
        return (
            <div className="popup-bg" >
                <div id="expense-popup-card">
                    <div id="heading">
                        <span>Add Expense</span>
                        <button onClick={this.props.closePopUp}>
                            <i className="material-icons">close</i>
                        </button>
                    </div>
                        <div className="row span-8-4">
                            <div className="col">
                                <label>SPENT ON/EARNED</label>
                                <input
                                    value={spentOn}
                                    onChange={e => this.setState({spentOn: e.target.value})}
                                    type="text"
                                    placeholder="Enter the article"
                                    required/>
                            </div>
                            <div className="col">
                                <label>CATEGORY</label>
                                <select
                                    className="select-dropdown"
                                    defaultValue={category}
                                    onChange={e => this.setState({category: e.target.value})}>
                                    {fixedExpensesList.map((item, index) => <option key={index} value={item}>{item}</option>)}
                                    {variableExpensesList.map((item, index) => <option key={index} value={item}>{item}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="row span-4-8" style={{alignItems:'flex-end'}}>
                            <div className="col">
                                <label>AMOUNT</label>
                                <select
                                    style={{
                                    fontSize: "18px"
                                }}
                                    className="select-dropdown"
                                    defaultValue={type}
                                    onChange={e => this.setState({type: e.target.value})}
                                    required>
                                    <option value="plus">Earned</option>
                                    <option value="minus">Spent</option>
                                </select>
                            </div>
                            <div className="col">
                                <input
                                    value={amount}
                                    onChange={e => this.setState({amount: e.target.value.replace(/[^0-9]/g, '')})}
                                    type="text"
                                    placeholder="Enter the amount..."
                                    required/>
                            </div>
                        </div>
                        <div className='row span-12'>
                            <div className='col'>
                                <label>DESCRIPTION</label>
                                <textarea
                                    maxLength="60"
                                    value={description}
                                    onChange={e => this.setState({description: e.target.value})}
                                    type="text"
                                    placeholder="Enter the description..."
                                    required/>
                            </div>
                        </div>
                        <Mutation
                            mutation={ADD_EXPENSE_MUTATION}
                            variables={{spentOn, category, amount, description, type}} 
                            onCompleted={data => this.reLoadPageWithNewData(data)}>
                            {mutation => <button className='submit-expense' onClick={mutation}>ADD</button>}
                        </Mutation>
                </div>
            </div>
        )
    }
}
