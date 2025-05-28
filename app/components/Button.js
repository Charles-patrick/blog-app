import React from 'react'

const Button = ({ children, onClick , type=' button '}) => {
  return (
    <button 
    onClick={onClick} 
    className="px-4 py-2 rounded bg-red w-full "
    style={{ backgroundColor: "var(--text)", color: "var(--bg)" }}
    type={type}  
  >
    {children}
  </button>
  )
}

export default Button