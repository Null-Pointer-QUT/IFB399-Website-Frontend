import * as React from 'react'
import { useEffect, useState } from 'react'

import UseGetUserInfo from '../../hooks/useGetUserInfo'
import { changeUserInfo, userLogout } from '../../service/commonApi'
import AvatarUploader from '../../components/uploader/AvatarUploader'

const Profile = () => {
  const [userInfo] = UseGetUserInfo()
  const [modified, setModified] = useState({
    about: { modified: false, data: '' },
    name: { modified: false, data: '' },
    organization: { modified: false, data: '' },
    password: { modified: false, data: '', data_: '' },
  })

  const [avatarUrl, setAvatarUrl] = useState(userInfo?.avatar)
  const isPasswordMatch = modified.password.data === modified.password.data_
  const enableSave = modified.about.modified || modified.name.modified || modified.organization.modified || modified.password.modified

  const handleSave = async () => {
    for (let key in modified) {
      if ((modified as any)[key].modified) {
        if (!(modified as any)[key].data) return
        if (key === 'password' && !isPasswordMatch) return
        await changeUserInfo({ key, value: (modified as any)[key].data })
        if (key === 'password')  await userLogout()
        window.location.reload()
      }
    }
  }

  useEffect(() => {
    const updateAvatar = async () => {
      if (userInfo) {
        setAvatarUrl(userInfo.avatar)
        if (avatarUrl && avatarUrl !== userInfo.avatar) {
          try {
            const { success } = await changeUserInfo({ key: 'avatar', value: avatarUrl })
            if (success) {
              localStorage.setItem('userAvatar', avatarUrl)
              window.location.reload()
            }
          } catch (e) {
            console.log(e)
          }
        }
      }
    }
    updateAvatar()
  }, [avatarUrl, userInfo])

  return (
      <div className='divide-y divide-gray-200 lg:col-span-9'>
        <div className='py-6 px-4 sm:p-6 lg:pb-8'>
          <div>
            <h2 className='text-lg leading-6 font-medium text-gray-900'>Profile</h2>
            <p className='mt-1 text-sm text-gray-500'>
              This information will be displayed publicly so be careful what you share.
            </p>
          </div>

          <div className='mt-6 flex flex-col lg:flex-row'>
            <div className='flex-grow space-y-6'>
              <div>
                <label htmlFor='username' className='block text-sm font-medium text-gray-700'>
                  Username
                </label>
                <div className='mt-1 rounded-md shadow-sm flex'>
                    <span
                      className='bg-gray-50 border border-r-0 border-gray-300 rounded-l-md px-3 inline-flex items-center text-gray-500 sm:text-sm cursor-not-allowed'>
                     nullpointer.com/user/
                    </span>
                  <input
                    disabled
                    type='text'
                    name='username'
                    className='focus:ring-sky-500 focus:border-sky-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300 cursor-not-allowed focus:outline-none focus:ring-brand-light focus:ring-brand-light'
                    defaultValue={userInfo?.name}
                  />
                </div>
              </div>
              <div>
                <label htmlFor='username' className='block text-sm font-medium text-gray-700'>
                  Email
                </label>
                <div className='mt-1 rounded-md shadow-sm flex'>
                  <input
                    disabled
                    type='email'
                    name='email'
                    autoComplete='email'
                    className='focus:ring-sky-500 focus:border-sky-500 flex-grow block w-full min-w-0 rounded-none rounded-md sm:text-sm border-gray-300 cursor-not-allowed focus:outline-none focus:ring-brand-light focus:ring-brand-light'
                    defaultValue={userInfo?.email}
                  />
                </div>
              </div>

              <div>
                <label htmlFor='about' className='block text-sm font-medium text-gray-700'>
                  About
                </label>
                <div className='mt-1'>
                  <textarea
                    id='about'
                    name='about'
                    rows={3}
                    className='shadow-sm focus:ring-sky-500 focus:border-sky-500 mt-1 block w-full sm:text-sm border
                    border-gray-300 rounded-md focus:outline-none focus:ring-brand-light focus:ring-brand-light'
                    defaultValue={userInfo?.about}
                    onChange={(e) => {
                      const newAbout = { modified: true, data: e.target.value }
                      setModified((val) => ({ ...val, about: newAbout }))
                    }}
                  />
                </div>
                <p className='mt-2 text-sm text-gray-500'>
                  Brief description for your profile. URLs are hyperlinked.
                </p>
              </div>
            </div>

            <div className='mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0'>
              <p className='text-sm font-medium text-gray-700' aria-hidden='true'>
                Photo
              </p>
              <AvatarUploader avatarUrl={avatarUrl} setAvatarUrl={setAvatarUrl} />
            </div>
          </div>

          <div className='mt-6 grid grid-cols-12 gap-6'>
            <div className='col-span-12 sm:col-span-6'>
              <label htmlFor='first-name' className='block text-sm font-medium text-gray-700'>
                Name
              </label>
              <input
                type='text'
                name='name'
                autoComplete='given-name'
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-sky-500 focus:border-sky-500 sm:text-sm focus:outline-none focus:ring-brand-light focus:ring-brand-light'
                defaultValue={userInfo?.name}
                onChange={(e) => {
                  const newVal = { modified: true, data: e.target.value }
                  setModified((val) => ({ ...val, name: newVal }))
                }}
              />
            </div>

            <div className='col-span-12 sm:col-span-6'>
              <label htmlFor='organization' className='block text-sm font-medium text-gray-700'>
                Organization
              </label>
              <input
                type='text'
                name='organization'
                autoComplete='organization'
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm focus:outline-none focus:ring-brand-light focus:ring-brand-light'
                defaultValue={userInfo?.organization}
                onChange={(e) => {
                  const newVal = { modified: true, data: e.target.value }
                  setModified((val) => ({ ...val, organization: newVal }))
                }}
              />
            </div>
            <form className='col-span-12 sm:col-span-6'>
              <label htmlFor='last-name' className='block text-sm font-medium text-gray-700'>
                Password
              </label>
              <input
                type='password'
                name='password'
                id='password'
                autoComplete='new-password'
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm focus:outline-none focus:ring-brand-light focus:ring-brand-light'
                onChange={(e) => {
                  setModified((val) => {
                    const newVal = { modified: true, data: e.target.value, data_: val.password.data_ }
                    return { ...val, password: newVal }
                  })
                }}
              />
            </form>

            <form className='col-span-12 sm:col-span-6' hidden={!modified.password.modified}>
              <label htmlFor='last-name' className='block text-sm font-medium text-gray-700'>
                Confirm Password
              </label>
              <input
                type='password'
                name='password_'
                id='password_'
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm focus:outline-none focus:ring-brand-light focus:ring-brand-light'
                autoComplete='new-password'
                onChange={(e) => {
                  setModified((val) => {
                    const newVal = { modified: true, data_: e.target.value, data: val.password.data }
                    return { ...val, password: newVal }
                  })
                }}
              />
            </form>

          </div>
          <div className='pt-6 flex justify-center'>
            {enableSave ? (
              <button
                className='btn-primary w-full'
                onClick={handleSave}
              >
                Save
              </button>
            ) : (
              <button
                className='btn-disable'
                disabled
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
  )
}

export default Profile
