import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './SidePanel.css'
function SidePanel(props) {
  const user = useSelector(state => state.session.user)
  const projects = useSelector(state => state.projects.allProjects)

  const sidePanelClass = props.sidePanel ? "sidepanel  sp-open" : "sidepanel sp-close"
  console.log(sidePanelClass)
  return (
    <nav className={sidePanelClass}>
      <div>My Projects</div>
      {Object.values(projects).map(project => {
        return (

          <div>{project.title}</div>
        )
      })}
      <button
        onClick={props.toggleSidePanel}
        className="sidepanel-toggle"
      >TODO: TOGGLE ME</button>
    </nav>
  )
}

export default SidePanel
