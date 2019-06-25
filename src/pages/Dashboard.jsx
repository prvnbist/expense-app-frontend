import React, {Component} from 'react';

// import Header from '../components/Header';
import Main1 from '../components/Main1';
import NavBar from '../components/NavBar';

export default class Dashboard extends Component {
    render() {
        return (
            <div className="wrapper">
                <NavBar show/>
                <Main1/>
            </div>
        )
    }
}
