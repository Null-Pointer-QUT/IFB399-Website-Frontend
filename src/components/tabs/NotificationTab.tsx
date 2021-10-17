import * as React from 'react'
import { classNames } from '../../utils/utils'


export default function NotificationTab(params: { tabs: any[], currentTab: number, setCurrentTab: Function }) {
  const { tabs, currentTab, setCurrentTab } = params
  return (
    <div>
      <div className='sm:hidden'>
        <label htmlFor='tabs' className='sr-only'>
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id='tabs'
          name='tabs'
          className='block w-full focus:ring-brand focus:border-brand border-gray-300 rounded-md'
          defaultValue={tabs[currentTab]?.name}
          onChange={(e) => {
            setCurrentTab(tabs.findIndex((tab) => tab.name === e.target.value))
          }}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className='hidden sm:block'>
        <div className='border-b border-gray-200'>
          <nav className='-mb-px flex space-x-8' aria-label='Tabs'>
            {tabs.map((tab, index) => (
              <button
                onClick={() => {
                  setCurrentTab(index)
                }}
                key={tab.name}
                className={classNames(
                  index === currentTab
                    ? 'border-brand text-brand-dark'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm',
                )}
                aria-current={index === currentTab ? 'page' : undefined}
              >
                <tab.icon
                  className={classNames(
                    index === currentTab ? 'text-brand' : 'text-gray-400 group-hover:text-gray-500',
                    '-ml-0.5 mr-2 h-5 w-5',
                  )}
                  aria-hidden='true'
                />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
