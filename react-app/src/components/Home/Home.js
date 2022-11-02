import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllProjectsThunk, resetProjects } from '../../store/project';
import projectdiagram from "../../assets/logo/projectdiagram.png"
import './Home.css'
import CreateProject from '../CreateProject/CreateProject';
function Home() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const projects = useSelector(state => state.projects.allProjects)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(getAllProjectsThunk())
    return () => dispatch(resetProjects())
      
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
    <div className="home-container">
      <div className='welcome-container'>

        <div className='home-date-div'>{`${day}, ${month} ${dateNumber}`}</div>
        <div className="home-hello-div">Hello, {`${user?.first_name} ${user?.last_name}`}</div>
      </div>
      <div className='project-container'>
        <div className="project-container-header">
          <div>Projects</div>
          <CreateProject />
        </div>
        <div className="project-map-container">
          {Object.values(projects).map((project) => {
            return (
              <Link className="home-project-card-link" to={`/projects/${project.id}`}>
                <div className='project-card-container'>
                  <img className="project-diagram-png" src={projectdiagram}></img>
                  <div>{project.title}</div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Home
