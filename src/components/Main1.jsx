import React from 'react'
import {Query} from 'react-apollo';

import Tabs from './Tabs';
import USERS_EXPENSES from '../queries/UsersExpenses';
import Expense from './ExpenseCard';
import Select from './Select';
import RadioGroup from './RadioGroup';

const Main1 = () => {
    const [filters,
        setFilters] = React.useState({search: "", category: "", type: ""});
    const selected = option => setFilters({
        ...filters,
        category: option
    });
    const typeSelected = option => setFilters({
        ...filters,
        type: option
    });
    const categories = [
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
    const radioOptions = [
        {
            value: "plus",
            text: "Earned"
        }, {
            value: "minus",
            text: "Spent"
        }
    ];
    console.log(filters)
    return (
        <div className="container-fluid">
            <Tabs>
                <div label="Expenses">
                    <div className="expense__options">
                        <div
                            style={{
                            display: "flex"
                        }}>
                            <div className='field'>
                                <input
                                    type="text"
                                    name="search"
                                    id="search"
                                    placeholder="Search expenses"
                                    value={filters.search}
                                    onChange={e => setFilters({
                                    ...filters,
                                    search: e.target.value
                                })}/>
                                <label htmlFor="username-input">
                                    <i className='material-icons'>search</i>
                                </label>
                            </div>
                            <Select
                                options={categories}
                                placeholder={"Select a category"}
                                selected={selected}/>
                            <RadioGroup options={radioOptions} name={"type"} selected={typeSelected}/>
                        </div>
                        <button type="button" className='btn btn__primary btn__icon'>
                            <i className="material-icons">add_circle</i>
                            <span>Add Expense</span>
                        </button>
                    </div>
                    <Query
                        query={USERS_EXPENSES}
                        variables={{
                        search: filters.search,
                        category: filters.category,
                        type: filters.type
                    }}>
                        {({loading, error, data}) => {
                            if (loading) 
                                return <div>Loading...</div>;
                            if (error) 
                                return `Error! ${error.message}`;
                            return <div className="expenses-list">
                                {data
                                    .usersExpenses
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

export default Main1;