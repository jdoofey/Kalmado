const LOAD_ALL = "Tasks/LOAD_ALL"
const LOAD_ONE = "Tasks/LOAD_ONE"
const CREATE ="Tasks/CREATE"
const UPDATE = "Tasks/UPDATE"
const REMOVE = "Tasks/REMOVE"
const RESET ="Tasks/RESET"

const loadAll = Tasks => ({
  type:LOAD_ALL,
  Tasks
})

const loadOne = task => ({
  type:LOAD_ONE,
  task
})

const create = (task) => ({
  type: CREATE,
  task
});

const update = (task) => ({
  type: UPDATE,
  task
});

const remove = taskId => ({
  type: REMOVE,
  taskId
});

export const resetTasks = () => ({
  type:RESET
})

export const createTaskThunk = task => async dispatch => {
  const response = await fetch('/api/tasks/', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(task)
  });

  if (response.ok) {

    const createdTaskData = await response.json();
    dispatch(create(createdTaskData))
    return createdTaskData
  }
  return response
}

export const updateTaskThunk = task => async dispatch => {
  const response = await fetch(`/api/tasks/${task.id}`, {
    method: 'PUT',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(task)
  })
  if (response.ok) {
    const updatedTaskData = await response.json()
    dispatch(update(updatedTaskData))
    return updatedTaskData
  }
  return
}

let initialState={
  allTasks:{},
  singleTask:{}
}
const taskReducer = (state = initialState, action) => {
  let newState;
  const allTasks = {}
  switch(action.type) {

    default:
      return state
  }
}

export default taskReducer
