import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { getAllProjectsThunk, resetProjects } from '../../store/project';
import './SidePanel.css'
function SidePanel(props) {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.session.user)
  const projects = useSelector(state => state.projects.allProjects)
  useEffect(() => {
    dispatch(getAllProjectsThunk())
  }, [dispatch])

  const sidePanelClass = props.sidePanel ? "sp-open" : "sp-close"
  console.log(sidePanelClass)
  return (
    <>
      <nav className={sidePanelClass}>
        <button
          onClick={props.toggleSidePanel}
          className="sidepanel-toggle"
        >TODO: TOGGLE ME</button>
        <button
          onClick={() => history.push('/home')}
        >Home</button>
        <div>My Projects</div>
        {Object.values(projects).map(project => {
          return (

            <div>{project.title}</div>
          )
        })}
      </nav>
    </>
  )
}

export default SidePanel
