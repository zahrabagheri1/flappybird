import React from 'react'

function Strike({strikeLine}) {
  let strikeClass = null;
  
  return (
    <div className={`strike ${strikeClass}`}></div>
  )
}

export default Strike