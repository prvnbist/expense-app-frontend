import React from 'react';
import {Mutation} from 'react-apollo';
import DELETE_EXPENSE_MUTATION from '../queries/DeleteExpense';

export default class Expense extends React.Component {
    reLoadPageWithNewData = _ => {
        window
            .location
            .reload();
    }
    render() {
        return <div
            className="expense-card"
            key={this.props.item.id}
            style={{
            borderTop: this.props.item.type === "plus"
                ? '3px solid #318FFE'
                : '3px solid #EC1A1A'
        }}>
            <div className='top-row'>
                <span title={this.props.item.spentOn} className="spentOn">
                    {this.props.item.spentOn.length > 30
                        ? this.props.item.spentOn.slice(0, 20) + '...'
                        : this.props.item.spentOn}
                </span>
                <div
                    style={{
                    display: "flex",
                    alignItems: "center"
                }}>
                    <span
                        className="amount"
                        style={{
                        color: this.props.item.type === "plus"
                            ? '#318FFE'
                            : '#EC1A1A'
                    }}>{this.props.item.type === "plus"
                            ? '+'
                            : '-'} {parseInt(this.props.item.amount).toLocaleString("en-IN", {
                            style: 'currency',
                            currency: "INR"
                        })}</span>
                    <Mutation
                        mutation={DELETE_EXPENSE_MUTATION}
                        variables={{
                        id: this.props.item.id
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
                    <span>{this.props.item.category}</span>
                </span>
                <span className="time">
                    <i className='material-icons'>access_time</i>
                    <span>
                        {new Date(Number(this.props.item.createdAt))
                            .toTimeString()
                            .slice(0, 5)}
                    </span>
                </span>
                <span className="date">
                    <i className='material-icons'>event</i>
                    <span>{new Date(Number(this.props.item.createdAt))
                            .toDateString()
                            .replace(' 2018', '')}</span>
                </span>
            </div>
            <div className='bottom-row'>
                <span className="description">
                    <i className='material-icons'>description</i>{this.props.item.description
                        ? this.props.item.description
                        : 'No description.'}</span>
            </div>
        </div>
    }
}