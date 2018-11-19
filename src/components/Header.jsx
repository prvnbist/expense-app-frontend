import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {Query, Mutation} from 'react-apollo';

import CURRENT_USER from '../queries/CurrentUser';
import UPDATE_USER_MUTATION from '../queries/UpdateUser';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstClick: true,
            balance: ''
        }
    }
    logOut = () => {
        localStorage.removeItem('access_token');
    }
    editBalance = (e) => {
        if (this.state.firstClick) {
            document
                .getElementById('inputBalance')
                .removeAttribute('readOnly');
            e.target.innerHTML = 'close';
            this.setState({firstClick: false});
        } else {
            document
                .getElementById('inputBalance')
                .setAttribute('readOnly', 'true');
            e.target.innerHTML = 'edit';
            this.setState({firstClick: true});
            window.location.reload();
        }
    }
    render() {
        const {balance} = this.state;
        return (
            <header className="conatiner-fluid dashboard-header">
                <div className='container top-nav'>
                    <span id="logo">Expense Manager</span>
                    <div id="profile-options">
                        <Query query={CURRENT_USER}>
                            {({client, loading, error, data: {
                                    me
                                }}) => {
                                if (loading) 
                                    return <img src="https://upload.wikimedia.org/wikipedia/commons/a/ad/YouTube_loading_symbol_3_%28transparent%29.gif" alt=""/>;
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
                                        float: 'right',
                                        cursor: 'pointer'
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
                                            return <img src="https://upload.wikimedia.org/wikipedia/commons/a/ad/YouTube_loading_symbol_3_%28transparent%29.gif" alt=""/>;
                                        if (error) 
                                            return `Error! ${error.message}`;
                                        return <input
                                            readOnly
                                            type="text"
                                            placeholder='Not Set'
                                            id="inputBalance"
                                            defaultValue={balance === ""
                                            ? parseInt(me.balance ? me.balance : 0).toLocaleString('en-IN')
                                            : parseInt(balance).toLocaleString('en-IN')}
                                            onChange={e => this.setState({balance: e.target.value})}/>
                                    }}
                                </Query>
                                <div className="expense-option">INR</div>
                            </div>
                        </div>
                        <div id="total-spent">
                            <label htmlFor="#">TOTAL SPENT</label>
                            <div className="expense-wrapper">
                                <input type="text" placeholder="0" disabled/>
                                <div className="expense-option">
                                    <select defaultValue='oct' id="monthlySpent">
                                        <option value="jan">JAN</option>
                                        <option value="feb">FEB</option>
                                        <option value="mar">MAR</option>
                                        <option value="apr">APR</option>
                                        <option value="jun">JUN</option>
                                        <option value="jul">JUL</option>
                                        <option value="aug">AUG</option>
                                        <option value="sept">SEPT</option>
                                        <option value="oct">OCT</option>
                                        <option value="nov">NOV</option>
                                        <option value="dec">DEC</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}
