import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
// import { Modal } from "../../context/Modal";

import { createTaskThunk } from "../../store/task";
import { getSingleProjectThunk } from "../../store/project";
import { getAllSectionsThunk } from "../../store/section";
import './CreateTask.css'



function CreateTask(props) {
  const dispatch = useDispatch()


  const [taskTitle, setTaskTitle] = useState('')
  const [taskDescript, setTaskDescript] = useState('')
  const [taskStatus, setTaskStatus] = useState('')
  const [taskPrio, setTaskPrio] = useState('')
  const [dueDate, setDueDate] = useState('')
  const sectionId = props.sectionId
  
  const updateTaskTitle = e => setTaskTitle(e.target.value)
  const updateTaskDescript = e => setTaskDescript(e.target.value)
  // const updateTaskStatus = e => setTaskStatus(e.target.value)
  // const updateTaskPrio = e => setTaskPrio(e.target.value)
  const updateDueDate = e => setDueDate(e.target.value)

  const [showDiv, setShowDiv] = useState(false)
  const project = useSelector(state => state.projects.singleProject)

  useEffect(() => {
    dispatch(getSingleProjectThunk(project?.id))
  }, [dispatch, project?.id])

  const handlePrioChange = e => {
    setTaskPrio(e.target.value)
  }
  const handleStatusChange = e => {
    setTaskStatus(e.target.value)
  }
  const [showErrors, setShowErrors] = useState(false)
  const handleSubmit = async e => {
    e.preventDefault()
    if (validationErrs.length) {
      setShowErrors(true)
    }
    else {
      setShowErrors(false)
      const task = {
        title: taskTitle,
        description: taskDescript,
        status: taskStatus === "" ? "On Track" : taskStatus,
        priority: taskPrio === "" ? "Low" : taskPrio,
        dueDate: dueDate,
        projectId: project.id,
        sectionId: sectionId
      }
      console.log("is this right?",sectionId)
      let createdTask = await dispatch(createTaskThunk(task))
      if (createdTask) {
        setShowDiv(false)
        setTaskTitle("")
        setTaskDescript("")
        setTaskStatus("")
        setTaskPrio("")
        setDueDate("")
        let something = await dispatch(getSingleProjectThunk(project?.id))
        await dispatch(getAllSectionsThunk(project.id))
        if (something) window.alert("Your task has been added")
      }
    }
  }

  const [validationErrs, setValidationErrs] = useState([])

  const [titleErr, setTitleErr] = useState('')
  const [statusErr, setStatusErr] = useState('')
  const [prioErr, setPrioErr] = useState('')
  const [descriptErr, setDescriptErr] = useState('')
  useEffect(() => {
    const errors = []
    if (taskTitle.length > 50 || taskTitle.length < 3) {
      errors.push("*Title must be between 3 and 50 characters")
      setTitleErr("*Title must be between 3 and 50 characters")
    }
    if (taskTitle.trim()<1){
      errors.push("*Title cannot be empty spaces")
      setTitleErr("*Title cannot be empty spaces")
    }
    if (taskStatus === "---"||taskStatus === "") {
      errors.push("*Please select an option")
      setStatusErr("*Please select an option")
    }
    if (taskPrio === "---" ||taskPrio ===  "") {
      errors.push("*Please select an option")
      setPrioErr("*Please select an option")
    }
    if (taskDescript.length > 250) {
      errors.push("*Description has a 250 character limit")
      setDescriptErr("*Description has a 250 character limit")
    }
    if(taskDescript.trim()<1){
      errors.push("*Description cannot be empty spaces")
      setDescriptErr("*Description cannot be empty spaces")
    }
    setValidationErrs(errors)
  }, [taskTitle, taskStatus, taskPrio, taskDescript])

  return (
    <>

      <button className="add-task-btn" onClick={() => setShowDiv(true)}>Add a task</button>
      {showDiv && (
        <div className="task-details-slider" >

          <button className="create-task-cancel-btn" onClick={() => {
            setShowDiv(false)
            setShowErrors(false)
            }}>X</button>
          <div className="create-task-form-container">
            <form onSubmit={handleSubmit}>

              <div style={{display:"flex", justifyContent:"space-between", width:"420px"}}>
              <label
                className="create-task-title-label"
                >Title</label>
              {showErrors && (
                <span className="create-task-error-span">{titleErr}</span>
                )}
                </div>
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
                <select className="create-task-select-field create-task-input" value={taskStatus} onChange={handleStatusChange}>
                  <option selected value="---">---</option>
                  <option value="On Track">On Track</option>
                  <option value="Off Track">Off Track</option>
                  <option value="At Risk">At Risk</option>
                </select>
                {showErrors && (
                  <span className="create-task-error-span">{statusErr}</span>
                )}
              </div>

              <div className="create-task-input-div">
                <label style={{ marginRight: "22px" }}>Priority</label>
                <select className="create-task-select-field label" value={taskPrio} onChange={handlePrioChange}>
                  <option selected value="---">---</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                {showErrors && (
                  <span className="create-task-error-span">{prioErr}</span>
                )}
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

                <span style={{display:"flex", justifyContent:"space-between", width:"420px"}}>
                <label
                  className="create-task-description-label"
                  >Description</label>

                  {showErrors && (
                    <span className="create-task-error-span">{descriptErr}</span>
                    )}
                </span>
                <textarea
                  className="create-task-textarea"
                  type="text"
                  placeholder="Write a description here"
                  value={taskDescript}
                  onChange={updateTaskDescript}
                  required
                  maxLength={251}
                  ></textarea>
                  <div style={250 - taskDescript.length > 0 ? { color: "white" } : { color: "red" }}>{250 - taskDescript.length} characters left</div>
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
