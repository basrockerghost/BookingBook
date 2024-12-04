import { Button } from 'flowbite-react'
import React from 'react'

const ManageMenu: React.FC = () => {
  return (
    <div >
        <Button.Group className='flex justify-center' >
            <Button className='w-56' color="gray">Booking</Button>
            <Button className='w-56' color="gray">Not return</Button>
            <Button className='w-56' color="gray">Already return</Button>
        </Button.Group>
    </div>
  )
}

export default ManageMenu