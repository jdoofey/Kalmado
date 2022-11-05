import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllProjectsThunk } from '../../store/project';
import projectdiagram from "../../assets/logo/projectdiagram.png"
import CreateProject from '../CreateProject/CreateProject';
import './Home.css'

function Home() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const projects = useSelector(state => state.projects.allProjects)

  useEffect(() => {
    dispatch(getAllProjectsThunk())
    // return dispatch(resetProjects())
  }, [dispatch])

  const today = new Date()

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const day = days[today.getDay()]
  const month = months[today.getMonth()]
  const dateNumber = today.getDate()

  return (
    <>

      <div className="home-container">
        <div className='welcome-container'>

          <div className='home-date-div'>{`${day}, ${month} ${dateNumber}`}</div>
          <div className="home-hello-div">Hello, {`${user?.first_name} ${user?.last_name}`}</div>
        </div>
        <div className='project-container'>
          <div className="project-container-header">
            <div style={{ fontSize: "30px", marginLeft: "27px" }}>Projects</div>

          </div>

          <div className="project-map-container">
          <div className="home-project-card-link">
            <CreateProject />
            </div>
            {Object.values(projects).map((project) => {
              return (
                <div className="home-project-card-link">
                  <Link className='project-card-container' to={`/projects/${project.id}`}>
                    <img className="project-diagram-png" alt="project-diagram" src={projectdiagram}></img>
                    <div className="home-project-card-title" >{project.title}</div>

                  </Link>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </>
  )
}

export default Home
