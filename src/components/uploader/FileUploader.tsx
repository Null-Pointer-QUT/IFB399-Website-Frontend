import * as React from 'react'
import { useEffect, useState } from 'react'

import useArrayBufferFileReader from '../../hooks/useArrayBufferFileReader'
import UseUploadFile from '../../hooks/useUploadFile'
import { SunIcon, UploadIcon, XCircleIcon } from '@heroicons/react/outline'
import doc from '../../static/file_types/doc.png'
import excel from '../../static/file_types/excel.png'
import ppt from '../../static/file_types/ppt.png'
import pdf from '../../static/file_types/pdf.png'
import zip from '../../static/file_types/zip.png'
import md from '../../static/file_types/md.png'
import video from '../../static/file_types/video.png'

import defFile from '../../static/file_types/file.png'


const accept = 'image/*, audio/*, video/*, .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .md, .zip, .rar, .7zip, .tar'

const FileUploader = ({ onUpload, onDel, title }: { onUpload: Function, onDel: Function, title?: string|undefined|null }) => {
  const {
    fileContent,
    setFileContent,
    fileName,
    fileType,
    isReading,
    error,
    trigger,
  } = useArrayBufferFileReader(accept)
  const fileReadied: boolean = fileContent !== null && !isReading && error === null
  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const [isUploading] = UseUploadFile(fileReadied, fileContent, fileName, fileUrl, setFileUrl)
  const showRes = !isUploading && !isUploading && fileUrl !== null
  const showLoading = isUploading || isUploading
  const showIcon = !showRes && !showLoading
  const isType = (type: string) => {
    return fileName.indexOf(`.${type}`) !== -1
  }
  let showName = fileName?.split('_').slice(1).join('')

  const showFileIcon = () => {
    if (fileType?.indexOf('image') !== -1) {
      return <img className='object-contain h-16 md:h-20' src={fileUrl!} alt='#' />
    } else if (isType('doc') || isType('docx')) {
      return <img className='object-contain h-16 md:h-20' src={doc} alt='#' />
    } else if (isType('pdf')) {
      return <img className='object-contain h-16 md:h-20' src={pdf} alt='#' />
    } else if (isType('zip')) {
      return <img className='object-contain h-16 md:h-20' src={zip} alt='#' />
    } else if (isType('xls') || isType('xlsx')) {
      return <img className='object-contain h-16 md:h-20' src={excel} alt='#' />
    } else if (isType('ppt') || isType('pptx')) {
      return <img className='object-contain h-16 md:h-20' src={ppt} alt='#' />
    } else if (isType('mp4')) {
      return <img className='object-contain h-16 md:h-20' src={video} alt='#' />
    } else if (isType('md')) {
      return <img className='object-contain h-16 md:h-20' src={md} alt='#' />
    } else {
      return <img className='object-contain h-16 md:h-20' src={defFile} alt='#' />
    }
  }
  const handleDel = (e: React.MouseEvent) => {
    e.stopPropagation()
    setFileContent(null)
    setFileUrl(null)
    onDel()
  }

  useEffect(() => {
    if (fileUrl) {
      onUpload(fileUrl)
    }
    // eslint-disable-next-line
  }, [fileUrl])

  return (
    <div
      className='h-20 md:h-28 flex flex-col flex-1 w-full h-full relative group border rounded-md bg-gray-100 flex flex-col items-center justify-center hover:bg-gray-200'
      onClick={trigger}
    >
      <div className='flex flex-col items-center justify-center'>
        <>
          {showLoading && <SunIcon className='animate-spin h-10 w-10 text-gray-700' />}
          {showIcon && (
            <>
              <UploadIcon className='h-10 w-10 text-gray-700 group-hover:text-gray-900' />
              <div className='text-gray-900 group-hover:text-gray-900'>
                {title || 'Attachment'}
              </div>
            </>)
          }
          {showRes && (
            <div className='flex flex-col justify-center items-center'>
              {showFileIcon()}
              <XCircleIcon
                className='absolute w-6 h-6 right-2 top-2 text-gray-600 hover:text-gray-900'
                onClick={handleDel}
              />
              <div className='most-line-1 px-2'>{showName}</div>
            </div>
          )}
        </>
      </div>
    </div>
  )
}
export default FileUploader
