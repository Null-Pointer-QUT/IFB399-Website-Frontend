import * as React from 'react'
import { useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { oauth } from '../../service/commonApi'
import { useUserInfoContext } from '../../context/UserInfoContext'
import BaseFooter from '../../components/footers/BaseFooter'
import largeLogo from '../../static/logo/np_full.png'
import { SunIcon } from '@heroicons/react/outline'

export default function OAuthLogin() {
  let history = useHistory()
  const { dispatch: UserDispatch } = useUserInfoContext()
  let type: string = ''
  const path = window.location.pathname

  if (path.indexOf('google') !== -1) {
    type = 'google'
  } else if (path.indexOf('facebook') !== -1) {
    type = 'facebook'
  } else if (path.indexOf('github') !== -1) {
    type = 'github'
  }
  const params = window.location.search

  useEffect(() => {
    const request = async () => {
      if (type && params) {
        let { success, data } = await oauth({ url: `/${type}${params}` })
        if (success) {
          UserDispatch({ type: 'UPDATE_WITH_FETCHED_DATA', data })
          history.push('/')
        } else {
          UserDispatch({ type: 'CLEAR' })
        }
      }
    }
    request()
  }, [params, UserDispatch, history, type])
  return (
    <div className='min-h-screen pt-16 pb-12 flex flex-col bg-white'>
      <div className='flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex-shrink-0 flex justify-center'>
          <div className='inline-flex'>
            <img
              className='h-12 w-auto'
              src={largeLogo}
              alt=''
            />
          </div>
        </div>
        <div className='py-8'>
          <div className='text-center'>
            <SunIcon className='mt-2 inline-flex animate-spin h-10 w-10 text-gray-700' />
            <h1 className='mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl'>Redirecting....</h1>
            <p className='mt-6 font-semibold  text-brand uppercase tracking-wide'>login by {type}</p>
            <div className='mt-3'>
              <Link to='/' className='text-base font-medium text-brand hover:text-brand-dark'>
                Go back home<span aria-hidden='true'> &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <BaseFooter />
    </div>
  )
}
