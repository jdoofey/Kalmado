import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProjectThunk, getAllProjectsThunk } from "../../store/project";
import { createCommentThunk } from "../../store/comments";
import './CreateComment.css'

function CreateComment(props){
  const dispatch = useDispatch()
  const project = useSelector(state => state.projects.singleProject)
  console.log(project)
  const [commentBody, setCommentBody] = useState('')
  const [validationErrs, setValidationErrs] = useState([])
  const [showErrors, setShowErrors] = useState(false)
  const [bodyErr, setBodyErr] = useState('')

  const updateCommentBody = e => setCommentBody(e.target.value)

  useEffect(()=> {
    const errors = []
    if (commentBody.length > 250) {
      errors.push("Comment must be less than 250 characters")
      setBodyErr("Comment must be less than 250 characters")
    }
    if (commentBody.trim()<1) {
      errors.push("Comment cannot be empty")
      setBodyErr("Comment cannot be empty")
    }
    setValidationErrs(errors)
  }, [commentBody])

  useEffect(() => {
    dispatch(getSingleProjectThunk(project.id))
  }, [dispatch, project.id])

  const handleCommentSubmit = async e => {
    e.preventDefault()
    if (validationErrs.length){
      setShowErrors(true)
    }
    else {
      setShowErrors(false)
      let createdComment = await dispatch(createCommentThunk({commentBody}, props.task.id));
      if (createdComment) {

        await dispatch(getSingleProjectThunk(project.id))
        setCommentBody("")
      }
    }
  }

  return (
    <>

      <form onSubmit={handleCommentSubmit}>
        <textarea
        className="create-comment-text-area-input"
        type="text"
        placeholder="Post a note or an update"
        value={commentBody}
        onChange={updateCommentBody}
        ></textarea>
        <button
        className="comment-submit-btn"
        type="submit">Comment</button>
      </form>
    </>
  )
}

export default CreateComment
