import React, {Component} from 'react';

import Header from '../components/Header';
import Main from '../components/Main';

export default class Dashboard extends Component {
    render() {
        return (
            <div className="wrapper">
                <Header/>
                <Main/>
            </div>
        )
    }
}
