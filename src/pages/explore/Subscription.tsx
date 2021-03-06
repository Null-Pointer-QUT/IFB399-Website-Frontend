import * as React from 'react'
import SectionTitle from '../../components/header/SectionTitle'
import ExploreHeader from '../../components/header/ExploreHeader'
import SubscriptionItem, { Topic } from '../../components/SubscriptionSection/SubscriptionItem'
import EmptySubscription from '../../components/empty/EmptySubscription'
import BaseLoading from '../../components/loadings/BaseLoading'
import UsePublicTopicList from '../../hooks/useGetPublicTopicList'

const Subscription = () => {
  const [topicList, loading] = UsePublicTopicList()
  return (
    <div>
      <ExploreHeader currentTab='Subscription' />
      <SectionTitle
        title='Subscription'
        description='Browse all popular tags.'
      />
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
    </div>
  )
}
export default Subscription
