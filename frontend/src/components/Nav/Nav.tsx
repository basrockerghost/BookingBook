import { Dropdown } from 'flowbite-react'
import React from 'react'

const Nav: React.FC = () => {
  return (
    <nav className='flex justify-between items-center h-[var(--navbar)] md:px-12 px-4 bg-red-500 text-white'>
        <div>
            <p className='text-xl font-medium'>Something</p>
        </div>
        <div className='flex items-center gap-x-4'>
          <p className='font-medium'>User: Something Name</p>
            <Dropdown color='' className='font-medium' label="Menu" dismissOnClick={false}>
                <Dropdown.Item href='/home'>Home</Dropdown.Item>
                <Dropdown.Item href='/manage'>Manage</Dropdown.Item>
            </Dropdown>
        </div>
    </nav>
  )
}

export default Nav