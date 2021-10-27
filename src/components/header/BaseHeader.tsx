import * as React from 'react'
import { Fragment, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/solid'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { classNames } from '../../utils/utils'
import { imgUrl } from '../../service/url'
import { userLogout } from '../../service/commonApi'
import { useUserInfoContext } from '../../context/UserInfoContext'
import { useMessageContext } from '../../context/MessageContext'

const navigation = [
  { name: 'Home', to: '/home', current: false },
  { name: 'Explore', to: '/', current: false },
]

export default function BaseHeader() {
  const { state: userInfo, dispatch: userInfoDispatch } = useUserInfoContext()
  const { state: message, dispatch: messageDispatch } = useMessageContext()
  const messageNum = message.num
  const history = useHistory()
  const location = useLocation()
  const currentPath = location.pathname
  useEffect(() => {
    navigation[1].current = currentPath === '/' || currentPath.indexOf('/explore') !== -1
  }, [currentPath])

  const handleLogout = async () => {
    await userLogout()
    userInfoDispatch({ type: 'CLEAR' })
  }

  const goTo = (path: string) => {
    if (currentPath === path) {
      window.location.reload()
    } else {
      history.push(path)
    }
  }
  const handleOpenNotification = () => {
    goTo('/explore/notification')
    messageDispatch({ type: 'READ_MESSAGE' })
  }

  const isLogin = userInfo.isLogin
  const username = userInfo.username
  const userEmail = userInfo.userEmail
  const avatar = userInfo.userAvatar || imgUrl.defaultAvatar

  return (
    <Disclosure as='nav' className='bg-gray-800'>
      {({ open }) => (
        <>
          <div className='max-w-7xl mx-auto px-2 sm:px-4 lg:px-8'>
            <div className='relative flex items-center justify-between h-16'>
              <div className='flex items-center px-2 lg:px-0'>
                <button
                  className='flex-shrink-0'
                  onClick={() => {
                    goTo('/')
                  }}
                >
                  <img
                    className='block lg:hidden h-8 w-auto'
                    src={imgUrl.smallLogo}
                    alt='Null Pointer'
                  />
                  <img
                    className='hidden lg:block h-8 w-auto'
                    src={imgUrl.largeLogo}
                    alt='Null Pointer'
                  />
                </button>
                <div className='hidden lg:block lg:ml-6'>
                  <div className='flex space-x-4'>
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.to}
                        className={classNames(
                          item.current
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium',
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className='flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end' onClick={() => {
                goTo('/explore/search')
              }}>
                <div className='max-w-lg w-full lg:max-w-xs'>
                  <label htmlFor='search' className='sr-only'>
                    Search
                  </label>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <SearchIcon
                        className='h-5 w-5 text-gray-400'
                        aria-hidden='true'
                      />
                    </div>
                    <input
                      id='search'
                      name='search'
                      className='block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-white focus:ring-white focus:text-gray-900 sm:text-sm'
                      placeholder='Search'
                      type='search'
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className='flex lg:hidden'>
                {/* Mobile menu button */}
                <Disclosure.Button
                  className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <MenuIcon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
              <div className='hidden lg:block lg:ml-4'>
                <div className='flex items-center'>
                  {isLogin && (
                    <button
                      className='relative flex-shrink-0 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
                      onClick={handleOpenNotification}
                    >
                      <BellIcon className=' h-6 w-6' aria-hidden='true' />
                      {/*<div className='absolute right-0 top-0 text-xs'>1</div>*/}
                      {messageNum > 0 && (
                        <div
                          className='absolute right-0.5 top-0.5 text-xs inline-flex items-center  w-2 h-2 rounded-full text-white bg-red-500 flex justify-center items-center'>
                        </div>
                      )}
                    </button>
                  )}

                  {isLogin && (
                    <Menu as='div' className='ml-4 relative flex-shrink-0 z-50'>
                      {({ open }) => (
                        <>
                          <div>
                            <Menu.Button
                              className='bg-gray-800 rounded-full flex text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                              <span className='sr-only'>Open user menu</span>
                              <img
                                className='h-8 w-8 rounded-full'
                                src={avatar!}
                                alt='avatar'
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            show={open}
                            as={Fragment}
                            enter='transition ease-out duration-100'
                            enterFrom='transform opacity-0 scale-95'
                            enterTo='transform opacity-100 scale-100'
                            leave='transition ease-in duration-75'
                            leaveFrom='transform opacity-100 scale-100'
                            leaveTo='transform opacity-0 scale-95'
                          >
                            <Menu.Items
                              static
                              className='origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
                            >
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'w-full text-left block px-4 py-2 text-sm text-gray-700',
                                    )}
                                    onClick={() => {
                                      goTo('/explore/my_profile')
                                    }}
                                  >
                                    Profile
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'w-full text-left block px-4 py-2 text-sm text-gray-700',
                                    )}
                                    onClick={handleLogout}
                                  >
                                    Log out
                                  </button>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </>
                      )}
                    </Menu>
                  )}
                  {!isLogin && (
                    <div className='flex space-x-2'>
                      <button
                        className='text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-400 px-2 py-0.5 rounded-lg'
                        onClick={() => {
                          goTo('/login')
                        }}
                      >
                        Login
                      </button>
                      <button
                        className='text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-400 px-2 py-0.5 rounded-lg'
                        onClick={() => {
                          goTo('/signup')
                        }}
                      >
                        Sign up
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className='lg:hidden'>
            <div className='px-2 pt-2 pb-3 space-y-1'>
              {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium'
                      : 'text-gray-400 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium',
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            {isLogin && (
              <div className='pt-4 pb-3 border-t border-gray-700'>
                <div className='flex items-center px-5'>
                  <div className='flex-shrink-0'>
                    <img
                      className='h-10 w-10 rounded-full'
                      src={avatar!}
                      alt='avatar'
                    />
                  </div>
                  <div className='ml-3'>
                    <div className='text-base font-medium text-white'>
                      {username}
                    </div>
                    <div className='text-sm font-medium text-gray-400'>
                      {userEmail}
                    </div>
                  </div>
                  <button
                    className='relative ml-auto flex-shrink-0 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
                    onClick={handleOpenNotification}
                  >
                    <BellIcon className='h-6 w-6' aria-hidden='true' />
                    {messageNum > 0 && (
                      <div
                        className='absolute right-0.5 top-0.5 text-xs inline-flex items-center  w-2 h-2 rounded-full text-white bg-red-500 flex justify-center items-center'>
                      </div>
                    )}
                  </button>
                </div>
                <div className='mt-3 px-2 space-y-1'>
                  <button
                    className='w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700'
                    onClick={() => {
                      goTo('/explore/my_profile')
                    }}
                  >
                    Your Profile
                  </button>
                  <button
                    className='w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700'
                    onClick={handleLogout}
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
            {!isLogin && (
              <div className='pb-2 pb-3 border-t border-gray-700'>
                <div className='mt-3 px-2 space-y-1'>
                  <button
                    className='w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700'
                    onClick={() => {
                      goTo('/login')
                    }}
                  >
                    Login
                  </button>
                  <button
                    className='w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700'
                    onClick={() => {
                      goTo('/signup')
                    }}
                  >
                    Sign up
                  </button>
                </div>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
