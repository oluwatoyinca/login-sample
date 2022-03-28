import React from 'react'

const Input = (props) => {
    return (
         <div
          className={props.className}
        >
          <label htmlFor={props.id || ''}>{props.label || ''}</label>
          <input
            type={props.type || 'text'} 
            id={props.id || ''}
            value={props.value || ''}
            onChange={props.onChange || ''}
          />
        </div>
    )
}

export default Input