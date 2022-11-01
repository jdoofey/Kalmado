import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Modal } from "../../context/Modal";
import { createTaskThunk } from "../../store/task";

function CreateTask() {
  const dispatch = useDispatch()

  const [taskTitle, setTaskTitle] = useState('')
  const [taskDescript, setTaskDescript] = useState('')
  const [taskStatus, setTaskStatus] = useState('')
  const [taskPrio, setTaskPrio] = useState('')
  const [dueDate, setDueDate] = useState('')

  const updateTaskTitle = e => setTaskTitle(e.target.value)
  const updateTaskDescript = e => setTaskDescript(e.target.value)
  const updateTaskStatus = e => setTaskStatus(e.target.value)
  const updateTaskPrio = e => setTaskPrio(e.target.value)
  const updateDueDate = e => setDueDate(e.target.value)

  const [showModal, setShowModal] = useState(false)
  const project = useSelector(state=> state.projects.singleProject)
  console.log(project.id)
  const handlePrioChange = e =>{
    setTaskPrio(e.target.value)
  }
  const handleStatusChange = e => {
    setTaskStatus(e.target.value)
  }
  const handleSubmit = async e =>{
    e.preventDefault()
    const task ={
      title: taskTitle,
      description: taskDescript,
      status: taskStatus,
      priority: taskPrio,
      dueDate: dueDate,
      projectId: project.id
    }
    let createdTask = await dispatch(createTaskThunk(task))
    if(createdTask){
      setShowModal(false)
      window.alert("Your task has been added")
    }
  }
  console.log(dueDate)
  return (
    <>
      <button onClick={() => setShowModal(true)}>Add a task</button>
      {showModal && (
        <Modal>
          <div>
            <form onSubmit={handleSubmit}>
              <label>Title</label>
              <input
              type="text"
              value={taskTitle}
              onChange={updateTaskTitle}
              required
              ></input>
              <label>Description</label>
              <input
              type="text"
              value={taskDescript}
              onChange={updateTaskDescript}
              required
              ></input>

              <label>Status</label>
              <select value={taskStatus} onChange={handleStatusChange}>
                <option>---</option>
                <option value="On Track">On Track</option>
                <option value="Off Track">Off Track</option>
                <option value="At Risk">At Risk</option>
              </select>

              <label>priority</label>
              <select value={taskPrio} onChange={handlePrioChange}>
                <option>---</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>

              <label>Due Date</label>
              <input
              type="date"
              value={dueDate}
              onChange={updateDueDate}
              required
              ></input>
              <button type="submit">Submit</button>
            </form>
          </div>
        </Modal>
      )}
    </>
  )
}

export default CreateTask
