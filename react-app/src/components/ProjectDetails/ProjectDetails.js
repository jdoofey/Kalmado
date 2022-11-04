
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, } from "react-router-dom";
import {
  getSingleProjectThunk,
  updateProjectThunk,
  resetProjects,
  getAllProjectsThunk,
  deleteProjectThunk
} from "../../store/project";
import SidePanel from "../SidePanel/SidePanel";
import { Modal } from "../../context/Modal";
import CreateTask from "../CreateTask/CreateTask";
import './ProjectDetails.css'
import downArrow from "../../assets/logo/down-arrow.png"
import { deleteTaskThunk, updateTaskThunk } from "../../store/task";

function ProjectDetails() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { projectId } = useParams()
  const project = useSelector(state => state.projects.singleProject)
  useEffect(() => {
    dispatch(getAllProjectsThunk())
    dispatch(getSingleProjectThunk(projectId))
    return () => dispatch(resetProjects())
  }, [dispatch, projectId])



  const [projectTitle, setProjectTitle] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [showErrors, setShowErrors] = useState(false)
  const [validationErrs, setValidationErrs] = useState([])
  const [titleErr, setTitleErr] = useState('')
  const [descriptionErr, setDescriptionErr] = useState('')
  const updateProjectTitle = e => setProjectTitle(e.target.value)
  const updateProjectDescription = e => setProjectDescription(e.target.value)

  useEffect(() => {
    const errors = []
    if (projectTitle.length > 40 || projectTitle.length < 2) {
      errors.push("Project title must be between 2 and 40 characters")
      setTitleErr("Project title must be between 2 and 40 characters")
    }
    if (projectDescription.length > 250) {
      errors.push("Project description cannot be more than 250 characters")
      setDescriptionErr("Project description cannot be more than 250 characters")
    }
    setValidationErrs(errors)
  }, [projectTitle, projectDescription])

  const [setTaskErrors, showSetTaskErrors] = useState(false)
  const [taskValidationErrors, setTaskValidationErrors] = useState([])

  const [taskTitle, setTaskTitle] = useState('')
  const [taskDescript, setTaskDescript] = useState('')
  const [taskStatus, setTaskStatus] = useState('')
  const [taskPrio, setTaskPrio] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [completed, setCompleted] = useState(false)
  const updateTaskTitle = e => setTaskTitle(e.target.value)
  const updateTaskDescript = e => setTaskDescript(e.target.value)
  const updateTaskStatus = e => setTaskStatus(e.target.value)
  const updateTaskPrio = e => setTaskPrio(e.target.value)
  const updateDueDate = e => setDueDate(e.target.value)
  const updateCompleted = e => console.log((e.target.value))

  const handleSubmit = async e => {
    e.preventDefault()
    setShowErrors(true)
    if (!validationErrs.length) {
      const updatedProjectData = {
        id: project.id,
        title: projectTitle,
        description: projectDescription
      }
      setShowErrors(false)
      let updatedProject = await dispatch(updateProjectThunk(updatedProjectData))
      if (updatedProject) {
        window.alert("Your project has been updated!")
        setShowModal(false)
        dispatch(getAllProjectsThunk())
        return () => dispatch(resetProjects())
      }
    }
  }
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      await dispatch(deleteProjectThunk(project.id))
      history.push('/home')
    }
  }


  const [showDrop, setShowDrop] = useState(false)
  const openDrop = () => {
    if (showDrop) return
    setShowDrop(true)
  }

  useEffect(() => {
    if (!showDrop) return
    const closeDrop = () => {
      setShowDrop(false)
    }

    document.addEventListener('click', closeDrop);
    return () => document.removeEventListener('click', closeDrop)
  }, [showDrop])

  function convertDate(str) {
    const date = new Date(str)
    let mo = ("0" + (date.getMonth() + 1)).slice(-2)
    let day = ("0" + (date.getDate()+1)).slice(-2)
    return [date.getFullYear(), mo, day].join("-")
  }
  const [sidePanel, setSidePanel] = useState(true)
  const handleSidePanelView = () => {
    setSidePanel(!sidePanel)
  }
  const [showModal, setShowModal] = useState(false)
  return (
    <div id="sp-project-details-container">

      <SidePanel sidePanel={sidePanel} toggleSidePanel={handleSidePanelView} />

      <div className="project-details-container">
        <div>
          <div className="project-title-dropdown-div">
            <h1>{project.title}</h1>
            <button className="project-actions-dropdown-btn" onClick={openDrop}>
              <img className="drop-down-arrow-img" src={downArrow} />
            </button>
            {showDrop && (
              <div className="drop-down-menu">

                <div
                  className="edit-project-btn"
                  onClick={() => setShowModal(true)}
                >Edit Project</div>

                <div
                  className="delete-project-btn"
                  onClick={handleDelete}
                >Delete Project</div>

              </div>
            )}
          </div>
          <div className="project-details-description-div">
            <h4 className="project-details-description-text">{project.description}</h4>
          </div>
        </div>
        <div>
          {project.tasks?.length > 0 ? (

            <div className="task-grid">
              <div>Task</div>
              <div style={{ marginLeft: "290px" }}>Description</div>
              <div style={{ marginLeft: "540px" }}>Priority</div>
              <div style={{ marginLeft: "70px" }}>Status</div>
              <div style={{ marginLeft: "75px" }}>Due Date</div>
              <div style={{ marginLeft: "103px" }}>Completed</div>
            </div>
          ) : (
            <h1>No tasks yet</h1>
          )
          }
          {project.tasks && project.tasks.map((task, i) => {
            console.log(typeof (convertDate(task.end_date)))
            const handleTaskDelete = async (e) => {
              if (window.confirm('Are you sure you want to remove this task?'))
                await dispatch(deleteTaskThunk(task.id))
              await dispatch(getSingleProjectThunk(projectId))
            }

            const handleTaskEdit = async e => {
              e.preventDefault()
              const editedTask = {
                title: taskTitle===""? task.title: taskTitle,
                id: task.id,
                description: taskDescript===""? task.desciption: taskDescript,
                status: taskStatus===""? task.status: taskStatus,
                priority: taskPrio===""? task.priority: taskPrio,
                dueDate: dueDate===""? convertDate(task.end_date[0]):convertDate(dueDate[0]),
                projectId: project.id,
                completed: completed
              }
              console.log("HIT",convertDate(task.end_date[0]))
              let editTask = await dispatch(updateTaskThunk(editedTask))
              if (editTask) {
                let something = await dispatch(getSingleProjectThunk(project.id))
                if (something) window.alert("Your task has been updated")
              }
            }

            return (
              <div key={i} className="task-grid">


                  <div
                    className="title-grid grid-ele"
                  >{task.title}
                  </div>

                  <div
                    className="description-grid grid-ele"
                  >{task.desciption}
                  </div>
                  <div
                    className="priority-grid grid-ele"
                  >{task.priority}
                  </div>
                  <div
                    className="status-grid grid-ele"
                  >{task.status}
                  </div>
                  <div
                    className="date-grid grid-ele"
                  >{task.end_date[0].slice(0,16)}
                  </div>
                  <div
                    className="completed-grid grid-ele"
                  >{task.completed.toString()}
                  </div>

                  <div className="task-action-btns">
                  <button className="edit-task-btn">Edit task</button>
                  <button className="delete-task-btn" onClick={handleTaskDelete}>Remove Task</button>
                  </div>
              </div>
            )
          })}
        </div>
        <CreateTask />
        {showModal && (
          <Modal>
            <div id="create-project-modal-container">

              <div className="create-project-cancel-btn"
                onClick={() => setShowModal(false)}
              >X</div>
              <div className="create-project-header">Edit your Project's Details</div>
              <div className="create-project-content">
                <form onSubmit={handleSubmit}>
                  <div className="create-project-input-divs">
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <label id="create-project-title-label">Title</label>
                      {showErrors && (
                        <div id="create-project-title-err-div">{titleErr}</div>
                      )}
                    </div>
                    <input
                      type="text"
                      defaultValue={project.title}

                      onChange={updateProjectTitle}
                      required
                    />
                  </div>
                  <div className="create-project-input-divs">
                    <div style={{ display: "flex" }}>
                      <label>Description</label>
                      {showErrors && (
                        <div>{descriptionErr}</div>
                      )}
                    </div>
                    <textarea
                      id="create-project-text-area-input"
                      type="text"
                      defaultValue={project.description}

                      onChange={updateProjectDescription}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                  >Submit</button>
                </form>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  )
}

export default ProjectDetails
