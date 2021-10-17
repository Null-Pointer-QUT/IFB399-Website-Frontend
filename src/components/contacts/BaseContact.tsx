import { MailIcon, PhoneIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { uploadFeedBack } from '../../service/commonApi'
import { useModelContext } from '../../context/ModelContext'
import { inputIncorrectConfig, ModalConfig, uploadFeedbackSuccessConfig } from '../../utils/modalConfig'

const BaseContact = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const { dispatch: modelDispatch } = useModelContext()
  const openModel = (config: ModalConfig) => {
    modelDispatch({ type: 'OPEN', config })
  }

  const handleSubmit = async () => {
    if (firstName && lastName && email && subject && message) {
      const { success } = await uploadFeedBack({ firstName, lastName, email, phone, subject, message })
      if (success) {
        openModel(uploadFeedbackSuccessConfig)
      }
    } else {
      openModel(inputIncorrectConfig)
    }
  }

  return (
    <div className='bg-gray-100'>
      <div className='max-w-7xl mx-auto'>
        <div className='relative bg-white shadow-xl'>
          <h2 className='sr-only'>Contact us</h2>
          <div className='grid grid-cols-1 lg:grid-cols-3'>
            {/* Contact information */}
            <div className='relative overflow-hidden py-10 px-6 bg-brand-dark sm:px-10 xl:p-12'>
              <div className='absolute inset-0 pointer-events-none sm:hidden' aria-hidden='true'>
                <svg
                  className='absolute inset-0 w-full h-full'
                  width={343}
                  height={388}
                  viewBox='0 0 343 388'
                  fill='none'
                  preserveAspectRatio='xMidYMid slice'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M-99 461.107L608.107-246l707.103 707.107-707.103 707.103L-99 461.107z'
                    fill='url(#linear1)'
                    fillOpacity='.1'
                  />
                  <defs>
                    <linearGradient
                      id='linear1'
                      x1='254.553'
                      y1='107.554'
                      x2='961.66'
                      y2='814.66'
                      gradientUnits='userSpaceOnUse'
                    >
                      <stop stopColor='#fff' />
                      <stop offset={1} stopColor='#fff' stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div
                className='hidden absolute top-0 right-0 bottom-0 w-1/2 pointer-events-none sm:block lg:hidden'
                aria-hidden='true'
              >
                <svg
                  className='absolute inset-0 w-full h-full'
                  width={359}
                  height={339}
                  viewBox='0 0 359 339'
                  fill='none'
                  preserveAspectRatio='xMidYMid slice'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M-161 382.107L546.107-325l707.103 707.107-707.103 707.103L-161 382.107z'
                    fill='url(#linear2)'
                    fillOpacity='.1'
                  />
                  <defs>
                    <linearGradient
                      id='linear2'
                      x1='192.553'
                      y1='28.553'
                      x2='899.66'
                      y2='735.66'
                      gradientUnits='userSpaceOnUse'
                    >
                      <stop stopColor='#fff' />
                      <stop offset={1} stopColor='#fff' stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div
                className='hidden absolute top-0 right-0 bottom-0 w-1/2 pointer-events-none lg:block'
                aria-hidden='true'
              >
                <svg
                  className='absolute inset-0 w-full h-full'
                  width={160}
                  height={678}
                  viewBox='0 0 160 678'
                  fill='none'
                  preserveAspectRatio='xMidYMid slice'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M-161 679.107L546.107-28l707.103 707.107-707.103 707.103L-161 679.107z'
                    fill='url(#linear3)'
                    fillOpacity='.1'
                  />
                  <defs>
                    <linearGradient
                      id='linear3'
                      x1='192.553'
                      y1='325.553'
                      x2='899.66'
                      y2='1032.66'
                      gradientUnits='userSpaceOnUse'
                    >
                      <stop stopColor='#fff' />
                      <stop offset={1} stopColor='#fff' stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h3 className='text-lg font-medium text-white'>Contact information</h3>
              <p className='mt-6 text-base text-indigo-50 max-w-3xl'>
                This website was written by Team Null Pointer members during the QUT IFB398 & IFB399 course.
                If you have any questions, please contact us.
              </p>
              <dl className='mt-8 space-y-6'>
                <dt>
                  <span className='sr-only'>Phone number</span>
                </dt>
                <dd className='flex text-base text-indigo-50'>
                  <PhoneIcon className='flex-shrink-0 w-6 h-6 text-indigo-200' aria-hidden='true' />
                  <span className='ml-3'>+86 15651971318</span>
                </dd>
                <dt>
                  <span className='sr-only'>Email</span>
                </dt>
                <dd className='flex text-base text-indigo-50'>
                  <MailIcon className='flex-shrink-0 w-6 h-6 text-indigo-200' aria-hidden='true' />
                  <span className='ml-3'>n10889426@qut.edu.au</span>
                </dd>
              </dl>
              <div role='list' className='mt-8 flex space-x-12'>
                <div>
                  <a className='text-indigo-200 hover:text-indigo-100' href='https://github.com/ralph0813/ifb399'>
                    <span className='sr-only'>GitHub</span>
                    <svg
                      width={24}
                      height={24}
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-6 h-6'
                      aria-hidden='true'
                    >
                      <path
                        d='M11.999 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.386.6.11.819-.26.819-.578 0-.284-.01-1.04-.017-2.04-3.337.724-4.042-1.61-4.042-1.61-.545-1.386-1.332-1.755-1.332-1.755-1.09-.744.082-.73.082-.73 1.205.086 1.838 1.238 1.838 1.238 1.07 1.833 2.81 1.304 3.493.996.109-.775.419-1.303.762-1.603C7.145 17 4.343 15.97 4.343 11.373c0-1.31.468-2.382 1.236-3.22-.124-.304-.536-1.524.118-3.176 0 0 1.007-.323 3.3 1.23.956-.266 1.983-.4 3.003-.404 1.02.005 2.046.138 3.005.404 2.29-1.553 3.296-1.23 3.296-1.23.655 1.652.243 2.872.12 3.176.77.838 1.233 1.91 1.233 3.22 0 4.61-2.806 5.624-5.478 5.921.43.37.814 1.103.814 2.223 0 1.603-.015 2.898-.015 3.291 0 .321.217.695.825.578C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12.001-12'
                        fill='currentColor'
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className='py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12'>
              <h3 className='text-lg font-medium text-gray-900'>Send us a message</h3>
              <form action='#' method='POST' className='mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8'>
                <div>
                  <label htmlFor='first-name' className='block text-sm font-medium text-gray-900'>
                    First name
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      name='first-name'
                      id='first-name'
                      autoComplete='given-name'
                      className='py-3 px-4 block w-full shadow-sm text-gray-900 focus:outline-none focus:ring-brand-light focus:ring-brand-light border-gray-300 rounded-md'
                      onChange={(e) => {
                        setFirstName(e.target.value)
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor='last-name' className='block text-sm font-medium text-gray-900'>
                    Last name
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      name='last-name'
                      id='last-name'
                      autoComplete='family-name'
                      className='py-3 px-4 block w-full shadow-sm text-gray-900 focus:outline-none focus:ring-brand-light focus:ring-brand-light border-gray-300 rounded-md'
                      onChange={(e) => {
                        setLastName(e.target.value)
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor='email' className='block text-sm font-medium text-gray-900'>
                    Email
                  </label>
                  <div className='mt-1'>
                    <input
                      id='email'
                      name='email'
                      type='email'
                      autoComplete='email'
                      className='py-3 px-4 block w-full shadow-sm text-gray-900 focus:outline-none focus:ring-brand-light focus:ring-brand-light border-gray-300 rounded-md'
                      onChange={(e) => {
                        setEmail(e.target.value)
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className='flex justify-between'>
                    <label htmlFor='phone' className='block text-sm font-medium text-gray-900'>
                      Phone
                    </label>
                    <span id='phone-optional' className='text-sm text-gray-500'>
                      Optional
                    </span>
                  </div>
                  <div className='mt-1'>
                    <input
                      type='text'
                      name='phone'
                      id='phone'
                      autoComplete='tel'
                      className='py-3 px-4 block w-full shadow-sm text-gray-900 focus:outline-none focus:ring-brand-light focus:ring-brand-light border-gray-300 rounded-md'
                      aria-describedby='phone-optional'
                      onChange={(e) => {
                        setPhone(e.target.value)
                      }}
                    />
                  </div>
                </div>
                <div className='sm:col-span-2'>
                  <label htmlFor='subject' className='block text-sm font-medium text-gray-900'>
                    Subject
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      name='subject'
                      id='subject'
                      className='py-3 px-4 block w-full shadow-sm text-gray-900 focus:outline-none focus:ring-brand-light focus:ring-brand-light border-gray-300 rounded-md'
                      onChange={(e) => {
                        setSubject(e.target.value)
                      }}
                    />
                  </div>
                </div>
                <div className='sm:col-span-2'>
                  <div className='flex justify-between'>
                    <label htmlFor='message' className='block text-sm font-medium text-gray-900'>
                      Message
                    </label>
                    <span id='message-max' className='text-sm text-gray-500'>
                      Max. 500 characters
                    </span>
                  </div>
                  <div className='mt-1'>
                    <textarea
                      id='message'
                      name='message'
                      rows={4}
                      className='py-3 px-4 block w-full shadow-sm text-gray-900 focus:outline-none focus:ring-brand-light focus:ring-brand-light border border-gray-300 rounded-md'
                      aria-describedby='message-max'
                      defaultValue={''}
                      onChange={(e) => {
                        setMessage(e.target.value)
                      }}
                    />
                  </div>
                </div>
                <div className='sm:col-span-2 sm:flex sm:justify-end'>
                  <button
                    type='submit'
                    className='btn-primary'
                    onClick={(e) => {
                      e.preventDefault()
                      handleSubmit()
                    }}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default BaseContact
