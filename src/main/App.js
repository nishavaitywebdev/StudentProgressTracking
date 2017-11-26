import React, { Component } from 'react';

import Header from '../utils/Header';
import Footer from '../utils/Footer';
import { fetchGet } from 'utils/fetch';
import { logoutUser } from '../actions/UserActions';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.getUser();
    }

     componentWillMount() {
         this.getUser();
     }

    getUser = () => {
        fetchGet('api/user').then(response => {
            if (!response.user) {
                this.onLogout(response.user);
            }
        });
    }

//    onLogin = (user) => {
////        this.props.signInUserSuccess(user);
//    }

     onLogout = () => {
        this.props.logoutUser();
     }
//
//     updateParentState = (state) => {
//         this.setState(state);
//     }

    render() {
        const _style = {
            position:'relative',
            marginTop: 100,
            marginBottom: 100,
        }
        const childrenWithProps = React.Children.map(this.props.children,
            (child) => React.cloneElement(child)
        );
        return (
                <div>
                <Header/>
                    <div className="container" style={_style}>
                        { childrenWithProps }
                    </div>
                <Footer/>
            </div>
        );
    }
}
App.propTypes = {
    user: PropTypes.object,
};
function mapStateToProps(state){
    return {
        user: state.userReducer.user,
    };
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({logoutUser: logoutUser}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
//export default App;