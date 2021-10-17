import * as React from 'react'
import { Link } from 'react-router-dom'

import { PlusIcon } from '@heroicons/react/solid'
import { LibraryIcon } from '@heroicons/react/outline'


const EmptyArticle = () => {
  return (
    <div className='text-center mx-5'>
      <LibraryIcon className='mx-auto h-12 w-12 text-gray-400' />
      <h3 className='mt-2 text-sm font-medium text-gray-900'>No Articles</h3>
      <p className='mt-1 text-sm text-gray-500'>Post your article here.</p>
      <div className='mt-6 w-60 mx-auto'>
        <Link
          to='/upload'
          className='btn-primary'
        >
          <PlusIcon className='-ml-1 mr-2 h-5 w-5' aria-hidden='true' />
          New Article
        </Link>
      </div>
    </div>
  )
}
export default EmptyArticle
