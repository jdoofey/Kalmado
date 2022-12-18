
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, } from "react-router-dom";
import {
  getSingleProjectThunk,
  updateProjectThunk,
  resetProjects,
  getAllProjectsThunk,
  deleteProjectThunk
} from "../../store/project";
import { deleteTaskThunk, updateTaskCompletedThunk } from "../../store/task";
import { getAllSectionsThunk, resetSections } from "../../store/section";
import CreateSection from "../CreateSection/CreateSection";
import { Modal } from "../../context/Modal";
import SidePanel from "../SidePanel/SidePanel";
import CreateTask from "../CreateTask/CreateTask";
import EditTask from "../EditTask/EditTask";
import downArrow from "../../assets/logo/down-arrow.png"
import './ProjectDetails.css'

function ProjectDetails() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { projectId } = useParams()
  const project = useSelector(state => state.projects.singleProject)
  useEffect(() => {
    dispatch(getAllProjectsThunk())
    dispatch(getSingleProjectThunk(projectId))
    dispatch(getAllSectionsThunk(projectId))
    return () => dispatch(resetProjects())
  }, [dispatch, projectId])
  const [isLoaded, setIsLoaded] = useState(false)
  // useEffect(() => {
  //   dispatch(getAllSectionsThunk(projectId))
  //   .then(()=>setIsLoaded(true))

  // }, [dispatch])

  const sections = useSelector(state => state.sections.allSections)

  const [projectTitle, setProjectTitle] = useState(project?.title)
  const [projectDescription, setProjectDescription] = useState(project?.description)
  const [showErrors, setShowErrors] = useState(false)
  const [validationErrs, setValidationErrs] = useState([])
  const [titleErr, setTitleErr] = useState('')
  const [descriptionErr, setDescriptionErr] = useState('')
  const updateProjectTitle = e => setProjectTitle(e.target.value)
  const updateProjectDescription = e => setProjectDescription(e.target.value)

  useEffect(() => {
    const errors = []
    if (projectTitle?.length > 40 || projectTitle?.length < 3 || projectTitle?.trim() < 1) {
      errors.push("Title must be between 3 and 40 characters")
      setTitleErr("Title must be between 3 and 40 characters")
    }
    if (projectDescription?.length > 250) {
      errors.push("Description cannot be more than 250 characters")
      setDescriptionErr("Description has a 250 character limit")
    }
    if (projectDescription?.trim() < 1) {
      errors.push("Description cannot be empty spaces")
      setDescriptionErr("Description cannot be empty spaces")
    }
    setValidationErrs(errors)
  }, [projectTitle, projectDescription,])

  // const [setTaskErrors, showSetTaskErrors] = useState(false)
  // const [taskValidationErrors, setTaskValidationErrors] = useState([])

  // const [taskTitle, setTaskTitle] = useState('')
  // const [taskDescript, setTaskDescript] = useState('')
  // const [taskStatus, setTaskStatus] = useState('')
  // const [taskPrio, setTaskPrio] = useState('')
  // const [dueDate, setDueDate] = useState('')
  // const [completed, setCompleted] = useState(false)
  // const updateTaskTitle = e => setTaskTitle(e.target.value)
  // const updateTaskDescript = e => setTaskDescript(e.target.value)
  // const updateTaskStatus = e => setTaskStatus(e.target.value)
  // const updateTaskPrio = e => setTaskPrio(e.target.value)
  // const updateDueDate = e => setDueDate(e.target.value)
  // const updateCompleted = e => console.log((e.target.value))



  const handleSubmit = async e => {
    e.preventDefault()
    setShowErrors(true)
    if (!validationErrs.length) {
      const updatedProjectData = {
        id: project.id,
        title: projectTitle === "" ? project.title : projectTitle,
        description: projectDescription === "" ? project.description : projectDescription
      }
      setShowErrors(false)
      let updatedProject = await dispatch(updateProjectThunk(updatedProjectData))
      if (updatedProject) {
        window.alert("Your project has been updated!")
        setShowModal(false)
        dispatch(getAllProjectsThunk())
        dispatch(getSingleProjectThunk(projectId))
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

  // function convertDate(str) {
  //   const date = new Date(str)
  //   let mo = ("0" + (date.getMonth() + 1)).slice(-2)
  //   let day = ("0" + (date.getDate()+1)).slice(-2)
  //   return [date.getFullYear(), mo, day].join("-")
  // }
  const [sidePanel, setSidePanel] = useState(true)
  const handleSidePanelView = () => {
    setSidePanel(!sidePanel)
  }
  const [showModal, setShowModal] = useState(false)

  //handle view useStates for list/board view btns
  const [listView, setListView] = useState(true)
  const [boardView, setBoardView] = useState(false)

  return (
    <div id="sp-project-details-container">

      <SidePanel sidePanel={sidePanel} toggleSidePanel={handleSidePanelView} />

      <div className="project-details-container">
        <div>
          <div className="project-title-dropdown-div">
            <h1 >{project?.title}</h1>

            <button className="project-actions-dropdown-btn" onClick={openDrop}>
              <img className="drop-down-arrow-img" alt="drop-down-arrow-img" src={downArrow} />
            </button>
            {showDrop && (
              <div className="drop-down-menu">

                <div
                  className="edit-project-btn"
                  onClick={() => {
                    setShowModal(true)
                    setShowErrors(false)
                    setProjectTitle(project.title)
                    setProjectDescription(project.description)
                  }}
                >Edit Project</div>

                <div
                  className="delete-project-btn"
                  onClick={handleDelete}
                >Delete Project</div>

              </div>
            )}
          </div>
          <div className="project-details-description-div">
            <h4 className="project-details-description-text">{project?.description}</h4>
          </div>
          <div>
            {/* <button
              className="project-view-btns"
              onClick={() => {
                setBoardView(false)
                setListView(true)
              }}>List View</button>
            <button
              className="project-view-btns"
              onClick={() => {
                setBoardView(true)
                setListView(false)
              }}>Board View</button> */}
              <CreateSection projectId={projectId}/>
          </div>
        </div>

        {/* handle list vieew */}


        {/* section testing */}
        <div>
          {Object.values(sections).map(section => {
            const tasks = section.tasks
            console.log(tasks.length)
            return (

              <div>
                {!tasks.length && (
                  <div>

                  <h2>{section.title}</h2>
                  <h4>There are no tasks for this section yet...</h4>
                  <CreateTask sectionId={section.id} />
                  </div>
                )}
                {!!tasks.length && (
                  <div >
                    <h2>
                      {section.title}
                    </h2>
                    <div className="task-grid">
                      <div>Task</div>
                      <div style={{ marginLeft: "290px" }}>Description</div>
                      <div style={{ marginLeft: "540px" }}>Priority</div>
                      <div style={{ marginLeft: "70px" }}>Status</div>
                      <div style={{ marginLeft: "75px" }}>Due Date</div>

                    </div>
                    {tasks.map((task, i) => {

                      const handleTaskDelete = async (e) => {
                        if (window.confirm('Are you sure you want to remove this task?'))
                          await dispatch(deleteTaskThunk(task.id))
                        await dispatch(getSingleProjectThunk(projectId))
                        await dispatch(getAllSectionsThunk(project.id))
                      }

                      const prioColorer = task.priority.toLowerCase() === "medium" ? { color: "yellow" }
                        : task.priority.toLowerCase() === "low" ? { color: "#1EEE67" }
                          : { color: "red" }
                      const statusColorer = task.status === "At Risk" ? { color: "red" }
                        : task.status === "On Track" ? { color: "#1EEE67" }
                          : { color: "red" }


                      const today = new Date()


                      const dateColorer = today <= new Date(task.end_date[0]) ? { color: "white" } : { color: "red" }

                      const handleCompletedChange = async e => {
                        e.preventDefault()
                        const taskData = {
                          id: task.id,
                          completed: !task.completed
                        }
                        await dispatch(updateTaskCompletedThunk(taskData))
                        await dispatch(getAllSectionsThunk(projectId))
                      }

                      return (
                        <div key={i} className="task-grid">


                          <div
                            className="title-grid grid-ele"
                            style={task.completed ? { color: "grey" } : { color: "white" }}
                          >{task.title}
                          </div>

                          <div
                            className="description-grid grid-ele"
                            style={task.completed ? { color: "grey" } : { color: "white" }}
                          >{task.description}
                          </div>
                          <div

                            style={task.completed ? { color: "grey" } : prioColorer}
                            className="priority-grid grid-ele"
                          >{task?.priority[0]?.toUpperCase() + task?.priority?.slice(1).toLowerCase()}
                          </div>
                          <div
                            style={task.completed ? { color: "grey" } : statusColorer}
                            className="status-grid grid-ele"
                          >{task.status}
                          </div>
                          <div
                            className="date-grid grid-ele"
                            style={task.completed ? { color: "grey" } : dateColorer}
                          >{task.end_date[0].slice(0, 16)}
                          </div>
                          {/* <div
      className="completed-grid grid-ele"
      >{task.completed.toString()}
    </div> */}
                          <button onClick={handleCompletedChange}
                            className="completed-btn">
                            <img className="completed-check-icon"
                              src={task.completed === true ?
                                "https://i.imgur.com/AMAHBw2.png" :
                                "https://i.imgur.com/jLvYnjk.png"} />
                          </button>
                          {!task.completed && (

                            <div className="task-action-btns">
                              <EditTask task={task} />
                              <button className="delete-task-btn" onClick={handleTaskDelete}>Remove Task</button>
                            </div>
                          )}
                        </div>
                      )
                    })}
                     <CreateTask sectionId={section.id}/>
                  </div>
                )}
              </div>
            )
          })
          }

        </div>
        {/* end section testing */}
        {/* --------end handle list view-------- */}
        {/* ------handle board view------ */}
        {boardView && (

          <div>
            <h1>Welcome to Board View</h1>
          </div>
        )}
        {/*console.log(project.sections)*/}

        <div className="section-map-container">
          {project?.sections && boardView && project?.sections.map(section => {
            console.log(section)
            return (
              <div className="section-card">
                <div>{section.title}</div>

                <div className="board-task-map-container">
                  {section.tasks && section.tasks.map(task => {
                    const handleCompletedChange = async e => {
                      e.preventDefault()
                      const taskData = {
                        id: task.id,
                        completed: !task.completed
                      }
                      await dispatch(updateTaskCompletedThunk(taskData))
                      await dispatch(resetProjects())
                      await dispatch(getAllProjectsThunk())
                      await dispatch(getSingleProjectThunk(projectId))
                    }
                    return task.project_id === project.id && (
                      <div className="board-task-card">
                        <button onClick={handleCompletedChange} className="completed-btn">
                          <img className="completed-check-icon" src={task.completed === true ? "https://i.imgur.com/AMAHBw2.png" : "https://i.imgur.com/jLvYnjk.png"} />
                        </button>
                        <div>{task.title}</div>
                        <span>
                          <span>{task.priority}</span>
                          <span>{task.status}</span>
                        </span>
                        <EditTask task={task} />
                      </div>

                    )
                  })}
                  <CreateTask />
                </div>

              </div>
            )
          })}
          {/* --------end board view-------- */}
        </div>




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

                      className="title-text-input"
                      onChange={updateProjectTitle}
                      required
                    />
                  </div>
                  <div className="create-project-input-divs">
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <label>Description</label>
                      {showErrors && (
                        <div id="edit-project-description-err-div">{descriptionErr}</div>
                      )}
                    </div>
                    <textarea
                      id="create-project-text-area-input"
                      type="text"
                      defaultValue={project.description}

                      onChange={updateProjectDescription}
                      required
                      maxLength="251"
                    />
                    <div style={250 - projectDescription.length > 0 ? { color: "white" } : { color: "red" }}>{250 - projectDescription.length} characters left</div>
                  </div>
                  <button
                    type="submit"
                    className="something-else"
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
