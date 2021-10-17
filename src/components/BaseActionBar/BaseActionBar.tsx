import * as React from 'react'
import { useState } from 'react'
import { timeFromNow } from '../../utils/utils'
import {
  DownloadIcon,
  ChatAlt2Icon,
  ClockIcon,
  EyeIcon,
  ThumbUpIcon as ThumbUpIconOutline,
} from '@heroicons/react/outline'
import { ThumbUpIcon as ThumbUpIconSolid } from '@heroicons/react/solid'
import { doThumbUp } from '../../service/commonApi'
import { useModelContext } from '../../context/ModelContext'
import { ModalConfig, notLoginConfig } from '../../utils/modalConfig'
import { useUserInfoContext } from '../../context/UserInfoContext'

export interface ActionBarProps {
  articleId: string
  isThumbUp: boolean
  nrOfDownloads: number
  nrOfThumbUp: number
  nrOfVisit: number
  nrOfComment: number
  createTime: string
}

const BaseActionBar = ({ actionProps }: { actionProps: ActionBarProps }) => {

  const { dispatch: modelDispatch } = useModelContext()
  const { state: userInfo } = useUserInfoContext()
  const openModel = (config: ModalConfig) => {
    modelDispatch({ type: 'OPEN', config })
  }

  const {
    articleId,
    isThumbUp,
    nrOfDownloads,
    nrOfThumbUp,
    nrOfVisit,
    nrOfComment,
    createTime,
  } = actionProps
  const [thumbUp, setThumbUp] = useState(isThumbUp)
  const [thumbUpNum, setThumbUpNum] = useState<number>(nrOfThumbUp)

  const handleThumbUpClick = async () => {
    const isLogin = userInfo.isLogin
    if (!isLogin) {
      openModel(notLoginConfig)
      return
    }
    const { success, isThumbUp } = await doThumbUp({ articleId: articleId })
    if (success) {
      setThumbUp(isThumbUp)
      if (isThumbUp) {
        setThumbUpNum((num) => num + 1)
      } else {
        setThumbUpNum((num) => num - 1)
      }
    }
  }
  const [timeFrom, unit] = timeFromNow(new Date(createTime.replace(' ', 'T')))
  return (
    <div className='w-full flex justify-between'>
      <div className='flex space-x-2 md:space-x-4'>
        <div className='flex space-x-1 text-sm text-gray-500 items-center'>
          <EyeIcon className='md:h-6 md:w-6 h-4 w-4 text-gray-500' />
          <div className='sm:text-sm'>{nrOfVisit || 0}</div>
          <div className='hidden md:inline'>reads</div>
        </div>
        <div className='flex space-x-1 text-sm text-gray-500 items-center'>
          <ChatAlt2Icon className='md:h-6 md:w-6 h-4 w-4 text-gray-500' />
          <div>{nrOfComment || 0}</div>
          <div className='hidden md:inline'>comments</div>
        </div>
        <div className='flex space-x-1 text-sm text-gray-500 items-center'>
          <DownloadIcon className='md:h-6 md:w-6 h-4 w-4 text-gray-500' />
          <div>{nrOfDownloads || 0}</div>
          <div className='hidden md:inline'>downloads</div>
        </div>
        <div className='flex space-x-1 text-sm text-gray-500 items-center'>
          <ClockIcon className='md:h-6 md:w-6 h-4 w-4 text-gray-500' />
          <div>{timeFrom || 0}</div>
          <div className='inline'>{unit || 'days'} <p className='hidden md:inline'>ago</p></div>
        </div>
      </div>

      <div
        className='flex space-x-1 text-sm text-gray-500 items-center px-1 rounded cursor-pointer hover:bg-gray-100'
        onClick={handleThumbUpClick}
      >
        {thumbUp
          ? <ThumbUpIconSolid className='md:h-6 md:w-6 h-4 w-4 text-gray-500' />
          : <ThumbUpIconOutline className='md:h-6 md:w-6 h-4 w-4 text-gray-500' />
        }
        <div>{thumbUpNum}</div>
        <div className='hidden md:inline'>likes</div>
      </div>
    </div>
  )
}
export default BaseActionBar
