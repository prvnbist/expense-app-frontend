import React from 'react';
import {Mutation} from 'react-apollo';
import DELETE_EXPENSE_MUTATION from '../queries/DeleteExpense';

const Expense = props => {
    return (
        <div
            className="expense-card"
            key={props.item.id}
            style={{
            borderTop: props.item.type === "plus"
                ? '3px solid #318FFE'
                : '3px solid #EC1A1A'
        }}>
            <div className='top-row'>
                <span title={props.item.spentOn} className="spentOn">
                    {props.item.spentOn.length > 30
                        ? this
                            .props
                            .item
                            .spentOn
                            .slice(0, 20) + '...'
                        : props.item.spentOn}
                </span>
                <div
                    style={{
                    display: "flex",
                    alignItems: "center"
                }}>
                    <span
                        className="amount"
                        style={{
                        color: props.item.type === "plus"
                            ? '#318FFE'
                            : '#EC1A1A'
                    }}>{props.item.type === "plus"
                            ? '+'
                            : '-'} {parseInt(props.item.amount).toLocaleString("en-IN", {
                            style: 'currency',
                            currency: "INR"
                        })}</span>
                    <Mutation
                        mutation={DELETE_EXPENSE_MUTATION}
                        variables={{
                        id: props.item.id
                    }}
                        refetchQueries={() => ['usersExpenses']}>
                        {mutation => <button className="expense__action" onClick={mutation}>
                            <i className="material-icons">delete</i>
                        </button>}
                    </Mutation>
                </div>
            </div>
            <div className='mid-row'>
                <span className="category">
                    <i className='material-icons'>category</i>
                    <span>{props.item.category}</span>
                </span>
                <span className="time">
                    <i className='material-icons'>access_time</i>
                    <span>
                        {new Date(Number(props.item.createdAt))
                            .toTimeString()
                            .slice(0, 5)}
                    </span>
                </span>
                <span className="date">
                    <i className='material-icons'>event</i>
                    <span>{new Date(Number(props.item.createdAt))
                            .toDateString()
                            .replace(' 2018', '')}</span>
                </span>
            </div>
            <div className='bottom-row'>
                <span className="description">
                    <i className='material-icons'>description</i>
                    <span>{props.item.description
                            ? props.item.description
                            : 'No description.'}</span>
                </span>
            </div>
        </div>
    );
}

export default Expense;