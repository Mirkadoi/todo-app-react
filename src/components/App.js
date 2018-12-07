import React, { Component } from 'react';
import '../App.css';
import { Container, Row, Col } from 'reactstrap';
import TodoAllCheckAndLeft from './TodoAllCheckAndLeft.js'
import TodoItem from './TodoItem'
import TodoFilterAndAllClear from './TodoFilterAndAllClear'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Todo-container">
        
        <Container>
        <Row>
          <Col xs="10" style={{padding: '0px 0px'}}><input type="text" className="Todo-input d-flex align-items-center justify-content-center" placeholder="Введите задачу" ref={this.todoInput} maxLength="70"/></Col>
          <Col xs="2" className="d-flex align-items-center justify-content-center"><button onClick={this.addTodo} >Добавить</button></Col>
        </Row>
        </Container>

          <TodoFilterAndAllClear 
        updateFilter={this.updateFilter}
        filter={this.state.filter}
        todoComplited={this.todoComplited()}
        clearCompleted={this.clearCompleted}
        />

          {this.todoFilters().map((todo, index)=>    
          <TodoItem 
            key={todo.id}
            todo={todo}
            index={index}
            checkTodo={this.checkTodo}
            editTodo={this.editTodo}
            doneEdit={this.doneEdit}
            cancelEdit={this.cancelEdit}
            deleteTodo={this.deleteTodo}
          />       
        )}

        <TodoAllCheckAndLeft tasksLeft={this.tasksLeft()} allCheckTodo={this.allCheckTodo} anyRemaining={!this.anyRemaining()}/>
        
      </div>
    </div>
  );
}

  todoInput = React.createRef();

  state = {
    filter:'all',
    idForTodo: 3,
    beforeEditTitle: '',
    todos: [
      {
        'id':1,
        'title': 'Finish React Screencast',
        'completed': false,
        'editing': false,
      },
      {
        'id':2,
        'title': 'Take over world',
        'completed': false,
        'editing': false,
      }
    ]  
  }
  addTodo = (event) => {
    const todoInput = this.todoInput.current.value;

    if (todoInput.trim().length === 0) {
      return;
    }

    this.setState ((prevState, props) =>{
      let todos = prevState.todos;
      let idForTodo = prevState.idForTodo + 1;

      todos.push({
        id: idForTodo,
        title: todoInput,
        completed: false,
      });
      return {todos, idForTodo}
    })
    this.todoInput.current.value = '';
  };

  deleteTodo =(index) =>{
    this.setState ((prevState, props) =>{
      let todos = prevState.todos;
      let idForTodo = prevState.idForTodo - 1;
      
      todos.splice(index, 1)

      return {todos, idForTodo}
    })
  };

  checkTodo =(todo, index, event) =>{
    this.setState ((prevState, props) =>{
      let todos = prevState.todos;
      todo.completed = !todo.completed

      todos.splice(index, 1, todo)

      return {todos}
    })
  };
  editTodo =(todo, index, event) =>{
    this.setState ((prevState, props) =>{
      let todos = prevState.todos;
      todo.editing = true;

      todos.splice(index, 1, todo)

      return {todos, beforeEditTitle: todo.title}
    })
  };
  doneEdit =(todo, index, event) =>{
    event.persist();
    if ( event.target.value.trim().length !== 0) {
      this.setState ((prevState, props) =>{
        let todos = prevState.todos;
        todo.editing = false;
        todo.title = event.target.value;
  
        todos.splice(index, 1, todo)
  
        return {todos}
      })
    }
  }
  cancelEdit =(todo, index, event) =>{
    this.setState ((prevState, props) =>{
      let todos = prevState.todos;
      todo.editing = false;
      todo.title = prevState.beforeEditTitle;

      todos.splice(index, 1, todo)

      return {todos}
    })
  }
  tasksLeft = () =>{
    return this.state.todos.filter(todo =>!todo.completed).length;
  }
  anyRemaining = ()=>{
    return this.tasksLeft() !== 0;
  }
  todoComplited = () =>{
    return this.state.todos.filter(todo =>todo.completed).length;
  }
  clearCompleted = () =>{
    this.setState ((prevState, props) =>{
      let todos = prevState.todos;
      let idForTodo = prevState.idForTodo - this.state.todos.filter(todo =>todo.completed).length ;

      todos= todos.filter(todo => !todo.completed)


      return {todos, idForTodo}
    })
  }
  updateFilter = filter =>{
    this.setState({filter});
  }
  todoFilters = () =>{
    if (this.state.filter === 'all') {
      return this.state.todos;
    } else if (this.state.filter === 'active') {
      return this.state.todos.filter(todo => !todo.completed);
    } else if (this.state.filter === 'completed') {
      return this.state.todos.filter(todo => todo.completed);
    }
    return this.state.todos;
  }

  allCheckTodo = (event) =>{
    event.persist();
    this.setState ((prevState, props) =>{
      let todos = prevState.todos;
      todos.forEach((todo) => todo.completed = event.target.checked);

      return {todos}
    })
  }
}

export default App;
