import * as React from 'react'
import { useMemo } from 'react'
import SectionTitle from '../../components/header/SectionTitle'
import SubscriptionItem, { Topic } from '../../components/SubscriptionSection/SubscriptionItem'
import BaseLoading from '../../components/loadings/BaseLoading'
import UsePublicTopicList from '../../hooks/useGetPublicTopicList'
import EmptySubscribed from '../../components/empty/EmptySubscribed'

const Subscribed = () => {
  const [topicList, loading] = UsePublicTopicList()
  const likedList: Topic[] = useMemo(() => {
    if (topicList) {
      return topicList.filter((item: Topic) => item.isSubscribed)
    } else {
      return []
    }
  }, [topicList])

  return (
    <div className='mt-2'>
      <SectionTitle
        title='Subscribed'
        description='Topics you subscribed.'
      />
      <div className='px-2'>
        {!loading ? (
          <>
            {(likedList?.length !== 0) ? (
              <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 pb-3'>
                {likedList && likedList.map((topic: Topic) => (
                  <SubscriptionItem topic={topic} key={topic.topicId} />
                ))}
              </div>
            ) : (
              <div className='bg-white py-36 rounded m-2'>
                <EmptySubscribed />
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
export default Subscribed
