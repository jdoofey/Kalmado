import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getSingleSectionThunk } from "../../store/section";

function Section(props){
  const dispatch = useDispatch()
  const history = useHistory()
  const section = useSelector(state => state.sections.singleSection)

  useEffect(()=>{
    dispatch(getSingleSectionThunk(props?.section))

  }, [dispatch])

  return(
    <h1>{section.title}</h1>
  )
}

export default Section
