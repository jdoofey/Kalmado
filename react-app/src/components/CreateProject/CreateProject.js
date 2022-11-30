import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Modal } from "../../context/Modal";
import { createProjectThunk } from "../../store/project";
import './CreateProject.css'
function CreateProject() {
  const dispatch = useDispatch()
  const history = useHistory()

  const [projectTitle, setProjectTitle] = useState('')
  const [projectDescription, setProjectDescription] = useState('')

  const [validationErrs, setValidationErrs] = useState([])
  const [showErrors, setShowErrors] = useState(false)

  const [titleErr, setTitleErr] = useState('')
  const [descriptionErr, setDescriptionErr] = useState('')

  const updateProjectTitle = e => setProjectTitle(e.target.value)
  const updateProjectDescription = e => setProjectDescription(e.target.value)



  useEffect(() => {
    let errors = []
    if (projectTitle.length > 40 || projectTitle.length < 3 || projectTitle.trim()<1) {
      errors.push("Project title must be between 3 and 40 characters")
      setTitleErr("Project title must be between 3 and 40 characters")
    }
    else setTitleErr("")

    if (projectDescription.length > 250) {
      errors.push("Description must be less than 250 characters")
      setDescriptionErr("Description must be less than 250 characters")
    }
    else setDescriptionErr("")
    if(projectDescription.trim()<1){
      errors.push("Description cannot be empty spaces")
      setDescriptionErr("Description cannot be empty spaces")
    }
    else setDescriptionErr("")

    setValidationErrs(errors)
  }, [projectTitle, projectDescription])


  const handleSubmit = async e => {
    e.preventDefault()
    if (validationErrs.length) {
      setShowErrors(true)
    }
    if (!validationErrs.length) {
      const project = {
        title: projectTitle,
        description: projectDescription
      }
      let createdProject = await dispatch(createProjectThunk(project))
      if (createdProject) {
        setShowErrors(false)
        history.push(`/projects/${createdProject.id}`)
      }
    }
  }

  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <div
        className="home-project-card-link"
        onClick={() => setShowModal(true)}>
        <div className='add-project-card-container' >
          <img
            className="add-project-png"
            alt="project-diagram"
            src="https://i.imgur.com/71sCzux.png"></img>
          <div>Create a New Project</div>
        </div>
      </div>
      {showModal && (

        <Modal>
          <div id="create-project-modal-container">

            <div
              className="create-project-cancel-btn"
              onClick={() => {
                setProjectTitle("")
                setProjectDescription("")
                setTitleErr("")
                setDescriptionErr("")
                setValidationErrs([])
                setShowErrors(false)
                setShowModal(false)
              }}
            >X</div>
            <div className="create-project-header">Create your new project</div>
            <div className="create-project-content">
              <form onSubmit={handleSubmit}>
                <div className="create-project-input-divs">
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <label className="create-project-title-label">Title</label>
                    {showErrors && (
                      <div id="create-project-title-err-div">{titleErr}</div>
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="Project title goes here..."
                    value={projectTitle}
                    onChange={updateProjectTitle}
                    className="title-text-input"
                    required
                  />
                </div>
                <div
                  className="create-project-input-divs">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between"
                    }}>
                    <label style={{marginBottom:"2px"}}>Description</label>
                    {showErrors && (
                      <div id="create-project-title-err-div">{descriptionErr}</div>
                    )}
                  </div>
                  <textarea
                    id="create-project-text-area-input"
                    type="text"
                    placeholder="Project title goes here..."
                    value={projectDescription}
                    onChange={updateProjectDescription}
                    maxLength="250"
                    required
                  />

                  <div style={250 - projectDescription.length > 0 ? { color: "white" } : { color: "red" }}>{250 - projectDescription.length} characters left</div>
                </div>
                <button
                className="something-else"
                  type="submit"
                >Submit</button>
              </form>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

export default CreateProject
