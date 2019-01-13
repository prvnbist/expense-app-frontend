import React, {Component} from 'react';

import {Query} from 'react-apollo';

import CURRENT_USER from '../queries/CurrentUser';

let PieChart = require("react-chartjs").Pie;

export default class AddExpense extends Component {
    render() {
        return (
            <div className="popup-bg">
                <Query query={CURRENT_USER}>
                    {({loading, error, data: {
                            me
                        }}) => {
                        if (loading) 
                            return <img
                                src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/cd514331234507.564a1d2324e4e.gif"
                                alt=""/>;
                        if (error) 
                            return `Error! ${error.message}`;
                        let categories = [...new Set(me.expenses.filter(item => item.type === "minus").map(item => item.category))];
                        let amount = [];
                        let catAmount = 0;
                        for (let i in categories) {
                            for (let j in me.expenses) {
                                if (me.expenses[j].category === categories[i]) {
                                    catAmount += Number(me.expenses[j].amount);
                                }
                            }
                            amount.push(catAmount);
                            catAmount = 0;
                        }
                        let colors = [
                            "#5DA5DA",
                            "#FAA43A",
                            "#4D4D4D",
                            "#60BD68",
                            "#F17CB0",
                            "#B2912F",
                            "#B276B2",
                            "#DECF3F",
                            "#F15854"
                        ];
                        let chartData = [];
                        for (let i in amount) {
                            let obj = {
                                value: amount[i],
                                label: categories[i],
                                color: colors[i]
                            }
                            chartData.push(obj);
                        }
                        return (
                            <div className="popup-card">
                                <div id="left">
                                    <div id="heading">
                                        <span>Stats</span>
                                        <i
                                            className="material-icons"
                                            style={{
                                            cursor: "pointer"
                                        }}
                                            onClick={this.props.closePopUp}>close</i>
                                    </div>
                                    <h1
                                        style={{
                                        color: "rgba(4, 26, 42, 0.33)",
                                        fontSize: 14,
                                        marginBottom: 20,
                                        marginTop: 30
                                    }}>CATEGORIES</h1>
                                    <div>
                                        {categories.map((item, index) => <div
                                            key={index}
                                            className="cateogriesSpentOn">
                                            <span>{item}</span>
                                            <span
                                                style={{
                                                color: '#EC1A1A'
                                            }}>- {amount[index]}
                                                INR</span>
                                        </div>)}
                                    </div>
                                </div>
                                <div id="right">
                                    <div id="heading">
                                        <span>Overview</span>
                                        <i
                                            className="material-icons"
                                            style={{
                                            cursor: "pointer"
                                        }}
                                            onClick={this.props.closePopUp}>close</i>
                                    </div>
                                    <h1
                                        style={{
                                        color: "rgba(4, 26, 42, 0.33)",
                                        fontSize: 14,
                                        marginBottom: 20,
                                        marginTop: 30
                                    }}>MOST SPENT ON</h1>
                                    <div id="statsChart">
                                        <PieChart data={chartData} width="350" height="350"/>
                                    </div>
                                </div>
                            </div>
                        );
                    }}
                </Query>

            </div>
        )
    }
}