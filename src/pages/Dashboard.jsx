import React, {Component} from 'react';

// import Header from '../components/Header';
import Main from '../components/Main';
import NavBar from '../components/NavBar';

export default class Dashboard extends Component {
    render() {
        return (
            <div className="wrapper">
                <NavBar show/>
                <Main/>
            </div>
        )
    }
}
