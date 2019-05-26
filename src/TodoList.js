import React, { Component } from 'react';
import Todo from './Todo';
import NewTodoForm from './NewTodoForm';
import uuid from 'uuid/v4';
import './TodoList.css';

class TodoList extends Component {
    constructor(props){
        super(props);
        this.state = { 
            dragStart: '',
            todos: [
                {task: 'Some Task 1', completed: false, id: uuid()},
                {task: 'Some Task 2', completed: false, id: uuid()},
                {task: 'Some Task 3', completed: false, id: uuid()}
            ] };
        this.createTodo = this.createTodo.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
        this.editTodo = this.editTodo.bind(this);
        this.dragAndDrop = this.dragAndDrop.bind(this);
        this.dragStart = this.dragStart.bind(this);
    }

    createTodo(todo){
        this.setState({todos: [...this.state.todos, {...todo, id: uuid()}]});
    }

    removeTodo(id){
        this.setState({todos: this.state.todos.filter((todo)=>todo.id !== id)});
    }

    editTodo(id, updatedTask){
        const updatedTodos = this.state.todos.map(todo =>{
            if(todo.id === id){
                return {...todo, task: updatedTask};
            }else {
                return todo;
            }
        });
        this.setState({todos: updatedTodos});
    }

    dragStart(id1){
        this.setState({dragStart: this.state.todos.find((t)=>t.id===id1)});
    }

    dragAndDrop(id2){
        const dragDrop = this.state.todos.findIndex((t)=>t.id===id2);
        const oldState = this.state.todos.filter((t)=>t.id!==this.state.dragStart.id);
        const newTodos = [
            ...oldState.slice(0,dragDrop),
               this.state.dragStart,
            ...oldState.slice(dragDrop)
        ];
        this.setState({dragStart:''});
        this.setState({todos: newTodos});
    }

    render(){
        const todos = this.state.todos.map(todo => {
            return (
                <Todo 
                    key={todo.id}
                    todo={JSON.stringify(todo)}
                    removeTodo={this.removeTodo}
                    editTodo={this.editTodo}
                    dragAndDrop={this.dragAndDrop}
                    dragStart={this.dragStart}
                />
            )
        })
        return(
            <div className='TodoList'>
                <i className="fab fa-react"></i>
                <NewTodoForm createTodo={this.createTodo}/>
                <hr/>
                <ul>
                    {todos}
                </ul>
            </div>
        )
    }
}

export default TodoList; 