import * as React from 'react'
import UsePublicTopicList from '../../hooks/useGetPublicTopicList'
import SubscriptionItem, { Topic } from './SubscriptionItem'
import BaseLoading from '../loadings/BaseLoading'
import EmptySubscription from '../empty/EmptySubscription'


const SubscriptionSection = () => {
  const [topicList, loading] = UsePublicTopicList()
  return (
    <div className='px-2'>
      {!loading ? (
        <>
          {(topicList?.length !== 0) ? (
            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 pb-3'>
              {topicList && topicList.map((topic: Topic) => (
                <SubscriptionItem topic={topic} key={topic.topicId} />
              ))}
            </div>
          ) : (
            <div className='bg-white py-36 rounded m-2'>
              <EmptySubscription />
            </div>
          )}
        </>
      ) : (
        <BaseLoading />
      )}
    </div>
  )
}
export default SubscriptionSection
