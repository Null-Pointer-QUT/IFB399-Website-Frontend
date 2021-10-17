import React, { useRef, useState } from 'react'

export type Result = {
  fileContent: ArrayBuffer | null
  setFileContent: (newVal: ArrayBuffer | null) => void
  fileName: string
  fileType: string
  isReading: boolean
  error: any
  trigger: () => void
}

const createFileInput = (accept: string = '') => {
  const fileInput = document.createElement('input')
  fileInput.type = 'file'
  if (accept) fileInput.accept = accept
  return fileInput
}

const useArrayBufferFileReader = (accept: string = ''): Result => {
  const [fileContent, setFileContent] = useState<ArrayBuffer | null>(null)
  const [fileName, setFileName] = useState<string | null>()
  const [isReading, setIsReading] = useState<boolean>(false)
  const [error, setError] = useState<any>(null)
  const [fileType, setFileType] = useState<null | string>(null)

  const fileInputRef = useRef<HTMLInputElement>(createFileInput(accept))

  // @ts-ignore
  fileInputRef.current.onchange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileContent(null)
    setError(null)
    setIsReading(true)
    try {
      const files = e.target.files
      if (files) {
        const file = files[0]
        setFileName(`${new Date().getTime()}_${file.name}`)
        setFileType(file.type)
        const reader = new FileReader()
        reader.readAsArrayBuffer(file)
        reader.onload = function(e) {
          setFileContent(e.target!.result as ArrayBuffer)
        }
      }
    } catch (error) {
      setError(error)
    } finally {
      setIsReading(false)
    }
  }

  const trigger = () => {
    fileInputRef.current.click()
  }

  return {
    fileContent,
    setFileContent,
    fileName,
    isReading,
    error,
    trigger,
    fileType,
  } as Result
}

export default useArrayBufferFileReader

