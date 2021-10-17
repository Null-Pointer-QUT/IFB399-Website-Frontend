import * as React from 'react'
import { useState } from 'react'
import { changeTopicDetail, changeTopicPubStatus } from '../../../service/adminApi'
import TopicImageUploader from '../../uploader/TopicImageUploader'

export interface TopicItemProps {
  topicId: string
  topicName: string
  introduction: string
  image: string
  isPublic: boolean
  relatedArticles: string[]
  subTopics: string[]
}

export default function TopicItem({ item }: { item: TopicItemProps }) {
  const [collect, setCollect] = useState(item.isPublic)
  const [isEdit, setIsEdit] = useState(false)
  const [introduction, setIntroduction] = useState('')

  const [, setSubtopic] = useState('')
  const [imgUrl, setImgUrl] = useState(item.image)
  const defaultSubTopic = item.subTopics?.join('/')


  async function handlePublic() {
    const { success } = await changeTopicPubStatus({ topicId: item.topicId })
    if (success) {
      setCollect((val) => !val)
    }
  }

  // async function handleEditSubtopic() {
  //
  // }

  async function handleEditDescribe() {
    if (!introduction) {
      return
    }
    const { success } = await changeTopicDetail({ topicId: item.topicId, key: 'introduction', value: introduction })
    if (success) {
      item.introduction = introduction
    }
  }

  async function onImageUploadSuccess(url: string) {
    const { success } = await changeTopicDetail({ topicId: item.topicId, key: 'image', value: url })
    if (success) {
      item.image = url
    }
  }

  return (
    <tr key={item.topicId}>
      <td className='px-6 py-4 whitespace-nowrap'>
        {isEdit ? (
          <TopicImageUploader imgUrl={imgUrl} setImgUrl={setImgUrl} onSuccess={onImageUploadSuccess} />
        ) : (
          <img className='h-10 w-10 rounded-full' src={item.image} alt='' />
        )}
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-900 normal-case'>{item.topicName}</div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap w-80'>
        {isEdit ? (
          <div className='flex flex-col items-center space-y-2'>
            <textarea
              name='message'
              rows={3}
              className='py-3 w-full block shadow-sm text-gray-900 focus:outline-none focus:ring-brand-light focus:ring-brand-light border border-gray-300 rounded-md'
              aria-describedby='message-max'
              defaultValue={item.introduction}
              onChange={(e) => {
                setIntroduction(e.target.value)
              }}
            />
            <div className='w-full'>
              <button className='btn-secondary' onClick={handleEditDescribe}>ok</button>
            </div>
          </div>
        ) : (
          <div className='max-w-xs lg:max-w-md truncate overflow-ellipsis text-sm text-gray-900 normal-case'>
            {item.introduction}
          </div>
        )}
      </td>
      <td className='px-6 py-4 whitespace-nowrap w-60'>
        <div className='text-sm text-gray-900 space-x-0.5'>
          {isEdit ? (
            <div className='flex flex-col items-center space-y-2'>
            <textarea
              name='message'
              rows={3}
              className='py-3 w-full block shadow-sm text-gray-900 focus:outline-none focus:ring-brand-light focus:ring-brand-light border border-gray-300 rounded-md'
              aria-describedby='message-max'
              defaultValue={defaultSubTopic}
              onChange={(e) => {
                setSubtopic(e.target.value)
              }}
            />
              <div className='w-full'>
                <button className='btn-secondary'>ok</button>
              </div>
            </div>
          ) : (
            <>
              {item.subTopics && item.subTopics.map((name) => (
                <span
                  className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'
                  key={name}
                >
                  {name}
               </span>
              ))}
            </>
          )}
        </div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap '>
        <div className='text-sm text-gray-900'>{item.relatedArticles.length}</div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
        {collect ? (
          <button
            className='text-gray-500 hover:text-gray-700 underline'
            onClick={handlePublic}
          >
            Delete
          </button>
        ) : (
          <button
            className='text-brand hover:text-brand-dark underline'
            onClick={handlePublic}
          >
            Public
          </button>
        )}
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
        {isEdit ? (
          <div>
            <button
              className='text-brand hover:text-brand-dark underline'
              onClick={() => {
                setIsEdit(false)
              }}>
              Confirm
            </button>
          </div>
        ) : (
          <button
            className='text-gray-500 hover:text-gray-900 underline'
            onClick={() => {
              setIsEdit(true)
            }}>
            Edit
          </button>
        )}

      </td>
    </tr>
  )
}
