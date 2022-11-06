const LOAD_ONE = "sections/LOAD_ONE"

const loadOne = section => ({
  type: LOAD_ONE,
  section
})

export const getSingleSectionThunk = sectionId => async dispatch => {
  const response = await fetch(`/api/sections/${sectionId}`)
  console.log("hit")
  if (response.ok) {
    const singleSectionData = await response.json()
    dispatch(loadOne(singleSectionData))
    return
  }
  return
}


let initialState = {

  singleSection: {}
}

const sectionReducer = (state = initialState, action ) => {
  let newState;
  switch(action.type){
    case LOAD_ONE:
      newState={...state, singleSection:{...state.singleSection}}
      newState.singleSection = action.section
      return {...newState}
    default:
      return state
  }
}

export default sectionReducer
