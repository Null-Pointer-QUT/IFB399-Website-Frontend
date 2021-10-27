import * as React from 'react'
import SectionTitle from '../../components/header/SectionTitle'
import Pagination from '../../components/Pagination/Pagination'
import EmptyArticle from '../../components/empty/EmptyArticle'
import BaseLoading from '../../components/loadings/BaseLoading'
import usePagination from '../../hooks/usePagination'
import UseMydArticleList from '../../hooks/useGetMyArticleList'
import EditListItem from '../../components/listItem/EditListItem'

const pageSize = 10


const MyArticle = () => {
  const [articleList, loading] = UseMydArticleList(true)
  const { list, currentPage, goToNextPage, goToPreviousPage, goToPage } = usePagination(articleList, pageSize)

  return (
      <div className='pt-2'>
        <SectionTitle title='My Article' description='Articles you uploaded.' />
        {!loading ? (
          <div>
            {list.length ? (
              <div>
                <div className='space-y-2 m-2'>
                  {/* @ts-ignore*/}
                  {list.map((item: ItemProps) => (
                    <EditListItem key={item.articleId} item={item} />
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
  )
}

export default MyArticle
