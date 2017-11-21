import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class FileUpload extends Component {
    constructor(props){
        super(props);
    }

    upload = (event) => {
        event.preventDefault();
        const file = this.refs.myFile.files[0];
        let formData  = new FormData();
        formData.append('myFile', this.refs.myFile.files[0]);
        this.props.onUserInput(formData);
    };

    render(){
        return (
            <form id="upload" onSubmit={this.upload}>
                <input  name="myFile" ref="myFile" type="file" className="form-control"/><br />
                <button type="submit"   className="btn btn-block btn-primary">Upload</button>
            </form>
        );
    }
}
FileUpload.propTypes = {
    onUserInput: PropTypes.func,
};
export default FileUpload;