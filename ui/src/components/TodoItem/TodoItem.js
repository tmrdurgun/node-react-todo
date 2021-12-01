import React, {Component} from 'react';
import { Paper } from '@material-ui/core';
import './style.scss';

class todoItem extends Component {
    constructor(props){
        super(props);

        this.state = {
            selectedItem: null,
        }
    }

    render(){
        const { todoItem } = this.props;
        console.log(todoItem);

        return(
            <>
                {todoItem && <Paper className="todoItem" data-testid={`todoItem-${todoItem.id || '1'}`}>
                    <h4 className="title">{todoItem.title}</h4>
                    <div className="desc">
                        {todoItem.desc}
                    </div>
                </Paper>}
            </>
        )
    }
}

export default todoItem;
