import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProjectsThunk } from '../../store/project';
import './Home.css'

function Home() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const projects = useSelector(state => state.projects.allProjects)
  console.log(Object.values(projects))
  useEffect(() => {
    dispatch(getAllProjectsThunk())
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
      <div className="home-hello-div">Hello, {`${user.first_name} ${user.last_name}`}</div>
      </div>
      <div>
        {Object.values(projects).map((project) => {
          return (
            <div>
              <h1>{project.title}</h1>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home
