import * as React from 'react'
import { CubeTransparentIcon } from '@heroicons/react/outline'

const EmptyMessage = () => {
  return (
    <div className='text-center py-20 bg-gray-50 rounded'>
      <CubeTransparentIcon className='mx-auto h-12 w-12 text-gray-400' />
      <h3 className='mt-2 text-sm font-medium text-gray-900'>No Message.</h3>
      <p className='mt-1 text-sm text-gray-500'>You do not have any message.</p>
    </div>
  )
}
export default EmptyMessage
