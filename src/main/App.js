import React, { Component } from 'react';

import Header from '../utils/Header';
import Footer from '../utils/Footer';
import { fetchGet } from 'utils/fetch';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        // this.getUser();
    }

    // componentWillMount() {
    //     this.getUser();
    // }
    //
    // getUser = () => {
    //     // fetchGet('user').then(response => {
    //     //     if (response.user) {
    //     //         this.onLogin(response.user);
    //     //     }
    //     // });
    // }

    // onLogin = (user) => {
    //     this.setState({user, isLoggedIn: true });
    // }
    //
    // onLogout = () => {
    //     this.setState({user: undefined, isLoggedIn: false });
    // }
    //
    // updateParentState = (state) => {
    //     this.setState(state);
    // }


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

// App.childContextTypes = {
//     isLoggedIn: PropTypes.bool,
// };

export default App;