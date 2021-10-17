import * as React from 'react'
import { SunIcon } from '@heroicons/react/outline'

const BaseLoading = () => {
  return (
    <div className='flex flex-col items-center justify-center w-30 h-64 p-5'>
      <SunIcon className='animate-spin h-10 w-10 text-gray-700' />
      <div>
        loading
      </div>
    </div>
  )
}
export default BaseLoading
