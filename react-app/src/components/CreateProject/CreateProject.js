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
    const errors = []
    if (projectTitle.length > 40 || projectTitle.length < 3) {
      errors.push("Project title must be between 3 and 40 characters")
      setTitleErr("Project title must be between 3 and 40 characters")
    }
    if (projectDescription.length > 250) {
      errors.push("Description must be less than 250 characters")
      setDescriptionErr("Description must be less than 250 characters")
    }
    setValidationErrs(errors)
  }, [projectTitle, projectDescription])


  const handleSubmit = async e => {
    e.preventDefault()
    console.log("validations",validationErrs)
    setShowErrors(true)
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
      <div className="home-project-card-link" onClick={()=> setShowModal(true)}>
        <div className='add-project-card-container' >
          <img className="add-project-png" src="https://i.imgur.com/71sCzux.png"></img>
          <div>Create a New Project</div>
        </div>
      </div>
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
                    placeholder="Project title goes here..."
                    value={projectTitle}
                    onChange={updateProjectTitle}
                    required
                  />
                </div>
                <div className="create-project-input-divs">
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <label>Description</label>
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
                    required
                  />
                  <div style={250-projectDescription.length > 0 ? {color:"black"}:{color:"red"}}>{250-projectDescription.length} characters left</div>
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
