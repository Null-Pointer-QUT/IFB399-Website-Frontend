import BaseTab from '../navigations/BaseTab'
import SimpleDropdown from '../dropDowns/SimpleDropdown'
import * as React from 'react'

interface ExploreHeaderProps {
  showClasifation?: boolean
  currentTab: 'Explore' | 'Digest' | 'Subscription' | 'Search'
}

const ExploreHeader = ({ showClasifation, currentTab }: ExploreHeaderProps) => {
  return (
    <div className='p-2 bg-white mb-2'>
      <div className='flex justify-between items-center space-x-1'>
        <BaseTab currentTab={currentTab} />
        {showClasifation && (
          <div className='flex space-x-1 items-center'>
            <div className='text-gray-700 hidden sm:block pr-1'>Topic:</div>
            <SimpleDropdown />
          </div>
        )}
      </div>
    </div>
  )
}
export default ExploreHeader
