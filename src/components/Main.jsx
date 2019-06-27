import React from 'react'
import {Query, Mutation} from 'react-apollo';
import {Formik} from 'formik';
import * as Yup from 'yup';

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
                        refetchQueries={() => ['usersExpenses']}
                    >
                        {addExpense => (
                            <Formik
                                initialValues={{
                                spentOn: '',
                                category: 'grocery',
                                amount: '',
                                type: 'plus',
                                description: ''
                            }}
                                validationSchema={expenseSchema}
                                onSubmit={(values, {setSubmitting}) => {
                                setTimeout(() => {
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
                                }, 400);
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
                                    ? <div
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
                                    : <div className="expenses-list">{data
                                            .usersExpenses
                                            .map((item, index) => <Expense key={index} item={item}/>)}</div>
}
                            </React.Fragment>;
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

export default Main;