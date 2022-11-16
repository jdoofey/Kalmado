import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import "./Comments.css"

function Comments(props){
  const dispatch = useDispatch()
  console.log(props.comments)
  return (
    <div>
      <h1>Hello from Comments</h1>
      {Object.values(props.comments).map((comment) => {
        return (

          <div>{comment.body}</div>
          )
      })}
    </div>
  )
}

export default Comments
