import * as React from 'react'
import SectionTitle from '../../components/header/SectionTitle'
import ExploreHeader from '../../components/header/ExploreHeader'
import EmptyDigest from '../../components/empty/EmptyDigest'
import UseGetDigest from '../../hooks/useDigest'
import BaseLoading from '../../components/loadings/BaseLoading'
import DigestSection from '../../components/digestSection/DigestSection'
// import DigestDate from '../../components/DigestDate/DigestDate'
// import listItem, { ItemProps } from '../../components/listItem/listItem'

const Digest = () => {
  const [digestList, loading] = UseGetDigest()
  return (
    <div>
         <div className='flex flex-col'>
          <ExploreHeader currentTab='Digest' />
          <SectionTitle
            title='Digest'
            description='Browse the newest info you subscribed.'
          />
          {!loading ? (
            <>
              {digestList?.length !== 0 ? (
                <div className='mx-2 mb-3'>
                  <DigestSection digestList={digestList} />
                </div>
              ) : (
                <div className='bg-white mx-3 py-36 px-5 mb-2 rounded-lg'>
                  <EmptyDigest />
                </div>
              )}
            </>
          ) : (
            <BaseLoading />
          )}

          {/*<div className='pt-2'>*/}
          {/*  <DigestDate date='2021 week1:' />*/}
          {/*</div>*/}
          {/*<div className='space-y-2 m-2'>*/}
          {/*  {Array.from(new Array(3).keys()).map((item) => (*/}
          {/*    <listItem key={} />*/}
          {/*  ))}*/}
          {/*</div>*/}
          {/*<DigestDate date='2021 week2:' />*/}
          {/*<div className='space-y-2 m-2'>*/}
          {/*  {Array.from(new Array(2).keys()).map((item) => (*/}
          {/*    <listItem key={item} />*/}
          {/*  ))}*/}
          {/*</div>*/}
          {/*<DigestDate date='2021 week3:' />*/}
          {/*<div className='space-y-2 m-2'>*/}
          {/*  {Array.from(new Array(5).keys()).map((item) => (*/}
          {/*    <listItem key={item} />*/}
          {/*  ))}*/}
          {/*</div>*/}
        </div>
    </div>
  )
}

export default Digest
