import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './SidePanel.css'
function SidePanel(props){
  const user = useSelector(state=> state.session.user)

  const sidePanelClass = props.sidePanel ? "sidepanel  sp-open" :"sidepanel sp-close"
  console.log(sidePanelClass)
  return(
    <nav className={sidePanelClass}>
      <div>Hi Im sidepanel</div>
      <div>Item 2</div>
      <div>Item 3</div>
      <button
      onClick={props.toggleSidePanel}
      className="sidepanel-toggle"
      >Toggle</button>
    </nav>
  )
}

export default SidePanel
