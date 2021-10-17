import * as React from 'react'
import defaultAvatar from '../../static/aviator/blank_avatar.png'
import useArrayBufferFileReader from '../../hooks/useArrayBufferFileReader'
import { useEffect, useState } from 'react'
import { mcPutOneObj } from '../../utils/mc'
import { SunIcon } from '@heroicons/react/outline'

interface AvatarUploaderProps<T> {
  avatarUrl: T,
  setAvatarUrl: (val: T) => void
}


const AvatarUploader = ({ avatarUrl, setAvatarUrl }: AvatarUploaderProps<string>) => {
  const { fileContent, fileName, isReading, error, trigger } = useArrayBufferFileReader('image/*')
  const [isUploading, setIsUploading] = useState(false)
  const showLoading = (isReading || isUploading) && !error


  useEffect(() => {
    const upload = async () => {
      if (fileContent && !isReading && !error) {
        // setBase64Content(null)
        setIsUploading(true)
        try {
          const { success, url } = await mcPutOneObj(fileName, Buffer.from(fileContent))
          if (success) {
            setAvatarUrl(url as string)
          }
        } catch (e) {
          console.log(e)
        } finally {
          setIsUploading(false)
        }
      }
    }
    upload()
  }, [error, fileContent, fileName, isReading, setAvatarUrl])


  return (
    <div className='relative rounded-full overflow-hidden block w-40 h-40'>
      {showLoading ? (
        <SunIcon className='relative rounded-full w-40 h-40 animate-spin text-gray-700' />
      ) : (
        <img className='relative rounded-full w-40 h-40' src={avatarUrl ? avatarUrl : defaultAvatar} alt='#' />
      )}
      <label
        htmlFor='user-photo'
        className='absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100'
        onClick={trigger}
      >
        <span>Change</span>
      </label>
    </div>
  )
}
export default AvatarUploader
