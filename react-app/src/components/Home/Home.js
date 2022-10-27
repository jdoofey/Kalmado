import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProjectsThunk } from '../../store/project';
import './Home.css'

function Home() {
  const dispatch = useDispatch()
  const user = useSelector(state=> state.session.user)
  useEffect(()=> {
   
    dispatch(getAllProjectsThunk())
  })
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
      <h1>{`${day}, ${month} ${dateNumber}`}</h1>
      <h2>Hello, {`${user.first_name} ${user.last_name}`}</h2>
    </div>
  )
}

export default Home
