import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as moment from 'moment'

import "./Comments.css"

function Comments() {
  const dispatch = useDispatch()
  const comments = useSelector(state => state.comments.allComments)
  console.log(moment)
  return (
    <div className="comments-parent-container">
      <div className="comment-map-container">

        {!!Object.values(comments).length && Object.values(comments).map((comment) => {
          return (
            <>
              <div className="comment-card-container">
                <div>{comment.body}</div>
                <div>{moment(comment.created_at).fromNow()}</div>
              </div>
            </>
          )
        })}
      </div>

    </div>
  )
}

export default Comments
