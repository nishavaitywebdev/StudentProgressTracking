/**
 * Created by nishavaity on 11/9/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Filters extends Component {
    handleChange = () => {
        console.log(this.refs.topicInput.value);
        this.props.onUserInput(
            this.refs.topicInput.value,
            this.refs.termInput.value,
        );
    }
    render () {
        let terms = [];
        this.props.terms.forEach(function (term) {
           terms.push(<option key={term} value={term}>{term}</option>);
        });
        let topics = [];
        this.props.topics.forEach(function (topic) {
            topics.push(<option key={topic} value={topic}>{topic}</option>);
        });
        return (
            <form>
                <select
                    className="form-control"
                    value={this.props.topicFilter}
                    ref="topicInput"
                    onChange={this.handleChange}
                >
                    <option value="">Select Topic</option>
                    {topics}
                </select>
                <select
                    className="form-control"
                    value={this.props.termFilter}
                    ref="termInput"
                    onChange={this.handleChange}
                >
                    <option value="">Select Term</option>
                    {terms}
                </select>
            </form>
        );
    }
}
Filters.propTypes = {
    onUserInput: PropTypes.func,
    topicFilter: PropTypes.string,
    termFilter: PropTypes.string,
    topics: PropTypes.array,
    terms: PropTypes.array,
};
export default Filters;