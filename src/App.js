import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Todo-container">
        
        <Container>
        <Row>
          <Col xs="10"><input type="text" className="Todo-input" placeholder="Введите задачу" ref={this.todoInput} /></Col>
          <Col xs="2"><button onClick={this.addTodo} >Добавить</button></Col>
        </Row>
        </Container>
          {this.state.todos.map((todo, index)=>           
        <div key={todo.id} className="Todo-item">
          <div className="Todo-item-left">
            <input type="checkbox" onChange={ (event)=> this.checkTodo(todo, index, event)} />
            {!todo.editing &&
            <div className={"Todo-item-label " + (todo.completed ? 'Completed' : '')}
              onDoubleClick={(event)=> this.editTodo(todo, index, event)}>
              {todo.title}</div>
            }
            {todo.editing &&
            <input className="Todo-item-edit" type="text" autoFocus defaultValue={todo.title}
            onBlur={(event)=> this.doneEdit(todo, index, event)}
            onKeyUp={(event)=>{
              if(event.key === 'Enter'){
                this.doneEdit(todo, index, event)
              }
              else if(event.key === 'Escape'){
                this.cancelEdit(todo, index, event)
              }
            }}
            />
            }
          </div>
          <div className="Remove-item" onClick={(event) => this.deleteTodo(index)}>
            &times;
          </div>
        </div>
        )}

        <div className="Extra-container">
          <div><input type="checkbox" /><label className="Todo-item-label">Check All</label></div>
          <div>{this.tasksLeft()} items left</div>
        </div>

        <div className="Extra-container">
          <div>
            <button onClick={()=> this.updateFilter('all')} className={"Active "+(this.state.filter === 'all')}>All</button>
            <button onClick={()=> this.updateFilter('active')}>Active</button>
            <button onClick={()=> this.updateFilter('completed')} className={"Active "+(this.state.filter === 'completed')}>Completed</button>
          </div>
           {this.todoComplited() > 0 &&
          <div>
            <button onClick={this.clearCompleted}>Clear Completed</button>
          </div>
          }
        </div>
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
      if (todo.completed){
        
      }

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
}

export default App;
