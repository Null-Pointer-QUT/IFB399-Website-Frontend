import * as React from 'react'
import { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { CameraIcon } from '@heroicons/react/solid'

import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'

import BaseLayout from '../../components/layout/BaseLayout'
import { uploadArticle } from '../../service/commonApi'
import SingleOneObjUploader from '../../components/uploader/SingleOneObjUploader'
import {
  inputEmptyConfig, ModalConfig,
  uploadErrorConfig,
  uploadSuccessConfig,
} from '../../utils/modalConfig'
import MultiFileUploader from '../../components/uploader/MultiFileUploader'
import { useModelContext } from '../../context/ModelContext'

const mdParser = new MarkdownIt()
const placeholder = `Edit here`

const Upload = () => {
  const [title, setTitle] = useState<string | null>(null)
  const [topImage, setTopImage] = useState<string | null>(null)
  const [indexImage, setIndexImage] = useState<string | null>(null)
  const [attachment, setAttachment] = useState<string[] | null>(null)
  const [tag1, setTag1] = useState<string | null>(null)
  const [tag2, setTag2] = useState<string | null>(null)

  const { dispatch: modelDispatch } = useModelContext()
  const openModel = (config: ModalConfig) => {
    modelDispatch({ type: 'OPEN', config })
  }
  const closeModel = () => {
    modelDispatch({ type: 'CLOSE' })
  }

  const [body, setBody] = useState<string | null>(null)
  const [ytVideo, setYtVideo] = useState<string | null>(null)
  const history = useHistory()

  const onTopImageUploaded = useCallback((success: boolean, url: string) => {
    success && setTopImage(url)
  }, [setTopImage])

  const onIndexImageUploaded = useCallback((success: boolean, url: string) => {
    success && setIndexImage(url)
  }, [setIndexImage])

  const handleUpload = async (isPublish: boolean = true) => {
    if (title && body && indexImage && topImage) {
      const { success, msg } = await uploadArticle(
        {
          title,
          content: body,
          videoUrl: ytVideo ? [ytVideo] : [],
          attachments: attachment as string[],
          isPublish,
          topImage: topImage as string,
          // @ts-ignore
          tags: [...new Set([tag1!, tag2!].filter(Boolean))],
          indexImage: indexImage as string,
        })
      if (success) {
        openModel(uploadSuccessConfig)
        setTimeout(() => {
          history.push('/')
          closeModel()
        }, 3000)
      } else {
        openModel({ ...uploadErrorConfig, body: msg })
      }
    } else {
      openModel(inputEmptyConfig)
    }
  }

  return (
    <BaseLayout>
      <div className='space-y-2 m-2 '>
        <div className='min-h-24 max-h-64 flex'>
          <SingleOneObjUploader
            className='max-h-64 min-h-24 rounded'
            acceptType='image/*'
            icon={<CameraIcon className='h-10 w-10 text-gray-700 group-hover:text-gray-900' />}
            title='Top image'
            onUpload={onTopImageUploaded}
            onDelete={() => {
              setTopImage(null)
            }}
          />
        </div>
        <input
          type='text'
          name='title'
          id='title'
          className='shadow-sm focus:ring-brand focus:border-brand block w-full sm:text-2xl border-gray-300 rounded-md'
          placeholder='Please input your header…'
          onChange={(e) => {
            setTitle(e.target.value)
          }}
        />
        <div className='w-full h-120'>
          <MdEditor
            placeholder={placeholder}
            style={{ height: '100%' }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={({ text }) => {
              setBody(text)
            }}
          />
        </div>

        <div>
          <label htmlFor='yt_video' className='block text-sm font-medium text-gray-700'>
            YouTube Video Link or ID (Optional)
          </label>
          <div className='mt-1'>
            <input
              type='text'
              name='yt_video'
              id='yt_video'
              className='shadow-sm focus:ring-brand focus:border-brand block w-full sm:text-sm border-gray-300 rounded-md'
              onChange={(e) => {
                setYtVideo(e.target.value)
              }}
            />
          </div>
        </div>
        <div className='flex space-x-2'>
          <div className='flex-1'>
            <label htmlFor='tag1' className='block text-sm font-medium text-gray-700'>
              Tag1: (Optional)
            </label>
            <div className='mt-1'>
              <input
                type='text'
                name='tag1'
                id='tag1'
                className='shadow-sm focus:ring-brand focus:border-brand block w-full sm:text-sm border-gray-300 rounded-md'
                value={tag1 || ''}
                onChange={(e) => {
                  if (e.target.value.length <= 15) {
                    setTag1(e.target.value)
                  }
                }}
              />
            </div>
          </div>
          <div className='flex-1' hidden={!tag1}>
            <label htmlFor='tag2' className='block text-sm font-medium text-gray-700'>
              Tag2: (Optional)
            </label>
            <div className='mt-1'>
              <input
                type='text'
                name='tag2'
                id='tag2'
                className='shadow-sm focus:ring-brand focus:border-brand block w-full sm:text-sm border-gray-300 rounded-md'
                value={tag2 || ''}
                onChange={(e) => {
                  if (e.target.value.length <= 15) {
                    setTag2(e.target.value)
                  }
                }}
              />
            </div>
          </div>
        </div>


        <div className='grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4'>
          <SingleOneObjUploader
            className='h-24 md:h-28 rounded'
            title='Index image'
            icon={<CameraIcon className='h-10 w-10 text-gray-700 group-hover:text-gray-900' />}
            acceptType='image/*'
            onUpload={onIndexImageUploaded}
            onDelete={() => {
              setIndexImage(null)
            }}
          />
          <MultiFileUploader setFileUrl={setAttachment} maxFileNum={10} />
        </div>

        <div className='py-2'>
          <button
            className='btn-primary'
            onClick={() => {
              handleUpload()
            }}
          >
            Upload
          </button>
        </div>
        <div>
          <button
            className='btn-secondary'
            onClick={
              () => {
                handleUpload(false)
              }
            }
          >
            Save Draft
          </button>
        </div>
      </div>
    </BaseLayout>
  )
}
export default Upload
