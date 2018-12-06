import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col, Button } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Todo-container">
        
        <Container>
        <Row>
          <Col xs="10"><input type="text" className="Todo-input" placeholder="Введите задачу" /></Col>
          <Col xs="2"><button>Добавить</button></Col>
        </Row>
        </Container>
          <input type="text" className="Todo-input" placeholder="Введите задачу" />
          {this.state.todos.map((todo, index)=>           
        <div key={todo.id} className="Todo-item">
          <div className="Todo-item-left">
            <input type="checkbox" />
            <div className="Todo-item-label">{todo.title}</div>

          </div>
          <div className="Remove-item">
            &times;
          </div>
        </div>
        )}

        <div className="Extra-container">
          <div><input type="checkbox" /><label className="Todo-item-label">Check All</label></div>
          <div>2 items left</div>
        </div>

        <div className="Extra-container">
          <div>
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
          </div>

          <div>
            <button>Clear Completed</button>
          </div>
        </div>
      </div>
    </div>
  );
}
  state = {
    todos: [
      {
        'id':1,
        'title': '1 Taska',
        'com;oted': false,
        'editing': false,
      },
      {
        'id':2,
        'title': '2 Taska',
        'com;oted': false,
        'editing': false,
      }
    ]  
  }
}

export default App;
