import { useEffect, useState } from 'react'
import { mcPutOneObj } from '../utils/mc'

const UseUploadFile = (filedReadied: boolean, fileContent: ArrayBuffer | null, fileName: string, fileUrl: string | null, setFileUrl: (val: string | null) => void) => {
  const [isUploading, setIsUploading] = useState(false)
  // const [fileUrl, setFileUrl] = useState<null | string>(null)
  const [err, setErr] = useState<any>(null)

  useEffect(() => {
    const upload = async () => {
      if (filedReadied && fileContent) {
        setIsUploading(true)
        try {
          const { success, url } = await mcPutOneObj(fileName, Buffer.from(fileContent!))
          if (success) {
            setFileUrl(url as string)
          }
        } catch (e) {
          console.log(e)
          setErr(e as string)
        } finally {
          setIsUploading(false)
        }
      }
    }
    upload()
  }, [filedReadied, fileContent, fileName, setFileUrl])
  return [isUploading, err]
}
export default UseUploadFile
