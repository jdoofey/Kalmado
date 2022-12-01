import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCommentThunk, getAllCommentsThunk } from "../../store/comments";
import * as moment from 'moment'

import "./Comments.css"

function Comments(props) {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const comments = useSelector(state => state.comments.allComments)
  console.log(moment)
  const task = props.task
  useEffect(() => {
    dispatch(getAllCommentsThunk(task.id))
  }, [])
  return (
    <div className="comments-parent-container">
      <div className="comment-map-container">

        {!!Object.values(comments).length && Object.values(comments).map((comment) => {
          return (
            <>
              <div className="comment-card-container">
                <div className="comment-text-container">
                  <div className="comment-body-div">{comment.body}</div>
                  <div>{moment(comment.created_at).fromNow()}</div>
                </div>
                {sessionUser.id === comment.user_id &&
                <div>
                  <button>Edit</button>
                  <button onClick={async (e) => {
                     e.preventDefault()
                     if (window.confirm("Are you sure you want to delete this comment?"))
                     await dispatch(removeCommentThunk(comment.id))
                     await dispatch(getAllCommentsThunk(task.id))
                  }}>Delete</button>
                </div>
                }
              </div>
            </>
          )
        })}
      </div>

    </div>
  )
}

export default Comments
