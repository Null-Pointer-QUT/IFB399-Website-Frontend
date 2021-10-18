import React, { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'
import { imgUrl } from '../../service/url'

import screenShoot from '../../static/screen.png'
import BaseFooter from '../../components/footers/BaseFooter'

const navigation = [
  { name: 'Home', to: '/home' },
  { name: 'Explore', to: '/' },
]

const Home = () => {
  return (
    <div className='bg-gray-50'>
      <div className='relative overflow-hidden'>
        <div className='absolute inset-y-0 h-full w-full' aria-hidden='true'>
          <div className='relative h-full'>
            <svg
              className='absolute right-full transform translate-y-1/3 translate-x-1/4 md:translate-y-1/2 sm:translate-x-1/2 lg:translate-x-full'
              width={404}
              height={784}
              fill='none'
              viewBox='0 0 404 784'
            >
              <defs>
                <pattern
                  id='e229dbec-10e9-49ee-8ec3-0286ca089edf'
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits='userSpaceOnUse'
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className='text-gray-200'
                    fill='currentColor'
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={784}
                fill='url(#e229dbec-10e9-49ee-8ec3-0286ca089edf)'
              />
            </svg>
            <svg
              className='absolute left-full transform -translate-y-3/4 -translate-x-1/4 sm:-translate-x-1/2 md:-translate-y-1/2 lg:-translate-x-3/4'
              width={404}
              height={784}
              fill='none'
              viewBox='0 0 404 784'
            >
              <defs>
                <pattern
                  id='d2a68204-c383-44b1-b99f-42ccff4e5365'
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits='userSpaceOnUse'
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className='text-gray-200'
                    fill='currentColor'
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={784}
                fill='url(#d2a68204-c383-44b1-b99f-42ccff4e5365)'
              />
            </svg>
          </div>
        </div>

        <div className='relative pt-6 pb-16 sm:pb-24'>
          <Popover>
            {({ open }) => (
              <>
                <div className='max-w-7xl mx-auto px-4 sm:px-6'>
                  <nav
                    className='relative flex items-center justify-between sm:h-10 md:justify-center'
                    aria-label='Global'
                  >
                    <div className='flex items-center flex-1 md:absolute md:inset-y-0 md:left-0'>
                      <div className='flex items-center justify-between w-full md:w-auto'>
                        <Link to='/home'>
                          <span className='sr-only'>logo</span>
                          <img
                            className='h-8 w-auto sm:h-10'
                            src={imgUrl.largeLogo}
                            alt='logo'
                          />
                        </Link>
                        <div className='-mr-2 flex items-center md:hidden'>
                          <Popover.Button
                            className='bg-gray-50 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand'>
                            <span className='sr-only'>Open main menu</span>
                            <MenuIcon className='h-6 w-6' aria-hidden='true' />
                          </Popover.Button>
                        </div>
                      </div>
                    </div>
                    <div className='hidden md:flex md:space-x-10'>
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.to}
                          className='font-medium text-gray-500 hover:text-gray-900'
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                    <div className='hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0'>
                      <span className='inline-flex rounded-md shadow'>
                        <Link
                          to='/signup'
                          className='inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-brand bg-white hover:text-brand-light'
                        >
                          Sign up
                        </Link>
                      </span>
                    </div>
                  </nav>
                </div>

                <Transition
                  show={open}
                  as={Fragment}
                  enter='duration-150 ease-out'
                  enterFrom='opacity-0 scale-95'
                  enterTo='opacity-100 scale-100'
                  leave='duration-100 ease-in'
                  leaveFrom='opacity-100 scale-100'
                  leaveTo='opacity-0 scale-95'
                >
                  <Popover.Panel
                    focus
                    static
                    className='absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden'
                  >
                    <div className='rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden'>
                      <div className='px-5 pt-4 flex items-center justify-between'>
                        <div>
                          <img
                            className='h-8 w-auto'
                            src={imgUrl.smallLogo}
                            alt='#'
                          />
                        </div>
                        <div className='-mr-2'>
                          <Popover.Button
                            className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand'>
                            <span className='sr-only'>Close main menu</span>
                            <XIcon className='h-6 w-6' aria-hidden='true' />
                          </Popover.Button>
                        </div>
                      </div>
                      <div className='px-2 pt-2 pb-3 space-y-1'>
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            to={item.to}
                            className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                      <Link
                        to='/signup'
                        className='block w-full px-5 py-3 text-center font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 hover:text-gray-900'
                      >
                        Sign up
                      </Link>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>

          <div className='mt-16 mx-auto max-w-7xl px-4 sm:mt-24 sm:px-6'>
            <div className='text-center'>
              <h1 className='text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl'>
                <span className='block'>Materials to enrich your</span>
                <span className='block text-brand-dark'>coding lessons</span>
              </h1>
              <p className='mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl'>
                This is a website for you to collect inspiration and share
                inspiration！
              </p>
            </div>
          </div>
        </div>

        <div className='relative'>
          <div className='absolute inset-0 flex flex-col' aria-hidden='true'>
            <div className='flex-1' />
            <div className='flex-1 w-full bg-gray-800' />
          </div>
          <div className='max-w-7xl mx-auto px-4 sm:px-6'>
            <img
              className='relative rounded-lg shadow-lg'
              src={screenShoot}
              alt='App screenshot'
            />
          </div>
        </div>
      </div>
      <div className='bg-gray-800'>
        <div className='py-16 px-4 sm:py-24 sm:px-6 lg:px-8'>
          <BaseFooter />
        </div>
      </div>
    </div>
  )
}
export default Home
