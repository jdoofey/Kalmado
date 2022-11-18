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
    dispatch(loadAll(comments, taskId));
    return comments;
  };
  return;
}

export const createCommentThunk = (comment, taskId) => async dispatch => {
  const response = await fetch(`/api/comments/${taskId}`, {
    method:'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(comment)
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

