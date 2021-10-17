import * as React from 'react'
import { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { SearchIcon } from '@heroicons/react/solid'

import BaseLayout from '../../components/layout/BaseLayout'
import BaseListItem, { ItemProps } from '../../components/listItem/BaseListItem'
import UseGetSearchResultList from '../../hooks/useGetSearchResultList'
import ExploreHeader from '../../components/header/ExploreHeader'
import EmptySearch from '../../components/empty/EmptySearch'
import BaseLoading from '../../components/loadings/BaseLoading'
import FileListItem, { FileItemProps } from '../../components/listItem/FileListItem'

const Search = () => {
  const location = useLocation()
  const history = useHistory()
  const params = new URLSearchParams(location.search)
  const keyword_ = params.get('keyword') || ''
  const isSearchFile_ = params.get('isSearchFile') === 'true'
  const [keyword, setKeyword] = useState<string | undefined>(keyword_)
  const [articleList, isFile, loading] = UseGetSearchResultList(keyword_, isSearchFile_)

  const searchHistory_raw = localStorage.getItem('searchHistory')
  const searchHistory = searchHistory_raw ? JSON.parse(searchHistory_raw) : []

  const addToHistory = (keyword: string) => {
    if (searchHistory.indexOf(keyword) === -1) {
      searchHistory.push(keyword)
    }
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory.slice(-5)))
  }

  const handleSearch = (keyword: string | null | undefined, isSearchFile: boolean) => {
    if (keyword) {
      addToHistory(keyword as string)
    }
    if (keyword !== keyword_ || isSearchFile !== isSearchFile_) {
      const params = new URLSearchParams()
      params.set('keyword', keyword as string)
      params.set('isSearchFile', isSearchFile.toString())
      history.push({
        pathname: '/explore/search',
        search: `?` + params.toString(),
      })
    } else {
      window.location.reload()
    }
  }

  useEffect(() => {
    setKeyword(keyword_)
  }, [keyword_])

  return (
    <div>
      <BaseLayout>
        <>
          <ExploreHeader currentTab='Search' />
          <div className='px-2 pb-2 block sm:flex items-center justify-center'>
            <div className='relative w-full'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <SearchIcon
                  className='h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
              </div>
              <input
                type='text'
                className='block shadow-sm w-full pl-10 sm:border-gray-300 rounded-md focus:ring-brand focus:border-brand'
                // placeholder='Input your keywords'
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value)
                }}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch(keyword, false)
                  }
                }}
              />
            </div>

            <div className='grid grid-cols-2 gap-x-2 sm:flex items-center justify-center py-2 sm:py-0 sm:pl-2 '>
              <div className='w-full sm:w-36 flex-shrink-0 '>
                <button
                  className='btn-secondary'
                  onClick={() => {
                    handleSearch(keyword, true)
                  }}
                >
                  Search File
                </button>
              </div>

              <div className='w-full sm:w-36'>
                <button
                  className='btn-primary'
                  onClick={() => {
                    handleSearch(keyword, false)
                  }}
                >
                  Search Article
                </button>
              </div>
            </div>
          </div>
          {searchHistory.length > 0 && (
            <div className='mx-3 flex space-x-2 pb-3 sm:pb-2 sm:py-1 '>
              <div className='text-gray-600'>
                History:
              </div>
              <div className='space-x-1'>
                {searchHistory.map((keyword: string) => (
                  <span
                    key={keyword}
                    className='cursor-pointer inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600'
                    onClick={() => {
                      setKeyword(keyword)
                    }}
                  >
                   {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          {keyword_ && (
            <div className='mx-2'>
              <div
                className='block sm:flex sm:space-x-4 py-2 px-2 text-xl w-full items-center text-gray-900 bg-white rounded'>
                <p> Keyword: {keyword_}</p>
                <p className='text-lg text-gray-500'>Type: {isSearchFile_ ? 'File' : 'Article'}</p>
              </div>
            </div>
          )}
          {(!loading && articleList && !isFile) && (
            <div className='space-y-2 m-2'>
              {articleList.map((item: ItemProps) => (
                <BaseListItem key={item.articleId} item={item} />
              ))}
            </div>
          )}
          {(!loading && articleList && isFile) && (
            <div className='space-y-2 m-2'>
              {articleList.map((item: FileItemProps, index: number) => (
                <div key={index}>
                  <FileListItem item={item} />
                  {index !== articleList.length - 1 && <div className='mt-5 border-t border-gray-200' />}
                </div>
              ))}
            </div>
          )}

          {(!loading && (articleList?.length === 0 || !articleList)) && (
            <div className='bg-white mx-2 py-36 px-5 mb-2 rounded '>
              <EmptySearch />
            </div>
          )}

          {loading && <BaseLoading />}
        </>
      </BaseLayout>
    </div>
  )
}
export default Search
