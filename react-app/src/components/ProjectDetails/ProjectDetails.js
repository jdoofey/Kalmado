
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
  const [showModal, setShowModal] = useState(false)
  return (
    <div className="project-details-container">
      <h1>{project.title}</h1>
      <h4>{project.description}</h4>
      <div>
        {project.tasks !== [] ? (

          <div className="task-grid">
            <div>Task</div>
            <div style={{ marginLeft: "290px" }}>Description</div>
            <div style={{ marginLeft: "340px" }}>Priority</div>
            <div style={{ marginLeft: "70px" }}>Status</div>
            <div style={{ marginLeft: "75px" }}>Due Date</div>
            <div style={{ marginLeft: "105px" }}>Completed</div>
          </div>
        ) : (
          <h1>No tasks yet</h1>
        )
        }
        {project.tasks && project.tasks.map(task => {
          return (
            <div className="task-grid">

              <div className="title-grid grid-ele">{task.title}</div>
              <div className="description-grid grid-ele">{task.desciption}</div>
              <div className="priority-grid grid-ele">{task.priority}</div>
              <div className="status-grid grid-ele">{task.status}</div>
              <div className="date-grid grid-ele">{task.end_date[0] !== null? task.end_date.toString().slice(0,16) : "None"}</div>
              <div className="completed-grid grid-ele">{task.completed ? "true" : "false"}</div>
            </div>
          )
        })}
      </div>
      <CreateTask />
      <button
        className="edit-project-btn"
        onClick={() => setShowModal(true)}
      >Edit Project</button>

      <button
        onClick={handleDelete}
      >Delete Project</button>
      {showModal && (
        <Modal>
          <div id="create-project-modal-container">

            <div className="create-project-cancel-btn"
              onClick={() => setShowModal(false)}
            >X</div>
            <div className="create-project-header">Create your new project</div>
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
