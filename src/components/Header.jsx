import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {Query, Mutation} from 'react-apollo';

import CURRENT_USER from '../queries/CurrentUser';
import UPDATE_USER_MUTATION from '../queries/UpdateUser';

import DatePicker from './DatePicker';

const months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec"
];
export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstClick: true,
            balance: '',
            month: Date()
                .slice(4, 7)
                .toLowerCase(),
            year: new Date().getFullYear(),
            showDatePicker: false,
            posX: "",
            posY: ""
        }
    }
    logOut = () => {
        localStorage.removeItem('access_token');
    }
    editBalance = (e) => {
        if (this.state.firstClick) {
            let inputBalance = document.getElementById('inputBalance');
            inputBalance.removeAttribute('readOnly');
            inputBalance.value = ' ';
            inputBalance.focus();
            e.target.innerHTML = 'close';
            this.setState({firstClick: false});
        } else {
            document
                .getElementById('inputBalance')
                .setAttribute('readOnly', 'true');
            e.target.innerHTML = 'edit';
            this.setState({firstClick: true});
            window
                .location
                .reload();
        }
    }
    toggleDatePicker = e => {
        this.setState({
            showDatePicker: !this.state.showDatePicker,
            posX: e
                ? e.clientX
                : "",
            posY: e
                ? e.clientY
                : ""
        });
    };
    data = d => {
        document
            .getElementById("monthYearSelector")
            .innerHTML = `${d.month} ${d.year}`;
        this.setState({month: d.month,year:d.year})
    };
    render() {
        const {balance, month, year} = this.state;
        return (
            <header className="container-fluid dashboard-header">
                {this.state.showDatePicker
                    ? (<DatePicker
                        position={this.state}
                        selectedData={this.data}
                        closeDatePicker={this.toggleDatePicker}/>)
                    : null}
                <div className='container top-nav'>
                    <span id="logo"><img
                        src="https://res.cloudinary.com/prvnbist/image/upload/v1546179938/Group_ovez0w.png"
                        alt="Expense Manager"/>
                        Expense Manager</span>
                    <div id="profile-options">
                        <Query query={CURRENT_USER}>
                            {({client, loading, error, data: {
                                    me
                                }}) => {
                                if (loading) 
                                    return <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/a/ad/YouTube_loading_symbol_3_%28transparent%29.gif"
                                        alt=""/>;
                                if (error) 
                                    return `Error! ${error.message}`;
                                return <div id='user-info-actions'>
                                    <span id="user-name">{me.name}</span>
                                    <Link to="/">
                                        <button
                                            id="logout"
                                            onClick={() => {
                                            this.logOut();
                                            client.resetStore()
                                        }}>Logout</button>
                                    </Link>
                                </div>
                            }}
                        </Query>
                    </div>
                </div>
                <div className='container' id='user-account-info'>
                    <div id="total-expenses">
                        <div id="income">
                            <label htmlFor="#">BALANCE
                                <Mutation
                                    mutation={UPDATE_USER_MUTATION}
                                    variables={{
                                    balance
                                }}>
                                    {mutation => <span
                                        style={{
                                        cursor: 'pointer',
                                        marginLeft: 20,
                                        fontSize: 16
                                    }}
                                        onClick={e => {
                                        this.editBalance(e);
                                        mutation()
                                    }}
                                        className='material-icons'>edit</span>}
                                </Mutation>
                            </label>
                            <div className="expense-wrapper">
                                <Query query={CURRENT_USER}>
                                    {({loading, error, data: {
                                            me
                                        }}) => {
                                        if (loading) 
                                            return <img
                                                src="https://upload.wikimedia.org/wikipedia/commons/a/ad/YouTube_loading_symbol_3_%28transparent%29.gif"
                                                alt=""/>;
                                        if (error) 
                                            return `Error! ${error.message}`;
                                        return <input
                                            readOnly
                                            type="text"
                                            placeholder='Not Set'
                                            id="inputBalance"
                                            title={parseInt(me.balance).toLocaleString("en-IN", {
                                                style: 'currency',
                                                currency: "INR"
                                            })}
                                            defaultValue={balance === ""
                                            ? parseInt(me.balance
                                                ? me.balance
                                                : 0).toLocaleString("en-IN", {
                                                style: 'currency',
                                                currency: "INR"
                                            })
                                            : parseInt(balance).toLocaleString("en-IN", {
                                                style: 'currency',
                                                currency: "INR"
                                            })}
                                            onChange={e => this.setState({
                                            balance: e
                                                .target
                                                .value
                                                .replace(/[^0-9]/g, '')
                                        })}/>
                                    }}
                                </Query>
                            </div>
                        </div>
                        <div
                            id="total-spent">
                            <label htmlFor="#">INSIGHT</label>
                            <div className="expense-wrapper">

                                <Query query={CURRENT_USER}>
                                    {({loading, error, data: {
                                            me
                                        }}) => {
                                        if (loading) 
                                            return <img
                                                src="https://upload.wikimedia.org/wikipedia/commons/a/ad/YouTube_loading_symbol_3_%28transparent%29.gif"
                                                alt=""/>;
                                        if (error) 
                                            return `Error! ${error.message}`;
                                        let currentMonthExpenses = me
                                            .expenses
                                            .filter(i => new Date(Number(i.createdAt)).toString().slice(4, 7).toLowerCase() === month && new Date(Number(i.createdAt)).toString().includes(`${year}`) && i.type === "minus");
                                        return <span>You’ve spent a total of {currentMonthExpenses.length !== 0
                                                ? Number(currentMonthExpenses.map(i => i.amount).reduce((a, b) => Number(a) + Number(b))).toLocaleString("en-IN", {
                                                    style: 'currency',
                                                    currency: "INR"
                                                })
                                                : '0'}&nbsp; in the month of&nbsp;
                                            <span
                                                id="monthYearSelector"
                                                onClick={e => this.toggleDatePicker(e)}
                                                style={{
                                                cursor: "pointer",
                                                float:'none',
                                                textTransform: 'capitalize',
                                                textDecoration: 'underline'
                                            }}>
                                                {months[new Date().getMonth()]}&nbsp;
                                                {new Date().getFullYear()}
                                            </span>
                                            <i className="material-icons">arrow_drop_down</i>
                                        </span>
                                    }}
                                </Query>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}
