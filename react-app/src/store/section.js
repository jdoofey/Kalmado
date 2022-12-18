const LOAD_ALL = "sections/LOAD_ALL"
const ADD = "sections/ADD"
const RESET ="sections/RESET"
const loadOne = section => ({
  type: LOAD_ALL,
  section
})

const addSection = section => ({
  type: ADD,
  section
})

export const resetSections = () => ({
  type:RESET
})

export const getAllSectionsThunk = projectId => async dispatch => {
  const response = await fetch(`/api/sections/${projectId}`)
  console.log("hit")
  if (response.ok) {
    const singleSectionData = await response.json()
    dispatch(loadOne(singleSectionData))
    return singleSectionData
  }
  return response
}

export const addSectionThunk = section => async dispatch => {
  const response = await fetch('/api/sections/', {
    method:'POST',
    headers: {'Content-Type': 'application/json'},
    body:JSON.stringify(section)
  });
  if (response.ok){
    const addedSectionData = await response.json()
    await dispatch(addSection(addedSectionData))
    return addedSectionData
  }
  return "Bad Data"
}

let initialState = {

  singleSection: {},
  allSections: {}
}

const sectionReducer = (state = initialState, action ) => {
  let newState;
  switch(action.type){
    case LOAD_ALL:
      newState={...state, allSections:{...state.allSections}}
      newState.allSections = action.section
      return {...newState}
    case ADD:
      newState = {...state, allSections:{...state.allSections, [action.section.id]:{...action.section}}}
      return newState
    case RESET: {
      return initialState
    }
    default:
      return state
  }
}

export default sectionReducer
