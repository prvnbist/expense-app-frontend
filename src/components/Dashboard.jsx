import React, {Component} from 'react';

import Header from './Header';
import Main from './Main';

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
