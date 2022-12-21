import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { editSectionThunk, getAllSectionsThunk } from "../../store/section"
export default function EditSection(props) {
  const dispatch = useDispatch()
  const section = props.section

  const [sectionTitle, setSectionTitle] = useState(section.title)
  const updateSectionTitle = e => setSectionTitle(e.target.value)

  const handleSubmit = async e => {
    e.preventDefault()
    if (sectionTitle.length){
      const sectionData = {
        title:sectionTitle
      }
      let editedSection = await dispatch(editSectionThunk(sectionData))
      if (editedSection) {
        await dispatch(getAllSectionsThunk(props.projectId))
      }
    }
  }
  return (
    <div>
      <h1>{section.title}</h1>
      {/* <form onSubmit={handleSubmit}>
        <label></label>
        <input
          onChange={updateSectionTitle}
          value={sectionTitle}
        />
        <input type="submit" hidden />
      </form> */}
    </div>
  )
}
