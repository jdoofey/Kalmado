import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
// import { Modal } from "../../context/Modal";
import { createTaskThunk } from "../../store/task";
import { getSingleProjectThunk } from "../../store/project";
import './CreateTask.css'
function CreateTask() {
  const dispatch = useDispatch()

  const [taskTitle, setTaskTitle] = useState('')
  const [taskDescript, setTaskDescript] = useState('')
  const [taskStatus, setTaskStatus] = useState('')
  const [taskPrio, setTaskPrio] = useState('')
  const [dueDate, setDueDate] = useState('')

  const updateTaskTitle = e => setTaskTitle(e.target.value)
  const updateTaskDescript = e => setTaskDescript(e.target.value)
  // const updateTaskStatus = e => setTaskStatus(e.target.value)
  // const updateTaskPrio = e => setTaskPrio(e.target.value)
  const updateDueDate = e => setDueDate(e.target.value)

  const [showDiv, setShowDiv] = useState(false)
  const project = useSelector(state => state.projects.singleProject)

  useEffect(() => {
    dispatch(getSingleProjectThunk(project.id))
  }, [dispatch, project.id])

  const handlePrioChange = e => {
    setTaskPrio(e.target.value)
  }
  const handleStatusChange = e => {
    setTaskStatus(e.target.value)
  }
  const handleSubmit = async e => {
    console.log("THIS IS STATUS and then PRIO", typeof(taskStatus), typeof(taskPrio))
    e.preventDefault()
    const task = {
      title: taskTitle,
      description: taskDescript,
      status: taskStatus===""? "On Track": taskStatus,
      priority: taskPrio===""? "Low": taskPrio,
      dueDate: dueDate,
      projectId: project.id
    }
    let createdTask = await dispatch(createTaskThunk(task))
    if (createdTask) {
      setShowDiv(false)
      let something = await dispatch(getSingleProjectThunk(project.id))
      if (something) window.alert("Your task has been added")
    }
  }

  return (
    <>
      <button className="add-task-btn" onClick={() => setShowDiv(true)}>Add a task</button>
      {showDiv && (
        <div className="task-details-slider">
          <button className="create-task-cancel-btn" onClick={() => setShowDiv(false)}>X</button>
          <div className="create-task-form-container">
            <form  onSubmit={handleSubmit}>

                <label
                  className="create-task-title-label"
                >Title</label>
              <div className="create-task-input-div">
                <input
                  className="create-task-title-input create-task-input"
                  type="text"
                  value={taskTitle}
                  onChange={updateTaskTitle}
                  placeholder="Type out a name for your task"
                  required
                ></input>
              </div>


              <div className="create-task-input-div">
                <label style={{ marginRight: "32px" }}>Status</label>
                <select className="create-task-select-field create-task-input"  value={taskStatus} onChange={handleStatusChange}>
                  <option value="On Track">On Track</option>
                  <option value="Off Track">Off Track</option>
                  <option value="At Risk">At Risk</option>
                </select>
              </div>

              <div className="create-task-input-div">
                <label style={{ marginRight: "22px" }}>Priority</label>
                <select className="create-task-select-field label"  value={taskPrio} onChange={handlePrioChange}>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div className="create-task-input-div label">
                <label style={{ marginRight: "10px" }}>Due Date</label>
                <input
                  className="create-task-date-input"
                  type="date"
                  value={dueDate}
                  onChange={updateDueDate}
                  required
                ></input>
              </div>

              <div className="create-task-input-div create-task-description">
                <label
                  className="create-task-description-label"
                >Description</label>
                <textarea
                  className="create-task-textarea"
                  type="text"
                  value={taskDescript}
                  onChange={updateTaskDescript}
                  required
                  placeholder="Write a description here"
                ></textarea>
              </div>

              <button className="create-task-save-btn" type="submit">Save</button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default CreateTask
