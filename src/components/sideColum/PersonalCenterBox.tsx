import * as React from 'react'
import { Link } from 'react-router-dom'
import { ThumbUpIcon, BellIcon, UserIcon, SupportIcon } from '@heroicons/react/outline'

const PersonalCenterBox = () => {
  return (
    <div className='border rounded-md bg-white shadow py-3'>
      <Link
        to='/explore/liked'
        className='group flex items-center space-x-4 px-6 py-2 text-sm hover:bg-gray-100 '
      >
        <ThumbUpIcon className='h-6 w-6 text-gray-700 group-hover:text-gray-900' />
        <div className='text-sm text-gray-700 group-hover:text-gray-900'>
          Liked
        </div>
      </Link>
      <Link
        to='/explore/subscribed'
        className='group flex items-center space-x-4 px-6 py-2 text-sm hover:bg-gray-100 '
      >
        <BellIcon className='h-6 w-6 text-gray-700 group-hover:text-gray-900' />
        <div className='text-sm text-gray-700 group-hover:text-gray-900'>
          Subscribed
        </div>
      </Link>
      <Link
        to='/explore/my_profile'
        className='group flex items-center space-x-4 px-6 py-2 text-sm hover:bg-gray-100 '
      >
        <UserIcon className='h-6 w-6 text-gray-700 group-hover:text-gray-900' />
        <div className='text-sm text-gray-700 group-hover:text-gray-900'>
          Profile
        </div>
      </Link>
      <Link
        to='/explore/feedback'
        className='group flex items-center space-x-4 px-6 py-2 text-sm hover:bg-gray-100 '
      >
        <SupportIcon className='h-6 w-6 text-gray-700 group-hover:text-gray-900' />
        <div className='text-sm text-gray-700 group-hover:text-gray-900'>
          FeedBack
        </div>
      </Link>
    </div>
  )
}

export default PersonalCenterBox
