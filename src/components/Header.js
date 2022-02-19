import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router-dom'
const Header = ({title,onToggle,showAdd}) => {
    const location = useLocation()
  return (
    <header className="header"  >
      <h1>{title}</h1>
     {location.pathname === '/' &&(
       <Button color={showAdd?'Red':'green'}  onClick={onToggle} text={showAdd?'Close':'Add'}/>
       )}
    </header>
  )
}
Header.defaultProps={
    title:"Tracker",
}
Header.propTypes = {
    title : PropTypes.string.isRequired,
}
 


export default Header
