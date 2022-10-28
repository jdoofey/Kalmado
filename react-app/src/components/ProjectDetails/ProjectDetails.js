
import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleProjectThunk, updateProjectThunk, resetProjects } from "../../store/project";
import './ProjectDetails.css'

function ProjectDetails() {
  const dispatch = useDispatch()
  const {projectId} = useParams()
  const project = useSelector(state=> state.projects.singleProject)
  useEffect(()=> {
    dispatch(getSingleProjectThunk(projectId))
    return () => dispatch(resetProjects())
  }, [dispatch])

  const [projectTitle, setProjectTitle] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [showErrors, setShowErrors] = useState(false)
  const [validationErrs, setValidationErrs] = useState([])
  const [titleErr, setTitleErr] = useState('')
  const [descriptionErr, setDescriptionErr] = useState('')
  const updateProjectTitle = e => setProjectTitle(e.target.value)
  const updateProjectDescription = e => setProjectDescription(e.target.value)

  const handleSubmit = async e => {
    e.preventDefault()
    setShowErrors(true)
    if (!validationErrs.length){
      const updatedProjectData = {
        title: projectTitle,
        description: projectDescription
      }
      setShowErrors(false)
      let updatedProject = await dispatch(updateProjectThunk(updatedProjectData))
      if(updatedProject){
        windows.alert("Your project has been updated!")
      }
    }
  }
  return (
    <div className="project-details-container">

      <h1>{project.title}</h1>
      <h4>{project.description}</h4>
      <button>Edit Project</button>
    </div>
  )
}

export default ProjectDetails
