import PropTypes from 'prop-types'



const Button = ({color,text,onClick}) => {
    
  return (
     <button onClick={onClick} style={{background:color}} className='btn'>{text}</button>
  )
}

export default Button

Button.defaultProps={
    color:"blue",

}
Button.propTypes = {
    text : PropTypes.string,
    color : PropTypes.string,
    onClick :  PropTypes.func
}
 