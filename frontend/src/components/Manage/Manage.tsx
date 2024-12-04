import React from 'react'
import ManageMenu from './ManageMenu'
import Nav from '../Nav/Nav'
import ManageList from './ManageList'

const Manage: React.FC = () => {
  return (
    <div>
        <div className='fixed w-full'>
            <Nav/>
            <div className='h-[var(--cardwindow)] py-6 px-24 bg-gray-200 overflow-y-auto scrollbar-hidden'>
                <ManageMenu/>
                <ManageList/>
            </div>
        </div>
    </div>
  )
}

export default Manage