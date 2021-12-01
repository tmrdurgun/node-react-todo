import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Container} from '@material-ui/core';

import {
  getTodos,
} from '../../store/actions';

import { createStructuredSelector } from 'reselect';

import {
  selectTodos,
} from '../../store/selectors';

import TodoItem from '../TodoItem/TodoItem';

class todos extends Component {
    constructor(props){
        super(props);

        this.state = {
            todos: null,
            selectedRow: null,
            searchText: ''
        }
    }

    async componentDidMount(){
      this.props.getTodos();
    }

    render(){
        const { searchText } = this.state;
        const { todos } = this.props;

        return(
            <>
              <Container>
              TODO LIST

              <TodoItem task={{
                id: 'asdasd123asd',
                title: 'Çöp atılacak',
                desc: 'acil',
                status: 1
              }} />
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
