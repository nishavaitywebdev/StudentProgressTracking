/**
 * Created by nishavaity on 10/7/17.
 */
import React, { Component } from 'react';

class HomePage extends Component {

    render() {
        const _style = {
            position:'relative',
            marginTop: 100,
        }
        const projects = [{ id: 2, name: "Capstone", desc: "Something", },
            { id: 1, name: "Capstone1", desc: "Something", },
            { id: 3, name: "Capstone2", desc: "Something", }];
        return(
            <div className="container">
                <div style={_style}>
                    <ul className="list-group">
                        {
                            projects.map(function (project) {
                                return (
                                    <li key={project.id} className="list-group-item">
                                        <p className="pull-right">
                                            <a>{project.desc}</a>
                                        </p>
                                        <p>
                                            <a href={`#/project/${project.id}`} className="navbar-link">{project.name}
                                                <span className="glyphicon glyphicon-cog pull-right"></span>
                                            </a>
                                        </p>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default HomePage