import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, deleteTask, completeTask } from '../slices/taskSlice'; 
import TaskListItem from '../components/TaskListItem';
import AddTaskButton from '../components/AddTaskButton';

const TasksListPage = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const [Complete, setComplete] = useState(false);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch, Complete]);

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleComplete = (id) => {
    dispatch(completeTask({ id }));
    setComplete((prev) => !prev);
  };


  return (
    <div className="tasks">
      <div className="tasks-list">
        {tasks.map((task, index) => (
          <TaskListItem 
          key={index} 
          task={task} 
          onDelete={handleDelete} 
          onComplete={handleComplete}
          />
        ))}
      </div>
      <AddTaskButton />
    </div>
  );
};

export default TasksListPage;
