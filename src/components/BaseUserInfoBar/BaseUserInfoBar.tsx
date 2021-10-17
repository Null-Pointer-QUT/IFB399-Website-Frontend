import * as React from 'react'
import { Link } from 'react-router-dom'
import { MailIcon } from '@heroicons/react/solid'

interface UserInfo {
  id: string
  name: string
  email: string
  avatar: string,
  link?: string,
}

const BaseUserInfoBar = ({ userInfo }: { userInfo: UserInfo }) => {
  return (
    <Link to={userInfo.link ? userInfo.link : '#'} className='block py-1 rounded hover:bg-gray-50'>
      <div className='flex items-center'>
        <div className='min-w-0 flex-1 flex items-center'>
          <div className='flex-shrink-0'>
            <img
              className='h-12 w-12 rounded-full'
              src={userInfo.avatar}
              alt=''
            />
          </div>
          <div className='min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4'>
            <div>
              <p className='font-medium text-gray-700 truncate'>
                {userInfo.name}
              </p>
              <p className='mt-1 flex items-center text-sm text-gray-500'>
                <MailIcon
                  className='flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
                <span className='truncate'>{userInfo.email}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
export default BaseUserInfoBar
