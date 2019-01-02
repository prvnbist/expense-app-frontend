import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Home extends Component {
    render() {
        return (
            <div className="container-fluid full-height" id="home">
                <div id="homepage-header">
                    <div className="container"  style={{maxWidth: 1280}}>
                        <span id="logo">
                            <Link to="/" style={{color:"#041A2A"}}><img src="https://res.cloudinary.com/prvnbist/image/upload/v1546179938/Group_ovez0w.png" alt="Expense Manager"/> Expense Manager</Link>
                        </span>
                    </div>
                </div>
                <div id="home-page-content" className="container"   style={{maxWidth: 1280}}>
                    <h1 id="home-page-content-heading">Manage your expenses easily.</h1>
                    <div id="home-page-content-buttons">
                        <Link to="/signup"><button>SIGN UP</button></Link>
                        <Link to="/login"><button>LOGIN</button></Link>
                    </div>
                </div>
            </div>
        )
    }
}
