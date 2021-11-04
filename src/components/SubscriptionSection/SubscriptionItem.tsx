import { AcademicCapIcon, CheckCircleIcon } from '@heroicons/react/solid'
import { subscribeTropic } from '../../service/commonApi'
import * as React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ModalConfig, notLoginConfig } from '../../utils/modalConfig'
import { useModelContext } from '../../context/ModelContext'

export interface Topic {
  topicId: string
  image: string
  introduction: string
  topicName: string
  isSubscribed: boolean
}

export default function SubscriptionItem({ topic }: { topic: Topic }) {
  const history = useHistory()
  const [sub, setSub] = useState(topic.isSubscribed)
  const { dispatch: modelDispatch } = useModelContext()
  const openModel = (config: ModalConfig) => {
    modelDispatch({ type: 'OPEN', config })
  }
  return (
    <div
      key={topic.topicId}
      className='col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200'
    >
      <div className='w-full flex items-center justify-between p-4 space-x-2'>
        <div className='flex-1'>
          <div className='flex items-center space-x-3'>
            <h3 className='text-gray-900 text-xl font-medium font-medium truncate'>
              {topic.topicName}
            </h3>
            {/*<span*/}
            {/*  className='flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full'>*/}
            {/*  {topic.role}*/}
            {/*</span>*/}
          </div>
          <p className='h-24 overflow-ellipsis overflow-hidden mt-1 text-gray-500 text-sm '>
            {topic.introduction}
          </p>
        </div>
        <img
          className='w-20 h-20 bg-gray-300 rounded-full object-contain'
          src={topic.image}
          alt=''
        />
      </div>
      <div>
        <div className='-mt-px flex divide-x divide-gray-200'>
          <div className='w-0 flex-1 flex'>
            <button
              className='relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500'
              onClick={() => {
                history.push({
                  pathname: '/explore',
                  search: '?' + new URLSearchParams({ topic: topic.topicName }).toString(),
                })
              }}
            >
              <AcademicCapIcon
                className='w-5 h-5 text-gray-400'
                aria-hidden='true'
              />
              <span className='ml-1'>Explore</span>
            </button>
          </div>
          <div className='-ml-px w-0 flex-1 flex'>
            <button
              className='relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500'
              onClick={async () => {
                const { success } = await subscribeTropic({ topicId: topic.topicId })
                if (success) {
                  setSub((val) => !val)
                } else {
                  openModel(notLoginConfig)
                }
              }}
            >
              {sub ? (
                <>
                  <CheckCircleIcon
                    className='w-5 h-5 text-brand'
                    aria-hidden='true'
                  />
                  <span className='ml-1'>Subscribed</span>
                </>
              ) : (
                <>
                  <CheckCircleIcon
                    className='w-5 h-5 text-gray-400'
                    aria-hidden='true'
                  />
                  <span className='ml-1'>Subscribe</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
