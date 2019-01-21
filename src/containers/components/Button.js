import React from 'react'

export default (props) => {
  return (
    <button
      onClick={props.onClick}
      className={props.style}
    >
      {props.name}
    </button>
  )
}