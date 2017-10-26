/**
 * Created by nishavaity on 10/11/17.
 */
import React, { Component } from 'react';
import ProjectList from '/src/projects/ProjectList';

class MyDashboard extends Component {
    render(){
        const projectList = [{ id: 1, name: "Capstone1", desc: "Something", },
            { id: 4, name: "Capstone1", desc: "Something", },
            { id: 5, name: "Capstone1", desc: "Something", },];
        return(
            <ProjectList projects={projectList}/>
        );
    }
}

export default MyDashboard