import React from 'react'

const Input = ({ type = "text", placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="rounded-md px-3 py-2 mb-4 border border-solid focus:outline-none transition-colors w-full"
      style={{
        borderColor: "var(--border-line)",
        backgroundColor: "var(--bg)",
        color: "var(--text)"
      }}
    />
  )
}

export default Input 