/**
 * Created by nishavaity on 11/4/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBar extends Component {
    handleChange = () => {
            this.props.onUserInput(
            this.refs.filterTextInput.value,
        );
    }
    render () {
        return (
            <form>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    value={this.props.filterText}
                    ref="filterTextInput"
                    onChange={this.handleChange}
                />
            </form>
        );
    }
}
SearchBar.propTypes = {
    onUserInput: PropTypes.func,
    filterText: PropTypes.string,
};
export default SearchBar;