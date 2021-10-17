import * as React from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import np from '../../static/logo/np_full.png'
import bgLogin from '../../static/bg_login.jpg'
import { userSignUp } from '../../service/commonApi'
import { useState } from 'react'
import {
  inputEmptyConfig,
  inputIncorrectConfig, ModalConfig,
  passwordMismatchConfig,
} from '../../utils/modalConfig'
import { useModelContext } from '../../context/ModelContext'
// import { renderUrl } from '../../service/url'

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

  // const oauthBaseUrl = 'https://ifb399.juntao.life/' + renderUrl
  return (
    <div className='min-h-screen min-h-screen-ios bg-white flex'>
      <div className='flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
        <div className='mx-auto w-full max-w-sm lg:w-96'>
          <div>
            <img className='h-12 w-auto' src={np} alt='Workflow' />
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
            <div>
            {/*  <div>*/}
            {/*    <p className='text-sm font-medium text-gray-700'>*/}
            {/*      Sign up with*/}
            {/*    </p>*/}
            {/*    <div className='mt-1 grid grid-cols-3 gap-3'>*/}
            {/*      <div>*/}
            {/*        <a*/}
            {/*          href={oauthBaseUrl + 'google'}*/}
            {/*          className='w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'*/}
            {/*        >*/}
            {/*          <span className='sr-only'>Sign in with Google</span>*/}
            {/*          <svg*/}
            {/*            className='w-5 h-5'*/}
            {/*            aria-hidden='true'*/}
            {/*            fill='currentColor'*/}
            {/*            imageRendering='optimizeQuality' viewBox='0 0 640 640'*/}
            {/*          >*/}
            {/*            <path*/}
            {/*              d='M326.331 274.255v109.761h181.49c-7.37 47.115-54.886 138.002-181.49 138.002-109.242 0-198.369-90.485-198.369-202.006 0-111.509 89.127-201.995 198.369-201.995 62.127 0 103.761 26.516 127.525 49.359l86.883-83.635C484.99 31.512 412.741-.012 326.378-.012 149.494-.012 6.366 143.116 6.366 320c0 176.884 143.128 320.012 320.012 320.012 184.644 0 307.256-129.876 307.256-312.653 0-21-2.244-36.993-5.008-52.997l-302.248-.13-.047.024z' />*/}
            {/*          </svg>*/}
            {/*        </a>*/}
            {/*      </div>*/}
            {/*      <div>*/}
            {/*        <a*/}
            {/*          href={oauthBaseUrl + 'github'}*/}
            {/*          className='w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'*/}
            {/*        >*/}
            {/*          <span className='sr-only'>Sign in with GitHub</span>*/}
            {/*          <svg*/}
            {/*            className='w-5 h-5'*/}
            {/*            aria-hidden='true'*/}
            {/*            fill='currentColor'*/}
            {/*            viewBox='0 0 20 20'*/}
            {/*          >*/}
            {/*            <path*/}
            {/*              fillRule='evenodd'*/}
            {/*              d='M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z'*/}
            {/*              clipRule='evenodd'*/}
            {/*            />*/}
            {/*          </svg>*/}
            {/*        </a>*/}
            {/*      </div>*/}
            {/*      <div>*/}
            {/*        <a*/}
            {/*          href={oauthBaseUrl + 'facebook'}*/}
            {/*          className='w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'*/}
            {/*        >*/}
            {/*          <span className='sr-only'>Sign up with Facebook</span>*/}
            {/*          <svg*/}
            {/*            className='w-5 h-5'*/}
            {/*            aria-hidden='true'*/}
            {/*            fill='currentColor'*/}
            {/*            viewBox='0 0 20 20'*/}
            {/*          >*/}
            {/*            <path*/}
            {/*              fillRule='evenodd'*/}
            {/*              d='M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z'*/}
            {/*              clipRule='evenodd'*/}
            {/*            />*/}
            {/*          </svg>*/}
            {/*        </a>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  </div>*/}

            {/*  <div className='mt-6 relative'>*/}
            {/*    <div*/}
            {/*      className='absolute inset-0 flex items-center'*/}
            {/*      aria-hidden='true'*/}
            {/*    >*/}
            {/*      <div className='w-full border-t border-gray-300' />*/}
            {/*    </div>*/}
            {/*    <div className='relative flex justify-center text-sm'>*/}
            {/*      <span className='px-2 bg-white text-gray-500'>*/}
            {/*        Or continue with*/}
            {/*      </span>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            </div>

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
          src={bgLogin}
          alt='background'
        />
      </div>
    </div>
  )
}
export default Signup
