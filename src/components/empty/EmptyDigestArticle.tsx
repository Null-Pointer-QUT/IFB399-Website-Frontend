import * as React from 'react'
import { CubeTransparentIcon } from '@heroicons/react/outline'

const EmptyDigestArticle = () => {
  return (
    <div className='text-center'>
      <CubeTransparentIcon className='mx-auto h-12 w-12 text-gray-400' />
      <h3 className='mt-2 text-sm font-medium text-gray-900'>No Digest Articles </h3>
      <p className='mt-1 text-sm text-gray-500'>No digest article this week.</p>
    </div>
  )
}
export default EmptyDigestArticle
