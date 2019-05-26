import React, { Component } from 'react';
import './NewTodoForm.css';

class NewTodoForm extends Component {
    constructor(props){
        super(props);
        this.state = {task: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.createTodo({task: this.state.task, completed: false});
        this.setState({task: ''});
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    render(){
        return(
            <form className="NewTodoForm" onSubmit={this.handleSubmit}>
                <input type="text"
                    id="task"
                    name="task"
                    value={this.state.task}
                    onChange={this.handleChange}
                    placeholder="New Task"
                />
                <button>Add</button>
            </form>
        )
    }
}

export default NewTodoForm; 