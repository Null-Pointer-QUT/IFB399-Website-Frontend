import * as React from 'react'
import BaseActionBar from '../BaseActionBar/BaseActionBar'
import { useHistory } from 'react-router-dom'
import { changePublicationStatus, deleteArticle } from '../../service/commonApi'
import { useState } from 'react'

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
  isPublish: boolean
}

const EditListItem = ({ item }: { item: ItemProps }) => {
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
    history.push({
      pathname: '/explore/detail',
      search: `?id=${articleId}`,
    })
  }

  const [isPublished, setIsPublish] = useState(item.isPublish)

  const handleChangePublish = async () => {
    const { success } = await changePublicationStatus({ articleId })
    if (success) {
      setIsPublish((val => !val))
    }
  }
  const handleDelete = async () => {
    const { success } = await deleteArticle({ articleId })
    if (success) {
      window.location.reload()
    }
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
              <div className='space-x-2 hidden md:flex'>
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
          <div className='flex justify-between space-x-2 items-center md:space-x-4 '>
            <div className='w-24 md:w-32 h-20 flex items-center justify-center'>
              <img
                className='object-contain h-full rounded-sm'
                src={indexImage}
                alt='#'
              />
            </div>
            <div className='w-full h-16 md:h-24 text-gray-800 text-left leading-4 text-sm md:text-base most-line-4'>
              {content}
            </div>
          </div>
        </div>

        <div className='h-4 md:h-8 flex justify-between'>
          <BaseActionBar actionProps={actionProps} />
        </div>

        <div className='flex space-x-2 justify-end pt-1'>
          <button
            className={`${isPublished ? 'btn-warn' : 'btn-primary'} py-0.5 flex w-16 md:w-24`}
            onClick={handleChangePublish}
          >
            {isPublished ? 'Remove' : 'Publish'}
          </button>
          <button
            className='btn-secondary py-0.5 flex w-16 md:w-24'
            onClick={()=>{
              history.push(`/edit_article?id=${articleId}`)
            }}
          >
            Edit
          </button>
          <button
            className='btn-secondary py-0.5 flex w-16 md:w-24'
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditListItem
