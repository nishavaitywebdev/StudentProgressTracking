/**
 * Created by nishavaity on 10/2/17.
 */
import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
    componentDidMount(){

    }

    showRight = () => {
        if (this.props.isLoggedIn) {
            return (
                <ul className="nav navbar-nav navbar-right">
                    <li><a href="/#/profile">
                        <span className="glyphicon glyphicon-user"></span>Profile</a>
                    </li>
                    <li><a href="/#/logout">
                        <span className="glyphicon glyphicon-log-in">
                        </span> Logout</a>
                    </li>
                </ul>
            );
        }
        else {
            return (
                <ul className="nav navbar-nav navbar-right">
                    <li><a href="/#/signup">
                        <span className="glyphicon glyphicon-user"></span>Sign Up</a>
                    </li>
                    <li><a href="/#/loginform">
                        <span className="glyphicon glyphicon-log-in">
                        </span> Login</a>
                    </li>
                </ul>
            );
        }
    }


    render(){
        return(
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div>
                    <div>
                        <div className="nav navbar-nav navbar-left">
                            <a className=" navbar-text-decor" href="#">CAPSTONE PROJECTS</a>
                        </div>
                        <div id="myNavbar">
                            {this.showRight()}
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

Header.propTypes = {
    name: PropTypes.string,
    isLoggedIn: PropTypes.bool,
};
Header.defaultProps = {
    name: 'Home',
    menuItems: [],
};

export default Header