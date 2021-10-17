import * as React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'

type PaginationProps = {
  pageSize: number
  currentPage: number
  totalItemNum: number
  next: () => void
  previous: () => void
  goToPage: (page: number) => void
}

const genPageList = (start: number, stop: number, current: number) => {
  const pageNum = stop - start + 1
  let list: (string | number)[]
  if (pageNum >= 7) {
    if ((current - start) <= 3) {
      list = []
      for (let i = start; i <= start + 4; i++) {
        list.push(i)
      }
      list.push('...')
      list.push(stop)
    } else if ((stop - current) <= 3) {
      list = []
      list.push(start)
      list.push('...')
      for (let i = stop - 4; i <= stop; i++) {
        list.push(i)
      }
    } else {
      list = []
      list.push(start)
      list.push('...')
      for (let i = current - 2; i <= current + 2; i++) {
        list.push(i)
      }
      list.push('...')
      list.push(stop)
    }
  } else {
    list = []
    for (let i = start; i <= stop; i++) {
      list.push(i)
    }
  }
  return list
}

export default function Pagination(
  {
    pageSize,
    currentPage,
    totalItemNum,
    next,
    previous,
    goToPage,
  }: PaginationProps,
) {
  const pageNum = totalItemNum ? Math.ceil(totalItemNum / pageSize) : 1
  const pageList = genPageList(1, pageNum, currentPage)
  return (
    <div className='bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6'>
      <div className='flex-1 flex justify-between items-center sm:hidden'>
        <button
          className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
          onClick={previous}
        >
          Previous
        </button>
        <div className='flex items-center justify-center font-medium text-gray-700 border rounded w-8 h-8'>{currentPage}</div>
        <button
          className='ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
          onClick={next}
        >
          Next
        </button>
      </div>
      <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
        <div>
          <p className='text-sm text-gray-700'>
            Showing <span className='font-medium'>{currentPage}</span> to{' '}
            <span className='font-medium'>{pageNum}</span> of{' '}
            <span className='font-medium'>{totalItemNum}</span> results
          </p>
        </div>
        <div>
          <nav
            className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
            aria-label='Pagination'
          >
            <button
              className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
              onClick={previous}
            >
              <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
            </button>
            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
            {pageList.map((item, index) => {
              return item === currentPage ? (
                <button
                  key={index}
                  aria-current='page'
                  className='z-10 bg-blue-50 border-brand text-gray-700 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                >
                  {item}
                </button>
              ) : (
                <button
                  key={index}
                  className='bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                  onClick={() => {
                    if (item !== '...') {
                      goToPage(item as number)
                    }
                  }}
                >
                  {item}
                </button>
              )
            })}
            <button
              className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
              onClick={next}
            >
              <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}
