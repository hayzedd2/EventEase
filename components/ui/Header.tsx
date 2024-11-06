
import React from 'react'

const Header = ({text}:{text: string}) => {
  return (
    <h1 className='text-[1.5rem] py-5 font-[500]'>{text}</h1>
  )
}

export default Header