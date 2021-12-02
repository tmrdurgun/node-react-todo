import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Container, Button} from '@material-ui/core';

import {
  getTodos,
  createTodo
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
  
  handleAddTaskClick = () => {
    const { title, desc, selectedTask } = this.state;

    const params = {
      title,
      desc
    };

    if(!selectedTask) this.props.createTodo(params);
    // this.props.editTodo(params);

    console.log('TASK ACTION: ', params);

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
              <Container>
              TODO LIST

              <div className="add-task-container">
                  <input 
                      onChange={(e) => this.handleInputChange(e)}
                      className="add-task-input"
                      value={title}
                      type="text"
                      placeholder="Add a task"
                  />
                  <div className="add-task-button-container">
                      <button onClick={() => this.handleAddTaskClick()} className="button">{selectedTask ? 'Edit' : 'Add'}</button>
                  </div>
              </div>
              <textarea className="task-description"
                  onChange={(e) => this.handleTextAreaChange(e)}
                  value={desc}
                  placeholder="Add a description"
              
              ></textarea>

              {todos.length > 0 && todos.map(item => (
                <TodoItem task={item} key={item.id} handleTaskClick={this.handleTaskClick} active={selectedTask && selectedTask.id === item.id} />
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
      createTodo
    }, dispatch)
  )
);

export default connect(mapStateToProps, mapDispatchToProps)(todos);
