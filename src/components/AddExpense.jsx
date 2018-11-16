import React, {Component} from 'react';

export default class AddExpense extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spentOn: '',
            category: 'grocery',
            amount:'',
            plusminus:'plus',
        }
    }
    render() {
        const {spentOn, category, amount, plusminus} = this.state;
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
            "Debt Payments"
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
            "Children’s Lessons & Activities"
        ];
        return (
            <div id="add-expense-wrapper">
                <div id="expense-popup-card">
                    <div id="left">Yo</div>
                    <div id="right">
                        <div id="heading">
                            <span>Add Expense</span>
                            <button onClick={this.props.closePopUp}>
                                <i className="material-icons">close</i>
                            </button>
                        </div>
                        <form>
                            <div className="row span-8-4">
                                <div className="col">
                                    <label>SPENT ON/EARNED</label>
                                    <input
                                        value={spentOn}
                                        onChange={e => this.setState({spentOn: e.target.value})}
                                        type="text"
                                        placeholder="Enter the article"/>
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
                            <div className="row span-2-10">
                                <div className="col">
                                    <label>AMOUNT</label>
                                    <select
                                        style={{fontSize:"32px"}}
                                        className="select-dropdown"
                                        defaultValue={plusminus}
                                        onChange={e => this.setState({plusminus: e.target.value})}>
                                        <option value="plus">+</option>
                                        <option value="minus">-</option>
                                    </select>
                                </div>
                                <div className="col">
                                    <input
                                        value={amount}
                                        onChange={e => this.setState({amount: e.target.value})}
                                        type="text"
                                        placeholder="Enter the amount..."/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
