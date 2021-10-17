import * as Minio from 'minio'
import internal from 'stream'

interface MinioConfig {
  endPoint: string
  port: number
  useSSL: boolean
  accessKey: string
  secretKey: string
}

const minioConfig: MinioConfig = {
  endPoint: 'minio.juntao.life',
  port: 443,
  useSSL: true,
  accessKey: 'ifb399write',
  secretKey: 'ifb399minio',
}
const minioClient = new Minio.Client(minioConfig)

const bucketName = 'ifb399'
const folder = 'test'

export const mcPutOneObj = async (
  filename: string,
  bufferStream: string | Buffer | internal.Readable,
) => {
  const { etag } = await minioClient.putObject(bucketName, `${folder}/${filename}`, bufferStream)
  if (etag) {
    const { endPoint, port, useSSL } = minioConfig
    const url = `${useSSL ? 'https://' : 'http://'}${endPoint}:${port}/${bucketName}/${folder}/${filename}`
    return { success: true, url }
  } else {
    return { success: true, url: null }
  }
}
