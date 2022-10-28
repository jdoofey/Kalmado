
import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleProjectThunk } from "../../store/project";
import './ProjectDetails.css'

function ProjectDetails() {
  const dispatch = useDispatch()
  const {projectId} = useParams()
  const project = useSelector(state=> state.projects.singleProject)
  useEffect(()=> {
    dispatch(getSingleProjectThunk(projectId))
  }, [dispatch])

  return (
    <div className="project-details-container">

      <h1>{project.title}</h1>
      <h4>{project.description}</h4>
      <button>Edit Project</button>
    </div>
  )
}

export default ProjectDetails
