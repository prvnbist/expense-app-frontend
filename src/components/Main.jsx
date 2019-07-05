import React from 'react'
import {Query, Mutation} from 'react-apollo';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Pie, Line} from "react-chartjs-2";

import ADD_EXPENSE_MUTATION from '../queries/AddExpense';
import USERS_EXPENSES from '../queries/UsersExpenses';

import Tabs from './Tabs';
import Expense from './ExpenseCard';
import Select from './Select';
import RadioGroup from './RadioGroup';
import Modal from './Modal';

const Main = () => {
    const [filters,
        setFilters] = React.useState({search: "", category: "", type: ""});
    const [modal,
        showModal] = React.useState(false);
    const selected = option => setFilters({
        ...filters,
        category: option
    });
    const typeSelected = option => setFilters({
        ...filters,
        type: option
    });
    const closeModal = value => showModal(value);

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
    const expenseSchema = Yup
        .object()
        .shape({
            spentOn: Yup
                .string()
                .required(),
            amount: Yup
                .number()
                .typeError()
                .required(),
            description: Yup
                .string()
                .max(80)
        });
    return (
        <div className="container-fluid">
            {modal && (
                <Modal title={"Add Expense"} closeModal={closeModal}>
                    <Mutation
                        mutation={ADD_EXPENSE_MUTATION}
                        refetchQueries={() => ['usersExpenses']}>
                        {addExpense => (
                            <Formik
                                initialValues={{
                                spentOn: '',
                                category: 'Grocery',
                                amount: '',
                                type: 'plus',
                                description: ''
                            }}
                                validationSchema={expenseSchema}
                                onSubmit={(values, {setSubmitting}) => {
                                addExpense({
                                    variables: {
                                        spentOn: values.spentOn,
                                        category: values.category,
                                        amount: values.amount,
                                        type: values.type,
                                        description: values.description
                                    }
                                });
                                setSubmitting(false);
                            }}>
                                {({
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    isSubmitting
                                }) => (
                                    <React.Fragment>
                                        <form onSubmit={handleSubmit}>
                                            <Modal.Main>
                                                <div className="addexpense__row">
                                                    <div className="addexpense__column">
                                                        <label>Category</label>
                                                        <select
                                                            name="category"
                                                            defaultValue={values.category}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}>
                                                            {categories.map((item, index) => <option key={index} value={item}>{item}</option>)}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="addexpense__row">
                                                    <div className="addexpense__column">
                                                        <label>Expense Name</label>
                                                        <input
                                                            style={{
                                                            border: touched.spentOn && errors.spentOn && "1px solid red"
                                                        }}
                                                            type="text"
                                                            name="spentOn"
                                                            value={values.spentOn}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            placeholder="Enter the article"/>
                                                    </div>

                                                </div>
                                                <div className="addexpense__row">
                                                    <div className="addexpense__column">
                                                        <label>Type</label>
                                                        <select
                                                            name="type"
                                                            defaultValue={values.type}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}>
                                                            <option value="plus">Earned</option>
                                                            <option value="minus">Spent</option>
                                                        </select>
                                                    </div>
                                                    <div className="addexpense__column">
                                                        <label>Amount</label>
                                                        <input
                                                            style={{
                                                            border: touched.amount && errors.amount && "1px solid red"
                                                        }}
                                                            value={values.amount}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            type="text"
                                                            name="amount"
                                                            placeholder="Enter the amount..."/>
                                                    </div>
                                                </div>
                                                <div className="addexpense__row">
                                                    <div className="addexpense__column">
                                                        <label>Description</label>
                                                        <textarea
                                                            value={values.description}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            type="text"
                                                            name="description"
                                                            placeholder="Enter the description..."/>
                                                    </div>
                                                </div>
                                            </Modal.Main>
                                            <Modal.Footer>
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    style={{
                                                    marginRight: "var(--margin-1)"
                                                }}
                                                    onClick={() => setTimeout(() => showModal(!modal), 1000)}
                                                    className="btn btn__primary btn__small">Add Expense</button>
                                                <button
                                                    type="button"
                                                    onClick={() => showModal(!modal)}
                                                    className="btn btn__outline btn__small">Cancel</button>
                                            </Modal.Footer>
                                        </form>
                                    </React.Fragment>
                                )}
                            </Formik>
                        )}
                    </Mutation>
                </Modal>
            )}
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
                        <button
                            type="button"
                            className='btn btn__primary btn__icon'
                            onClick={() => showModal(!modal)}>
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
                                return <div
                                    className="container"
                                    style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: "calc(100vh - 190px)"
                                }}>
                                    <img
                                        src="https://res.cloudinary.com/prvnbist/image/upload/c_scale,w_40/v1561624433/Expense%20App/ZlXo.gif"
                                        alt=""/>
                                </div>;
                            if (error) 
                                return `Error! ${error.message}`;
                            return <React.Fragment>
                                {data.usersExpenses.length === 0
                                    ? (
                                        <div
                                            className="container"
                                            style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            height: "calc(100vh - 190px)"
                                        }}><img
                                            style={{
                                            width: "320px"
                                        }}
                                            src="https://res.cloudinary.com/prvnbist/image/upload/v1561618359/Expense%20App/empty-expenses.svg"
                                            alt="EMpty Expenses"/></div>
                                    )
                                    : (
                                        <div className="expenses-list">{data
                                                .usersExpenses
                                                .map((item, index) => <Expense key={index} item={item}/>)}</div>
                                    )
}
                            </React.Fragment>;
                        }}
                    </Query>
                </div>
                <div label="Insights">
                    <div id="top__row" className="container">
                        <Query query={USERS_EXPENSES}>
                            {({client, loading, error, data: {
                                    usersExpenses
                                }}) => {
                                if (loading) 
                                    return <div id='user-info-actions'>
                                        <span id="user-name">Loading...</span>
                                    </div>;
                                if (error) 
                                    return `Error! ${error.message}`;
                                const totalSpent = usersExpenses
                                    .filter(expense => expense.type === "minus")
                                    .reduce((total, expense) => Number(expense.amount) + total, 0);
                                const totalExpenses = usersExpenses.length;
                                return (
                                    <React.Fragment>
                                        <div className="stats__card">
                                            <header>Total Spent</header>
                                            <main>
                                                <span className="stats__number">{parseInt(totalSpent).toLocaleString("en-IN", {
                                                        style: 'currency',
                                                        currency: "INR"
                                                    })}</span>
                                                <span className="stats__text">rupees spent so far</span>
                                            </main>
                                        </div>
                                        <div className="stats__card">
                                            <header>Total Expenses</header>
                                            <main>
                                                <span className="stats__number">{totalExpenses}</span>
                                                <span className="stats__text">expenses so far</span>
                                            </main>
                                        </div>
                                    </React.Fragment>
                                )
                            }}
                        </Query>
                    </div>
                    <div id="middle__row" className="container">
                        <Query query={USERS_EXPENSES}>
                            {({client, loading, error, data: {
                                    usersExpenses
                                }}) => {
                                if (loading) 
                                    return <div id='user-info-actions'>
                                        <span id="user-name">Loading...</span>
                                    </div>;
                                if (error) 
                                    return `Error! ${error.message}`;
                                let categories = [...new Set(usersExpenses.filter(item => item.type === "minus").map(item => item.category))];
                                let amount = [];
                                let catAmount = 0;
                                for (let i in categories) {
                                    for (let j in usersExpenses) {
                                        if (usersExpenses[j].category === categories[i]) {
                                            catAmount += Number(usersExpenses[j].amount);
                                        }
                                    }
                                    amount.push(catAmount);
                                    catAmount = 0;
                                }
                                let obj = [];
                                for (let i = 0; i < categories.length; i++) {
                                    obj.push({category: categories[i], amount: amount[i]});
                                }
                                let sortedData = obj.sort((a, b) => b.amount - a.amount).slice(0, 5);
                                const data = {
                                    labels: sortedData.map(i => i.category),
                                    datasets: [
                                        {
                                            data: sortedData.map(i => i.amount),
                                            backgroundColor: [
                                                "#E84C3D", "#3598DB", "#1BBC9B", "#F1C40F", "#34495E"
                                            ],
                                            hoverBackgroundColor: ["#E84C3D", "#3598DB", "#1BBC9B", "#F1C40F", "#34495E"]
                                        }
                                    ]
                                };

                                const getMonth = data => new Intl
                                    .DateTimeFormat("en-US", {month: "long"})
                                    .format(new Date(Number(data)));
                                const getYear = data => new Intl
                                    .DateTimeFormat("en-US", {year: "numeric"})
                                    .format(new Date(Number(data)));

                                let months = [...new Set(usersExpenses.filter(item => item.type === "minus").map(i => `${getMonth(i.createdAt)} ${getYear(i.createdAt)}`))].reverse();

                                let amount1 = [];
                                let catAmount1 = 0;
                                let filterRaw = usersExpenses.filter(item => item.type === "minus");
                                for (let i in months) {
                                    for (let j in filterRaw) {
                                        let month = `${getMonth(filterRaw[j].createdAt)}`;
                                        let year = `${getYear(filterRaw[j].createdAt)}`;

                                        if (months[i].includes(month) && months[i].includes(year)) {
                                            catAmount1 += Number(filterRaw[j].amount);
                                        }
                                    }
                                    amount1.push(catAmount1);
                                    catAmount1 = 0;
                                }
                                console.log(filterRaw, amount1)
                                const data1 = {
                                    labels: months,
                                    datasets: [
                                        {
                                            data: amount1,
                                            fill: false,
                                            lineTension: 0.1,
                                            backgroundColor: "rgba(75,192,192,0.4)",
                                            borderColor: "rgba(75,192,192,1)",
                                            borderCapStyle: "butt",
                                            borderDash: [],
                                            borderDashOffset: 0.0,
                                            borderJoinStyle: "miter",
                                            pointBorderColor: "rgba(75,192,192,1)",
                                            pointBackgroundColor: "#fff",
                                            pointBorderWidth: 1,
                                            pointHoverRadius: 5,
                                            pointHoverBackgroundColor: "rgba(75,192,192,1)",
                                            pointHoverBorderColor: "rgba(220,220,220,1)",
                                            pointHoverBorderWidth: 2,
                                            pointRadius: 1,
                                            pointHitRadius: 10
                                        }
                                    ]
                                };

                                return (
                                    <React.Fragment>
                                        <div id="monthly__stats">
                                            <header>Monthly Expenses</header>
                                            <main>
                                                <Line
                                                    data={data1}
                                                    options={{
                                                    legend: {
                                                        display: false
                                                    },
                                                    tooltips: {
                                                        callbacks: {
                                                            label: function (tooltipItem) {
                                                                return tooltipItem.yLabel;
                                                            }
                                                        }
                                                    },
                                                    responsive: true,
                                                    maintainAspectRatio: false
                                                }}/>
                                            </main>
                                        </div>
                                        <div id="most__spenton">
                                            <header>Most Spent On Categories</header>
                                            <main>
                                                <Pie
                                                    data={data}
                                                    options={{
                                                    maintainAspectRatio: false
                                                }}/>
                                            </main>
                                        </div>
                                    </React.Fragment>
                                )
                            }}
                        </Query>
                    </div>
                </div>
            </Tabs>
        </div>
    );
}

export default Main;