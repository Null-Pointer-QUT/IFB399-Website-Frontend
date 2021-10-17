import * as React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import np from '../../static/logo/np_full.png'
import bg from '../../static/bg_admin_login.jpg'
// import { adminLogin } from '../../service/adminApi'
import { inputEmptyConfig, ModalConfig, passwordIncorrectConfig } from '../../utils/modalConfig'
import { userLogin } from '../../service/commonApi'
import { useModelContext } from '../../context/ModelContext'


const AdminLogin = () => {
  const [username, setUsername] = useState<null | string>(null)
  const [password, setPassword] = useState<null | string>(null)

  const { dispatch: modelDispatch } = useModelContext()
  const openModel = (config: ModalConfig) => {
    modelDispatch({ type: 'OPEN', config })
  }

  let history = useHistory()
  return (
    <div className='min-h-screen min-h-screen-ios bg-white flex'>
      <div className='flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
        <div className='mx-auto w-full max-w-sm lg:w-96'>
          <div>
            <img className='h-12 w-auto' src={np} alt='logo' />
            <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>
              Welcome Admin
            </h2>
          </div>

          <div className='mt-8'>
            <div className='mt-6'>
              <form action='#' method='POST' className='space-y-6'>
                <div>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Username
                  </label>
                  <div className='mt-1'>
                    <input
                      id='username'
                      name='username'
                      type='text'
                      autoComplete='email'
                      required
                      className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400
                                 sm:text-sm'
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
                      className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400
                                 sm:text-sm'
                      onChange={(e) => {
                        setPassword(e.target.value)
                      }}
                    />
                  </div>
                </div>
                <div>
                  <button
                    type='submit'
                    className='w-full flex justify-center py-2 px-4 border border-transparent
                               rounded-md shadow-sm text-sm font-medium text-white bg-brand hover:bg-brand-light
                               focus:ring-2 focus:ring-offset-2 focus:bg-brand'
                    onClick={async (e) => {
                      e.preventDefault()
                      if (username && password) {
                        let res = await userLogin(username, password)
                        if (res.success) {
                          history.push('/admin')
                        } else {
                          openModel(passwordIncorrectConfig)
                        }
                      } else {
                        openModel(inputEmptyConfig)
                      }
                    }}
                  >
                    Login
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
          src={bg}
          alt='background'
        />
      </div>
    </div>

  )
}
export default AdminLogin
