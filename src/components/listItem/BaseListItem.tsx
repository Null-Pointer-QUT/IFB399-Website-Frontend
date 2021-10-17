import * as React from 'react'
import BaseActionBar from '../BaseActionBar/BaseActionBar'
import { useHistory } from 'react-router-dom'

export interface ItemProps {
  articleId: string
  title: string
  content: string
  indexImage: string
  isThumbUp: boolean
  nrOfComment: number
  nrOfDownloads: number
  nrOfThumbUp: number
  nrOfVisit: number
  createTime: string
  tags: string[]
}

const BaseListItem = ({ item }: { item: ItemProps }) => {
  const {
    articleId,
    title,
    content,
    indexImage,
    isThumbUp,
    nrOfDownloads,
    nrOfThumbUp,
    nrOfComment,
    nrOfVisit,
    createTime,
    tags,
  } = item

  const actionProps = {
    articleId,
    isThumbUp,
    nrOfDownloads,
    nrOfThumbUp,
    nrOfVisit,
    nrOfComment,
    createTime,
  }
  const history = useHistory()
  const goToDetail = () => {
    const params = new URLSearchParams()
    params.set('id', articleId)
    history.push({
      pathname: '/explore/detail',
      search: `?${params}`,
    })
  }

  return (
    <div className='group border rounded-md bg-white hover:bg-gray-50 py-1 px-2 md:py-2 md:px-6'>
      <div className='flex flex-col space-y-1'>
        <div
          className='cursor-pointer space-y-0.5'
          onClick={goToDetail}
        >
          <div className='flex justify-between'>
            <div className='text-md md:text-xl font-bold text-gray-800 most-line-1'>
              {title}
            </div>
            {(tags.length !== 0) && (
              <div className='space-x-2 hidden sm:flex'>
                {tags[0] && (
                  <div className='flex items-center px-2 rounded-md text-xs font-medium bg-blue-100 text-gray-700'>
                    {tags[0]}
                  </div>
                )}
                {tags[1] && (
                  <div className='flex items-center px-2 rounded-md text-xs font-medium bg-pink-100 text-gray-700'>
                    {tags[1]}
                  </div>
                )}
              </div>
            )}
          </div>
          <>
            {(tags.length !== 0) && (
              <div className='w-full space-x-2 flex sm:hidden'>
                {tags[0] && (
                  <div className='flex items-center px-2 rounded-md text-xs font-medium bg-blue-100 text-gray-700'>
                    {tags[0]}
                  </div>
                )}
                {tags[1] && (
                  <div className='flex items-center px-2 rounded-md text-xs font-medium bg-pink-100 text-gray-700'>
                    {tags[1]}
                  </div>
                )}
              </div>
            )}
          </>
          <div className='flex justify-between space-x-2 items-center md:space-x-4'>
            <div className='h-16 md:h-24 w-32 md:w-48 flex items-center justify-center'>
              <img
                className='object-contain rounded-sm h-16 md:h-24'
                src={indexImage}
                alt='#'
              />
            </div>
            <div className='h-16 md:h-24 w-full text-gray-800 text-left leading-4 text-sm md:text-base most-line-4'>
              {content}
            </div>
          </div>
        </div>

        <div className='h-4 md:h-8 flex justify-between'>
          <BaseActionBar actionProps={actionProps} />
        </div>
      </div>
    </div>
  )
}

export default BaseListItem
