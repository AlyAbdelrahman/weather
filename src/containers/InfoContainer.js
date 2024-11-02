import React from 'react'

export default function InfoContainer(props) {
  return (
    <div {...props} className={`w-full bg-white border rounded-xl flex py-4 shadow-sm ${props.classes}`} />
       
  )
}
