import * as React from 'react'
import { timeFromNow } from '../../utils/utils'

export interface CommentInfo {
  comment: string
  commentId: string
  createTime: string
  user: {
    avatar: string
    name: string
    id: string
    email: string
  }
}

const CommentItem = ({ commentInfo }: { commentInfo: CommentInfo }) => {
  const [timeFrom, unit] = timeFromNow(new Date(commentInfo.createTime.replace(' ', 'T')))
  const isMyComment = localStorage.getItem('userId') === commentInfo.user.id
  return (
    <div className='flex items-start my-3 space-x-3'>
      <img className='h-10 w-10 rounded-full' src={commentInfo.user.avatar} alt='#' />
      <div className='bg-gray-100 rounded-lg w-full space-y-1 py-2 px-3'>
        <div className='flex items-center justify-between whitespace-nowrap'>
          <div className='text-black text-sm overflow-hidden overflow-ellipsis w-28 sm:w-full'>{commentInfo.user.name} {isMyComment && '(me)'}:</div>
          <div className='text-gray-600 text-sm '>{`${timeFrom} ${unit} ago`} </div>
        </div>
        <div className='text-gray-800'>{commentInfo.comment}</div>
      </div>
    </div>
  )
}
export default CommentItem
