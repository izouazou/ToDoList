import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTask,
  createTask,
  updateTask,
} from '../slices/taskSlice'; 

const TaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const taskData = useSelector((state) =>
    state.tasks.tasks.find((task) => task.id === Number(id))
  );
  const [task, setTask] = useState(null);

  useEffect(() => {
    if (id !== 'new') {
      dispatch(fetchTask({ id }))
      setTask(taskData);
    } else {
      setTask({ body: '' });
    }
  }, [dispatch, id, taskData]);



  const handleSubmit = () => {
    if (task.body.trim() !== '') {
      if (id === 'new') {
        dispatch(createTask({ body: task.body }));
      } else {
        dispatch(updateTask({ id: id, body: task.body }));
      }
      navigate('/');
    }
  };
  

  const taskTextClass = task && task.completed ? 'completed-task' : '';

  return (
    <div className="task">
      <div className="task-header">
           <h3>
              <FaChevronLeft onClick={handleSubmit} />
           </h3>
      </div>
      <textarea
        className={`task-text ${taskTextClass}`}
        onChange={(e) => {
          setTask({ ...task, body: e.target.value });
        }}
        value={task?.body}
      ></textarea>
    </div>
  );
};

export default TaskPage;
