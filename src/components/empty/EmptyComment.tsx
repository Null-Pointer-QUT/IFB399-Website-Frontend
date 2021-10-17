import * as React from 'react'
import { ChatIcon } from '@heroicons/react/outline'

const EmptyComment = () => {
  return (
    <div className='text-center py-10 bg-gray-50 rounded'>
      <ChatIcon className='mx-auto h-12 w-12 text-gray-400' />
      <h3 className='mt-2 text-sm font-medium text-gray-900'>No comment.</h3>
      <p className='mt-1 text-sm text-gray-500'>This article do not have any comment.</p>
    </div>
  )
}
export default EmptyComment
