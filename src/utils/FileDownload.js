import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class FileDownload extends Component {
    constructor(props){
        super(props);
    }
    render(){
        const url = this.props.url;
        return (
            <form action={url} method="get" encType="multipart/form-data">
                <button type="submit" className="btn btn-block btn-primary">Download</button>
            </form>
        );
    }
}
FileDownload.propTypes = {
    url: PropTypes.string,
};
export default FileDownload;