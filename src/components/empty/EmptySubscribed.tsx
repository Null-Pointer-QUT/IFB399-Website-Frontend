import * as React from 'react'
import { CubeTransparentIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'

const EmptySubscribed = () => {
  return (

    <div className='text-center'>
      <CubeTransparentIcon className='mx-auto h-12 w-12 text-gray-400' />
      <h3 className='mt-2 text-sm font-medium text-gray-900'>No subscribed topic.</h3>
      <p className='mt-1 text-sm text-gray-500'>You may subscribe some tags first.</p>
      <div className='mt-6 w-60 mx-auto'>
        <Link
          to='/explore/subscription'
          className='btn-primary'
        >
          Go To Subscribe
        </Link>
      </div>
    </div>
  )
}
export default EmptySubscribed
