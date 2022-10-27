const LOAD_ALL = "projects/LOAD_ALL"
const LOAD_ONE = "projects/LOAD_ONE"
const CREATE ="projects/CREATE"
const UPDATE = "projects/UPDATE"
const REMOVE = "projects/REMOVE"

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

export const getAllProjectsThunk = () => async (dispatch) => {
  const response = await fetch("/api/projects/");

  if (response.ok) {
    const projectsData = await response.json();
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
    default:
      return state
  }
}

export default projectReducer
