import * as React from 'react'
import { addComment } from '../../service/commonApi'
import { useState } from 'react'
import { CommentInfo } from './CommentItem'
import { useHistory } from 'react-router-dom'
import { imgUrl } from '../../service/url'

interface AddCommentProps {
  articleId: string
  addOneComment: (newComment: CommentInfo) => void
}

const AddComment = ({ articleId, addOneComment }: AddCommentProps) => {
  const history = useHistory()
  const userInfo = {
    name: localStorage.getItem('username'),
    email: localStorage.getItem('userEmail'),
    avatar: localStorage.getItem('userAvatar'),
    id: localStorage.getItem('userId'),
  }
  const [comment, setComment] = useState<string>('')
  const handleAddComment = async () => {
    if (comment !== '') {
      try {
        let { data } = await addComment({ articleId, parentId: 0, comment })
        addOneComment({
          comment,
          commentId: data,
          user: { avatar: userInfo.avatar!, name: userInfo.name!, id: userInfo.id!, email: userInfo.email! },
          createTime: new Date().toISOString(),
        })
        setComment('')
      } catch (e) {
        console.log(e)
      }
    }
  }

  const disableInput = localStorage.getItem('isLogin') !== 'true'
  const disableComment = !comment

  return (
    <div
      className='flex items-center space-x-3'
      onClick={() => {
        if (disableInput) {
          history.push('/login')
        }
      }}
    >
      <img
        className='h-10 w-10 rounded-full'
        src={userInfo.avatar || imgUrl.defaultAvatar}
        alt='#'
      />
      <input
        type='text'
        name='title'
        id='title'
        className='shadow-sm text-sm focus:ring-brand focus:ring-brand w-full sm: border-gray-300 rounded-xl'
        placeholder='Write a comment...'
        disabled={disableInput}
        value={comment}
        onChange={(e) => {
          setComment(e.target.value)
        }}
      />
      {disableComment
        ? (
          <button
            type='button'
            className='inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-gray-500 cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand '
            disabled
          >
            Comment
          </button>)
        : (
          <button
            type='button'
            className='inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-brand hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand'
            onClick={handleAddComment}
          >
            Comment
          </button>
        )}
    </div>
  )
}
export default AddComment
