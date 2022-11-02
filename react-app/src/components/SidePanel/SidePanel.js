import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory, Link } from 'react-router-dom';
import { getAllProjectsThunk, resetProjects } from '../../store/project';
import logo from "../../assets/logo/Kalmado-1.png"
import * as sessionActions from "../../store/session"
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
    // dispatch(resetProjects())
    dispatch(getAllProjectsThunk())
  }, [dispatch])

  const logout = e => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  }
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

        <div className="sp-project-map-container" >
          {Object.values(projects).map((project, i) => {
            return (
              <Link key={i}className="sidepanel-project-card-link" to={`/projects/${project.id}`}>
                <div style={{ display: "flex", alignItems:"center",  }}>

                  <i className="fa-solid fa-square" style={{ color: project.color }}></i>
                  <div className="sidepanel-list-ele">{project.title}</div>
                </div>
              </Link>
            )
          })}
        </div>
        <br></br>
        <div>
          <button className="sign-out-btn" onClick={logout}>Sign out</button>
        </div>

      </nav>
    </>
  )
}

export default SidePanel
