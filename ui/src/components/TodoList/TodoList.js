import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Container, Grid} from '@material-ui/core';

import {
  getTodos,
  createTodo,
  editTodo,
  removeTodo
} from '../../store/actions';

import { createStructuredSelector } from 'reselect';

import {
  selectTodos,
} from '../../store/selectors';

import TodoItem from '../TodoItem/TodoItem';

import './style.scss';

class todos extends Component {
  constructor(props){
    super(props);

    this.state = {
        todos: null,
        selectedTask: null,
        title: '',
        desc: ''
    }
  }

  async componentDidMount(){
    this.props.getTodos();
  }

  handleInputChange = (e) => {
    this.setState({ title: e.target.value}, () => {
      this.checkResetState();
    });
  }

  handleTextAreaChange = (e) => {
    this.setState({ desc: e.target.value}, () => {
      this.checkResetState();
    });
  }

  checkResetState = () => {
    const { title, desc } = this.state;

    if(title === '' && desc === '') this.resetInputs();
  }

  resetInputs = () => {
    this.setState({title: '', desc: '', selectedTask: null});
  }
  
  handleTaskAction = (task = undefined) => {
    const { title, desc, selectedTask } = this.state;

    const params = {
      title,
      desc
    };

    if(!selectedTask && !task) {
      this.props.createTodo(params);
    } else {

      if(task) {
        this.props.editTodo({
          id: task.id,
          title: task.title,
          desc: task.desc,
          status: !task.status
        });
      } else {
        this.props.editTodo({
          id: selectedTask.id,
          ...params
        });
      }
      
    }

    this.resetInputs();
  }

  handleRemoveTask = (id) => {

    this.props.removeTodo({ id });

    this.resetInputs();
  }

  handleUpdateStatus = (task) => {
    console.log(task);
    // this.props.updateTaskStatus(task);

    this.resetInputs();
  }

  handleTaskClick = (task) => {
    this.setState({
      title: task.title, 
      desc: task.desc,
      selectedTask: task
    })
  }

    render(){
        const { selectedTask, title, desc } = this.state;
        const { todos } = this.props;

        return(
            <>
            <Container maxWidth="md" className="content-container">
                <h1 className="page-title">ALWAYS SOMETHING TO-DO!</h1>
                <div className="add-task-container">
                    <input 
                        onChange={(e) => this.handleInputChange(e)}
                        className="add-task-input"
                        value={title}
                        type="text"
                        placeholder="Add a task"
                    />
                    <div className="add-task-button-container">
                        <button onClick={() => this.handleTaskAction()} className="button">{selectedTask ? 'Edit' : 'Add'}</button>
                    </div>
                </div>

                <div className="add-task-container">
                    <textarea className="task-description"
                        onChange={(e) => this.handleTextAreaChange(e)}
                        value={desc}
                        placeholder="Add a description"
                    ></textarea>
                </div>
                

                {todos.length > 0 && todos.map(item => (
                  <TodoItem 
                  task={item} 
                  key={item.id} 
                  handleTaskClick={this.handleTaskClick} 
                  active={selectedTask && selectedTask.id === item.id}
                  handleRemoveTask={this.handleRemoveTask}
                  handleUpdateStatus={this.handleTaskAction}
                  />
                ))}
              </Container>
            </>
        )
    }
}

const mapStateToProps = createStructuredSelector({
  todos: selectTodos(),
});

const mapDispatchToProps = dispatch => (
  (
    bindActionCreators({
      getTodos,
      createTodo,
      editTodo,
      removeTodo
    }, dispatch)
  )
);

export default connect(mapStateToProps, mapDispatchToProps)(todos);
