
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
import { Modal } from "../../context/Modal";
import CreateTask from "../CreateTask/CreateTask";
import './ProjectDetails.css'
import downArrow from "../../assets/logo/down-arrow.png"
import { deleteTaskThunk } from "../../store/task";
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
    if (projectTitle > 40 || projectTitle < 2) {
      errors.push("Project title must be between 2 and 40 characters")
      setTitleErr("Project title must be between 2 and 40 characters")
    }
    if (projectDescription > 1000) {
      errors.push("Project description cannot be more than 1000 characters")
      setDescriptionErr("Project description cannot be more than 1000 characters")
    }
    setValidationErrs(errors)
  }, [projectTitle, projectDescription])
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
    let mo = ("0" + (date.getMonth()+1)).slice(-2)
    let day = ("0" + date.getDate()).slice(-2)
    return [date.getFullYear(), mo, day].join("-")
  }

  const [showModal, setShowModal] = useState(false)
  return (
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
        <h4>{project.description}</h4>
      </div>
      <div>
        {project.tasks?.length > 0 ? (

          <div className="task-grid">
            <div>Task</div>
            <div style={{ marginLeft: "290px" }}>Description</div>
            <div style={{ marginLeft: "640px" }}>Priority</div>
            <div style={{ marginLeft: "70px" }}>Status</div>
            <div style={{ marginLeft: "75px" }}>Due Date</div>
            <div style={{ marginLeft: "105px" }}>Completed</div>
          </div>
        ) : (
          <h1>No tasks yet</h1>
        )
        }
        {project.tasks && project.tasks.map((task, i) => {
          console.log(typeof(convertDate(task.end_date)))
          const handleTaskDelete = async (e) => {
            if (window.confirm('Are you sure you want to remove this task?'))
              await dispatch(deleteTaskThunk(task.id))
              await dispatch(getSingleProjectThunk(projectId))
          }
          return (
            <div key={i} className="task-grid">
              <form className="task-grid">

                <input
                  className="title-grid grid-ele"
                  value={task.title}
                  >
                </input>
                <input
                  className="description-grid grid-ele"
                  value={task.desciption}
                  >
                </input>
                <input
                  className="priority-grid grid-ele"
                  value={task.priority}
                  >
                </input>
                <input
                  className="status-grid grid-ele"
                  value={task.status}
                  >
                </input>
                <input
                  className="date-grid grid-ele"
                  type="date"
                  value={task.end_date[0] !== null ? convertDate(task.end_date) : "None"}

                  >
                </input>
                <input
                  className="completed-grid grid-ele"
                  value={task.completed ? "true" : "false"}
                  >
                </input>
              </form>
              <button onClick={handleTaskDelete}>Delete</button>
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
                    placeholder={project.title}
                    value={projectTitle}
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
                    placeholder={project.description}
                    value={projectDescription}
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
  )
}

export default ProjectDetails
