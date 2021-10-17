import * as React from 'react'
import { useEffect, useState } from 'react'
import { SunIcon, XCircleIcon, UploadIcon } from '@heroicons/react/outline'
import useArrayBufferFileReader from '../../hooks/useArrayBufferFileReader'
import { mcPutOneObj } from '../../utils/mc'
import { arrayBufferToBase64 } from '../../utils/utils'

interface SingleImageUploaderProps {
  title: string
  icon?: React.ReactElement
  acceptType?: string
  onUpload?: (success: boolean, url: string) => void
  onDelete?: () => void
  className?: string
}

const SingleOneObjUploader = (
  {
    title,
    icon,
    acceptType,
    onUpload,
    onDelete,
    className,
  }: SingleImageUploaderProps) => {
  const { fileContent, setFileContent, fileName, isReading, error, trigger } = useArrayBufferFileReader(acceptType)
  const [isUploading, setIsUploading] = useState(false)
  const [base64Content, setBase64Content] = useState<string | null>()
  const showLoading = (isReading || isUploading) && !error
  const showIcon = !showLoading && !base64Content

  useEffect(() => {
    const upload = async () => {
      if (fileContent && !isReading && !error) {
        setBase64Content(null)
        setIsUploading(true)
        try {
          const { success, url } = await mcPutOneObj(fileName, Buffer.from(fileContent))
          if (success) {
            setBase64Content(arrayBufferToBase64(fileContent as ArrayBuffer))
          }
          if (onUpload) {
            onUpload(success, url as string)
          }
        } catch (e) {
          console.log(e)
        } finally {
          setIsUploading(false)
        }
      }
    }
    upload()
  }, [error, fileContent, fileName, isReading, onUpload])

  const handleDel = (e: React.MouseEvent) => {
    e.stopPropagation()
    setBase64Content(null)
    setFileContent(null)
    if (onDelete) {
      onDelete()
    }
  }

  return (
    <div
      className='flex flex-col flex-1 w-full relative group border rounded-md bg-gray-100 flex flex-col items-center justify-center hover:bg-gray-200'
      onClick={trigger}
    >
      <div className='flex flex-col items-center justify-center'>
        {(showIcon && !icon) && (
          <UploadIcon className='h-10 w-10 text-gray-700 group-hover:text-gray-900' />
        )}
        {(showIcon && icon) && icon}
        {showLoading && <SunIcon className='animate-spin h-10 w-10 text-gray-700' />}
        {base64Content && (
          <div>
            <img
              className={`${className} object-cover overflow-hidden object-center`}
              src={`data:image/jpeg;base64,${base64Content}`}
              alt='#'
            />
            <XCircleIcon
              className='absolute w-6 h-6 sm:w-10 sm:h-10 right-2 top-2 text-gray-600 hover:text-gray-900'
              onClick={handleDel}
            />
          </div>
        )}
        {!base64Content && (
          <div className='text-gray-900 group-hover:text-gray-900'>
            {title}
          </div>
        )}
      </div>
    </div>
  )
}
export default SingleOneObjUploader
