import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function SidePanel(props){
  const user = useSelector(state=> state.session.user)

  const sidePanelClass = props.sidePanel ? "open" :"closed"

  return(
    <div className={sidePanelClass}>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
      <button onClick={props.toggleSidePanel}>Toggle</button>
    </div>
  )
}

export default SidePanel
