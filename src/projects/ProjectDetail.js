/**
 * Created by nishavaity on 10/7/17.
 */
import React, { Component } from 'react';
import { fetchGet } from 'utils/fetch';

class ProjectDetail extends Component {

    componentWillMount() {
        // fetchGet(`/project/${this.props.params.id}`)
        //     .then(response => {
        //         if (response.status == 200) {
        //             this.data = response.data;
        //         }
        //     })
        var projectDetails = null;
        const projects = [{ id: 2, name: "Capstone", desc: "Something", },
            { id: 1, name: "Capstone1", desc: "Something", },
            { id: 3, name: "Capstone2", desc: "Something", }];
        for(var i = 0; i < projects.length; i++){
            if(projects[i].id === Number(this.props.params.id)) {
                projectDetails = projects[i];
            }
        }
    }

    render() {
        return(
            <div>
                <form>
                    <div className="form-group">
                        <label>Project Name</label>
                        <input type="text" className="form-control" id="website-name"
                               placeholder="Name" value={this.data.name}/>
                    </div>
                    <div className="form-group">
                        <label>Project Description</label>
                        <textarea type="text" className="form-control" id="website-text"
                                  placeholder="Description" size="3" >
                            {this.data.desc}
                        </textarea>
                    </div>
                </form>
            </div>
        );
    }
}

export default ProjectDetail