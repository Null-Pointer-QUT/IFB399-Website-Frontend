import * as React from 'react'
import { useEffect, useState } from 'react'
import FileUploader from './FileUploader'

interface FileItem {
  id: string
  url: string
  isUploaded: boolean

}

interface MultiFileUploaderProps {
  setFileUrl: (val: string[] | null) => void
  maxFileNum: number
  title?: string
}

export default function MultiFileUploader({ setFileUrl, maxFileNum, title }: MultiFileUploaderProps) {
  const [fileList, setFileList] = useState<FileItem[]>([])
  if ([...fileList].pop()?.isUploaded !== false && fileList.length < maxFileNum) {
    setFileList([...fileList, {
      id: new Date().toISOString(),
      url: '',
      isUploaded: false,
    }])
  }

  function setUpload(index: number, url: string) {
    const newList = [...fileList]
    newList[index].url = url
    newList[index].isUploaded = true
    setFileList(newList)
  }

  function setDel(index: number) {
    const newList = [...fileList]
    newList.splice(index, 1)
    setFileList(newList)
  }

  useEffect(() => {
    const fileUrlList = fileList.map((f) => f.url)
    //remove empty and de-duplication
    const cleanFileUrlList = Array.from(new Set(fileUrlList.filter(Boolean))) as string[]
    setFileUrl(cleanFileUrlList)
    // eslint-disable-next-line
  }, [fileList])

  return (
    <>
      {fileList.map((fileItem, index) => (
        <FileUploader
          key={fileItem.id}
          title={title}
          onUpload={
            (url: string) => {
              setUpload(index, url)
            }
          }
          onDel={
            () => {
              setDel(index)
            }
          }
        />
      ))}
    </>
  )
}
