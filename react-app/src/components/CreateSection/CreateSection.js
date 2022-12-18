import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Modal } from "../../context/Modal"
import { addSectionThunk } from "../../store/section"

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
        <button onClick={e=> {
          e.preventDefault()
          setShowSectionInput(true)
        }}>
          Add a Section
        </button>
      )}
      {showSectionInput && (
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Section Name</label>
              <input
                required
                type="text"
                value={sectionTitle}
                onChange={e => setSectionTitle(e.target.value)}
              />
            </div>
            <div>
              <button type="submit">Add to Project</button>
              <button onClick={e=> {
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
