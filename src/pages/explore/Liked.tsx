import * as React from 'react'
import BaseLayout from '../../components/layout/BaseLayout'
import Pagination from '../../components/Pagination/Pagination'
import BaseListItem, { ItemProps } from '../../components/listItem/BaseListItem'
import SectionTitle from '../../components/header/SectionTitle'
import EmptyArticle from '../../components/empty/EmptyArticle'
import BaseLoading from '../../components/loadings/BaseLoading'
import usePagination from '../../hooks/usePagination'
import UseLikedArticleList from '../../hooks/useGetLikedArticleList'

const pageSize = 10

const Liked = () => {
  const [articleList, loading] = UseLikedArticleList()
  const { list, currentPage, goToNextPage, goToPreviousPage, goToPage } = usePagination(articleList, pageSize)
  return (
    <BaseLayout>
      <div className='pt-2'>
        <SectionTitle title='Liked' description='Articles you liked.' />
        {!loading ? (<div>
            {list.length ? (
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
            ) : (
              <div className='bg-white py-36 rounded m-2'>
                <EmptyArticle />
              </div>
            )}
          </div>
        ) : (
          <BaseLoading />
        )}
      </div>
    </BaseLayout>
  )
}
export default Liked
