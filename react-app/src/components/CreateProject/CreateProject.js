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
      const project = {
        title: projectTitle,
        description: projectDescription
      }
      setShowErrors(false)
      let createdProject = await dispatch(createProjectThunk(project))
      if (createdProject) {
        history.push(`/projects/${createdProject.id}`)
      }
    }
  }
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <button
        className="home-create-project-btn"
        onClick={() => setShowModal(true)}
      >Create a New Project</button>
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
                  <div style={{display:"flex", justifyContent:"space-between"}}>
                    <label id="create-project-title-label">Title</label>
                    {showErrors&& (
                      <div id="create-project-title-err-div">{titleErr}</div>
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="Project title goes here..."
                    value={projectTitle}
                    onChange={updateProjectTitle}
                    required
                  />
                </div>
                <div className="create-project-input-divs">
                  <div style={{display:"flex"}}>
                    <label>Description</label>
                    {showErrors&& (
                    <div>{descriptionErr}</div>
                    )}
                  </div>
                  <textarea
                    id="create-project-text-area-input"
                    type="text"
                    placeholder="Project title goes here..."
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
    </>
  )
}

export default CreateProject
