import * as React from 'react'
import { useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { imgUrl } from '../../service/url'
import { userSignUp } from '../../service/commonApi'
import {
  inputEmptyConfig,
  inputIncorrectConfig, ModalConfig,
  passwordMismatchConfig,
} from '../../utils/modalConfig'
import { useModelContext } from '../../context/ModelContext'

const Signup = () => {
  const [email, setEmail] = useState<null | string>(null)
  const [username, setUsername] = useState<null | string>(null)
  const [password, setPassword] = useState<null | string>(null)
  const [password_, setPassword_] = useState<null | string>(null)
  const isPasswordMatch = password === password_

  const { dispatch: modelDispatch } = useModelContext()
  const openModel = (config: ModalConfig) => {
    modelDispatch({ type: 'OPEN', config })
  }

  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const redirectPath = params.get('redirect')

  let history = useHistory()

  return (
    <div className='min-h-screen min-h-screen-ios bg-white flex'>
      <div className='flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
        <div className='mx-auto w-full max-w-sm lg:w-96'>
          <div>
            <img className='h-12 w-auto' src={imgUrl.smallLogo} alt='Workflow' />
            <h2 className='mt-2 text-3xl font-extrabold text-gray-900'>
              Create your account
            </h2>
            <p className='mt-2 text-sm text-gray-600'>
              Or{' '}
              <Link
                to={`/login?redirect=${redirectPath}`}
                className='font-medium text-brand hover:text-brand-light'
              >
                already have one?
              </Link>
            </p>
          </div>

          <div className='mt-8'>
            <div className='mt-6'>
              <form action='#' method='POST' className='space-y-6'>

                <div className='space-y-1'>
                  <label
                    htmlFor='username'
                    className='block text-sm font-medium text-gray-700'
                  >
                    User Name
                  </label>
                  <div className='mt-1'>
                    <input
                      id='username'
                      name='username'
                      type='text'
                      autoComplete='username'
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
                    htmlFor='email'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Email
                  </label>
                  <div className='mt-1'>
                    <input
                      id='email'
                      name='email'
                      type='text'
                      autoComplete='email'
                      required
                      className='input-primary'
                      onChange={(e) => {
                        setEmail(e.target.value)
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
                <div className='space-y-1'>
                  <label
                    htmlFor='password_'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Confirm Password
                  </label>
                  <div className='mt-1'>
                    <input
                      id='password_'
                      name='password_'
                      type='password'
                      autoComplete='current-password_'
                      required
                      className='input-primary'
                      onChange={(e) => {
                        setPassword_(e.target.value)
                      }}
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <button
                    type='submit'
                    className='btn-primary'
                    onClick={async (event) => {
                      event.preventDefault()
                      if (username && password && email) {
                        if (isPasswordMatch) {
                          let res = await userSignUp(username, email, password)
                          if (res.success) {
                            if (redirectPath) {
                              history.push(`/login?redirect=${redirectPath}`)
                            } else {
                              history.push('/login')
                            }
                          } else {
                            openModel({ ...inputIncorrectConfig, body: res.msg })
                          }
                        } else {
                          openModel(passwordMismatchConfig)
                        }
                      } else {
                        openModel(inputEmptyConfig)
                      }
                    }}
                  >
                    Sign up
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
export default Signup
