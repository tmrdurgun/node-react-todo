import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Container, Button} from '@material-ui/core';

import {
  getTodos,
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
            selectedRow: null,
            searchText: '',
            inputData: '',
            inputDescription: ''
        }
    }

    async componentDidMount(){
      this.props.getTodos();
    }

    handleInputChange = (e) => {
      this.setState({ inputData: e.target.value});
  }
  handleTextAreaChange = (e) => {
    this.setState({ inputDescription: e.target.value});
  }
  
  handleAddTaskClick = () => {
    const { inputData, inputDescription } = this.state;

    console.log('ADD NEW TASK: ', {
      title: inputData,
      desc: inputDescription
    });

      // this.props.handleTaskAddition(inputData, inputDescription);
      this.setState({ inputData: '', inputDescription: ''});
      
  }

    render(){
        const { searchText, inputData, inputDescription } = this.state;
        const { todos } = this.props;

        console.log(todos);

        return(
            <>
              <Container>
              TODO LIST

              <div className="add-task-container">
            <input 
                onChange={(e) => this.handleInputChange(e)}
                className="add-task-input"
                value={inputData}
                type="text"
                placeholder="Add a task"
            />
            <div className="add-task-button-container">
                <button onClick={() => this.handleAddTaskClick()} className="button">Add</button>
            </div>
        </div>
            <textarea className="task-description"
                onChange={(e) => this.handleTextAreaChange(e)}
                value={inputDescription}
                placeholder="Add a description"
            
            ></textarea>

{todos.length > 0 && todos.map(item => (
  <TodoItem task={item} key={item.id} />
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
    }, dispatch)
  )
);

export default connect(mapStateToProps, mapDispatchToProps)(todos);
