import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Modal } from "../../context/Modal"
import { addSectionThunk } from "../../store/section"
import './CreateSection.css'
export default function CreateSection(props) {
  const dispatch = useDispatch()

  const [sectionTitle, setSectionTitle] = useState('')
  const [showSectionInput, setShowSectionInput] = useState(false)
  const projectId = props.projectId
  const handleSubmit = async e => {
    e.preventDefault()
    const newSection = {
      projectId,
      title: sectionTitle
    }
    const sectionData = await dispatch(addSectionThunk(newSection))
    if (sectionData) setShowSectionInput(false)
  }

  return (
    <div>
      {!showSectionInput && (
        <button
        className="create-task-btn"
        onClick={e=> {
          e.preventDefault()
          setShowSectionInput(true)
        }}>
          Add a Section
        </button>
      )}
      {showSectionInput && (
        <div>
          <form onSubmit={handleSubmit}>
            <div className='create-section-label-input-container'>
              <label
              className="create-section-label"
              >Section Name</label>
              <input
              className="create-section-input"
                required
                type="text"
                value={sectionTitle}
                onChange={e => setSectionTitle(e.target.value)}
              />
            </div>
            <div>
              <button className="create-task-btn" type="submit">Add to Project</button>
              <button
              className="create-task-btn-cancel"
              onClick={e=> {
                e.preventDefault()
                setShowSectionInput(false)
              }}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
