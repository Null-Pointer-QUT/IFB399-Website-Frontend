import NotificationTab from '../../components/tabs/NotificationTab'
import BaseLayout from '../../components/layout/BaseLayout'
import NotificationTable from '../../components/tables/NotificationTable/NotificationTable'
import UseGetAllMsg from '../../hooks/useGetAllMsg'
import { useState } from 'react'
import { MenuIcon, MailIcon, MailOpenIcon } from '@heroicons/react/solid'
import EmptyMessage from '../../components/empty/EmptyMessage'
import BaseLoading from '../../components/loadings/BaseLoading'

const tabs = [
  { name: 'All', to: '#', icon: MenuIcon },
  { name: 'unread', to: '#', icon: MailIcon },
  { name: 'read', to: '#', icon: MailOpenIcon },
]
export default function Notification() {
  const [currentTab, setCurrentTab] = useState(0)
  const [allMsg, loading] = UseGetAllMsg(currentTab)
  let readList = []
  let unreadList = []
  if (allMsg) {
    readList = allMsg.filter((item: any) => item.isRead)
    unreadList = allMsg.filter((item: any) => !item.isRead)
  }
  let msgList = []
  switch (currentTab) {
    case 0:
      msgList = allMsg
      break
    case 1:
      msgList = unreadList
      break
    case 2:
      msgList = readList
      break
    default:
      throw new Error()
  }
  return (
    <BaseLayout>
      <div className='bg-white px-3'>
        <div>
          <div className='text-gray-700 text-2xl font-bold text-center py-3 sm:pb-0'>Notification</div>
          <NotificationTab tabs={tabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />
        </div>
        {!loading?(
          <>
            {msgList?.length === 0 ? (
              <div className='py-3'>
                <EmptyMessage />
              </div>
            ) : (
              <NotificationTable msgList={msgList} />
            )}
          </>
        ):(
          <BaseLoading/>
        )}
      </div>
    </BaseLayout>
  )
}
