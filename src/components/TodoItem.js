import React from 'react';
import * as classnames from 'classnames';

const TodoItem = (props) => {
    return (
        <div key={props.todo.id} className="Todo-item">
          <div className="Todo-item-left">
            <input type="checkbox" onChange={ (event)=> props.checkTodo(props.todo, props.index, event)} checked={props.todo.completed}/>
            {!props.todo.editing &&
            <div className={classnames({'Todo-item-label': true, 'Completed': props.todo.completed})}
              onDoubleClick={(event)=> props.editTodo(props.todo, props.index, event)}>
              <p className="title-style">{props.todo.title}</p></div>
            }
            {props.todo.editing &&
            <input className="Todo-item-edit" type="text" autoFocus defaultValue={props.todo.title}
            onBlur={(event)=> props.doneEdit(props.todo, props.index, event)}
            onKeyUp={(event)=>{
              if(event.key === 'Enter'){
                props.doneEdit(props.todo, props.index, event)
              }
              else if(event.key === 'Escape'){
                props.cancelEdit(props.todo, props.index, event)
              }
            }}
            />
            }
          </div>
          <div className="Remove-item" onClick={(event) => props.deleteTodo(props.index)}>
            &times;
          </div>
        </div>
    );
};

export default TodoItem;