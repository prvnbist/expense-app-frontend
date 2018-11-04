import React, {Component} from 'react';

export default class Header extends Component {
  render() {
    return (
      <header>
        <nav>
            <span id="logo">Expense Manager</span>
            <div id="profile-options">
                <span id="user-name">Praveen</span>
            </div>
        </nav>
        <div id="total-expenses">
            <div id="income">
                <label htmlFor="#">INCOME</label>
                <div className="expense-wrapper">
                    <input type="text" placeholder="Not Set" disabled/>
                    <div className="expense-option">INR</div>
                </div>
            </div>
            <div id="total-spent">
                <label htmlFor="#">TOTAL SPENT</label>
                <div className="expense-wrapper">
                    <input type="text" placeholder="0" disabled/>
                    <div className="expense-option">OCT</div>
                </div>
            </div>
        </div>
      </header>
    )
  }
}
