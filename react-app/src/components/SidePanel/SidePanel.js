import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory, Link } from 'react-router-dom';
import { getAllProjectsThunk, resetProjects } from '../../store/project';
import logo from "../../assets/logo/Kalmado-1.png"
import square from "../../assets/logo/square.png"
import home from "../../assets/logo/home.png"
import left from "../../assets/logo/dbl-left.png"
import './SidePanel.css'
function SidePanel(props) {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.session.user)
  const projects = useSelector(state => state.projects.allProjects)
  useEffect(() => {
    dispatch(getAllProjectsThunk())
    return () => dispatch(resetProjects())
  }, [dispatch])

  const sidePanelId = props.sidePanel ? "sp-open" : "sp-close"

  return (
    <>
      <nav id={sidePanelId} className="sidebar-panel">
        <img className="sidebar-logo"src={logo} style={{ backgroundColor: "grey", borderRight:"1px solid rgb(37, 37, 37)" }}></img>
        <div style={{ display: "flex", justifyContent: "space-between" }}>

          <button
          className='home-btn'
            onClick={() => history.push('/home')}
          ><img className="home-icon" src={home} />Home</button>
          <button
            onClick={props.toggleSidePanel}
            className="sidepanel-toggle"
          ><img src={left}></img></button>
        </div>

        <div style={{ fontSize: "20px", alignSelf: "center", marginTop: "10px", marginBottom:"10px" }}>My Projects</div>

        <div style={{display:"flex", flexDirection:"column",}}>
          {Object.values(projects).map(project => {
            return (
              <Link className="sidepanel-project-card-link" to={`/projects/${project.id}`}>
                <div style={{ display: "flex", alignItems:"center",  }}>

                  <i class="fa-solid fa-square" style={{ color: project.color }}></i>
                  <div className="sidepanel-list-ele">{project.title}</div>
                </div>
              </Link>
            )
          })}
        </div>

      </nav>
    </>
  )
}

export default SidePanel
