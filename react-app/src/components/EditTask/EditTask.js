import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
// import { Modal } from "../../context/Modal";
import { updateTaskThunk } from "../../store/task";
import { getSingleProjectThunk } from "../../store/project";
import './EditTask.css'
function EditTask({task}){
  const dispatch = useDispatch()
  // console.log(task)
  const [taskTitle, setTaskTitle] = useState(task.title)
  const [taskDescript, setTaskDescript] = useState(task.desciption)
  const [taskStatus, setTaskStatus] = useState(task.status)
  const [taskPrio, setTaskPrio] = useState(task.priority)
  const [dueDate, setDueDate] = useState(task.end_date[0])

  //Fri, 02 Feb 2001 00:00:00 GMT

  function convertDate(str){
    let mo;
    str.slice(8,11) === "Jan"? mo = "01"
    :str.slice(8,11) ==="Feb"? mo = "02"
    :str.slice(8,11) ==="Mar"? mo ="03"
    :str.slice(8,11) === "Apr"? mo = "04"
    :str.slice(8,11) ==="May"? mo ="05"
    :str.slice(8,11) === "Jun"? mo = "06"
    :str.slice(8,11) === "Jul"? mo = "07"
    :str.slice(8,11) === "Aug"? mo = "08"
    :str.slice(8,11) === "Sep"? mo = "09"
    :str.slice(8,11) ==="Oct"? mo="10"
    :str.slice(8,11) ==="Nov"? mo="11"
    :mo="12"
    return `${str.slice(12,16)}-${mo}-${str.slice(5,7)}`
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
  useEffect(()=>{
    dispatch(getSingleProjectThunk(project.id))
  }, [dispatch, project.id])

  const handlePrioChange = e => setTaskPrio(e.target.value)
  const handleStatusChange = e => setTaskStatus(e.target.value)
  const handleSubmit = async e => {
    e.preventDefault()
    const taskData = {
      id:task.id,
      title: taskTitle,
      description: taskDescript,
      status: taskStatus,
      priority: taskPrio,
      dueDate: dueDate,
      projectId: project.id
    }
    let editedTask = await dispatch(updateTaskThunk(taskData))
    if (editedTask) {
      setShowDiv(false)
      let something = await dispatch(getSingleProjectThunk(project.id))
      if (something) window.alert("Your task has been updated")
    }
  }

  return (
    <>{!showDiv && (

      <button onClick={() => setShowDiv(true)} className="edit-task-btn">Edit task</button>
    )}
      {showDiv && (
        <div className="task-details-slider">
          <button onClick={() => setShowDiv(false)}>X</button>
          <div className="edit-task-form-container">
            <form onSubmit={handleSubmit}>

              <div className="edit-task-input-div">
                <label
                className="edit-task-title-label"
                >Title</label>
                <input
                className="edit-task-title-input edit-task-input"
                  type="text"
                  value={taskTitle}
                  onChange={updateTaskTitle}
                  required
                ></input>
              </div>

              <div className="edit-task-input-div">
                <label style={{marginRight:"32px"}}>Status</label>
                <select className="edit-task-select-field" defaultValue={taskStatus} onChange={handleStatusChange}>
                  <option value="On Track">On Track</option>
                  <option value="Off Track">Off Track</option>
                  <option value="At Risk">At Risk</option>
                </select>
              </div>

              <div className="edit-task-input-div">
                <label style={{marginRight:"22px"}}>Priority</label>
                <select className="edit-task-select-field" defaultValue={taskPrio} onChange={handlePrioChange}>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div className="edit-task-input-div">
                <label style={{marginRight:"10px"}}>Due Date</label>
                <input
                className="edit-task-date-input"
                  type="date"
                  defaultValue={convertDate(task.end_date[0])}
                  onChange={updateDueDate}
                  required
                ></input>
              </div>

              <div className="edit-task-input-div edit-task-description">
                <label
                className="edit-task-description-label"
                >Description</label>
                <textarea
                className="edit-task-textarea"
                  type="text"
                  defaultValue={taskDescript}
                  onChange={updateTaskDescript}
                  required

                ></textarea>
              </div>

              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default EditTask
