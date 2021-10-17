import * as React from 'react'
import ReactMarkdown from 'react-markdown'
import { useHistory, useLocation } from 'react-router-dom'

import BaseActionBar from '../../components/BaseActionBar/BaseActionBar'
import BaseLayout from '../../components/layout/BaseLayout'
import YoutubeEmbed from '../../components/YoutubeEmbed/YoutubeEmbed'
import AttachmentsSection from '../../components/AttachmentsSection/AttachmentsSection'
import BaseUserInfoBar from '../../components/BaseUserInfoBar/BaseUserInfoBar'
import Comment from '../../components/comment/Comment'
import UseFetchData from '../../hooks/useFetchData'
import { getArticleDetail } from '../../service/commonApi'
import BaseLoading from '../../components/loadings/BaseLoading'

const Detail = () => {
  const location = useLocation()
  const history = useHistory()
  const params = new URLSearchParams(location.search)
  if (!params.get('id')) {
    history.replace('/')
  }
  const articleId = params.get('id') as string
  const props = { articleId }
  const { res, loading, err } = UseFetchData(getArticleDetail, props, articleId !== null)
  let actionProps
  if (res && !loading && !err) {
    const {
      isThumbUp,
      nrOfDownloads,
      nrOfThumbUp,
      nrOfVisit,
      nrOfComment,
      createTime,
    } = res

    actionProps = {
      articleId,
      isThumbUp,
      nrOfDownloads,
      nrOfThumbUp,
      nrOfVisit,
      nrOfComment,
      createTime,
    }
  }

  return (
    <BaseLayout>
      {res && !loading && !err
        ? (
          <div className='bg-white p-6 space-y-4 md:space-y-6'>
            <img className='rounded-md' src={res.topImage} alt='#' />
            <div className='text-3xl font-bold'>{res.title}</div>
            <div className=''>
              {(res.tags.length !== 0) && (
                <div className='space-x-2 flex'>
                  {res.tags[0] && (
                    <div className='flex items-center px-2 py-1 rounded-md font-medium bg-blue-100 text-gray-700'>
                      {res.tags[0]}
                    </div>
                  )}
                  {res.tags[1] && (
                    <div className='flex items-center px-2 py-1 rounded-md font-medium bg-pink-100 text-gray-700'>
                      {res.tags[1]}
                    </div>
                  )}
                </div>
              )}
            </div>

            <BaseUserInfoBar userInfo={res.user} />
            {/*@ts-ignore*/}
            <BaseActionBar actionProps={actionProps} />
            {res.videoUrl[0] && <YoutubeEmbed embedId={res.videoUrl[0]} />}
            <ReactMarkdown children={res.content} components={{
              code: ({ node, ...props }) => {
                return (
                  <code className='text-red-500'>{props.children}</code>
                )
              },
            }} />
            <AttachmentsSection attachments={res.attachments} articleId={articleId} />
            <Comment articleId={articleId} commentList={res.commentList} />
          </div>
        ) : (
          <BaseLoading />
        )}
    </BaseLayout>
  )
}

export default Detail
