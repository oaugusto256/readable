import React from 'react';

export default (props) => {
  return (
    <div className="input-container">
      <p className='label'>{props.label}</p>
      <input
        className='input'
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        type={'text' || props.type}
        placeholder={props.placeholder}
      />
    </div>
  )
}