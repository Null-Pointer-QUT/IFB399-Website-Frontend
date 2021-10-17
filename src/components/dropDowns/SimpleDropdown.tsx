import * as React from 'react'
import { Fragment, useContext } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { classNames } from '../../utils/utils'
import { tagContext, Topic } from '../../pages/explore/Explore'

type itemType = {
  id: string
  name: string
}


export default function SimpleDropdown() {
  const tagProps = useContext(tagContext)
  const topicList = tagProps.topicList
  const defaultTag = { id: '0', name: 'All' }
  let itemsList: itemType[] = []
  if (topicList) {
    itemsList = (topicList.map((item: Topic) => ({
      id: item.topicId,
      name: item.topicName,
    })))
    itemsList.unshift(defaultTag)
  } else {
    itemsList = [defaultTag]
  }

  return (
    <Listbox
      value={tagProps.topic}
      onChange={
        (value) => {
          // @ts-ignore
          const tag =value.name
          tagProps.setTag(tag)
          window.history.replaceState('','',`?topic=${tag}`)
        }}
    >
      {({ open }) => (
        <>
          <div className='relative w-32'>
            <Listbox.Button
              className='bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand sm:text-sm'>
              <span className='block truncate leading-normal'>{tagProps.topic}</span>
              <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                <SelectorIcon
                  className='h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options
                static
                className='absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'
              >
                {itemsList.map((item) => (
                  <Listbox.Option
                    key={item.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-brand-dark' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-3 pr-9',
                      )
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? 'font-semibold' : 'font-normal',
                            'block truncate',
                          )}
                        >
                          {item.name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-brand-dark',
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                            )}
                          >
                            <CheckIcon className='h-5 w-5' aria-hidden='true' />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
