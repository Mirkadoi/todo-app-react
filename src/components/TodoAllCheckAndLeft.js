import React from 'react';

const TodoAllCheckAndLeft = (props) => {
    return (
        <div className="Extra-container">
          <div><input type="checkbox" onChange={props.allCheckTodo} checked={props.anyRemaining}/><label className="Todo-item-label">Выделить все</label></div>
          <div> {props.tasksLeft} задач(-а,-и)</div>
        </div>   
    );
};

export default TodoAllCheckAndLeft;