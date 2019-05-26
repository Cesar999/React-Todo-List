import React, { Component } from 'react';
import './Todo.css';

class Todo extends Component {
    constructor(props){
        super(props);
        this.myRef = React.createRef();
        this.state = {
            isEditing: false,
            task: JSON.parse(this.props.todo).task,
            id: JSON.parse(this.props.todo).id,
            completed: JSON.parse(this.props.todo).completed,
            dragStart: ''
        };
        this.handleRemove = this.handleRemove.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.handleComplete = this.handleComplete.bind(this);
        this.dragStart = this.dragStart.bind(this);
        this.dragDrop = this.dragDrop.bind(this);
    }

    handleRemove(id){
        this.props.removeTodo(id);
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.editTodo(this.state.id, this.state.task);
        this.toggleEdit();
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    toggleEdit(){
        this.setState({isEditing: !this.state.isEditing});
    }

    handleComplete(){
        if(this.state.completed){
            this.myRef.current.className = 'not-completed';
        } else {
            this.myRef.current.className = 'completed';
        }
        this.setState({completed: !this.state.completed});
    }

    dragStart(e) {
        this.props.dragStart(e.target.id);
    }

    dragDrop(e){
        this.props.dragAndDrop(e.target.parentNode.id);
    }

    render(){
        let result;
        if(this.state.isEditing){
            result = (
                <form className="Todo-Form" onSubmit={this.handleSubmit}>
                    <input type="text"
                        name="task"
                        value={this.state.task}
                        onChange={this.handleChange}
                    />
                    <button>Save</button>
                </form>
            );
        } else {
            const todo = JSON.parse(this.props.todo);
            result = (
            <div className="Todo"
                id={this.state.id}
                draggable="true" 
                onDragOver={(event) => event.preventDefault()}
                onDragStart={this.dragStart} 
                onDrop={this.dragDrop}
                onDragEnd={(e)=>{}}
            >
                <span ref={this.myRef} onClick={this.handleComplete}>
                    {todo.task}
                </span>
                <button className="btn-edit" onClick={this.toggleEdit}>
                    <i className="fas fa-edit"></i>
                </button>
                <button className="btn-delete" onClick={()=>{this.handleRemove(todo.id)}}>
                    <i className="fas fa-trash-alt"></i>
                </button>
            </div>
            );
        }
        return result;
    }
}

export default Todo; 