import React, {Component} from 'react';
import { Paper } from '@material-ui/core';
import './style.scss';

import {CloseRounded, InfoRounded} from '@material-ui/icons';

class todoItem extends Component {
    constructor(props){
        super(props);

        this.state = {
            selectedItem: null,
        }
    }

    handleTaskDetailsClick = (task) => {
        console.log(task);
    }

    render(){
        const { task } = this.props;
        console.log(task);

        return(
            <>
                {task && <div className="task-container" data-testid={`todoItem-${task.id || '1'}`} onClick={(e) => {
            e.stopPropagation();
            this.handleTaskClick(task)
        }
         } style={task.status ? {borderLeft: "6px solid chartreuse"} : {}}>
            <div className="task-title" >
                {task.title}
            </div>

            <div className="buttons-container">
                <button className="see-task-details-button" onClick={ (e) => {
                    e.stopPropagation();
                    this.handleTaskDetailsClick();
                    }}>
                    <InfoRounded />
                </button>
                <button className="remove-task-button" onClick={ (e) => {
                    e.stopPropagation();
                    this.handleTaskDeletion(task);
                }}>
                    <CloseRounded />
                </button>
            </div>
        </div>}

                
            </>
        )
    }
}

export default todoItem;
