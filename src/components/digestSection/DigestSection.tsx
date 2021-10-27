import * as React from 'react'
import BaseListItem from '../listItem/BaseListItem'
import EmptyDigestArticle from '../empty/EmptyDigestArticle'

export default function DigestSection(params: { digestList: any[] }) {
  const { digestList } = params
  const newList = digestList ? [...digestList] : []
  return (
    <div className='flex flex-col items-center justify-center'>
      {/* sort */}
      {newList?.sort((first, second) => (second.weekId.localeCompare(first.weekId))).map((weeklyItems) => (
        <div className='bg-white rounded-lg mb-3 px-4 py-2 border w-full' key={weeklyItems.weekId}>
          <div className='font-bold text-2xl text-gray-700 text-center tracking-wide py-2'>{weeklyItems.weekId}</div>
          {weeklyItems?.topics.map((topicItem: any) => (
            <div key={topicItem.topicId}>
              <div
                className='font-medium tracking-wide text-2xl text-gray-700 w-full py-2 space-y-2'>
                {topicItem.topicName}
              </div>
              <div className='space-y-2'>
                {topicItem?.articles && topicItem?.articles.map((article: any) => (
                    <BaseListItem item={article} key={article.articleId} />
                ))}
              </div>
              {topicItem?.articles.length === 0 && (
                <div className='py-5 border rounded-lg'>
                  <EmptyDigestArticle />
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
