import React from 'react'
import { Link } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa';


const AddTaskButton = () => {
  return (
    <Link to="/task/new" className="add-button">
      <FaPlus />
    </Link>
  )
}

export default AddTaskButton