// import { Label, TextInput } from 'flowbite-react'
// import React from 'react'

// const Search: React.FC = () => {
//   return (
//     <div className='flex items-center pb-8 gap-x-2 md:gap-x-4'>
//         <Label className='text-lg'>Search book</Label>
//         <TextInput className='md:w-56 w-48' type="text" placeholder="looking for..." />
//     </div>
//   )
// }

// export default Search

import { Label, TextInput } from 'flowbite-react';
import React from 'react';

interface SearchProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const Search: React.FC<SearchProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className='flex items-center pb-8 gap-x-2 md:gap-x-4'>
      <Label className='text-lg'>Search book</Label>
      <TextInput
        className='md:w-56 w-48'
        type="text"
        placeholder="looking for..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
      />
    </div>
  );
};

export default Search;

