const LOAD_ONE = "sections/LOAD_ONE"

const loadOne = section => ({
  type: LOAD_ONE,
  section
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


let initialState = {

  singleSection: {},
  allSections: {}
}

const sectionReducer = (state = initialState, action ) => {
  let newState;
  switch(action.type){
    case LOAD_ONE:
      newState={...state, allSections:{...state.allSections}}
      newState.allSections = action.section
      return {...newState}
    default:
      return state
  }
}

export default sectionReducer
