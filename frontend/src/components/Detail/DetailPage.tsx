import React from 'react'
import Nav from '../Nav/Nav'
import Detail from './Detail'
import Breadcr from '../Breadcr/Breadcr'

const DetailPage: React.FC = () => {
  return (
    <div>
        <div className='fixed w-full'>
            <Nav/>
            <div className='h-[var(--cardwindow)] py-6 px-24 bg-gray-200 overflow-y-auto scrollbar-hidden'>
                <Breadcr/>
                <Detail/>
            </div>
        </div>
    </div>
  )
}

export default DetailPage