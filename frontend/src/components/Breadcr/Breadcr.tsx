import { Breadcrumb } from 'flowbite-react'
import React from 'react'

const Breadcr: React.FC = () => {
  return (
    <div className='flex pb-4'>
        <Breadcrumb aria-label="Default breadcrumb example">
            <Breadcrumb.Item href="/home">
                Home
            </Breadcrumb.Item>
            <Breadcrumb.Item>Detail</Breadcrumb.Item>
            {/* <Breadcrumb.Item>Flowbite React</Breadcrumb.Item> */}
        </Breadcrumb>
    </div>
  )
}

export default Breadcr