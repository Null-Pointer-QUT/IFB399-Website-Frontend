import * as React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useHistory } from 'react-router-dom'
import { previewerUrl } from '../../service/url'
import { increaseDownload } from '../../service/commonApi'

export interface FileItemProps {
  articleId: string
  contents: string[]
  url: string
  type: string
  fileName: string
}

const FileListItem = (props: { item: FileItemProps }) => {
  const {
    articleId,
    contents,
    url,
    fileName,
  } = props.item

  const history = useHistory()

  const goToDetail = () => {
    history.push({
      pathname: '/explore/detail',
      search: `?id=${articleId}`,
    })
  }
  const goToPreview = () => {
    window.open(`${previewerUrl}?url=` + encodeURIComponent(btoa(url)))
  }
  // console.log(props.item)
  const handleDownload = () => {
    increaseDownload({ articleId })
  }

  return (
    <div className='group hover:bg-gray-50 py-1'>
      <div className='flex flex-col space-y-1'>
        <div className='space-y-1 mx-1'>
          <div>
            <div className='text-md md:text-xl font-medium text-gray-800 most-line-1'>
              <ReactMarkdown
                children={fileName}
                components={{
                  code: ({ node, ...props }) => {
                    return (
                      <code className='text-red-500'>{props.children}</code>
                    )
                  },
                }} />
            </div>
            <div className='flex space-x-2'>
              <div>
                Action:
              </div>
              <div
                className='underline text-brand cursor-pointer'
                onClick={goToDetail}
              >
                Article
              </div>
              <div
                className='underline text-brand cursor-pointer'
                onClick={goToPreview}
              >
                Preview
              </div>
              <a
                className='underline text-brand cursor-pointer'
                href={url}
                download={url}
                onClick={handleDownload}
              >
                Download
              </a>
            </div>
          </div>
          {contents && contents.map((content,index) => (
            // <MilkdownEditor value={content} />
            <div className='p-2 border border-gray-100 bg-white rounded shadow-sm' key={index}>
              <ReactMarkdown
                children={content}
                remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
                components={{
                  code: ({ node, ...props }) => {
                    return (
                      <code className='text-red-500'>{props.children}</code>
                    )
                  },
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FileListItem
