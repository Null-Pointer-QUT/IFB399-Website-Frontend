import * as React from 'react'

import { LibraryIcon } from '@heroicons/react/outline'

const EmptySearch = () => {
  return (
    <div className='text-center'>
      <LibraryIcon className='mx-auto h-12 w-12 text-gray-400' />
      <h3 className='mt-2 text-sm font-medium text-gray-900'>No Articles or Related File</h3>
      <p className='mt-1 text-sm text-gray-500'>Please try another keyword.</p>
    </div>
  )
}
export default EmptySearch
