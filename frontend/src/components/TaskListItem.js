import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaEyeSlash } from 'react-icons/fa';



const getDate = (task) => new Date(task.updated).toLocaleDateString();

const getCustomTitle = (task) => {
  let customTitle = task.body.split('\n')[0];
  return customTitle.length > 40 ? customTitle.slice(0, 40) : customTitle;
};

const getCustomContent = (task) => {
  const customTitle = getCustomTitle(task);
  let customContent = task.body.replaceAll('\n', ' ');
  customContent = customContent.replaceAll(customTitle, '');

  return customContent.length > 40 ? customContent.slice(0, 40) + '...' : customContent;
};

const TaskListItem = ({ task, onDelete, onComplete }) => {
  const taskTextClass = task.completed ? 'completed-task' : '';
  
  return (
    
    <div className="tasks-listItem">
      <Link to={`/task/${task.id}`}>
        <div className={`${taskTextClass}`}>
          <h3>{getCustomTitle(task)}</h3>
            <span>{getDate(task)}</span>
            {getCustomContent(task)}
        </div>
      </Link>

      <div className="task-buttons" >

        <button  onClick={() => onComplete(task.id)} >
            <FaEyeSlash  size="25px"/>
        </button>

        <button onClick={() => onDelete(task.id)}>
            <FaTrash  size="25px"/>
        </button>

      </div>
    </div>
  );
};

export default TaskListItem;


