import * as React from 'react'
import { Link } from 'react-router-dom'
import { AnnotationIcon, DocumentTextIcon, PencilAltIcon } from '@heroicons/react/outline'

const CreateCenterBox = () => {
  return (
    <div className='bg-white'>
      <div className='grid grid-cols-3 gap-x-1 border rounded-md p-3 shadow'>
        <Link
          to='/explore/upload'
          className='group flex flex-col items-center space-y-1'
        >
          <PencilAltIcon className='h-8 w-8 text-gray-700 group-hover:text-gray-900' />
          <div className='text-sm text-gray-700 group-hover:text-gray-900'>
            Write
          </div>
        </Link>
        <Link to='/explore/my_articles' className='group flex flex-col items-center space-y-1'>
          <DocumentTextIcon className='h-8 w-8 text-gray-700 group-hover:text-gray-900' />
          <div className='text-sm text-gray-700 group-hover:text-gray-900'>
            Published
          </div>
        </Link>
        <Link
          to='/explore/my_drafts'
          className='group flex flex-col items-center space-y-1'
        >
          <AnnotationIcon className='h-8 w-8 text-gray-700 group-hover:text-gray-900' />
          <div className='text-sm text-gray-700 group-hover:text-gray-900'>
            Drafts
          </div>
        </Link>
      </div>
    </div>
  )
}
export default CreateCenterBox
