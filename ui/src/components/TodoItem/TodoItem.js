import React, {Component} from 'react';
import { Checkbox } from '@material-ui/core';
import './style.scss';

import {CloseRounded, InfoRounded} from '@material-ui/icons';

class todoItem extends Component {
    constructor(props){
        super(props);

        this.state = {
            isDone: false,
        }
    }

    handleTaskDetailsClick = (task) => {
        console.log(task);
    }

    handleTaskClick = (task) => {
        this.props.handleTaskClick(task);
    }

    handleCheck = (checked, task) => {
        this.setState({ isDone: checked });
        this.props.handleUpdateStatus(task);
    }

    handleClickRemove = (task) => {
        this.props.handleRemoveTask(task.id);
    }
    
    render(){
        const { task, active } = this.props;
        const { isDone } = this.state;
        // console.log(task);

        return(
            <>
                {task && <div className="task-container" data-testid={`todoItem-${task.id || '1'}`} onClick={(e) => {
                    e.stopPropagation();
                    if(task.status) this.handleTaskClick(task);
                }
                } style={active ? {borderLeft: "6px solid #f4cc25"} : {}}>
                    <div className="task-title" style={{textDecoration: task.status ? 'none' : 'line-through'}}>
                        {task.title}
                    </div>

                    <div className="buttons-container">

                    <Checkbox
                        checked={isDone || !task.status}
                        value={task.id}
                        className="yellowCheckbox"
                        onChange={(e) => this.handleCheck(e.target.checked, task)}
                        onClick={(e) => e.stopPropagation()}
                    />
                        <button className="see-task-details-button" onClick={ (e) => {
                            e.stopPropagation();
                            this.handleTaskDetailsClick();
                            }}>
                            <InfoRounded />
                        </button>
                        <button className="remove-task-button" onClick={ (e) => {
                            e.stopPropagation();
                            this.handleClickRemove(task);
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
