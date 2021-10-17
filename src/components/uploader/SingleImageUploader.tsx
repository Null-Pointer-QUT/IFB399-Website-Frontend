import * as React from 'react'
import { useEffect, useState } from 'react'
import { SunIcon, XCircleIcon, UploadIcon } from '@heroicons/react/outline'
import useArrayBufferFileReader from '../../hooks/useArrayBufferFileReader'
import { mcPutOneObj } from '../../utils/mc'

interface SingleImageUploaderProps {
  text: string
  imgUrl: string
  setImgUrl: (url: string) => void
}

const SingleImageUploader = ({ text, imgUrl, setImgUrl }: SingleImageUploaderProps) => {
  const { fileContent, setFileContent, fileName, isReading, error, trigger } = useArrayBufferFileReader('image/*')
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
          }
        } catch (e) {
          console.log(e)
        } finally {
          setIsUploading(false)
        }
      }
    }
    upload()
  }, [error, fileContent, fileName, isReading, setImgUrl])

  const handleDel = (e: React.MouseEvent) => {
    e.stopPropagation()
    setFileContent(null)
    setImgUrl('')
  }

  return (
    <div
      className='flex flex-col flex-1 w-full relative group border rounded-md bg-gray-100 flex flex-col items-center justify-center hover:bg-gray-200'
      onClick={trigger}
    >
      <div className='flex flex-col items-center justify-center'>
        {showIcon && (
          <UploadIcon className='h-10 w-10 text-gray-700 group-hover:text-gray-900' />
        )}
        {showLoading && <SunIcon className='animate-spin h-10 w-10 text-gray-700' />}
        {imgUrl && (
          <div>
            <img
              className={`object-cover overflow-hidden object-center`}
              src={imgUrl}
              alt='#'
            />
            <XCircleIcon
              className='absolute w-6 h-6 sm:w-10 sm:h-10 right-2 top-2 text-gray-600 hover:text-gray-900'
              onClick={handleDel}
            />
          </div>
        )}
        {!imgUrl && (
          <div className='text-gray-900 group-hover:text-gray-900'>
            {text}
          </div>
        )}
      </div>
    </div>
  )
}
export default SingleImageUploader
