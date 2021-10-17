import * as React from 'react'
import { CubeTransparentIcon } from '@heroicons/react/outline'

const EmptyAttachment = () => {
  return (
    <div className='text-center py-10 bg-gray-50 rounded'>
      <CubeTransparentIcon className='mx-auto h-12 w-12 text-gray-400' />
      <h3 className='mt-2 text-sm font-medium text-gray-900'>No attachments.</h3>
      <p className='mt-1 text-sm text-gray-500'>This article do not have any attachment.</p>
    </div>
  )
}
export default EmptyAttachment
