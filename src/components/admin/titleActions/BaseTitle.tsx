import * as React from 'react'

export default function BaseTitle({ title }: { title: string }) {
  return (
    <div
      className='border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8'>
      <div className='flex-1 min-w-0'>
        <h1 className='text-lg font-medium leading-6 text-gray-900 sm:truncate'>{title}</h1>
      </div>
      {/*<div className='mt-4 flex sm:mt-0 sm:ml-4'>*/}
      {/*  <button*/}
      {/*    type='button'*/}
      {/*    className='order-1 ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand sm:order-0 sm:ml-0'*/}
      {/*  >*/}
      {/*    Share*/}
      {/*  </button>*/}
      {/*  <button*/}
      {/*    type='button'*/}
      {/*    className='order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand sm:order-1 sm:ml-3'*/}
      {/*  >*/}
      {/*    Create*/}
      {/*  </button>*/}
      {/*</div>*/}
    </div>
  )
}
