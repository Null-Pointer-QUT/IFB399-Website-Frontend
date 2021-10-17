import * as React from 'react'
import { useState } from 'react'
import AddComment from './AddComment'
import CommentItem, { CommentInfo } from './CommentItem'
import EmptyComment from '../empty/EmptyComment'

const Comment = ({ articleId, commentList }: { articleId: string, commentList: CommentInfo[][] }) => {
  const [comments, setComments] = useState(commentList)

  const addOneComment = (newComment: CommentInfo) => {
    const formedNewComment = [newComment]
    setComments((oriComment) => [...oriComment, formedNewComment])
  }

  return (
    <div className='space-y-2'>
      <div className='text-xl font-bold'>Comments:</div>
      <AddComment articleId={articleId} addOneComment={addOneComment} />
      {comments.length ? comments.map((commentInfo) => (
        <CommentItem commentInfo={commentInfo[0]} key={commentInfo[0].commentId} />
      )) : (
        <EmptyComment />
      )}
    </div>
  )
}
export default Comment
