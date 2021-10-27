import * as React from 'react'
import Pagination from '../../Pagination/Pagination'
import usePagination from '../../../hooks/usePagination'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { readMsg } from '../../../service/commonApi'


const pageSize = 10
export default function NotificationTable(params: { msgList: any[] }) {
  const history = useHistory()
  const { msgList } = params
  const { list, currentPage, goToNextPage, goToPreviousPage, goToPage } = usePagination(msgList, pageSize)
  const [checkList, setCheckList] = useState(new Array(pageSize).fill(false))

  const showAction = checkList.includes(true)

  const handleRead = async () => {
    const ids = checkList.map((checked, index) => checked ? list[index]?.messageId : null).filter(Boolean)
    const { success } = await readMsg({ messageId: ids })
    if (success) {
      window.location.reload()
    }
  }

  const handleClickItem = (id: string) => {
    history.push(`/explore/detail?id=${id}`)
  }

  const getMessage = (messageItem: any) => {
    if (messageItem.messageType === 'THUMB_UP') {
      return `${messageItem.content.username} liked your article ${messageItem.content.title}.`
    } else if (messageItem.messageType === 'COMMENT') {
      return `${messageItem.content.username} commented your article ${messageItem.content.title}.`
    } else {
      return `You received a ${messageItem.messageType}.`
    }
  }

  return (
    <div className='flex flex-col'>
      <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
          <div className='sm:shadow overflow-hidden sm:border-b sm:border-gray-100 sm:rounded'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
              <tr>
                <th
                  scope='col'
                  className='px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  <input
                    type='checkbox'
                    checked={checkList?.every((item) => item === true)}
                    onChange={() => {
                      if (checkList.every((item) => item === true)) {
                        setCheckList(new Array(pageSize).fill(false))
                      } else {
                        setCheckList(new Array(pageSize).fill(true))
                      }
                    }} />
                </th>
                <th
                  scope='col'
                  className='px-3 text-left text font-medium text-gray-700 uppercase tracking-wider'
                >
                  {showAction ? (
                    <button
                      className='text text-gray-700 font-bold border border-gray-700 px-2 py-0.5 bg-white rounded shadow-sm hover:text-gray-900 hover:border-gray-900'
                      onClick={handleRead}
                    >Set Read</button>
                  ) : ('Message')}
                </th>
                <th
                  scope='col'
                  className='px-3 text-left font-medium text-gray-700 uppercase tracking-wider'
                >
                  {!showAction && ('Time')}
                </th>
              </tr>
              </thead>
              <tbody>
              {list.map((message, index) => (
                <tr key={message.messageId} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    onClick={() => {
                      handleClickItem(message.content.articleId)
                    }}>
                  <td
                    className='px-2 md:px-6 py-4 text-sm text-gray-900'
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                  >
                    <input
                      disabled={message.isRead}
                      type='checkbox'
                      checked={checkList[index]}
                      onChange={() => {
                        setCheckList((oldVal) => {
                          const newVal = [...oldVal]
                          newVal[index] = !newVal[index]
                          return newVal
                        })
                      }}
                    />
                  </td>
                  <td
                    className={`px-3  py-4 text-sm  cursor-pointer ${message.isRead ? 'text-gray-400' : 'text-gray-900'}`}>{getMessage(message)}</td>
                  <td
                    className={`px-3 py-4 text-sm cursor-pointer ${message.isRead ? 'text-gray-400' : 'text-gray-600'} whitespace-nowrap`}>{message.createTime}
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalItemNum={msgList?.length}
        next={goToNextPage}
        previous={goToPreviousPage}
        goToPage={goToPage}
      />
    </div>
  )
}
