import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
// import { Modal } from "../../context/Modal";
import { updateTaskThunk } from "../../store/task";
import { getSingleProjectThunk } from "../../store/project";
import './EditTask.css'
function EditTask({ task }) {
  const dispatch = useDispatch()
  // console.log(task)
  const [taskTitle, setTaskTitle] = useState(task.title)
  const [taskDescript, setTaskDescript] = useState(task.description)
  const [taskStatus, setTaskStatus] = useState(task.status)
  const [taskPrio, setTaskPrio] = useState(task.priority)
  const [dueDate, setDueDate] = useState(task.end_date[0])


  const [validationErrs, setValidationErrs] = useState([])

  const [titleErr, setTitleErr] = useState('')
  const [statusErr, setStatusErr] = useState('')
  const [prioErr, setPrioErr] = useState('')
  const [descriptErr, setDescriptErr] = useState('')

  useEffect(() => {
    const errors = []
    if (taskTitle.length > 30 || taskTitle.length < 3) {
      errors.push("*Title must be between 3 and 30 characters")
      setTitleErr("*Title must be between 3 and 30 characters")
    }
    if (taskStatus === "---" || taskStatus === "") {
      errors.push("*Please select an option")
      setStatusErr("*Please select an option")
    }
    if (taskPrio === "---" || taskPrio === "") {
      errors.push("*Please select an option")
      setPrioErr("*Please select an option")
    }
    if (taskDescript.length > 250) {
      errors.push("*Description has a 250 character limit")
      setDescriptErr("*Description has a 250 character limit")
    }
    setValidationErrs(errors)
  }, [taskTitle, taskStatus, taskPrio, taskDescript])
  //Fri, 02 Feb 2001 00:00:00 GMT

  function convertDate(str) {

    let mo;
    str.slice(8, 11) === "Jan" ? mo = "01"
      : str.slice(8, 11) === "Feb" ? mo = "02"
        : str.slice(8, 11) === "Mar" ? mo = "03"
          : str.slice(8, 11) === "Apr" ? mo = "04"
            : str.slice(8, 11) === "May" ? mo = "05"
              : str.slice(8, 11) === "Jun" ? mo = "06"
                : str.slice(8, 11) === "Jul" ? mo = "07"
                  : str.slice(8, 11) === "Aug" ? mo = "08"
                    : str.slice(8, 11) === "Sep" ? mo = "09"
                      : str.slice(8, 11) === "Oct" ? mo = "10"
                        : str.slice(8, 11) === "Nov" ? mo = "11"
                          : mo = "12"
    return `${str.slice(12, 16)}-${mo}-${str.slice(5, 7)}`
  }

  // console.log(convertDate(task.end_date[0]))
  // console.log(task.end_date[0].slice(4,7)) //day
  // console.log(task.end_date[0].slice(8,11)) //mo
  // console.log(task.end_date[0].slice(12,16)) //yr
  const [showDiv, setShowDiv] = useState(false)

  const updateTaskTitle = e => setTaskTitle(e.target.value)
  const updateTaskDescript = e => setTaskDescript(e.target.value)
  // const updateTaskStatus = e => setTaskStatus(e.target.value)
  // const updateTaskPrio = e => setTaskPrio(e.target.value)
  const updateDueDate = e => setDueDate(e.target.value)

  const project = useSelector(state => state.projects.singleProject)
  useEffect(() => {
    dispatch(getSingleProjectThunk(project.id))
  }, [dispatch, project.id])

  const handlePrioChange = e => setTaskPrio(e.target.value)
  const handleStatusChange = e => setTaskStatus(e.target.value)

  const [showErrors, setShowErrors] = useState(false)
  const handleSubmit = async e => {
    e.preventDefault()
    if (validationErrs.length) {
      setShowErrors(true)
    }
    else {
      
      const taskData = {
        id: task.id,
        title: taskTitle,
        description: taskDescript,
        status: taskStatus,
        priority: taskPrio,
        dueDate: dueDate.length>10?convertDate(dueDate): dueDate,
        projectId: project.id
      }
      let editedTask = await dispatch(updateTaskThunk(taskData))
      if (editedTask) {
        setShowDiv(false)
        let something = await dispatch(getSingleProjectThunk(project.id))
        if (something) window.alert("Your task has been updated")
      }
    }
  }

  return (
    <>{!showDiv && (

      <button className="edit-task-btn" onClick={() => setShowDiv(true)}>Edit Task</button>
    )}
      {showDiv && (
        <div className="task-details-slider">
          <button className="create-task-cancel-btn" onClick={() => setShowDiv(false)}>X</button>
          <div className="create-task-form-container">
            <form onSubmit={handleSubmit}>

              <div style={{ display: "flex", justifyContent: "space-between", width: "420px" }}>
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
                  defaultValue={task.title}
                  onChange={updateTaskTitle}
                  required
                ></input>
              </div>

              <div className="create-task-input-div">
                <label style={{ marginRight: "32px" }}>Status</label>
                <select
                  className="create-task-select-field create-task-input"
                  defaultValue={task.status}
                  onChange={handleStatusChange}>
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
                <select
                  className="create-task-select-field label"
                  defaultValue={task.priority} onChange={handlePrioChange}>
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
                  defaultValue={convertDate(task.end_date[0])}
                  onChange={updateDueDate}
                  required
                ></input>
              </div>

              <div className="create-task-input-div create-task-description">
                <span style={{ display: "flex", justifyContent: "space-between", width: "420px" }}>
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
                  defaultValue={task.description}
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

export default EditTask
