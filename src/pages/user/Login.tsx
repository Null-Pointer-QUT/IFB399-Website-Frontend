import * as React from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { imgUrl } from '../../service/url'

import { useState } from 'react'
import { userLogin } from '../../service/commonApi'
import { inputEmptyConfig, ModalConfig, passwordIncorrectConfig } from '../../utils/modalConfig'
import { useModelContext } from '../../context/ModelContext'
import { useUserInfoContext } from '../../context/UserInfoContext'

export default function Login() {
  const { dispatch: modelDispatch } = useModelContext()
  const openModel = (config: ModalConfig) => {
    modelDispatch({ type: 'OPEN', config })
  }

  let history = useHistory()
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const redirectPath = params.get('redirect')
  const [username, setUsername] = useState<null | string>(null)
  const [password, setPassword] = useState<null | string>(null)
  const { dispatch: UserDispatch } = useUserInfoContext()

  return (
    <div className='min-h-screen min-h-screen-ios bg-white flex'>
      <div className='flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
        <div className='mx-auto w-full max-w-sm lg:w-96'>
          <div>
            <img className='h-12 w-auto' src={imgUrl.smallLogo} alt='logo' />
            <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>
              Login to your account
            </h2>
            <p className='mt-2 text-sm text-gray-600'>
              Or{' '}
              <Link
                to={`/signup?redirect=${redirectPath}`}
                className='font-medium text-brand hover:text-brand-light'
              >
                sign up for free
              </Link>
            </p>
          </div>
          <div className='mt-8'>
            <div className='mt-6'>
              <form action='#' method='POST' className='space-y-6'>
                <div>
                  <label
                    htmlFor='username'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Username / Email
                  </label>
                  <div className='mt-1'>
                    <input
                      id='email'
                      name='email'
                      type='email'
                      autoComplete='email'
                      required
                      className='input-primary'
                      onChange={(e) => {
                        setUsername(e.target.value)
                      }}
                    />
                  </div>
                </div>

                <div className='space-y-1'>
                  <label
                    htmlFor='password'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Password
                  </label>
                  <div className='mt-1'>
                    <input
                      id='password'
                      name='password'
                      type='password'
                      autoComplete='current-password'
                      required
                      className='input-primary'
                      onChange={(e) => {
                        setPassword(e.target.value)
                      }}
                    />
                  </div>
                </div>
                <div className='flex'>
                  {/*<div className='flex items-center'>*/}
                  {/*  <input*/}
                  {/*    id='remember_me'*/}
                  {/*    name='remember_me'*/}
                  {/*    type='checkbox'*/}
                  {/*    className='h-4 w-4 text-brand border-gray-300 rounded'*/}
                  {/*  />*/}
                  {/*  <label*/}
                  {/*    htmlFor='remember_me'*/}
                  {/*    className='ml-2 block text-sm text-gray-900'*/}
                  {/*  >*/}
                  {/*    Remember me*/}
                  {/*  </label>*/}
                  {/*</div>*/}

                  <div className='text-sm'>
                    <Link
                      to='#'
                      className='font-medium text-brand hover:text-brand-light'
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>

                <div className='space-y-2'>
                  <button
                    type='submit'
                    className='btn-primary'
                    onClick={async (event) => {
                      event.preventDefault()
                      if (username && password) {
                        let { success, data } = await userLogin(username, password)
                        if (success) {
                          UserDispatch({ type: 'UPDATE_WITH_FETCHED_DATA', data })
                          if (redirectPath) {
                            history.push(redirectPath)
                          } else if (history.length > 2) {
                            history.goBack()
                          } else {
                            history.push('/')
                          }
                        } else {
                          UserDispatch({ type: 'CLEAR' })
                          // setModalConfig(passwordIncorrectConfig)
                          // setOpenModal(true)
                          openModel(passwordIncorrectConfig)
                        }
                      } else {
                        // setModalConfig(inputEmptyConfig)
                        // setOpenModal(true)
                        openModel(inputEmptyConfig)
                      }
                    }}
                  >
                    Login
                  </button>
                  <button
                    type='submit'
                    className='btn-secondary'
                    onClick={async (event) => {
                      event.preventDefault()
                      history.goBack()
                    }}
                  >
                    Go Back
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className='hidden lg:block relative w-0 flex-1'>
        <img
          className='absolute inset-0 h-full w-full object-cover'
          src={imgUrl.bgLogin}
          alt='background'
        />
      </div>
    </div>
  )
}
