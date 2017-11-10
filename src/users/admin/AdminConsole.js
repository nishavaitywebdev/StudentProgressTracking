/**
 * Created by nishavaity on 11/8/17.
 */
import React, { Component } from 'react';
import NewUser from './NewUser';
import NewProject from '../../projects/NewProject';
import ProjectList from '../../projects/ProjectList';

class AdminConsole extends Component{
    render(){
        return(
            <div>
                <NewUser/><hr/>
                <NewProject/><hr/>
                <ProjectList/><hr/>
            </div>
        );
    }
}

export default AdminConsole