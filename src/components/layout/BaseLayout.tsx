import * as React from 'react'
import BaseFooter from '../footers/BaseFooter'
import CreateCenterBox from '../sideColum/CreateCenterBox'
import PersonalCenterBox from '../sideColum/PersonalCenterBox'
import BaseHeader from '../header/BaseHeader'

type Props = {
  children?: JSX.Element
}

const BaseLayout = ({ children }: Props) => {
  return (
    <div className='bg-gray-50 min-h-screen min-h-screen-ios flex flex-col'>
      <BaseHeader />
      <main className='pt-6 h-full flex-1'>
        <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
          <div className='grid grid-cols-1 gap-4 items-start lg:grid-cols-4 lg:gap-4'>
            {/* Left column */}
            <div className='grid grid-cols-1 gap-4 lg:col-span-3'>
              <section aria-labelledby='section-1-title'>
                <div className='rounded-md overflow-hidden shadow h-full'>
                  {children}
                </div>
              </section>
            </div>

            {/* Right column */}
            <div className='grid grid-cols-1 gap-4 sticky top-3'>
              <section aria-labelledby='section-2-title'>
                <div className='space-y-3'>
                  <CreateCenterBox />
                  <PersonalCenterBox />
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <BaseFooter />
    </div>
  )
}

export default BaseLayout
