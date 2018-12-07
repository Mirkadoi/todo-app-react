import React from 'react';
import * as classnames from 'classnames';

const TodoFilterAndAllClear = (props) => {
    return (
        <div className="Extra-container">
            <div>
                <button onClick={()=> props.updateFilter('all')} className={classnames({'Active': props.filter === 'all'})}>Всё</button>
                <button onClick={()=> props.updateFilter('active')} className={classnames({'Active': props.filter === 'active'})}>Активные</button>
                <button onClick={()=> props.updateFilter('completed')} className={classnames({'Active': props.filter === 'completed'})}>Законченные</button>
            </div>

            {props.todoComplited > 0 &&
                <div>
                <button onClick={props.clearCompleted}>Удалить законченные</button>
                </div>
            }
        </div>
    );
};

export default TodoFilterAndAllClear;