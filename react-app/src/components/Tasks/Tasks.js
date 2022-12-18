import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { deleteTaskThunk, updateTaskCompletedThunk } from "../../store/task"
import EditTask from "../EditTask/EditTask"
import { getSingleProjectThunk, getAllProjectsThunk, resetProjects } from "../../store/project"
export default function Tasks(props){
  const dispatch = useDispatch()
  const tasks = props.tasks
  const projectId = props.projectId
  useEffect(() => {
    dispatch(getAllProjectsThunk())
    dispatch(getSingleProjectThunk(projectId))

  }, [])

  return (
    <div>
                {!!tasks.length && (
                  <div>

                    <div className="task-grid">
                      <div>Task</div>
                      <div style={{ marginLeft: "290px" }}>Description</div>
                      <div style={{ marginLeft: "540px" }}>Priority</div>
                      <div style={{ marginLeft: "70px" }}>Status</div>
                      <div style={{ marginLeft: "75px" }}>Due Date</div>

                    </div>
                    {tasks.map((task, i) => {

                      const handleTaskDelete = async (e) => {
                        if (window.confirm('Are you sure you want to remove this task?'))
                          await dispatch(deleteTaskThunk(task.id))
                        await dispatch(getSingleProjectThunk(projectId))
                      }

                      const prioColorer = task.priority.toLowerCase() === "medium" ? { color: "yellow" }
                        : task.priority.toLowerCase() === "low" ? { color: "#1EEE67" }
                          : { color: "red" }
                      const statusColorer = task.status === "At Risk" ? { color: "red" }
                        : task.status === "On Track" ? { color: "#1EEE67" }
                          : { color: "red" }


                      const today = new Date()


                      const dateColorer = today <= new Date(task.end_date[0]) ? { color: "white" } : { color: "red" }

                      const handleCompletedChange = async e => {
                        e.preventDefault()
                        const taskData = {
                          id: task.id,
                          completed: !task.completed
                        }
                        await dispatch(updateTaskCompletedThunk(taskData))
                        await dispatch(resetProjects())
                        await dispatch(getAllProjectsThunk())
                        await dispatch(getSingleProjectThunk(projectId))
                      }

                      return (
                        <div key={i} className="task-grid">


                          <div
                            className="title-grid grid-ele"
                            style={task.completed ? { color: "grey" } : { color: "white" }}
                          >{task.title}
                          </div>

                          <div
                            className="description-grid grid-ele"
                            style={task.completed ? { color: "grey" } : { color: "white" }}
                          >{task.description}
                          </div>
                          <div

                            style={task.completed ? { color: "grey" } : prioColorer}
                            className="priority-grid grid-ele"
                          >{task?.priority[0]?.toUpperCase() + task?.priority?.slice(1).toLowerCase()}
                          </div>
                          <div
                            style={task.completed ? { color: "grey" } : statusColorer}
                            className="status-grid grid-ele"
                          >{task.status}
                          </div>
                          <div
                            className="date-grid grid-ele"
                            style={task.completed ? { color: "grey" } : dateColorer}
                          >{task.end_date[0].slice(0, 16)}
                          </div>
                          {/* <div
      className="completed-grid grid-ele"
      >{task.completed.toString()}
    </div> */}
                          <button onClick={handleCompletedChange}
                            className="completed-btn">
                            <img className="completed-check-icon"
                              src={task.completed === true ?
                                "https://i.imgur.com/AMAHBw2.png" :
                                "https://i.imgur.com/jLvYnjk.png"} />
                          </button>
                          {!task.completed && (

                            <div className="task-action-btns">
                              <EditTask task={task} />
                              <button className="delete-task-btn" onClick={handleTaskDelete}>Remove Task</button>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
  )
}
