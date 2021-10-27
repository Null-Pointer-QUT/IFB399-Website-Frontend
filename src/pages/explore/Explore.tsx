import * as React from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Pagination from '../../components/Pagination/Pagination'
import ExploreHeader from '../../components/header/ExploreHeader'
import BaseListItem, { ItemProps } from '../../components/listItem/BaseListItem'
import SectionTitle from '../../components/header/SectionTitle'
import UseGetArticleList from '../../hooks/useGetArticleList'
import EmptyArticle from '../../components/empty/EmptyArticle'
import BaseLoading from '../../components/loadings/BaseLoading'
import usePagination from '../../hooks/usePagination'
import UsePublicTopicList from '../../hooks/useGetPublicTopicList'

export interface Topic {
  topicId: string
  topicName: string
}

interface TagContext {
  topic: string
  setTag: (val: string) => void
  topicList: Topic[]
}

const pageSize = 10
export const tagContext = React.createContext<TagContext>({
  topic: 'All',
  setTag: (val) => {
  },
  topicList: [],
})

const Explore = () => {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const [topic, setTopic] = useState(params.get('topic') || 'All')
  const [topicList] = UsePublicTopicList()
  const tag = topic === 'All' ? '' : topic
  const [articleList, loading] = UseGetArticleList(tag)
  const { list, currentPage, goToNextPage, goToPreviousPage, goToPage } = usePagination(articleList, pageSize)
  return (
    <tagContext.Provider value={{ topic: topic, setTag: setTopic, topicList }}>
      <div>
        <ExploreHeader showClasifation currentTab='Explore' />
        <SectionTitle title='Explore' description='Browse popular topics.' />
        {(!loading && list.length !== 0) && (
          <div>
            <div className='space-y-2 m-2'>
              {/* @ts-ignore*/}
              {list.map((item: ItemProps) => (
                <BaseListItem key={item.articleId} item={item} />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              pageSize={pageSize}
              totalItemNum={articleList?.length}
              next={goToNextPage}
              previous={goToPreviousPage}
              goToPage={goToPage}
            />
          </div>
        )}
        {(!loading && list.length === 0) && (
          <div className='bg-white py-36 rounded m-2'>
            <EmptyArticle />
          </div>
        )}
        {loading && <BaseLoading />}
      </div>
    </tagContext.Provider>
  )
}
export default Explore
