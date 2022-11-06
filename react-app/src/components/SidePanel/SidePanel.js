import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { getAllProjectsThunk, resetProjects } from '../../store/project';
import * as sessionActions from "../../store/session"
import logo from "../../assets/logo/Kalmado-1.png"
import home from "../../assets/logo/home.png"
import left from "../../assets/logo/dbl-left.png"
import './SidePanel.css'

function SidePanel(props) {
  const dispatch = useDispatch()
  const history = useHistory()
  // const user = useSelector(state => state.session.user)
  const projects = useSelector(state => state.projects.allProjects)

  useEffect(() => {
    dispatch(resetProjects())
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
        <a
            href="https://github.com/jdoofey/Kalmado"
            target="_blank"
            rel="noreferrer">
        <img className="sidebar-logo" alt="sidebar-logo" src={logo} style={{ backgroundColor: "transparent" }}></img>
        </a>
        <div style={{ display: "flex", justifyContent: "space-between" }}>

          <button
            className='home-btn'
            onClick={() => history.push('/home')}
          ><img className="home-icon" alt="home-icon" src={home} />Home</button>
          {/* <button
            onClick={props.toggleSidePanel}
            className="sidepanel-toggle"
          ><img src={left} alt="left-icon"></img></button> */}
        </div>

        <div style={{ fontSize: "20px", alignSelf: "center", marginTop: "10px", marginBottom: "10px" }}>My Projects</div>

        <div className="sp-project-map-container" >
          {Object.values(projects).map((project, i) => {

            return (
              <Link key={i} className="sidepanel-project-card-link" to={`/projects/${project.id}`}>
                <div style={{ display: "flex", alignItems: "center", }}>


                  <i className="fa-solid fa-square" style={{ color: "#1DB954" }}></i>
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
        <div className="sp-jake-links">
          <div className='sp-creator'>
            <div >
              Created By
            </div>
            <div className="sp-jake-name-container">
              &nbsp;Jake Matillano
            </div>
          </div>
          <a
            href="https://github.com/jdoofey"
            target="_blank"
            rel="noreferrer">
            <div className="sp-github-btn"></div>
          </a>
          <a
            href="https://www.linkedin.com/in/jake-matillano-b141811a3?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BGenPDa3ITHyXMUJHp63OYg%3D%3D"
            target="_blank"
            rel="noreferrer">
            <div className="sp-linkedin-btn"></div>
          </a>
        </div>
      </nav>
    </>
  )
}

export default SidePanel
