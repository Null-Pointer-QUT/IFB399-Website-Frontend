import * as React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { HomeIcon, MenuAlt1Icon, ViewListIcon, XIcon } from '@heroicons/react/outline'
import { SelectorIcon } from '@heroicons/react/solid'
import { classNames } from '../../utils/utils'
import BaseTitle from '../../components/admin/titleActions/BaseTitle'
import { imgUrl } from '../../service/url'


type Props = {
  children?: JSX.Element
}

const AdminLayout = ({ children }: Props) => {
  const navigation = [
    { name: 'Admin', to: '/admin', icon: HomeIcon, current: false },
    // { name: 'Articles', to: '/admin/articles', icon: ClockIcon, current: false },
    { name: 'Topics', to: '/admin/topics', icon: ViewListIcon, current: false },
  ]

  const location = useLocation()
  const currentPath = location.pathname
  const currentRoute = navigation.find((el) => el['to'] === currentPath)
  if (currentRoute) currentRoute.current = true
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const username = localStorage.getItem('username')
  const userEmail = localStorage.getItem('userEmail')
  const avatar = localStorage.getItem('userAvatar')
  return (
    <div className='relative h-screen flex overflow-hidden bg-white'>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as='div' className='fixed inset-0 flex z-40 lg:hidden' onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-600 bg-opacity-75' />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter='transition ease-in-out duration-300 transform'
            enterFrom='-translate-x-full'
            enterTo='translate-x-0'
            leave='transition ease-in-out duration-300 transform'
            leaveFrom='translate-x-0'
            leaveTo='-translate-x-full'
          >
            <div className='relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white'>
              <Transition.Child
                as={Fragment}
                enter='ease-in-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in-out duration-300'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <div className='absolute top-0 right-0 mr-1 pt-2'>
                  <button
                    type='button'
                    className='ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand'
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className='sr-only'>Close sidebar</span>
                    <XIcon className='h-6 w-6 text-gray-700' aria-hidden='true' />
                  </button>
                </div>
              </Transition.Child>
              <div className='flex-shrink-0 flex items-center px-4'>
                <img
                  className='h-10 w-auto'
                  src={imgUrl.smallLogo}
                  alt='Null Pointer'
                />
              </div>
              <div className='mt-5 flex-1 h-0 overflow-y-auto'>
                <nav className='px-2'>
                  <div className='space-y-1'>
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.to}
                        className={classNames(
                          item.current
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                          'group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md',
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        <item.icon
                          className={classNames(
                            item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                            'mr-3 flex-shrink-0 h-6 w-6',
                          )}
                          aria-hidden='true'
                        />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </nav>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className='hidden lg:flex lg:flex-shrink-0'>
        <div className='flex flex-col w-64 border-r border-gray-200 pt-5 pb-4 bg-gray-100'>
          <div className='flex items-center flex-shrink-0 px-6'>
            <img
              className='hidden lg:block h-10 w-auto'
              src={imgUrl.largeLogo}
              alt='Null Pointer'
            />
          </div>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className='h-0 flex-1 flex flex-col overflow-y-auto'>
            {/* User account dropdown */}
            <Menu as='div' className='px-3 mt-6 relative inline-block text-left'>
              <div>
                <Menu.Button
                  className='group w-full bg-gray-100 rounded-md px-3.5 py-2 text-sm text-left font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-brand'>
                  <span className='flex w-full justify-between items-center'>
                    <span className='flex min-w-0 items-center justify-between space-x-3'>
                      <img
                        className='w-10 h-10 bg-gray-300 rounded-full flex-shrink-0'
                        src={avatar || imgUrl.defaultAvatar}
                        alt='#'
                      />
                      <span className='flex-1 flex flex-col min-w-0'>
                        <span className='text-gray-900 text-sm font-medium truncate'>{username}</span>
                        <span className='text-gray-500 text-sm truncate'>{userEmail}</span>
                      </span>
                    </span>
                    <SelectorIcon
                      className='flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500'
                      aria-hidden='true'
                    />
                  </span>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items
                  className='z-10 mx-3 origin-top absolute right-0 left-0 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none'>
                  <div className='py-1'>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to='#'
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm',
                          )}
                        >
                          Logout
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            {/* Navigation */}
            <nav className='px-3 mt-6'>
              <div className='space-y-1'>
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className={classNames(
                      item.current ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    <item.icon
                      className={classNames(
                        item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                        'mr-3 flex-shrink-0 h-6 w-6',
                      )}
                      aria-hidden='true'
                    />
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Main column */}
      <div className='flex flex-col w-0 flex-1 overflow-hidden'>
        {/* Search header */}
        <div className='relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:hidden'>
          <button
            type='button'
            className='px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand lg:hidden'
            onClick={() => setSidebarOpen(true)}
          >
            <span className='sr-only'>Open sidebar</span>
            <MenuAlt1Icon className='h-6 w-6' aria-hidden='true' />
          </button>
          <div className='flex-1 flex justify-between px-4 sm:px-6 lg:px-8'>
            <div className='flex-1 flex'>
            </div>
            <div className='flex items-center'>
              {/* Profile dropdown */}
              <Menu as='div' className='ml-3 relative'>
                <div>
                  <Menu.Button
                    className='max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand'>
                    <span className='sr-only'>Open user menu</span>
                    <img
                      className='h-8 w-8 rounded-full'
                      src={avatar || imgUrl.defaultAvatar}
                      alt=''
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'
                >
                  <Menu.Items
                    className='origin-top-right absolute right-0 mt-2 w-28 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none'>
                    <div className='py-1'>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to='#'
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm',
                            )}
                          >
                            Log out
                          </Link>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>

        <main className='flex-1 relative z-0 overflow-y-auto focus:outline-none uppercase'>
          <BaseTitle title={currentRoute?.name || "Admin Page"} />
          <div className='px-4 py-4 sm:px-6 lg:px-8'>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
export default AdminLayout
