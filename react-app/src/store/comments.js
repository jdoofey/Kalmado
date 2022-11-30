const LOAD_ALL = "comments/LOAD_ALL"
const LOAD_ONE = "comments/LOAD_ONE"
const CREATE ="comments/CREATE"
const UPDATE = "comments/UPDATE"
const REMOVE = "comments/REMOVE"
const RESET ="comments/RESET"

const loadAll = (comments, taskId) => ({
  type:LOAD_ALL,
  comments,
  taskId
})

const loadOne = comment => ({
  type:LOAD_ONE,
  comment
})

const create = (comment, taskId) => ({
  type: CREATE,
  comment,
  taskId
});

const update = (comment) => ({
  type: UPDATE,
  comment
});

const remove = commentId => ({
  type: REMOVE,
  commentId
});

export const resetComments = () => ({
  type:RESET
})

export const getAllCommentsThunk = taskId => async dispatch => {
  const response = await fetch(`/api/comments/${taskId}`)

  if (response.ok) {
    const comments = await response.json();
    console.log(comments)
    dispatch(loadAll(comments, taskId));
    return comments;
  };
  return;
}

export const createCommentThunk = (commentBody, taskId) => async dispatch => {

  const response = await fetch(`/api/comments/${taskId}`, {
    method:'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(commentBody)
  });
  if (response.ok) {
    const newComment = await response.json();
    dispatch(create(newComment, taskId));
    return newComment;
  };
  return;
}

export const updateCommentThunk = (comment) => async dispatch => {
  const response = await fetch(`/api/comments/${comment.id}`, {
    method:'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(comment)
  });
  if (response.ok) {
    const updatedComment = await response.json();
    dispatch(update(updatedComment));
    return updatedComment;
  }
  return;
}

export const removeCommentThunk = commentId => async dispatch => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: 'DELETE'
  });
  if (response.ok) {
    dispatch(remove(commentId));
    ;
  }
  return;
}
let initialState = {
  allComments: {},
  singleComment: {}
}
const commentReducer = (state = initialState, action) => {
  let newState;
  const allComments = {};
  switch (action.type) {
    case LOAD_ALL:
      action.comments.forEach(comment => {
        allComments[comment.id] = {...comment};
      });
      return {...state, allComments:{...allComments}};
    case CREATE:
      // newState = { allComments: {...state.allComments, }}
      // newState.singleComment = {...action.comment};

      return {allComments: {...state.allComments, [action.comment.id]: {...action.comment}}, singleComment: {...state.singleComment}};
    case UPDATE:
      newState = {allComments:{...state.allComments}};
      newState.singleComment = action.comment;
      return newState;
    case REMOVE:
      newState = {
        allComments:{...state.allComments},
        singleComment:{...state.allComments}
      }
      delete newState.allComments[action.commendId]
      if (newState.singleComment.id === action.commentId) {
        newState.singleComment = {};
      };
      return newState;
    case RESET:
      return initialState;
    default:
       return state;
  }
}

export default commentReducer
