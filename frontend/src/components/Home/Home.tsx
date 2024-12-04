import React, { useState } from 'react'
import Nav from '../Nav/Nav'
import Homecard from '../HomeCard/Homecard'
import Search from '../Search/Search'
import Breadcr from '../Breadcr/Breadcr'

const Home: React.FC = () => {

  const [searchTerm, setSearchTerm] = useState<string>('');
  return (
    <div>
        <div className='fixed w-full'>
            <Nav/>
            <div className='h-[var(--cardwindow)] py-6 px-6 md:px-24 bg-gray-200 overflow-y-auto scrollbar-hidden'>
              <Breadcr/>
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              <Homecard searchTerm={searchTerm} />
            </div>
        </div>
    </div>
  )
}

export default Home