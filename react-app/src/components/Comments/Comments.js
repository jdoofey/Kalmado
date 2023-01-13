import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCommentThunk, getAllCommentsThunk } from "../../store/comments";
import * as moment from 'moment'
import "./Comments.css"

function Comments(props) {
  const dispatch = useDispatch()

  const sessionUser = useSelector(state => state.session.user)
  
  const comments = useSelector(state => state.comments.allComments)

  const task = props.task

  useEffect(() => {
    dispatch(getAllCommentsThunk(task.id))
  }, [dispatch, task.id])

  return (
    <div className="comments-parent-container">
      <div className="comment-map-container">

        {!!Object.values(comments).length && Object.values(comments).map((comment) => {
          return (
            <>
              <div className="comment-card-container">
                <div className="comment-text-container">
                  <div className="comment-body-div">{comment.body}</div>
                  <div>{moment(comment.created_at).format('llll')}</div>
                </div>
                {sessionUser.id === comment.user_id &&
                <div>
                  <button className="comments-actions-btns">Edit</button>

                  <button className="comments-actions-btns" onClick={async (e) => {
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
