const LOAD_ALL = "projects/LOAD_ALL"
const LOAD_ONE = "projects/LOAD_ONE"
const CREATE ="projects/CREATE"
const UPDATE = "projects/UPDATE"
const REMOVE = "projects/REMOVE"
const RESET ="projects/RESET"

const loadAll = projects => ({
  type:LOAD_ALL,
  projects
})

const loadOne = project => ({
  type:LOAD_ONE,
  project
})

const create = (project) => ({
  type: CREATE,
  project
});

const update = (project) => ({
  type: UPDATE,
  project
});

const remove = projectId => ({
  type: REMOVE,
  projectId
});

export const resetProjects = () => ({
  type:RESET
})

export const getAllProjectsThunk = () => async (dispatch) => {
  const response = await fetch("/api/projects/current");

  if (response.ok) {
    const projectsData = await response.json();
    // console.log("hit", projectsData)
    await dispatch(loadAll(projectsData));
    return projectsData
  }
  return;
};

export const getSingleProjectThunk = (projectId) => async (dispatch) => {
  const response = await fetch(`/api/projects/${projectId}`);

  if (response.ok) {
    const singleProjectData = await response.json();
    dispatch(loadOne(singleProjectData));
    return
  }
  return
}

export const createProjectThunk = project => async dispatch => {
  const response = await fetch('/api/projects/', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(project)
  });
  console.log("hit")
  if (response.ok) {
    console.log("hit2")
    const createdProjectData = await response.json();
    dispatch(create(createdProjectData))
    return createdProjectData
  }
  return response
}

export const updateProjectThunk = (project, projectId) => async dispatch => {
  const response = await fetch(`/api/projects/${projectId}`, {
    method:'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(project)
  });
  if (response.ok) {
    const updatedProjectData = await response.json();
    dispatch(update(updatedProjectData))
    return updatedProjectData
  }
  return
}


let initialState = {
  allProjects: {},
  singleProject: {}
}

const projectReducer = (state = initialState, action) => {
  let newState;
  const allProjects = {}
  switch(action.type) {
    case LOAD_ALL:
      action.projects.forEach(project => {
        allProjects[project.id] = project
      })
      return {
        ...state,
        allProjects
      }
    case LOAD_ONE:
      newState={...state, allProjects:{...state.allProjects}, singleProject:{...state.singleProject}}
      newState.singleProject = action.project
      return {...newState}
    // case CREATE:
    //   newState = { allProjects: {...state.allProjects}}
    //   newState.singleProject = action.project
    //   return newState
    // case UPDATE:
    //   newState =
    case RESET:
      return initialState
    default:
      return state
  }
}

export default projectReducer
