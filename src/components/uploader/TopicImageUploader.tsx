import * as React from 'react'
import { useEffect, useState } from 'react'
import { SunIcon, UploadIcon } from '@heroicons/react/outline'
import useArrayBufferFileReader from '../../hooks/useArrayBufferFileReader'
import { mcPutOneObj } from '../../utils/mc'

interface ImageUploaderProps {
  imgUrl: string
  setImgUrl: (url: string) => void
  onSuccess: (url: string) => void
}


const TopicImageUploader = ({ imgUrl, setImgUrl, onSuccess }: ImageUploaderProps) => {
  const { fileContent, fileName, isReading, error, trigger } = useArrayBufferFileReader('image/*')
  const [isUploading, setIsUploading] = useState(false)
  const showLoading = (isReading || isUploading) && !error
  const showIcon = !showLoading && !imgUrl

  useEffect(() => {
    const upload = async () => {
      if (fileContent && !isReading && !error) {
        setIsUploading(true)
        try {
          const { success, url } = await mcPutOneObj(fileName, Buffer.from(fileContent))
          if (success) {
            setImgUrl(url as string)
            onSuccess(url!)
          }
        } catch (e) {
          console.log(e)
        } finally {
          setIsUploading(false)
        }
      }
    }
    upload()
    // eslint-disable-next-line
  }, [error, fileContent, fileName, isReading])


  return (
    <div
      className='flex flex-col flex-1 w-16 h-16 relative group border rounded-md bg-gray-100 flex flex-col items-center justify-center hover:bg-gray-200 rounded-full'
      onClick={trigger}
    >
      <div className='flex flex-col items-center justify-center'>
        {showIcon && (
          <UploadIcon className='h-8 w-8 text-gray-700 group-hover:text-gray-900' />
        )}
        {showLoading && <SunIcon className='animate-spin h-10 w-10 text-gray-700' />}
        {imgUrl && (
          <div>
            <img
              className='object-center rounded-full w-16 h-16'
              src={imgUrl}
              alt='#'
            />
          </div>
        )}
      </div>
    </div>
  )
}
export default TopicImageUploader
